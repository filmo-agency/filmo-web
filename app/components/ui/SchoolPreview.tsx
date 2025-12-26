'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import UnderlinedButton from './UnderlinedButton';

export default function SchoolPreview({
  schoolId,
  schoolName,
  schoolLogo,
  videoURL,
}: {
  schoolId: string;
  schoolName: string;
  schoolLogo: string;
  videoURL: string;
}) {

  useEffect(() => {
    document.querySelectorAll<HTMLVideoElement>(".wrap-video").forEach(video => {
      video.muted = true;

      const play = () => video.play().catch(() => {});
      const pause = () => video.pause();

      video.addEventListener("mouseenter", play);
      video.addEventListener("mouseleave", pause);

      return () => {
        video.removeEventListener("mouseenter", play);
        video.removeEventListener("mouseleave", pause);
      };
    });

    // Mobile: Intersection Observer
    const isMobile = window.innerWidth < 1400;
    if (!isMobile) return;

    document.querySelectorAll(".group").forEach(container => {
      const video = container.querySelector<HTMLVideoElement>(".wrap-video");
      const logo = container.querySelector<HTMLImageElement>("img");

      if (!video || !logo) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
              logo.classList.remove("grayscale");
              video.classList.remove("grayscale");
            } else {
              video.pause();
              logo.classList.add("grayscale");
              video.classList.add("grayscale");
            }
          });
        },
        { threshold: 0.6 }
      );

      observer.observe(container);

      return () => observer.disconnect();
    });
  }, []);

  return (
    <div className="group w-full flex flex-col items-center justify-end gap-2 max-[1400px]:gap-4 transition-all">
      <h1 className="font-garamond text-center text-4xl w-[30ch] max-md:w-auto max-[1400px]:w-auto max-[1400px]:text-5xl max-md:text-3xl font-extrabold text-white">
        {schoolName}
      </h1>

      <Link
        href={`/portafolio/${schoolId}`}
        className="w-full max-[1400px]:w-auto overflow-hidden rounded-xl"
      >
        <video
          preload="auto"
          className="transition-all duration-300 grayscale group-hover:grayscale-0 wrap-video h-[360px] max-md:h-full max-md:w-full rounded-xl object-cover max-[1400px]:aspect-video max-[1400px]:h-[500px] max-[1400px]:w-auto"
          muted
          loop
          playsInline
        >
          <source src={videoURL} type="video/mp4" />
        </video>
      </Link>

      <Image
        src={schoolLogo}
        className="h-20 max-md:h-8 rounded-xl object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
        alt=""
        height={80}
        width={200}
      />

      <UnderlinedButton linkTo={`/portafolio/${schoolId}`} text="ver más" styles=''/>
    </div>
  );
}
