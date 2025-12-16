import { useEffect, useState } from "react";
import { SiteSchema } from "./types";
import { createEmptySchema } from "./defaults";

const STORAGE_KEY = "design-constraint-wizard";

export function useSchemaState() {
  const [schema, setSchema] = useState<SiteSchema>(createEmptySchema);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as SiteSchema;
        setSchema(parsed);
      } catch {
        setSchema(createEmptySchema());
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
  }, [schema, loaded]);

  return { schema, setSchema, loaded };
}

export const downloadSchema = (schema: SiteSchema) => {
  const blob = new Blob([JSON.stringify(schema, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${schema.name || "project"}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importSchema = (text: string, onSuccess: (schema: SiteSchema) => void) => {
  try {
    const parsed = JSON.parse(text) as SiteSchema;
    onSuccess(parsed);
  } catch (err) {
    console.error("Failed to import schema", err);
  }
};
