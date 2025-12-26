'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import ContactUsButton from '../ui/ContactUsButton';

export default function Navbar() {

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('navbar-logo');

    function handleScroll() {
      if (!navbar) return;

      if (window.scrollY > 25) {
        navbar.classList.add(
          'bg-filmo-black-100',
          'bg-opacity-90',
          'drop-shadow-2xl'
        );
        navbar.classList.remove(
          'py-12',
          'bg-gradient-to-b',
          'from-[#0C0A09]/100',
          'to-white/0'
        );
        navbar.classList.add('py-6');

        if (logo) {
          logo.classList.remove('h-20');
          logo.classList.add('h-16');
        }
      } else {
        navbar.classList.remove(
          'bg-filmo-black-100',
          'bg-opacity-90',
          'drop-shadow-2xl'
        );
        navbar.classList.remove('py-6');
        navbar.classList.add(
          'py-12',
          'bg-gradient-to-b',
          'from-[#0C0A09]/100',
          'to-white/0'
        );

        if (logo) {
          logo.classList.remove('h-16');
          logo.classList.add('h-20');
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className="fixed z-50 flex w-full items-center justify-between bg-linear-to-b from-[#0C0A09] to-white/0 px-42 py-12 transition-all duration-300 max-md:h-24 max-md:px-8 max-md:items-center max-[1400px]:h-fit max-[1400px]:px-16"
    >
      <Link href="/" className="">
        <Image
          id="navbar-logo"
          src="/svg/filmo.svg"
          className="z-20 h-20 max-md:h-10 max-[1400px]:h-10 transition-all duration-300"
          alt=""
          width={96}
          height={24}
        />
      </Link>

      <div className="max-md:hidden">
        <ul className="text-filmo-soft-white flex items-center gap-12">
          <li className="text-xl">
            <Link href="/">Inicio</Link>
          </li>
          <li className="text-xl">
            <Link href="/portafolio">Portafolio</Link>
          </li>
          <li className="">
            <ContactUsButton />
          </li>
        </ul>
      </div>

      <div className="h-full hidden max-md:flex items-center gap-4">
        <Link href="/">
          <Image src="/svg/house.svg" className="" alt="" width={36} height={24} />
        </Link>
        <Link href="/portafolio">
          <Image src="/svg/camera.svg" className="" alt="" width={40} height={24} />
        </Link>
        <Link href="https://wa.me/+593983903842" target='_blank'>
          <Image src="/svg/ws1.svg" className="" alt="" width={36} height={24} />
        </Link>
      </div>
    </nav>
  );
}