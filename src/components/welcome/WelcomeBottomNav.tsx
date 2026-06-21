"use client";

import { Home, Search, MessageCircle, User, Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type WelcomeBottomNavProps = {
  onCreate?: () => void;
  onExplore?: () => void;
  onInbox?: () => void;
  onProfile?: () => void;
};

export default function WelcomeBottomNav({
  onCreate,
  onExplore,
  onInbox,
  onProfile,
}: WelcomeBottomNavProps) {
  const reducedMotion = useReducedMotion();

  return (
    <nav className="welcome-bottom-nav welcome-bottom-nav-polish" aria-label="App navigation">
      <div className="welcome-bottom-nav-inner">
        <button type="button" className="welcome-nav-item is-active popit-tap-target" aria-label="Home" aria-current="page">
          <Home size={20} strokeWidth={2} />
          <span className="welcome-nav-label font-body">Home</span>
        </button>
        <button type="button" className="welcome-nav-item popit-tap-target" aria-label="Explore" onClick={onExplore}>
          <Search size={20} strokeWidth={2} />
          <span className="welcome-nav-label font-body">Explore</span>
        </button>

        <motion.button
          type="button"
          className="welcome-nav-create popit-tap-target"
          aria-label="Create"
          onClick={onCreate}
          whileTap={{ scale: 0.92 }}
          animate={
            reducedMotion
              ? undefined
              : {
                  boxShadow: [
                    "0 0 24px rgba(255,77,109,0.45)",
                    "0 0 36px rgba(168,85,247,0.55)",
                    "0 0 24px rgba(255,77,109,0.45)",
                  ],
                }
          }
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Plus size={26} strokeWidth={2.5} />
        </motion.button>

        <button type="button" className="welcome-nav-item popit-tap-target" aria-label="Inbox" onClick={onInbox}>
          <MessageCircle size={20} strokeWidth={2} />
          <span className="welcome-nav-label font-body">Inbox</span>
        </button>
        <button type="button" className="welcome-nav-item popit-tap-target" aria-label="Profile" onClick={onProfile}>
          <User size={20} strokeWidth={2} />
          <span className="welcome-nav-label font-body">Profile</span>
        </button>
      </div>
    </nav>
  );
}
