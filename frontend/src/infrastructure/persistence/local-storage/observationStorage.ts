import type {
  EvidenceRating,
  ObservationRecord,
  ObservationTarget,
} from "../../../domain/observation/observation";
import { isSupportedType } from "../../../domain/socionics/socionicsModel";

export type {
  EvidenceRating,
  ObservationRecord,
  ObservationTarget,
} from "../../../domain/observation/observation";

interface StoredObservations {
  version: 1;
  observations: ObservationRecord[];
}

const STORAGE_KEY = "akasha.socionics.observations.v1";
const RATINGS: EvidenceRating[] = [
  "fits",
  "partial",
  "contradicts",
  "uncertain",
];

function isObservation(value: unknown): value is ObservationRecord {
  if (!value || typeof value !== "object") return false;
  const observation = value as Partial<ObservationRecord>;
  const target = observation.target as Partial<ObservationTarget> | undefined;
  const provenance = observation.linkProvenance as
    ObservationRecord["linkProvenance"] | undefined;

  return (
    typeof observation.id === "string" &&
    typeof observation.personId === "string" &&
    typeof observation.occurredOn === "string" &&
    typeof observation.context === "string" &&
    typeof observation.description === "string" &&
    typeof observation.interpretation === "string" &&
    RATINGS.includes(observation.rating as EvidenceRating) &&
    typeof observation.createdAt === "string" &&
    !!target &&
    isSupportedType(target.typeId) &&
    Number.isInteger(target.positionId) &&
    typeof target.element === "string" &&
    typeof target.positionName === "string" &&
    typeof target.aspect === "string" &&
    (!provenance ||
      ((provenance.origin === "manual" ||
        provenance.origin === "ai-confirmed") &&
        (provenance.modelId === undefined ||
          typeof provenance.modelId === "string") &&
        (provenance.reason === undefined ||
          typeof provenance.reason === "string")))
  );
}

export function decodeObservations(raw: string | null): ObservationRecord[] {
  if (!raw) return [];

  try {
    const stored = JSON.parse(raw) as Partial<StoredObservations>;
    if (stored.version !== 1 || !Array.isArray(stored.observations)) return [];
    return stored.observations.filter(isObservation);
  } catch {
    return [];
  }
}

export function encodeObservations(observations: ObservationRecord[]): string {
  const stored: StoredObservations = { version: 1, observations };
  return JSON.stringify(stored);
}

export function loadObservations(): ObservationRecord[] {
  return decodeObservations(window.localStorage.getItem(STORAGE_KEY));
}

export function saveObservations(observations: ObservationRecord[]): void {
  window.localStorage.setItem(STORAGE_KEY, encodeObservations(observations));
}

export function createObservation({
  personId,
  occurredOn,
  context,
  description,
  interpretation,
  rating,
  typeId,
  fn,
  linkProvenance,
}: {
  personId: string;
  occurredOn: string;
  context: string;
  description: string;
  interpretation: string;
  rating: EvidenceRating;
  typeId: TypeId;
  fn: FunctionProfile;
  linkProvenance?: ObservationRecord["linkProvenance"];
}): ObservationRecord {
  return {
    id: crypto.randomUUID(),
    personId,
    occurredOn,
    context: context.trim(),
    description: description.trim(),
    interpretation: interpretation.trim(),
    rating,
    target: {
      typeId,
      positionId: fn.id,
      element: fn.element,
      positionName: fn.name,
      aspect: fn.aspect,
    },
    linkProvenance,
    createdAt: new Date().toISOString(),
  };
}

export function observationsForFunction(
  observations: ObservationRecord[],
  typeId: TypeId,
  positionId: number,
): ObservationRecord[] {
  return observations.filter(
    (observation) =>
      observation.target.typeId === typeId &&
      observation.target.positionId === positionId,
  );
}

export function removeObservation(
  observations: ObservationRecord[],
  observationId: string,
): ObservationRecord[] {
  return observations.filter((observation) => observation.id !== observationId);
}

export function restoreObservation(
  observations: ObservationRecord[],
  observation: ObservationRecord,
): ObservationRecord[] {
  if (observations.some((candidate) => candidate.id === observation.id)) {
    return observations;
  }
  return [...observations, observation];
}
