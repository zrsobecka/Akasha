import { invoke } from "@tauri-apps/api/core";
import type {
  ElementId,
  FunctionProfile,
  PositionId,
  TypeId,
} from "./socionicsModel";

const MAX_INPUT_LENGTH = 2_000;

export type SuggestionConfidence = "high" | "medium" | "low";

export interface FunctionSuggestion {
  positionId: PositionId;
  element: ElementId;
  confidence: SuggestionConfidence;
  reason: string;
}

export interface FunctionSuggestionResult {
  suggestions: FunctionSuggestion[];
  alternativeExplanation: string;
}

interface ModelsResponse {
  data?: unknown;
  models?: unknown;
}

interface ChatCompletionResponse {
  choices?: unknown;
}

export class LmStudioError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LmStudioError";
  }
}

function abortError(): DOMException {
  return new DOMException("The local analysis was cancelled.", "AbortError");
}

async function invokeLocal<T>(
  command: string,
  args: Record<string, unknown> | undefined,
  signal?: AbortSignal,
): Promise<T> {
  if (signal?.aborted) throw abortError();

  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(abortError());
    signal?.addEventListener("abort", onAbort, { once: true });
    void invoke<T>(command, args)
      .then((value) => {
        signal?.removeEventListener("abort", onAbort);
        if (!signal?.aborted) resolve(value);
      })
      .catch((error: unknown) => {
        signal?.removeEventListener("abort", onAbort);
        if (signal?.aborted) return;
        reject(
          new LmStudioError(
            typeof error === "string"
              ? error
              : error instanceof Error
                ? error.message
                : "Akasha could not connect to LM Studio.",
          ),
        );
      });
  });
}

export function parseModelIds(value: unknown): string[] {
  const response = value as ModelsResponse;
  if (Array.isArray(response?.models)) {
    return [
      ...new Set(
        response.models
          .map((model) => {
            if (!model || typeof model !== "object") return null;
            const candidate = model as { type?: unknown; key?: unknown };
            return candidate.type === "llm" &&
              typeof candidate.key === "string" &&
              candidate.key.trim()
              ? candidate.key.trim()
              : null;
          })
          .filter((id): id is string => id !== null),
      ),
    ];
  }
  if (!Array.isArray(response?.data)) return [];

  return [
    ...new Set(
      response.data
        .map((model) => {
          if (!model || typeof model !== "object") return null;
          const id = (model as { id?: unknown }).id;
          return typeof id === "string" && id.trim() ? id.trim() : null;
        })
        .filter((id): id is string => id !== null),
    ),
  ];
}

export async function fetchLmStudioModels(
  signal?: AbortSignal,
): Promise<string[]> {
  let response: unknown;
  try {
    response = await invokeLocal("lm_studio_models", undefined, signal);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw error;
    if (error instanceof LmStudioError) throw error;
    throw new LmStudioError(
      "LM Studio is offline. Start the Local Server in LM Studio's Developer tab, then retry.",
    );
  }

  const models = parseModelIds(response);
  if (models.length === 0) {
    throw new LmStudioError(
      "LM Studio is running, but no models are available to the server.",
    );
  }
  return models;
}

function completionContent(value: unknown): string {
  const response = value as ChatCompletionResponse;
  if (!Array.isArray(response?.choices) || response.choices.length === 0) {
    throw new LmStudioError("LM Studio returned no suggestion.");
  }
  const choice = response.choices[0];
  if (!choice || typeof choice !== "object") {
    throw new LmStudioError("LM Studio returned an invalid suggestion.");
  }
  const message = (choice as { message?: unknown }).message;
  if (!message || typeof message !== "object") {
    throw new LmStudioError("LM Studio returned an invalid suggestion.");
  }
  const content = (message as { content?: unknown }).content;
  if (typeof content !== "string" || !content.trim()) {
    throw new LmStudioError("LM Studio returned an empty suggestion.");
  }
  return content;
}

