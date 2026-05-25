// Renderer for TapScan legal pages.
//
// Each page loads its content data into window.LP_TERMS / LP_COOKIES /
// LP_ACCEPTABLE_USE / LP_PRIVACY (see components/legal-content*.jsx)
// and this renderer paints them with:
//   1. Shared TSHeader (nav)
//   2. Hero band matching the Case Studies page (animated gradient,
//      title only \u2014 no subheading)
//   3. Body: 940px-wide stack of sections with headings + paragraphs
//   4. Shared TSFooter
//
// Heading levels per Figma type sizes:
//   lvl 1 \u2192 32px / 900
//   lvl 2 \u2192 24px / 900
//   lvl 3 \u2192 18px / 700
// Body paragraphs: 15px / 500.

const { useState: useLP } = React;

const LP_PAGES = {
  "privacy":         { title: "Privacy Policy",        get sections() { return window.LP_PRIVACY        || []; } },
  "terms":           { title: "Terms & Conditions",    get sections() { return window.LP_TERMS          || []; } },
  "cookies":         { title: "Cookies Policy",        get sections() { return window.LP_COOKIES        || []; } },
  "acceptable-use":  { title: "Acceptable Use Policy", get sections() { return window.LP_ACCEPTABLE_USE || []; } },
};

function lpGetSlug() {
  const file = window.location.pathname.split("/").pop().replace(".html", "");
  return LP_PAGES[file] ? file : "privacy";
}

// Split a paragraph by "\n" and treat the result as a list of items.
// Empty lines (double "\n\n" from Figma's spacing) are dropped.
function lpListItems(s) {
  return s.split("\n").map(x => x.trim()).filter(Boolean);
}

// Decide whether a "\n"-bearing string should render as a list or as a
// two-line plain paragraph (e.g. address lines, "John Snow" + URL).
function lpIsList(s) {
  if (!s.includes("\n")) return false;
  const items = lpListItems(s);
  if (items.length >= 3) return true;
  // 2 items \u2192 list only if either is long or ends with semicolon/period
  // followed by content (i.e. an enumerated step), otherwise plain.
  return items.some(i => i.length > 90 || /[;]$/.test(i));
}

