import { SiteSchema } from "@/lib/types";
import clsx from "clsx";

type Props = { schema: SiteSchema };

export default function WebsitePreview({ schema }: Props) {
  const t = schema.tokens;
  const spacing = t.spacing[4] ?? 16;
  const fontFamilyMap: Record<typeof t.typography.font, string> = {
    "Inter": "'Inter', system-ui, sans-serif",
    "DM Sans": "'DM Sans', 'Inter', system-ui, sans-serif",
    "Plus Jakarta Sans": "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    "System": "system-ui, -apple-system, 'Segoe UI', sans-serif"
  };

  return (
    <div
      className="rounded-xl border border-border/80"
      style={{
        background:
          t.backgroundStyle === "gradient"
            ? `linear-gradient(145deg, ${t.colors.background}, ${t.colors.surface})`
            : t.backgroundStyle === "glass"
              ? `${t.colors.background}`
              : t.colors.background,
        color: t.colors.text,
        boxShadow: t.shadows.medium,
        fontFamily: fontFamilyMap[t.typography.font]
      }}
    >
      {schema.navStyle !== "none" && (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div className="flex items-center gap-2 font-semibold">
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: t.colors.accent, color: t.colors.background }}
            >
              {schema.name.slice(0, 1)}
            </span>
            {schema.name}
          </div>
          {schema.navStyle === "top" && (
            <div className="hidden gap-4 text-sm text-muted md:flex">
              <a className="hover:text-white" href="#">Features</a>
              <a className="hover:text-white" href="#">Pricing</a>
              <a className="hover:text-white" href="#">FAQ</a>
            </div>
          )}
          <button
            className="rounded-lg px-3 py-2 text-sm font-semibold"
            style={{ background: t.colors.primary, color: t.colors.background, boxShadow: t.shadows.subtle }}
          >
            {schema.content.primaryCta}
          </button>
        </nav>
      )}

      <div className="space-y-16 px-6 py-10 lg:px-10">
        {schema.sections.hero && (
          <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Project brief</p>
              <h2 className="text-3xl font-bold leading-tight lg:text-4xl" style={{ color: t.colors.text }}>
                {schema.content.heroHeadline}
              </h2>
              <p className="text-lg text-muted">{schema.content.heroSubheadline}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-lg px-4 py-3 text-sm font-semibold shadow-md focus-ring"
                  style={{ background: t.colors.primary, color: t.colors.background, boxShadow: t.shadows.medium }}
                >
                  {schema.content.primaryCta}
                </button>
                {schema.content.secondaryCta && (
                  <button
                    className="rounded-lg border px-4 py-3 text-sm font-semibold focus-ring"
                    style={{ borderColor: t.colors.border, color: t.colors.text }}
                  >
                    {schema.content.secondaryCta}
                  </button>
                )}
              </div>
            </div>
            <div
              className="rounded-2xl border border-border/60 p-6 shadow-lg"
              style={{
                background: t.backgroundStyle === "glass" ? "rgba(255,255,255,0.04)" : t.colors.surface
              }}
            >
              <div className="mb-2 text-sm font-semibold text-muted">Design system tokens</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Token swatch={t.colors.primary} label="Primary" />
                <Token swatch={t.colors.accent} label="Accent" />
                <Token swatch={t.colors.surface} label="Surface" />
                <Token swatch={t.colors.text} label="Text" />
              </div>
              <div className="mt-4 text-xs text-muted">
                Radius: {t.radii.join(", ")} • Shadows: {Object.keys(t.shadows).join(", ")} • Density: {t.density}
              </div>
            </div>
          </section>
        )}

        {schema.sections.logos && schema.content.logos.length > 0 && (
          <section className="space-y-3">
            <div className="text-sm font-semibold text-muted">Trusted by teams</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {schema.content.logos.map((logo) => (
                <div
                  key={logo}
                  className="rounded-lg border border-border/60 bg-white/5 px-3 py-2 text-center text-sm text-muted"
                >
                  {logo}
                </div>
              ))}
            </div>
          </section>
        )}

        {schema.sections.features && (
          <section className="space-y-6">
            <Header title="Features" subtitle="Constraints translated into usable UI patterns." />
            <div className={clsx("grid gap-4", "md:grid-cols-2")}>
              {schema.content.features.slice(0, 4).map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/60 p-4 shadow"
                  style={{ background: t.colors.surface, boxShadow: t.shadows.subtle }}
                >
                  <div
                    className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold"
                    style={{ background: t.colors.accent, color: t.colors.background }}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: t.colors.text }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {schema.sections.testimonials && schema.content.testimonials.length > 0 && (
          <section className="space-y-4">
            <Header title="Testimonials" subtitle="Proof that constraints improve results." />
            <div className="grid gap-4 md:grid-cols-2">
              {schema.content.testimonials.map((tst, idx) => (
                <div key={idx} className="rounded-xl border border-border/60 bg-white/5 p-4 shadow">
                  <p className="text-lg font-semibold text-ink">“{tst.quote}”</p>
                  <p className="text-sm text-muted">
                    {tst.name} — {tst.role}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {schema.sections.pricing && schema.content.pricing.length > 0 && (
          <section className="space-y-4">
            <Header title="Pricing" subtitle="Pick a plan and keep constraints reusable." />
            <div className="grid gap-4 md:grid-cols-3">
              {schema.content.pricing.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-xl border border-border/60 p-4"
                  style={{ background: t.colors.surface }}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold">{tier.name}</h3>
                    <span className="text-xl font-bold" style={{ color: t.colors.primary }}>
                      {tier.price}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {tier.features.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                  <button
                    className="mt-4 w-full rounded-lg px-3 py-2 text-sm font-semibold"
                    style={{ background: t.colors.primary, color: t.colors.background }}
                  >
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {schema.sections.faq && schema.content.faqs.length > 0 && (
          <section className="space-y-3">
            <Header title="FAQ" subtitle="Guardrails and delivery expectations." />
            <div className="space-y-2">
              {schema.content.faqs.map((faq, idx) => (
                <details key={idx} className="group rounded-lg border border-border/60 bg-white/5 p-3">
                  <summary className="cursor-pointer text-sm font-semibold text-ink">{faq.question}</summary>
                  <p className="pt-2 text-sm text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {schema.sections.cta && (
          <section
            className="flex flex-col gap-4 rounded-2xl border border-border/60 p-6 text-center shadow-lg md:flex-row md:items-center md:justify-between"
            style={{ background: t.colors.primary, color: t.colors.background, boxShadow: t.shadows.medium }}
          >
            <div className="text-left md:w-2/3">
              <h3 className="text-2xl font-bold">Ready to lock your design system?</h3>
              <p className="text-sm opacity-90">Generate the prompt and reuse it across AI website builders.</p>
            </div>
            <button className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black shadow">
              {schema.content.primaryCta}
            </button>
          </section>
        )}

        <footer className="flex flex-wrap items-center justify-between border-t border-border/60 pt-4 text-sm text-muted">
          <span>Design Constraint Wizard • deterministic preview</span>
          <div className="flex gap-3">
            <span>Accessibility: AA</span>
            <span>Performance: 90+ target</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Token({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-8 w-8 rounded-lg border border-border/60" style={{ background: swatch }} />
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted">{subtitle}</p>
    </div>
  );
}
