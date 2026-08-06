"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

export default function ConfirmedPage() {
  const [status, setStatus] = useState("checking"); // checking | success | error

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data?.session) {
        setStatus("error");
      } else {
        setStatus("success");
      }
    }
    checkSession();
  }, []);

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.arabic}>البصيرة</div>

        {status === "checking" && (
          <p style={styles.text}>Vérification en cours...</p>
        )}

        {status === "success" && (
          <>
            <h1 style={styles.title}>Compte confirmé ✓</h1>
            <p style={styles.text}>
              Ton adresse email a bien été vérifiée. Tu peux maintenant accéder à ta bibliothèque.
            </p>
            <Link href="/dashboard" style={styles.button}>
              Accéder au dashboard
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 style={styles.title}>Lien invalide ou expiré</h1>
            <p style={styles.text}>
              Ce lien de confirmation n&apos;est plus valide. Essaie de te connecter directement, ou de te réinscrire.
            </p>
            <Link href="/login" style={styles.button}>
              Retour à la connexion
            </Link>
          </>
        )}
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
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "#F6F1E4",
    borderRadius: 20,
    padding: "40px 28px",
    width: "100%",
    maxWidth: 380,
    textAlign: "center",
  },
  arabic: {
    fontFamily: "'Amiri', serif",
    fontSize: 26,
    color: "#B8935A",
    marginBottom: 20,
  },
  title: {
    fontFamily: "'Amiri', serif",
    fontSize: 21,
    color: "#10242A",
    marginBottom: 14,
  },
  text: {
    fontSize: 13.5,
    color: "#4E5A56",
    lineHeight: 1.6,
    marginBottom: 24,
  },
  button: {
    display: "inline-block",
    background: "#B8935A",
    color: "#10242A",
    textDecoration: "none",
    padding: "13px 24px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
  },
};
