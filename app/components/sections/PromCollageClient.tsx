"use client";

import { useEffect } from 'react';

export default function PromCollageClient() {
  useEffect(() => {
    const btn = document.getElementById("show-more-btn");
    const collage = document.getElementById("collage-photos");
    const shadow = document.getElementById("shadow");

    if (!btn || !collage) return;

    const handler = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (isMobile) {
        collage.classList.remove("max-md:max-h-[1000px]", "overflow-hidden");
      } else {
        collage.classList.remove("max-h-[3000px]", "overflow-hidden");
      }

      collage.classList.add("max-h-none");
      shadow?.classList.add("hidden");
      btn.style.display = "none";
    };

    btn.addEventListener("click", handler);

    return () => btn.removeEventListener("click", handler);
  }, []);

  return null;
}
