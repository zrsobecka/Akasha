export type TypeId = "ISTP" | "ENFP";
export type ElementId = "Ti" | "Te" | "Fi" | "Fe" | "Si" | "Se" | "Ni" | "Ne";
export type PositionId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type AnalysisView = "positions" | "aspects" | "dimensions";

export interface PositionMeta {
  id: PositionId;
  name: string;
  shortName: string;
  archetype: string;
  aspect: "Ego" | "Subconscious" | "Shadow" | "Super-Ego";
  dimension:
    "4D Generalization" | "3D Adaptation" | "2D Norms" | "1D Experience";
  reflection: "Lens" | "Expression" | "Projection" | "Resonance";
  axis: "Drive" | "Method" | "Drift" | "Friction";
  orbit: "Worldview" | "Impact" | "Template" | "Impression";
  sphere: "Identity" | "Exchange" | "Filter" | "Avoidance";
  mode: "Stance" | "Navigation" | "Regulation" | "Sync";
  traits: readonly string[];
}

export interface FunctionProfile extends PositionMeta {
  element: ElementId;
  elementName: string;
  elementTheme: string;
  overview: string;
  growth: string;
}

export interface TypeProfile {
  id: TypeId;
  core: string;
  leadingSign: string;
  frame: string;
  labels: string;
  quadra: string;
  club: string;
  temperament: string;
  functions: FunctionProfile[];
}

export interface FunctionGroup {
  id: string;
  label: string;
  description: string;
  functions: FunctionProfile[];
}

export interface RelationshipChannel {
  from: ElementId;
  fromPosition: string;
  to: ElementId;
  toPosition: string;
  summary: string;
  layer: "Ego → Subconscious" | "Shadow → Super-Ego";
}

export interface RelationshipAnalysis {
  name: "Dual";
  family: string;
  summary: string;
  caution: string;
  aToB: RelationshipChannel[];
  bToA: RelationshipChannel[];
}

const POSITION_META: Record<PositionId, PositionMeta> = {
  1: {
    id: 1,
    name: "Leading",
    shortName: "Le",
    archetype: "Hero",
    aspect: "Ego",
    dimension: "4D Generalization",
    reflection: "Lens",
    axis: "Drive",
    orbit: "Worldview",
    sphere: "Identity",
    mode: "Stance",
    traits: [
      "Conscious",
      "Strong",
      "Accepting",
      "Valued",
      "Rigid",
      "Universal",
      "Bold",
    ],
  },
  2: {
    id: 2,
    name: "Creative",
    shortName: "Cr",
    archetype: "Parent",
    aspect: "Ego",
    dimension: "3D Adaptation",
    reflection: "Expression",
    axis: "Method",
    orbit: "Impact",
    sphere: "Exchange",
    mode: "Navigation",
    traits: [
      "Conscious",
      "Strong",
      "Producing",
      "Valued",
      "Flexible",
      "Situational",
      "Cautious",
    ],
  },
  3: {
    id: 3,
    name: "Activating",
    shortName: "Ac",
    archetype: "Child",
    aspect: "Subconscious",
    dimension: "2D Norms",
    reflection: "Projection",
    axis: "Method",
    orbit: "Template",
    sphere: "Identity",
    mode: "Regulation",
    traits: [
      "Unconscious",
      "Weak",
      "Producing",
      "Valued",
      "Rigid",
      "Universal",
      "Cautious",
    ],
  },
  4: {
    id: 4,
    name: "Anima",
    shortName: "An",
    archetype: "Aspirant",
    aspect: "Subconscious",
    dimension: "1D Experience",
    reflection: "Resonance",
    axis: "Drive",
    orbit: "Impression",
    sphere: "Exchange",
    mode: "Sync",
    traits: [
      "Unconscious",
      "Weak",
      "Accepting",
      "Valued",
      "Flexible",
      "Situational",
      "Bold",
    ],
  },
  5: {
    id: 5,
    name: "Ignoring",
    shortName: "Ig",
    archetype: "Nemesis",
    aspect: "Shadow",
    dimension: "3D Adaptation",
    reflection: "Resonance",
    axis: "Friction",
    orbit: "Worldview",
    sphere: "Avoidance",
    mode: "Regulation",
    traits: [
      "Unconscious",
      "Strong",
      "Accepting",
      "Subdued",
      "Rigid",
      "Situational",
      "Cautious",
    ],
  },
  6: {
    id: 6,
    name: "Background",
    shortName: "Ba",
    archetype: "Critic",
    aspect: "Shadow",
    dimension: "4D Generalization",
    reflection: "Projection",
    axis: "Drift",
    orbit: "Impact",
    sphere: "Filter",
    mode: "Sync",
    traits: [
      "Unconscious",
      "Strong",
      "Producing",
      "Subdued",
      "Flexible",
      "Universal",
      "Bold",
    ],
  },
  7: {
    id: 7,
    name: "Blindspot",
    shortName: "Bl",
    archetype: "Trickster",
    aspect: "Super-Ego",
    dimension: "1D Experience",
    reflection: "Expression",
    axis: "Drift",
    orbit: "Template",
    sphere: "Avoidance",
    mode: "Stance",
    traits: [
      "Conscious",
      "Weak",
      "Producing",
      "Subdued",
      "Rigid",
      "Situational",
      "Bold",
    ],
  },
  8: {
    id: 8,
    name: "Demon",
    shortName: "De",
    archetype: "Demon",
    aspect: "Super-Ego",
    dimension: "2D Norms",
    reflection: "Lens",
    axis: "Friction",
    orbit: "Impression",
    sphere: "Filter",
    mode: "Navigation",
    traits: [
      "Conscious",
      "Weak",
      "Accepting",
      "Subdued",
      "Flexible",
      "Universal",
      "Cautious",
    ],
  },
};

