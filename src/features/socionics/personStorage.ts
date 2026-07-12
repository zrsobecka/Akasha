import type { TypeId } from "./socionicsModel";

export interface PersonRecord {
  id: string;
  name: string;
  typeId: TypeId;
  relationship: string;
  confidence: "Exploring" | "Working" | "Strong";
}

interface StoredPeople {
  version: 1;
  people: PersonRecord[];
}

const STORAGE_KEY = "akasha.socionics.people.v1";
const SELECTED_KEY = "akasha.socionics.selected-person.v1";

function isPersonRecord(value: unknown): value is PersonRecord {
  if (!value || typeof value !== "object") return false;
  const person = value as Partial<PersonRecord>;
  return typeof person.id === "string"
    && typeof person.name === "string"
    && (person.typeId === "ISTP" || person.typeId === "ENFP")
    && typeof person.relationship === "string"
    && (person.confidence === "Exploring" || person.confidence === "Working" || person.confidence === "Strong");
}

export function loadPeople(): PersonRecord[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const stored = JSON.parse(raw) as Partial<StoredPeople>;
    if (stored.version !== 1 || !Array.isArray(stored.people)) return [];
    return stored.people.filter(isPersonRecord);
  } catch {
    return [];
  }
}

export function savePeople(people: PersonRecord[]): void {
  const stored: StoredPeople = { version: 1, people };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

export function createPerson(name: string, typeId: TypeId, relationship: string): PersonRecord {
  return { id: crypto.randomUUID(), name: name.trim(), typeId, relationship: relationship.trim(), confidence: "Working" };
}

export function loadSelectedPersonId(): string | null {
  return window.localStorage.getItem(SELECTED_KEY);
}

export function saveSelectedPersonId(id: string): void {
  window.localStorage.setItem(SELECTED_KEY, id);
}
