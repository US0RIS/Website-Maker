"use client";

import WebsitePreview from "@/components/preview/WebsitePreview";
import { generatePrompt, generateSuggestions } from "@/lib/generator";
import { createEmptySchema } from "@/lib/defaults";
import { useSchemaState } from "@/lib/storage";
import { useEffect } from "react";

export default function PreviewPage() {
  const { schema, setSchema, loaded } = useSchemaState();

  useEffect(() => {
    if (!schema.generatedPrompt) {
      setSchema((prev) => ({
        ...prev,
        generatedPrompt: generatePrompt(prev),
        suggestions: generateSuggestions(prev)
      }));
    }
  }, [schema, setSchema]);

  if (!loaded) return null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">Preview only</div>
          <h1 className="text-2xl font-bold">Live site preview</h1>
        </div>
        <button className="rounded-lg border border-border px-3 py-2 text-sm" onClick={() => setSchema(createEmptySchema())}>
          Reset
        </button>
      </header>
      <WebsitePreview schema={schema} />
    </main>
  );
}
