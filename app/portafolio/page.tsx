export const dynamic = 'force-static';

import Footer from '../components/layouts/Footer';
import Navbar from '../components/layouts/Navbar';
import CTA from '../components/sections/CTA';
import Instagram from '../components/sections/Instagram';
import Polaroid from '../components/ui/Polaroid';
import SchoolPreview from '../components/ui/SchoolPreview';
import UnderlinedButton from '../components/ui/UnderlinedButton';
import UnderlinedText from '../components/ui/UnderlinedText';
import { getStrapiData } from '../lib/strapi';

export default async function Portafolio() {
  const strapiData = await getStrapiData('/api/portfolio');
  const data = strapiData.schools;

  return (
    <div className="bg-filmo-black-100 flex flex-col">
      <Navbar />

      <div className="flex h-[800px] max-md:h-dvh">
        <div className="flex h-full w-full flex-col justify-end px-42 py-32 max-md:px-6 max-md:py-12">
          <div className="z-10 flex flex-col gap-5">
            <div className="font-garamond text-left text-8xl font-extrabold text-white max-md:text-6xl">
              <h1>Nuestro</h1>
              <h1>Portafolio</h1>
            </div>

            <div className="font-figtree text-filmo-soft-white w-[26ch] text-2xl max-md:text-xl">
              <p>Lo vivimos con ellos y nosotros lo guardamos para siempre.</p>
            </div>

            <UnderlinedButton
              linkTo="#works"
              text="Conoce nuestro trabajo"
              styles=""
            />
          </div>
        </div>

        <video
          className="fixed z-0 h-full w-full object-cover opacity-15 max-md:h-dvh  pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
 
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="bg-noise bg-filmo-black-100 z-10 flex flex-col gap-52 px-48 py-32 pt-4 max-[1400px]:pt-32 max-md:w-full max-md:gap-32 max-md:px-6 max-md:py-16 max-[1400px]:px-16">
        
        <div className="max-md:flex-col-reverse flex w-full items-center justify-between max-[1400px]:gap-16 ">
          <div className="flex w-[45%] max-md:w-[80%] max-[1400px]:w-[40%]">
            <Polaroid img="/img/polaroid.webp" />
          </div>

          <div className="flex w-1/2 max-md:w-full items-center justify-end max-[1400px]:w-[60%]">
            <div className="max-[1400px]:w-full max-md:w-auto flex flex-col items-center gap-12 max-md:gap-6">
              <div className="flex flex-col items-center gap-1">
                <p className="font-figtree text-filmo-soft-white text-xl font-medium uppercase">
                  somos filmo
                </p>
                <h1 className="font-garamond text-filmo-white w-[18ch] max-[1400px]:w-auto max-[1400px]:px-3 max-md:px-0 text-center text-6xl font-extrabold max-md:text-4xl">
                  Capturamos las historias que se viven con fuerza: en la
                  cancha, en el aula y en esos abrazos de despedida.
                </h1>
              </div>
              <UnderlinedButton linkTo="#cta" text="Contáctanos" styles="" />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-24">
          <div className="flex flex-col gap-4 text-center">
            <p className="font-figtree text-filmo-soft-white text-xl font-medium uppercase">
              colegios
            </p>
            <div className="flex flex-col items-center gap-2">
              <h1 className="font-garamond text-filmo-white text-7xl max-[1400px]:text-6xl font-extrabold max-md:text-5xl">
                Cada colegio, una
              </h1>
              <h1 className="font-garamond text-filmo-white flex gap-5 text-7xl max-[1400px]:text-6xl font-extrabold max-md:text-5xl max-md:gap-3">
                historia{' '}
                <UnderlinedText
                  text="distinta"
                  full={true}
                  textSize="5xl"
                  styles="after:-bottom-2 after:max-md:-bottom-1"
                />
              </h1>
            </div>
          </div>

          <div
            className="flex w-full flex-wrap justify-center gap-20 max-[1400px]:flex-col max-md:gap-12 max-[1400px]:gap-x-0"
            id="works"
          >
            {data &&
              data
                .slice()
                .sort((a, b) => a.priority - b.priority)
                .map((school) => (
                  <div
                    className="mb-12 flex flex-col items-center w-5/12 max-[1400px]:w-full max-[1400px]:px-4 max-[1400px]:mb-0 max-md:px-0"
                    key={school.id}
                  >
                    <SchoolPreview
                      name={school.name}
                      slug={school.id}
                      logo={school.logo}
                      videoURL={school.cover}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
      
      <CTA />
      <Instagram />
      <Footer />
    </div>
  );
}
