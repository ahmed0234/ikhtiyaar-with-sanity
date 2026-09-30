import { isBlogOwner, sameOrigin } from "@/lib/blog";
import { defaultTemplate } from "@/lib/blog-types";
import { getDb, schema } from "@/db";

export async function POST(req: Request) {
  if (!(await isBlogOwner()) || !sameOrigin(req)) {
    return Response.json({ error: "Owner access required." }, { status: 403 });
  }

  try {
    const raw = await req.text();
    if (raw.length > 6000) {
      return Response.json({ error: "Template text is too long." }, { status: 400 });
    }

    const p = JSON.parse(raw);
    const value = { ...defaultTemplate };
    for (const key of Object.keys(value) as (keyof typeof value)[]) {
      if (typeof p[key] !== "string" || !p[key].trim()) {
        return Response.json({ error: "Complete every template field." }, { status: 400 });
      }
      value[key] = p[key].trim().slice(0, key === "ctaText" ? 600 : 150);
    }

    const db = getDb();
    const jsonValue = JSON.stringify(value);

    await db
      .insert(schema.settings)
      .values({ id: "template", value: jsonValue })
      .onConflictDoUpdate({
        target: schema.settings.id,
        set: { value: jsonValue },
      });

    return Response.json({ template: value });
  } catch (e) {
    console.error("Template save error:", e);
    return Response.json({ error: "Template could not be saved. Please retry." }, { status: 503 });
  }
}
