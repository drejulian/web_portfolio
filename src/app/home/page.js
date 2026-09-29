'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Home() {
  const [cvUrl, setCvUrl] = useState('');

  const getCvDownloadUrl = (url) => {
    try {
      const downloadUrl = new URL(url);

      if (downloadUrl.hostname === 'drive.google.com') {
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match) {
          const fileId = match[1];
          return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
        if (url.includes('uc?export=download')) {
          return url;
        }
      }

      if (downloadUrl.hostname === 'firebasestorage.googleapis.com') {
        downloadUrl.searchParams.set(
          'response-content-disposition',
          'attachment; filename="resume.pdf"'
        );
        return downloadUrl.toString();
      }

      return url;
    } catch {
      return url;
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, observerOptions);

    document
      .querySelectorAll('[data-animate]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'portfolio'))
      .then((snapshot) => {
        setCvUrl(snapshot.data()?.cvUrl || '');
      })
      .catch((error) => console.error('Unable to load CV:', error));
  }, []);

  return (
    <div className="mt-8 sm:mt-10 md:mt-13">
      {/* Portfolio heading with overlapping photo */}
      <div className="relative flex justify-center mb-8 md:mb-8 xl:mb-24">
        <h1
          data-animate
          className="font-ragick text-[70px] sm:text-[90px] md:text-[100px] lg:text-[120px] xl:text-[150px] text-primary z-10 transition-all duration-1000 leading-none"
          style={{ opacity: 0, transform: 'translateY(-30px)' }}
        >
          Portfolio
        </h1>

        {/* Hero photo overlapping the text */}
        <div
          data-animate
          className="absolute top-6 right-0 sm:top-8 sm:right-4 md:left-[53%] md:right-auto md:top-12 md:-translate-x-1/2 xl:top-8 xl:left-auto xl:mt-10 xl:ml-30 xl:translate-x-0 z-20 transition-all duration-1000"
          style={{ opacity: 0, transform: 'scale(0.85)' }}
        >
          <Image
            src="/svg/hero.svg"
            alt="Derbi Tri Julian"
            width={100}
            height={300}
            className="w-36.25 sm:w-40 md:w-44 lg:w-50 xl:w-65"
            priority
          />
        </div>
      </div>

      {/* Content section: Text left, Badges right */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full px-4 md:px-0 mt-4 md:mt-10 xl:mt-12">
        {/* Left side: Text content */}
        <div
          data-animate
          className="flex-1 max-w-[60%] md:max-w-[36%] xl:max-w-[36%] transition-all duration-1000 w-full relative z-30"
          style={{ opacity: 0, transform: 'translateX(-50px)' }}
        >
          <p className="text-black font-futura font-book text-[12px] sm:text-[14px] md:text-[17px] lg:text-[19px] xl:text-[20px] mb-2">
            Hey, I am Derbi Tri Julian
          </p>
          <h2 className="text-primary font-ragick text-[20px] sm:text-[24px] md:text-[34px] lg:text-[44px] xl:text-[48px] leading-[0.95] mb-2">
            WEB & MOBILE
            <br />
            DEVELOPER
          </h2>
          <p className="text-black font-futura font-book text-[11px] sm:text-[13px] md:text-[17px] lg:text-[19px] xl:text-[20px] leading-relaxed mb-4">
            Building digital experiences that are functional, intuitive, and
            easy to use.
          </p>

          {/* Buttons - positioned with text on mobile, separate on desktop */}
          <div className="flex flex-row gap-2 items-start md:hidden">
            {/* Download CV button */}
            {cvUrl && (
              <a
                href={getCvDownloadUrl(cvUrl)}
                download
                className="bg-primary text-white px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-full font-futura font-book text-[10px] sm:text-xs md:text-sm whitespace-nowrap transition-all duration-300 cursor-pointer hover:bg-white hover:text-primary border border-primary"
              >
                Download CV
              </a>
            )}

            {/* Contact Me button */}
            <a
              href="#contact"
              className="border border-primary text-primary px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-full font-futura font-book text-[10px] sm:text-xs md:text-sm whitespace-nowrap transition-all duration-300 cursor-pointer hover:bg-primary hover:text-white"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right side: Buttons for desktop */}
        <div
          data-animate
          className="hidden md:flex shrink-0 md:w-auto transition-all duration-1000"
          style={{ opacity: 0, transform: 'translateX(50px)' }}
        >
          <div className="flex flex-col items-center gap-4 md:gap-6">
            {/* Download CV button */}
            {cvUrl && (
              <a
                href={getCvDownloadUrl(cvUrl)}
                download
                className="bg-primary text-white px-6 py-2 md:px-9 md:py-3 xl:px-10 xl:py-3 xl:text-lg rounded-full font-futura font-book text-sm md:text-xl whitespace-nowrap transition-all duration-1000 cursor-pointer hover:bg-white hover:text-primary border border-primary"
              >
                Download CV
              </a>
            )}

            {/* Contact Me button */}
            <a
              href="#contact"
              data-animate
              className="border border-primary text-primary px-6 py-2 md:px-9 md:py-3 xl:px-10 xl:py-3 xl:text-lg rounded-full font-futura font-book text-sm md:text-xl whitespace-nowrap transition-all duration-1000 cursor-pointer hover:bg-primary hover:text-white"
              style={{
                opacity: 0,
                transform: 'translateX(30px)',
                transitionDelay: '200ms',
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
