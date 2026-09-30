import { access } from "@/lib/api-access";
import { UTApi } from "uploadthing/server";

export async function POST(req: Request) {
  if (!(await access(req, "draft", true))) {
    return Response.json({ error: "Owner access required." }, { status: 403 });
  }

  try {
    if (Number(req.headers.get("content-length")) > 5500000) {
      return Response.json({ error: "Use an image under 5 MB." }, { status: 413 });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size > 5000000) {
      return Response.json({ error: "Choose a JPG, PNG, or WebP image under 5 MB." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const a = new Uint8Array(bytes);
    let valid = false;
    if (a[0] === 255 && a[1] === 216 && a[2] === 255) {
      valid = true;
    } else if (a[0] === 137 && a[1] === 80 && a[2] === 78 && a[3] === 71) {
      valid = true;
    } else if (String.fromCharCode(...a.slice(0, 4)) === "RIFF" && String.fromCharCode(...a.slice(8, 12)) === "WEBP") {
      valid = true;
    }

    if (!valid) {
      return Response.json({ error: "Choose a JPG, PNG, or WebP image." }, { status: 400 });
    }

    const token = process.env.UPLOADTHING_TOKEN;
    if (!token) {
      console.error("UPLOADTHING_TOKEN is not configured.");
      return Response.json({ error: "UploadThing storage token is not configured." }, { status: 500 });
    }

    const utapi = new UTApi({ token });
    const response = await utapi.uploadFiles(file);

    if (response.error || !response.data) {
      console.error("UploadThing upload failed:", response.error);
      return Response.json({ error: "Image upload failed. Please retry." }, { status: 503 });
    }

    const fileUrl = response.data.ufsUrl || response.data.url;
    return Response.json({ url: fileUrl });
  } catch (e) {
    console.error("Upload route error:", e);
    return Response.json({ error: "Image upload failed. Please retry." }, { status: 503 });
  }
}
