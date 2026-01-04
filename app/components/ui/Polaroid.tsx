import Image from 'next/image';

export default function Polaroid({ img }: { img: string }) {
  return (
    <div className="flex w-fit -rotate-12 items-center justify-center bg-white px-8 py-8 pb-40 duration-300 ease-in-out hover:-rotate-8 max-2xl:p-4 max-2xl:pb-24 max-[1400px]:-rotate-8 max-md:-rotate-4">
      <Image
        src={img}
        className="h-auto w-full will-change-transform"
        alt="Imagen Polaroid"
        style={{
          transform: 'translateZ(0)',
          imageRendering: '-webkit-optimize-contrast',
        }}
        width={0}
        height={0}
      />
    </div>
  );
}
