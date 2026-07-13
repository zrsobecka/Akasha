import assert from "node:assert/strict";
import test from "node:test";
import {
  LmStudioError,
  parseModelIds,
  parseSuggestionResponse,
} from "../src/features/socionics/lmStudio.ts";
import { getTypeProfile } from "../src/features/socionics/socionicsModel.ts";

const istpFunctions = getTypeProfile("ISTP").functions;

test("model discovery keeps unique valid LM Studio model identifiers", () => {
  assert.deepEqual(
    parseModelIds({
      models: [
        { type: "llm", key: "qwen" },
        { type: "llm", key: "qwen" },
        { type: "llm", key: "mistral" },
        { type: "embedding", key: "nomic-embed" },
        {},
      ],
    }),
    ["qwen", "mistral"],
  );
  assert.deepEqual(parseModelIds({ data: "invalid" }), []);
});

test("valid structured suggestions are accepted for the current type", () => {
  const result = parseSuggestionResponse(
    JSON.stringify({
      suggestions: [
        {
          positionId: 1,
          element: "Ti",
          confidence: "high",
          reason: "The person spontaneously organized definitions.",
        },
      ],
      alternativeExplanation: "Professional training could explain it.",
    }),
    istpFunctions,
  );

  assert.equal(result.suggestions[0].element, "Ti");
  assert.equal(result.suggestions[0].positionId, 1);
});

test("a suggestion cannot invent a function outside the current profile", () => {
  assert.throws(
    () =>
      parseSuggestionResponse(
        JSON.stringify({
          suggestions: [
            {
              positionId: 1,
              element: "Ne",
              confidence: "high",
              reason: "Mismatched element and position.",
            },
          ],
          alternativeExplanation: "",
        }),
        istpFunctions,
      ),
    LmStudioError,
  );
});

test("invalid JSON and duplicate suggestions fail safely", () => {
  assert.throws(
    () => parseSuggestionResponse("not-json", istpFunctions),
    LmStudioError,
  );
  assert.throws(
    () =>
      parseSuggestionResponse(
        JSON.stringify({
          suggestions: [
            {
              positionId: 1,
              element: "Ti",
              confidence: "high",
              reason: "First",
            },
            {
              positionId: 1,
              element: "Ti",
              confidence: "medium",
              reason: "Duplicate",
            },
          ],
          alternativeExplanation: "",
        }),
        istpFunctions,
      ),
    LmStudioError,
  );
});
