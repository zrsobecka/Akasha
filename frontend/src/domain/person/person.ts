import type { TypeId } from "../socionics/socionicsModel";

export interface PersonRecord {
  id: string;
  name: string;
  typeId: TypeId;
  relationship: string;
  confidence: "Exploring" | "Working" | "Strong";
}
