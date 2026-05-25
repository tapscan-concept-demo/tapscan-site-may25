// TapScan dashboard charts — interactive SVG primitives.
//
// Each chart accepts:
//   data      — [{ label, value, sub? }, ...]
//   type      — "experience" | "accountability" | "other" (drives the palette)
//   format    — fn(value) → display string  (default: number with thousands sep)
//
// All charts render as responsive SVGs (viewBox sized to the wrapper) and
// expose hover interactions: hover a bar / segment / point to surface its
// exact value in a tooltip.

const { useState: useChart } = React;

const CHART_PALETTE = {
  experience: ["#FFB855", "#E99623", "#FFCF8C", "#FFDFB3", "#F6A53D", "#C97D14"],
  accountability: ["#6976E7", "#5D67BA", "#BAC1FF", "#8B92CD", "#D4D9FF", "#2F3886"],
  other: ["#2F3886", "#5D67BA", "#8B92CD", "#1C2250", "#BAC1FF", "#FFB855"],
};
const CHART_NEUTRAL = { grid: "#EEF0F8", axis: "#7A7D8F", tip: "#1C2250" };

function chartPalette(type) { return CHART_PALETTE[type] || CHART_PALETTE.other; }
const fmtNum = (v) => (typeof v === "number" ? v.toLocaleString() : String(v));

