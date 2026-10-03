"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ArticleShareButtonProps {
  title: string;
}

export function ArticleShareButton({ title }: ArticleShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="article-share-btn"
      aria-label="Share article"
      title="Share or copy article link"
    >
      {copied ? (
        <>
          <Check size={14} className="text-emerald-600" />
          <span>Link copied!</span>
        </>
      ) : (
        <>
          <Share2 size={14} />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
