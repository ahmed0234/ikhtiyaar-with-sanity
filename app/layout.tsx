import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import {SITE_URL} from "@/lib/seo";
export const metadata: Metadata = {
 title: "Ikhtiyaar LLC | More Good Jobs. Fewer Quiet Weeks.",
 description: "You do the work. We help the right people find you, call you, and ask for an estimate. See what we could do for your service business.",
 alternates: { canonical: SITE_URL },
 icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body>{children}</body></html>;
}
