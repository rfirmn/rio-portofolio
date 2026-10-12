export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  label: string;
  description: string;
  isCover: boolean;
  format?: "portrait";
}

export interface ImpactStat {
  value: string;
  label: string;
}

export const PROJECT_CATEGORIES = {
  ai: "Applied AI",
  ios: "Swift / iOS",
  fullstack: "Flutter & Web",
} as const;

export interface ProjectItem {
  databaseId: string;
  id: string;
  number: string;
  name: string;
  tagline: string;
  role: string;
  category: keyof typeof PROJECT_CATEGORIES;
  featured: boolean;
  status: string;
  summary: string;
  problem: string;
  contributions: string[];
  engineeringDecision: string;
  impactSummary: string;
  impactStats: ImpactStat[];
  scope: string;
  highlights: string[];
  techStack: string[];
  images: ProjectImage[];
  link?: {
    liveUrl?: string;
    githubUrl?: string;
  } | null;
  updatedAt: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    databaseId: "rio-strata-pda",
    id: "strata-pda",
    number: "01",
    name: "Strata PDA",
    tagline: "Your documents. Your voice. Traceable answers.",
    role: "Full-Stack AI Engineer",
    category: "ai",
    featured: true,
    status: "Engineering prototype",
    summary:
      "A document assistant that turns personal archives into context-aware drafts. Local embeddings, source citations, and reusable writing personas connect AI generation to the documents and style that matter to each user.",
    problem:
      "Professional documents repeat familiar structures, but generic AI assistants lack the source context and writing conventions needed to produce useful, reviewable drafts.",
    contributions: [
      "Built a PDF and DOCX ingestion pipeline with heading-aware chunking, local BGE-M3 embeddings, and Qdrant semantic retrieval filtered by user and folder.",
      "Connected Gemini drafting and persona extraction to reusable writing skills, preserving a selected tone and document structure.",
      "Implemented FastAPI SSE streaming and a React workspace with citation popovers, document storage, live preview, and DOCX export.",
    ],
    engineeringDecision:
      "Keep indexing and vector storage local, then retrieve only the relevant chunks for generation. Local embedding reduces dependence on an external embedding API; Gemini still receives selected context during drafting.",
    impactSummary:
      "Brings document search, source review, and style-aware drafting into one workspace, with visible evidence that users can inspect before accepting an answer.",
    impactStats: [
      { value: "1,024", label: "Embedding dimensions" },
      { value: "PDF + DOCX", label: "Document ingestion" },
      { value: "SSE", label: "Draft streaming" },
    ],
    scope:
      "Screenshots show the prototype workspace. Embedding and vector storage run locally; text generation uses Gemini. Citations support source review and do not guarantee that every generated statement is correct.",
    highlights: [
      "Local RAG with BGE-M3 and Qdrant",
      "Reusable writing personas and source citations",
      "Streaming drafts with live preview and DOCX export",
    ],
    techStack: ["Python", "FastAPI", "Qdrant", "BGE-M3", "Gemini", "React", "TypeScript", "Zustand", "Docker"],
    images: [
      {
        id: "strata-dashboard",
        src: "/images/projects/strata-pda/02_dashboard_overview.webp",
        alt: "Strata PDA dashboard with document ingestion and writing skill shortcuts",
        label: "Document workspace",
        description: "A single starting point for document uploads, conversations, and reusable writing skills.",
        isCover: true,
      },
      {
        id: "strata-chat",
        src: "/images/projects/strata-pda/05_chat_workspace.webp",
        alt: "Strata PDA chat workspace with skill and document context selectors",
        label: "Context-aware chat",
        description: "Choose a writing skill and document context before starting a drafting conversation.",
        isCover: false,
      },
      {
        id: "strata-skills",
        src: "/images/projects/strata-pda/03_skill_gallery.webp",
        alt: "Strata PDA gallery of reusable writing personas",
        label: "Writing skill gallery",
        description: "Reusable personas define the language, tone, and structure of a document.",
        isCover: false,
      },
      {
        id: "strata-storage",
        src: "/images/projects/strata-pda/04_document_storage.webp",
        alt: "Strata PDA document storage and folder management interface",
        label: "Document vault",
        description: "Organize source files in folders that define the scope of semantic retrieval.",
        isCover: false,
      },
    ],
    link: { githubUrl: "https://github.com/rfirmn/strata-pda" },
    updatedAt: "2026-10-11T00:00:00.000Z",
  },
  {
    databaseId: "rio-streamly",
    id: "streamly",
    number: "02",
    name: "Streamly",
    tagline: "Turn a fast-moving live chat into a clear next move.",
    role: "Full-Stack & AI Engineer",
    category: "ai",
    featured: true,
    status: "MVP / interactive demo",
    summary:
      "An AI co-pilot for TikTok Live that turns chat activity into audience sentiment, emerging topics, and practical actions. Hierarchical summaries preserve the conversation's timeline across short pulses, developing trends, and session reviews.",
    problem:
      "Creators need to present, sell, and respond at the same time. Fast-moving comments can bury buying questions and technical complaints, while per-message AI inference adds unnecessary cost and latency.",
    contributions: [
      "Built a TikTok chat ingestion service and Redis queue, using atomic key renaming to isolate processing batches while new messages continue to arrive.",
      "Designed 5-minute summaries that feed 20-minute trends and 45-minute session reviews, instead of repeatedly sending the entire chat history to the model.",
      "Delivered a React dashboard for sentiment, topics, alerts, and insight history, with structured Gemini output and an instant simulation mode.",
    ],
    engineeringDecision:
      "Use chronological summary aggregation rather than vector search for temporal trends. Redis handles the queue and insight history; the dashboard polls for new results while AI analysis runs in timed batches.",
    impactSummary:
      "Translates an overwhelming stream of comments into a manageable sequence of audience signals and suggested actions that a creator can review during a broadcast.",
    impactStats: [
      { value: "5 / 20 / 45m", label: "Analysis windows" },
      { value: "Redis", label: "Queue + insight cache" },
      { value: "Demo", label: "No live stream required" },
    ],
    scope:
      "Screenshots use simulated audience data. Chat ingestion follows the live stream, but insights are generated in batches and displayed through polling. Platform connectivity depends on the TikTok connector.",
    highlights: [
      "Hierarchical summaries across 5, 20, and 45 minutes",
      "Atomic Redis batch isolation during chat ingestion",
      "Sentiment, emerging topics, and actionable AI insights",
    ],
    techStack: ["TypeScript", "Node.js", "Redis", "Gemini", "React", "Express", "TikTok Live Connector", "Vitest"],
    images: [
      {
        id: "streamly-dashboard",
        src: "/images/projects/streamly/02_dashboard_overview.webp",
        alt: "Streamly demo dashboard showing audience sentiment and suggested live stream actions",
        label: "Live audience pulse",
        description: "Simulated sentiment, message volume, and actionable insights in a compact creator dashboard.",
        isCover: true,
        format: "portrait",
      },
      {
        id: "streamly-trends",
        src: "/images/projects/streamly/03_analytics_trends.webp",
        alt: "Streamly sentiment trend chart and most discussed audience topics",
        label: "Sentiment and topics",
        description: "Review how audience sentiment changes over time and which topics drive discussion.",
        isCover: false,
        format: "portrait",
      },
      {
        id: "streamly-feed",
        src: "/images/projects/streamly/04_insights_feed.webp",
        alt: "Streamly chronological feed of AI insights across analysis windows",
        label: "Insight history",
        description: "A chronological feed distinguishes short pulses, developing trends, and session-level reviews.",
        isCover: false,
        format: "portrait",
      },
      {
        id: "streamly-demo",
        src: "/images/projects/streamly/01_login_preview.webp",
        alt: "Streamly onboarding with TikTok username entry and instant demo access",
        label: "Instant demo onboarding",
        description: "Explore the interface with a simulated session before connecting a live TikTok stream.",
        isCover: false,
        format: "portrait",
      },
    ],
    link: null,
    updatedAt: "2026-10-11T00:00:00.000Z",
  },
  {
    databaseId: "rio-market-intelligence",
    id: "market-intelligence",
    number: "03",
    name: "Market Intelligence",
    tagline: "From market anomaly to an evidence-backed research memo.",
    role: "AI & Backend Engineer",
    category: "ai",
    featured: true,
    status: "Hackathon research demo",
    summary:
      "Signalroom is an IDX research terminal that connects robust statistical screening, cited AI research, and deterministic scenario testing. Each research run stays tied to one market snapshot so its evidence and calculations can be revisited.",
    problem:
      "Equity research combines financial ratios, disclosures, news, and market flows. A useful AI workflow must keep those inputs traceable and prevent language-model output from becoming the authority for numerical calculations.",
    contributions: [
      "Built a Python screening engine with winsorization, median/MAD scoring, and small-sample suppression to handle outliers in subsector comparisons.",
      "Integrated Sectors API data and Gemini research with strict Pydantic contracts, source IDs, quote validation, and safe fallback behavior.",
      "Connected foreign-flow confirmation, deterministic stress scenarios, and immutable snapshot replay to the Signalroom terminal and World Observatory.",
    ],
    engineeringDecision:
      "Separate calculation from interpretation: a numerical engine finds candidates, an LLM synthesizes source evidence, and another numerical stage challenges the thesis. A shared snapshot keeps the stages reproducible.",
    impactSummary:
      "Makes the path from an unusual market signal to a research memo inspectable, with explicit evidence, scenario assumptions, and repeatable offline demonstrations.",
    impactStats: [
      { value: "357", label: "Documented automated tests" },
      { value: "3", label: "Stress scenarios" },
      { value: "Snapshot", label: "Reproducible research" },
    ],
    scope:
      "Built as a Sectors Hackathon research demo with snapshot replay. The 357-test result is recorded in project documentation. Research candidates and scenario outputs are analytical demonstrations, not validated trading returns.",
    highlights: [
      "Robust screening with median/MAD and outlier controls",
      "Cited Gemini research validated with Pydantic",
      "Deterministic stress tests and immutable snapshot replay",
    ],
    techStack: ["Python", "FastAPI", "Pydantic", "Gemini", "Sectors API", "pytest", "JavaScript", "HTML / CSS"],
    images: [
      {
        id: "market-dashboard",
        src: "/images/projects/market-intelligence/01_signalroom_dashboard.webp",
        alt: "Signalroom market research terminal with fundamental and price discrepancy controls",
        label: "Signalroom terminal",
        description: "Configure a research scan and compare fundamental performance with price behavior.",
        isCover: true,
      },
      {
        id: "market-scan",
        src: "/images/projects/market-intelligence/02_signalroom_market_scan.webp",
        alt: "Signalroom market scan and ranked research candidates",
        label: "Market discovery",
        description: "Rank research candidates using deterministic statistics bound to a single market snapshot.",
        isCover: false,
      },
      {
        id: "market-memo",
        src: "/images/projects/market-intelligence/04_interactive_investment_memo.webp",
        alt: "Signalroom research workflow for evidence and investment memo generation",
        label: "Evidence and research memo",
        description: "Follow a candidate through research, flow confirmation, and the memo workflow.",
        isCover: false,
      },
      {
        id: "market-stress",
        src: "/images/projects/market-intelligence/05_memo_stress_testing_scenarios.webp",
        alt: "Signalroom deterministic scenario testing interface",
        label: "Scenario stress testing",
        description: "Challenge a research thesis with explicit base, conservative, and stress assumptions.",
        isCover: false,
      },
      {
        id: "market-observatory",
        src: "/images/projects/market-intelligence/07_world_observatory_macro_simulator.webp",
        alt: "World Observatory macro simulator for sector behavior under factor shocks",
        label: "World Observatory",
        description: "Explore sector behavior and replay local factor shocks against the research snapshot.",
        isCover: false,
      },
    ],
    link: { githubUrl: "https://github.com/rfirmn/sectors-market-intelligence" },
    updatedAt: "2026-10-11T00:00:00.000Z",
  },
  {
    databaseId: "rio-rantang",
    id: "rantang",
    number: "04",
    name: "Rantang",
    tagline: "A calmer way to run a busy food business.",
    role: "Flutter & Full-Stack Engineer",
    category: "fullstack",
    featured: false,
    status: "Product MVP",
    summary:
      "A food commerce workspace with a Flutter seller app for Android and iOS, alongside a web storefront and dashboard. Account-free buyer checkout, pre-order capacity reservations, and a seller order pipeline connect customers to kitchen operations.",
    problem:
      "Orders scattered across social messages make payment checks, production capacity, and delivery updates difficult to coordinate, especially during pre-order batches.",
    contributions: [
      "Built a Next.js and Hono monorepo with PostgreSQL, Prisma, and Redis/BullMQ for storefronts, seller operations, and background jobs.",
      "Built a Flutter seller app for Android and iOS with Riverpod state management, GoRouter navigation, and Dio API integration for dashboard, orders, products, and store settings.",
      "Implemented pre-order rules and transactional capacity reservations that check kitchen availability during checkout.",
      "Designed buyer tracking links, payment-proof review, and a credit ledger with grants, usage, expiration, and reversal events.",
    ],
    engineeringDecision:
      "Keep checkout simple for buyers while enforcing order transitions and capacity on the server. Database transactions coordinate payment review, production status, and credit consumption.",
    impactSummary:
      "Connects a public storefront to seller operations on web, Android, and iOS, giving buyers a direct way to follow orders and sellers a consistent production workflow.",
    impactStats: [
      { value: "No account", label: "Buyer checkout" },
      { value: "Android + iOS", label: "Flutter seller app" },
    ],
    scope: "The gallery shows the web experience with seeded product data, including responsive buyer tracking. The Flutter Android/iOS seller app is a separate client; these captures do not show its native screens. Merchant adoption and sales uplift have not been measured.",
    highlights: ["Flutter seller app for Android and iOS", "Account-free web checkout and order tracking", "Transactional pre-order capacity and auditable credits"],
    techStack: ["Flutter", "Dart", "Riverpod", "GoRouter", "Dio", "Next.js", "TypeScript", "Hono", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker"],
    images: [
      {
        id: "rantang-dashboard",
        src: "/images/projects/rantang/04_seller_dashboard.webp",
        alt: "Rantang seller dashboard showing kitchen queue and store overview",
        label: "Seller operations",
        description: "A daily overview of incoming orders, production, and storefront sharing.",
        isCover: true,
      },
      {
        id: "rantang-orders",
        src: "/images/projects/rantang/05_orders_pipeline.webp",
        alt: "Rantang order pipeline with payment verification and production stages",
        label: "Order pipeline",
        description: "Review payment proof and move orders through production and delivery.",
        isCover: false,
      },
      {
        id: "rantang-storefront",
        src: "/images/projects/rantang/09_storefront_desktop.webp",
        alt: "Rantang public storefront with food products and pre-order details",
        label: "Buyer storefront",
        description: "Browse the menu and order without creating a buyer account.",
        isCover: false,
      },
      {
        id: "rantang-tracking",
        src: "/images/projects/rantang/11_order_tracking_mobile.webp",
        alt: "Rantang responsive web order tracking timeline in a mobile browser",
        label: "Mobile web order tracking",
        description: "A responsive web timeline follows an order from checkout to delivery.",
        isCover: false,
        format: "portrait",
      },
    ],
    link: null,
    updatedAt: "2026-10-11T00:00:00.000Z",
  },
  {
    databaseId: "rio-slate",
    id: "slate",
    number: "05",
    name: "Slate",
    tagline: "From creative brief to verified file delivery.",
    role: "iOS & Full-Stack Engineer",
    category: "ios",
    featured: false,
    status: "Engineering MVP",
    summary:
      "A native iOS workspace and private client portal for photographers. Projects, invoices, recoverable media uploads, and payment-aware delivery form one controlled workflow, with the backend governing access to original files.",
    problem:
      "Creative teams juggle invoices, large uploads, and file handoffs across separate tools. Delivery needs a reliable answer to whether a file is complete, paid for, and authorized for download.",
    contributions: [
      "Built a UIKit app with Swift concurrency, Core Data persistence, Keychain authentication, and file-backed background URLSession uploads.",
      "Designed resumable multipart transfers with storage reconciliation and server-side file-size and SHA-256 verification.",
      "Implemented authoritative payment and delivery transitions in a Hono/PostgreSQL API, plus a Next.js portal with request-checked, short-lived download URLs.",
    ],
    engineeringDecision:
      "Make the server authoritative for payment, file integrity, and release state. The iOS queue recovers transfer work; the portal receives safe previews until original-file access is authorized.",
    impactSummary:
      "Connects native upload reliability with backend transaction integrity, so file delivery follows explicit verification and release rules.",
    impactStats: [
      { value: "SHA-256", label: "File verification" },
      { value: "Signed URLs", label: "Controlled downloads" },
    ],
    scope: "An engineering MVP with seeded screenshots and a local payment simulator. The simulator does not move money. Merchant settlement and physical-device background lifecycle checks require separate verification.",
    highlights: ["Durable background uploads with multipart recovery", "Server-verified payment and delivery transitions", "Private originals with short-lived download access"],
    techStack: ["Swift", "UIKit", "Core Data", "TypeScript", "PostgreSQL", "S3", "Hono", "Next.js"],
    images: [
      {
        id: "slate-ios",
        src: "/images/projects/slate/ios-dashboard.webp",
        alt: "Slate native iOS creator dashboard for projects, invoices, and transfers",
        label: "Creator workspace",
        description: "A native iOS overview of client projects, invoices, and file transfers.",
        isCover: true,
        format: "portrait",
      },
      {
        id: "slate-delivery",
        src: "/images/projects/slate/client-portal-delivery-ready.webp",
        alt: "Slate client portal showing a released delivery and verified file download",
        label: "Verified delivery portal",
        description: "A seeded client portal showing released media and authorized per-file downloads.",
        isCover: false,
      },
      {
        id: "slate-checkout",
        src: "/images/projects/slate/client-portal-checkout.webp",
        alt: "Slate client invoice checkout with clearly labeled local payment simulator",
        label: "Payment-aware checkout",
        description: "Invoice checkout demonstrates the local simulator flow without a merchant transaction.",
        isCover: false,
      },
    ],
    link: { githubUrl: "https://github.com/rfirmn/slate" },
    updatedAt: "2026-10-11T00:00:00.000Z",
  },
  {
    databaseId: "rio-brandlens",
    id: "brandlens",
    number: "06",
    name: "BrandLens",
    tagline: "Printed campaigns, brought into another dimension.",
    role: "iOS & Product Engineer",
    category: "ios",
    featured: false,
    status: "Product concept / prototype",
    summary:
      "An iPhone augmented reality experience that turns campaign artwork into an interactive scene. Native campaign browsing and 3D product previews lead into image tracking, with local poster storage and defined physical scale.",
    problem:
      "Printed campaigns offer a limited interaction surface. Connecting artwork to an AR experience requires a clear discovery flow, stable image anchoring, and predictable camera-session behavior.",
    contributions: [
      "Built native UIKit campaign discovery and RealityKit product previews that lead into an ARKit image-tracking experience.",
      "Used poster width to calibrate scene scale, and tied camera-session ownership and interruption recovery to the screen lifecycle.",
      "Implemented an on-device poster library and three compiled-in scene choices, with a TypeScript/Hono campaign service and bundled offline content.",
    ],
    engineeringDecision:
      "Anchor a scene to known artwork and its measured width. Keep camera frames and poster images on device, and bundle campaign content so the demo remains useful offline.",
    impactSummary:
      "Demonstrates a complete native discovery-to-camera product flow, combining 3D interaction, physical calibration, and session lifecycle management.",
    impactStats: [
      { value: "3", label: "Built-in AR scenes" },
      { value: "On-device", label: "Poster library" },
    ],
    scope: "Product captures are from Simulator, not a live camera AR session. The LUMA camera preview was confirmed on iPhone; imported-poster recognition, alignment, and scene interaction still need hardware verification.",
    highlights: ["ARKit image tracking and RealityKit scenes", "Physical poster scale and camera lifecycle handling", "Local poster storage and bundled offline campaigns"],
    techStack: ["Swift", "UIKit", "ARKit", "RealityKit", "TypeScript", "Hono"],
    images: [
      {
        id: "brandlens-discovery",
        src: "/images/projects/brandlens/home-live.webp",
        alt: "BrandLens campaign discovery screen captured in iOS Simulator",
        label: "Campaign discovery",
        description: "Simulator capture of the native campaign discovery experience.",
        isCover: true,
        format: "portrait",
      },
      {
        id: "brandlens-detail",
        src: "/images/projects/brandlens/campaign-detail.webp",
        alt: "BrandLens campaign details with a 3D product preview in Simulator",
        label: "Campaign and product",
        description: "Explore campaign details and the 3D product before launching the camera.",
        isCover: false,
        format: "portrait",
      },
      {
        id: "brandlens-preview",
        src: "/images/projects/brandlens/product-preview.webp",
        alt: "BrandLens RealityKit product preview and AR launch controls in Simulator",
        label: "RealityKit product preview",
        description: "A Simulator 3D preview; physical image tracking requires a supported iPhone.",
        isCover: false,
        format: "portrait",
      },
    ],
    link: { githubUrl: "https://github.com/rfirmn/brandlens" },
    updatedAt: "2026-10-11T00:00:00.000Z",
  },
  {
    databaseId: "rio-personal-money-tracker",
    id: "personal-money-tracker",
    number: "07",
    name: "Personal Money Tracker",
    tagline: "Make everyday money tracking easy to keep up with.",
    role: "iOS Developer & Product Designer",
    category: "ios",
    featured: false,
    status: "iOS prototype",
    summary:
      "A focused iOS app for income, expenses, and transfers. Quick IDR entry, searchable transactions, a dedicated Grocery category, receipt OCR, and CSV export make everyday records easier to capture and review.",
    problem:
      "Daily tracking becomes difficult when entry is slow and categories are too broad. Grocery and household essentials need their own view, while imported receipt data needs review before it becomes a saved transaction.",
    contributions: [
      "Built a SwiftUI transaction workflow with an IDR keypad, monthly summaries, searchable history, editable details, and separate transfer handling.",
      "Used SwiftData for local persistence and Vision/VisionKit for receipt text extraction followed by a user review step.",
      "Added CSV export, a Share Extension with App Group draft handoff, and optional device authentication through LocalAuthentication.",
    ],
    engineeringDecision:
      "Keep records local and make extraction a draft, not an automatic financial entry. Users review the merchant, amount, date, and category before saving OCR results.",
    impactSummary:
      "Turns day-to-day transactions into a searchable local record, with clearer grocery spending and a quick path from entry to monthly review.",
    impactStats: [
      { value: "SwiftData", label: "Local transaction storage" },
      { value: "CSV", label: "Portable records" },
    ],
    scope: "Simulator build and the Home, history, Grocery detail, and Quick Add screens were verified in the documentation session using synthetic transactions. OCR and Share Extension were implemented but not interactively verified in that session.",
    highlights: ["Quick IDR entry and dedicated Grocery tracking", "Local SwiftData records with search and CSV export", "Receipt OCR with review before saving"],
    techStack: ["Swift", "SwiftUI", "SwiftData", "Vision", "VisionKit", "LocalAuthentication"],
    images: [
      {
        id: "money-home",
        src: "/images/projects/personal-money-tracker/home-screen.webp",
        alt: "Personal Money Tracker monthly overview with synthetic iOS Simulator transactions",
        label: "Monthly overview",
        description: "Income, expenses, balance, and recent transactions using synthetic demo records.",
        isCover: true,
        format: "portrait",
      },
      {
        id: "money-transactions",
        src: "/images/projects/personal-money-tracker/transactions-screen.webp",
        alt: "Personal Money Tracker searchable transaction history",
        label: "Transaction history",
        description: "Find earlier records with search and transaction filters.",
        isCover: false,
        format: "portrait",
      },
      {
        id: "money-quick-add",
        src: "/images/projects/personal-money-tracker/quick-add-grocery.webp",
        alt: "Personal Money Tracker Quick Add form with Grocery selected",
        label: "Quick Add",
        description: "An IDR keypad and category selection keep daily entry focused.",
        isCover: false,
        format: "portrait",
      },
      {
        id: "money-detail",
        src: "/images/projects/personal-money-tracker/grocery-detail.webp",
        alt: "Personal Money Tracker Grocery transaction detail",
        label: "Grocery detail",
        description: "Review and edit a grocery transaction separately from general shopping.",
        isCover: false,
        format: "portrait",
      },
    ],
    link: null,
    updatedAt: "2026-10-11T00:00:00.000Z",
  },
];
