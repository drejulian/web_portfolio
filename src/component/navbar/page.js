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

      if (window.location.pathname !== '/') {
        setActiveSection('');
        return;
      }

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
      pt-4 md:pt-10
      transition-all duration-300 ease-in-out
      mx-4 md:mx-8 lg:mx-16 xl:mx-30
      ${scrolled ? 'md:pt-4' : 'md:pt-10'}
    `}
    >
      <div
        className="
        bg-white/95 md:bg-white
        rounded-full md:rounded-4xl
        flex items-center justify-between
        px-4 py-2.5 md:px-6 md:py-6
        transition-all duration-300 ease-in-out
        shadow-[0_2px_12px_rgba(0,0,0,0.08)] ring-1 ring-black/4
        backdrop-blur-lg md:backdrop-blur-none
      "
      >
        <button
          onClick={() => {
            if (window.location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.location.href = '/';
            }
          }}
          className="shrink-0 cursor-pointer font-futura font-bold text-lg md:text-2xl text-primary"
        >
          dre
        </button>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={
            isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="md:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.25 rounded-full transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-primary transition-all duration-300 ${isMenuOpen ? 'translate-y-1.75 rotate-45' : ''}`}
          ></span>
          <span
            className={`block h-0.5 w-5 rounded-full bg-primary transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
          ></span>
          <span
            className={`block h-0.5 w-5 rounded-full bg-primary transition-all duration-300 ${isMenuOpen ? '-translate-y-1.75 -rotate-45' : ''}`}
          ></span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-9 font-futura font-book text-[20px]">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                if (link.name === 'Home') {
                  if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.href = '/#home';
                  }
                } else {
                  const targetId = link.href.replace('#', '');
                  const target = document.getElementById(targetId);

                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = `/${link.href}`;
                  }
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
            href="https://instagram.com/drejulian_"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition-transform duration-200 hover:scale-110"
          >
            <Image
              src="/svg/ig.svg"
              alt="Instagram"
              width={28}
              height={28}
              className="w-7 h-7 md:w-8 md:h-8"
            />
          </a>
          <a
            href="https://github.com/drejulian"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-transform duration-200 hover:scale-110"
          >
            <Image
              src="/svg/github.svg"
              alt="GitHub"
              width={28}
              height={28}
              className="w-7 h-7 md:w-8 md:h-8"
            />
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-navigation"
        className={`
        fixed inset-x-0 top-21 bottom-0 z-40 md:hidden
        transition-all duration-300 ease-out
        ${isMenuOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}
      `}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          className="absolute inset-0 h-full w-full bg-black/15 backdrop-blur-[2px]"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute inset-x-4 top-3 rounded-3xl bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] ring-1 ring-black/6 transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-2'}`}
        >
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
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left font-futura text-lg transition-colors duration-200 ${
                activeSection === link.href.replace('#', '')
                  ? 'bg-primary/5 font-bold text-primary'
                  : 'text-black/75 hover:bg-black/4 hover:text-primary'
              }`}
            >
              {link.name}
              <span
                className={`h-2 w-2 rounded-full ${activeSection === link.href.replace('#', '') ? 'bg-primary' : 'bg-transparent'}`}
              />
            </button>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-black/10 px-3 pt-3">
            <a
              href="https://instagram.com/drejulian_"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl px-2 py-2 font-futura text-sm text-black/70 transition-colors hover:bg-black/4 hover:text-primary"
            >
              <Image src="/svg/ig.svg" alt="" width={20} height={20} />
              Instagram
            </a>
            <a
              href="https://github.com/drejulian"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl px-2 py-2 font-futura text-sm text-black/70 transition-colors hover:bg-black/4 hover:text-primary"
            >
              <Image src="/svg/github.svg" alt="" width={20} height={20} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
