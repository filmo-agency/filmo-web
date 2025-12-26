import Image from 'next/image';

import ContactUsButton from '../ui/ContactUsButton';

export default function CTA() {
  return (
    <div
      className="relative z-10 flex h-[500px] max-md:h-[500px] w-full flex-col items-center justify-center gap-10 max-md:px-8"
      id="cta"
    >
      <div className="flex flex-col items-center gap-0">
        <p className="font-figtree text-filmo-soft-white text-xl max-md:text-lg font-medium uppercase">
          colegios
        </p>
        <h1 className="font-garamond text-filmo-white w-[20ch] text-center max-md:text-4xl max-md:w-auto text-7xl font-extrabold">
          ¿Será tu colegio el próximo en nuestra historia?
        </h1>
      </div>

      <ContactUsButton />

      <Image
        src="/img/cta.webp"
        alt=""
        className="absolute -z-10 h-full w-full mask-linear-to-gray-400 object-cover brightness-35"
        fill
      />
    </div>
  );
}
