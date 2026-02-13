import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export const AdSense = () => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adRef.current && typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // AdSense may throw in dev or ad-blocked environments
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8076040302380238"
      data-ad-slot="9021194372"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
