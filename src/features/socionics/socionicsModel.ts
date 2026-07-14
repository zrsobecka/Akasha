export const SUPPORTED_TYPES = [
  "ENFJ",
  "ENFP",
  "ENTJ",
  "ENTP",
  "ESFJ",
  "ESFP",
  "ESTJ",
  "ESTP",
  "INFJ",
  "INFP",
  "INTJ",
  "INTP",
  "ISFJ",
  "ISFP",
  "ISTJ",
  "ISTP",
] as const;
export type TypeId = (typeof SUPPORTED_TYPES)[number];
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
  socionicsAlternative: string;
  socionicsCode: string;
  quadra: string;
  club: string;
  temperament: string;
  functions: FunctionProfile[];
}

export interface TypeGroupMembership {
  id: string;
  label: string;
  source: "Classical Socionics" | "Berens" | "Gulenko";
  value: string;
  summary: string;
  theory: string;
  practice: readonly string[];
  derivation: string;
  caution: string;
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
  layer: string;
}

export type RelationshipName =
  | "Identity"
  | "Dual"
  | "Activity"
  | "Mirror"
  | "Kindred"
  | "Semi-Dual"
  | "Business"
  | "Mirage"
  | "Super-Ego"
  | "Extinguishment"
  | "Quasi-Identity"
  | "Conflict"
  | "Benefit"
  | "Supervision";

export type RelationshipRole =
  "Benefactor" | "Beneficiary" | "Supervisor" | "Supervisee";

export interface RelationshipAnalysis {
  name: RelationshipName;
  family: string;
  summary: string;
  caution: string;
  aRole?: RelationshipRole;
  bRole?: RelationshipRole;
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
    socionicsCode: string;
    quadra: string;
    club: string;
    stack: readonly ElementId[];
    summaries?: readonly { overview: string; growth: string }[];
  }
