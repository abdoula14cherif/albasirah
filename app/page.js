export default function Home() {
  return (
    <>
      <nav>
        <div className="nav-brand">
          <span className="ar">البصيرة</span>
          <span className="lat">Albasirah</span>
        </div>
        <div className="nav-links">
          <a href="#bibliotheque">Bibliothèque</a>
          <a href="#mission">Notre approche</a>
          <a href="#sources">Sources</a>
        </div>
        <a href="/login" className="nav-cta" style={{textDecoration:"none", display:"inline-block"}}>Se connecter</a>
      </nav>

      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-inner">
          <div>
            <div className="eyebrow">Bientôt disponible</div>
            <h1>
              La clarté avant <span>l&apos;action</span>.
            </h1>
            <p className="lead">
              Albasirah rassemble la sirah, les Sahaba, l&apos;aqida des Salaf
              et la parole des savants dans une seule bibliothèque, sourcée
              et vérifiée — pour apprendre sans se perdre.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">Être prévenu au lancement</button>
              <button className="btn-ghost">Découvrir la bibliothèque</button>
            </div>
            <div className="hero-stats">
              <div>
                <b>350+</b>
                <span>Textes sourcés</span>
              </div>
              <div>
                <b>6</b>
                <span>Sections</span>
              </div>
              <div>
                <b>2</b>
                <span>Recueils : Boukhari &amp; Mouslim</span>
              </div>
            </div>
          </div>
          <div className="phone-mock">
            <div className="phone-header">
              <div className="ar">البصيرة</div>
              <div className="lat">ALBASIRAH</div>
            </div>
            <div className="phone-body">
              <div className="phone-search">Rechercher un savant, un récit…</div>
              <div className="phone-grid">
                <div className="phone-card">
                  <div className="ar">السيرة</div>
                  <div className="name">As-Sirah</div>
                  <div className="sub">Vie du Prophète ﷺ</div>
                </div>
                <div className="phone-card">
                  <div className="ar">الصحابة</div>
                  <div className="name">As-Sahaba</div>
                  <div className="sub">Les Compagnons</div>
                </div>
                <div className="phone-card">
                  <div className="ar">العقيدة</div>
                  <div className="name">Al-Aqida</div>
                  <div className="sub">Croyance des Salaf</div>
                </div>
                <div className="phone-card">
                  <div className="ar">العلماء</div>
                  <div className="name">Les Savants</div>
                  <div className="sub">Paroles &amp; biographies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="bibliotheque">
        <div className="section-head">
          <div className="section-eyebrow">La bibliothèque</div>
          <h2>Six sections, une seule règle : chaque texte est sourcé.</h2>
          <p>
            Sirah, Sahaba, aqida, fiqh, hadith et paroles des savants —
            organisés comme un catalogue, pas comme un fil d&apos;actualité.
          </p>
        </div>
        <div className="lib-grid">
          <div className="lib-item">
            <span className="lib-num">01</span>
            <div className="ar">السيرة</div>
            <h3>As-Sirah</h3>
            <p>La vie du Prophète ﷺ, de la Mecque à Médine.</p>
          </div>
          <div className="lib-item">
            <span className="lib-num">02</span>
            <div className="ar">الصحابة</div>
            <h3>As-Sahaba</h3>
            <p>Les compagnons, leurs récits et leurs mérites.</p>
          </div>
          <div className="lib-item">
            <span className="lib-num">03</span>
            <div className="ar">العقيدة</div>
            <h3>Al-Aqida</h3>
            <p>La croyance selon la compréhension des Salaf.</p>
          </div>
          <div className="lib-item">
            <span className="lib-num">04</span>
            <div className="ar">العلماء</div>
            <h3>Les Savants</h3>
            <p>Biographies et paroles, chaque citation référencée.</p>
          </div>
          <div className="lib-item">
            <span className="lib-num">05</span>
            <div className="ar">الفقه</div>
            <h3>Fiqh</h3>
            <p>La pratique religieuse du quotidien.</p>
          </div>
          <div className="lib-item">
            <span className="lib-num">06</span>
            <div className="ar">الحديث</div>
            <h3>Hadith</h3>
            <p>Boukhari et Mouslim, texte et degré d&apos;authenticité.</p>
          </div>
        </div>
      </section>

      <section className="mission" id="mission">
        <div className="section-head">
          <div className="section-eyebrow">Notre approche</div>
          <h2>Apprendre à la source, pas au bouche-à-oreille.</h2>
          <p>Trop de récits circulent sans référence. Albasirah part du texte, pas de la tendance.</p>
        </div>
        <div className="mission-grid">
          <div className="mission-card">
            <h4>Sourcé</h4>
            <p>Chaque récit indique son narrateur et son recueil — jamais une histoire sans origine vérifiable.</p>
          </div>
          <div className="mission-card">
            <h4>Organisé</h4>
            <p>Une bibliothèque, pas un flux. On retrouve un texte, on ne le perd pas dans un défilement infini.</p>
          </div>
          <div className="mission-card">
            <h4>Accompagné</h4>
            <p>Textes courts et audios pour apprendre à son rythme, sans dénaturer le contenu original.</p>
          </div>
        </div>
      </section>

      <section id="sources">
        <div className="sources">
          <div className="sources-text">
            <div className="section-eyebrow">Sources</div>
            <h2 style={{ fontFamily: "'Amiri',serif", fontSize: "clamp(26px,3vw,36px)", marginTop: 14, lineHeight: 1.2 }}>
              Rien n&apos;entre dans la bibliothèque sans référence.
            </h2>
            <p style={{ marginTop: 16, color: "#4E5A56", fontSize: 15 }}>
              Chaque texte est vérifié avant publication, avec son narrateur, son recueil et son degré d&apos;authenticité quand cela s&apos;applique.
            </p>
          </div>
          <div className="sources-list">
            <div className="source-row">
              <span className="name">Sahih al-Boukhari</span>
              <span className="tag">Hadith</span>
            </div>
            <div className="source-row">
              <span className="name">Sahih Mouslim</span>
              <span className="tag">Hadith</span>
            </div>
            <div className="source-row">
              <span className="name">Al-Isaba — Ibn Hajar al-Asqalani</span>
              <span className="tag">Sahaba</span>
            </div>
            <div className="source-row">
              <span className="name">Sirat Ibn Hicham</span>
              <span className="tag">Sirah</span>
            </div>
            <div className="source-row">
              <span className="name">Vérifications — cheikh Al-Albani</span>
              <span className="tag">Authenticité</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Sois prévenu dès le lancement.</h2>
        <p>Aucune notification inutile — juste un message quand Albasirah ouvre ses portes.</p>
        <div className="cta-form">
          <input type="email" placeholder="ton@email.com" />
          <button>Rejoindre</button>
        </div>
      </section>

      <footer>
        <div>
          <span className="ar">البصيرة</span> — Albasirah
        </div>
        <div>© 2026 Albasirah. La clarté avant l&apos;action.</div>
      </footer>
    </>
  );
}
