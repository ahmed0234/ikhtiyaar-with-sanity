import { getPosts, getTemplate, isBlogOwner } from "@/lib/blog";

export async function GET() {
  if (!(await isBlogOwner())) {
    return Response.json({ error: "Owner access required." }, { status: 403 });
  }

  try {
    const posts = await getPosts(true);
    const template = await getTemplate();

    return new Response(
      JSON.stringify({
        format: "ikhtiyaar-blog-v1",
        exportedAt: new Date().toISOString(),
        posts,
        template,
        media: [],
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": 'attachment; filename="ikhtiyaar-blog-backup.json"',
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (e) {
    console.error("Backup export error:", e);
    return Response.json({ error: "Backup could not be created. Please retry." }, { status: 503 });
  }
}