> = {
  ENFJ: {
    core: "FeNi",
    leadingSign: "Fe",
    socionicsCode: "EIE",
    quadra: "Beta",
    club: "Humanitarians",
    stack: ["Fe", "Ni", "Se", "Ti", "Fi", "Ne", "Si", "Te"],
  },
  ENTJ: {
    core: "TeNi",
    leadingSign: "Te",
    socionicsCode: "LIE",
    quadra: "Gamma",
    club: "Researchers",
    stack: ["Te", "Ni", "Se", "Fi", "Ti", "Ne", "Si", "Fe"],
  },
  ENTP: {
    core: "NeTi",
    leadingSign: "Ne",
    socionicsCode: "ILE",
    quadra: "Alpha",
    club: "Researchers",
    stack: ["Ne", "Ti", "Fe", "Si", "Ni", "Te", "Fi", "Se"],
  },
  ESFJ: {
    core: "FeSi",
    leadingSign: "Fe",
    socionicsCode: "ESE",
    quadra: "Alpha",
    club: "Socials",
    stack: ["Fe", "Si", "Ne", "Ti", "Fi", "Se", "Ni", "Te"],
  },
  ESFP: {
    core: "SeFi",
    leadingSign: "Se",
    socionicsCode: "SEE",
    quadra: "Gamma",
    club: "Socials",
    stack: ["Se", "Fi", "Te", "Ni", "Si", "Fe", "Ti", "Ne"],
  },
  ESTJ: {
    core: "TeSi",
    leadingSign: "Te",
    socionicsCode: "LSE",
    quadra: "Delta",
    club: "Pragmatists",
    stack: ["Te", "Si", "Ne", "Fi", "Ti", "Se", "Ni", "Fe"],
  },
  ESTP: {
    core: "SeTi",
    leadingSign: "Se",
    socionicsCode: "SLE",
    quadra: "Beta",
    club: "Pragmatists",
    stack: ["Se", "Ti", "Fe", "Ni", "Si", "Te", "Fi", "Ne"],
  },
  INFJ: {
    core: "NiFe",
    leadingSign: "Ni",
    socionicsCode: "IEI",
    quadra: "Beta",
    club: "Humanitarians",
    stack: ["Ni", "Fe", "Ti", "Se", "Ne", "Fi", "Te", "Si"],
  },
  INFP: {
    core: "FiNe",
    leadingSign: "Fi",
    socionicsCode: "EII",
    quadra: "Delta",
    club: "Humanitarians",
    stack: ["Fi", "Ne", "Si", "Te", "Fe", "Ni", "Se", "Ti"],
  },
  INTJ: {
    core: "NiTe",
    leadingSign: "Ni",
    socionicsCode: "ILI",
    quadra: "Gamma",
    club: "Researchers",
    stack: ["Ni", "Te", "Fi", "Se", "Ne", "Ti", "Fe", "Si"],
  },
  INTP: {
    core: "TiNe",
    leadingSign: "Ti",
    socionicsCode: "LII",
    quadra: "Alpha",
    club: "Researchers",
    stack: ["Ti", "Ne", "Si", "Fe", "Te", "Ni", "Se", "Fi"],
  },
  ISFJ: {
    core: "SiFe",
    leadingSign: "Si",
    socionicsCode: "SEI",
    quadra: "Alpha",
    club: "Socials",
    stack: ["Si", "Fe", "Ti", "Ne", "Se", "Fi", "Te", "Ni"],
  },
  ISFP: {
    core: "FiSe",
    leadingSign: "Fi",
    socionicsCode: "ESI",
    quadra: "Gamma",
    club: "Socials",
    stack: ["Fi", "Se", "Ni", "Te", "Fe", "Si", "Ne", "Ti"],
  },
  ISTP: {
    core: "TiSe",
    leadingSign: "Ti+",
    socionicsCode: "LSI",
    quadra: "Beta",
    club: "Pragmatists",
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
  ISTJ: {
    core: "SiTe",
    leadingSign: "Si+",
    socionicsCode: "SLI",
    quadra: "Delta",
    club: "Pragmatists",
    stack: ["Si", "Te", "Fi", "Ne", "Se", "Ti", "Fe", "Ni"],
    summaries: [
      {
        overview:
          "Accumulated experience, continuity and embodied stability form the primary lens for understanding what is reliable.",
        growth:
          "Keep trusted experience available without letting it close the door on useful new evidence.",
      },
      {
        overview:
          "Adapts external evidence, organization and practical execution to the needs of the situation.",
        growth:
          "Let efficiency support durable outcomes instead of becoming an end in itself.",
      },
      {
        overview:
          "Feels energized by clear personal values, trustworthy bonds and choices that carry individual meaning.",
        growth:
          "Name what matters personally rather than relying only on duty or established practice.",
      },
      {
        overview:
          "Values fresh possibilities and alternative meanings while feeling less certain about generating them independently.",
        growth:
          "Explore several plausible options before committing to the familiar one.",
      },
      {
        overview:
          "Can apply direct force and immediate action strongly, but may dismiss them when they do not serve a practical need.",
        growth:
          "Use decisive pressure deliberately when waiting would create a larger cost.",
      },
      {
        overview:
          "Structural logic and internal consistency run quietly in the background without needing to define identity.",
        growth:
          "Surface the reasoning when shared clarity matters more than silent correctness.",
      },
      {
        overview:
          "Shared emotional atmosphere and expressive expectations can be simplified or noticed only after tension appears.",
        growth:
          "Check emotional impact explicitly instead of assuming practical care communicates itself.",
      },
      {
        overview:
          "A single future trajectory can feel difficult to trust, especially when pressure turns uncertainty into foreboding.",
        growth:
          "Separate grounded prediction from fear and choose a direction without demanding certainty.",
      },
    ],
  },
  ENFP: {
    core: "NeFi",
    leadingSign: "Ne−",
    socionicsCode: "IEE",
    quadra: "Delta",
    club: "Humanitarians",
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

const TEMPERAMENT_NAMES = {
  EP: "Flexible-maneuvering",
  EJ: "Linear-assertive",
  IP: "Receptive-adaptive",
  IJ: "Balanced-stable",
} as const;

const INTERACTION_STYLES = {
  "Directing-Initiating": "In-Charge",
  "Directing-Responding": "Chart-the-Course",
  "Informing-Initiating": "Get-Things-Going",
  "Informing-Responding": "Behind-the-Scenes",
} as const;

const ROMANCE_STYLES: Record<"Se" | "Ni" | "Si" | "Ne", string> = {
  Se: "Aggressor",
  Ni: "Victim",
  Si: "Caregiver",
  Ne: "Infantile",
};

interface TypeGroupDetail {
  theory: string;
  practice: readonly string[];
}

const QUADRA_DETAILS: Record<string, TypeGroupDetail> = {
  Alpha: {
    theory:
      "Alpha combines Ne, Ti, Fe and Si as valued elements: possibility, conceptual clarity, shared emotional expression and comfortable experience.",
    practice: [
      "Exploring ideas freely before demanding a final decision.",
      "Making complex topics understandable through open discussion.",
      "Creating an easy, lively atmosphere where curiosity is welcome.",
    ],
  },
  Beta: {
    theory:
      "Beta combines Ti, Se, Ni and Fe as valued elements: coherent structure, decisive impact, direction over time and emotionally mobilizing expression.",
    practice: [
      "Organizing people around a clear direction or shared cause.",
      "Responding strongly when roles, loyalty or momentum are unclear.",
      "Using intensity, narrative or symbolism to give action meaning.",
    ],
  },
  Gamma: {
    theory:
      "Gamma combines Se, Fi, Te and Ni as valued elements: agency, personal bonds, practical effectiveness and long-range consequences.",
    practice: [
      "Testing ideas against results, incentives and real constraints.",
      "Taking loyalty and personal boundaries seriously.",
      "Committing resources when the likely outcome justifies the risk.",
    ],
  },
  Delta: {
    theory:
      "Delta combines Ne, Fi, Te and Si as valued elements: potential, individual values, useful methods and sustainable comfort.",
    practice: [
      "Improving systems gradually without unnecessary pressure.",
      "Noticing individual strengths and supporting authentic development.",
      "Preferring useful, humane solutions that remain workable over time.",
    ],
  },
};

const CLUB_DETAILS: Record<string, TypeGroupDetail> = {
  Researchers: {
    theory:
      "Researchers combine intuition with logic. The club emphasizes understanding patterns, explanations, systems and possibilities.",
    practice: [
      "Asking how a system works before deciding what to do with it.",
      "Enjoying models, hypotheses and difficult conceptual problems.",
      "Comparing alternative explanations for the same observation.",
    ],
  },
  Pragmatists: {
    theory:
      "Pragmatists combine sensing with logic. The club emphasizes tangible conditions, usable methods and effective action.",
    practice: [
      "Looking for the method that works under current conditions.",
      "Tracking resources, tools, timing and observable results.",
      "Improving performance through direct experience and adjustment.",
    ],
  },
  Socials: {
    theory:
      "Socials combine sensing with ethics. The club emphasizes immediate human needs, relationships and the lived atmosphere.",
    practice: [
      "Noticing comfort, participation and the mood of a group.",
      "Coordinating practical support around people’s present needs.",
      "Reading social feedback in concrete, visible interactions.",
    ],
  },
  Humanitarians: {
    theory:
      "Humanitarians combine intuition with ethics. The club emphasizes people’s potential, meaning, motives and relational development.",
    practice: [
      "Interpreting what a situation may mean for the people involved.",
      "Exploring motives, identity and possible paths of development.",
      "Using stories or patterns to understand relationships over time.",
    ],
  },
};

const TEMPERAMENT_DETAILS: Record<string, TypeGroupDetail> = {
  EP: {
    theory:
      "Flexible-maneuvering temperament is externally engaged and opportunity-led. Energy tends to follow changing openings rather than a fixed line.",
    practice: [
      "Switching direction quickly when a better opening appears.",
      "Starting through experimentation and adjusting while moving.",
      "Working in energetic bursts around emerging opportunities.",
    ],
  },
  EJ: {
    theory:
      "Linear-assertive temperament directs energy outward in a sustained line. It tends to build momentum toward an explicit result.",
    practice: [
      "Setting activity in motion and maintaining a working pace.",
      "Making progress visible through decisions and completed steps.",
      "Feeling tension when action stalls without a clear reason.",
    ],
  },
  IP: {
    theory:
      "Receptive-adaptive temperament regulates energy internally and responds to conditions. It tends to wait for the right state or opening before acting.",
    practice: [
      "Observing first and acting when the situation feels ready.",
      "Adapting smoothly without maintaining constant outward pressure.",
      "Alternating low-key engagement with concentrated periods of action.",
    ],
  },
  IJ: {
    theory:
      "Balanced-stable temperament regulates energy internally around a steady state. It tends to preserve continuity and controlled pacing.",
    practice: [
      "Preparing a stable rhythm before committing sustained effort.",
      "Noticing disruptions that pull a situation away from equilibrium.",
      "Preferring measured progress over abrupt changes of direction.",
    ],
  },
};

const COMMUNICATION_DETAILS: Record<string, TypeGroupDetail> = {
  Directing: {
    theory:
      "Directing communication gives structure to an interaction by stating the task, boundary or requested action explicitly.",
    practice: [
      "Leading with the point, request or expected outcome.",
      "Using concise language when responsibilities need to be clear.",
      "Correcting course directly instead of implying the change.",
    ],
  },
  Informing: {
    theory:
      "Informing communication influences by supplying context, observations and options, leaving room for the other person to participate in the response.",
    practice: [
      "Explaining the situation before asking for a decision.",
      "Offering options or relevant information instead of issuing an instruction.",
      "Inviting input so the next step can emerge collaboratively.",
    ],
  },
};

const ROLE_DETAILS: Record<string, TypeGroupDetail> = {
  Initiating: {
    theory:
      "An Initiating role reaches outward to establish contact and get an interaction moving.",
    practice: [
      "Starting conversations or introducing the next topic.",
      "Checking in before others have signaled a need.",
      "Thinking through an issue while actively engaging with people.",
    ],
  },
  Responding: {
    theory:
      "A Responding role lets contact or information arrive first, then engages from an internally formed position.",
    practice: [
      "Waiting for a clear opening before entering a conversation.",
      "Reflecting privately before offering a considered response.",
      "Engaging deeply once the interaction has a defined focus.",
    ],
  },
};

const INTERACTION_DETAILS: Record<string, TypeGroupDetail> = {
  "In-Charge": {
    theory:
      "In-Charge combines Directing communication with an Initiating role. Its drive is to accomplish and secure an achievable result.",
    practice: [
      "Taking ownership quickly when direction is missing.",
      "Defining who will do what and moving toward execution.",
      "Preferring a timely workable decision over extended ambiguity.",
    ],
  },
  "Chart-the-Course": {
    theory:
      "Chart-the-Course combines Directing communication with a Responding role. Its drive is to anticipate and establish a reliable path toward the desired result.",
    practice: [
      "Studying the situation before presenting a clear course of action.",
      "Tracking sequence, milestones and possible obstacles.",
      "Protecting concentration so the chosen path stays coherent.",
    ],
  },
  "Get-Things-Going": {
    theory:
      "Get-Things-Going combines Informing communication with an Initiating role. Its drive is to involve people and create an embraced result.",
    practice: [
      "Starting through enthusiasm, questions or shared possibilities.",
      "Building participation before locking in the plan.",
      "Keeping interaction lively so people remain engaged.",
    ],
  },
  "Behind-the-Scenes": {
    theory:
      "Behind-the-Scenes combines Informing communication with a Responding role. Its drive is to integrate available input into the best result possible.",
    practice: [
      "Listening for missing information before recommending a solution.",
      "Connecting contributions that initially appear separate.",
      "Allowing extra reflection time to improve the final outcome.",
    ],
  },
};

const ROMANCE_DETAILS: Record<string, TypeGroupDetail> = {
  Aggressor: {
    theory:
      "Gulenko’s Aggressor style is associated with Se in the Ego block. It frames attraction through initiative, presence, boundaries and a testing of relational strength.",
    practice: [
      "Expressing attraction through decisive attention or physical presence.",
      "Testing whether interest and boundaries are clear and reciprocal.",
      "Responding to directness more readily than prolonged ambiguity.",
    ],
  },
  Victim: {
    theory:
      "Gulenko’s Victim style is associated with Ni in the Ego block. The historical label describes attention to tension, timing and an unfolding relational dynamic—not actual victimhood.",
    practice: [
      "Reading attraction through anticipation, subtext and changes over time.",
      "Responding to a partner who makes interest or direction unmistakable.",
      "Allowing tension and uncertainty to become part of the romantic narrative.",
    ],
  },
  Caregiver: {
    theory:
      "Gulenko’s Caregiver style is associated with Si in the Ego block. It frames attraction through comfort, attentiveness and practical care for well-being.",
    practice: [
      "Showing affection through food, comfort, touch or practical support.",
      "Noticing whether another person is rested, at ease and cared for.",
      "Creating a calm environment in which closeness can develop.",
    ],
  },
  Infantile: {
    theory:
      "Gulenko’s Infantile style is associated with Ne in the Ego block. The historical label describes playful possibility-seeking and receptivity to care—not emotional immaturity.",
    practice: [
      "Using playfulness, curiosity or imaginative possibilities to express interest.",
      "Valuing acceptance that leaves room for spontaneity and exploration.",
      "Responding warmly to grounded care without wanting rigid control.",
    ],
  },
};

function getSocionicsAlternative(typeId: TypeId): string {
  const lastLetter = typeId[3];
  const socionicsLetter = typeId.startsWith("I")
    ? lastLetter === "J"
      ? "p"
      : "j"
    : lastLetter.toLowerCase();
  return `${typeId.slice(0, 3)}${socionicsLetter}`;
}

function getTemperament(typeId: TypeId): string {
  const code = `${typeId[0]}${typeId[3]}` as keyof typeof TEMPERAMENT_NAMES;
  return `${code} · ${TEMPERAMENT_NAMES[code]}`;
}

function getCommunicationStyle(typeId: TypeId): "Directing" | "Informing" {
  const isSensingThinking = typeId[1] === "S" && typeId[2] === "T";
  const isIntuitiveJudging = typeId[1] === "N" && typeId[3] === "J";
  return isSensingThinking || isIntuitiveJudging ? "Directing" : "Informing";
}

function getInteractionRole(typeId: TypeId): "Initiating" | "Responding" {
  return typeId.startsWith("E") ? "Initiating" : "Responding";
}

function getRomanceStyle(profile: TypeProfile): string {
  return ROMANCE_STYLES[getRomanceStyleElement(profile)];
}

function getRomanceStyleElement(
  profile: TypeProfile,
): keyof typeof ROMANCE_STYLES {
  const definingElement = profile.functions
    .slice(0, 2)
    .map((fn) => fn.element)
    .find(
      (element): element is keyof typeof ROMANCE_STYLES =>
        element in ROMANCE_STYLES,
    );

  if (!definingElement) {
    throw new Error(`No romance style found for ${profile.id}`);
  }

  return definingElement;
}

function getTypeGroupDetail(
  details: Record<string, TypeGroupDetail>,
  value: string,
): TypeGroupDetail {
  const detail = details[value];
  if (!detail) throw new Error(`No group detail found for ${value}`);
  return detail;
}

const POSITION_COPY: Record<PositionId, { overview: string; growth: string }> =
  {
    1: {
      overview: "This is the primary lens for interpreting experience.",
      growth:
        "Use this natural strength without expecting every situation to fit it.",
    },
    2: {
      overview: "This is a flexible strength used to respond and create.",
      growth:
        "Let this capability support the leading function without overextending it.",
    },
    3: {
      overview:
        "This valued area often brings energy, aspiration and experimentation.",
      growth:
        "Build confidence here through concrete practice rather than self-pressure.",
    },
    4: {
      overview:
        "This valued but vulnerable area often benefits from patient support.",
      growth:
        "Treat uncertainty here as a need for experience, not as a personal verdict.",
    },
    5: {
      overview:
        "This is a strong but subdued perspective that may be used selectively.",
      growth:
        "Notice when this quiet capability contains evidence the preferred lens missed.",
    },
    6: {
      overview:
        "This strong background process often works without becoming part of identity.",
      growth:
        "Make this capability visible when it can help other people understand your reasoning.",
    },
    7: {
      overview:
        "This subdued weak area can be simplified when a situation becomes demanding.",
      growth:
        "Slow down, seek examples and test assumptions before drawing conclusions here.",
    },
    8: {
      overview: "This subdued weak area may emerge defensively under pressure.",
      growth:
        "Approach this area with curiosity and support instead of forcing certainty.",
    },
  };

export function getTypeProfile(typeId: TypeId): TypeProfile {
  const data = TYPE_DATA[typeId];
  const functions = data.stack.map((element, index) => {
    const position = POSITION_META[(index + 1) as PositionId];
    const elementMeta = ELEMENTS[element];
    const summary = data.summaries?.[index] ?? POSITION_COPY[position.id];
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
    socionicsAlternative: getSocionicsAlternative(typeId),
    socionicsCode: data.socionicsCode,
    quadra: data.quadra,
    club: data.club,
    temperament: getTemperament(typeId),
    functions,
  };
}

export function getTypeGroupMemberships(
  profile: TypeProfile,
): TypeGroupMembership[] {
  const communicationStyle = getCommunicationStyle(profile.id);
  const role = getInteractionRole(profile.id);
  const interactionKey = `${communicationStyle}-${role}` as const;
  const interactionStyle = INTERACTION_STYLES[interactionKey];
  const romanceStyleElement = getRomanceStyleElement(profile);
  const romanceStyle = getRomanceStyle(profile);
  const valuedElements = profile.functions
    .slice(0, 4)
    .map((fn) => fn.element)
    .join(", ");
  const temperamentCode = profile.temperament.slice(0, 2);
  const provisionalCaution =
    "Treat this as a model-based prediction from the current type hypothesis. Confirm or challenge it with repeated observations of the person.";

  return [
    {
      id: "quadra",
      label: "Quadra",
      source: "Classical Socionics",
      value: profile.quadra,
      summary: "Shared valued function ring.",
      ...getTypeGroupDetail(QUADRA_DETAILS, profile.quadra),
      derivation: `${profile.core} values ${valuedElements} in this model, placing the current hypothesis in the ${profile.quadra} quadra.`,
      caution: provisionalCaution,
    },
    {
      id: "club",
      label: "Club",
      source: "Classical Socionics",
      value: profile.club,
      summary: "A shared mode of inquiry and activity.",
      ...getTypeGroupDetail(CLUB_DETAILS, profile.club),
      derivation: `${profile.id} combines ${profile.id[1] === "N" ? "intuition" : "sensing"} with ${profile.id[2] === "T" ? "logic" : "ethics"}, which maps the current hypothesis to the ${profile.club} club.`,
      caution: provisionalCaution,
    },
    {
      id: "temperament",
      label: "Temperament",
      source: "Classical Socionics",
      value: profile.temperament,
      summary: "Characteristic energy rhythm and pace.",
      ...getTypeGroupDetail(TEMPERAMENT_DETAILS, temperamentCode),
      derivation: `${profile.core} is modeled as an ${temperamentCode[0] === "E" ? "extraverted" : "introverted"} ${temperamentCode[1] === "P" ? "irrational" : "rational"} type, yielding the ${temperamentCode} temperament.`,
      caution: provisionalCaution,
    },
    {
      id: "communication-style",
      label: "Communication Style",
      source: "Berens",
      value: communicationStyle,
      summary: "The preferred way of influencing through communication.",
      ...getTypeGroupDetail(COMMUNICATION_DETAILS, communicationStyle),
      derivation: `${profile.id} belongs to Berens’ ${communicationStyle} communication polarity in the current cross-model mapping.`,
      caution: provisionalCaution,
    },
    {
      id: "romance-style",
      label: "Romance Style",
      source: "Gulenko",
      value: romanceStyle,
      summary: "A characteristic stance in romantic interaction.",
      ...getTypeGroupDetail(ROMANCE_DETAILS, romanceStyle),
      derivation: `${profile.core} has ${romanceStyleElement} in its Ego pair. Gulenko’s classification maps that irrational element to ${romanceStyle}.`,
      caution:
        "This is a historical theoretical label, not a judgment about maturity, consent or actual relationship behavior. Compare it carefully with lived evidence.",
    },
    {
      id: "role",
      label: "Role",
      source: "Berens",
      value: role,
      summary: "The preferred way of entering an interaction.",
      ...getTypeGroupDetail(ROLE_DETAILS, role),
      derivation: `${profile.id} is ${profile.id.startsWith("E") ? "extraverted" : "introverted"} in the canonical mapping, corresponding to Berens’ ${role} role.`,
      caution: provisionalCaution,
    },
    {
      id: "interaction-style",
      label: "Interaction Style",
      source: "Berens",
      value: interactionStyle,
      summary: "The combined pattern of communication and engagement.",
      ...getTypeGroupDetail(INTERACTION_DETAILS, interactionStyle),
      derivation: `${communicationStyle} communication plus ${role === "Initiating" ? "an" : "a"} ${role} role yields the ${interactionStyle} interaction style.`,
      caution: provisionalCaution,
    },
  ];
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

interface RelationshipPattern {
  name: RelationshipName;
  aRole?: RelationshipRole;
  bRole?: RelationshipRole;
}

const RELATION_BY_EGO_TARGETS: Record<string, RelationshipPattern> = {
  "1-2": { name: "Identity" },
  "2-1": { name: "Mirror" },
  "3-4": { name: "Activity" },
  "4-3": { name: "Dual" },
  "1-7": { name: "Kindred" },
  "8-2": { name: "Business" },
  "4-6": { name: "Semi-Dual" },
  "5-3": { name: "Mirage" },
  "5-6": { name: "Extinguishment" },
  "8-7": { name: "Super-Ego" },
  "6-5": { name: "Quasi-Identity" },
  "7-8": { name: "Conflict" },
  "6-4": {
    name: "Benefit",
    aRole: "Benefactor",
    bRole: "Beneficiary",
  },
  "3-5": {
    name: "Benefit",
    aRole: "Beneficiary",
    bRole: "Benefactor",
  },
  "7-1": {
    name: "Supervision",
    aRole: "Supervisor",
    bRole: "Supervisee",
  },
  "2-8": {
    name: "Supervision",
    aRole: "Supervisee",
    bRole: "Supervisor",
  },
};

const RELATION_CAUTION =
  "This is a structural prediction from two working type hypotheses, not a verdict about the real relationship.";

const RELATION_META: Record<
  RelationshipName,
  Pick<RelationshipAnalysis, "family" | "summary" | "caution">
> = {
  Identity: {
    family: "Symmetric · same type",
    summary:
      "The same functions occupy the same positions, which supports recognition and shared framing but also leaves the same weak areas uncovered.",
    caution: RELATION_CAUTION,
  },
  Dual: {
    family: "Symmetric · same-quadra complement",
    summary:
      "Core competence feeds the other person's valued weak functions, while quiet strengths can support areas of insecurity.",
    caution: RELATION_CAUTION,
  },
  Activity: {
    family: "Symmetric · same-quadra activation",
    summary:
      "Both types support valued functions and readily energize one another, though sustained intensity can become tiring without space to reset.",
    caution: RELATION_CAUTION,
  },
  Mirror: {
    family: "Symmetric · same-quadra reflection",
    summary:
      "The same valued strengths are arranged in leading and supporting positions, encouraging recognition, discussion and mutual correction.",
    caution: RELATION_CAUTION,
  },
  Kindred: {
    family: "Symmetric · shared leading function",
    summary:
      "A shared leading function creates a familiar lens, while different creative priorities can produce sharply different ways of applying it.",
    caution: RELATION_CAUTION,
  },
  "Semi-Dual": {
    family: "Symmetric · partial complement",
    summary:
      "Part of the expected support arrives naturally, while another valued need is met indirectly, creating alternating connection and mismatch.",
    caution: RELATION_CAUTION,
  },
  Business: {
    family: "Symmetric · cooperation",
    summary:
      "The pair shares one flexible strength and can coordinate practical activity, but their leading priorities point in different directions.",
    caution: RELATION_CAUTION,
  },
  Mirage: {
    family: "Symmetric · relaxed complement",
    summary:
      "Support tends to land gently on valued needs, making contact comfortable, while sustained joint execution may lack a shared direction.",
    caution: RELATION_CAUTION,
  },
  "Super-Ego": {
    family: "Symmetric · cross-quadra pressure",
    summary:
      "Each person's confident strengths overlap with the other's effortful areas, which can create admiration at a distance and pressure up close.",
    caution: RELATION_CAUTION,
  },
  Extinguishment: {
    family: "Symmetric · opposing orientation",
    summary:
      "The pair recognizes similar capacities but values and expresses them in opposite orientations, so one person's initiative may dampen the other's.",
    caution: RELATION_CAUTION,
  },
  "Quasi-Identity": {
    family: "Symmetric · opposite-quadra resemblance",
    summary:
      "The same strong functions appear in swapped valued and subdued positions, creating surface similarity with different priorities.",
    caution: RELATION_CAUTION,
  },
  Conflict: {
    family: "Symmetric · opposite-quadra tension",
    summary:
      "Each person's leading strengths land directly on the other's conscious weak points, while quieter strengths touch valued needs.",
    caution: RELATION_CAUTION,
  },
  Benefit: {
    family: "Asymmetric · benefit flow",
    summary:
      "The benefactor naturally supplies information the beneficiary values, but the return flow follows a different route and can feel uneven to both people.",
    caution: RELATION_CAUTION,
  },
  Supervision: {
    family: "Asymmetric · supervision flow",
    summary:
      "The supervisor's natural strength reaches the supervisee's most effortful area, creating an uneven pattern of scrutiny, correction and sensitivity.",
    caution: RELATION_CAUTION,
  },
};

function describeRelationshipChannel(
  from: FunctionProfile,
  to: FunctionProfile,
): string {
  if (from.id === to.id) {
    return `${from.element} occupies ${from.name} for both types, making this position easy to recognize in each other.`;
  }

  if (to.aspect === "Subconscious") {
    return from.aspect === "Ego"
      ? `${from.element} ${from.name} directly supports the other's valued ${to.name} need.`
      : `${from.element} ${from.name} can quietly support the other's valued ${to.name} need.`;
  }

  if (to.aspect === "Super-Ego") {
    return from.aspect === "Ego"
      ? `${from.element} ${from.name} reaches the other's effortful ${to.name} position and may feel helpful or pressuring.`
      : `${from.element} ${from.name} touches the other's effortful ${to.name} position, but may be offered too indirectly.`;
  }

  if (to.aspect === "Shadow") {
    return from.aspect === "Ego"
      ? `${from.element} ${from.name} meets the other's strong but subdued ${to.name} position.`
      : `${from.element} is strong for both types, but each keeps it in a different background position.`;
  }

  return from.aspect === "Ego"
    ? `${from.element} is an Ego strength for both types, expressed through different positions.`
    : `${from.element} ${from.name} quietly supports the other's valued ${to.name} strength.`;
}

function buildRelationshipChannels(
  from: TypeProfile,
  to: TypeProfile,
): RelationshipChannel[] {
  return from.functions
    .filter((fn) => fn.aspect === "Ego" || fn.aspect === "Shadow")
    .map((fromFunction) => {
      const toFunction = to.functions.find(
        (candidate) => candidate.element === fromFunction.element,
      );
      if (!toFunction) {
        throw new Error(
          `Missing ${fromFunction.element} in ${to.id} function stack`,
        );
      }
      return {
        from: fromFunction.element,
        fromPosition: fromFunction.name,
        to: toFunction.element,
        toPosition: toFunction.name,
        layer: `${fromFunction.aspect} → ${toFunction.aspect}`,
        summary: describeRelationshipChannel(fromFunction, toFunction),
      };
    });
}

export function getRelationship(a: TypeId, b: TypeId): RelationshipAnalysis {
  const aProfile = getTypeProfile(a);
  const bProfile = getTypeProfile(b);
  const egoTargets = aProfile.functions
    .slice(0, 2)
    .map((fromFunction) =>
      bProfile.functions.find(
        (candidate) => candidate.element === fromFunction.element,
      ),
    );
  if (egoTargets.some((target) => !target)) {
    throw new Error(`Incomplete relationship signature for ${a} and ${b}`);
  }
  const signature = egoTargets.map((target) => target?.id).join("-");
  const pattern = RELATION_BY_EGO_TARGETS[signature];
  if (!pattern) {
    throw new Error(`Unknown relationship signature ${signature}`);
  }
  const meta = RELATION_META[pattern.name];
  return {
    name: pattern.name,
    ...meta,
    aRole: pattern.aRole,
    bRole: pattern.bRole,
    aToB: buildRelationshipChannels(aProfile, bProfile),
    bToA: buildRelationshipChannels(bProfile, aProfile),
  };
}

export function getSupportedTypes(): TypeId[] {
  return [...SUPPORTED_TYPES];
}

export function isSupportedType(value: unknown): value is TypeId {
  return (
    typeof value === "string" &&
    (SUPPORTED_TYPES as readonly string[]).includes(value)
  );
}