const ELEMENTS: Record<ElementId, { name: string; theme: string }> = {
  Ti: {
    name: "Logic & analysis",
    theme: "Builds precise internal frameworks and tests coherence.",
  },
  Te: {
    name: "Organization & results",
    theme: "Organizes external systems through evidence and effectiveness.",
  },
  Fi: {
    name: "Values & authenticity",
    theme: "Maintains an internal hierarchy of values and personal bonds.",
  },
  Fe: {
    name: "Harmony & empathy",
    theme: "Reads and shapes shared emotional atmosphere.",
  },
  Si: {
    name: "Memory & stability",
    theme: "Compares experience with an internal library of impressions.",
  },
  Se: {
    name: "Impact & presence",
    theme: "Engages immediate reality through decisive physical action.",
  },
  Ni: {
    name: "Vision & foresight",
    theme: "Converges patterns into one direction and future trajectory.",
  },
  Ne: {
    name: "Ideas & possibilities",
    theme: "Expands one point into alternative meanings and futures.",
  },
};

const TYPE_DATA: Record<
  TypeId,
  {
    core: string;
    leadingSign: string;
    frame: string;
    labels: string;
    quadra: string;
    club: string;
    temperament: string;
    stack: readonly ElementId[];
    summaries: readonly { overview: string; growth: string }[];
  }
