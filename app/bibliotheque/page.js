"use client";

import { useState } from "react";
import Link from "next/link";

const formats = [
  { id: "video", label: "Vidéo", icon: "M23 7l-7 5 7 5V7zM1 5h15v14H1z" },
  { id: "audio", label: "Audio", icon: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "podcast", label: "Podcast", icon: "M12 1a4 4 0 00-4 4v6a4 4 0 008 0V5a4 4 0 00-4-4zM19 11a7 7 0 01-14 0M12 18v4" },
];

const categories = ["Tous", "Aqida", "Sirah", "Sahaba", "Fiqh", "Hadith"];

const books = [
  { title: "Kitab at-Tawhid", author: "Cheikh Muhammad ibn Abdel Wahhab", category: "Aqida" },
  { title: "Al-Aqida al-Wasitiyyah", author: "Ibn Taymiyyah", category: "Aqida" },
  { title: "Sirat Ibn Hicham", author: "Ibn Hicham", category: "Sirah" },
  { title: "Ar-Rahiq al-Makhtum", author: "Safi ar-Rahman al-Moubarakfouri", category: "Sirah" },
  { title: "Al-Isaba fi Tamyiz as-Sahaba", author: "Ibn Hajar al-Asqalani", category: "Sahaba" },
  { title: "Hayat as-Sahaba", author: "Muhammad Yusuf Al-Kandhlawi", category: "Sahaba" },
  { title: "Ach-Charh al-Mumti", author: "Cheikh Ibn al-'Uthaymin", category: "Fiqh" },
  { title: "Riyad as-Salihin", author: "Imam an-Nawawi", category: "Hadith" },
  { title: "Al-Arba'in an-Nawawiyya", author: "Imam an-Nawawi", category: "Hadith" },
];

export default function Bibliotheque() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredBooks =
    activeCategory === "Tous"
      ? books
      : books.filter((b) => b.category === activeCategory);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.arabic}>البصيرة</div>
        <div style={styles.title}>Bibliothèque</div>
      </div>

      <div style={styles.body}>
        {/* Boutons de format */}
        <div style={styles.formatRow}>
          {formats.map((f) => (
            <Link key={f.id} href={`/bibliotheque/${f.id}`} style={styles.formatCard}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8935A" strokeWidth="2">
                <path d={f.icon} />
              </svg>
              <span style={styles.formatLabel}>{f.label}</span>
            </Link>
          ))}
        </div>

        {/* Livres des savants */}
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>Livres des savants</span>
        </div>

        {/* Filtres catégorie */}
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

        {/* Liste des livres */}
        <div style={styles.bookList}>
          {filteredBooks.map((b, i) => (
            <div key={i} style={styles.bookRow}>
              <div style={styles.bookIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8935A" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" />
                </svg>
              </div>
              <div style={styles.bookMid}>
                <div style={styles.bookTitle}>{b.title}</div>
                <div style={styles.bookAuthor}>{b.author}</div>
              </div>
              <span style={styles.bookTag}>{b.category}</span>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <p style={styles.empty}>Aucun livre pour cette catégorie pour l&apos;instant.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F6F1E4",
    fontFamily: "'Inter', sans-serif",
    paddingBottom: 40,
  },
  header: {
    background: "#10242A",
    padding: "26px 20px 22px",
  },
  arabic: {
    fontFamily: "'Amiri', serif",
    fontSize: 20,
    color: "#B8935A",
  },
  title: {
    fontFamily: "'Amiri', serif",
    fontSize: 24,
    color: "#F6F1E4",
    marginTop: 6,
  },
  body: {
    padding: "22px 20px",
  },
  formatRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 10,
    marginBottom: 30,
  },
  formatCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    background: "#FFFFFF",
    border: "1.5px solid rgba(16,36,42,0.08)",
    borderRadius: 16,
    padding: "18px 8px",
    textDecoration: "none",
  },
  formatLabel: {
    fontSize: 12.5,
    fontWeight: 700,
    color: "#10242A",
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#10242A",
    letterSpacing: 0.3,
  },
  chipsRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  chip: {
    border: "1px solid",
    borderRadius: 100,
    padding: "8px 16px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
  bookList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  bookRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#FFFFFF",
    border: "1px solid rgba(16,36,42,0.08)",
    borderRadius: 14,
    padding: "12px 14px",
  },
  bookIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    background: "#F6F1E4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  bookMid: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 13.5,
    fontWeight: 700,
    color: "#10242A",
  },
  bookAuthor: {
    fontSize: 11,
    color: "#8B9490",
    marginTop: 2,
  },
  bookTag: {
    fontSize: 10,
    fontWeight: 700,
    color: "#6B8F71",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  empty: {
    fontSize: 13,
    color: "#8B9490",
    textAlign: "center",
    padding: "20px 0",
  },
};
