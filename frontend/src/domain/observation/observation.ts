import type { FunctionProfile, TypeId } from "../socionics/socionicsModel";

export type EvidenceRating = "fits" | "partial" | "contradicts" | "uncertain";

export interface ObservationTarget {
  typeId: TypeId;
  positionId: number;
  element: FunctionProfile["element"];
  positionName: string;
  aspect: FunctionProfile["aspect"];
}

export interface ObservationRecord {
  id: string;
  personId: string;
  occurredOn: string;
  context: string;
  description: string;
  interpretation: string;
  rating: EvidenceRating;
  target: ObservationTarget;
  linkProvenance?: {
    origin: "manual" | "ai-confirmed";
    modelId?: string;
    reason?: string;
  };
  createdAt: string;
}
