import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

import Footer from './components/layouts/Footer';
import Navbar from './components/layouts/Navbar';
import CTA from './components/sections/CTA';
import Instagram from './components/sections/Instagram';
import LastWork from './components/ui/LastWork';
import UnderlinedButton from './components/ui/UnderlinedButton';
import UnderlinedText from './components/ui/UnderlinedText';
import { getStrapiData } from './lib/strapi';

export const metadata: Metadata = {
  title: 'Filmo | Cobertura de fotos y videos para colegios',
  description:
    'Cobertura profesional de fotos y videos para colegios y promociones estudiantiles.',
  alternates: { canonical: '/' },

  openGraph: {
    title: 'Filmo | Cobertura de fotos y videos para colegios',
    description: 'Cobertura profesional de fotos y videos para colegios.',
    url: '/',
    siteName: 'Filmo',
    images: [
      {
        url: '/og/filmo-og.png',
        width: 1200,
        height: 630,
        alt: 'Filmo',
      },
    ],
    type: 'website',
    locale: 'es_ES',
  },

  twitter: {
    card: 'summary_large_image',
    images: ['/og/filmo-og.png'],
  },
};

const schemaHome = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Filmo",
  "url": "https://filmostudio.com",
  "logo": "https://filmostudio.com/og/filmo-og.png",
  "description":
    "Cobertura profesional de fotos y videos para colegios y promociones estudiantiles en Ecuador.",
  "sameAs": [
    "https://www.instagram.com/filmo.inc"
  ]
};

