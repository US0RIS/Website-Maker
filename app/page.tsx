"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { generatePrompt, generateSuggestions } from "@/lib/generator";
import { presets, goals, tones, archetypes, navStyles, createEmptySchema, baseTokens } from "@/lib/defaults";
import { downloadSchema, importSchema, useSchemaState } from "@/lib/storage";
import { SiteSchema } from "@/lib/types";
import WebsitePreview from "@/components/preview/WebsitePreview";

const steps = [
  { id: "basics", label: "Basics" },
  { id: "layout", label: "Layout pattern" },
  { id: "tokens", label: "Visual system" },
  { id: "content", label: "Content inputs" },
  { id: "constraints", label: "Constraints" },
  { id: "brief", label: "Final brief" }
];

export default function HomePage() {
  const { schema, setSchema, loaded } = useSchemaState();
  const [activeStep, setActiveStep] = useState("basics");
  const [tab, setTab] = useState("preview");
  const importRef = useRef<HTMLTextAreaElement>(null);

  const updateSchema = (partial: Partial<SiteSchema>) => setSchema((prev) => ({ ...prev, ...partial }));

  const handleGenerate = () => {
    const generatedPrompt = generatePrompt(schema);
    const suggestions = generateSuggestions(schema);
    setSchema((prev) => ({ ...prev, generatedPrompt, suggestions }));
    setTab("prompt");
  };

  const applyPreset = (name: string) => {
    const base = createEmptySchema();
    updateSchema({ ...base, ...presets[name], generatedPrompt: "", suggestions: [] });
  };

  const tokenJson = useMemo(() => JSON.stringify(schema.tokens, null, 2), [schema.tokens]);

  if (!loaded) return null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="rounded-md bg-white/5 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
              Design Constraint Wizard
            </span>
            <span>Prompt + deterministic preview</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight">Translate intent into a reusable design system.</h1>
          <p className="text-muted">
            Answer concise steps, lock the design tokens, get an authority prompt, and see a live preview generated
            locally.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => updateSchema(createEmptySchema())}>
            Reset project
          </Button>
          <Button onClick={handleGenerate}>Generate</Button>
        </div>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(presets).map((key) => (
          <Button key={key} variant="subtle" size="sm" onClick={() => applyPreset(key)}>
            Quick start: {key}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[420px,1fr]">
        <Card>
          <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
          <div className="mt-4 space-y-6">
            {activeStep === "basics" && <Basics schema={schema} update={updateSchema} />}
            {activeStep === "layout" && <Layout schema={schema} update={updateSchema} />}
            {activeStep === "tokens" && <Tokens schema={schema} update={updateSchema} tokenJson={tokenJson} />}
            {activeStep === "content" && <Content schema={schema} update={updateSchema} />}
            {activeStep === "constraints" && <Constraints schema={schema} update={updateSchema} />}
            {activeStep === "brief" && <Brief schema={schema} update={updateSchema} />}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={handleGenerate}>Generate prompt & preview</Button>
            <Button variant="ghost" onClick={() => downloadSchema(schema)}>
              Export JSON
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                if (importRef.current && importRef.current.value.trim()) {
                  importSchema(importRef.current.value, (val) => setSchema(val));
                }
              }}
            >
              Import from textarea
            </Button>
          </div>
          <Textarea
            ref={importRef}
            className="mt-3 h-24"
            placeholder="Paste project JSON here to import"
          />
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">Live preview & output</div>
              <div className="text-lg font-semibold">Updated instantly as you answer</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(schema.generatedPrompt)}>
              Copy prompt
            </Button>
          </div>

          <div className="mt-2">
            <Tabs
              tabs={[
                { id: "preview", label: "Website Preview" },
                { id: "prompt", label: "Prompt Output" },
                { id: "suggestions", label: "Suggestions" },
                { id: "tokens", label: "Tokens" }
              ]}
              value={tab}
              onChange={setTab}
            />
          </div>

          <div className="mt-4">
            {tab === "preview" && <WebsitePreview schema={schema} />}
            {tab === "prompt" && (
              <pre className="max-h-[560px] overflow-auto rounded-xl border border-border bg-black/40 p-4 text-sm text-ink">
                {schema.generatedPrompt || "Click Generate to build the authoritative prompt."}
              </pre>
            )}
            {tab === "tokens" && (
              <pre className="max-h-[560px] overflow-auto rounded-xl border border-border bg-black/40 p-4 text-sm text-ink">
                {tokenJson}
              </pre>
            )}
            {tab === "suggestions" && (
              <div className="space-y-3">
                {(schema.suggestions.length ? schema.suggestions : generateSuggestions(schema)).map((s, idx) => (
                  <div key={idx} className="rounded-lg border border-border/80 bg-white/5 p-3">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>{s.reason}</span>
                      <span
                        className="rounded-full border border-border/70 px-2 py-1 text-xs"
                        data-severity={s.severity}
                      >
                        {s.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{s.fix}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Button variant="subtle" size="sm" onClick={() => window.open("/preview", "_blank")}>
              Open preview in new tab
            </Button>
            <span>Progress: {steps.findIndex((s) => s.id === activeStep) + 1} / {steps.length}</span>
          </div>
        </Card>
      </div>
    </main>
  );
}

function Stepper({ activeStep, setActiveStep }: { activeStep: string; setActiveStep: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step, idx) => {
        const isActive = activeStep === step.id;
        return (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex-1 min-w-[120px] rounded-lg border px-3 py-2 text-left text-sm transition focus-ring ${
              isActive ? "border-accent text-ink bg-accent/10" : "border-border text-muted hover:text-ink"
            }`}
          >
            <div className="text-xs uppercase tracking-wide text-muted">Step {idx + 1}</div>
            <div className="font-semibold">{step.label}</div>
          </button>
        );
      })}
    </div>
  );
}

function Basics({ schema, update }: { schema: SiteSchema; update: (p: Partial<SiteSchema>) => void }) {
  return (
    <div className="space-y-3">
      <Input
        label="Website name"
        value={schema.name}
        onChange={(e) => update({ name: e.target.value })}
        placeholder="Constraint Crafter"
      />
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-semibold text-ink">Primary goal</span>
        <div className="grid grid-cols-2 gap-2">
          {goals.map((goal) => (
            <Toggle key={goal} label={goal} checked={schema.goal === goal} onChange={() => update({ goal })} />
          ))}
        </div>
      </label>
      <Input
        label="Target audience"
        value={schema.audience}
        onChange={(e) => update({ audience: e.target.value })}
        placeholder="Product teams, founders, marketers"
      />
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-semibold text-ink">Brand vibe (calm → bold)</span>
        <input
          type="range"
          min={0}
          max={100}
          value={schema.vibe}
          onChange={(e) => update({ vibe: Number(e.target.value) })}
          className="accent-accent"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-semibold text-ink">Tone</span>
        <div className="grid grid-cols-3 gap-2">
          {tones.map((tone) => (
            <Toggle key={tone} label={tone} checked={schema.tone === tone} onChange={() => update({ tone })} />
          ))}
        </div>
      </label>
    </div>
  );
}

function Layout({ schema, update }: { schema: SiteSchema; update: (p: Partial<SiteSchema>) => void }) {
  return (
    <div className="space-y-3">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-semibold text-ink">Page archetype</span>
        <div className="grid grid-cols-2 gap-2">
          {archetypes.map((a) => (
            <Toggle key={a} label={a} checked={schema.pageArchetype === a} onChange={() => update({ pageArchetype: a })} />
          ))}
        </div>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-semibold text-ink">Navigation style</span>
        <div className="grid grid-cols-3 gap-2">
          {navStyles.map((nav) => (
            <Toggle key={nav.value} label={nav.label} checked={schema.navStyle === nav.value} onChange={() => update({ navStyle: nav.value })} />
          ))}
        </div>
      </label>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(schema.sections).map(([key, value]) => (
          <Toggle
            key={key}
            label={key}
            checked={value}
            onChange={(checked) => update({ sections: { ...schema.sections, [key]: checked } })}
          />
        ))}
      </div>
    </div>
  );
}

function Tokens({
  schema,
  update,
  tokenJson
}: {
  schema: SiteSchema;
  update: (p: Partial<SiteSchema>) => void;
  tokenJson: string;
}) {
  const setTokens = (tokens: SiteSchema["tokens"]) => update({ tokens });
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Primary color"
          type="color"
          value={schema.tokens.colors.primary}
          onChange={(e) => setTokens({ ...schema.tokens, colors: { ...schema.tokens.colors, primary: e.target.value } })}
        />
        <Input
          label="Accent color"
          type="color"
          value={schema.tokens.colors.accent}
          onChange={(e) => setTokens({ ...schema.tokens, colors: { ...schema.tokens.colors, accent: e.target.value } })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Toggle
          label="Light mode"
          checked={schema.tokens.colorMode === "light"}
          onChange={() => setTokens({ ...schema.tokens, colorMode: "light" })}
        />
        <Toggle
          label="Dark mode"
          checked={schema.tokens.colorMode === "dark"}
          onChange={() => setTokens({ ...schema.tokens, colorMode: "dark" })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {["Inter", "DM Sans", "Plus Jakarta Sans", "System"].map((font) => (
          <Toggle
            key={font}
            label={font}
            checked={schema.tokens.typography.font === font}
            onChange={() => setTokens({ ...schema.tokens, typography: { ...schema.tokens.typography, font: font as any } })}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {schema.tokens.radii.map((r) => (
          <Toggle
            key={r}
            label={`Corner radius ${r}px`}
            checked={schema.tokens.radii[1] === r}
            onChange={() => setTokens({ ...schema.tokens, radii: [r, r, r, r] })}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(["subtle", "medium", "strong"] as const).map((strength) => (
          <Toggle
            key={strength}
            label={`Shadow ${strength}`}
            checked={schema.tokens.shadows[strength] === baseTokens.shadows[strength]}
            onChange={() =>
              setTokens({
                ...schema.tokens,
                shadows: { ...schema.tokens.shadows, [strength]: baseTokens.shadows[strength] }
              })
            }
          />
        ))}
        {(["spacious", "normal", "compact"] as const).map((density) => (
          <Toggle
            key={density}
            label={`Density ${density}`}
            checked={schema.tokens.density === density}
            onChange={() => setTokens({ ...schema.tokens, density })}
          />
        ))}
      </div>
      <Textarea
        label="Token JSON"
        value={tokenJson}
        readOnly
        className="h-40 font-mono text-xs"
      />
    </div>
  );
}

function Content({ schema, update }: { schema: SiteSchema; update: (p: Partial<SiteSchema>) => void }) {
  const content = schema.content;
  const updateContent = (partial: Partial<typeof content>) => update({ content: { ...content, ...partial } });

  return (
    <div className="space-y-3">
      <Input
        label="Hero headline"
        value={content.heroHeadline}
        onChange={(e) => updateContent({ heroHeadline: e.target.value })}
      />
      <Textarea
        label="Hero subheadline"
        value={content.heroSubheadline}
        onChange={(e) => updateContent({ heroSubheadline: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Primary CTA"
          value={content.primaryCta}
          onChange={(e) => updateContent({ primaryCta: e.target.value })}
        />
        <Input
          label="Secondary CTA"
          value={content.secondaryCta || ""}
          onChange={(e) => updateContent({ secondaryCta: e.target.value })}
        />
      </div>
      <div>
        <div className="mb-1 text-sm font-semibold text-ink">Features</div>
        <div className="space-y-2">
          {content.features.slice(0, 4).map((feature, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-2">
              <Input
                value={feature.title}
                onChange={(e) => {
                  const updated = [...content.features];
                  updated[idx] = { ...updated[idx], title: e.target.value };
                  updateContent({ features: updated });
                }}
              />
              <Input
                value={feature.description}
                onChange={(e) => {
                  const updated = [...content.features];
                  updated[idx] = { ...updated[idx], description: e.target.value };
                  updateContent({ features: updated });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Constraints({ schema, update }: { schema: SiteSchema; update: (p: Partial<SiteSchema>) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(schema.constraints).map(([key, value]) => (
        <Toggle
          key={key}
          label={key}
          checked={value}
          onChange={(checked) => update({ constraints: { ...schema.constraints, [key]: checked } })}
        />
      ))}
    </div>
  );
}

function Brief({ schema, update }: { schema: SiteSchema; update: (p: Partial<SiteSchema>) => void }) {
  return (
    <div className="space-y-3">
      <Textarea
        label="What should this website be?"
        value={schema.brief}
        onChange={(e) => update({ brief: e.target.value })}
        hint="This exact text will appear in the prompt's Project Brief section."
        className="h-24"
      />
    </div>
  );
}
