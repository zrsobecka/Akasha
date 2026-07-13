export type TaskArea = "personal" | "work" | "sport" | "friends";

export interface Task {
  id: string;
  title: string;
  area: TaskArea;
  completed: boolean;
  createdAt: string;
}

interface StoredTasks {
  version: 1;
  tasks: Task[];
}

const STORAGE_KEY = "akasha.tasks.v1";

const STARTER_TASKS: Task[] = [
  {
    id: "starter-focus",
    title: "Shape the first version of Akasha",
    area: "work",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "starter-movement",
    title: "Move for thirty quiet minutes",
    area: "sport",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "starter-friend",
    title: "Check in with someone you care about",
    area: "friends",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "starter-morning",
    title: "Choose today’s main focus",
    area: "personal",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

function isTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") return false;
  const task = value as Partial<Task>;
  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    ["personal", "work", "sport", "friends"].includes(task.area ?? "") &&
    typeof task.completed === "boolean" &&
    typeof task.createdAt === "string"
  );
}

export function loadTasks(): Task[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return STARTER_TASKS;
    const stored = JSON.parse(raw) as Partial<StoredTasks>;
    if (stored.version !== 1 || !Array.isArray(stored.tasks))
      return STARTER_TASKS;
    return stored.tasks.filter(isTask);
  } catch {
    return STARTER_TASKS;
  }
}

export function saveTasks(tasks: Task[]): void {
  const payload: StoredTasks = { version: 1, tasks };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
