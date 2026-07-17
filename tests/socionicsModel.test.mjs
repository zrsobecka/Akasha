import assert from "node:assert/strict";
import test from "node:test";
import {
  getRelationship,
  getSupportedTypes,
  getTypeGroupMemberships,
  getTypeProfile,
  groupFunctions,
  isSupportedType,
} from "../frontend/src/domain/socionics/socionicsModel.ts";

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

test("all profiles use canonical MBTI IDs and explicit socionics alternatives", () => {
  const expected = {
    ENFJ: ["FeNi", "ENFj", "EIE", "EJ · Linear-assertive"],
    ENFP: ["NeFi", "ENFp", "IEE", "EP · Flexible-maneuvering"],
    ENTJ: ["TeNi", "ENTj", "LIE", "EJ · Linear-assertive"],
    ENTP: ["NeTi", "ENTp", "ILE", "EP · Flexible-maneuvering"],
    ESFJ: ["FeSi", "ESFj", "ESE", "EJ · Linear-assertive"],
    ESFP: ["SeFi", "ESFp", "SEE", "EP · Flexible-maneuvering"],
    ESTJ: ["TeSi", "ESTj", "LSE", "EJ · Linear-assertive"],
    ESTP: ["SeTi", "ESTp", "SLE", "EP · Flexible-maneuvering"],
    INFJ: ["NiFe", "INFp", "IEI", "IJ · Balanced-stable"],
    INFP: ["FiNe", "INFj", "EII", "IP · Receptive-adaptive"],
    INTJ: ["NiTe", "INTp", "ILI", "IJ · Balanced-stable"],
    INTP: ["TiNe", "INTj", "LII", "IP · Receptive-adaptive"],
    ISFJ: ["SiFe", "ISFp", "SEI", "IJ · Balanced-stable"],
    ISFP: ["FiSe", "ISFj", "ESI", "IP · Receptive-adaptive"],
    ISTJ: ["SiTe", "ISTp", "SLI", "IJ · Balanced-stable"],
    ISTP: ["TiSe", "ISTj", "LSI", "IP · Receptive-adaptive"],
  };

  for (const [typeId, values] of Object.entries(expected)) {
    const profile = getTypeProfile(typeId);
    assert.deepEqual(
      [
        profile.core,
        profile.socionicsAlternative,
        profile.socionicsCode,
        profile.temperament,
      ],
      values,
      typeId,
    );
  }
});

test("group overview keeps the seven classifications and their sources distinct", () => {
  const groups = getTypeGroupMemberships(getTypeProfile("ISTP"));

  assert.deepEqual(
    groups.map(({ label, source, value }) => [label, source, value]),
    [
      ["Quadra", "Classical Socionics", "Beta"],
      ["Club", "Classical Socionics", "Pragmatists"],
      ["Temperament", "Classical Socionics", "IP · Receptive-adaptive"],
      ["Communication Style", "Berens", "Directing"],
      ["Romance Style", "Gulenko", "Aggressor"],
      ["Role", "Berens", "Responding"],
      ["Interaction Style", "Berens", "Chart-the-Course"],
    ],
  );

  const byId = Object.fromEntries(groups.map((group) => [group.id, group]));
  assert.match(byId.quadra.theory, /Ti, Se, Ni and Fe/);
  assert.match(byId["romance-style"].derivation, /TiSe has Se/);
  assert.match(byId["romance-style"].caution, /not a judgment/);
  assert.equal(
    byId["interaction-style"].derivation,
    "Directing communication plus a Responding role yields the Chart-the-Course interaction style.",
  );
});

test("all types derive one complete and internally consistent group overview", () => {
  const expectedRomanceStyleCounts = {
    Aggressor: 4,
    Caregiver: 4,
    Infantile: 4,
    Victim: 4,
  };
  const romanceStyleCounts = {};

  for (const type of getSupportedTypes()) {
    const groups = getTypeGroupMemberships(getTypeProfile(type));
    const byId = Object.fromEntries(groups.map((group) => [group.id, group]));
    const expectedInteractionStyle = {
      "Directing-Initiating": "In-Charge",
      "Directing-Responding": "Chart-the-Course",
      "Informing-Initiating": "Get-Things-Going",
      "Informing-Responding": "Behind-the-Scenes",
    }[`${byId["communication-style"].value}-${byId.role.value}`];

    assert.equal(groups.length, 7, type);
    assert.equal(new Set(groups.map((group) => group.id)).size, 7, type);
    for (const group of groups) {
      assert.ok(group.theory.length > 40, `${type}:${group.id} theory`);
      assert.equal(group.practice.length, 3, `${type}:${group.id} practice`);
      assert.equal(
        new Set(group.practice).size,
        group.practice.length,
        `${type}:${group.id} unique practice`,
      );
      assert.ok(
        group.derivation.includes(type) || group.derivation.length > 40,
      );
      assert.ok(group.caution.length > 60, `${type}:${group.id} caution`);
    }
    assert.equal(
      byId["interaction-style"].value,
      expectedInteractionStyle,
      type,
    );

    const romanceStyle = byId["romance-style"].value;
    romanceStyleCounts[romanceStyle] =
      (romanceStyleCounts[romanceStyle] ?? 0) + 1;
  }

  assert.deepEqual(romanceStyleCounts, expectedRomanceStyleCounts);
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

test("all dual pairs follow the canonical MBTI IDs", () => {
  const dualPairs = [
    ["ENFJ", "ISTP"],
    ["ENFP", "ISTJ"],
    ["ENTJ", "ISFP"],
    ["ENTP", "ISFJ"],
    ["ESFJ", "INTP"],
    ["ESFP", "INTJ"],
    ["ESTJ", "INFP"],
    ["ESTP", "INFJ"],
  ];

  for (const [a, b] of dualPairs) {
    assert.equal(getRelationship(a, b).name, "Dual", `${a}:${b}`);
    assert.equal(getRelationship(b, a).name, "Dual", `${b}:${a}`);
  }
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
