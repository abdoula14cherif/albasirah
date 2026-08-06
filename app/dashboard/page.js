"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const sections = [
  { label: "As-Sirah", arabic: "السيرة", sub: "Vie du Prophète ﷺ", count: 42 },
  { label: "As-Sahaba", arabic: "الصحابة", sub: "Les Compagnons", count: 87 },
  { label: "Al-Aqida", arabic: "العقيدة", sub: "Croyance des Salaf", count: 23 },
  { label: "Les Savants", arabic: "العلماء", sub: "Paroles & biographies", count: 56 },
  { label: "Fiqh", arabic: "الفقه", sub: "Le quotidien du croyant", count: 31 },
  { label: "Hadith", arabic: "الحديث", sub: "Boukhari & Mouslim", count: 120 },
];

const featured = [
  { title: "L'histoire de Julaybib", tag: "Sahaba" },
  { title: "La grotte de Thawr", tag: "Sirah" },
  { title: "Qui étaient les Salaf ?", tag: "Aqida" },
];

const navItems = [
  { id: "accueil", label: "Accueil", href: "/dashboard", icon: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" },
  { id: "biblio", label: "Bibliothèque", href: "/bibliotheque", icon: "M4 4h6v16H4zM14 4h6v16h-6z" },
  { id: "savants", label: "Savants", href: "/bibliotheque", icon: "M12 3l8 4-8 4-8-4 8-4zM4 11v6l8 4 8-4v-6" },
  { id: "profil", label: "Profil", href: "/dashboard", icon: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0" },
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
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <div style={styles.arabic}>البصيرة</div>
            <div style={styles.welcome}>Salam, {user?.email?.split("@")[0]}</div>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Déconnexion
          </button>
        </div>
      </div>

      <div style={styles.body}>
        <Link href="/bibliotheque" style={styles.searchBar}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B9490" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <span style={styles.searchPlaceholder}>Rechercher un savant, un récit…</span>
        </Link>

        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>La bibliothèque</span>
          <Link href="/bibliotheque" style={styles.sectionCount}>
            Voir tout →
          </Link>
        </div>
        <div style={styles.grid}>
          {sections.map((s, i) => (
            <Link key={i} href="/bibliotheque" style={styles.card}>
              <div style={styles.cardArabic}>{s.arabic}</div>
              <div style={styles.cardLabel}>{s.label}</div>
              <div style={styles.cardSub}>{s.sub}</div>
              <div style={styles.cardCount}>{s.count} textes</div>
            </Link>
          ))}
        </div>

        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>À découvrir</span>
        </div>
        <div style={styles.featuredList}>
          {featured.map((f, i) => (
            <Link key={i} href="/bibliotheque" style={styles.featuredRow}>
              <span style={styles.featuredIndex}>{String(i + 1).padStart(2, "0")}</span>
              <div style={styles.featuredMid}>
                <div style={styles.featuredTitle}>{f.title}</div>
                <div style={styles.featuredMeta}>{f.tag}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8935A" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      <div style={styles.nav}>
        {navItems.map((item) => (
          <Link key={item.id} href={item.href} style={styles.navItem}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B9490" strokeWidth="2">
              <path d={item.icon} />
            </svg>
            <span style={styles.navLabel}>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  loadingScreen: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#10242A", color: "#F6F1E4", fontFamily: "'Inter', sans-serif" },
  page: { minHeight: "100vh", background: "#F6F1E4", fontFamily: "'Inter', sans-serif", paddingBottom: 90 },
  header: { background: "#10242A", padding: "26px 20px 22px" },
  headerTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  arabic: { fontFamily: "'Amiri', serif", fontSize: 22, color: "#B8935A", lineHeight: 1 },
  welcome: { fontSize: 13, color: "#B9C4BF", marginTop: 6 },
  logoutBtn: { background: "transparent", color: "#F6F1E4", border: "1px solid rgba(246,241,228,0.3)", padding: "9px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer" },
  body: { padding: "20px 20px 12px" },
  searchBar: { display: "flex", alignItems: "center", gap: 8, background: "#FFFFFF", border: "1px solid rgba(16,36,42,0.1)", borderRadius: 14, padding: "12px 14px", marginBottom: 24, textDecoration: "none" },
  searchPlaceholder: { fontSize: 13, color: "#8B9490" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: 700, color: "#10242A", letterSpacing: 0.3 },
  sectionCount: { fontSize: 11, color: "#B8935A", fontWeight: 700, textDecoration: "none" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 },
  card: { background: "#FFFFFF", border: "1.5px solid rgba(16,36,42,0.08)", borderRadius: 16, padding: "14px 12px", textDecoration: "none", display: "block" },
  cardArabic: { fontFamily: "'Amiri', serif", fontSize: 13, color: "#B8935A", marginBottom: 6 },
  cardLabel: { fontSize: 14, fontWeight: 700, color: "#10242A" },
  cardSub: { fontSize: 10.5, color: "#6B7570", marginTop: 2, marginBottom: 8 },
  cardCount: { fontSize: 10, fontWeight: 600, color: "#6B8F71" },
  featuredList: { display: "flex", flexDirection: "column" },
  featuredRow: { display: "flex", alignItems: "center", gap: 12, padding: "12px 4px", borderBottom: "1px solid rgba(16,36,42,0.08)", textDecoration: "none" },
  featuredIndex: { fontFamily: "'Amiri', serif", fontSize: 15, color: "#B8935A", width: 20 },
  featuredMid: { flex: 1 },
  featuredTitle: { fontSize: 13.5, fontWeight: 600, color: "#10242A" },
  featuredMeta: { fontSize: 11, color: "#8B9490", marginTop: 2 },
  nav: { position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", background: "#FFFFFF", borderTop: "1px solid rgba(16,36,42,0.08)", padding: "10px 8px calc(10px + env(safe-area-inset-bottom))", zIndex: 50 },
  navItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textDecoration: "none" },
  navLabel: { fontSize: 9.5, fontWeight: 600, color: "#8B9490" },
};