> = {
  ISTP: {
    core: "TiSe",
    leadingSign: "Ti+",
    frame: "ISTj",
    labels: "SLI · LSI",
    quadra: "Beta",
    club: "Pragmatists",
    temperament: "IP · Receptive-adaptive*",
    stack: ["Ti", "Se", "Ni", "Fe", "Te", "Si", "Ne", "Fi"],
    summaries: [
      {
        overview:
          "Internal coherence is the primary lens; claims are tested for structural strength and inconsistency.",
        growth:
          "Keep the analytical core while including human impact beyond the puzzle.",
      },
      {
        overview:
          "Adapts skill and physical execution to the situation, often sharpening capability in self and others.",
        growth:
          "Let precision serve people instead of becoming an impossible performance standard.",
      },
      {
        overview:
          "Feels energized by choosing a direction and walking it with conviction, even when endurance is still developing.",
        growth:
          "Accept that responsibility and discipline can create more freedom.",
      },
      {
        overview:
          "Values emotional connection and acceptance while feeling uncertain about handling the shared emotional field.",
        growth:
          "Communicate emotion more openly and build self-worth that is not outsourced to reactions.",
      },
      {
        overview:
          "Can use outside evidence strongly but may dismiss it when it challenges an internally trusted framework.",
        growth:
          "Verify other people's expertise before deciding it has nothing to add.",
      },
      {
        overview:
          "Stability and accumulated experience run quietly in the background, often without becoming part of identity.",
        growth:
          "Treat lived experience and steady practice as real resources rather than evidence of missed life.",
      },
      {
        overview:
          "Alternative futures and other people's intentions can be simplified before their consequences are fully mapped.",
        growth:
          "Start from ‘I do not know what might happen’ and explore futures with humility.",
      },
      {
        overview:
          "Personal worth and private values can feel difficult to access, especially under social pressure or stress.",
        growth:
          "Build self-respect and let action align with consciously chosen values.",
      },
    ],
  },
  ENFP: {
    core: "NeFi",
    leadingSign: "Ne−",
    frame: "ENFp",
    labels: "IEE · IEE",
    quadra: "Delta",
    club: "Humanitarians",
    temperament: "EP · Flexible-maneuvering",
    stack: ["Ne", "Fi", "Te", "Si", "Ni", "Fe", "Ti", "Se"],
    summaries: [
      {
        overview:
          "Possibility is the primary lens: opportunities, consequences and alternative paths appear before they do to others.",
        growth:
          "Join imaginative range with execution so possibilities become real outcomes.",
      },
      {
        overview:
          "Builds a personal moral framework and adapts emotional expression around authentic individual values.",
        growth:
          "Keep conviction intact under status pressure and use sensitivity for responsible self-care.",
      },
      {
        overview:
          "Gains energy from research, credible information and turning connections into useful external organization.",
        growth:
          "Convert gathered insight into confident planning and grounded leadership.",
      },
      {
        overview:
          "Deeply values comfort, continuity and embodied stability while often feeling physiologically scattered or uncertain.",
        growth:
          "Use routine and self-care to support creativity and follow-through.",
      },
      {
        overview:
          "Quietly tracks the personal future but may worry that commitment will compromise freedom or other possibilities.",
        growth:
          "Name a personal direction and turn innovation into a path rather than permanent openness.",
      },
      {
        overview:
          "Reads collective feeling automatically but may become cynical about other people's judgments or moral certainty.",
        growth:
          "Include other emotional perspectives without surrendering personal values.",
      },
      {
        overview:
          "Internal logical verification can feel slippery, creating a need for soundboards and competing interpretations.",
        growth:
          "Use uncertainty as the beginning of rigor and build a testable internal framework.",
      },
      {
        overview:
          "Direct force, performance and present-moment pressure may emerge in extreme or overdriven forms under stress.",
        growth:
          "Ground in the present without making effort or discomfort a requirement for everyone.",
      },
    ],
  },
};

const GROUP_DESCRIPTIONS: Record<AnalysisView, Record<string, string>> = {
  positions: {},
  aspects: {
    Ego: "Conscious, valued strength — the core identity and preferred competence.",
    Subconscious:
      "Unconscious, valued weakness — desire, inspiration and the growth vector.",
    Shadow:
      "Unconscious, subdued strength — quiet capability that is rarely claimed.",
    "Super-Ego":
      "Conscious, subdued weakness — pressure, insecurity and difficult growth.",
  },
  dimensions: {
    "4D Generalization":
      "Autonomous, global understanding that generalizes across time.",
    "3D Adaptation":
      "Strong contextual intelligence that adapts to the present situation.",
    "2D Norms":
      "Uses shared norms and external standards to orient a weaker function.",
    "1D Experience":
      "Learns through direct personal experience and needs concrete support.",
  },
};

export function getTypeProfile(typeId: TypeId): TypeProfile {
  const data = TYPE_DATA[typeId];
  const functions = data.stack.map((element, index) => {
    const position = POSITION_META[(index + 1) as PositionId];
    const elementMeta = ELEMENTS[element];
    const summary = data.summaries[index];
    return {
      ...position,
      element,
      elementName: elementMeta.name,
      elementTheme: elementMeta.theme,
      ...summary,
    };
  });

  return {
    id: typeId,
    core: data.core,
    leadingSign: data.leadingSign,
    frame: data.frame,
    labels: data.labels,
    quadra: data.quadra,
    club: data.club,
    temperament: data.temperament,
    functions,
  };
}

