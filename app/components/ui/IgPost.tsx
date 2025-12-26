import Image from 'next/image';
import Link from 'next/link';

export default function IgPost({ url, pic, type }) {
  return (
    <Link
      href={url}
      target='_blank'
      className="shrink-0 w-[350px] max-md:w-[250px] aspect-3/4  transition-all duration-200 hover:translate-x-1 hover:-translate-y-1 max-md:mr-4 max-md:first:ml-4"
    >
      <div className="relative">
        {
          type === 'VIDEO'
          ? <svg aria-label="Clip" className="fill-white/90 absolute right-2 top-2 h-7 w-7" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><path d="M22.942 7.464c-.062-1.36-.306-2.143-.511-2.671a5.366 5.366 0 0 0-1.272-1.952 5.364 5.364 0 0 0-1.951-1.27c-.53-.207-1.312-.45-2.673-.513-1.2-.054-1.557-.066-4.535-.066s-3.336.012-4.536.066c-1.36.062-2.143.306-2.672.511-.769.3-1.371.692-1.951 1.272s-.973 1.182-1.27 1.951c-.207.53-.45 1.312-.513 2.673C1.004 8.665.992 9.022.992 12s.012 3.336.066 4.536c.062 1.36.306 2.143.511 2.671.298.77.69 1.373 1.272 1.952.58.581 1.182.974 1.951 1.27.53.207 1.311.45 2.673.513 1.199.054 1.557.066 4.535.066s3.336-.012 4.536-.066c1.36-.062 2.143-.306 2.671-.511a5.368 5.368 0 0 0 1.953-1.273c.58-.58.972-1.181 1.27-1.95.206-.53.45-1.312.512-2.673.054-1.2.066-1.557.066-4.535s-.012-3.336-.066-4.536Zm-7.085 6.055-5.25 3c-1.167.667-2.619-.175-2.619-1.519V9c0-1.344 1.452-2.186 2.619-1.52l5.25 3c1.175.672 1.175 2.368 0 3.04Z"></path></svg>
          : <svg aria-label="Secuencia" className="fill-white/90 absolute right-2 top-2 h-7 w-7" fill="currentColor" height="20" role="img" viewBox="0 0 48 48" width="20"><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg>
        }
      </div>

      <Image className="h-full w-full object-cover rounded-xl" src={pic} alt={pic} width={800} height={800} />

    </Link>
  );
}
