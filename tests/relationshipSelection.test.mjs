import assert from "node:assert/strict";
import test from "node:test";
import { resolveComparisonPersonId } from "../frontend/src/features/relationships/relationshipSelection.ts";

const people = [
  {
    id: "a",
    name: "A",
    typeId: "ISTP",
    relationship: "",
    confidence: "Working",
  },
  {
    id: "b",
    name: "B",
    typeId: "ENFP",
    relationship: "",
    confidence: "Working",
  },
  {
    id: "c",
    name: "C",
    typeId: "INFJ",
    relationship: "",
    confidence: "Working",
  },
];

test("keeps the preferred comparison person when it is available", () => {
  assert.equal(resolveComparisonPersonId(people, "a", "c"), "c");
});

test("never compares a person with themselves", () => {
  assert.equal(resolveComparisonPersonId(people, "b", "b"), "a");
});

test("returns no comparison when there is only one person", () => {
  assert.equal(resolveComparisonPersonId([people[0]], "a", null), null);
});
