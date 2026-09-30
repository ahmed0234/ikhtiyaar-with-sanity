import { isBlogOwner, sameOrigin } from "@/lib/blog";
import { hashKey } from "@/lib/api-access";
import { getDb, schema } from "@/db";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isBlogOwner())) {
    return Response.json({ error: "Owner access required." }, { status: 403 });
  }

  try {
    const db = getDb();
    const results = await db
      .select({
        id: schema.apiKeys.id,
        name: schema.apiKeys.name,
        scope: schema.apiKeys.scope,
        created_at: schema.apiKeys.createdAt,
        expires_at: schema.apiKeys.expiresAt,
        revoked_at: schema.apiKeys.revokedAt,
        last_used_at: schema.apiKeys.lastUsedAt,
      })
      .from(schema.apiKeys)
      .orderBy(desc(schema.apiKeys.createdAt));

    return Response.json({ keys: results }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Fetch API keys error:", error);
    return Response.json({ error: "Connections are temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(req: Request) {
  if (!(await isBlogOwner()) || !sameOrigin(req)) {
    return Response.json({ error: "Owner access required." }, { status: 403 });
  }

  try {
    const raw = await req.text();
    if (raw.length > 2000) {
      return Response.json({ error: "Request too large." }, { status: 413 });
    }

    const p = JSON.parse(raw);
    const db = getDb();

    if (p.revoke) {
      await db
        .update(schema.apiKeys)
        .set({ revokedAt: new Date().toISOString() })
        .where(eq(schema.apiKeys.id, String(p.revoke)));
      return Response.json({ ok: true });
    }

    if (typeof p.name !== "string" || !p.name.trim() || !["read", "draft", "publish"].includes(p.scope)) {
      return Response.json({ error: "Choose a name and access level." }, { status: 400 });
    }

    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const token = "ikh_" + [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
    const now = new Date();
    const expires = new Date(now.getTime() + 90 * 86400000);

    await db.insert(schema.apiKeys).values({
      id: crypto.randomUUID(),
      name: p.name.trim().slice(0, 80),
      hash: await hashKey(token),
      scope: p.scope,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    });

    return Response.json(
      { token, expires: expires.toISOString() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    console.error("API key creation error:", e);
    return Response.json({ error: "Connection could not be updated. Please retry." }, { status: 503 });
  }
}
