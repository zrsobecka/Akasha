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

test("a mismatched position is repaired using the suggested element", () => {
  const result = parseSuggestionResponse(
    JSON.stringify({
      suggestions: [
        {
          positionId: 1,
          element: "Ne",
          confidence: "high",
          reason: "The person quickly considered another possibility.",
        },
      ],
      alternativeExplanation: "",
    }),
    istpFunctions,
  );

  assert.equal(result.suggestions[0].element, "Ne");
  assert.equal(result.suggestions[0].positionId, 7);
});

test("invalid JSON fails safely and duplicate suggestions are collapsed", () => {
  assert.throws(
    () => parseSuggestionResponse("not-json", istpFunctions),
    LmStudioError,
  );
  const result = parseSuggestionResponse(
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
  );

  assert.equal(result.suggestions.length, 1);
});

test("overlong Gemma output is rejected before it reaches the UI", () => {
  assert.throws(
    () =>
      parseSuggestionResponse(
        JSON.stringify({
          suggestions: [
            {
              positionId: 1,
              element: "Ti",
              confidence: "high",
              reason: "x".repeat(241),
            },
          ],
          alternativeExplanation: "short",
        }),
        istpFunctions,
      ),
    LmStudioError,
  );
});
