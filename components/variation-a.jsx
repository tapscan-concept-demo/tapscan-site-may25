// Variation A — final
// No em dashes anywhere; service tier cards use placeholder icons.

function ImageSlot({ ratio = "4 / 3", label = "Image placeholder", tone = "amber" }) {
  const palette = tone === "amber" ?
  { bg: "#FFE7C2", border: "#F0C886", fg: "#7A5A1F" } :
  tone === "indigo" ?
  { bg: "#E1E5FF", border: "#B8C0F2", fg: "#3A4499" } :
  { bg: "#F5F6FF", border: "#DDDFEE", fg: "#5A6076" };
  return (
    <div style={{
      aspectRatio: ratio, width: "100%",
      background: palette.bg,
      border: "1.5px dashed " + palette.border,
      borderRadius: 16,
      display: "grid", placeItems: "center",
      color: palette.fg, fontFamily: "Montserrat"
    }}>
      <div style={{ textAlign: "center", padding: 24 }}>
        <div style={{
          fontWeight: 700, fontSize: 18, letterSpacing: "0.14em",
          textTransform: "uppercase", opacity: 0.7, lineHeight: 1.35,
        }}>Interactive Visual<br />To Be Added</div>
      </div>
    </div>);
}

// Placeholder icon (generic outline glyph in a chip)
function PlaceholderIcon({ bg, fg, idx }) {
  const icons = [
  // mobile phone
  <svg key="p" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2" /><line x1="11" y1="18" x2="13" y2="18" /></svg>,
  // route / map pin
  <svg key="r" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></svg>,
  // ecosystem / circles
  <svg key="e" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><line x1="6.5" y1="7.5" x2="10" y2="10.5" /><line x1="17.5" y1="7.5" x2="14" y2="10.5" /><line x1="6.5" y1="16.5" x2="10" y2="13.5" /><line x1="17.5" y1="16.5" x2="14" y2="13.5" /></svg>,
  // bar chart
  <svg key="b" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="20" x2="5" y2="12" /><line x1="12" y1="20" x2="12" y2="6" /><line x1="19" y1="20" x2="19" y2="14" /></svg>];

  return (
    <div style={{ width: 36, height: 36, borderRadius: 8, background: bg, display: "grid", placeItems: "center", marginBottom: 14 }}>
      {icons[idx % icons.length]}
    </div>);

}

function VarA_Basics() {
  const steps = [
  { n: "01", title: "Engage", body: "A shopper or field rep scans a QR code on your packaging, display, signage, or marketing asset, and lands on dynamic, contextualized content." },
  { n: "02", title: "Evaluate", body: "Every interaction feeds real-time engagement, geo, and execution data back to you, ready to act on." },
  { n: "03", title: "Evolve", body: "Use those signals to refine content, fix execution gaps, and make every next campaign sharper than the last." }];

  return (
    <section data-screen-label="Basics" style={{ padding: "clamp(72px, 10vw, 120px) clamp(20px, 5vw, 64px)", background: "#fff", fontFamily: "Montserrat" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 1100, margin: "0 auto 56px" }}>
          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFB855", marginBottom: 16 }}>How TapScan Works</div>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 4.5vw, 44px)", lineHeight: 1.15, margin: 0, color: "#212331", letterSpacing: "-0.015em" }}>
            Connect every touchpoint to dynamic content &amp; real-time data<span style={{ color: "#FFB855" }}>.</span>
          </h2>
          <p style={{ fontWeight: 300, fontSize: "clamp(16px, 1.7vw, 19px)", lineHeight: 1.5, color: "#212331", marginTop: 20 }}>
            TapScan turns ordinary marketing assets into measurable, context-aware moments, feeding shoppers what they need and giving you the data to prove what's working.
          </p>
        </div>
        <div className="ts-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, position: "relative" }}>
          {steps.map((s, i) =>
          <div key={i} className="ts-step" style={{
            padding: "0 32px",
            borderLeft: i === 0 ? "none" : "1px solid #DDDFEE"
          }}>
              <div style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: 56, color: "#FFB855", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 16 }}>{s.n}</div>
              <h3 style={{ fontWeight: 900, fontSize: 26, margin: 0, color: "#212331", letterSpacing: "-0.01em" }}>{s.title}<span style={{ color: "#FFB855" }}>.</span></h3>
              <p style={{ fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: "#212331", marginTop: 12 }}>{s.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);
}

