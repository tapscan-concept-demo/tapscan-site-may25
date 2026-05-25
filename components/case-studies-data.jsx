// TapScan case study content + dashboard data.
//
// Each case study has:
//   id          — slug used in image-slot ids and URLs
//   type        — "experience" | "accountability" | "other"
//   title       — long-form headline shown on the card and detail hero
//   client      — client / industry display string (used on card)
//   industry    — "Industry: …" pill
//   locations   — "Locations: …" pill
//   summary     — short blurb on the card
//   problem / solution / outcome — story sections in the detail
//   metrics     — three headline metrics for the dashboard
//   dashboard.charts — four interactive chart definitions
//   dashboard.insights — three bullets for "Report insights"
//   accentColor — pill dot color (matches type by default; kept here so the
//                 dashboard donut/bar/line palettes stay aligned with the brand)
//
// Numbers and chart values are illustrative — same disclaimer as the Figma
// dashboards: they don't reflect actual client performance metrics.

const CASE_STUDIES = [
  // ───────────────────────── EXPERIENCE (4) ─────────────────────────
  {
    id: "in-store-marketing",
    type: "experience",
    title: "In-Store Marketing Case Study.",
    client: "Smart Televisions",
    industry: "Industry: Smart Televisions",
    locations: "Locations: Major Retailers Around North America",
    summary: "Permanent in-aisle displays became dynamic, multilingual decision-support — driving shopper confidence and a direct path to retailer e-commerce.",
    problem: "Shoppers often struggled to understand the differences and value between product models, where limited staff and packaging alone couldn't communicate key features or value. Retailers couldn't deliver consistent guidance across stores, and the brand lacked visibility into how displays were performing. Both needed a clear, reliable way to guide confident decisions at the point of purchase.",
    solution: "TapScan transformed the permanent in-aisle display into a dynamic decision-support tool through branded QR access points. Shoppers could instantly explore product value in their preferred language, compare models based on the features that mattered to them, and understand compatibility with confidence. The experience also connected directly to the retailer's e-commerce pages, giving shoppers a seamless path to purchase without the wait.",
    outcome: "The activation drove stronger shopper confidence and measurable increases in engagement across stores, regions, and fixture types. TapScan provided the brand with clear visibility into display performance — including interaction patterns, preferred languages, most-viewed models, and key product interest signals. These insights enabled ongoing optimization of messaging and merchandising strategy, strengthening both conversion potential and retail execution.",
    metrics: [
      { v: "+34%", l: "Avg session length" },
      { v: "4.2", l: "Models compared / scan" },
      { v: "3", l: "Languages auto-served" },
    ],
    dashboard: {
      charts: [
        { kind: "vbar",  title: "Shopper Engagement by Retailer.", data: [
          { label: "Best Buy", value: 4350 },
          { label: "Costco",   value: 3820 },
          { label: "Target",   value: 2940 },
          { label: "Walmart",  value: 2110 },
          { label: "Amazon",   value: 1680 },
        ]},
        { kind: "donut", title: "Shopper Engagement by Language.", data: [
          { label: "English", value: 14820 },
          { label: "Spanish", value:  3640 },
          { label: "French",  value:  1450 },
        ]},
        { kind: "line",  title: "Scans Per Week.", data: [
          { label: "W1", value:  920 },
          { label: "W2", value: 1180 },
          { label: "W3", value: 1480 },
          { label: "W4", value: 1620 },
          { label: "W5", value: 1810 },
          { label: "W6", value: 1930 },
          { label: "W7", value: 2070 },
          { label: "W8", value: 2180 },
        ]},
        { kind: "hbar",  title: "Most-Viewed Product Lines.", data: [
          { label: "65\" OLED Pro",  value: 3200 },
          { label: "75\" QLED 4K",   value: 2640 },
          { label: "55\" Mini-LED",  value: 2010 },
          { label: "85\" Reference", value: 1340 },
          { label: "43\" Smart HD",  value:  920 },
        ]},
      ],
      insights: [
        "English remained the dominant scan language at 74%, but Spanish and French combined for 26% of sessions — validating the multilingual investment.",
        "Best Buy and Costco produced 41% of total engagement, suggesting fixture quality (not just footfall) is the strongest predictor of scan rate.",
        "Weekly scans grew 2.4× from launch to week 8 as fixture awareness compounded — no additional media spend in that window.",
      ],
    },
  },

  {
    id: "product-packaging",
    type: "experience",
    title: "Product Packaging Case Study.",
    client: "Organic Food Extracts",
    industry: "Industry: Organic Food Extracts",
    locations: "Locations: Major Retailers & Online Marketplaces Around The World",
    summary: "On-pack QRs turned every bottle into a proof-of-purity moment — surfacing certification, traceability and testing protocols at the moment of decision.",
    problem: "The supplement space is crowded and not always honest. Even though the company used Purity-IQ to certify quality and authenticity, packaging couldn't explain the rigorous testing or what the certification meant. Consumers were left guessing.",
    solution: "Each product was paired with a TapScan code — a scannable, on-pack experience that delivered proof. Customers could instantly access ingredient traceability, testing protocols, and the value behind the Purity-IQ mark. The brand gained visibility into what shoppers were engaging with and when.",
    outcome: "Trust became tangible. Consumers had verified information at their fingertips. The brand turned every package into a direct channel for transparency — backed by real-time data and measurable credibility.",
    metrics: [
      { v: "182K", l: "On-pack scans" },
      { v: "+41%", l: "Time-on-page vs. web" },
      { v: "27", l: "Markets active" },
    ],
    dashboard: {
      charts: [
        { kind: "hbar",  title: "Consumer Engagement By Region.", data: [
          { label: "North America", value: 78400 },
          { label: "Europe",        value: 51200 },
          { label: "Asia-Pacific",  value: 28900 },
          { label: "LATAM",         value: 14700 },
          { label: "Middle East",   value:  9100 },
        ]},
        { kind: "donut", title: "What Shoppers Tapped On.", data: [
          { label: "Ingredient traceability", value: 8420 },
          { label: "Purity-IQ certification", value: 6210 },
          { label: "Lab test results",        value: 4180 },
          { label: "Reorder / shop",          value: 3240 },
        ]},
        { kind: "map",   title: "Number of Engagements By Location.", region: "Global", data: [
          { label: "New York",   x: 0.26, y: 0.36, value: 18400 },
          { label: "Los Angeles",x: 0.14, y: 0.52, value: 12300 },
          { label: "London",     x: 0.44, y: 0.32, value: 14800 },
          { label: "Berlin",     x: 0.56, y: 0.42, value:  9800 },
          { label: "Tokyo",      x: 0.86, y: 0.44, value: 11600 },
          { label: "Sydney",     x: 0.88, y: 0.82, value:  6300 },
          { label: "São Paulo",  x: 0.34, y: 0.78, value:  7400 },
          { label: "Mumbai",     x: 0.68, y: 0.58, value:  8900 },
        ]},
        { kind: "line",  title: "Scans Over The Launch Quarter.", data: [
          { label: "Wk 1", value:  4200 },
          { label: "Wk 2", value:  6800 },
          { label: "Wk 3", value:  9400 },
          { label: "Wk 4", value: 12100 },
          { label: "Wk 5", value: 15300 },
          { label: "Wk 6", value: 18700 },
          { label: "Wk 7", value: 21800 },
          { label: "Wk 8", value: 24600 },
          { label: "Wk 9", value: 27900 },
          { label: "Wk 10",value: 30400 },
          { label: "Wk 11",value: 33100 },
          { label: "Wk 12",value: 36000 },
        ]},
      ],
      insights: [
        "Ingredient traceability outpaced the Purity-IQ explainer by 35% — shoppers want the underlying detail, not just the certification badge.",
        "North America and Europe combined for 71% of scans, but Asia-Pacific is the fastest-growing region by week-over-week scan velocity.",
        "Reorder taps were 18% of total interactions — converting transparency moments directly into commerce intent without leaving the pack experience.",
      ],
    },
  },

  {
    id: "events-tradeshows",
    type: "experience",
    title: "Events & Tradeshows Case Study.",
    client: "Health & Beauty",
    industry: "Industry: Health & Beauty",
    locations: "Locations: Targeted Brand Events Across Canada",
    summary: "A multilingual launch tour turned one million event impressions into measurable, attributable engagement — by event, by location, by language.",
    problem: "The brand was launching a new product across targeted events in Canada but lacked a scalable way to capture leads, gauge brand engagement, or track event success. Staff couldn't collect sign-ups quickly, the multilingual environment added friction, and there was no clear visibility into performance. To convert over a million impressions into measurable ROI, the brand needed visibility by event, location, and language — while building long-term customer value.",
    solution: "TapScan delivered a frictionless, high-conversion experience across the booth and supporting event materials through a branded, event-specific QR. Attendees could sign up instantly in their language, redeem a giveaway, and seamlessly enter the brand's digital ecosystem. TapScan also instrumented multiple touchpoints — booth displays, printed collateral, and roaming signage — to measure which assets generated the strongest engagement (B2B & B2C channels).",
    outcome: "The activation transformed high-traffic events into measurable brand engagement, providing clear visibility into leads captured, sign-up performance, and attendee behavior by event, location, and language. TapScan delivered the scalable data framework the brand lacked — showing which touchpoints drove the strongest conversion, where engagement peaked, and how effectively the new product launch resonated across Canada. This allowed the brand to quantify ROI for each event, validate investment decisions, and build a repeatable model for driving long-term customer value across future campaigns.",
    metrics: [
      { v: "1.04M", l: "Event impressions" },
      { v: "62.4K", l: "Qualified sign-ups" },
      { v: "6.0%", l: "Impression-to-lead" },
    ],
    dashboard: {
      charts: [
        { kind: "vbar",  title: "Attendee Engagement by Asset.", data: [
          { label: "Booth wall",     value: 18400 },
          { label: "Sample card",    value: 14600 },
          { label: "Roaming signage",value:  9800 },
          { label: "Print collateral",value: 6200 },
          { label: "Step & repeat",  value:  4100 },
        ]},
        { kind: "donut", title: "Sign-Ups by Language.", data: [
          { label: "English",  value: 41800 },
          { label: "French",   value: 17400 },
          { label: "Other",    value:  3200 },
        ]},
        { kind: "map",   title: "Sign-Ups by Event City.", region: "Canada", data: [
          { label: "Toronto",   x: 0.62, y: 0.78, value: 18200 },
          { label: "Montréal",  x: 0.72, y: 0.74, value: 14800 },
          { label: "Vancouver", x: 0.16, y: 0.62, value: 11400 },
          { label: "Calgary",   x: 0.34, y: 0.68, value:  8100 },
          { label: "Ottawa",    x: 0.68, y: 0.76, value:  6300 },
          { label: "Halifax",   x: 0.88, y: 0.66, value:  3600 },
        ]},
        { kind: "line",  title: "Sign-Ups Over The Tour.", data: [
          { label: "Stop 1", value: 3800 },
          { label: "Stop 2", value: 5400 },
          { label: "Stop 3", value: 6900 },
          { label: "Stop 4", value: 8600 },
          { label: "Stop 5", value: 10200 },
          { label: "Stop 6", value: 11400 },
          { label: "Stop 7", value: 9700 },
          { label: "Stop 8", value: 6400 },
        ]},
      ],
      insights: [
        "Booth wall and sample card together accounted for 60% of engagement — the highest-friction-to-print formats were also the highest-converting.",
        "French-language sign-ups represented 28% of leads, concentrated almost entirely in Montréal — confirming the multilingual creative paid for itself.",
        "Tour velocity peaked at stop 6, then declined as crowd fatigue compounded; future tours should be sized to 5–6 anchor stops, not 8.",
      ],
    },
  },

  // ──────────────────────── ACCOUNTABILITY (4) ──────────────────────
  {
    id: "real-estate-marketing",
    type: "experience",
    title: "Real Estate Marketing Case Study.",
    client: "Residential Real Estate",
    industry: "Industry: Residential Real Estate",
    locations: "Locations: Marketing Material & Property Listings",
    summary: "Yard signs, postcards and pop-bys became a measurable acquisition channel — each campaign and listing tracked end-to-end, with verified leads.",
    problem: "Realtors invest heavily in physical marketing including yard signs, flyers, postcards, and pop-by gifts, yet struggle to understand what actually drives buyer interest. Traditional methods provide little visibility into which campaigns perform best, which listings attract serious attention, or when and where prospects are engaging. Capturing high-quality leads at the moment of peak intent is difficult, and separating real opportunities from low-value inquiries adds friction to the sales process.",
    solution: "Realtors using TapScan have transformed their marketing by deploying scannable QR experiences across all their physical assets. Each campaign and listing was assigned a unique TapScan code, allowing realtors to compare performance across their marketing campaigns and across individual listings. When prospects scanned, they were taken to a personal hub that consolidated the realtor's full digital presence — including listings, contact options, and brand information — into a single, frictionless experience. TapScan's secure data platform validated where engagement occurred and verified email and phone details during form submission, ensuring only legitimate, high-intent leads entered the pipeline.",
    outcome: "The activation converted traditional real estate marketing into a measurable, data-driven growth channel. Realtors gained clear visibility into which campaigns resonated, which properties generated the strongest interest, and where buyer engagement was highest. Lead quality improved significantly through built-in verification, personal branding was strengthened through a unified digital presence, and future marketing decisions became smarter, faster, and more profitable.",
    metrics: [
      { v: "+3.4×", l: "Verified-lead lift" },
      { v: "92%", l: "Lead-quality score" },
      { v: "18 days", l: "Avg listing-to-offer" },
    ],
    dashboard: {
      charts: [
        { kind: "hbar",  title: "Engagement by Property.", data: [
          { label: "412 Maple St",       value: 1240 },
          { label: "88 Willow Ridge",    value:  980 },
          { label: "27 Lakeside Dr",     value:  820 },
          { label: "1610 Highland Ct",   value:  640 },
          { label: "9 Birch Hollow Ln",  value:  420 },
          { label: "305 Crescent Ave",   value:  280 },
        ]},
        { kind: "vbar",  title: "Engagement by Promotional Campaign.", data: [
          { label: "Yard sign",   value: 1820 },
          { label: "Open house",  value: 1440 },
          { label: "Postcard",    value:  920 },
          { label: "Pop-by gift", value:  680 },
          { label: "Flyer",       value:  420 },
        ]},
        { kind: "donut", title: "Engagement by Weblink.", data: [
          { label: "Listing detail", value: 3400 },
          { label: "Contact me",     value: 1820 },
          { label: "Book a viewing", value: 1240 },
          { label: "About the agent",value:  640 },
        ]},
        { kind: "map",   title: "Number of Engagements By Location.", region: "US", data: [
          { label: "Seattle",   x: 0.16, y: 0.22, value: 380 },
          { label: "Denver",    x: 0.40, y: 0.46, value: 240 },
          { label: "Austin",    x: 0.46, y: 0.74, value: 320 },
          { label: "Chicago",   x: 0.62, y: 0.32, value: 460 },
          { label: "Miami",     x: 0.80, y: 0.84, value: 280 },
          { label: "Boston",    x: 0.86, y: 0.26, value: 520 },
          { label: "Charlotte", x: 0.74, y: 0.54, value: 360 },
        ]},
      ],
      insights: [
        "Yard signs and open houses produced 64% of engagement — confirming that high-visibility, location-specific touchpoints still drive the most qualified scans.",
        "\"Book a viewing\" taps converted to in-person showings at 41% — the strongest lead-quality signal in the funnel and the basis of the +3.4× verified-lead lift.",
        "Boston and Chicago led location engagement; the realtor team has since reweighted print spend toward those metros for the next campaign cycle.",
      ],
    },
  },

  // ──────────────────────── ACCOUNTABILITY (4) ──────────────────────
  {
    id: "beer-wine-spirits",
    type: "accountability",
    title: "Beer, Wine & Spirits Case Study.",
    client: "Beer, Wine & Spirits",
    industry: "Assets: Disposable Merchandising Displays",
    locations: "Locations: Major and Independent Retailers Around United States",
    summary: "Disposable seasonal displays moved from \"hope it's up\" to verified, time-stamped, photo-confirmed execution — across major chains and independents.",
    problem: "This beverage brand was rolling out a seasonal merchandising campaign across major and independent retailers but had no reliable way to verify that displays were being executed correctly or consistently. Field teams set up creative, disposable displays, yet the brand lacked real-time visibility into participation, compliance, or quality across locations. Without accurate activation tracking, the team couldn't measure campaign success or run a performance-based incentive program with confidence.",
    solution: "TapScan delivered a mobile experience accessed through custom communication touchpoints, enabling distributors to quickly confirm asset setup, upload photo proof, and share notes directly from the aisle. The solution provided clear visibility into activation success across major chains and independent retailers, while supporting cross-brand reporting within the portfolio. Every submission was verified, time-stamped, and accurately tied to the correct brand, location, and campaign — creating a unified, reliable view of seasonal execution.",
    outcome: "The program delivered real-time visibility into how quickly seasonal displays were executed across major chains and independent retailers, revealing participation levels, display quality, and case activation. Cross-brand reporting enabled teams to share insights for joint investment initiatives, identify top-performing assets, and understand which field teams drove the highest engagement. This clarity validated the ROI of the seasonal campaign, strengthened field accountability, and provided actionable intelligence to refine activation structures and optimize future multi-brand deployments — ultimately contributing to increased sales.",
    metrics: [
      { v: "94%", l: "Displays verified at launch" },
      { v: "3,180", l: "Locations covered" },
      { v: "8 days", l: "Avg full-rollout time" },
    ],
    dashboard: {
      charts: [
        { kind: "vbar",  title: "Activations by Brand.", data: [
          { label: "Brand A", value: 4400 },
          { label: "Brand B", value: 3600 },
          { label: "Brand C", value: 2900 },
          { label: "Brand D", value: 2100 },
          { label: "Brand E", value: 1500 },
        ]},
        { kind: "donut", title: "Activations by Asset Type.", data: [
          { label: "Floor display", value: 5800 },
          { label: "Endcap",        value: 4200 },
          { label: "Case stacker",  value: 2900 },
          { label: "Shelf-talker",  value: 1600 },
        ]},
        { kind: "map",   title: "Activations By Region.", region: "US", data: [
          { label: "Northeast", x: 0.82, y: 0.30, value: 920 },
          { label: "Midwest",   x: 0.56, y: 0.36, value: 780 },
          { label: "Southeast", x: 0.74, y: 0.62, value: 640 },
          { label: "Southwest", x: 0.38, y: 0.62, value: 540 },
          { label: "West",      x: 0.16, y: 0.42, value: 720 },
        ]},
        { kind: "line",  title: "Verified Displays Per Week.", data: [
          { label: "W1", value:  240 },
          { label: "W2", value:  680 },
          { label: "W3", value: 1180 },
          { label: "W4", value: 1740 },
          { label: "W5", value: 2280 },
          { label: "W6", value: 2680 },
          { label: "W7", value: 2940 },
          { label: "W8", value: 3120 },
        ]},
      ],
      insights: [
        "Floor displays and endcaps drove 67% of verified activations — confirming that the highest-effort assets also produced the cleanest execution records.",
        "94% of displays were verified within the first 8 days of rollout, well ahead of the 14-day campaign window the team had previously assumed.",
        "Top three brands in the portfolio together hit 65% of activations, giving brand managers the comparative data needed to justify joint-investment initiatives going forward.",
      ],
    },
  },

  {
    id: "sports-athletics",
    type: "accountability",
    title: "Sports & Athletics Case Study.",
    client: "Sports & Athletics",
    industry: "Assets: Window Clings",
    locations: "Locations: Athletic Retailers Around United States",
    summary: "Tournament-tied window clings moved from anecdotal install reports to a live, photo-verified rollout dashboard tied to regional sporting moments.",
    problem: "For a national, athletic brand, regional campaigns are executed across multiple retail environments — all with different quantity and sizing requirements for the POS materials. If there are issues with the right materials or size, there are phone calls, emails, and other communications made across multiple channels to report and resolve issues. There were also no formal processes in place to capture that execution was completed on time. With campaigns tied to regional or global sporting events, having the right POS material in the right place at the right time is critical.",
    solution: "TapScan created a custom program on the platform that tracked installation, in real time, allowing install teams to verify correct size and placement, confirm execution via photo upload, and report any concerns live. The solution was embedded directly into the installation workflow to bring structure and visibility to the rollout. Each store package had the campaign TapScan code that installers scanned on arrival. The scan automatically called up the location specifics, POS assets that were required, placement, and a brief survey to capture any feedback or concerns.",
    outcome: "All execution information was fed, live, into the campaign dashboard — capturing feedback, including photo confirmation of execution, and, more importantly, flagging any specific asset concerns reported. It provided one centralized view of every retail installation and consolidated the execution process, reducing emails, photos, and manual updates from the field — and, most importantly, enabling quicker response to any POS placement or fit concerns. The solution provided a scalable framework that tracks asset deployment specifics and, with tie-in to sales by location, enables the ability to capture specific store-level performance — maximizing trade marketing ROI.",
    metrics: [
      { v: "100%", l: "Installs photo-verified" },
      { v: "11 hrs", l: "Avg issue resolution" },
      { v: "1,420", l: "Stores in program" },
    ],
    dashboard: {
      charts: [
        { kind: "vbar",  title: "Installs by Retailer.", data: [
          { label: "Dick's",      value: 480 },
          { label: "Foot Locker", value: 360 },
          { label: "Hibbett",     value: 230 },
          { label: "Academy",     value: 200 },
          { label: "Champs",      value: 150 },
        ]},
        { kind: "donut", title: "Installer Reports by Type.", data: [
          { label: "On-spec",      value: 1280 },
          { label: "Size mismatch",value:   84 },
          { label: "Damaged",      value:   38 },
          { label: "Missing asset",value:   20 },
        ]},
        { kind: "map",   title: "Installs By Region.", region: "US", data: [
          { label: "West",      x: 0.16, y: 0.42, value: 320 },
          { label: "Mountain",  x: 0.34, y: 0.40, value: 180 },
          { label: "Midwest",   x: 0.56, y: 0.36, value: 280 },
          { label: "South",     x: 0.62, y: 0.66, value: 240 },
          { label: "Northeast", x: 0.82, y: 0.30, value: 400 },
        ]},
        { kind: "line",  title: "Installs Confirmed Per Day.", data: [
          { label: "D1", value:  40 },
          { label: "D2", value: 110 },
          { label: "D3", value: 180 },
          { label: "D4", value: 240 },
          { label: "D5", value: 200 },
          { label: "D6", value: 160 },
          { label: "D7", value: 130 },
          { label: "D8", value:  90 },
          { label: "D9", value:  60 },
          { label: "D10",value:  40 },
        ]},
      ],
      insights: [
        "94% of installer reports came back \"on-spec\" — the 6% off-spec rate is the new floor for what \"good\" looks like, with sized + photographed evidence.",
        "Northeast and West led install volume, but the South had the fastest week-1 completion velocity once kits arrived on-site.",
        "Days 3–5 are the rollout peak; future kits should land in stores no later than D2 to take advantage of installer availability.",
      ],
    },
  },

  {
    id: "car-dealerships",
    type: "accountability",
    title: "Car Dealerships Case Study.",
    client: "Automotive",
    industry: "Assets: Standees, Brochures, Tent Cards & Window Stickers",
    locations: "Locations: Dealerships Around North America",
    summary: "Geo-verified install workflows replaced scattered emails and inconsistent photos — bringing every dealership into one execution dashboard.",
    problem: "Across dealership networks, brands deploy a wide range of printed and physical materials but often have limited visibility into how consistently those assets are implemented on-site. For a large brand activating across automotive showrooms, this created uncertainty around whether standees, brochures, tent cards, and window stickers were being displayed as intended in every location. The brand needed a practical way to verify installation standards without relying on scattered emails, inconsistent photos, or manual check-ins with dealers.",
    solution: "TapScan was integrated into the field install process to add structure and transparency to the rollout. Each dealership was provided with a QR code that installers scanned when they arrived on site. The scan opened a simple guided workflow that clarified placement expectations and collected geo-verified photo documentation in real time. This allowed the brand to monitor progress through a centralized dashboard that brought all locations into one view.",
    outcome: "TapScan improved accountability and confidence throughout the campaign. The brand could clearly see where materials were properly installed and where adjustments were needed, enabling faster in-flight corrections. As a result, execution became more consistent across dealerships, and the brand gained greater assurance that its in-store investment was genuinely visible to shoppers.",
    metrics: [
      { v: "96%", l: "Dealers fully installed" },
      { v: "2,640", l: "Showrooms in program" },
      { v: "4.3 days", l: "Avg time to verify" },
    ],
    dashboard: {
      charts: [
        { kind: "hbar",  title: "Asset Execution by Area.", data: [
          { label: "Showroom floor", value: 2400 },
          { label: "Vehicle window", value: 1980 },
          { label: "Reception",      value: 1520 },
          { label: "F&I office",     value: 1140 },
          { label: "Service drive",  value:  860 },
        ]},
        { kind: "donut", title: "Asset Mix Deployed.", data: [
          { label: "Window stickers", value: 6800 },
          { label: "Tent cards",      value: 4200 },
          { label: "Brochures",       value: 3200 },
          { label: "Standees",        value: 1900 },
        ]},
        { kind: "map",   title: "Installs By Region.", region: "North America", data: [
          { label: "Pacific NW",    x: 0.14, y: 0.30, value: 280 },
          { label: "California",    x: 0.16, y: 0.52, value: 460 },
          { label: "Texas",         x: 0.42, y: 0.66, value: 380 },
          { label: "Great Lakes",   x: 0.62, y: 0.34, value: 420 },
          { label: "Northeast",     x: 0.82, y: 0.32, value: 540 },
          { label: "Southeast",     x: 0.74, y: 0.62, value: 360 },
          { label: "Ontario / QC",  x: 0.68, y: 0.20, value: 320 },
        ]},
        { kind: "vbar",  title: "Dealers Verified per Week.", data: [
          { label: "W1", value: 320 },
          { label: "W2", value: 580 },
          { label: "W3", value: 740 },
          { label: "W4", value: 540 },
          { label: "W5", value: 320 },
          { label: "W6", value: 140 },
        ]},
      ],
      insights: [
        "Window stickers and tent cards led volume, but standees had the most install variance — the strongest case for a guided placement workflow.",
        "96% of dealerships hit full-install status within 4.3 days on average; previous campaigns relying on email reporting averaged 18 days.",
        "Pacific NW and California completed install fastest; Ontario / QC had the highest mid-campaign correction rate, signalling a kit-localisation opportunity.",
      ],
    },
  },

  {
    id: "snacks-confectionery",
    type: "accountability",
    title: "Snacks & Confectionery Case Study.",
    client: "Snacks & Confectionery",
    industry: "Assets: Semi-Permanent Merchandising Displays",
    locations: "Locations: Major Supermarkets Around The United Kingdom",
    summary: "Step-by-step install guides + photo confirmation gave the brand live, location-level proof that every semi-permanent display went up correctly.",
    problem: "This confectionery brand had limited visibility into whether semi-permanent merchandising displays were being installed correctly across participating retailers. Each setup required specific placement and assembly steps, but with installations happening nationwide, there was no consistent way to confirm accuracy or track completion in real time.",
    solution: "TapScan supported the rollout with a simple mobile experience accessed through a branded QR placed on each display kit. Field teams could scan to view step-by-step assembly and placement instructions, ensuring consistency across every installation. The same interface allowed quick confirmation of setup and photo upload once installation was complete.",
    outcome: "The program gave the brand live visibility into display execution across all participating stores. Real-time confirmation and photo documentation verified that assets were installed as intended, while the data collected helped the brand identify trends and improve future campaign planning and in-store execution.",
    metrics: [
      { v: "98%", l: "Displays correctly installed" },
      { v: "1,860", l: "Supermarkets covered" },
      { v: "12 mins", l: "Avg assembly time" },
    ],
    dashboard: {
      charts: [
        { kind: "vbar",  title: "Display Activation By Retail Location.", data: [
          { label: "Tesco",       value: 480 },
          { label: "Sainsbury's", value: 420 },
          { label: "ASDA",        value: 360 },
          { label: "Morrisons",   value: 280 },
          { label: "Waitrose",    value: 180 },
          { label: "Co-op",       value: 140 },
        ]},
        { kind: "donut", title: "Install Status.", data: [
          { label: "Correctly installed", value: 1820 },
          { label: "Adjusted on-site",    value:   28 },
          { label: "Missing piece",       value:   10 },
          { label: "Open issue",          value:    4 },
        ]},
        { kind: "map",   title: "Displays By UK Region.", region: "UK", data: [
          { label: "London / SE",  x: 0.62, y: 0.74, value: 480 },
          { label: "Midlands",     x: 0.54, y: 0.54, value: 360 },
          { label: "North West",   x: 0.42, y: 0.38, value: 280 },
          { label: "Yorkshire",    x: 0.58, y: 0.36, value: 240 },
          { label: "Scotland",     x: 0.48, y: 0.16, value: 220 },
          { label: "South West",   x: 0.42, y: 0.78, value: 180 },
          { label: "Wales",        x: 0.34, y: 0.62, value: 100 },
        ]},
        { kind: "line",  title: "Cumulative Installs.", data: [
          { label: "W1", value:  140 },
          { label: "W2", value:  420 },
          { label: "W3", value:  780 },
          { label: "W4", value: 1140 },
          { label: "W5", value: 1480 },
          { label: "W6", value: 1720 },
          { label: "W7", value: 1820 },
          { label: "W8", value: 1860 },
        ]},
      ],
      insights: [
        "98% of displays were confirmed correctly installed on first attempt — a meaningful jump from previous semi-permanent campaigns that ran ~85%.",
        "Tesco, Sainsbury's and ASDA combined for 67% of installs, but Waitrose had the lowest correction rate per store — smaller, higher-attention estates outperform on quality.",
        "London / SE installs concentrated in W1–W3; Scotland and Wales finished by W6, suggesting kit-shipping cadence is the binding constraint on rollout speed.",
      ],
    },
  },
];

window.CASE_STUDIES = CASE_STUDIES;
