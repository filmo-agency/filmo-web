export default function UnderlinedText({
  text,
  full,
  textSize,
  styles,
}: {
  text: string;
  full: boolean;
  textSize: string;
  styles: string;
}) {
  let firtLetter = text.charAt(0);
  let restOfText = text.slice(1);

  if (full) {
    firtLetter = '';
    restOfText = text.slice(0);
  }

  return (
    <div
      className={`max-md:text-${textSize}text-filmo-white font-garamond flex font-extrabold`}
    >
      <h1>{firtLetter}</h1>
      <div className="relative flex w-auto flex-col">
        <h1
          className={`${styles} relative after:content-[''] after:w-full after:h-2 max-md:after:h-1 after:bg-filmo-yellow-100 after:absolute after:left-0 after:rounded-full`}
        >
          {restOfText}
        </h1>
      </div>
    </div>
  );
}