function VarA_Experience({ onCaseStudies }) {
  // Placeholder copy until final marketing text lands. Selling-point cards
  // are intentionally numbered so the team can wireframe the section
  // before the real claims are written.
  const tiers = [
    { title: "Selling Point 1", body: "Short benefit statement that names a specific shopper-facing outcome. Roughly two lines of supporting detail goes here." },
    { title: "Selling Point 2", body: "Second selling point \u2014 a different angle on the same value proposition (different audience, channel, or stage of the journey)." },
    { title: "Selling Point 3", body: "Third selling point. Reinforce the proof element \u2014 measurement, attribution, or the operational lift the team gets." },
    { title: "Selling Point 4", body: "Fourth selling point. Close the loop with something forward-looking \u2014 optimization, learning, or feedback into the next campaign." },
  ];
  return (
    <section id="experience" data-screen-label="Experience" style={{ background: "#FFF6EA", padding: "clamp(72px, 10vw, 120px) clamp(20px, 5vw, 64px)", fontFamily: "Montserrat" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="ts-feature-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }}>
          <div>
            <img src="assets/pill-experience.svg" alt="TapScan Experience" style={{ height: 56, display: "block", marginBottom: 24, maxWidth: "100%" }} />
            <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 4.5vw, 44px)", lineHeight: 1.1, margin: 0, color: "#212331", letterSpacing: "-0.015em" }}>
              Compelling hook headline for the Experience section<span style={{ color: "#FFB855" }}>.</span>
            </h2>
            <p style={{ fontWeight: 400, fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.6, color: "#212331", marginTop: 20 }}>
              Placeholder paragraph explaining what TapScan Experience does for the brand. Roughly four lines of copy that sets up the four selling points below, names the shopper-facing outcomes, and earns the click on the case-studies CTA. To be replaced with final marketing copy.
            </p>
            <button onClick={() => onCaseStudies("experience")} style={{
              marginTop: 32, fontFamily: "Montserrat", fontWeight: 700, fontSize: 15,
              padding: "16px 28px", borderRadius: 8,
              background: "#FFB855", color: "#1C2250", border: "none", cursor: "pointer",
              transition: "all 180ms"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#E99623"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#FFB855"}>
              View Experience Case Studies →</button>
          </div>
          <div>
            <ImageSlot tone="amber" />
          </div>
        </div>
        <div className="ts-tier-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 64 }}>
          {tiers.map((t, i) =>
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #F9DCB3" }}>
              <PlaceholderIcon bg="#FFE7C2" fg="#7A5A1F" idx={i} />
              <h4 style={{ fontWeight: 900, fontSize: 15, margin: 0, color: "#212331" }}>{t.title}</h4>
              <p style={{ fontWeight: 400, fontSize: 13, lineHeight: 1.55, color: "#444", marginTop: 6 }}>{t.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);
}

function VarA_Accountability({ onCaseStudies }) {
  // Placeholder copy until final marketing text lands.
  const tiers = [
    { title: "Selling Point 1", body: "Short benefit statement that names a specific execution-side outcome. Roughly two lines of supporting detail goes here." },
    { title: "Selling Point 2", body: "Second selling point \u2014 a different angle (rollout speed, field-team workflow, or the data the brand team finally gets)." },
    { title: "Selling Point 3", body: "Third selling point. Reinforce the proof element \u2014 photo verification, geotagging, or audit-ready records." },
    { title: "Selling Point 4", body: "Fourth selling point. Close with the strategic payoff \u2014 measurable trade-marketing ROI and the loop back into the next campaign." },
  ];
  return (
    <section id="accountability" data-screen-label="Accountability" style={{ background: "#F5F6FF", padding: "clamp(72px, 10vw, 120px) clamp(20px, 5vw, 64px)", fontFamily: "Montserrat" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="ts-feature-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }}>
          <div>
            <img src="assets/pill-accountability.svg" alt="TapScan Accountability" style={{ height: 56, display: "block", marginBottom: 24, maxWidth: "100%" }} />
            <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 4.5vw, 44px)", lineHeight: 1.1, margin: 0, color: "#212331", letterSpacing: "-0.015em" }}>
              Compelling hook headline for the Accountability section<span style={{ color: "#6976E7" }}>.</span>
            </h2>
            <p style={{ fontWeight: 400, fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.6, color: "#212331", marginTop: 20 }}>
              Placeholder paragraph explaining what TapScan Accountability does for the brand. Roughly four lines of copy that sets up the four selling points below, frames the execution-side value, and earns the click on the case-studies CTA. To be replaced with final marketing copy.
            </p>
            <button onClick={() => onCaseStudies("accountability")} style={{
              marginTop: 32, fontFamily: "Montserrat", fontWeight: 700, fontSize: 15,
              padding: "16px 28px", borderRadius: 8,
              background: "#2F3886", color: "#fff", border: "none", cursor: "pointer",
              transition: "all 180ms"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#1C2250"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#2F3886"}>
              View Accountability Case Studies →</button>
          </div>
          <div>
            <ImageSlot tone="indigo" />
          </div>
        </div>
        <div className="ts-tier-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 64 }}>
          {tiers.map((t, i) =>
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #DDDFEE" }}>
              <PlaceholderIcon bg="#E1E5FF" fg="#3A4499" idx={i} />
              <h4 style={{ fontWeight: 900, fontSize: 15, margin: 0, color: "#212331" }}>{t.title}</h4>
              <p style={{ fontWeight: 400, fontSize: 13, lineHeight: 1.55, color: "#444", marginTop: 6 }}>{t.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);
}

function VarA_About() {
  // Three values — each gets a brand-coloured chip and a contrasting icon.
  // Sequence: light brand blue → main brand blue → brand orange.
  const valueChipBg = ["#6976E7", "#2F3886", "#FFB855"];
  // Icon stroke colour per chip — white reads on the blues; the amber chip
  // needs the navy ink so the glyph still has contrast.
  const valueIconStroke = ["#fff", "#fff", "#1C2250"];
  const values = [
  {
    title: "Insight Over Assumption",
    body: "We dig into what's actually happening at the touchpoint, not what people think is happening.",
    icon:
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>

  },
  {
    title: "Collaboration Drives Results",
    body: "The best work happens when brand, agency, and field teams build on the same shared signal.",
    icon:
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
          <path d="M15 20c0-2 2-3.5 4-3.5s2.5 1 2.5 1" />
        </svg>

  },
  {
    title: "Always Be Evolving",
    body: "We don't stand still. Every campaign teaches us something, and every next one is sharper for it.",
    icon:
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-3-6.7" />
          <polyline points="21 4 21 10 15 10" />
        </svg>

  }];


  return (
    <section id="about" data-screen-label="About" style={{ padding: "clamp(72px, 10vw, 120px) clamp(20px, 5vw, 64px)", background: "#fff", fontFamily: "Montserrat" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 820, margin: "0 auto 56px", textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFB855", marginBottom: 16 }}>Our Story</div>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 4.5vw, 44px)", lineHeight: 1.1, margin: 0, color: "#212331", letterSpacing: "-0.015em" }}>
            Built by brand experts, backed by experience<span style={{ color: "#FFB855" }}>.</span>
          </h2>
          <p style={{ fontWeight: 400, fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.65, color: "#212331", marginTop: 24 }}>
            TapScan was founded in 2018 as part of <strong style={{ color: "#2F3886" }}>Ahead of the Curve Group</strong>. Co-founders <strong>Terry Dennis</strong> and <strong>John Snow</strong> are former leaders in brand marketing, design, and global customer packaging, with decades of experience at CPG companies including Nestlé and Unilever.
          </p>
          <p style={{ fontWeight: 400, fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.65, color: "#212331", marginTop: 16 }}>
            That experience shaped what TapScan is today. We&rsquo;ve built a dedicated team to close the gap brands are facing — turning everyday touchpoints into adaptive experiences and actionable accountability that brand teams can stand behind.
          </p>
        </div>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 28px)", margin: 0, color: "#212331", textAlign: "center", letterSpacing: "-0.01em" }}>What We Believe In<span style={{ color: "#FFB855" }}>.</span></h3>
          <div className="ts-values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 40 }}>
            {values.map((v, i) =>
            <div key={i} style={{ background: "#F5F6FF", borderRadius: 16, padding: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: valueChipBg[i], color: valueIconStroke[i], display: "grid", placeItems: "center", marginBottom: 20 }}>{v.icon}</div>
                <h4 style={{ fontWeight: 900, fontSize: 18, margin: 0, color: "#212331" }}>{v.title}<span style={{ color: "#FFB855" }}>.</span></h4>
                <p style={{ fontWeight: 400, fontSize: 14, lineHeight: 1.6, color: "#212331", marginTop: 10 }}>{v.body}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);
}

window.VarA_Basics = VarA_Basics;
window.VarA_Experience = VarA_Experience;
window.VarA_Accountability = VarA_Accountability;
window.VarA_About = VarA_About;