import assert from "node:assert/strict";
import test from "node:test";
import {
  decodePeople,
  encodePeople,
} from "../src/features/socionics/personStorage.ts";

const person = {
  id: "person-1",
  name: "Example",
  typeId: "ENTJ",
  relationship: "friend",
  confidence: "Working",
};

test("people with any supported type survive local storage validation", () => {
  assert.deepEqual(decodePeople(encodePeople([person])), [person]);
});

test("people with unsupported types are discarded safely", () => {
  const unsupported = { ...person, typeId: "XXXX" };
  assert.deepEqual(decodePeople(encodePeople([unsupported])), []);
});
