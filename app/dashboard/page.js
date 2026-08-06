"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const sections = [
  { label: "As-Sirah", arabic: "السيرة", sub: "Vie du Prophète ﷺ" },
  { label: "As-Sahaba", arabic: "الصحابة", sub: "Les Compagnons" },
  { label: "Al-Aqida", arabic: "العقيدة", sub: "Croyance des Salaf" },
  { label: "Les Savants", arabic: "العلماء", sub: "Paroles & biographies" },
  { label: "Fiqh", arabic: "الفقه", sub: "Le quotidien du croyant" },
  { label: "Hadith", arabic: "الحديث", sub: "Boukhari & Mouslim" },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    }
    loadUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return <div style={styles.loadingScreen}>Chargement...</div>;
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          <div style={styles.arabic}>البصيرة</div>
          <div style={styles.welcome}>Bienvenue, {user?.email}</div>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Se déconnecter
        </button>
      </div>

      <div style={styles.sectionTitle}>La bibliothèque</div>
      <div style={styles.grid}>
        {sections.map((s, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardArabic}>{s.arabic}</div>
            <div style={styles.cardLabel}>{s.label}</div>
            <div style={styles.cardSub}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  loadingScreen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#10242A",
    color: "#F6F1E4",
    fontFamily: "'Inter', sans-serif",
  },
  wrap: {
    minHeight: "100vh",
    background: "#F6F1E4",
    padding: "28px 20px",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
    flexWrap: "wrap",
    gap: 12,
  },
  arabic: {
    fontFamily: "'Amiri', serif",
    fontSize: 22,
    color: "#B8935A",
  },
  welcome: {
    fontSize: 13,
    color: "#10242A",
    marginTop: 4,
  },
  logoutBtn: {
    background: "#10242A",
    color: "#F6F1E4",
    border: "none",
    padding: "10px 18px",
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  sectionTitle: {
    fontFamily: "'Amiri', serif",
    fontSize: 20,
    color: "#10242A",
    marginBottom: 18,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  card: {
    background: "#FFFFFF",
    border: "1px solid rgba(16,36,42,0.08)",
    borderRadius: 16,
    padding: "18px 14px",
  },
  cardArabic: {
    fontFamily: "'Amiri', serif",
    fontSize: 15,
    color: "#B8935A",
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: "#10242A",
  },
  cardSub: {
    fontSize: 11,
    color: "#8B9490",
    marginTop: 3,
  },
};