export function parseSuggestionResponse(
  raw: string,
  functions: FunctionProfile[],
): FunctionSuggestionResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new LmStudioError(
      "The local model did not return valid structured data. Try another model.",
    );
  }

  if (!parsed || typeof parsed !== "object") {
    throw new LmStudioError("The local model returned an invalid suggestion.");
  }

  const candidate = parsed as {
    suggestions?: unknown;
    alternativeExplanation?: unknown;
  };
  if (
    !Array.isArray(candidate.suggestions) ||
    candidate.suggestions.length === 0 ||
    candidate.suggestions.length > 3 ||
    typeof candidate.alternativeExplanation !== "string"
  ) {
    throw new LmStudioError("The local model returned an invalid suggestion.");
  }

  const seen = new Set<number>();
  const suggestions = candidate.suggestions.map((value) => {
    if (!value || typeof value !== "object") {
      throw new LmStudioError(
        "The local model returned an invalid suggestion.",
      );
    }
    const item = value as Partial<FunctionSuggestion>;
    const fn = functions.find(
      (functionProfile) =>
        functionProfile.id === item.positionId &&
        functionProfile.element === item.element,
    );
    if (
      !fn ||
      seen.has(fn.id) ||
      (item.confidence !== "high" &&
        item.confidence !== "medium" &&
        item.confidence !== "low") ||
      typeof item.reason !== "string" ||
      !item.reason.trim() ||
      item.reason.length > 600
    ) {
      throw new LmStudioError(
        "The local model suggested a function outside the current type profile.",
      );
    }
    seen.add(fn.id);
    return {
      positionId: fn.id,
      element: fn.element,
      confidence: item.confidence,
      reason: item.reason.trim(),
    };
  });

  return {
    suggestions,
    alternativeExplanation: candidate.alternativeExplanation.trim(),
  };
}

export async function suggestFunctionConnections({
  model,
  typeId,
  context,
  description,
  functions,
  signal,
}: {
  model: string;
  typeId: TypeId;
  context: string;
  description: string;
  functions: FunctionProfile[];
  signal?: AbortSignal;
}): Promise<FunctionSuggestionResult> {
  const catalog = functions
    .map(
      (fn) =>
        `${fn.id}. ${fn.element} ${fn.name} (${fn.aspect}): ${fn.elementTheme} ${fn.overview}`,
    )
    .join("\n");
  const allowedPositions = functions.map((fn) => fn.id);
  const allowedElements = functions.map((fn) => fn.element);

  let response: unknown;
  try {
    response = await invokeLocal(
      "lm_studio_chat",
      {
        payload: {
          model,
          temperature: 0.1,
          max_tokens: 700,
          stream: false,
          messages: [
            {
              role: "system",
              content:
                "You help a user examine a working socionics hypothesis. Treat the observation as uncertain evidence, not proof. Select only from the supplied function catalog. Prefer 1 strong suggestion; include up to 3 only when ambiguity is meaningful. Explain reasons in the same language as the observation. Mention a plausible non-socionics explanation.",
            },
            {
              role: "user",
              content: `Working type: ${typeId}\n\nFunction catalog:\n${catalog}\n\nSituation: ${context.trim().slice(0, MAX_INPUT_LENGTH)}\nObserved behavior: ${description.trim().slice(0, MAX_INPUT_LENGTH)}`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "socionics_function_suggestions",
              strict: true,
              schema: {
                type: "object",
                additionalProperties: false,
                properties: {
                  suggestions: {
                    type: "array",
                    minItems: 1,
                    maxItems: 3,
                    items: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        positionId: { type: "integer", enum: allowedPositions },
                        element: { type: "string", enum: allowedElements },
                        confidence: {
                          type: "string",
                          enum: ["high", "medium", "low"],
                        },
                        reason: { type: "string" },
                      },
                      required: [
                        "positionId",
                        "element",
                        "confidence",
                        "reason",
                      ],
                    },
                  },
                  alternativeExplanation: { type: "string" },
                },
                required: ["suggestions", "alternativeExplanation"],
              },
            },
          },
        },
      },
      signal,
    );
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw error;
    if (error instanceof LmStudioError) throw error;
    throw new LmStudioError(
      "Akasha could not reach LM Studio. Your observation is still here; start the local server and retry.",
    );
  }

  const content = completionContent(response);
  return parseSuggestionResponse(content, functions);
}
