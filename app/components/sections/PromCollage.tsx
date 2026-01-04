"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

/* =======================
   Types
======================= */

type StrapiImage = {
  id: number;
  url: string;
  width: number;
  height: number;
};

/* =======================
   Utils
======================= */

function shuffleArray<T>(array: T[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function splitIntoColumns(
  pics: StrapiImage[],
  columnCount: number
): StrapiImage[][] {
  const columns: StrapiImage[][] = Array.from(
    { length: columnCount },
    () => []
  );

  const columnHeights = Array(columnCount).fill(0);

  pics.forEach((pic) => {
    const aspectRatio = pic.height / pic.width;
    const shortestColumnIndex = columnHeights.indexOf(
      Math.min(...columnHeights)
    );

    columns[shortestColumnIndex].push(pic);
    columnHeights[shortestColumnIndex] += aspectRatio;
  });

  return columns;
}

/* =======================
   Image Component
======================= */

function CollageImage({ pic }: { pic: StrapiImage }) {
  return (
    <div className='relative w-full overflow-hidden rounded-lg bg-neutral-200'>
      <Image
        src={pic.url}
        alt={pic.url}
        width={pic.width}
        height={pic.height}
        sizes="
          (max-width: 768px) 90vw,
          (max-width: 1200px) 45vw,
          33vw
        "
        className="w-full h-auto object-cover"
      />
    </div>
  );
}

/* =======================
   Main Component
======================= */

export default function PromCollage({
  promPics,
}: {
  promPics: StrapiImage[];
}) {
  const [expanded, setExpanded] = useState(false);

  // 🔀 Shuffle SOLO una vez
  const shuffledPics = useMemo(
    () => shuffleArray(promPics),
    [promPics]
  );

  const desktopColumns = splitIntoColumns(shuffledPics, 3);
  const mobileColumns = splitIntoColumns(shuffledPics, 2);

  return (
    <section className="w-full flex flex-col items-center gap-16">
      <div
        className={[
          "w-full relative transition-all duration-500",
          expanded
            ? "max-h-none"
            : "overflow-hidden max-h-[3000px] max-md:max-h-[1000px]",
        ].join(" ")}
      >
        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {desktopColumns.map((col, i) => (
            <div key={i} className="flex flex-col gap-6">
              {col.map((pic) => (
                <CollageImage key={pic.id} pic={pic} />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="grid md:hidden grid-cols-2 gap-2">
          {mobileColumns.map((col, i) => (
            <div key={i} className="flex flex-col gap-2">
              {col.map((pic) => (
                <CollageImage key={pic.id} pic={pic} />
              ))}
            </div>
          ))}
        </div>

        {!expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-60 w-full bg-linear-to-t from-filmo-black-100 to-transparent" />
        )}
      </div>

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="bg-filmo-yellow-100 text-filmo-black-100 font-bold px-12 py-3 rounded-full uppercase"
        >
          Ver más
        </button>
      )}
    </section>
  );
}
