import Link from 'next/link';

export default function UnderlinedButton({text, linkTo, styles }: {text: string; linkTo: string; styles: string}) {
  return (
    <Link
      href={linkTo}
      className={`max-md:${styles} w-fit text-filmo-white font-figtree border-filmo-yellow-100 border-b-3 text-lg font-bold uppercase`}
    >
      {text}
    </Link>
  );
}
