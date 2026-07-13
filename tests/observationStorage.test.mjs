import assert from "node:assert/strict";
import test from "node:test";
import {
  decodeObservations,
  encodeObservations,
  observationsForFunction,
  removeObservation,
  restoreObservation,
} from "../src/features/socionics/observationStorage.ts";

const observation = {
  id: "observation-1",
  personId: "person-1",
  occurredOn: "2026-07-13",
  context: "Planning a shared project",
  description: "They ordered the definitions before choosing a solution.",
  interpretation: "This may support Ti Leading.",
  rating: "fits",
  target: {
    typeId: "ISTP",
    positionId: 1,
    element: "Ti",
    positionName: "Leading",
    aspect: "Ego",
  },
  linkProvenance: {
    origin: "ai-confirmed",
    modelId: "qwen",
    reason: "The model suggested Ti and the user confirmed it.",
  },
  createdAt: "2026-07-13T10:00:00.000Z",
};

test("saved observations survive an encode and decode round trip", () => {
  const decoded = decodeObservations(encodeObservations([observation]));
  assert.deepEqual(decoded, [observation]);
});

test("invalid or unsupported observation storage fails safely", () => {
  assert.deepEqual(decodeObservations("not-json"), []);
  assert.deepEqual(
    decodeObservations(JSON.stringify({ version: 2, observations: [] })),
    [],
  );
});

test("invalid records are removed without losing valid observations", () => {
  const raw = JSON.stringify({
    version: 1,
    observations: [observation, { ...observation, id: 42 }],
  });
  assert.deepEqual(decodeObservations(raw), [observation]);
});

test("function evidence only includes the matching captured hypothesis", () => {
  const records = [
    observation,
    {
      ...observation,
      id: "observation-2",
      target: { ...observation.target, positionId: 2, element: "Se" },
    },
    {
      ...observation,
      id: "observation-3",
      target: { ...observation.target, typeId: "ENFP" },
    },
  ];

  assert.deepEqual(observationsForFunction(records, "ISTP", 1), [observation]);
});

test("an observation can be removed and restored without duplication", () => {
  assert.deepEqual(removeObservation([observation], observation.id), []);
  assert.deepEqual(restoreObservation([], observation), [observation]);
  assert.deepEqual(restoreObservation([observation], observation), [
    observation,
  ]);
});
