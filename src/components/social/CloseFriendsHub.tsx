"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PullToRefresh from "@/components/ui/PullToRefresh";
import PopitLens from "@/components/profile/PopitLens";
import {
  addCloseFriend,
  getCloseFriends,
  removeCloseFriend,
  CLOSE_FRIENDS_UPDATE_EVENT,
  type CloseFriend,
} from "@/lib/social/closeFriends";
import { WELCOME_LOBBY_ROUTE } from "@/lib/session";
import { getIdentityAccent } from "@/lib/identity/types";
import { loadUserProfile } from "@/lib/identity/userProfile";

export default function CloseFriendsHub() {
  const [friends, setFriends] = useState<CloseFriend[]>([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setFriends(getCloseFriends());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(CLOSE_FRIENDS_UPDATE_EVENT, refresh);
    return () => window.removeEventListener(CLOSE_FRIENDS_UPDATE_EVENT, refresh);
  }, [refresh]);

  const handleAdd = async () => {
    setMessage(null);
    const trimmedUser = username.trim();
    if (!trimmedUser) {
      setMessage("Enter a username to add.");
      return;
    }
    const me = await loadUserProfile();
    if (me.username.trim().toLowerCase() === trimmedUser.toLowerCase()) {
      setMessage("You can't add yourself.");
      return;
    }
    const ok = addCloseFriend({
      username: trimmedUser,
      name: name.trim() || trimmedUser,
    });
    if (!ok) {
      setMessage("Already in your Close Friends list.");
      return;
    }
    setUsername("");
    setName("");
    setMessage("Added to Close Friends.");
    refresh();
  };

  const handleRefresh = async () => {
    refresh();
    await new Promise((r) => window.setTimeout(r, 400));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="close-friends-hub">
      <div className="close-friends-hub__head">
        <div className="close-friends-hub__head-row">
          <Link href={WELCOME_LOBBY_ROUTE} className="social-page__back" aria-label="Back">
            ←
          </Link>
          <h1 className="close-friends-hub__title">Close Friends</h1>
        </div>
        <p className="close-friends-hub__sub">
          Your inner circle — stories, check-ins, and live moments stay between you and them.
        </p>
      </div>

      <section className="close-friends-hub__add" aria-label="Add close friend">
        <label className="close-friends-hub__label" htmlFor="cf-username">
          Username
        </label>
        <input
          id="cf-username"
          className="close-friends-hub__input"
          placeholder="@username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="close-friends-hub__label" htmlFor="cf-name">
          Display name (optional)
        </label>
        <input
          id="cf-name"
          className="close-friends-hub__input"
          placeholder="How you know them"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" className="close-friends-hub__add-btn" onClick={() => void handleAdd()}>
          Add to Close Friends
        </button>
        {message && <p className="close-friends-hub__msg">{message}</p>}
      </section>

      <section className="close-friends-hub__list" aria-label="Close friends list">
        <h2 className="close-friends-hub__section-title">Your circle · {friends.length}</h2>
        {friends.length === 0 && (
          <p className="close-friends-hub__empty">
            No close friends yet. Add people you trust — they'll show up here for private sharing.
          </p>
        )}
        {friends.map((friend) => (
          <div key={friend.username} className="close-friends-hub__row">
            <Link href={`/profile/${friend.username}`} className="close-friends-hub__profile">
              <PopitLens
                name={friend.name}
                followers={0}
                accent={getIdentityAccent("personal")}
                size={44}
                followersBeneath={false}
              />
              <div>
                <strong>{friend.name}</strong>
                <span>@{friend.username}</span>
              </div>
            </Link>
            <button
              type="button"
              className="close-friends-hub__remove"
              onClick={() => {
                removeCloseFriend(friend.username);
                refresh();
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </section>
    </PullToRefresh>
  );
}
