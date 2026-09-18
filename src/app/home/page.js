'use client';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
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

  return (
    <div>
      {/* Portfolio heading with overlapping photo */}
      <div className="relative flex justify-center mb-20 md:mb-32">
        <h1
          data-animate
          className="font-ragick text-[100px] sm:text-[50] md:text-[70] lg:text-[100px] xl:text-[130px] text-primary z-10 transition-all duration-1000"
          style={{ opacity: 0, transform: 'translateY(-30px)' }}
        >
          Portfolio
        </h1>

        {/* Hero photo overlapping the text */}
        <div
          data-animate
          className="absolute ml-30 md:mt-20 z-20 transition-all duration-1000"
          style={{ opacity: 0, transform: 'scale(0.85)' }}
        >
          <Image
            src="/svg/hero.svg"
            alt="Derbi Tri Julian"
            width={100}
            height={300}
            className="w-[100px] sm:w-[140px] md:w-[200px] lg:w-[250px] xl:w-[310px]"
            priority
          />
        </div>
      </div>

      {/* Content section: Text left, Badges right */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        {/* Left side: Text content */}
        <div
          data-animate
          className="flex-1 max-w-xl transition-all duration-1000"
          style={{ opacity: 0, transform: 'translateX(-50px)' }}
        >
          <p className="text-black font-futura font-book text-[16px] sm:text-[18px] md:text-[20px] mb-3">
            Hey, I am Derbi Tri Julian
          </p>
          <h2 className="text-primary font-ragick text-[24px] sm:text-[34px] md:text-[42px] lg:text-[52px] leading-[0.95]">
            WEB & MOBILE
            <br />
            DEVELOPER
          </h2>
          <p className="text-black font-futura font-book text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed">
            Building digital experiences that are functional,
            <br />
            intuitive, and easy to use.
          </p>
        </div>

        {/* Right side: Skill badges scattered at different heights */}
        <div
          data-animate
          className="hidden md:flex flex-shrink-0 md:w-auto transition-all duration-1000"
          style={{ opacity: 0, transform: 'translateX(50px)' }}
        >
          <div className="flex flex-col items-center gap-6 md:gap-8">
            {/* Download CV button */}
            <div
              data-animate
              className="bg-primary text-white px-6 py-2 md:px-8 md:py-2.5 rounded-full font-futura font-book text-sm md:text-base whitespace-nowrap transition-all duration-1000 cursor-pointer hover:bg-white hover:text-primary border border-primary"
              style={{
                opacity: 0,
                transform: 'translateX(30px)',
                transitionDelay: '100ms',
              }}
            >
              Download CV
            </div>

            {/* Contact Me button */}
            <div
              data-animate
              className="border border-primary text-primary px-6 py-2 md:px-8 md:py-2.5 rounded-full font-futura font-book text-sm md:text-base whitespace-nowrap transition-all duration-1000 cursor-pointer hover:bg-primary hover:text-white"
              style={{
                opacity: 0,
                transform: 'translateX(30px)',
                transitionDelay: '200ms',
              }}
            >
              Contact Me
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
