"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

/**
 * SanityLivePreview wrapper
 *
 * Prevents `<SanityLive />` and `<VisualEditing />` from mounting on Sanity Studio routes (`/studio/*`).
 *
 * Root Cause Explanation:
 * Because Sanity Studio is mounted inside the Next.js app at `/app/studio/[[...tool]]/page.tsx`
 * under the shared `app/layout.tsx`, mounting `<SanityLive />` in the root layout means the outer
 * Studio host window was listening to Sanity live events.
 *
 * When an editor typed any character in the Studio input, `<SanityLive />` in the outer Studio window
 * received the event and called `router.refresh()`, triggering a full re-render of `<NextStudio />`
 * and the Presentation Tool. This destroyed and recreated the preview `<iframe>` on every single keystroke,
 * causing:
 *  1. The preview page to completely reload/remount and reset its state on every keystroke.
 *  2. Ongoing HTTP streams to be severed mid-flight (`Error: The destination stream closed early`).
 *  3. Concurrent aborted streams to leak Gzip listeners (`MaxListenersExceededWarning on [Gzip]`).
 *
 * By isolating `<SanityLive />` and `<VisualEditing />` to non-studio routes, the Studio host window
 * never refreshes on keystrokes, the iframe remains persistently mounted, and content updates
 * smoothly in real time without refreshing or remounting the preview.
 */
export function SanityLivePreview({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return <>{children}</>;
}