export function groupFunctions(
  profile: TypeProfile,
  view: AnalysisView,
): FunctionGroup[] {
  if (view === "positions") {
    return [
      {
        id: "position-grid",
        label: "Cognitive attitudes",
        description: "All eight functions in their positional 2 × 4 structure.",
        functions: profile.functions,
      },
    ];
  }

  const key = view === "aspects" ? "aspect" : "dimension";
  const groups = new Map<string, FunctionProfile[]>();
  for (const fn of profile.functions) {
    const label = fn[key];
    groups.set(label, [...(groups.get(label) ?? []), fn]);
  }

  return [...groups.entries()].map(([label, functions]) => ({
    id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    label,
    description: GROUP_DESCRIPTIONS[view][label],
    functions,
  }));
}

const ISTP_TO_ENFP: RelationshipChannel[] = [
  {
    from: "Ti",
    fromPosition: "Leading",
    to: "Te",
    toPosition: "Activating",
    layer: "Ego → Subconscious",
    summary:
      "Internal analysis can feed a valued wish for useful evidence, organization and execution.",
  },
  {
    from: "Se",
    fromPosition: "Creative",
    to: "Si",
    toPosition: "Anima",
    layer: "Ego → Subconscious",
    summary:
      "Adaptive presence and practical skill can provide grounding, comfort and embodied stability.",
  },
  {
    from: "Te",
    fromPosition: "Ignoring",
    to: "Ti",
    toPosition: "Blindspot",
    layer: "Shadow → Super-Ego",
    summary:
      "Quiet external verification can support an insecure relationship with internal logical certainty.",
  },
  {
    from: "Si",
    fromPosition: "Background",
    to: "Se",
    toPosition: "Demon",
    layer: "Shadow → Super-Ego",
    summary:
      "Unclaimed stability can soften an extreme relationship with effort, force and immediate action.",
  },
];

const ENFP_TO_ISTP: RelationshipChannel[] = [
  {
    from: "Ne",
    fromPosition: "Leading",
    to: "Ni",
    toPosition: "Activating",
    layer: "Ego → Subconscious",
    summary:
      "A field of possibilities can energize the wish to choose a path and move toward a future.",
  },
  {
    from: "Fi",
    fromPosition: "Creative",
    to: "Fe",
    toPosition: "Anima",
    layer: "Ego → Subconscious",
    summary:
      "Authentic personal valuation can make emotional connection safer and more meaningful.",
  },
  {
    from: "Ni",
    fromPosition: "Ignoring",
    to: "Ne",
    toPosition: "Blindspot",
    layer: "Shadow → Super-Ego",
    summary:
      "Quiet foresight can widen awareness of consequences without demanding constant ideation.",
  },
  {
    from: "Fe",
    fromPosition: "Background",
    to: "Fi",
    toPosition: "Demon",
    layer: "Shadow → Super-Ego",
    summary:
      "Unclaimed social awareness can support personal worth and emotional integration under pressure.",
  },
];

export function getRelationship(
  a: TypeId,
  b: TypeId,
): RelationshipAnalysis | null {
  const isPair =
    (a === "ISTP" && b === "ENFP") || (a === "ENFP" && b === "ISTP");
  if (!isPair) return null;
  const aIsIstp = a === "ISTP";
  return {
    name: "Dual",
    family: "Symmetric · model-defined complement",
    summary:
      "Core competence is modeled as feeding the other person's valued weak functions, while quiet strengths can support areas of insecurity.",
    caution:
      "This is a structural prediction from the working type hypotheses, not a verdict about the real relationship.",
    aToB: aIsIstp ? ISTP_TO_ENFP : ENFP_TO_ISTP,
    bToA: aIsIstp ? ENFP_TO_ISTP : ISTP_TO_ENFP,
  };
}

export function getSupportedTypes(): TypeId[] {
  return ["ISTP", "ENFP"];
}
