// Three sections beneath the hero, recreated faithfully from the
// attached Figma "Untitled.fig" / Home frame:
//   1. TSFalls       — "Where Most Messaging Often Falls Short."
//   2. TSDynamic     — "Every Static Touchpoint, Now a Dynamic Connection."
//   3. TSContextual  — "Contextualized Messaging to Meet Every Moment."
//
// Illustrations live in <image-slot> elements so the user can drop in
// the actual PNGs exported from the Figma file.

const FIG_TEXT   = "#212331";
const FIG_NAVY   = "#2F3886";
const FIG_INDIGO = "#6976E7";
const FIG_CHIP_HOVER = "#6976E7"; // light brand-blue used when a chip is hovered
const FIG_CHIP_BORDER = "#7C86D8";
const FIG_WASH = "#F5F6FF";

// ──────────────────────────────────────────────────────────────
// Shared illustration frame — circular indigo backdrop matching
// the Figma. Hosts an <image-slot> the user can drop a PNG into.
// ──────────────────────────────────────────────────────────────
function FigIllustration({ slotId, placeholder, align = "center" }) {
  // align: 'left' | 'center' | 'right' — controls horizontal anchor of the
  // square circle frame inside its grid column.
  const justify = align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";
  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: justify
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: 420,
        aspectRatio: "1 / 1",
        display: "grid",
        placeItems: "center"
      }}>
        <image-slot
          id={slotId}
          shape="rect"
          placeholder={placeholder}
          class="fig-clean-slot"
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            border: "none"
          }}
        />
        {/* Pinned placeholder label on top of every illustration — flags
            that the final imagery still needs to be supplied. Hidden once
            the user drops a real image into the slot? No — keep it visible
            until the imagery is signed off. */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(15,17,17,0.62)",
          color: "#fff",
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.12em",
          padding: "6px 14px",
          borderRadius: 999,
          pointerEvents: "none",
          textTransform: "uppercase",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          whiteSpace: "nowrap",
        }}>(To Be Replaced)</div>
      </div>
    </div>);

}

// ──────────────────────────────────────────────────────────────
// Section 1 — Where Most Messaging Often Falls Short
// Layout: text left, illustration right; white background
// ──────────────────────────────────────────────────────────────
function TSFalls() {
  return (
    <section data-screen-label="Falls Short" style={{
      background: "#fff",
      padding: "64px clamp(20px, 5vw, 64px)",
      fontFamily: "Montserrat"
    }}>
      <div className="ts-fig-row" style={{
        maxWidth: 1180, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center"
      }}>
        <div>
          <h2 style={{
            fontWeight: 900, fontSize: 32, lineHeight: 1.15,
            margin: 0, color: FIG_TEXT, letterSpacing: "-0.01em"
          }}>
            Where Most Messaging Often Falls Short<span style={{ color: "#FFB855" }}>.</span>
          </h2>
          <p style={{
            fontWeight: 500, fontSize: 16, lineHeight: 1.55,
            color: FIG_TEXT, marginTop: 24, marginBottom: 0
          }}>
            Organizations routinely deploy static content, displays, packaging, media signage, and service touchpoints hoping to make an impact. However, without live visibility like real-time monitoring or feedback systems, it&rsquo;s impossible to know if those moments were delivered, experienced, or effective.
          </p>
        </div>
        <FigIllustration
          slotId="fig-illus-falls"
          align="center"
          placeholder="Drop the &lsquo;World consumption&rsquo; illustration here (export from Figma as PNG)"
        />
      </div>
    </section>);

}

