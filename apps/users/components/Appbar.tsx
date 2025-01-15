"use client"

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { TransitionLink } from './TransitionLink';

const navLinks = [
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
  { name: 'About', path: '/about' },
];

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-cream text-gold p-4 px-10 absolute inset-x-0 top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href='/' legacyBehavior>
          <a className="flex items-center">
            <div className="relative h-10 w-10 mr-4">
              <Image
                src="/logo.png"
                alt="BloomKnot"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-2xl font-bold">BloomKnot</span>
          </a>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-8">
          {navLinks.map((link) => (
            <TransitionLink key={link.name} href={link.path}>
              {link.name}
            </TransitionLink>
          ))}
          <button className="bg-gold text-cream px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
            Book Now
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} legacyBehavior>
              <a
                className={`block py-2 px-4 hover:bg-gold hover:text-cream ${isActive(link.path) ? 'font-bold' : ''
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </Link>
          ))}
          <button
            className="block w-full text-left bg-gold text-cream px-4 py-2 mt-2 rounded hover:bg-opacity-90 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Appbar;