// ──────────────────────────────────────────────────────────────
// Card wrapper used by every chart on the dashboard.
function ChartCard({ title, children, height = 240, footnote }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: "18px 20px 16px",
      display: "flex", flexDirection: "column", gap: 10,
      height: "100%",
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1C2250", letterSpacing: "-0.005em" }}>{title}</div>
      <div style={{ flex: 1, position: "relative", minHeight: height }}>{children}</div>
      {footnote && <div style={{ fontSize: 10, color: "#7A7D8F", fontWeight: 500 }}>{footnote}</div>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Vertical bar chart — one bar per category, hover for exact value.
function VBarChart({ data, type = "other", format = fmtNum }) {
  const [hover, setHover] = useChart(null);
  const palette = chartPalette(type);
  const max = Math.max(...data.map((d) => d.value));
  // "Nice" the y-axis upper bound so labels look intentional.
  const niceMax = niceNumber(max);

  const W = 360, H = 240;
  const pad = { top: 22, right: 14, bottom: 38, left: 44 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const gap = 10;
  const bw = (innerW - gap * (data.length - 1)) / data.length;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((p) => Math.round(niceMax * p));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
         style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}>
      {ticks.map((t, i) => {
        const y = pad.top + innerH - (t / niceMax) * innerH;
        return (
          <g key={i}>
            <line x1={pad.left} x2={pad.left + innerW} y1={y} y2={y} stroke={CHART_NEUTRAL.grid} strokeWidth={1} />
            <text x={pad.left - 8} y={y + 3} fontSize={9} fill={CHART_NEUTRAL.axis} textAnchor="end" fontFamily="Montserrat" fontWeight={600}>{format(t)}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const x = pad.left + i * (bw + gap);
        const barH = (d.value / niceMax) * innerH;
        const y = pad.top + innerH - barH;
        const isH = hover === i;
        const isFaded = hover !== null && !isH;
        const color = palette[i % palette.length];
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
            <rect x={x} y={y} width={bw} height={barH} rx={4} fill={color}
                  style={{ opacity: isFaded ? 0.4 : 1, transition: "opacity 150ms" }} />
            <text x={x + bw / 2} y={pad.top + innerH + 14} fontSize={9}
                  fill="#212331" textAnchor="middle" fontFamily="Montserrat" fontWeight={600}>{d.label}</text>
            {isH && (
              <g pointerEvents="none">
                <rect x={x + bw / 2 - 34} y={y - 26} width={68} height={20} rx={4} fill={CHART_NEUTRAL.tip} />
                <text x={x + bw / 2} y={y - 12} fontSize={11} fill="#fff" textAnchor="middle"
                      fontFamily="Montserrat" fontWeight={700}>{format(d.value)}</text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Horizontal bar chart — good for ranked locations / categories.
function HBarChart({ data, type = "other", format = fmtNum }) {
  const [hover, setHover] = useChart(null);
  const palette = chartPalette(type);
  // Sort descending so the chart reads as a leaderboard.
  const sorted = [...data].sort((a, b) => b.value - a.value);
  const max = Math.max(...sorted.map((d) => d.value));
  const niceMax = niceNumber(max);

  const W = 360, rowH = 28, gap = 6, pad = { top: 8, right: 60, bottom: 8, left: 110 };
  const H = pad.top + pad.bottom + sorted.length * rowH + (sorted.length - 1) * gap;
  const innerW = W - pad.left - pad.right;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
         style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}>
      {sorted.map((d, i) => {
        const y = pad.top + i * (rowH + gap);
        const bw = (d.value / niceMax) * innerW;
        const color = palette[i % palette.length];
        const isH = hover === i;
        const isFaded = hover !== null && !isH;
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
            <text x={pad.left - 8} y={y + rowH / 2 + 4} fontSize={11}
                  fill="#212331" textAnchor="end" fontFamily="Montserrat"
                  fontWeight={isH ? 700 : 600}>{d.label}</text>
            <rect x={pad.left} y={y + 4} width={innerW} height={rowH - 8} rx={4} fill={CHART_NEUTRAL.grid} />
            <rect x={pad.left} y={y + 4} width={bw} height={rowH - 8} rx={4} fill={color}
                  style={{ opacity: isFaded ? 0.4 : 1, transition: "opacity 150ms" }} />
            <text x={pad.left + bw + 6} y={y + rowH / 2 + 4} fontSize={11}
                  fill="#212331" fontFamily="Montserrat" fontWeight={700}>{format(d.value)}</text>
            {/* Hover capture is the whole row, so labels are easy to grab too. */}
            <rect x={0} y={y} width={W} height={rowH} fill="transparent" />
          </g>
        );
      })}
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Donut chart — categorical share. Hover a slice to focus it.
function DonutChart({ data, type = "other", format = fmtNum }) {
  const [hover, setHover] = useChart(null);
  const palette = chartPalette(type);
  const total = data.reduce((s, d) => s + d.value, 0);

  const W = 360, H = 240;
  const cx = 110, cy = H / 2;
  const outerR = 84;
  const innerR = 50;

  let acc = 0;
  const segments = data.map((d) => {
    const start = acc / total;
    acc += d.value;
    const end = acc / total;
    return { start, end };
  });

  const focus = hover === null ? null : data[hover];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
         style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}>
      {data.map((d, i) => {
        const { start, end } = segments[i];
        const isH = hover === i;
        const r = isH ? outerR + 6 : outerR;
        const isFaded = hover !== null && !isH;
        const path = donutSlice(cx, cy, r, innerR, start, end);
        const color = palette[i % palette.length];
        return (
          <path key={i} d={path} fill={color}
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer", opacity: isFaded ? 0.35 : 1, transition: "opacity 150ms" }} />
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={22} fill="#1C2250">
        {focus ? format(focus.value) : format(total)}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="Montserrat" fontWeight={600} fontSize={10} fill="#7A7D8F">
        {focus ? truncate(focus.label, 16) : "Total"}
      </text>
      {/* Legend */}
      {data.map((d, i) => {
        const ly = 26 + i * 26;
        const color = palette[i % palette.length];
        const isH = hover === i;
        const pct = Math.round((d.value / total) * 100);
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
            <rect x={220} y={ly - 10} width={130} height={22} fill="transparent" />
            <rect x={220} y={ly - 6} width={10} height={10} rx={2} fill={color}
                  style={{ opacity: hover !== null && !isH ? 0.4 : 1 }} />
            <text x={236} y={ly + 3} fontSize={11} fontFamily="Montserrat"
                  fontWeight={isH ? 800 : 600} fill="#212331">{truncate(d.label, 18)}</text>
            <text x={236} y={ly + 15} fontSize={9} fontFamily="Montserrat" fontWeight={600} fill="#7A7D8F">
              {format(d.value)} · {pct}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Line chart — single series over evenly-spaced x labels.
function LineChart({ data, type = "other", format = fmtNum }) {
  const [hover, setHover] = useChart(null);
  const palette = chartPalette(type);
  const color = palette[0];
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const niceMax = niceNumber(max);
  // Anchor the axis at 0 — easier to read scale jumps in % / count series.
  const niceMin = 0;

  const W = 360, H = 240;
  const pad = { top: 22, right: 18, bottom: 38, left: 44 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const xAt = (i) => pad.left + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
  const yAt = (v) => pad.top + innerH - ((v - niceMin) / (niceMax - niceMin)) * innerH;
  const points = data.map((d, i) => ({ x: xAt(i), y: yAt(d.value), ...d }));
  const pathD = "M " + points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ");
  const areaD = pathD + ` L ${points[points.length - 1].x.toFixed(1)} ${(pad.top + innerH).toFixed(1)}` +
                ` L ${points[0].x.toFixed(1)} ${(pad.top + innerH).toFixed(1)} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((p) => Math.round(niceMin + (niceMax - niceMin) * p));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
         onMouseLeave={() => setHover(null)}
         style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}>
      {ticks.map((t, i) => {
        const y = yAt(t);
        return (
          <g key={i}>
            <line x1={pad.left} x2={pad.left + innerW} y1={y} y2={y} stroke={CHART_NEUTRAL.grid} strokeWidth={1} />
            <text x={pad.left - 8} y={y + 3} fontSize={9} fill={CHART_NEUTRAL.axis} textAnchor="end" fontFamily="Montserrat" fontWeight={600}>{format(t)}</text>
          </g>
        );
      })}
      <path d={areaD} fill={color} opacity={0.15} />
      <path d={pathD} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => {
        const isH = hover === i;
        const stripW = innerW / data.length;
        return (
          <g key={i}>
            <rect x={p.x - stripW / 2} y={pad.top} width={stripW} height={innerH} fill="transparent"
                  onMouseEnter={() => setHover(i)} style={{ cursor: "pointer" }} />
            <circle cx={p.x} cy={p.y} r={isH ? 5.5 : 3.5} fill="#fff" stroke={color} strokeWidth={2}
                    style={{ transition: "r 150ms" }} />
            <text x={p.x} y={pad.top + innerH + 16} fontSize={9}
                  fill="#212331" textAnchor="middle" fontFamily="Montserrat" fontWeight={600}>{p.label}</text>
            {isH && (
              <g pointerEvents="none">
                <line x1={p.x} x2={p.x} y1={pad.top} y2={pad.top + innerH} stroke={color} strokeWidth={1} strokeDasharray="3 3" />
                <rect x={Math.max(p.x - 34, 0)} y={p.y - 28} width={68} height={20} rx={4} fill={CHART_NEUTRAL.tip} />
                <text x={Math.max(p.x - 34, 0) + 34} y={p.y - 14} fontSize={11} fill="#fff" textAnchor="middle"
                      fontFamily="Montserrat" fontWeight={700}>{format(p.value)}</text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Region bubble map — abstract geographic visualisation. Each entry is
// positioned with normalised x/y in [0..1] across a soft regional outline,
// with bubble size keyed to value. Hover for the precise number.
const REGION_OUTLINES = {
  // Soft, intentionally non-geographic rectangles + a label — close enough
  // to suggest "this is a region map" without faking a real cartogram.
  US:           { label: "United States",  ratio: 1.5 },
  Canada:       { label: "Canada",         ratio: 1.6 },
  UK:           { label: "United Kingdom", ratio: 0.85 },
  "North America": { label: "North America", ratio: 1.4 },
  Global:       { label: "Global",         ratio: 1.9 },
};

function RegionMap({ data, type = "other", region = "North America", format = fmtNum }) {
  const [hover, setHover] = useChart(null);
  const palette = chartPalette(type);
  const max = Math.max(...data.map((d) => d.value));
  const meta = REGION_OUTLINES[region] || REGION_OUTLINES.Global;

  // viewBox is wide so the outline fills the card.
  const W = 480, H = Math.round(W / meta.ratio);
  const color = palette[0];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
         style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}>
      <defs>
        <pattern id={"rm-dots-" + type} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#D4D9FF" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={W} height={H} rx={16} fill="#F5F6FF" />
      <rect x="0" y="0" width={W} height={H} rx={16} fill={"url(#rm-dots-" + type + ")"} />
      <text x={16} y={26} fontSize={12} fontFamily="Montserrat" fontWeight={700} fill="#7A7D8F">{meta.label}</text>
      {data.map((d, i) => {
        const cx = Math.max(40, Math.min(W - 40, d.x * W));
        const cy = Math.max(40, Math.min(H - 30, d.y * H));
        // Bubble size: 8–22px so high-density regions don't visually consume
        // their neighbours' labels.
        const r = 8 + (d.value / max) * 14;
        const isH = hover === i;
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
            <circle cx={cx} cy={cy} r={r + 8} fill={color} opacity={isH ? 0.25 : 0.12}
                    style={{ transition: "opacity 150ms" }} />
            <circle cx={cx} cy={cy} r={r} fill={color}
                    opacity={hover !== null && !isH ? 0.45 : 0.9}
                    stroke="#fff" strokeWidth={1.5}
                    style={{ transition: "opacity 150ms" }} />
            <text x={cx} y={cy + r + 14} fontSize={10} textAnchor="middle"
                  fontFamily="Montserrat" fontWeight={isH ? 800 : 600} fill="#1C2250">{d.label}</text>
            {isH && (
              <g pointerEvents="none">
                <rect x={cx - 56} y={cy - r - 30} width={112} height={22} rx={4} fill={CHART_NEUTRAL.tip} />
                <text x={cx} y={cy - r - 15} fontSize={11} fill="#fff" textAnchor="middle"
                      fontFamily="Montserrat" fontWeight={700}>{format(d.value)}</text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Dispatcher — pick a chart by `kind` so dashboard configs stay declarative.
function Chart({ kind, ...rest }) {
  if (kind === "vbar")    return <VBarChart {...rest} />;
  if (kind === "hbar")    return <HBarChart {...rest} />;
  if (kind === "donut")   return <DonutChart {...rest} />;
  if (kind === "line")    return <LineChart {...rest} />;
  if (kind === "map")     return <RegionMap {...rest} />;
  return null;
}

// ──────────────────────────────────────────────────────────────
// Helpers
function niceNumber(n) {
  if (n <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(n)));
  const norm = n / pow;
  let nice;
  if (norm <= 1)      nice = 1;
  else if (norm <= 2) nice = 2;
  else if (norm <= 2.5) nice = 2.5;
  else if (norm <= 5) nice = 5;
  else                nice = 10;
  return nice * pow;
}

function donutSlice(cx, cy, outerR, innerR, startFrac, endFrac) {
  // Two-decimal precision keeps the path string compact.
  const sa = startFrac * Math.PI * 2 - Math.PI / 2;
  const ea = endFrac * Math.PI * 2 - Math.PI / 2;
  const large = endFrac - startFrac > 0.5 ? 1 : 0;
  const x1 = cx + Math.cos(sa) * outerR, y1 = cy + Math.sin(sa) * outerR;
  const x2 = cx + Math.cos(ea) * outerR, y2 = cy + Math.sin(ea) * outerR;
  const ix1 = cx + Math.cos(sa) * innerR, iy1 = cy + Math.sin(sa) * innerR;
  const ix2 = cx + Math.cos(ea) * innerR, iy2 = cy + Math.sin(ea) * innerR;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)}` +
         ` A ${outerR} ${outerR} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}` +
         ` L ${ix2.toFixed(2)} ${iy2.toFixed(2)}` +
         ` A ${innerR} ${innerR} 0 ${large} 0 ${ix1.toFixed(2)} ${iy1.toFixed(2)} Z`;
}

function truncate(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }

window.TSChartCard = ChartCard;
window.TSChart = Chart;
window.TSVBar = VBarChart;
window.TSHBar = HBarChart;
window.TSDonut = DonutChart;
window.TSLine = LineChart;
window.TSRegionMap = RegionMap;
