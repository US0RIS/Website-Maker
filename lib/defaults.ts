import { SiteSchema, LayoutSections, TokenSet, Tone, Goal, PageArchetype, NavStyle } from "./types";

const spacing = [4, 8, 12, 16, 24, 32];

export const defaultSections: LayoutSections = {
  hero: true,
  logos: true,
  features: true,
  testimonials: true,
  pricing: false,
  faq: true,
  cta: true
};

export const baseTokens: TokenSet = {
  colors: {
    primary: "#7c3aed",
    accent: "#22d3ee",
    background: "#0b1220",
    surface: "#0f172a",
    text: "#e2e8f0",
    muted: "#94a3b8",
    border: "#1f2937"
  },
  typography: {
    scale: { xs: 12, sm: 14, base: 16, md: 18, lg: 22, xl: 28, "2xl": 34 },
    font: "Inter",
    headingStyle: "Rounded"
  },
  spacing,
  radii: [8, 12, 16, 24],
  shadows: {
    subtle: "0 10px 30px rgba(0,0,0,0.18)",
    medium: "0 20px 55px rgba(0,0,0,0.28)",
    strong: "0 28px 70px rgba(0,0,0,0.38)"
  },
  density: "normal",
  colorMode: "dark",
  backgroundStyle: "gradient"
};

export const createEmptySchema = (): SiteSchema => ({
  name: "Design Constraint Wizard",
  brief: "A focused site that showcases the product and drives signups.",
  goal: "get signups",
  audience: "Product teams evaluating AI site generators",
  vibe: 60,
  tone: "Professional",
  pageArchetype: "Landing",
  navStyle: "top",
  sections: { ...defaultSections },
  tokens: JSON.parse(JSON.stringify(baseTokens)),
  constraints: {
    noHeavyAnimations: true,
    noNeon: false,
    noDarkMode: false,
    noGradients: false,
    noStockPhotos: true
  },
  content: {
    heroHeadline: "Design systems that make AI build better websites.",
    heroSubheadline: "Answer a handful of intent questions to lock a reusable design system, prompt, and preview.",
    primaryCta: "Generate system",
    secondaryCta: "Preview site",
    features: [
      { title: "Constraint-first", description: "Numeric tokens for type, spacing, contrast, layout, and motion." },
      { title: "Reusable prompt", description: "One authoritative prompt you can paste into any AI website builder." },
      { title: "Deterministic preview", description: "See the site generated locally before calling any model." }
    ],
    logos: ["Base44", "PromptForge", "Sierra", "Northwind", "Orbit"],
    testimonials: [
      { quote: "We stopped fighting inconsistent AI layouts.", name: "Avery Liu", role: "Head of Product" }
    ],
    pricing: [
      { name: "Starter", price: "$19", features: ["Single project", "Prompt export", "Local preview"], cta: "Start" },
      { name: "Pro", price: "$39", features: ["Unlimited projects", "Saved presets", "Team handoff"], cta: "Upgrade" }
    ],
    faqs: [
      { question: "Can I export the prompt?", answer: "Yes, copy it or download the JSON project at any time." },
      { question: "Does this call an AI?", answer: "No. It is deterministic and works offline." }
    ]
  },
  suggestions: [],
  generatedPrompt: ""
});

export const presets: Record<string, Partial<SiteSchema>> = {
  SaaS: {
    goal: "get signups",
    tone: "Professional",
    sections: { ...defaultSections, pricing: true },
    pageArchetype: "Landing",
    tokens: { ...baseTokens, colors: { ...baseTokens.colors, primary: "#6366f1", accent: "#22c55e" } }
  },
  Portfolio: {
    goal: "show work",
    tone: "Friendly",
    sections: { ...defaultSections, logos: false, pricing: false, testimonials: true },
    pageArchetype: "Portfolio",
    tokens: { ...baseTokens, colors: { ...baseTokens.colors, primary: "#f97316", accent: "#22d3ee" } }
  },
  Dashboard: {
    goal: "inform",
    tone: "Minimal",
    sections: { ...defaultSections, logos: false, testimonials: false, pricing: false, faq: false },
    pageArchetype: "Dashboard",
    navStyle: "sidebar",
    tokens: { ...baseTokens, density: "compact", backgroundStyle: "glass" }
  },
  Landing: {
    goal: "get signups",
    sections: { ...defaultSections, pricing: true },
    pageArchetype: "Landing"
  }
};

export const goals: Goal[] = ["get signups", "sell product", "book calls", "inform", "show work"];
export const tones: Tone[] = ["Professional", "Friendly", "Playful", "Luxury", "Minimal"];
export const archetypes: PageArchetype[] = ["Landing", "Multi-page marketing", "Portfolio", "Dashboard", "Docs"];
export const navStyles: { label: string; value: NavStyle }[] = [
  { label: "Top nav", value: "top" },
  { label: "Sidebar", value: "sidebar" },
  { label: "None", value: "none" }
];