export default async function Home() {
  const strapiData = await getStrapiData('/api/landing/home');
  const data = strapiData.schools;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHome) }}
      />

      <Navbar />

      <main className='bg-filmo-black-100 flex flex-col overflow-x-hidden'>
        <h1 className="sr-only">
          Cobertura profesional de fotos y videos para colegios y promociones
          estudiantiles en Ecuador
        </h1>

        <section
          aria-labelledby="hero-heading"
          className="relative flex h-screen w-full flex-col items-center max-md:px-6"
        >
          <div className="absolute bottom-25 z-10 flex flex-col items-center gap-5 text-center max-md:static max-md:bottom-full max-md:h-dvh max-md:justify-center max-md:gap-14">
            <div className="font-garamond text-8xl font-extrabold text-white max-md:flex max-md:w-full max-md:flex-col max-md:items-center max-md:justify-center max-md:text-center max-md:text-5xl max-md:mt-16">
              <h2 id="hero-heading">
                <span>Especialistas en</span>
                <span className="flex items-center justify-end gap-4 max-md:flex-col max-md:gap-0">
                  capturar historias
                  <UnderlinedText
                    text="únicas"
                    full={true}
                    textSize="5xl"
                    styles="after:-bottom-1"
                  />
                </span>
              </h2>
            </div>

            <div className="font-figtree text-filmo-soft-white text-2xl max-md:text-xl max-md:hidden">
              <p className="max-md:mb-2">
                Cada sonrisa, abrazo y logro merece ser eterno.
              </p>
              <p>Déjanos contar tu historia en imágenes.</p>
            </div>

            <Link
              className="duration-300 hover:scale-105 bg-filmo-yellow-100 mt-8 rounded-full px-7 py-4 max-md:px-6 max-md:py-3"
              href="/portafolio"
            >
              <p className="font-figtree text-filmo-black-100 text-lg font-bold uppercase select-none">
                Conoce nuestro trabajo
              </p>
            </Link>
          </div>

          <video
            className="fixed z-0 h-full w-full object-cover opacity-15 select-none pointer-events-none"
            autoPlay
            muted
            loop
            preload="auto"
            playsInline
            aria-hidden="true"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </section>

        <div className="bg-noise bg-filmo-black-100 relative z-10 flex flex-col gap-52 max-md:gap-16">
          <section
            aria-labelledby="clients-heading"
            className="mt-32 flex flex-col items-center justify-center gap-16 px-42 max-md:mt-16 max-md:px-6 max-[1400px]:px-0"
          >
            <h2 className="font-figtree text-filmo-gray text-lg font-medium uppercase">
              Hemos trabajado con
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-16 grayscale max-md:flex-col">
              <div className="flex flex-wrap items-center justify-center gap-16 grayscale max-md:flex-col">
                <Image
                  className="h-16 w-auto brightness-200 max-md:order-2"
                  src="/img/americano.png"
                  alt="logo-americano"
                  height={40}
                  width={100}
                />

                <Image
                  className="h-20 w-auto max-md:h-16 brightness-125 max-md:order-1"
                  src="/img/interamerican.png"
                  alt="logo-interamerican"
                  height={40}
                  width={100}
                />

                <Image
                  className="h-10 w-auto max-md:order-3"
                  src="/img/copol.png"
                  alt="logo-copol"
                  height={40}
                  width={100}
                />

                <Image
                  className="h-14 w-auto max-md:order-4"
                  src="/img/montessori.png"
                  alt="logo-montessori"
                  height={40}
                  width={100}
                />
              </div>
            </div>
          </section>

          <section className="bg-noise flex w-full gap-8 px-42 max-[1400px]:px-16 max-md:flex-col max-md:gap-8 max-md:overflow-hidden max-md:px-0">
            <div className="hidden max-md:flex max-md:flex-col max-md:gap-8">
              <div className="z-40 max-md:flex max-md:px-6">
                <div className="flex flex-col items-center gap-6 max-md:w-5/5 max-md:text-center">
                  <span className="font-figtree text-filmo-gray text-lg uppercase">
                    Como si fuera ese día otra vez
                  </span>
                  <h2 className="text-balance font-garamond text-filmo-white text-center text-5xl font-extrabold max-md:text-3xl">
                    Cobertura audiovisual para esos momentos estudiantiles que
                    no se repiten.
                  </h2>

                  <UnderlinedButton
                    linkTo=" portafolio"
                    text="Conoce más"
                    styles=""
                  />
                </div>
              </div>

              <div className="z-40 max-md:flex max-md:h-fit overflow-x-auto max-md:pb-2">
                <Image
                  src="/img/about2.webp"
                  alt="acerca-de-nosotros"
                  className="ml-7 z-40 mt-10 h-42 w-full rounded-xl object-cover will-change-transform max-md:flex max-md:w-[80%] max-md:self-start"
                  height={800}
                  width={800}
                />
                <Image
                  src="/img/about1.webp"
                  className="z-40 rounded-xl max-md:relative max-md:-right-4 max-md:flex max-md:w-[60%] max-md:self-end mr-9"
                  alt="acerca-de-nosotros"
                  height={800}
                  width={800}
                />
              </div>

              <div className="z-40 max-md:flex max-md:px-6 max-md:flex-col max-md:gap-4">
                <p className="text-filmo-white font-garamond w-full text-right text-6xl font-extrabold uppercase max-md:text-3xl">
                  Vives y disfrutas al máximo, se nota en cada momento.
                </p>
                <p className="text-filmo-soft-white font-figtree w-4/5 self-end text-right text-xl leading-8 font-medium max-md:w-full max-md:text-lg">
                  Cuando celebras tu graduación, compartes risas y buenas vibras
                  en tu fiesta, lo que importa son las experiencias que creas
                  con las personas que hacen que tu historia sea especial.
                </p>

                <div className="self-end">
                  <UnderlinedButton
                    linkTo="portafolio"
                    text="Nuestro último trabajo"
                    styles=""
                  />
                </div>
              </div>

              <div className="z-40 max-md:flex max-md:h-auto max-md:px-6 max-md:gap-2">
                <Image
                  src="/img/about5.webp"
                  className="w-full self-end rounded-xl object-contain"
                  alt="acerca-de-nosotros"
                  width={800}
                  height={800}
                />
              </div>

              <div className="z-40 max-md:flex max-md:px-6">
                <h2 className="font-figtree text-filmo-soft-white absolute text-left text-2xl uppercase">
                  Hagamos un recuerdo que puedas revivir siempre.
                </h2>
              </div>
            </div>

            <div className="z-40 flex h-full w-7/12 flex-col gap-12 max-md:hidden max-md:w-1/2">
              <div className="w-6/7 self-start max-md:hidden">
                <div className="flex flex-col items-center gap-8">
                  <span className="font-figtree text-filmo-gray max-md:text-md text-lg uppercase">
                    Como si fuera ese día otra vez
                  </span>
                  <p className="font-garamond text-filmo-white text-center text-5xl font-extrabold max-md:text-3xl">
                    Cobertura audiovisual para esos momentos estudiantiles que
                    no se repiten.
                  </p>

                  <UnderlinedButton
                    linkTo="portafolio"
                    text="Conoce más"
                    styles=""
                  />
                </div>
              </div>

              <div className="w-6/7 self-start">
                <Image
                  src="/img/about2.webp"
                  alt="acerca-de-nosotros"
                  className="w-full rounded-xl"
                  width={800}
                  height={800}
                />
              </div>

              <div className="relative flex w-6/7 flex-col items-center self-end">
                <Image
                  src="/img/f4.png"
                  className="rounded-t-full shadow-[0px_0px_40px_1px_rgba(20,17,16,1)]"
                  alt="acerca-de-nosotros"
                  width={600}
                  height={800}
                />
                <h2 className="font-figtree text-filmo-soft-white absolute bottom-[-95px] w-[20ch] text-left text-5xl uppercase max-[1400px]:bottom-[-140px] max-[1400px]:w-[15ch]">
                  Hagamos un recuerdo que puedas revivir siempre.
                </h2>
              </div>
            </div>

            <div className="z-40 flex h-full w-5/12 flex-col gap-12 max-md:hidden max-md:w-1/2">
              <div className="w-4/5">
                <Image
                  src="/img/about1.webp"
                  className="w-full rounded-xl"
                  alt="acerca-de-nosotros"
                  width={400}
                  height={900}
                />
              </div>

              <div className="flex w-5/5 flex-col gap-8 self-end">
                <h2 className="text-filmo-white font-garamond w-full text-right text-6xl font-extrabold uppercase">
                  Vives y disfrutas al máximo, se nota en cada momento.
                </h2>
                <p className="text-filmo-soft-white font-figtree w-4/5 self-end text-right text-xl leading-8 font-medium">
                  Cuando celebras tu graduación, compartes risas y buenas vibras
                  en tu fiesta, lo que importa son las experiencias que creas
                  con las personas que hacen que tu historia sea especial.
                </p>

                <div className="self-end">
                  <UnderlinedButton
                    linkTo="#lastWorks"
                    text="Nuestro último trabajo"
                    styles=""
                  />
                </div>
              </div>

              <div className="w-4/5 self-end">
                <Image
                  src="/img/about5.webp"
                  className="w-full rounded-xl shadow-[0px_0px_40px_1px_rgba(20,17,16,1)]"
                  alt="acerca-de-nosotros"
                  width={800}
                  height={800}
                />
              </div>
            </div>
          </section>

          <section
            id="lastWorks"
            aria-labelledby="portfolio-heading"
            className="z-40 flex flex-col items-center justify-center px-42 max-[1400px]:px-16 max-md:mt-16 max-md:px-6 mb-24"
          >
            <div className="text-filmo-white font-garamond flex flex-col gap-2 text-8xl leading-[70px] font-extrabold max-md:relative max-md:gap-0 max-md:text-5xl max-md:leading-none">
              <h2 id='portfolio-heading'>
                <span className="self-start">Nuestro</span>
                <div className="mt-1 ml-16 self-end max-md:ml-10">
                  <UnderlinedText
                    full={false}
                    text="portafolio"
                    textSize="5xl"
                    styles="after:-bottom-4 after:max-md:-bottom-1"
                  />
                </div>
              </h2>
            </div>
            <div className="mt-24 flex w-full gap-8 max-md:mt-12 max-md:flex-col max-md:gap-14">
              {(() => {
                const schools = [...data];
                const selectedSchools: any[] = [];

                const americano = schools.find(
                  (school) => school.slug === 'americano'
                );

                if (americano) {
                  selectedSchools.push(americano);
                  schools.splice(schools.indexOf(americano), 1);
                }

                while (selectedSchools.length < 3 && schools.length) {
                  const idx = Math.floor(Math.random() * schools.length);
                  selectedSchools.push(schools[idx]);
                  schools.splice(idx, 1);
                }

                return selectedSchools.map((school: any) => (
                  <LastWork
                    key={school.slug}
                    image={`${school.prom.cover}`}
                    prom={school.prom.id}
                    school={school.name}
                    link={`/portafolio/${school.slug}/${school.prom.id}`}
                    styles=""
                  />
                ));
              })()}
            </div>
            <Link
              className="duration-300 hover:scale-105 bg-filmo-yellow-100 mt-16 max-md:mt-24 rounded-full px-7 py-4 max-md:px-6 max-md:py-3"
              href="/portafolio"
            >
              <p className="font-figtree text-filmo-black-100 text-lg font-bold uppercase select-none">
                Conoce nuestro trabajo
              </p>
            </Link>
          </section>

          {/* <div className="mb-32 flex flex-col items-center justify-center px-42 max-md:px-6">
          <TestimonyCarousel />
        </div> */}
        </div>
        
        <CTA />
        <Instagram />
      </main>
      
      <footer className='bg-filmo-black-100 flex'>
        <Footer />
      </footer>
    </>
  );
}
