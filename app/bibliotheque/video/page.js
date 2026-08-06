"use client";

import { useState } from "react";
import Link from "next/link";

const categories = ["Tous", "Aqida", "Sirah", "Sahaba", "Fiqh", "Hadith"];

const videos = [
  { title: "La bataille de Badr expliquée", category: "Sirah", duration: "18 min" },
  { title: "Qui sont les Salaf ?", category: "Aqida", duration: "12 min" },
  { title: "L'histoire de Bilal ibn Rabah", category: "Sahaba", duration: "9 min" },
];

export default function VideoPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const filtered =
    activeCategory === "Tous" ? videos : videos.filter((v) => v.category === activeCategory);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Link href="/bibliotheque" style={styles.back}>← Bibliothèque</Link>
        <div style={styles.title}>Vidéos</div>
      </div>

      <div style={styles.body}>
        <div style={styles.chipsRow}>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...styles.chip,
                  background: active ? "#10242A" : "#FFFFFF",
                  color: active ? "#B8935A" : "#10242A",
                  borderColor: active ? "#10242A" : "rgba(16,36,42,0.15)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div style={styles.list}>
          {filtered.map((v, i) => (
            <div key={i} style={styles.item}>
              <div style={styles.thumb}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8935A" strokeWidth="2">
                  <path d="M23 7l-7 5 7 5V7zM1 5h15v14H1z" />
                </svg>
              </div>
              <div style={styles.mid}>
                <div style={styles.itemTitle}>{v.title}</div>
                <div style={styles.itemMeta}>{v.category} · {v.duration}</div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p style={styles.empty}>Aucune vidéo pour cette catégorie pour l&apos;instant.</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#F6F1E4", fontFamily: "'Inter', sans-serif", paddingBottom: 40 },
  header: { background: "#10242A", padding: "26px 20px 22px" },
  back: { color: "#B8935A", fontSize: 12.5, fontWeight: 600, textDecoration: "none" },
  title: { fontFamily: "'Amiri', serif", fontSize: 24, color: "#F6F1E4", marginTop: 8 },
  body: { padding: "22px 20px" },
  chipsRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 },
  chip: { border: "1px solid", borderRadius: 100, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  list: { display: "flex", flexDirection: "column", gap: 8 },
  item: { display: "flex", alignItems: "center", gap: 12, background: "#FFFFFF", border: "1px solid rgba(16,36,42,0.08)", borderRadius: 14, padding: "12px 14px" },
  thumb: { width: 40, height: 40, borderRadius: 10, background: "#F6F1E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  mid: { flex: 1 },
  itemTitle: { fontSize: 13.5, fontWeight: 700, color: "#10242A" },
  itemMeta: { fontSize: 11, color: "#8B9490", marginTop: 2 },
  empty: { fontSize: 13, color: "#8B9490", textAlign: "center", padding: "20px 0" },
};
