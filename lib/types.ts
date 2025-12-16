export type Density = "spacious" | "normal" | "compact";
export type Tone = "Professional" | "Friendly" | "Playful" | "Luxury" | "Minimal";
export type Goal = "get signups" | "sell product" | "book calls" | "inform" | "show work";
export type PageArchetype = "Landing" | "Multi-page marketing" | "Portfolio" | "Dashboard" | "Docs";
export type NavStyle = "top" | "sidebar" | "none";

export type ColorMode = "light" | "dark" | "auto";

export type LayoutSections = {
  hero: boolean;
  logos: boolean;
  features: boolean;
  testimonials: boolean;
  pricing: boolean;
  faq: boolean;
  cta: boolean;
};

export type ConstraintFlags = {
  noHeavyAnimations: boolean;
  noNeon: boolean;
  noDarkMode: boolean;
  noGradients: boolean;
  noStockPhotos: boolean;
};

export type TokenSet = {
  colors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
  };
  typography: {
    scale: Record<"xs" | "sm" | "base" | "md" | "lg" | "xl" | "2xl", number>;
    font: "Inter" | "DM Sans" | "Plus Jakarta Sans" | "System";
    headingStyle: "Rounded" | "Sharp" | "Elegant";
  };
  spacing: number[];
  radii: number[];
  shadows: Record<"subtle" | "medium" | "strong", string>;
  density: Density;
  colorMode: ColorMode;
  backgroundStyle: "flat" | "gradient" | "glass";
};

export type Feature = { title: string; description: string };
export type PricingTier = { name: string; price: string; features: string[]; cta: string };
export type FaqItem = { question: string; answer: string };

export type SiteSchema = {
  name: string;
  brief: string;
  goal: Goal;
  audience: string;
  vibe: number;
  tone: Tone;
  pageArchetype: PageArchetype;
  navStyle: NavStyle;
  sections: LayoutSections;
  tokens: TokenSet;
  constraints: ConstraintFlags;
  content: {
    heroHeadline: string;
    heroSubheadline: string;
    primaryCta: string;
    secondaryCta?: string;
    features: Feature[];
    logos: string[];
    testimonials: { quote: string; name: string; role: string }[];
    pricing: PricingTier[];
    faqs: FaqItem[];
  };
  suggestions: Suggestion[];
  generatedPrompt: string;
};

export type Suggestion = {
  severity: "Low" | "Medium" | "High";
  reason: string;
  fix: string;
};
