import Image from 'next/image';
import Link from 'next/link';

export default function ContactUsButton() {
  return (
    <Link
      target="_blank"
      href="https://wa.me/+593983903842"
      className="flex justify-end gap-2 bg-filmo-yellow-100 duration-300 hover:scale-105   text-filmo-black-100 rounded-full px-5 py-3 font-bold uppercase max-md:px-3 max-md:py-2 max-md:text-sm"
    >
      <Image src="/svg/ws.svg" className="h-6 w-6" alt="" width={0} height={0} />
      Contáctanos
    </Link>
  );
}