// ──────────────────────────────────────────────────────────────
// Section 2 — Every Static Touchpoint, Now a Dynamic Connection
// Layout: illustration left, text + chip cloud right; lavender wash
// ──────────────────────────────────────────────────────────────
const FIG_CHIPS = [
  { label: "Merchandise Displays",   description: "TapScan embeds dynamic QR codes directly into product and floor displays \u2014 turning a static promotion into a live destination shoppers can scan for offers, content, and loyalty enrollment." },
  { label: "In Store Signage",       description: "Aisle and category signage carry TapScan codes that surface retailer-specific content in real time \u2014 adapting to language, time of day, or local promo without a reprint." },
  { label: "Product Packaging",      description: "Every pack becomes a direct-to-consumer channel \u2014 ingredient traceability, certifications, recipes, or reorder, all attributed back to the SKU." },
  { label: "Billboards",             description: "Out-of-home placements connect viewers to a campaign hub via a single scan, with location-aware variants and per-board performance reporting." },
  { label: "Social Media Advertising", description: "TapScan ties a printed or out-of-home creative to its social campaign sibling, so cross-channel engagement is measured as one funnel, not two disconnected ones." },
  { label: "Broadcast Advertising",  description: "A QR on TV, streaming, or radio companion screens turns broadcast moments into measurable interactions \u2014 by airing, daypart, and region." },
  { label: "Print Media",            description: "Newspaper, magazine, and direct-mail placements become trackable, two-way touchpoints that surface campaign performance previously locked behind attribution guesswork." },
  { label: "Trade Show Booths",      description: "Booth and event collateral capture leads instantly through a branded TapScan code \u2014 sign-up, language preference, and follow-up automation all flow through a single experience." },
  { label: "Support Material",       description: "Spec sheets, sales kits, and field guides connect reps and customers to the latest version of any document the moment they scan \u2014 versioned, attributed, and audit-ready." },
  { label: "& More Custom Solutions", description: "TapScan can be deployed against any printed or physical surface where you need to turn a static interaction into a live, measurable two-way moment." },
];

// AI-disclaimer suffix appended to every chip tooltip until the copy is
// reviewed by humans.
const FIG_CHIP_AI_DISCLAIMER = " (AI Generated Text \u2014 needs to be reviewed/revised)";

function FigChip({ label, description }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: 1500,
        background: hover ? FIG_CHIP_HOVER : FIG_NAVY,
        border: "0.5px solid " + FIG_CHIP_BORDER,
        boxShadow: hover
          ? "0 4px 14px rgba(105,118,231,0.35)"
          : "1px 1px 1px rgba(0,0,0,0.25)",
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 12,
        lineHeight: "16px",
        color: "#fff",
        whiteSpace: "nowrap",
        cursor: "help",
        transition: "background 180ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 180ms cubic-bezier(0.2,0.8,0.2,1), transform 180ms cubic-bezier(0.2,0.8,0.2,1)",
        transform: hover ? "translateY(-1px)" : "none",
        outline: "none",
      }}>
      {label}
      {/* Tooltip — absolutely positioned, only mounts while hovered/focused
          so it never blocks pointer events when idle. */}
      {hover && description && (
        <span role="tooltip" style={{
          position: "absolute",
          left: "50%",
          bottom: "calc(100% + 10px)",
          transform: "translateX(-50%)",
          background: "#1C2250",
          color: "#fff",
          padding: "12px 14px",
          borderRadius: 8,
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: 12,
          lineHeight: 1.5,
          whiteSpace: "normal",
          width: 280,
          boxShadow: "0 12px 28px rgba(15,17,17,0.30)",
          zIndex: 30,
          textAlign: "left",
          pointerEvents: "none",
          animation: "figChipTipFade 160ms cubic-bezier(0.2,0.8,0.2,1) both",
        }}>
          {description + FIG_CHIP_AI_DISCLAIMER}
          {/* Triangle pointer */}
          <span aria-hidden="true" style={{
            position: "absolute",
            left: "50%",
            top: "100%",
            transform: "translateX(-50%)",
            width: 0, height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderTop: "7px solid #1C2250",
          }} />
        </span>
      )}
    </span>);

}

