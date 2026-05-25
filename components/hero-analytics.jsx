// ──────────────────────────────────────────────────────────────
// Hero Analytics — animated glassmorphic card cycling through
// 3 phases (Bar chart → Donut → Insights) on a 15s loop.
// Drops into the hero's right column.
// ──────────────────────────────────────────────────────────────
const { useEffect: useHAEffect, useRef: useHARef, useState: useHAState } = React;

/* Timing constants — 15s total loop, 3 phases of 5s each. */
const HA_LOOP = 15;
const HA_PHASE = 5;
const HA_FADE = 0.5;
const HA_BUILD = 1.8;

/* Layout grid — 640×360 (16:9) viewBox, P as single spacing unit. */
const HA_VB_W = 640, HA_VB_H = 360;
const HA_P = 24;
const HA_CX0 = HA_P, HA_CY0 = HA_P;
const HA_CW = HA_VB_W - 2 * HA_P;
const HA_CH = HA_VB_H - 2 * HA_P;

const haEaseOut = (t) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);
const haClamp01 = (t) => Math.max(0, Math.min(1, t));

function haPhaseState(i, t) {
  let dt = (((t - i * HA_PHASE) % HA_LOOP) + HA_LOOP + HA_LOOP / 2) % HA_LOOP - HA_LOOP / 2;
  if (dt < -HA_FADE || dt > HA_PHASE + HA_FADE) return { opacity: 0, build: 0 };
  if (dt < HA_FADE) return { opacity: (dt + HA_FADE) / (HA_FADE * 2), build: 0 };
  if (dt < HA_FADE + HA_BUILD) return { opacity: 1, build: (dt - HA_FADE) / HA_BUILD };
  if (dt < HA_PHASE - HA_FADE) return { opacity: 1, build: 1 };
  return { opacity: (HA_PHASE + HA_FADE - dt) / (HA_FADE * 2), build: 1 };
}

