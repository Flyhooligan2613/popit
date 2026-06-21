"use client";

import { motion, useReducedMotion } from "framer-motion";
import StartExploringButton from "./StartExploringButton";

type WelcomeLandingFooterProps = {
  loading: boolean;
  isOverdrive: boolean;
  signInBusy: boolean;
  onPrimary: () => void;
  onSignIn: () => void;
};

export default function WelcomeLandingFooter({
  loading,
  isOverdrive,
  signInBusy,
  onPrimary,
  onSignIn,
}: WelcomeLandingFooterProps) {
  const reducedMotion = useReducedMotion();

  return (
    <footer className="popit-home-footer popit-home-footer-mock popit-home-footer-landing">
      <StartExploringButton
        loading={loading}
        isOverdrive={isOverdrive}
        onClick={onPrimary}
        label="Sign Up & Start Exploring"
        loadingLabel="Loading…"
      />

      <motion.button
        type="button"
        onClick={onSignIn}
        disabled={signInBusy}
        whileTap={{ scale: signInBusy ? 1 : 0.98 }}
        animate={
          reducedMotion || signInBusy
            ? undefined
            : { opacity: [0.72, 1, 0.72] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className={`popit-signin-link popit-signin-link-mock font-body ${signInBusy ? "is-connecting" : ""}`}
      >
        {signInBusy ? "Connecting…" : "Already have an account? Sign In"}
      </motion.button>
    </footer>
  );
}