function TSDynamic() {
  return (
    <section data-screen-label="Dynamic Connection" style={{
      background: FIG_WASH,
      padding: "64px clamp(20px, 5vw, 64px)",
      fontFamily: "Montserrat"
    }}>
      <div className="ts-fig-row" style={{
        maxWidth: 1180, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center"
      }}>
        <FigIllustration
          slotId="fig-illus-dynamic"
          align="center"
          placeholder="Drop the &lsquo;Marketing meetup&rsquo; illustration here (export from Figma as PNG)"
        />
        <div>
          <h2 style={{
            fontWeight: 900, fontSize: 32, lineHeight: 1.15,
            margin: 0, color: FIG_TEXT, letterSpacing: "-0.01em"
          }}>
            Every Static Touchpoint, Now a Dynamic Connection<span style={{ color: "#FFB855" }}>.</span>
          </h2>
          <p style={{
            fontWeight: 500, fontSize: 16, lineHeight: 1.55,
            color: FIG_TEXT, marginTop: 24, marginBottom: 32
          }}>
            We address the limitations of blind, one-way messaging by integrating key physical touchpoints with digital experiences. This approach facilitates context-specific, two-way communication directly at the point of interaction.
          </p>
          {/* Subtle nudge — tells the user the chips below are interactive.
              The cursor pointer/wiggle keeps it discoverable without shouting. */}
          <div className="ts-fig-chip-hint" aria-hidden="true" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "Montserrat", fontWeight: 600, fontSize: 12,
            color: FIG_NAVY, opacity: 0.75,
            letterSpacing: "0.04em", textTransform: "uppercase",
            marginBottom: 14,
          }}>
            <span className="ts-fig-chip-hint-cursor" aria-hidden="true" style={{
              display: "inline-flex", color: FIG_NAVY,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11.5V5a2 2 0 1 1 4 0v6" />
                <path d="M13 11V8a2 2 0 1 1 4 0v5" />
                <path d="M17 11V9a2 2 0 1 1 4 0v7a6 6 0 0 1-6 6h-2a6 6 0 0 1-5.2-3l-3.6-6a2 2 0 0 1 3.4-2L9 13.5" />
              </svg>
            </span>
            <span>Hover any tag to see how it works</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {FIG_CHIPS.map((c, i) => <FigChip key={i} label={c.label} description={c.description} />)}
          </div>
        </div>
      </div>
    </section>);

}

// ──────────────────────────────────────────────────────────────
// Section 3 — Contextualized Messaging to Meet Every Moment
// Layout: text left, illustration right; white background
// ──────────────────────────────────────────────────────────────
function TSContextual() {
  return (
    <section data-screen-label="Contextualized" style={{
      background: "#fff",
      padding: "64px clamp(20px, 5vw, 64px)",
      fontFamily: "Montserrat"
    }}>
      <div className="ts-fig-row" style={{
        maxWidth: 1180, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center"
      }}>
        <div>
          <h2 style={{
            fontWeight: 900, fontSize: 32, lineHeight: 1.15,
            margin: 0, color: FIG_TEXT, letterSpacing: "-0.01em"
          }}>
            Contextualized Messaging to Meet Every Moment<span style={{ color: "#FFB855" }}>.</span>
          </h2>
          <p style={{
            fontWeight: 500, fontSize: 16, lineHeight: 1.55,
            color: FIG_TEXT, marginTop: 24, marginBottom: 0
          }}>
            TapScan&rsquo;s dynamic experiences adapt content in real time by retailer, region, day, time, language, and more, ensuring every interaction feels personal and relevant. Your audience sees the right message, in the right moment, everywhere your organization connects.
          </p>
        </div>
        <FigIllustration
          slotId="fig-illus-contextual"
          align="center"
          placeholder="Drop the &lsquo;Idea management&rsquo; illustration here (export from Figma as PNG)"
        />
      </div>
    </section>);

}

// Responsive: stack on small screens
(function injectFigCss() {
  if (document.getElementById("fig-sections-css")) return;
  const s = document.createElement("style");
  s.id = "fig-sections-css";
  s.textContent = `
    @media (max-width: 760px) {
      .ts-fig-row { grid-template-columns: 1fr !important; gap: 40px !important; }
    }
    /* Strip the default frame/ring chrome from the homepage figma illustrations */
    .fig-clean-slot::part(frame) { background: transparent !important; }
    .fig-clean-slot::part(ring)  { display: none !important; }
    @keyframes figChipTipFade { from { opacity: 0; transform: translate(-50%, 4px); } to { opacity: 1; transform: translate(-50%, 0); } }
    /* Gentle nudge animation on the chip-hint cursor — slow tap motion every
       few seconds so the hint catches the eye without being noisy. */
    @keyframes figChipHintTap {
      0%, 70%, 100% { transform: translateY(0) rotate(0deg); }
      78%           { transform: translateY(2px) rotate(-4deg); }
      86%           { transform: translateY(-1px) rotate(2deg); }
      94%           { transform: translateY(0) rotate(0deg); }
    }
    .ts-fig-chip-hint-cursor { animation: figChipHintTap 3.6s ease-in-out infinite; transform-origin: 50% 80%; }
    @media (prefers-reduced-motion: reduce) {
      .ts-fig-chip-hint-cursor { animation: none; }
    }
  `;
  document.head.appendChild(s);
})();

window.TSFalls = TSFalls;
window.TSDynamic = TSDynamic;
window.TSContextual = TSContextual;