function useHALoopTime(reduced) {
  const [t, setT] = useHAState(0);
  useHAEffect(() => {
    if (reduced) return;
    let raf, start = performance.now();
    const tick = (now) => {
      setT(((now - start) / 1000) % HA_LOOP);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);
  return t;
}

/* ───── Bar chart state ───── */
const HA_BARS = [
  { label: "Walmart", value: 1.00 },
  { label: "Costco",  value: 0.74 },
  { label: "Target",  value: 0.59 },
  { label: "Kroger",  value: 0.22 },
  { label: "Aldi",    value: 0.10 },
];
const HA_Y_TICKS = [
  { y: 0.0,  label: "5,000" },
  { y: 0.25, label: "3,750" },
  { y: 0.50, label: "2,500" },
  { y: 0.75, label: "1,250" },
  { y: 1.0,  label: "0" },
];

function HABarState({ build }) {
  const yColW = 44;
  const xLabelH = 18;
  const barsX0 = HA_CX0 + yColW + HA_P;
  const barsW  = HA_CW - yColW - HA_P;
  const barsY0 = HA_CY0;
  const barsH  = HA_CH - HA_P - xLabelH;
  const baseline = barsY0 + barsH;
  const barW   = (barsW - HA_P * (HA_BARS.length - 1)) / HA_BARS.length;

  const axisOp = haEaseOut(haClamp01(build / 0.30));

  return (
    <svg viewBox={`0 0 ${HA_VB_W} ${HA_VB_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {HA_Y_TICKS.map((tick, i) => {
        const y = barsY0 + tick.y * barsH;
        return (
          <text key={i}
                x={HA_CX0 + yColW} y={y + 5}
                textAnchor="end"
                fontSize="14" fontWeight="700"
                fill="rgba(255,255,255,0.6)"
                opacity={axisOp}>
            {tick.label}
          </text>
        );
      })}

      {HA_BARS.map((bar, i) => {
        const stagger = i * 0.13;
        const local = haClamp01((build - stagger) / 0.48);
        const grow = haEaseOut(local);
        const fullH = bar.value * barsH;
        const h = fullH * grow;
        const bx = barsX0 + i * (barW + HA_P);
        const by = baseline - h;
        const xLabelY = baseline + HA_P + xLabelH * 0.75;
        return (
          <g key={bar.label}>
            <rect x={bx} y={by}
                  width={barW} height={Math.max(0.001, h)}
                  rx="4"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1" />
            <text x={bx + barW / 2} y={xLabelY}
                  textAnchor="middle"
                  fontSize="14" fontWeight="700"
                  fill="rgba(255,255,255,0.6)"
                  opacity={axisOp}>
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ───── Donut state ───── */
const HA_SEGMENTS = [
  { label: "English",    value: "14,820", pct: 0.50, opacity: 0.50 },
  { label: "Spanish",    value: "3,250",  pct: 0.25, opacity: 0.38 },
  { label: "French",     value: "1,200",  pct: 0.15, opacity: 0.28 },
  { label: "Portuguese", value: "640",    pct: 0.10, opacity: 0.18 },
];
const HA_TOTAL_ENGAGEMENTS = "19,910";

function haSingleWedge(cx, cy, rIn, rOut, d1, d2) {
  const polar = (r, deg) => {
    const rad = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const [x1o, y1o] = polar(rOut, d1);
  const [x2o, y2o] = polar(rOut, d2);
  const [x1i, y1i] = polar(rIn,  d1);
  const [x2i, y2i] = polar(rIn,  d2);
  const large = (d2 - d1) > 180 ? 1 : 0;
  return `M ${x1o} ${y1o}
          A ${rOut} ${rOut} 0 ${large} 1 ${x2o} ${y2o}
          L ${x2i} ${y2i}
          A ${rIn} ${rIn} 0 ${large} 0 ${x1i} ${y1i} Z`;
}
function haDonutWedgePath(cx, cy, rIn, rOut, d1, d2) {
  const sweep = d2 - d1;
  if (sweep <= 0.001) return null;
  if (sweep >= 179.9) {
    const dm = (d1 + d2) / 2;
    return [
      haSingleWedge(cx, cy, rIn, rOut, d1, dm),
      haSingleWedge(cx, cy, rIn, rOut, dm, d2),
    ].join(" ");
  }
  return haSingleWedge(cx, cy, rIn, rOut, d1, d2);
}

function HADonutState({ build }) {
  const donutD = HA_CH;
  const rOut = donutD / 2;
  const thickness = rOut * 0.5;
  const rIn = rOut - thickness;
  const donutCX = HA_CX0 + rOut;
  const donutCY = HA_CY0 + rOut;

  const legendSwatch    = 34;
  const legendInnerGap  = 14;
  const legendTextW     = 110;
  const legendBlockW    = legendSwatch + legendInnerGap + legendTextW;
  const rightZoneLeft   = HA_CX0 + donutD;
  const rightZoneRight  = HA_CX0 + HA_CW;
  const legendX         = (rightZoneLeft + rightZoneRight - legendBlockW) / 2;
  const legendRowH      = 38;
  const legendStackH    = 4 * legendRowH + 3 * HA_P;
  const legendY0        = HA_CY0 + (HA_CH - legendStackH) / 2;

  let cumDeg = 0;
  const segs = HA_SEGMENTS.map((s) => {
    const startDeg = cumDeg;
    cumDeg += s.pct * 360;
    return { ...s, startDeg, endDeg: cumDeg };
  });

  const sweepDeg = haEaseOut(haClamp01(build / 0.78)) * 360;
  const centerOp = haEaseOut(haClamp01((build - 0.55) / 0.35));

  return (
    <svg viewBox={`0 0 ${HA_VB_W} ${HA_VB_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <circle cx={donutCX} cy={donutCY} r={rOut - 0.5}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1" />

      {segs.map((s) => {
        const d2 = Math.min(s.endDeg, sweepDeg);
        const d = haDonutWedgePath(donutCX, donutCY, rIn, rOut, s.startDeg, d2);
        if (!d) return null;
        return (
          <path key={s.label} d={d}
                fill={`rgba(255,255,255,${s.opacity})`}
                shapeRendering="geometricPrecision" />
        );
      })}

      <g opacity={centerOp}>
        <text x={donutCX} y={donutCY - 2}
              textAnchor="middle"
              fontSize="30" fontWeight="700"
              fill="rgba(255,255,255,0.85)"
              letterSpacing="-0.01em">
          {HA_TOTAL_ENGAGEMENTS}
        </text>
        <text x={donutCX} y={donutCY + 22}
              textAnchor="middle"
              fontSize="13" fontWeight="500"
              fill="rgba(255,255,255,0.6)"
              letterSpacing="0.02em">
          Total Engagements
        </text>
      </g>

      {segs.map((s, i) => {
        const stagger = 0.30 + i * 0.11;
        const rowOp = haEaseOut(haClamp01((build - stagger) / 0.36));
        const slide = (1 - rowOp) * 12;
        const rowY = legendY0 + i * (legendRowH + HA_P);
        const cy = rowY + legendRowH / 2;
        const textX = legendX + legendSwatch + legendInnerGap;
        return (
          <g key={s.label}
             opacity={rowOp}
             transform={`translate(${slide} 0)`}>
            <rect x={legendX} y={cy - legendSwatch / 2}
                  width={legendSwatch} height={legendSwatch} rx="8"
                  fill={`rgba(255,255,255,${s.opacity})`}
                  stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            <text x={textX} y={cy - 3}
                  fontSize="15" fontWeight="700"
                  fill="rgba(255,255,255,0.85)">
              {s.label}
            </text>
            <text x={textX} y={cy + 14}
                  fontSize="12" fontWeight="500"
                  fill="rgba(255,255,255,0.6)">
              {s.value}  ·  {Math.round(s.pct * 100)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ───── Insights state ───── */
const HA_INSIGHTS = [
  "Engagement up 24% across priority retail markets this week.",
  "Peak scan activity detected between 5pm and 7pm in-store.",
  "Multilingual content driving 32% higher dwell time on average.",
  "Tradeshow touchpoints surpassing campaign benchmarks by 18%.",
];

function HAInsightState({ build }) {
  const rows = HA_INSIGHTS.length;
  const rowH = (HA_CH - (rows - 1) * HA_P) / rows;
  const circleD = rowH;
  const cardX = HA_CX0 + circleD + HA_P;
  const cardW = HA_CW - circleD - HA_P;

  return (
    <svg viewBox={`0 0 ${HA_VB_W} ${HA_VB_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {HA_INSIGHTS.map((txt, i) => {
        const stagger = i * 0.14;
        const local = haClamp01((build - stagger) / 0.46);
        const op = haEaseOut(local);
        const slide = (1 - op) * 16;
        const y = HA_CY0 + i * (rowH + HA_P);
        const cy = y + rowH / 2;
        return (
          <g key={i} opacity={op} transform={`translate(0 ${slide})`}>
            <circle cx={HA_CX0 + circleD / 2} cy={cy} r={circleD / 2 - 0.5}
                    fill="rgba(217,217,217,0.15)"
                    stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            <text x={HA_CX0 + circleD / 2} y={cy + 8}
                  textAnchor="middle"
                  fontSize="22" fontWeight="700"
                  fill="rgba(255,255,255,0.65)">
              {i + 1}
            </text>
            <rect x={cardX} y={y}
                  width={cardW} height={rowH} rx="8"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            <text x={cardX + HA_P * 0.75} y={cy + 5}
                  fontSize="14" fontWeight="600"
                  fill="rgba(255,255,255,0.7)">
              {txt}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ───── Top-level component ───── */
function HeroAnalytics() {
  const [reduced, setReduced] = useHAState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useHAEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Inject component styles once.
  useHAEffect(() => {
    if (document.getElementById("ts-hero-analytics-css")) return;
    const s = document.createElement("style");
    s.id = "ts-hero-analytics-css";
    s.textContent = `
      .ts-hero-analytics {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 16px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.10);
        border: 1px solid rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(14px) saturate(120%);
        -webkit-backdrop-filter: blur(14px) saturate(120%);
        isolation: isolate;
        color: #fff;
        font-family: "Montserrat", system-ui, sans-serif;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.10),
          0 30px 60px -20px rgba(0,0,0,0.35);
      }
      .ts-hero-analytics .ts-ha-layer {
        position: absolute; inset: 0;
        will-change: opacity, filter;
      }
      .ts-hero-analytics svg { display: block; width: 100%; height: 100%; }
      .ts-hero-analytics text { font-family: inherit; }
      @media (prefers-reduced-motion: reduce) {
        .ts-hero-analytics .ts-ha-layer { transition: none !important; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const t = useHALoopTime(reduced);

  if (reduced) {
    return (
      <div className="ts-hero-analytics" role="img"
           aria-label="Analytics summary with donut chart, key insights, and bar metrics.">
        <div className="ts-ha-layer" style={{ opacity: 1 }}>
          <HADonutState build={1} />
        </div>
      </div>
    );
  }

  const phases = [0, 1, 2].map((i) => haPhaseState(i, t));

  return (
    <div className="ts-hero-analytics" role="img"
         aria-label="Animated analytics card cycling through bar chart, donut chart, and insights.">
      <div className="ts-ha-layer" style={{
        opacity: phases[0].opacity,
        filter: phases[0].opacity < 1 ? `blur(${(1 - phases[0].opacity) * 4}px)` : "none",
      }}>
        <HABarState build={phases[0].build} />
      </div>
      <div className="ts-ha-layer" style={{
        opacity: phases[1].opacity,
        filter: phases[1].opacity < 1 ? `blur(${(1 - phases[1].opacity) * 4}px)` : "none",
      }}>
        <HADonutState build={phases[1].build} />
      </div>
      <div className="ts-ha-layer" style={{
        opacity: phases[2].opacity,
        filter: phases[2].opacity < 1 ? `blur(${(1 - phases[2].opacity) * 4}px)` : "none",
      }}>
        <HAInsightState build={phases[2].build} />
      </div>
    </div>
  );
}

window.HeroAnalytics = HeroAnalytics;
