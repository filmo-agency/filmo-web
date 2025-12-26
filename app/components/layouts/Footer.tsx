import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-noise bg-filmo-black-100 z-10 flex flex-col items-center justify-center gap-8 px-48 py-32 max-md:px-6 max-md:py-12">
      <Link href="/">
        <Image src="/svg/filmo.svg" className="w-28 max-md:w-20 pl-2" alt="" width={0} height={0} />
      </Link>
      <p className="font-figtree text-filmo-soft-white w-[50ch] max-md:w-full max-md:text-sm text-center text-lg font-medium ">
        Nos metemos en el ritmo, en la emoción y en el caos lindo que es cada
        evento escolar. Estamos atentos para capturar lo que de verdad importa.
      </p>
      <p className="font-figtree text-filmo-gray max-md:text-sm text-center text-sm font-medium">
        Filmo © 2025. Todos los derechos reservados
      </p>
      <div className="font-figtree text-filmo-gray flex text-sm max-md:text-sm font-medium max-md:flex-col max-md:items-center max-md:gap-2">
        <span className="flex items-center gap-1">
          <p>Web by </p>
          <Link
            className="text-[#a5a5a5] underline underline-offset-4"
            href="https://dsebastiansr.github.io"
            target="_blank"
          >
            David Sánchez
          </Link>
        </span>
        <span className="mx-4 max-md:hidden">|</span>
        <span className="flex items-center gap-1">
          <p>Design by </p>
          <Link
            className="text-[#a5a5a5] underline underline-offset-4"
            href="https://dsebastiansr.github.io"
            target="_blank"
          >
            Alejandro Alvarado
          </Link>
        </span>
      </div>
    </div>
  );
}
