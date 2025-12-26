import Image from 'next/image';

import { toRoman } from '../../lib/strapi';
import UnderlinedButton from '../ui/UnderlinedButton';

export default function SchoolPreview({
  previewImage,
  promId,
  schoolId,
}: {
  previewImage: string;
  promId: number;
  schoolId: string;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 max-md:gap-4">
      <div className="relative h-[360px] w-full max-md:h-[450px]">
        <Image
          src={previewImage}
          alt=""
          fill
          sizes="
        (max-width: 768px) 100vw,
        (max-width: 1280px) 100vw,
        100vw
      "
          className="rounded-xl object-cover"
          priority={false}
        />
      </div>
      <h1 className="font-garamond text-filmo-white text-4xl font-extrabold">
        {schoolId === 'interamerican'
          ? `Class of ${toRoman(Number(promId), schoolId)}`
          : `Promoción ${toRoman(Number(promId), schoolId)}`}
      </h1>
      <UnderlinedButton
        linkTo={`/portafolio/${schoolId}/${promId}`}
        text="ver más"
        styles=""
      />
    </div>
  );
}
