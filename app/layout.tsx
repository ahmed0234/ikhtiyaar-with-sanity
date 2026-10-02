import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import { SITE_URL } from "@/lib/seo";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import { SanityLivePreview } from "@/components/sanity-live-preview";

export const metadata: Metadata = {
  title: "Ikhtiyaar LLC | More Good Jobs. Fewer Quiet Weeks.",
  description:
    "You do the work. We help the right people find you, call you, and ask for an estimate. See what we could do for your service business.",
  alternates: { canonical: SITE_URL },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en">
      <body>
        {children}
        <SanityLivePreview>
          <SanityLive />
          {isDraftMode && <VisualEditing />}
        </SanityLivePreview>
      </body>
    </html>
  );
}
