import assert from "node:assert/strict";
import test from "node:test";
import {
  decodePeople,
  encodePeople,
  updatePerson,
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

test("editing a person preserves identity and trims profile details", () => {
  const updated = updatePerson(person, "  New name  ", "ENTJ", "  sibling  ");

  assert.deepEqual(updated, {
    ...person,
    name: "New name",
    relationship: "sibling",
  });
});

test("changing a person's type resets confidence to a working hypothesis", () => {
  const strongPerson = { ...person, confidence: "Strong" };
  const updated = updatePerson(strongPerson, "Example", "ISFP", "friend");

  assert.equal(updated.id, person.id);
  assert.equal(updated.typeId, "ISFP");
  assert.equal(updated.confidence, "Working");
});
