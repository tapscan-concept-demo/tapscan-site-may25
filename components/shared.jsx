// TapScan shared UI primitives — Header, Footer, FAQ, ContactModal, CaseStudyModal.
// Loaded once; consumed by every variation in the design canvas.

const { useState: useUI, useEffect: useUIEffect, useRef: useUIRef } = React;

// Asset path prefix — pages in subdirectories (e.g. /legal/) need a `../`
// prefix to reach the shared /assets/ folder. Computed once at load time
// based on the URL depth.
const TS_ASSET_PREFIX = (function() {
  const path = window.location.pathname.replace(/\/[^/]*$/, "/");
  // Count directory depth past the project root. Any subfolder → step out.
  const segs = path.split("/").filter(Boolean);
  // Subfolders we expect to see: "legal". Anything else stays at root depth.
  return segs.includes("legal") ? "../assets/" : "assets/";
})();
// Same idea for sibling HTML pages — nav and footer links to /index.html
// and /case-studies.html need to escape /legal/ when used from there.
const TS_PAGE_PREFIX = TS_ASSET_PREFIX.startsWith("../") ? "../" : "";

// ──────────────────────────────────────────────────────────────
// HEADER
// ──────────────────────────────────────────────────────────────
function TSHeader({ variant = "onPhoto", onNav, onContact, onLogin, onDemo, sticky = false }) {
  const onDark = variant === "onPhoto" || variant === "onNavy";
  const textColor = onDark ? "#fff" : "#1C2250";
  const logo = onDark ? (TS_ASSET_PREFIX + "logo-white.svg") : (TS_ASSET_PREFIX + "logo-blue.svg");
  const items = [
  { label: "Home", href: TS_PAGE_PREFIX + "index.html" },
  { label: "Case Studies", href: TS_PAGE_PREFIX + "case-studies.html" }];

  const [hover, setHover] = useUI(null);
  const [mobileOpen, setMobileOpen] = useUI(false);
  const [scrolled, setScrolled] = useUI(false);

  // Switch to the brand-blue background once the user has scrolled past the
  // first <section> on the page (the hero). On pages without a photo hero we
  // still want the filled state, so default to scrolled if there's no hero.
  useUIEffect(() => {
    const heroEl = document.querySelector("body section");
    const onScroll = () => {
      const threshold = heroEl
        ? heroEl.offsetTop + heroEl.offsetHeight - 80
        : 80;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Final background: explicit onNavy variant or scrolled past hero → brand
  // blue. Otherwise stay transparent so the hero photo bleeds behind it.
  const filled = scrolled || variant === "onNavy";
  const bg = filled ? "#2F3886" : "transparent";
  const shadow = filled ? "0 4px 16px rgba(15,17,17,0.18)" : "none";

  return (
    <nav className="ts-nav" style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 64px",
      background: bg,
      boxShadow: shadow,
      fontFamily: "Montserrat",
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "background 220ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 220ms cubic-bezier(0.2,0.8,0.2,1)"
    }}>
      <a
        href={TS_PAGE_PREFIX + "index.html"}
        onClick={(e) => {
          // If a host page wants to intercept "go home" (e.g. close an open modal first),
          // it can return false from onNav("top") — otherwise let the link navigate.
          if (onNav) { e.preventDefault(); onNav("top"); }
        }}
        aria-label="TapScan — home"
        style={{
          display: "inline-flex", alignItems: "center",
          padding: 4, margin: -4, borderRadius: 6,
          transition: "transform 200ms cubic-bezier(0.2,0.8,0.2,1), filter 220ms cubic-bezier(0.2,0.8,0.2,1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.04)";
          e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(105,118,231,0.85))";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.filter = "none";
        }}
        onMouseDown={(e)  => { e.currentTarget.style.transform = "scale(0.98)"; }}
        onMouseUp={(e)    => { e.currentTarget.style.transform = "scale(1.04)"; }}>
        <img src={logo} alt="TapScan" style={{ height: 30, display: "block" }} />
      </a>
      <div className="ts-nav-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {items.map((it, i) =>
        <a key={it.label}
        href={it.href}
        onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
        style={{
          color: textColor, fontWeight: 500, fontSize: 14,
          textDecoration: hover === i ? "underline" : "none",
          textUnderlineOffset: 4, cursor: "pointer"
        }}>{it.label}</a>
        )}
        <button onClick={onLogin} style={{
          fontFamily: "Montserrat", fontWeight: 500, fontSize: 14,
          padding: 0,
          background: "transparent", color: textColor,
          border: "none", cursor: "pointer"
        }}>Client Login</button>
        {/* Primary CTA pair — uses the same gap (16px) as the hero CTA pair, and the
            same .ts-cta-btn hover treatment (lift + shimmer + color flip) as the hero
            and footer primary buttons. */}
        <div className="ts-nav-cta-pair" style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button onClick={onContact} className="ts-cta-btn ts-cta-btn-secondary" style={{
            fontFamily: "Montserrat", fontWeight: 700, fontSize: 14,
            padding: "12px 20px", borderRadius: 6,
            background: "transparent", color: textColor,
            border: "2px solid " + textColor, cursor: "pointer",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>Contact Us</button>
          <button onClick={onDemo} className="ts-cta-btn ts-cta-btn-primary" style={{
            fontFamily: "Montserrat", fontWeight: 700, fontSize: 14,
            padding: "12px 20px", borderRadius: 6,
            background: "#FFB855", color: "#1C2250",
            border: "none", cursor: "pointer",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>Book a Demo</button>
        </div>
      </div>
      <button className="ts-nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu" style={{
        display: "none", background: "transparent", border: "none", cursor: "pointer", padding: 8, color: textColor,
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {mobileOpen ? (<g><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></g>) : (<g><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></g>)}
        </svg>
      </button>
      {mobileOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "#fff", padding: 20, display: "flex", flexDirection: "column", gap: 4,
          boxShadow: "0 12px 32px rgba(15,17,17,0.18)", zIndex: 100,
          textAlign: "left",
        }}>
          {items.map(it => (
            <a key={it.label} href={it.href} onClick={()=>setMobileOpen(false)} style={{
              padding: "14px 4px", color: "#1C2250", fontWeight: 600, fontSize: 15, textDecoration: "none", borderBottom: "1px solid #EEF0F8", textAlign: "left",
            }}>{it.label}</a>
          ))}
          <button onClick={()=>{setMobileOpen(false); onLogin && onLogin();}} style={{ textAlign: "left", padding: "14px 4px", background: "transparent", border: "none", color: "#1C2250", fontWeight: 600, fontSize: 15, fontFamily: "Montserrat", cursor: "pointer", borderBottom: "1px solid #EEF0F8" }}>Client Login</button>
          <button onClick={()=>{setMobileOpen(false); onContact && onContact();}} style={{ textAlign: "left", padding: "14px 4px", background: "transparent", border: "none", color: "#1C2250", fontWeight: 600, fontSize: 15, fontFamily: "Montserrat", cursor: "pointer", borderBottom: "1px solid #EEF0F8" }}>Contact Us</button>
          <button onClick={()=>{setMobileOpen(false); onDemo && onDemo();}} style={{
            marginTop: 12, fontFamily: "Montserrat", fontWeight: 700, fontSize: 15,
            padding: "14px 20px", borderRadius: 8, background: "#FFB855", color: "#1C2250", border: "none", cursor: "pointer",
            textAlign: "left",
            display: "flex", justifyContent: "flex-start", alignItems: "center",
          }}>Book a Demo</button>
        </div>
      )}
    </nav>);

}

// ──────────────────────────────────────────────────────────────
// HERO (kept as-is per user)
// ──────────────────────────────────────────────────────────────
function TSHero({ onDemo, onContact, onNav, onLogin }) {
  // Cycling background — 6 photos, cross-fade every 5s, looping.
  // The photos are already darkened + brand-tinted by the user, so we do
  // NOT layer an overlay over them.
  const HERO_BG_IMAGES = [
    TS_ASSET_PREFIX + "hero-1.png",
    TS_ASSET_PREFIX + "hero-2.png",
    TS_ASSET_PREFIX + "hero-3.png",
    TS_ASSET_PREFIX + "hero-4.png",
    TS_ASSET_PREFIX + "hero-5.png",
  ];
  const [bgIdx, setBgIdx] = useUI(0);
  useUIEffect(() => {
    const t = setInterval(() => {
      setBgIdx((i) => (i + 1) % HERO_BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="ts-hero" style={{
      position: "relative",
      // Dark fallback so the hero is never blank if an image is still loading.
      background: "#1C2250",
      color: "#fff",
      textAlign: "center",
      // Full viewport height — content centers vertically, with the scroll
      // cue + logo-crawl placeholder pinned to the bottom band.
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Cycling background layer — all 6 images stacked, only the active
          one is at opacity 1. CSS transition handles the cross-fade. */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
      }}>
        {HERO_BG_IMAGES.map((src, i) => (
          <div key={src} style={{
            position: "absolute", inset: 0,
            background: `url('${src}') center/cover no-repeat`,
            opacity: i === bgIdx ? 1 : 0,
            transition: "opacity 1500ms ease-in-out",
          }} />
        ))}
      </div>

      {/* Foreground content — every direct child of the hero needs to sit
          above the cycling background. */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <TSHeader variant="onPhoto" onDemo={onDemo} onContact={onContact} onNav={onNav} onLogin={onLogin} />
      </div>
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1480, margin: "0 auto", padding: "24px 24px 0",
        flex: 1, width: "100%",
        // Outer wrapper just CENTERS the grid block within the remaining
        // hero space — the grid itself sizes to its content so the divider
        // matches the column height (not the whole hero).
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
      <div style={{
        width: "100%",
        // Two-column hero: text + CTAs on the left, divider in the middle,
        // interactive-visual placeholder on the right.
        display: "grid",
        gridTemplateColumns: "1fr 1px 1fr",
        gap: 56,
        alignItems: "stretch",
      }} className="ts-hero-row">
        {/* LEFT — heading, paragraph, CTAs. Left-aligned. */}
        <div className="ts-hero-left" style={{ textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="ts-hero-text">
          <h1 className="ts-hero-h1" style={{
            fontFamily: "Montserrat", fontWeight: 900,
            lineHeight: 1.08, margin: 0,
            letterSpacing: "-0.02em",
            color: "#fff",
            textShadow: "4px 4px 4px rgba(0,0,0,0.25), -4px -4px 4px rgba(0,0,0,0.25)",
            // Sized to wrap onto two lines inside the left column.
            fontSize: "clamp(30px, 3.2vw, 42px)",
          }}>Adaptive Experiences<span style={{ color: "#FFB855" }}>,</span> Actionable Accountability<span style={{ color: "#FFB855" }}>.</span></h1>
          <p className="ts-hero-p" style={{
            fontFamily: "Montserrat", fontWeight: 300,
            fontSize: 20, lineHeight: 1.45, marginTop: 24,
            color: "#fff",
            // No maxWidth — paragraph fills the column the same way the
            // two buttons row below it does, so they share an alignment.
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}>TapScan intuitively connects your assets to dynamic digital content, delivering real-time performance &amp; a deeper understanding of ROI<span style={{ color: "#fff", fontWeight: 900 }}>.</span></p>
          </div>
          <div className="ts-hero-ctas" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 36 }}>
            <button onClick={onDemo} className="ts-cta-btn ts-cta-btn-primary" style={{
              fontFamily: "Montserrat", fontWeight: 700, fontSize: 16,
              padding: "20px 24px", borderRadius: 8,
              background: "#FFB855", color: "#1C2250",
              border: "none", cursor: "pointer",
              width: "100%",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
            }}>
              <span>Book a Demo</span>
              <span className="ts-cta-arrow" aria-hidden="true" style={{ display: "inline-flex" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <polyline points="14 6 20 12 14 18" />
                </svg>
              </span>
            </button>
            <button onClick={onContact} className="ts-cta-btn ts-cta-btn-secondary" style={{
              fontFamily: "Montserrat", fontWeight: 700, fontSize: 16,
              padding: "20px 24px", borderRadius: 8,
              background: "transparent", color: "#fff",
              border: "2px solid #fff", cursor: "pointer",
              width: "100%",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}>
              <span>Contact Us</span>
              <span className="ts-cta-arrow" aria-hidden="true" style={{ display: "inline-flex" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <polyline points="14 6 20 12 14 18" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        {/* DIVIDER — solid hairline matching the full column height. */}
        <div className="ts-hero-divider" aria-hidden="true" style={{
          alignSelf: "stretch",
          width: 1,
          background: "rgba(255,255,255,0.45)",
        }} />
        {/* RIGHT — animated analytics card cycling through bar chart, donut,
            and insights states. Glassmorphic, 16:9 aspect ratio. */}
        <div className="ts-hero-right" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {window.HeroAnalytics ? <window.HeroAnalytics /> : null}
        </div>
      </div>
      </div>
      {/* Scroll cue sits ABOVE the logo crawl now. */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <TSHeroScrollCue />
      </div>
      {/* Logo-crawl placeholder — full-bleed (edge-to-edge), twice as tall
          as the previous in-container placeholder. */}
      <div style={{
        position: "relative", zIndex: 2,
        width: "100%",
        height: 120,
        borderTop: "1.5px dashed rgba(255,255,255,0.35)",
        borderBottom: "1.5px dashed rgba(255,255,255,0.35)",
        background: "rgba(0,0,0,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Montserrat", fontWeight: 600, fontSize: 14,
        letterSpacing: "0.02em",
        color: "rgba(255,255,255,0.78)",
      }}>
        (Client Logo crawl to be added)
      </div>
    </section>);

}

// ──────────────────────────────────────────────────────────────
// Animated scroll-down indicator + client-logo-crawl placeholder.
// Sits in the bottom band of the homepage hero.
// ──────────────────────────────────────────────────────────────
function TSHeroScrollCue() {
  // Inject the keyframes once. The mouse-shaped indicator has a dot that
  // travels down the body; the chevron stack pulses at the same cadence.
  useUIEffect(() => {
    if (document.getElementById("ts-hero-scroll-css")) return;
    const s = document.createElement("style");
    s.id = "ts-hero-scroll-css";
    s.textContent = `
      @keyframes tsScrollDot {
        0%   { transform: translate(-50%, 0);     opacity: 0; }
        20%  { opacity: 1; }
        80%  { opacity: 1; }
        100% { transform: translate(-50%, 14px);  opacity: 0; }
      }
      @keyframes tsScrollChevron {
        0%, 100% { transform: translateY(0);   opacity: 0.4; }
        50%      { transform: translateY(6px); opacity: 1; }
      }
      @keyframes tsScrollChevronStag {
        0%, 100% { transform: translateY(0);   opacity: 0.25; }
        50%      { transform: translateY(6px); opacity: 0.85; }
      }
      .ts-scroll-cue:hover .ts-scroll-mouse { border-color: #FFB855; }
      .ts-scroll-cue:hover .ts-scroll-dot   { background: #FFB855; }
      .ts-scroll-cue:hover .ts-scroll-label { color: #FFB855; }
      /* Collapse the 2-column hero on smaller screens — drop the divider,
         stack the placeholder under the text. */
      @media (max-width: 960px) {
        .ts-hero-row {
          grid-template-columns: 1fr !important;
          gap: 28px !important;
        }
        .ts-hero-divider { display: none !important; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const onScrollClick = () => {
    // Skip past the hero to the next section.
    const next = document.querySelector("section + section, section ~ section");
    if (next) {
      const top = next.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div style={{
      padding: "0 24px 28px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
      color: "#fff",
    }}>
      {/* Scroll cue — clickable, keyboard-focusable. */}
      <button type="button" onClick={onScrollClick} className="ts-scroll-cue" aria-label="Scroll to explore more" style={{
        background: "transparent", border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        padding: 6, color: "#fff",
        fontFamily: "Montserrat",
      }}>
        <span className="ts-scroll-label" style={{
          fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          opacity: 0.85, transition: "color 180ms",
        }}>Scroll to explore</span>
        {/* Mouse glyph */}
        <span aria-hidden="true" className="ts-scroll-mouse" style={{
          width: 22, height: 34,
          border: "2px solid rgba(255,255,255,0.85)",
          borderRadius: 12,
          position: "relative",
          transition: "border-color 180ms",
        }}>
          <span className="ts-scroll-dot" style={{
            position: "absolute",
            top: 5, left: "50%",
            width: 3, height: 6,
            borderRadius: 2,
            background: "#fff",
            transition: "background 180ms",
            animation: "tsScrollDot 1.6s cubic-bezier(0.7,0,0.3,1) infinite",
          }} />
        </span>
        {/* Chevron stack */}
        <span aria-hidden="true" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 2 }}>
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none"
               style={{ animation: "tsScrollChevron 1.6s ease-in-out infinite" }}>
            <path d="M2 2 L9 8 L16 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none"
               style={{ marginTop: -4, animation: "tsScrollChevronStag 1.6s ease-in-out infinite", animationDelay: "0.2s" }}>
            <path d="M2 2 L9 8 L16 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────────────────────────
const TS_FAQ_ITEMS = [
{ q: "How does TapScan actually work?", a: "Every TapScan-enabled asset carries a unique QR code. When a shopper scans it, we serve context-specific content and record the interaction (location, time, behavior), so you see what's driving engagement in real time." },
{ q: "What's the difference between Experience and Accountability?", a: "Experience is consumer-facing: QR codes on packaging and marketing material that lead shoppers into your brand ecosystem. Accountability is internal: validating that your displays, signage, and POS are set up correctly in the field." },
{ q: "What kinds of touchpoints can TapScan validate execution for?", a: "Product displays, posters, signage, shelf-talkers, packaging, and event installations: anything you can print, place, or ship into market." },
{ q: "What insights can I expect when using TapScan?", a: "Scan volume, geographic distribution, engagement depth, conversion paths, and campaign-level performance mapped back to the physical asset and its execution status." },
{ q: "Does TapScan integrate with the systems I already use?", a: "Yes. TapScan plugs into common CRM, CDP, and analytics platforms via a webhook feed and REST endpoints." },
{ q: "How does TapScan compare to RFID or NFC?", a: "RFID is line-of-presence; TapScan is intent-driven. Our touchpoints fire when a person chooses to engage, giving you signal, not noise, and require no special reader hardware." },
{ q: "How quickly can TapScan be set up for my organization?", a: "A pilot typically takes two weeks from kickoff to live assets in-market." },
{ q: "Who is TapScan a good fit for?", a: "Brands running physical marketing programs at scale who want to know, objectively, whether those programs work, and want to turn every touchpoint into a measurable interaction." }];


function TSFaqItem({ q, a, isOpen, onToggle, idx = 0 }) {
  return (
    <div className="ts-faq-item" style={{
      background: isOpen ? "#F5F6FF" : "#fff",
      border: isOpen ? "1px solid transparent" : "1px solid #DDDFEE",
      borderRadius: 8, padding: "18px 22px", marginBottom: 10,
      cursor: "pointer",
      animationDelay: (idx * 80) + "ms",
      transition: "background 180ms cubic-bezier(0.2,0.8,0.2,1)"
    }} onClick={onToggle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#1C2250" }}>{q}</div>
        <div style={{
          width: 28, height: 28, borderRadius: 999, flexShrink: 0,
          background: isOpen ? "#2F3886" : "#FFB855",
          color: isOpen ? "#fff" : "#1C2250",
          display: "grid", placeItems: "center",
          fontWeight: 900, fontSize: 16,
          transform: isOpen ? "rotate(45deg)" : "none",
          transition: "transform 180ms cubic-bezier(0.2,0.8,0.2,1), background 180ms"
        }}>+</div>
      </div>
      <div style={{
        maxHeight: isOpen ? 240 : 0, overflow: "hidden",
        transition: "max-height 320ms cubic-bezier(0.2,0.8,0.2,1)"
      }}>
        <p style={{
          fontWeight: 500, fontSize: 14, lineHeight: 1.6,
          color: "#212331", margin: "12px 0 0"
        }}>{a}</p>
      </div>
    </div>);

}

function TSFaq() {
  // All items start collapsed. -1 is the "no row open" sentinel.
  const [open, setOpen] = useUI(-1);
  return (
    <section id="faq" data-screen-label="FAQ" style={{ padding: "96px 64px", fontFamily: "Montserrat", background: "#fff" }}>
      {/* Inject the per-row pop-in keyframes once — a quick translateY+fade,
          staggered ~80ms per row so they cascade in. */}
      <style>{`
        @keyframes tsFaqRise {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .ts-faq-item { animation: tsFaqRise 360ms cubic-bezier(0.2,0.8,0.2,1) both; }
      `}</style>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{
          textAlign: "center", fontWeight: 900, fontSize: 32,
          color: "#212331", marginBottom: 8, letterSpacing: "-0.01em"
        }}>Common Questions From New Clients<span style={{ color: "#FFB855" }}>.</span></div>
        <p style={{ textAlign: "center", fontWeight: 500, fontSize: 15, color: "#7A7D8F", marginBottom: 40 }}>
          Helpful answers about onboarding, program execution, insights &amp; more.
        </p>
        {TS_FAQ_ITEMS.map((it, i) =>
        <TSFaqItem key={i} {...it} idx={i} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        )}
      </div>
    </section>);

}

// ──────────────────────────────────────────────────────────────
// FOOTER (CTA + links)
// ──────────────────────────────────────────────────────────────
function TSFooter({ onDemo, onContact, onLegal, onLogin }) {
  const legalLinks = ["Privacy", "Terms & Conditions", "Cookies", "Acceptable Use"];
  return (
    <footer style={{ fontFamily: "Montserrat" }}>
      {/* CTA block — one shade lighter than the lower bar so the call-to-action stands out from the link section below it. */}
      <section style={{
        background: "#3D4AA8", padding: "96px 32px 72px",
        textAlign: "center", color: "#fff",
        position: "relative",
      }}>
        {/* Local keyframes for this section: badge wiggle + button shimmer. */}
        <style>{`
          @keyframes tsBadgeWiggle {
            0%, 76%, 100% { transform: rotate(0deg) scale(1); }
            80%  { transform: rotate(-8deg) scale(1.04); }
            84%  { transform: rotate(7deg)  scale(1.04); }
            88%  { transform: rotate(-5deg) scale(1.03); }
            92%  { transform: rotate(3deg)  scale(1.02); }
            96%  { transform: rotate(0deg)  scale(1); }
          }
          .ts-cta-badge .ts-cta-symbol {
            animation: tsBadgeWiggle 2.5s ease-in-out infinite;
            transform-origin: 50% 50%;
          }
          .ts-cta-btn {
            position: relative; overflow: hidden;
            transition: transform 420ms cubic-bezier(0.2,0.8,0.2,1),
                        background 420ms cubic-bezier(0.2,0.8,0.2,1),
                        color 420ms cubic-bezier(0.2,0.8,0.2,1),
                        box-shadow 420ms cubic-bezier(0.2,0.8,0.2,1);
          }
          .ts-cta-btn::before {
            content: ""; position: absolute; inset: 0;
            background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%);
            transform: translateX(-120%);
            transition: transform 1100ms cubic-bezier(0.2,0.8,0.2,1);
            pointer-events: none;
          }
          .ts-cta-btn:hover { transform: translateY(-3px) scale(1.025); }
          .ts-cta-btn:hover::before { transform: translateX(120%); }
          .ts-cta-btn:active { transform: translateY(-1px) scale(1.01); }
          .ts-cta-btn .ts-cta-arrow { transition: transform 420ms cubic-bezier(0.2,0.8,0.2,1); }
          .ts-cta-btn:hover .ts-cta-arrow { transform: translateX(6px); }
          .ts-cta-btn-primary:hover   { background: #fff !important; color: #1C2250 !important; box-shadow: 0 18px 38px rgba(0,0,0,0.28); }
          .ts-cta-btn-secondary:hover { background: #fff !important; color: #2F3886 !important; box-shadow: 0 18px 38px rgba(0,0,0,0.28); }
        `}</style>

        {/* Brand symbol badge — wiggle every 5 seconds. */}
        <div className="ts-cta-badge" style={{
          width: 100, height: 100,
          background: "#fff",
          borderRadius: "50%",
          margin: "0 auto 26px",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 18px 44px rgba(0,0,0,0.30), 0 6px 14px rgba(0,0,0,0.22)",
          overflow: "hidden",
        }}>
          <img className="ts-cta-symbol" src={TS_ASSET_PREFIX + "tapscan-symbol.svg"} alt="" aria-hidden="true"
               style={{ width: 82, height: 82, display: "block" }} />
        </div>

        <h3 style={{ fontWeight: 900, fontSize: 36, margin: 0, letterSpacing: "-0.01em", color: "#fff" }}>
          Ready to bring your touchpoints to life<span style={{ color: "#fff" }}>?</span>
        </h3>
        <p style={{ fontWeight: 400, fontSize: 16, color: "#fff", opacity: 0.95, maxWidth: 620, margin: "16px auto 36px", lineHeight: 1.55 }}>
          Book a demo or drop us a note. We'd love to show you how TapScan can turn every interaction into insight.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
          <button onClick={onDemo} className="ts-cta-btn ts-cta-btn-primary" style={{
            fontFamily: "Montserrat", fontWeight: 700, fontSize: 17,
            padding: "22px 56px", borderRadius: 10,
            background: "#FFB855", color: "#1C2250",
            border: "none", cursor: "pointer", minWidth: 300,
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4.5" width="18" height="16" rx="2" />
              <line x1="3" y1="9.5" x2="21" y2="9.5" />
              <line x1="8" y1="2.5" x2="8" y2="6.5" />
              <line x1="16" y1="2.5" x2="16" y2="6.5" />
            </svg>
            <span>Book a Demo</span>
            <span className="ts-cta-arrow" aria-hidden="true" style={{ display: "inline-flex" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </span>
          </button>
          <button onClick={onContact} className="ts-cta-btn ts-cta-btn-secondary" style={{
            fontFamily: "Montserrat", fontWeight: 700, fontSize: 17,
            padding: "22px 56px", borderRadius: 10,
            background: "transparent", color: "#fff",
            border: "2px solid #fff", cursor: "pointer", minWidth: 300,
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 12,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <polyline points="3,7 12,13 21,7" />
            </svg>
            <span>Contact Us</span>
            <span className="ts-cta-arrow" aria-hidden="true" style={{ display: "inline-flex" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* lower bar — same brand-blue as the CTA above, separated by a hairline */}
      <section style={{
        background: "#2F3886", color: "#fff", padding: "56px 64px 32px",
        borderTop: "1px solid rgba(255,255,255,0.18)"
      }}>
        <div className="ts-footer-grid" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start" }}>
          <div>
            <a
              href={TS_PAGE_PREFIX + "index.html"}
              aria-label="TapScan — home"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: 4, margin: -4, borderRadius: 6,
                transition: "opacity 180ms cubic-bezier(0.2,0.8,0.2,1), transform 180ms cubic-bezier(0.2,0.8,0.2,1)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "scale(1)"; }}
              onMouseDown={(e)  => { e.currentTarget.style.transform = "scale(0.98)"; }}
              onMouseUp={(e)    => { e.currentTarget.style.transform = "scale(1.03)"; }}>
              <img src={TS_ASSET_PREFIX + "logo-white.svg"} alt="TapScan" style={{ height: 28, display: "block" }} />
            </a>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <a href="#" aria-label="LinkedIn" style={{
                width: 36, height: 36, borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)",
                display: "grid", placeItems: "center", color: "#fff",
                transition: "all 180ms"
              }}
              onMouseEnter={(e) => {e.currentTarget.style.background = "#fff";e.currentTarget.style.color = "#1C2250";e.currentTarget.style.borderColor = "#fff";}}
              onMouseLeave={(e) => {e.currentTarget.style.background = "transparent";e.currentTarget.style.color = "#fff";e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";}}>
                
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M8 17H5V10H8V17M6.5 8.7C5.5 8.7 4.7 7.9 4.7 6.9S5.5 5.1 6.5 5.1 8.3 5.9 8.3 6.9C8.3 7.9 7.5 8.7 6.5 8.7M19 17H16V13.4C16 12.5 15.3 11.8 14.4 11.8S12.8 12.5 12.8 13.4V17H9.8V10H12.8V11.2C13.3 10.4 14.4 9.8 15.3 9.8C17.3 9.8 19 11.5 19 13.5V17Z" /></svg>
              </a>
              <a href="#" aria-label="Instagram" style={{
                width: 36, height: 36, borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)",
                display: "grid", placeItems: "center", color: "#fff",
                transition: "all 180ms"
              }}
              onMouseEnter={(e) => {e.currentTarget.style.background = "#fff";e.currentTarget.style.color = "#1C2250";e.currentTarget.style.borderColor = "#fff";}}
              onMouseLeave={(e) => {e.currentTarget.style.background = "transparent";e.currentTarget.style.color = "#fff";e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";}}>
                
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2M7.6 4C5.6 4 4 5.6 4 7.6V16.4C4 18.4 5.6 20 7.6 20H16.4C18.4 20 20 18.4 20 16.4V7.6C20 5.6 18.4 4 16.4 4H7.6M17.25 5.5C17.94 5.5 18.5 6.06 18.5 6.75S17.94 8 17.25 8 16 7.44 16 6.75 16.56 5.5 17.25 5.5M12 7C14.76 7 17 9.24 17 12S14.76 17 12 17 7 14.76 7 12 9.24 7 12 7M12 9C10.34 9 9 10.34 9 12S10.34 15 12 15 15 13.66 15 12 13.66 9 12 9Z" /></svg>
              </a>
            </div>
          </div>
          <div className="ts-footer-links" style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.6, marginBottom: 14 }}>Product</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={TS_PAGE_PREFIX + "index.html#experience"} style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85 }}>Experience</a>
                <a href={TS_PAGE_PREFIX + "index.html#accountability"} style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85 }}>Accountability</a>
                <a href={TS_PAGE_PREFIX + "case-studies.html"} style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85 }}>Case Studies</a>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.6, marginBottom: 14 }}>Company</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={TS_PAGE_PREFIX + "index.html#about"} style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85 }}>About</a>
                <a href="#" onClick={(e) => {e.preventDefault();onContact && onContact();}} style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85, cursor: "pointer" }}>Contact</a>
                <a href="#" onClick={(e) => {e.preventDefault();onLogin && onLogin();}} style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85, cursor: "pointer" }}>Client Login</a>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.6, marginBottom: 14 }}>Legal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {legalLinks.map((l) =>
                <a key={l} href="#" onClick={(e) => {e.preventDefault();onLegal && onLegal(l);}} style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85, cursor: "pointer" }}>{l}</a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1180, margin: "32px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.6 }}>© 2026 TapScan, an Ahead of the Curve Group company. All rights reserved.</div>
          <div style={{ fontSize: 12, opacity: 0.6 }}></div>
        </div>
      </section>
    </footer>);

}

// ──────────────────────────────────────────────────────────────
// MODAL (Contact, Client Login info, Legal stub)
// ──────────────────────────────────────────────────────────────
function TSModal({ open, onClose, children, width = 520 }) {
  useUIEffect(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(15,17,17,0.55)",
      display: "grid", placeItems: "center", zIndex: 1000,
      animation: "tsFade 180ms cubic-bezier(0.2,0.8,0.2,1)",
      fontFamily: "Montserrat"
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 12, width: "min(92vw, " + width + "px)",
        maxHeight: "88vh", overflow: "auto",
        boxShadow: "0 24px 60px rgba(15,17,17,0.25)",
        animation: "tsSlide 220ms cubic-bezier(0.2,0.8,0.2,1)"
      }}>
        {children}
      </div>
    </div>);

}

function ContactForm({ onClose }) {
  const [form, setForm] = useUI({ name: "", company: "", email: "", message: "" });
  const [errors, setErrors] = useUI({});
  const [sent, setSent] = useUI(false);
  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim()) errs.email = "Required";else
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = "Use a valid email";
    if (!form.message.trim()) errs.message = "Tell us a bit about your needs";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };
  if (sent) {
    return (
      <div style={{ padding: 48, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: "#5EA852", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 style={{ fontWeight: 900, fontSize: 24, margin: 0, color: "#212331" }}>Message sent<span style={{ color: "#FFB855" }}>.</span></h3>
        <p style={{ fontSize: 14, color: "#7A7D8F", marginTop: 8 }}>We'll be in touch within one business day.</p>
        <button onClick={onClose} style={{
          marginTop: 24, fontFamily: "Montserrat", fontWeight: 700, fontSize: 14,
          padding: "12px 28px", borderRadius: 8,
          background: "#2F3886", color: "#fff", border: "none", cursor: "pointer"
        }}>Close</button>
      </div>);

  }
  const fld = (k, label, type = "text", multiline = false) =>
  <label style={{ display: "block", marginBottom: 16 }}>
      <div style={{ fontWeight: 600, fontSize: 12, color: "#212331", marginBottom: 6, letterSpacing: "0.02em" }}>{label}</div>
      {multiline ?
    <textarea value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} rows={4} style={{
      width: "100%", padding: "10px 12px", borderRadius: 6,
      border: "1px solid " + (errors[k] ? "#BF2540" : "#DDDFEE"),
      fontFamily: "Montserrat", fontSize: 14, outline: "none",
      resize: "vertical"
    }} /> :

    <input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} type={type} style={{
      width: "100%", padding: "10px 12px", borderRadius: 6,
      border: "1px solid " + (errors[k] ? "#BF2540" : "#DDDFEE"),
      fontFamily: "Montserrat", fontSize: 14, outline: "none"
    }} />
    }
      {errors[k] && <div style={{ fontSize: 11, color: "#BF2540", marginTop: 4 }}>{errors[k]}</div>}
    </label>;

  return (
    <form onSubmit={submit} style={{ padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h3 style={{ fontWeight: 900, fontSize: 22, margin: 0, color: "#212331" }}>Get in touch<span style={{ color: "#FFB855" }}>.</span></h3>
        <button type="button" onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 22, color: "#7A7D8F" }}>×</button>
      </div>
      <p style={{ fontSize: 14, color: "#7A7D8F", marginTop: 0, marginBottom: 24 }}>Tell us about your touchpoints. We'll be back within a business day.</p>
      {fld("name", "Your name")}
      {fld("company", "Company")}
      {fld("email", "Work email", "email")}
      {fld("message", "What can we help with?", "text", true)}
      <button type="submit" style={{
        width: "100%", fontFamily: "Montserrat", fontWeight: 700, fontSize: 15,
        padding: "14px 20px", borderRadius: 8,
        background: "#2F3886", color: "#fff", border: "none", cursor: "pointer",
        transition: "background 180ms"
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "#1C2250"}
      onMouseLeave={(e) => e.currentTarget.style.background = "#2F3886"}>
        Send message</button>
    </form>);

}

window.TSHeader = TSHeader;
window.TSHero = TSHero;
window.TSFaq = TSFaq;
window.TSFooter = TSFooter;
window.TSModal = TSModal;
window.ContactForm = ContactForm;
window.TS_FAQ_ITEMS = TS_FAQ_ITEMS;