import type { PersonRecord } from "./personStorage.ts";

export function resolveComparisonPersonId(
  people: PersonRecord[],
  selectedPersonId: string,
  preferredPersonId: string | null,
): string | null {
  const preferredIsAvailable = people.some(
    (person) =>
      person.id === preferredPersonId && person.id !== selectedPersonId,
  );

  if (preferredIsAvailable) return preferredPersonId;

  return people.find((person) => person.id !== selectedPersonId)?.id ?? null;
}
