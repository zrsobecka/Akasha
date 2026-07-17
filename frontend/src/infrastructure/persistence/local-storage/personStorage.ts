import type { PersonRecord } from "../../../domain/person/person";
import {
  isSupportedType,
  type TypeId,
} from "../../../domain/socionics/socionicsModel.ts";

export type { PersonRecord } from "../../../domain/person/person";

interface StoredPeople {
  version: 1;
  people: PersonRecord[];
}

const STORAGE_KEY = "akasha.socionics.people.v1";
const SELECTED_KEY = "akasha.socionics.selected-person.v1";

function isPersonRecord(value: unknown): value is PersonRecord {
  if (!value || typeof value !== "object") return false;
  const person = value as Partial<PersonRecord>;
  return (
    typeof person.id === "string" &&
    typeof person.name === "string" &&
    isSupportedType(person.typeId) &&
    typeof person.relationship === "string" &&
    (person.confidence === "Exploring" ||
      person.confidence === "Working" ||
      person.confidence === "Strong")
  );
}

export function loadPeople(): PersonRecord[] {
  return decodePeople(window.localStorage.getItem(STORAGE_KEY));
}

export function decodePeople(raw: string | null): PersonRecord[] {
  if (!raw) return [];

  try {
    const stored = JSON.parse(raw) as Partial<StoredPeople>;
    if (stored.version !== 1 || !Array.isArray(stored.people)) return [];
    return stored.people.filter(isPersonRecord);
  } catch {
    return [];
  }
}

export function savePeople(people: PersonRecord[]): void {
  window.localStorage.setItem(STORAGE_KEY, encodePeople(people));
}

export function encodePeople(people: PersonRecord[]): string {
  const stored: StoredPeople = { version: 1, people };
  return JSON.stringify(stored);
}

export function createPerson(
  name: string,
  typeId: TypeId,
  relationship: string,
): PersonRecord {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    typeId,
    relationship: relationship.trim(),
    confidence: "Working",
  };
}

export function updatePerson(
  person: PersonRecord,
  name: string,
  typeId: TypeId,
  relationship: string,
): PersonRecord {
  return {
    ...person,
    name: name.trim(),
    typeId,
    relationship: relationship.trim(),
    confidence: person.typeId === typeId ? person.confidence : "Working",
  };
}

export function loadSelectedPersonId(): string | null {
  return window.localStorage.getItem(SELECTED_KEY);
}

export function saveSelectedPersonId(id: string): void {
  window.localStorage.setItem(SELECTED_KEY, id);
}
