"use client";

import { Home, Search, MessageCircle, User, Plus } from "lucide-react";
import { motion } from "framer-motion";

type WelcomeBottomNavProps = {
  onCreate?: () => void;
};

export default function WelcomeBottomNav({ onCreate }: WelcomeBottomNavProps) {
  return (
    <nav className="welcome-bottom-nav" aria-label="App navigation preview">
      <div className="welcome-bottom-nav-inner">
        <button type="button" className="welcome-nav-item is-active" aria-label="Home" aria-current="page">
          <Home size={20} strokeWidth={2} />
          <span className="welcome-nav-label font-body">Home</span>
        </button>
        <button type="button" className="welcome-nav-item" aria-label="Explore">
          <Search size={20} strokeWidth={2} />
          <span className="welcome-nav-label font-body">Explore</span>
        </button>

        <motion.button
          type="button"
          className="welcome-nav-create"
          aria-label="Create"
          onClick={onCreate}
          whileTap={{ scale: 0.92 }}
          animate={{ boxShadow: ["0 0 24px rgba(255,77,109,0.45)", "0 0 36px rgba(168,85,247,0.55)", "0 0 24px rgba(255,77,109,0.45)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Plus size={26} strokeWidth={2.5} />
        </motion.button>

        <button type="button" className="welcome-nav-item" aria-label="Inbox">
          <MessageCircle size={20} strokeWidth={2} />
          <span className="welcome-nav-label font-body">Inbox</span>
        </button>
        <button type="button" className="welcome-nav-item" aria-label="Profile">
          <User size={20} strokeWidth={2} />
          <span className="welcome-nav-label font-body">Profile</span>
        </button>
      </div>
    </nav>
  );
}
