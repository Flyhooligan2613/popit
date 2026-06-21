"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PopitBrandLogo from "@/components/brand/PopitBrandLogo";
import IdentityPicker from "@/components/onboarding/IdentityPicker";
import IdentityTopicPicker from "@/components/onboarding/IdentityTopicPicker";
import BackNavButton from "@/components/nav/BackNavButton";
import type { IdentityType } from "@/lib/identity/types";
import { getIdentityAccent } from "@/lib/identity/types";
import { getIdentityTopicLabel } from "@/lib/identity/identityTopics";
import { saveUserIdentity, saveUserProfile } from "@/lib/identity/userProfile";
import { signUpWithEmail, signInWithIdentifier } from "@/lib/supabase/auth";
import { markOnboardingComplete } from "@/lib/session";
import type { LoginMethod } from "@/lib/auth/localAuth";

const LOGIN_METHODS: { id: LoginMethod; label: string; placeholder: string }[] = [
  { id: "email", label: "Email", placeholder: "Email address" },
  { id: "username", label: "Username", placeholder: "Username" },
  { id: "phone", label: "Phone", placeholder: "Phone number" },
];

export default function Frame7({
  onNext,
  onBack,
  initialMode = "signup",
}: {
  onNext: () => void;
  onBack?: () => void;
  initialMode?: "signup" | "signin";
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "signin">(initialMode);
  const [step, setStep] = useState<"account" | "identity">("account");
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [loginId, setLoginId] = useState("");
  const [identity, setIdentity] = useState<IdentityType | null>(null);
  const [identityTopic, setIdentityTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleIdentitySelect = (id: IdentityType) => {
    setIdentity(id);
    setIdentityTopic(null);
  };

  const canClaimIdentity = Boolean(identity && identityTopic);

  const validateSignup = () => {
    if (form.username.trim().length < 3) {
      return "Username must be at least 3 characters.";
    }
    if (!form.email.includes("@")) {
      return "Enter a valid email.";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (form.password !== form.confirm) {
      return "Passwords do not match.";
    }
    return null;
  };

  const validateSignin = () => {
    if (!loginId.trim()) {
      return loginMethod === "email"
        ? "Enter your email."
        : loginMethod === "username"
          ? "Enter your username."
          : "Enter your phone number.";
    }
    if (loginMethod === "email" && !loginId.includes("@")) {
      return "Enter a valid email.";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  };

  const handleAccountNext = async () => {
    setError(null);

    if (mode === "signin") {
      const validationError = validateSignin();
      if (validationError) {
        setError(validationError);
        return;
      }

      setLoading(true);
      try {
        await signInWithIdentifier({
          method: loginMethod,
          identifier: loginId,
          password: form.password,
        });
        markOnboardingComplete();
        router.push("/pulse");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Sign in failed.");
      } finally {
        setLoading(false);
      }
      return;
    }

    const validationError = validateSignup();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (form.username) {
      saveUserProfile({ username: form.username, name: form.username });
    }
    setStep("identity");
  };

  const handleIdentityNext = async () => {
    if (!identity || !identityTopic) return;
    setError(null);
    setLoading(true);

    const topicLabel = getIdentityTopicLabel(identity, identityTopic) ?? identityTopic;

    try {
      const result = await signUpWithEmail({
        email: form.email,
        password: form.password,
        username: form.username,
        identity,
        identityTopic,
        identityTopicLabel: topicLabel,
        phone: form.phone || undefined,
      });

      saveUserIdentity(identity);
      saveUserProfile({
        username: form.username,
        name: form.username,
        identity,
        identityTopic,
        identityTopicLabel: topicLabel,
      });

      if (result.needsEmailConfirmation) {
        setError("Account created — check your email to confirm, then sign in.");
        setMode("signin");
        setStep("account");
        setLoginMethod("email");
        setLoginId(form.email);
        return;
      }

      onNext();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  const switchToSignIn = () => {
    setMode("signin");
    setStep("account");
    setError(null);
  };

  const switchToSignUp = () => {
    setMode("signup");
    setStep("account");
    setError(null);
  };

  const handleBack = () => {
    if (step === "identity") {
      setStep("account");
      setError(null);
      return;
    }
    onBack?.();
  };

  const inputStyle = {
    width: "100%",
    padding: "15px 18px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.055)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#fff",
    fontFamily: "system-ui, sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const activeLogin = LOGIN_METHODS.find((m) => m.id === loginMethod)!;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 28px" }}>
      {onBack && (
        <div
          style={{
            position: "fixed",
            top: "max(0.75rem, env(safe-area-inset-top, 0px))",
            left: "max(1rem, env(safe-area-inset-left, 0px))",
            zIndex: 20,
          }}
        >
          <BackNavButton onClick={handleBack} />
        </div>
      )}

      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>

        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <PopitBrandLogo markWidth={100} markHeight={140} showWordmark={false} />
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#FF4D6D", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 8px", fontFamily: "system-ui, sans-serif" }}>
              {step === "account"
                ? mode === "signin"
                  ? "Welcome Back"
                  : "Step 1 of 3"
                : "Choose Your Identity"}
            </p>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem, 5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", margin: "0 0 8px", fontFamily: "system-ui, sans-serif" }}>
              {step === "account"
                ? mode === "signin"
                  ? "Sign In"
                  : "Create Your Account"
                : "Who Are You in the City?"}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.95rem", margin: 0, fontFamily: "system-ui, sans-serif" }}>
              {step === "account"
                ? mode === "signin"
                  ? "Sign in with email, username, or phone."
                  : "Join the culture."
                : "Pick your lane — every identity has a specialty."}
            </p>
          </div>
        </motion.div>

        {error && (
          <p style={{ width: "100%", textAlign: "center", color: "#FF4D6D", fontSize: "0.85rem", fontFamily: "system-ui, sans-serif", margin: 0 }}>
            {error}
          </p>
        )}

        {step === "account" ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            {mode === "signin" && (
              <div style={{ display: "flex", gap: 6, padding: 4, borderRadius: 99, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {LOGIN_METHODS.map((method) => {
                  const active = loginMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setLoginMethod(method.id);
                        setLoginId("");
                        setError(null);
                      }}
                      style={{
                        flex: 1,
                        padding: "10px 8px",
                        borderRadius: 99,
                        border: "none",
                        background: active ? "linear-gradient(90deg, #FF4D6D, #A855F7)" : "transparent",
                        color: active ? "#fff" : "rgba(255,255,255,0.45)",
                        fontFamily: "system-ui, sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "background 0.2s ease",
                      }}
                    >
                      {method.label}
                    </button>
                  );
                })}
              </div>
            )}

            {mode === "signup" ? (
              [
                { key: "username", placeholder: "Username", type: "text" },
                { key: "email", placeholder: "Email", type: "email" },
                { key: "phone", placeholder: "Phone (optional)", type: "tel" },
                { key: "password", placeholder: "Password", type: "password" },
                { key: "confirm", placeholder: "Confirm Password", type: "password" },
              ].map(({ key, placeholder, type }, i) => (
                <motion.input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                  style={inputStyle}
                />
              ))
            ) : (
              [
                {
                  key: "loginId",
                  placeholder: activeLogin.placeholder,
                  type: loginMethod === "email" ? "email" : loginMethod === "phone" ? "tel" : "text",
                  value: loginId,
                  onChange: (v: string) => setLoginId(v),
                },
                {
                  key: "password",
                  placeholder: "Password",
                  type: "password",
                  value: form.password,
                  onChange: (v: string) => setForm((f) => ({ ...f, password: v })),
                },
              ].map(({ key, placeholder, type, value, onChange }, i) => (
                <motion.input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                  style={inputStyle}
                />
              ))
            )}

            <div style={{ height: 4 }} />

            <button
              onClick={handleAccountNext}
              disabled={loading}
              style={{ width: "100%", padding: "17px", borderRadius: 99, border: "none", background: "linear-gradient(90deg, #FF4D6D, #A855F7, #00D4FF)", color: "#fff", fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: "1rem", cursor: loading ? "wait" : "pointer", boxShadow: "0 0 32px rgba(255,77,109,0.35)", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Continue"}
            </button>

            <button
              onClick={mode === "signin" ? switchToSignUp : switchToSignIn}
              style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.28)", fontFamily: "system-ui, sans-serif", fontSize: "0.875rem", cursor: "pointer", padding: "8px", width: "100%" }}
            >
              {mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign In"}
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%" }} className="flex flex-col gap-4">
            <IdentityPicker selected={identity} onSelect={handleIdentitySelect} />
            {identity && (
              <IdentityTopicPicker
                identity={identity}
                selectedTopic={identityTopic}
                onSelect={setIdentityTopic}
                accent={getIdentityAccent(identity)}
              />
            )}
            <button
              onClick={handleIdentityNext}
              disabled={!canClaimIdentity || loading}
              style={{
                width: "100%",
                padding: "17px",
                borderRadius: 99,
                border: "none",
                background: canClaimIdentity && !loading ? "linear-gradient(90deg, #FF4D6D, #A855F7, #00D4FF)" : "rgba(255,255,255,0.1)",
                color: "#fff",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: canClaimIdentity && !loading ? "pointer" : "not-allowed",
                boxShadow: canClaimIdentity && !loading ? "0 0 32px rgba(255,77,109,0.35)" : "none",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creating account..." : "Claim My Identity"}
            </button>
            <button
              type="button"
              onClick={() => setStep("account")}
              style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.28)", fontFamily: "system-ui, sans-serif", fontSize: "0.875rem", cursor: "pointer", padding: "8px", width: "100%" }}
            >
              Back
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
