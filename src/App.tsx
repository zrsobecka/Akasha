import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleUserRound,
  Dumbbell,
  LayoutDashboard,
  ListFilter,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import "./App.css";
import type { Task, TaskArea } from "./features/tasks/taskStorage";
import { loadTasks, saveTasks } from "./features/tasks/taskStorage";

const AREA_LABELS: Record<TaskArea, string> = {
  personal: "Personal",
  work: "Work",
  sport: "Sport",
  friends: "Friends",
};

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Friends", icon: Users, soon: true },
  { label: "Work", icon: BriefcaseBusiness, soon: true },
  { label: "Sport", icon: Dumbbell, soon: true },
];

function CrocodileMark() {
  return (
    <svg className="crocodile-mark" viewBox="0 0 36 36" aria-hidden="true">
      <path d="M5 20.6C8.7 12.4 15.1 8.8 31 10.4c-3.2 2.3-5.8 5.2-7.8 8.6-4.5-.8-8.6-.3-12.4 1.6l5.5 1.7c-3.8 2.5-7.8 2.7-11.3-1.7Z" />
      <path className="mark-eye" d="M24.1 12.8a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Z" />
      <path className="mark-trace" d="M8.6 24.1h7.7l2.1 2.2h8.9" />
    </svg>
  );
}

