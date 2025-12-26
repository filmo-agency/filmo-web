import Image from 'next/image';
import Link from 'next/link';

export default function IgButton() {
  return (
    <Link
      target="_blank"
      href="https://www.instagram.com/filmo.inc/"
      className="duration-300 hover:scale-105 w-fit flex justify-end gap-2 bg-filmo-yellow-100 font-figtree text-filmo-black-100 rounded-full px-5 py-3 font-bold uppercase"
    >
      <Image src="/svg/ig.svg" className="h-6 w-6" alt="" width={0} height={0} />
      Ir a instagram
    </Link>
  );
}
