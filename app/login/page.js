"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [mode, setMode] = useState("signin"); // "signin" ou "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/confirmed` } });
      if (error) {
        setMessage("Erreur : " + error.message);
      } else {
        setMessage("Compte créé. Vérifie ton email pour confirmer, puis connecte-toi.");
        setMode("signin");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage("Erreur : " + error.message);
      } else {
        router.push("/dashboard");
      }
    }
    setLoading(false);
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.arabic}>البصيرة</div>
        <h1 style={styles.title}>{mode === "signup" ? "Créer un compte" : "Se connecter"}</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Chargement..." : mode === "signup" ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <button
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          style={styles.switchBtn}
        >
          {mode === "signup" ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? S'inscrire"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#10242A",
    padding: 24,
  },
  card: {
    background: "#F6F1E4",
    borderRadius: 20,
    padding: "36px 28px",
    width: "100%",
    maxWidth: 380,
    textAlign: "center",
  },
  arabic: {
    fontFamily: "'Amiri', serif",
    fontSize: 26,
    color: "#B8935A",
    marginBottom: 8,
  },
  title: {
    fontFamily: "'Amiri', serif",
    fontSize: 22,
    color: "#10242A",
    marginBottom: 24,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: "13px 14px",
    borderRadius: 10,
    border: "1px solid rgba(16,36,42,0.15)",
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
  },
  button: {
    background: "#B8935A",
    color: "#10242A",
    border: "none",
    padding: "13px 14px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    marginTop: 4,
  },
  message: {
    fontSize: 13,
    color: "#A8493B",
    marginTop: 16,
  },
  switchBtn: {
    background: "none",
    border: "none",
    color: "#6B8F71",
    fontSize: 13,
    marginTop: 20,
    cursor: "pointer",
    textDecoration: "underline",
  },
};
