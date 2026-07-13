import assert from "node:assert/strict";
import test from "node:test";
import {
  getRelationship,
  getTypeProfile,
  groupFunctions,
} from "../src/features/socionics/socionicsModel.ts";

test("ISTP derives the expected eight-function stack", () => {
  const profile = getTypeProfile("ISTP");
  assert.deepEqual(
    profile.functions.map((fn) => fn.element),
    ["Ti", "Se", "Ni", "Fe", "Te", "Si", "Ne", "Fi"],
  );
  assert.equal(new Set(profile.functions.map((fn) => fn.element)).size, 8);
});

test("ENFP derives the expected eight-function stack", () => {
  const profile = getTypeProfile("ENFP");
  assert.deepEqual(
    profile.functions.map((fn) => fn.element),
    ["Ne", "Fi", "Te", "Si", "Ni", "Fe", "Ti", "Se"],
  );
  assert.equal(new Set(profile.functions.map((fn) => fn.element)).size, 8);
});

test("ISTP Super-Ego contains Ne Blindspot and Fi Demon", () => {
  const groups = groupFunctions(getTypeProfile("ISTP"), "aspects");
  const superEgo = groups.find((group) => group.label === "Super-Ego");
  assert.deepEqual(
    superEgo?.functions.map((fn) => `${fn.element} ${fn.name}`),
    ["Ne Blindspot", "Fi Demon"],
  );
});

test("dimensions preserve all functions without duplication", () => {
  const groups = groupFunctions(getTypeProfile("ENFP"), "dimensions");
  const functions = groups.flatMap((group) => group.functions);
  assert.equal(groups.length, 4);
  assert.equal(functions.length, 8);
  assert.equal(new Set(functions.map((fn) => fn.element)).size, 8);
});

test("ISTP and ENFP resolve to a symmetric Dual analysis", () => {
  const forward = getRelationship("ISTP", "ENFP");
  const reverse = getRelationship("ENFP", "ISTP");
  assert.equal(forward?.name, "Dual");
  assert.equal(forward?.aToB[0].from, "Ti");
  assert.equal(forward?.aToB[0].to, "Te");
  assert.deepEqual(forward?.aToB, reverse?.bToA);
  assert.deepEqual(forward?.bToA, reverse?.aToB);
});

test("unsupported same-type comparison has no relation fixture yet", () => {
  assert.equal(getRelationship("ISTP", "ISTP"), null);
});
