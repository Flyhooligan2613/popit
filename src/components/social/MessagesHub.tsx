"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PopitLens from "@/components/profile/PopitLens";
import SocialPageShell from "./SocialPageShell";
import { markConversationRead, sendMessage } from "@/lib/social/socialStore";
import { useSocialStore } from "@/lib/social/useSocialStore";

export default function MessagesHub() {
  const { state, refresh } = useSocialStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const active = useMemo(
    () => state.conversations.find((c) => c.id === activeId) ?? null,
    [activeId, state.conversations]
  );

  const messages = activeId ? state.chatMessages[activeId] ?? [] : [];

  const openThread = (id: string) => {
    setActiveId(id);
    markConversationRead(id);
    refresh();
  };

  const handleSend = () => {
    if (!activeId || !draft.trim()) return;
    sendMessage(activeId, draft.trim());
    setDraft("");
    refresh();
  };

  if (active) {
    return (
      <div className="messages-hub messages-hub--thread">
        <header className="messages-hub__thread-head app-page-pad">
          <button type="button" className="messages-hub__back" onClick={() => setActiveId(null)}>
            ←
          </button>
          <Link href={`/profile/${active.username}`} className="messages-hub__thread-user">
            <PopitLens name={active.name} followers={0} accent={active.accent} size={36} followersBeneath={false} />
            <div>
              <strong>{active.name}</strong>
              {active.online && <span className="messages-hub__online">Online</span>}
            </div>
          </Link>
        </header>

        <div className="messages-hub__messages app-page-pad">
          <div className="messages-hub__messages-inner">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`messages-hub__bubble ${msg.fromMe ? "is-me" : "is-them"}`}
              >
                <p>{msg.text}</p>
                <span>{msg.time}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="messages-hub__compose app-page-pad">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Message…"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button type="button" onClick={handleSend} disabled={!draft.trim()}>
            Send
          </button>
        </footer>
      </div>
    );
  }

  return (
    <SocialPageShell
      title="Messages"
      subtitle="Direct lens-to-lens · same on web & mobile"
      backHref="/onboarding?skipIntro=1&explore=1"
    >
      <div className="messages-hub__list">
        {state.conversations.map((convo) => (
          <button
            key={convo.id}
            type="button"
            className="messages-hub__row"
            onClick={() => openThread(convo.id)}
          >
            <PopitLens
              name={convo.name}
              followers={0}
              accent={convo.accent}
              size={52}
              followersBeneath={false}
            />
            <div className="messages-hub__row-body">
              <div className="messages-hub__row-top">
                <strong>{convo.name}</strong>
                <span>{convo.time}</span>
              </div>
              <p className={convo.unread ? "is-unread" : ""}>{convo.lastMessage}</p>
            </div>
            {convo.unread > 0 && <span className="messages-hub__badge">{convo.unread}</span>}
          </button>
        ))}
      </div>
    </SocialPageShell>
  );
}
