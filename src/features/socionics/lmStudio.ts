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

interface ChatResponse {
  output?: unknown;
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
            const candidate = model as {
              type?: unknown;
              key?: unknown;
              loaded_instances?: unknown;
            };
            const isLoaded =
              !Array.isArray(candidate.loaded_instances) ||
              candidate.loaded_instances.length > 0;
            return candidate.type === "llm" &&
              isLoaded &&
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

export function completionContent(value: unknown): string {
  const response = value as ChatResponse;
  if (!Array.isArray(response?.output) || response.output.length === 0) {
    throw new LmStudioError("LM Studio returned no suggestion.");
  }
  const message = response.output.find(
    (item) =>
      item !== null &&
      typeof item === "object" &&
      (item as { type?: unknown }).type === "message",
  ) as { content?: unknown } | undefined;
  const content = message?.content;
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
    const normalized = raw
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");
    parsed = JSON.parse(normalized);
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
    candidate.suggestions.length > 2 ||
    typeof candidate.alternativeExplanation !== "string" ||
    candidate.alternativeExplanation.length > 200
  ) {
    throw new LmStudioError("The local model returned an invalid suggestion.");
  }

  const seen = new Set<number>();
  const suggestions: FunctionSuggestion[] = [];
  for (const value of candidate.suggestions) {
    if (!value || typeof value !== "object") {
      throw new LmStudioError(
        "The local model returned an invalid suggestion.",
      );
    }
    const item = value as Partial<FunctionSuggestion>;
    const exactMatch = functions.find(
      (functionProfile) =>
        functionProfile.id === item.positionId &&
        functionProfile.element === item.element,
    );
    const elementMatch = functions.find(
      (functionProfile) => functionProfile.element === item.element,
    );
    const positionMatch = functions.find(
      (functionProfile) => functionProfile.id === item.positionId,
    );
    // Local models sometimes choose the intended element correctly but copy the
    // wrong position number. The element carries the semantic choice, so map it
    // back to its actual position in the current type profile.
    const fn = exactMatch ?? elementMatch ?? positionMatch;
    if (
      !fn ||
      (item.confidence !== "high" &&
        item.confidence !== "medium" &&
        item.confidence !== "low") ||
      typeof item.reason !== "string" ||
      !item.reason.trim() ||
      item.reason.length > 240
    ) {
      throw new LmStudioError(
        "The local model did not return a usable function suggestion. Try again or choose a connection manually.",
      );
    }
    if (seen.has(fn.id)) continue;
    seen.add(fn.id);
    suggestions.push({
      positionId: fn.id,
      element: fn.element,
      confidence: item.confidence,
      reason: item.reason.trim(),
    });
  }

  if (suggestions.length === 0) {
    throw new LmStudioError(
      "The local model did not return a usable function suggestion. Try again or choose a connection manually.",
    );
  }

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
  const outputContract = `Return only a JSON object with this exact shape: {"suggestions":[{"positionId":${allowedPositions.join("|")},"element":"${allowedElements.join("|")}","confidence":"high|medium|low","reason":"one concise sentence"}],"alternativeExplanation":"one concise sentence or empty string"}. Use 1 suggestion, or 2 only when ambiguity is meaningful. Do not use Markdown.`;

  let response: unknown;
  try {
    response = await invokeLocal(
      "lm_studio_chat",
      {
        payload: {
          model,
          temperature: 0.1,
          max_output_tokens: 700,
          stream: false,
          reasoning: "off",
          store: false,
          system_prompt: `You help a user examine a working socionics hypothesis. Treat the observation as uncertain evidence, not proof. Select the best matching function from the supplied catalog, even when it differs from the function currently open in the UI. Copy both its position number and element symbol from the same catalog row. Keep every reason and the alternative explanation concise, without repetition. Explain them in the same language as the observation. ${outputContract}`,
          input: `Working type: ${typeId}\n\nFunction catalog:\n${catalog}\n\nSituation: ${context.trim().slice(0, MAX_INPUT_LENGTH)}\nObserved behavior: ${description.trim().slice(0, MAX_INPUT_LENGTH)}`,
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
