import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getStrapiData } from '@/app/lib/strapi';

import Footer from '../../components/layouts/Footer';
import Navbar from '../../components/layouts/Navbar';
import CTA from '../../components/sections/CTA';
import Instagram from '../../components/sections/Instagram';
import PromPreview from '../../components/ui/PromPreview';

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {

  const { schoolId } = await params;

  const school = await getStrapiData(`/api/schools/${schoolId}`);

  return (
    <div className="bg-filmo-black-100 flex flex-col">
      <Navbar />

      <div className="flex h-[800px] max-md:h-[550px] w-full overflow-hidden">
        <div className="flex h-full w-full flex-col justify-center px-42 py-32 max-md:px-6 max-md:py-12">
          <div className="z-10 flex flex-col items-center gap-32 max-md:gap-20 text-center">
            <div className="font-figtree text-filmo-soft-white flex gap-2 text-xl font-medium">
              <Link
                className="underline underline-offset-3 transition-all duration-200 hover:text-filmo-yellow-100"
                href={`/portafolio`}
              >
                Portafolio
              </Link>
              <span>|</span>
              <p className="text-filmo-yellow-100 font-bold capitalize">
                {schoolId}
              </p>
            </div>

            <div className="flex flex-col items-center gap-5">
              <Image
                src={`${school.logo}`}
                className="h-24 object-contain"
                alt=""
                width={400}
                height={200}
              />

              <div className="font-figtree text-filmo-soft-white w-[26ch] text-2xl max-md:w-auto max-md:text-xl">
                <p>
                  Lo vivimos con ellos y nosotros lo guardamos para siempre.
                </p>
              </div>
            </div>
          </div>
        </div>

        <video
          className="fixed z-0 h-full w-full object-cover opacity-15 pointer-events-none"
          autoPlay
          muted
          playsInline
          loop
          aria-hidden="true"
          preload="auto"
          tabIndex={-1}
        >
          <source
            src={`${school.cover}`}
            type="video/mp4"
          />
        </video>
      </div>

      <div className="bg-noise bg-filmo-black-100 z-10 flex flex-col gap-52 px-48 py-32 max-md:px-6 max-md:py-12 max-[1400px]:px-16">
        <div className="flex w-full flex-wrap justify-center gap-20 max-[1400px]:gap-6 max-[1400px]:flex-row max-md:flex-col max-[1400px]:justify-around">
          {school.proms.map((prom) => {
            return (
              <div
                className="mb-12 flex w-5/12 max-[1400px]:w-[48%] max-lg:w-full"
                key={prom.id}
              >
                <PromPreview
                  promId={prom.id}
                  previewImage={`${prom.cover}`}
                  schoolId={school.id}
                />
              </div>
            );
          })}
        </div>
      </div>
      <CTA />
      <Instagram />
      <Footer />
    </div>
  );
}
