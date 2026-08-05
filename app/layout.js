import "./globals.css";

export const metadata = {
  title: "Albasirah — البصيرة",
  description: "La sirah, les Sahaba, l'aqida des Salaf et la parole des savants, sourcées et organisées.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
