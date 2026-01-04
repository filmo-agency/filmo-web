'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

interface Pic {
  id: string | number;
  url: string;
  optimizedUrl: string;
  width?: number;
  height?: number;
}

interface CoverCollageProps {
  promPics: Pic[];
}

function CollageImage({ pic, delay }: { pic: Pic, delay: number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageClasses = `
    rounded-lg 
    h-80 
    w-auto 
    max-md:h-48
    object-cover 
    transition-opacity duration-0
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
  `;

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsLoaded(true); 
    }, delay);
  };

  return (
    <div className="shrink-0"> 
      <Image
        preload={true}
        key={pic.id}
        src={pic.optimizedUrl} 
        alt={pic.optimizedUrl}
        width={500} 
        height={300} 
        className={imageClasses}
        onLoad={handleImageLoad}
        onError={() => console.error(`Error loading optimized image: ${pic.optimizedUrl}`)}
      />
    </div>
  );
}

export default function CoverCollage({ promPics }: CoverCollageProps) {
  const pics = promPics;

  const { ROWS, COLS, rows } = useMemo(() => {
    const ROWS = 3;
    const COLS = 6;
    const TOTAL = ROWS * COLS;
    
    function shuffle(array: Pic[]): Pic[] {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    const shuffledPics = shuffle(pics);
    let picsPool = shuffledPics;

    if (shuffledPics.length < TOTAL) {
      const needed = TOTAL - shuffledPics.length;
      picsPool = [
        ...shuffledPics,
        ...shuffle(shuffledPics).slice(0, needed),
      ];
    }

    picsPool = picsPool.slice(0, TOTAL);

    const rows = Array.from({ length: ROWS }, (_, rowIndex) => {
      const start = rowIndex * COLS;
      return picsPool.slice(start, start + COLS);
    });

    return { ROWS, COLS, rows };
  }, [pics]); 

  const BASE_DELAY_MS = 0; 

  return (
    <div className="flex h-full flex-col gap-4 max-md:gap-2 w-full -rotate-6 fixed z-0 opacity-10">
      {rows.map((row, rIndex) => (
        <div
          key={rIndex}
          className={`ml-${rIndex % 2 === 0 ? '0' : '12'} flex flex-row gap-4 max-md:gap-2 w-full justify-center`}
        >
          {row.map((pic: Pic, cIndex) => {
            const globalIndex = rIndex * COLS + cIndex;
            const delay = globalIndex * BASE_DELAY_MS;

            return <CollageImage key={pic.id} pic={pic} delay={delay} />;
          })}
        </div>
      ))}
    </div>
  );
}