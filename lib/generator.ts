import { SiteSchema, Suggestion } from "./types";

const sectionOrder = (schema: SiteSchema) => {
  const order: string[] = [];
  const { sections } = schema;
  if (sections.hero) order.push("Hero with CTA and social proof");
  if (sections.logos) order.push("Logo strip for trust");
  if (sections.features) order.push("Feature grid (3-6 cards)");
  if (sections.testimonials) order.push("Testimonial row");
  if (sections.pricing) order.push("Pricing table (3 tiers)");
  if (sections.faq) order.push("FAQ accordion");
  if (sections.cta) order.push("Final CTA banner");
  return order;
};

export function generatePrompt(schema: SiteSchema): string {
  const mustNot = Object.entries(schema.constraints)
    .filter(([, v]) => v)
    .map(([k]) => k.replace(/([A-Z])/g, " $1").toLowerCase())
    .join(", ");

  const prompt = [
    "You are an expert product designer and frontend engineer.",
    "",
    "A) Project Brief",
    `- Concept: ${schema.brief}`,
    `- Goal: ${schema.goal}`,
    `- Audience: ${schema.audience}`,
    `- Vibe scale (0 calm → 100 bold): ${schema.vibe}`,
    `- Tone: ${schema.tone}`,
    "",
    "B) Non-negotiable constraints",
    "- Accessibility: WCAG AA contrast, keyboard focus, skip links.",
    "- Responsiveness: mobile-first with fluid spacing.",
    "- Performance: target 90+ Lighthouse; avoid heavy assets.",
    `- Must not: ${mustNot || "respect default guardrails"}.`,
    "",
    "C) Design System",
    `- Colors: ${JSON.stringify(schema.tokens.colors, null, 0)}`,
    `- Typography: font ${schema.tokens.typography.font}; heading style ${schema.tokens.typography.headingStyle}; scale ${JSON.stringify(schema.tokens.typography.scale)}`,
    `- Spacing scale: ${schema.tokens.spacing.join(", ")}`,
    `- Radius set: ${schema.tokens.radii.join(", ")}`,
    `- Shadows: ${JSON.stringify(schema.tokens.shadows)}`,
    "- Examples: Button uses primary bg, text on surface, radius[1], shadow subtle; Card uses surface bg, border, radius[2], shadow medium; Input uses surface bg, border, focus ring accent.",
    "",
    "D) Layout & Component Spec",
    `- Archetype: ${schema.pageArchetype}`,
    `- Navigation: ${schema.navStyle}`,
    `- Sections: ${sectionOrder(schema).join(" → ")}`,
    "- Grid: max width 1200px, 12-column with 24px gutters; stack to single column on mobile.",
    "- Breakpoints: sm 640, md 768, lg 1024, xl 1280.",
    "- Components: CTA buttons, cards, testimonial tile, pricing tiers with bullets, accordion FAQ.",
    "",
    "E) Copy & Content Rules",
    `- Tone: ${schema.tone}; sentences concise; avoid fluff; emphasize ${schema.goal}.`,
    `- CTA: primary uses “${schema.content.primaryCta}”; secondary “${schema.content.secondaryCta || "Optional"}”.`,
    "- Keep headlines under 12 words; body under 26 words.",
    "",
    "F) Page Plan",
    `- Order: ${sectionOrder(schema).join(" → ")}`,
    schema.pageArchetype === "Multi-page marketing"
      ? "- Add About, Pricing, and Contact pages that reuse the design system."
      : "- Single page with optional modal for contact.",
    "",
    "G) Implementation Requirements",
    "- Stack: Next.js App Router + TypeScript + TailwindCSS.",
    "- Components: Button, Card, Input, Badge, Tabs, Accordion; all reuse tokens.",
    "- File structure: app/(routes), components/ui for primitives, lib for generators.",
    "- No paid APIs; provide deterministic data placeholders.",
    "",
    "H) QA Checklist",
    "- Test responsive breakpoints, keyboard focus, skip-to-content link.",
    "- Verify contrast meets AA with provided palette.",
    "- Ensure empty states and loading states exist for data-driven blocks.",
    "",
    "I) Deliverable Instructions",
    "- Output full HTML/CSS/TSX code; no pseudo-code.",
    "- Include component tokens in a design-tokens file; no external UI kits."
  ];

  return prompt.join("\n");
}

export function generateSuggestions(schema: SiteSchema): Suggestion[] {
  const suggestions: Suggestion[] = [];
  if (schema.sections.testimonials === false || (schema.content.testimonials?.length ?? 0) === 0) {
    suggestions.push({
      severity: "High",
      reason: "Missing trust elements",
      fix: "Add at least one testimonial or a client logo strip to support credibility."
    });
  }
  if ((schema.content.primaryCta || "").length < 6) {
    suggestions.push({
      severity: "Medium",
      reason: "CTA is too short",
      fix: "Use a clearer CTA such as “Start free trial” or “Book a demo”."
    });
  }
  if (schema.sections.pricing && schema.content.pricing.length < 2) {
    suggestions.push({
      severity: "Medium",
      reason: "Pricing enabled but lacks comparison",
      fix: "Add at least two tiers to show differentiation."
    });
  }
  if (schema.tokens.colors.primary.toLowerCase() === schema.tokens.colors.background.toLowerCase()) {
    suggestions.push({
      severity: "High",
      reason: "Primary color too close to background",
      fix: "Pick a primary color with stronger contrast than the background to retain hierarchy."
    });
  }
  if (schema.goal === "get signups" && !schema.sections.cta) {
    suggestions.push({
      severity: "High",
      reason: "Signup goal without final CTA",
      fix: "Enable the closing CTA section to keep conversion focus."
    });
  }
  if (schema.content.heroHeadline.length > 90) {
    suggestions.push({
      severity: "Low",
      reason: "Headline is long",
      fix: "Shorten the hero headline to under 12 words for faster scanning."
    });
  }
  return suggestions;
}