function EmptyTasks({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="empty-state">
      <div className="empty-eye" aria-hidden="true"><span /></div>
      <div>
        <strong>Your day is clear.</strong>
        <p>Add one meaningful thing, or enjoy the quiet.</p>
      </div>
      <button className="text-button" onClick={onAdd}>Add a task</button>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [newTask, setNewTask] = useState("");
  const [newTaskArea, setNewTaskArea] = useState<TaskArea>("personal");
  const [showCompleted, setShowCompleted] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => saveTasks(tasks), [tasks]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "n") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const now = new Date();
  const dateLabel = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";

  const completedCount = tasks.filter((task) => task.completed).length;
  const completion = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const focusTask = tasks.find((task) => !task.completed);
  const visibleTasks = showCompleted ? tasks : tasks.filter((task) => !task.completed);
  const areaCounts = useMemo(
    () => tasks.reduce<Partial<Record<TaskArea, number>>>((counts, task) => {
      if (!task.completed) counts[task.area] = (counts[task.area] ?? 0) + 1;
      return counts;
    }, {}),
    [tasks],
  );

  const addTask = () => {
    const title = newTask.trim();
    if (!title) return;
    setTasks((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title,
        area: newTaskArea,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewTask("");
    inputRef.current?.focus();
  };

  const toggleTask = (id: string) => {
    setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )));
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><CrocodileMark /></div>
          <div>
            <span className="brand-name">AKASHA</span>
            <span className="brand-status"><i /> System calm</span>
          </div>
        </div>

        <nav className="primary-nav" aria-label="Main navigation">
          <span className="nav-heading">Your spaces</span>
          {NAV_ITEMS.map(({ label, icon: Icon, active, soon }) => (
            <button className={`nav-item ${active ? "active" : ""}`} key={label} disabled={soon} aria-current={active ? "page" : undefined}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {soon && <span className="soon">Soon</span>}
              {active && <ChevronRight className="nav-arrow" size={15} />}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="circuit-line" aria-hidden="true"><i /><i /><i /></div>
          <button className="nav-item" disabled title="Settings are coming later"><Settings size={18} /><span>Settings</span><span className="soon">Soon</span></button>
          <div className="profile">
            <span className="avatar"><CircleUserRound size={20} /></span>
            <span><strong>Personal space</strong><small>Local & private</small></span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="search-trigger" onClick={() => inputRef.current?.focus()} aria-label="Quick add a task">
            <Search size={16} />
            <span>Quick add a task</span>
            <kbd>Ctrl N</kbd>
          </button>
          <div className="topbar-actions">
            <span className="today-label">{dateLabel}</span>
            <button className="icon-button" aria-label="Notifications coming later" title="Notifications are coming later" disabled><Bell size={17} /></button>
          </div>
        </header>

        <div className="dashboard">
          <section className="welcome-row">
            <div>
              <span className="eyebrow"><Sparkles size={13} /> Daily orientation</span>
              <h1>{greeting}, Zuza.</h1>
              <p>Here’s the shape of your day. Keep it light.</p>
            </div>
            <div className="day-signal" aria-label={`${completion}% of tasks complete`}>
              <span style={{ "--progress": `${completion}%` } as React.CSSProperties}>
                <b>{completion}%</b>
              </span>
              <div><strong>Day signal</strong><small>{completedCount} of {tasks.length} complete</small></div>
            </div>
          </section>

          <section className="focus-panel">
            <div className="focus-trace" aria-hidden="true"><i /><i /><i /></div>
            <div className="focus-copy">
              <span className="section-label">Today’s focus</span>
              <h2>{focusTask?.title ?? "Nothing is asking for your attention."}</h2>
              <p>{focusTask ? `${AREA_LABELS[focusTask.area]} · First meaningful step` : "A clear dashboard is a valid state."}</p>
            </div>
            {focusTask && (
              <button className="focus-action" onClick={() => toggleTask(focusTask.id)}>
                <Check size={17} /> Mark complete
              </button>
            )}
          </section>

          <div className="dashboard-grid">
            <section className="task-section">
              <div className="section-header">
                <div>
                  <span className="section-label">Your current</span>
                  <h2>Today</h2>
                </div>
                <button className={`filter-button ${showCompleted ? "active" : ""}`} onClick={() => setShowCompleted((value) => !value)}>
                  <ListFilter size={15} /> {showCompleted ? "All tasks" : "Open only"}
                </button>
              </div>

              <form className="quick-add" onSubmit={(event) => { event.preventDefault(); addTask(); }}>
                <Plus size={17} />
                <input
                  ref={inputRef}
                  value={newTask}
                  onChange={(event) => setNewTask(event.target.value)}
                  placeholder="Add something to today…"
                  aria-label="New task title"
                />
                <select value={newTaskArea} onChange={(event) => setNewTaskArea(event.target.value as TaskArea)} aria-label="Task area">
                  {Object.entries(AREA_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                </select>
                <kbd>Ctrl N</kbd>
                <button type="submit" disabled={!newTask.trim()}>Add</button>
              </form>

              <div className="task-list" aria-live="polite">
                {visibleTasks.length === 0 ? <EmptyTasks onAdd={() => inputRef.current?.focus()} /> : visibleTasks.map((task) => (
                  <div className={`task-row ${task.completed ? "completed" : ""}`} key={task.id}>
                    <button className="task-check" onClick={() => toggleTask(task.id)} aria-label={`${task.completed ? "Reopen" : "Complete"} ${task.title}`}>
                      {task.completed && <Check size={14} strokeWidth={2.4} />}
                    </button>
                    <div className="task-copy">
                      <span>{task.title}</span>
                      <small><i className={`area-dot ${task.area}`} />{AREA_LABELS[task.area]}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="insight-column">
              <section className="insight-panel">
                <div className="section-header compact">
                  <div><span className="section-label">Balance</span><h3>Open by area</h3></div>
                </div>
                <div className="area-list">
                  {(Object.keys(AREA_LABELS) as TaskArea[]).map((area) => (
                    <div className="area-row" key={area}>
                      <span><i className={`area-dot ${area}`} />{AREA_LABELS[area]}</span>
                      <strong>{areaCounts[area] ?? 0}</strong>
                    </div>
                  ))}
                </div>
              </section>

              <section className="quote-panel">
                <CrocodileMark />
                <p>Move with purpose.<br />Rest without guilt.</p>
                <span>Akasha principle 01</span>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
