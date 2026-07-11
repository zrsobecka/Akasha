export const PERSONALITY_TYPES = [
  "ENFJ", "ENFP", "ENTJ", "ENTP",
  "ESFJ", "ESFP", "ESTJ", "ESTP",
  "INFJ", "INFP", "INTJ", "INTP",
  "ISFJ", "ISFP", "ISTJ", "ISTP",
] as const;

export type PersonalityType = (typeof PERSONALITY_TYPES)[number] | "";

export interface Friend {
  id: string;
  name: string;
  personalityType: PersonalityType;
  relationship: string;
  communication: string;
  motivates: string;
  avoid: string;
  needs: string;
  notes: string;
  updatedAt: string;
}

interface StoredFriends {
  version: 1;
  friends: Friend[];
}

const STORAGE_KEY = "akasha.friends.v1";

function isFriend(value: unknown): value is Friend {
  if (!value || typeof value !== "object") return false;
  const friend = value as Partial<Friend>;
  return typeof friend.id === "string"
    && typeof friend.name === "string"
    && typeof friend.personalityType === "string"
    && typeof friend.relationship === "string"
    && typeof friend.communication === "string"
    && typeof friend.motivates === "string"
    && typeof friend.avoid === "string"
    && typeof friend.needs === "string"
    && typeof friend.notes === "string"
    && typeof friend.updatedAt === "string";
}

export function loadFriends(): Friend[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const stored = JSON.parse(raw) as Partial<StoredFriends>;
    if (stored.version !== 1 || !Array.isArray(stored.friends)) return [];
    return stored.friends.filter(isFriend);
  } catch {
    return [];
  }
}

export function saveFriends(friends: Friend[]): void {
  const payload: StoredFriends = { version: 1, friends };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function emptyFriend(): Friend {
  return {
    id: crypto.randomUUID(),
    name: "",
    personalityType: "",
    relationship: "",
    communication: "",
    motivates: "",
    avoid: "",
    needs: "",
    notes: "",
    updatedAt: new Date().toISOString(),
  };
}
