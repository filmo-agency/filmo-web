
import Link from 'next/link';

import Footer from '@/app/components/layouts/Footer';
import CTA from '@/app/components/sections/CTA';
import Instagram from '@/app/components/sections/Instagram';

import Navbar from '../../../components/layouts/Navbar';
import PromCollage from '../../../components/sections/PromCollage';
import CoverCollage from '../../../components/ui/CoverCollage';
import { getStrapiData, toRoman } from '../../../lib/strapi';

export async function generateStaticParams() {
  const schools: { slug: string }[] =
    await getStrapiData('/api/schools/slugs');

  const params: { slug: string; promId: string }[] = [];

  for (const school of schools) {
    const proms: { promId: number }[] =
      await getStrapiData(`/api/schools/${school.slug}/proms`);

    for (const prom of proms) {
      params.push({
        slug: school.slug,
        promId: String(prom.promId),
      });
    }
  }
  return params;
}

export const dynamic = 'force-static';

export default async function promPage({
  params,
}: {
  params: {slug: string; promId: string} | Promise<{slug: string; promId: string}>;
}) {
  
  const resolvedParams = await params;
  const { slug, promId } = resolvedParams;
  const prom = await getStrapiData(`/api/schools/${slug}/proms/${promId}`);
  
  return (
    <div className="bg-filmo-black-100 flex flex-col">
      <Navbar />

      <div className="flex h-[800px] w-full overflow-hidden max-md:h-[550px]">
        <div className="flex h-full w-full flex-col justify-center px-42 py-32 max-md:px-6 max-md:py-12">
          <div className="z-10 flex flex-col items-center gap-32 text-center max-md:gap-20">
            <div className="font-figtree text-filmo-soft-white flex gap-2 text-xl font-medium max-md:items-center max-md:text-lg">
              <Link
                className="underline underline-offset-3 transition-all duration-200 hover:text-filmo-yellow-100"
                href={`/portafolio`}
              >
                Portafolio
              </Link>
              <span>|</span>
              <Link
                className="underline underline-offset-3 capitalize transition-all duration-200 hover:text-filmo-yellow-100"
                href={`/portafolio/${slug}/`}
              >
                {slug}
              </Link>
              <span>|</span>
              <p className="text-filmo-yellow-100 font-bold max-md:text-sm">
                {slug === 'interamerican' 
                  ? `Class of ${toRoman(Number(promId), slug)}` 
                  : `Promoción ${toRoman(Number(promId), slug)}`}
              </p>
            </div>

            <div className="flex flex-col items-center gap-5">
              <h1 className="font-garamond text-8xl font-extrabold text-white max-md:text-6xl">
                {slug === 'interamerican' 
                  ? `Class of ${toRoman(Number(promId), slug)}` 
                  : `Promoción ${toRoman(Number(promId), slug)}`}
              </h1>

              <div className="font-figtree text-filmo-soft-white w-[26ch] text-2xl max-md:w-auto max-md:text-xl">
                <p>
                  Lo vivimos con ellos y nosotros lo guardamos para siempre.
                </p>
              </div>
            </div>
          </div>
        </div>

        <CoverCollage promPics={prom.pics} />
      </div>

      <div className="bg-noise bg-filmo-black-100 z-10 flex flex-col gap-40 px-48 py-32 max-md:gap-16 max-md:px-6 max-md:py-12 max-[1400px]:px-16">
        <div className="flex w-full justify-between flex-col gap-3 max-md:gap-4">
          <div className="w-10/12 max-md:w-full">
            <h1 className="font-garamond text-filmo-white text-4xl font-medium leading-11 max-md:text-2xl max-md:leading-7 ">
              {
                prom.text
                ? `"${prom.text}"`
                : ''
              }
            </h1>
          </div>

          <div className="flex w-full max-md:w-full">
            <p className="font-figtree text-filmo-soft-white text-left text-xl max-md:w-full max-md:text-lg">
              {prom.subText}
            </p>
          </div>
        </div>

        <PromCollage promPics={prom.pics} />

        <div className="flex w-full flex-col items-center justify-between gap-8 max-md:gap-8 ">
          <div className="flex w-full flex-col items-center">
            <p className="font-figtree text-filmo-gray text-center text-lg font-medium uppercase">
              Video
            </p>
            <h1 className="font-garamond text-filmo-white w-[13ch] text-center text-7xl font-extrabold max-md:w-full max-md:text-5xl">
              Un resumen de lo que se vivió
            </h1>
          </div>
          <div className="aspect-video w-4/5 bg-[#777] rounded-sm overflow-hidden max-md:w-full">
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe
                src={`https://player.vimeo.com/video/${prom.videoId}?title=0&byline=0&portrait=0&badge=0&autopause=1&player_id=0&app_id=58479&quality=1080p&loop=1`}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                title=""
              />
            </div>
          </div>
        </div>
      </div>
      <CTA />
      <Instagram />
      <Footer />
    </div>
  );
}
