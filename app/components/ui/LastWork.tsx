import Image from 'next/image';

import UnderlinedButton from '../ui/UnderlinedButton';

export default function LastWork({
  image,
  prom,
  school,
  link,
  styles,
}: {
  image: string;
  prom: string;
  school: string; 
  link: string;
  styles: string;
}) {
  return (
    <div
      className={`flex w-1/3 flex-col gap-3 ${styles} max-md:w-full max-md:items-center max-md:gap-2 max-[1400px]:gap-2 pr-4 max-md:pr-0 max-[1400px]:pr-0 max-[1400px]:px-2`}
    >
      <Image
        src={image}
        alt=""
        className="w-full h-[335px] rounded-xl object-cover"
        width={500}
        height={335}
      />
      <div>

      </div>

      <h1 className="text-filmo-white font-garamond text-4xl max-[1400px]:text-3xl font-extrabold max-md:text-4xl max-md:text-center">
        {school}
      </h1>
      <h1 className="text-filmo-white font-garamond text-4xl max-[1400px]:text-3xl font-extrabold max-md:text-4xl max-md:text-center">
        {school == 'InterAmerican Academy'
          ? `Class of ${prom}` 
          : `Prom ${prom}`}
      </h1>
      <UnderlinedButton text="ver más" linkTo={link} styles="" />
    </div>
  );
}