function LPParagraph({ value }) {
  // Special "contact" pair (name + URL on its own card-like line).
  if (value && typeof value === "object" && value.contact) {
    const [name, url] = value.contact;
    return (
      <p style={{
        fontSize: 15, fontWeight: 500, lineHeight: 1.65, color: "#212331",
        margin: 0,
      }}>
        {name}<br />
        <a href={url.startsWith("http") ? url : ("https://" + url)}
           target="_blank" rel="noopener noreferrer"
           style={{ color: "#2F3886", fontWeight: 600, textDecoration: "none" }}>
          {url}
        </a>
      </p>
    );
  }
  const s = String(value);
  if (lpIsList(s)) {
    const items = lpListItems(s);
    return (
      <ul style={{
        margin: 0, paddingLeft: 22,
        fontSize: 15, fontWeight: 500, lineHeight: 1.65, color: "#212331",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    );
  }
  if (s.includes("\n")) {
    // Plain multi-line paragraph (e.g. address block).
    const lines = s.split("\n");
    return (
      <p style={{
        fontSize: 15, fontWeight: 500, lineHeight: 1.65, color: "#212331",
        margin: 0,
      }}>
        {lines.map((ln, i) => (
          <React.Fragment key={i}>
            {ln}{i < lines.length - 1 ? <br /> : null}
          </React.Fragment>
        ))}
      </p>
    );
  }
  return (
    <p style={{
      fontSize: 15, fontWeight: 500, lineHeight: 1.65, color: "#212331",
      margin: 0,
    }}>{s}</p>
  );
}

function LPSection({ section, accent }) {
  const { lvl, h, p } = section;
  // Heading sizing — slightly more compact for lvl 3 since they're
  // generally inside a lvl 2 group.
  const headingStyle =
    lvl === 1 ? { fontSize: "clamp(26px, 3.4vw, 32px)", fontWeight: 900, letterSpacing: "-0.01em" } :
    lvl === 2 ? { fontSize: "clamp(20px, 2.6vw, 24px)", fontWeight: 900, letterSpacing: "-0.005em" } :
                { fontSize: 18, fontWeight: 700 };
  const Tag = lvl === 1 ? "h2" : lvl === 2 ? "h3" : "h4";
  // Tighter top margin for back-to-back lvl 3 inside the same lvl 2 stack.
  return (
    <section className={"lp-sect lp-sect-" + lvl} style={{
      display: "flex", flexDirection: "column", gap: 18,
    }}>
      <Tag style={{
        margin: 0, color: "#212331", lineHeight: 1.15,
        ...headingStyle,
      }}>
        {h}<span style={{ color: accent }}>.</span>
      </Tag>
      {p && p.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {p.map((para, i) => <LPParagraph key={i} value={para} />)}
        </div>
      )}
    </section>
  );
}

function LegalPage() {
  const slug = lpGetSlug();
  const page = LP_PAGES[slug];
  const accent = "#FFB855";
  const [contact, setContact] = useLP(false);

  // Top-level group: keep lvl 1 + every lvl 2/3 that follows together
  // until the next lvl 1. lvl 2 + every lvl 3 that follows together.
  // We use 64px gap between lvl 1 groups and 40px gap between lvl 2 groups
  // (matching the Figma's `gap: 64` between top-level frames and 40-ish
  // inside multi-heading frames).
  const sections = page.sections;

  return (
    <div style={{ fontFamily: "Montserrat", background: "#fff" }}>
      <window.TSHeader variant="onPhoto"
        onNav={() => window.location.href = "../index.html"}
        onContact={() => setContact(true)}
        onLogin={() => alert("Client Login \u2192 external platform (placeholder)")}
        onDemo={() => setContact(true)} />

      {/* HERO \u2014 same drifting brand gradient as the Case Studies page. */}
      <section className="lp-hero" style={{
        color: "#fff",
        paddingTop: 200,
        paddingBottom: 160,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{
            fontFamily: "Montserrat", fontWeight: 900,
            lineHeight: 1.05, margin: 0,
            letterSpacing: "-0.02em",
            color: "#fff",
            textShadow: "4px 4px 4px rgba(0,0,0,0.25), -4px -4px 4px rgba(0,0,0,0.25)",
            fontSize: "clamp(36px, 5vw, 56px)",
          }}>
            {page.title}<span style={{ color: accent }}>.</span>
          </h1>
        </div>
      </section>

      {/* BODY */}
      <section style={{ background: "#fff", padding: "80px 32px 96px" }}>
        <div className="lp-body" style={{ maxWidth: 940, margin: "0 auto" }}>
          {sections.map((s, i) => {
            // Spacing between sections: 56px after a lvl 1, 40px after a
            // lvl 2 group, 28px between back-to-back lvl 3s.
            const prev = i > 0 ? sections[i - 1] : null;
            let topGap = 56;
            if (!prev) topGap = 0;
            else if (s.lvl === 3 && prev.lvl === 3) topGap = 28;
            else if (s.lvl === 3 && prev.lvl === 2) topGap = 24;
            else if (s.lvl === 2) topGap = 56;
            else if (s.lvl === 1) topGap = 72;
            return (
              <div key={i} style={{ marginTop: topGap }}>
                <LPSection section={s} accent={accent} />
              </div>
            );
          })}
        </div>
      </section>

      <window.TSFooter
        onDemo={() => setContact(true)}
        onContact={() => setContact(true)}
        onLogin={() => alert("Client Login \u2192 external platform (placeholder)")}
        onLegal={(label) => {
          const map = { "Privacy": "privacy", "Terms & Conditions": "terms", "Cookies": "cookies", "Acceptable Use": "acceptable-use" };
          window.location.href = map[label] + ".html";
        }} />

      <window.TSModal open={contact} onClose={() => setContact(false)} width={520}>
        <window.ContactForm onClose={() => setContact(false)} />
      </window.TSModal>
    </div>
  );
}

// Inject hero animation CSS once.
(function injectLPCss() {
  if (document.getElementById("lp-css")) return;
  const s = document.createElement("style");
  s.id = "lp-css";
  s.textContent = `
    /* Legal-page hero: same drifting accents as the Case Studies hero. */
    .lp-hero {
      position: relative;
      overflow: hidden;
      isolation: isolate;
      background: linear-gradient(to bottom left, #6976E7 0%, #2F3886 100%);
    }
    .lp-hero > * { position: relative; z-index: 1; }
    .lp-hero::before,
    .lp-hero::after {
      content: "";
      position: absolute; inset: -20%;
      z-index: 0;
      pointer-events: none;
      will-change: transform, opacity;
    }
    .lp-hero::before {
      background:
        radial-gradient(closest-side at 30% 30%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%),
        radial-gradient(closest-side at 70% 80%, rgba(105,118,231,0.55) 0%, rgba(105,118,231,0) 65%);
      background-size: 140% 140%, 140% 140%;
      background-repeat: no-repeat;
      animation: lpHeroDriftA 28s ease-in-out infinite alternate;
    }
    .lp-hero::after {
      background:
        radial-gradient(closest-side at 80% 25%, rgba(255,184,85,0.10) 0%, rgba(255,184,85,0) 65%),
        radial-gradient(closest-side at 20% 75%, rgba(28,34,80,0.30) 0%, rgba(28,34,80,0) 65%);
      background-size: 160% 160%, 160% 160%;
      background-repeat: no-repeat;
      animation: lpHeroDriftB 36s ease-in-out infinite alternate;
      mix-blend-mode: soft-light;
    }
    @keyframes lpHeroDriftA {
      0%   { background-position:   0%   0%,  100% 100%; }
      50%  { background-position:  40%  20%,   60%  80%; }
      100% { background-position: 100% 100%,    0%   0%; }
    }
    @keyframes lpHeroDriftB {
      0%   { background-position: 100%   0%,    0% 100%; }
      50%  { background-position:  60%  40%,   40%  60%; }
      100% { background-position:   0% 100%,  100%   0%; }
    }
    @media (prefers-reduced-motion: reduce) {
      .lp-hero::before, .lp-hero::after { animation: none; }
    }
    /* Body type rhythm */
    .lp-body ul li { padding-left: 4px; }
    .lp-body ul li::marker { color: #6976E7; }
    .lp-body a { word-break: break-word; }
  `;
  document.head.appendChild(s);
})();

window.LegalPage = LegalPage;
