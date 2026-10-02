"use client";
import { useState } from "react";
import { youtubeId } from "@/content/testimonials";
import { stegaClean } from "@sanity/client/stega";

export function ConsentVideo({ url, name }: { url: string; name: string }) {
  const [allow, setAllow] = useState(false);
  const cleanUrl = stegaClean(url);
  const videoId = youtubeId(cleanUrl);

  return (
    <>
      {allow ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
          title={`${name}'s testimonial`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="video-consent">
          <h3>Load this video from YouTube?</h3>
          <p>
            Loading the player connects to YouTube, which may collect device
            information and use cookies. You can leave it unloaded and keep
            browsing.
          </p>
          <button className="button button-dark" onClick={() => setAllow(true)}>
            Load video
          </button>
          <a href="/cookies">How optional videos work</a>
        </div>
      )}
      <a
        className="video-youtube-link"
        href={cleanUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch on YouTube instead
      </a>
    </>
  );
}

