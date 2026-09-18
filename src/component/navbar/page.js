'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSection = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom =
        window.scrollY + windowHeight >= documentHeight - 100;

      if (scrolledToBottom) {
        setActiveSection('contact');
        return;
      }

      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      const sections = ['home', 'about', 'project', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSection);
    handleScrollSection();
    return () => window.removeEventListener('scroll', handleScrollSection);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Project', href: '#project' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`
      sticky top-0 z-50
      pt-6 md:pt-10
      transition-all duration-300 ease-in-out
      mx-4 md:mx-30
      ${scrolled ? 'md:pt-4' : 'md:pt-10'}
    `}
    >
      <div
        className="
        bg-white
       rounded-4xl
        flex items-center justify-between
        px-4 py-4 md:px-6 md:py-6 
        transition-all duration-300 ease-in-out
        shadow-[0_0_4px_rgba(0,0,0,0.15)]
      "
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="shrink-0 cursor-pointer font-futura font-bold text-lg md:text-2xl text-primary"
        >
          dre
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-[#6d001a] block transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-[#6d001a] block transition-all ${isMenuOpen ? 'opacity-0' : ''}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-[#6d001a] block transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          ></span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-9 font-futura font-book text-[20px]">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                if (link.name === 'Home') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  document
                    .getElementById(link.href.replace('#', ''))
                    ?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`cursor-pointer transition-colors duration-200 relative ${
                activeSection === link.href.replace('#', '')
                  ? 'text-[#6d001a]'
                  : 'text-black hover:text-[#6d001a]'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop Socials */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#"
            aria-label="Instagram"
            className="transition-transform duration-200 hover:scale-110"
          >
            <Image src="/svg/ig.svg" alt="Instagram" width={28} height={28} className="w-7 h-7 md:w-8 md:h-8" />
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="transition-transform duration-200 hover:scale-110"
          >
            <Image src="/svg/github.svg" alt="GitHub" width={28} height={28} className="w-7 h-7 md:w-8 md:h-8" />
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`
        fixed inset-0 bg-white z-40 md:hidden flex flex-col items-center justify-center gap-8
        transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}
      `}
      >
        <div className="flex flex-col items-center gap-8 font-futura font-book text-[32px]">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                setIsMenuOpen(false);
                if (link.name === 'Home') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  document
                    .getElementById(link.href.replace('#', ''))
                    ?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`transition-colors duration-200 ${
                activeSection === link.href.replace('#', '')
                  ? 'text-[#6d001a]'
                  : 'text-black hover:text-[#6d001a]'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-8 mt-8">
          <a href="#" aria-label="Instagram">
            <Image src="/svg/ig.svg" alt="Instagram" width={40} height={40} />
          </a>
          <a href="#" aria-label="GitHub">
            <Image src="/svg/github.svg" alt="GitHub" width={40} height={40} />
          </a>
        </div>
      </div>
    </nav>
  );
}
