"use client";

import Link from "next/link";
import PopitLens from "@/components/profile/PopitLens";
import SocialPageShell from "./SocialPageShell";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/social/socialStore";
import { useSocialStore } from "@/lib/social/useSocialStore";
import type { SocialNotification } from "@/lib/social/types";

const ICONS: Record<SocialNotification["type"], string> = {
  like: "❤️",
  comment: "💬",
  follow: "➕",
  mention: "@",
  repost: "🔁",
  live: "🔴",
  story: "⭕",
  invite: "📍",
  city: "🌆",
};

export default function NotificationsHub() {
  const { state, refresh } = useSocialStore();
  const unread = state.notifications.filter((n) => !n.read).length;

  const handleRead = (id: string) => {
    markNotificationRead(id);
    refresh();
  };

  const handleReadAll = () => {
    markAllNotificationsRead();
    refresh();
  };

  return (
    <SocialPageShell
      title="Notifications"
      subtitle="Likes, follows, live alerts & city pulses"
      headerRight={
        unread > 0 ? (
          <button type="button" className="notifications-hub__read-all" onClick={handleReadAll}>
            Mark all read
          </button>
        ) : null
      }
    >
      <div className="notifications-hub__list">
        {state.notifications.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`notifications-hub__row ${item.read ? "" : "is-unread"}`}
            onClick={() => handleRead(item.id)}
          >
            <span className="notifications-hub__icon">{ICONS[item.type]}</span>
            <PopitLens
              name={item.name}
              followers={0}
              accent={item.accent}
              size={44}
              followersBeneath={false}
            />
            <div className="notifications-hub__body">
              <p>
                <strong>{item.name}</strong> {item.text}
              </p>
              <span className="notifications-hub__time">{item.time}</span>
            </div>
            {item.postId && (
              <Link href="/feed" className="notifications-hub__view" onClick={(e) => e.stopPropagation()}>
                View
              </Link>
            )}
          </button>
        ))}
      </div>
    </SocialPageShell>
  );
}
