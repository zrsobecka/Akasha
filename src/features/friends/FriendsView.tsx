import { ArrowLeft, Edit3, MessageCircle, Plus, Save, Sparkles, UserRound, X, Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { emptyFriend, loadFriends, PERSONALITY_TYPES, saveFriends, type Friend } from "./friendStorage";

type Mode = "grid" | "detail" | "edit";

function FriendCard({ friend, onOpen }: { friend: Friend; onOpen: () => void }) {
  return (
    <button className="friend-card" onClick={onOpen}>
      <div className="friend-card-top">
        <span className="friend-avatar" aria-hidden="true">{friend.name.slice(0, 1).toUpperCase()}</span>
        <span className="type-badge">{friend.personalityType || "TYPE?"}</span>
      </div>
      <div className="friend-card-heading">
        <h2>{friend.name}</h2>
        <p>{friend.relationship || "Friend"}</p>
      </div>
      <div className="friend-signals">
        <span><MessageCircle size={14} /> <b>Talk</b>{friend.communication || "Add a communication note"}</span>
        <span><Sparkles size={14} /> <b>Motivates</b>{friend.motivates || "Add what gives them energy"}</span>
        <span><Zap size={14} /> <b>Be mindful</b>{friend.avoid || "Add what to be mindful of"}</span>
      </div>
      <span className="open-profile">Open profile <span aria-hidden="true">→</span></span>
    </button>
  );
}

function ProfileSection({ title, value }: { title: string; value: string }) {
  return (
    <section className="profile-section">
      <span className="section-label">{title}</span>
      <p>{value || "Nothing added yet."}</p>
    </section>
  );
}

export default function FriendsView({ createSignal }: { createSignal: number }) {
  const [friends, setFriends] = useState<Friend[]>(loadFriends);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Friend | null>(null);
  const [mode, setMode] = useState<Mode>("grid");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => saveFriends(friends), [friends]);

  useEffect(() => {
    if (createSignal > 0) {
      setDraft(emptyFriend());
      setMode("edit");
    }
  }, [createSignal]);

  useEffect(() => {
    if (mode === "edit") nameRef.current?.focus();
    document.querySelector<HTMLElement>(".main-content")?.scrollTo({ top: 0, behavior: "instant" });
  }, [mode]);

  const selected = useMemo(
    () => friends.find((friend) => friend.id === selectedId) ?? null,
    [friends, selectedId],
  );

  const beginCreate = () => {
    setDraft(emptyFriend());
    setMode("edit");
  };

  const beginEdit = () => {
    if (!selected) return;
    setDraft({ ...selected });
    setMode("edit");
  };

  const saveDraft = () => {
    if (!draft?.name.trim()) return;
    const saved = { ...draft, name: draft.name.trim(), updatedAt: new Date().toISOString() };
    setFriends((current) => current.some((friend) => friend.id === saved.id)
      ? current.map((friend) => friend.id === saved.id ? saved : friend)
      : [...current, saved]);
    setSelectedId(saved.id);
    setDraft(null);
    setMode("detail");
  };

  const closeEditor = () => {
    setDraft(null);
    setMode(selected ? "detail" : "grid");
  };

  if (mode === "edit" && draft) {
    return (
      <div className="friends-view profile-view">
        <header className="view-heading profile-heading">
          <div>
            <span className="eyebrow"><UserRound size={13} /> Friend profile</span>
            <h1>{friends.some((friend) => friend.id === draft.id) ? "Edit friend" : "Add a friend"}</h1>
            <p>Capture what helps you understand and care for this person.</p>
          </div>
          <button className="secondary-action" onClick={closeEditor}><X size={16} /> Cancel</button>
        </header>

        <form className="friend-form" onSubmit={(event) => { event.preventDefault(); saveDraft(); }}>
          <section className="form-panel identity-panel">
            <div className="form-section-heading"><span>01</span><div><h2>Identity</h2><p>The essentials shown at the top of their card.</p></div></div>
            <div className="form-grid">
              <label className="field span-two"><span>Name or nickname</span><input ref={nameRef} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="e.g. Ania" required /></label>
              <label className="field"><span>Personality type</span><select value={draft.personalityType} onChange={(event) => setDraft({ ...draft, personalityType: event.target.value as Friend["personalityType"] })}><option value="">Not set</option>{PERSONALITY_TYPES.map((type) => <option key={type}>{type}</option>)}</select></label>
              <label className="field"><span>Your relationship</span><input value={draft.relationship} onChange={(event) => setDraft({ ...draft, relationship: event.target.value })} placeholder="e.g. close friend" /></label>
            </div>
          </section>

          <section className="form-panel">
            <div className="form-section-heading"><span>02</span><div><h2>Quick understanding</h2><p>Short notes that stay visible on the card.</p></div></div>
            <div className="form-grid">
              <label className="field span-two"><span>How to communicate</span><input value={draft.communication} onChange={(event) => setDraft({ ...draft, communication: event.target.value })} placeholder="e.g. Be direct, but give her time to process" /></label>
              <label className="field span-two"><span>What motivates them</span><input value={draft.motivates} onChange={(event) => setDraft({ ...draft, motivates: event.target.value })} placeholder="e.g. New possibilities and shared plans" /></label>
              <label className="field span-two"><span>What to be mindful of</span><input value={draft.avoid} onChange={(event) => setDraft({ ...draft, avoid: event.target.value })} placeholder="e.g. Pressure and last-minute control" /></label>
            </div>
          </section>

          <section className="form-panel">
            <div className="form-section-heading"><span>03</span><div><h2>Deeper profile</h2><p>Context available after opening the card.</p></div></div>
            <div className="form-grid">
              <label className="field span-two"><span>Important needs</span><textarea value={draft.needs} onChange={(event) => setDraft({ ...draft, needs: event.target.value })} placeholder="What helps them feel safe, understood or supported?" /></label>
              <label className="field span-two"><span>Notes and observations</span><textarea value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} placeholder="Patterns, memorable situations, things worth remembering…" /></label>
            </div>
          </section>

          <div className="form-actions">
            <span>Your notes stay local on this device.</span>
            <button className="primary-action" type="submit" disabled={!draft.name.trim()}><Save size={16} /> Save friend</button>
          </div>
        </form>
      </div>
    );
  }

  if (mode === "detail" && selected) {
    return (
      <div className="friends-view profile-view">
        <button className="back-button" onClick={() => setMode("grid")}><ArrowLeft size={16} /> All friends</button>
        <header className="friend-profile-hero">
          <span className="profile-avatar">{selected.name.slice(0, 1).toUpperCase()}</span>
          <div><span className="eyebrow">Friend profile</span><h1>{selected.name}</h1><p>{selected.relationship || "Friend"}</p></div>
          <span className="type-badge large">{selected.personalityType || "Type not set"}</span>
          <button className="secondary-action" onClick={beginEdit}><Edit3 size={16} /> Edit profile</button>
        </header>
        <div className="profile-grid">
          <ProfileSection title="How to communicate" value={selected.communication} />
          <ProfileSection title="What motivates them" value={selected.motivates} />
          <ProfileSection title="What to be mindful of" value={selected.avoid} />
          <ProfileSection title="Important needs" value={selected.needs} />
          <section className="profile-section wide"><span className="section-label">Notes & observations</span><p>{selected.notes || "Nothing added yet."}</p></section>
        </div>
      </div>
    );
  }

  return (
    <div className="friends-view">
      <header className="view-heading">
        <div><span className="eyebrow"><UsersIcon /> People map</span><h1>Friends</h1><p>Small notes that help you understand the people you care about.</p></div>
        <button className="primary-action" onClick={beginCreate}><Plus size={16} /> Add friend</button>
      </header>
      {friends.length === 0 ? (
        <section className="friends-empty">
          <span className="empty-friend-icon"><UserRound size={25} /></span>
          <h2>Your people map is empty.</h2>
          <p>Add someone you care about. Their card can hold the little things that make communication easier.</p>
          <button className="primary-action" onClick={beginCreate}><Plus size={16} /> Add your first friend</button>
        </section>
      ) : (
        <div className="friends-grid">{friends.map((friend) => <FriendCard key={friend.id} friend={friend} onOpen={() => { setSelectedId(friend.id); setMode("detail"); }} />)}</div>
      )}
    </div>
  );
}

function UsersIcon() {
  return <UserRound size={13} />;
}
