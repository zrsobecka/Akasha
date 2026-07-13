import assert from "node:assert/strict";
import test from "node:test";
import {
  getRelationship,
  getSupportedTypes,
  getTypeProfile,
  groupFunctions,
  isSupportedType,
} from "../src/features/socionics/socionicsModel.ts";

test("all 16 types are available and derive complete profiles", () => {
  const types = getSupportedTypes();

  assert.equal(types.length, 16);
  assert.equal(new Set(types).size, 16);
  assert.deepEqual(types, [...types].sort());

  for (const type of types) {
    const profile = getTypeProfile(type);
    assert.equal(profile.id, type);
    assert.equal(profile.functions.length, 8);
    assert.equal(new Set(profile.functions.map((fn) => fn.element)).size, 8);
    assert.equal(isSupportedType(type), true);
  }

  assert.equal(isSupportedType("XXXX"), false);
});

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

test("ISTJ derives the expected eight-function stack", () => {
  const profile = getTypeProfile("ISTJ");
  assert.deepEqual(
    profile.functions.map((fn) => fn.element),
    ["Si", "Te", "Fi", "Ne", "Se", "Ti", "Fe", "Ni"],
  );
  assert.equal(new Set(profile.functions.map((fn) => fn.element)).size, 8);
});

test("introvert profiles keep MBTI IDs and lowercase socionics aliases", () => {
  const istp = getTypeProfile("ISTP");
  const istj = getTypeProfile("ISTJ");
  assert.equal(istp.core, "TiSe");
  assert.equal(istp.alternativeName, "ISTj");
  assert.equal(istp.labels, "LSI");
  assert.equal(istp.temperament, "IP · Receptive-adaptive");
  assert.equal(istj.core, "SiTe");
  assert.equal(istj.alternativeName, "ISTp");
  assert.equal(istj.labels, "SLI");
  assert.equal(istj.temperament, "IJ · Balanced-stable");
  const enfp = getTypeProfile("ENFP");
  assert.equal(enfp.alternativeName, "ENFp");
  assert.equal(enfp.labels, "IEE");
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

test("ISTP and ENFP resolve to symmetric Conflict", () => {
  const forward = getRelationship("ISTP", "ENFP");
  const reverse = getRelationship("ENFP", "ISTP");
  assert.equal(forward?.name, "Conflict");
  assert.equal(forward?.aToB[0].from, "Ti");
  assert.equal(forward?.aToB[0].to, "Ti");
  assert.equal(forward?.aToB[0].toPosition, "Blindspot");
  assert.deepEqual(forward?.aToB, reverse?.bToA);
  assert.deepEqual(forward?.bToA, reverse?.aToB);
});

test("ISTJ and ENFP resolve to symmetric Dual", () => {
  const forward = getRelationship("ISTJ", "ENFP");
  const reverse = getRelationship("ENFP", "ISTJ");
  assert.equal(forward?.name, "Dual");
  assert.equal(forward?.aToB[0].from, "Si");
  assert.equal(forward?.aToB[0].to, "Si");
  assert.equal(forward?.aToB[0].toPosition, "Anima");
  assert.deepEqual(forward?.aToB, reverse?.bToA);
  assert.deepEqual(forward?.bToA, reverse?.aToB);
});

test("same-type comparison derives Identity", () => {
  assert.equal(getRelationship("ISTP", "ISTP")?.name, "Identity");
});

test("ENTP resolves the complete classical intertype relation row", () => {
  const expected = [
    ["ENTP", "Identity"],
    ["ISFJ", "Dual"],
    ["ESFJ", "Activity"],
    ["INTP", "Mirror"],
    ["ENFJ", "Benefit", "Benefactor"],
    ["ISTP", "Supervision", "Supervisor"],
    ["ESTP", "Business"],
    ["INFJ", "Mirage"],
    ["ESFP", "Super-Ego"],
    ["INTJ", "Extinguishment"],
    ["ENTJ", "Quasi-Identity"],
    ["ISFP", "Conflict"],
    ["ESTJ", "Benefit", "Beneficiary"],
    ["INFP", "Supervision", "Supervisee"],
    ["ENFP", "Kindred"],
    ["ISTJ", "Semi-Dual"],
  ];

  for (const [other, name, role] of expected) {
    const relationship = getRelationship("ENTP", other);
    assert.equal(relationship.name, name, `ENTP:${other}`);
    assert.equal(relationship.aRole, role, `ENTP:${other} role`);
  }
});

test("all 256 ordered type pairs derive a reversible relationship", () => {
  const types = getSupportedTypes();
  const relationNames = new Set();

  for (const a of types) {
    for (const b of types) {
      const forward = getRelationship(a, b);
      const reverse = getRelationship(b, a);
      relationNames.add(forward.name);

      assert.equal(forward.name, reverse.name, `${a}:${b} name`);
      assert.deepEqual(forward.aToB, reverse.bToA, `${a}:${b} A→B`);
      assert.deepEqual(forward.bToA, reverse.aToB, `${a}:${b} B→A`);
      assert.equal(forward.aRole, reverse.bRole, `${a}:${b} A role`);
      assert.equal(forward.bRole, reverse.aRole, `${a}:${b} B role`);
      assert.equal(forward.aToB.length, 4, `${a}:${b} A→B channels`);
      assert.equal(forward.bToA.length, 4, `${a}:${b} B→A channels`);
    }
  }

  assert.deepEqual([...relationNames].sort(), [
    "Activity",
    "Benefit",
    "Business",
    "Conflict",
    "Dual",
    "Extinguishment",
    "Identity",
    "Kindred",
    "Mirage",
    "Mirror",
    "Quasi-Identity",
    "Semi-Dual",
    "Super-Ego",
    "Supervision",
  ]);
});
