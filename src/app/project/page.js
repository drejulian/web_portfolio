'use client';
import { useEffect } from 'react';
import ProjectCard from '@/component/projectcard/page';

export default function Project() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) translateX(0)';
        }
      });
    }, observerOptions);

    document
      .querySelectorAll('[data-animate]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'IT Fest 4.0',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: '/svg/itfest.svg',
      link: '#',
    },
    {
      title: 'ASIG 16',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: '/png/asig.png',
      link: '#',
    },
    {
      title: 'HIMA Teknik Informatika',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: '/png/hima.png',
      link: '#',
    },
  ];

  return (
    <div className="mt-6">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1 w-full">
            <h1
              data-animate
              className="font-futura font-bold text-[30px] sm:text-[38px] md:text-[48px] text-primary text-center md:text-left transition-all duration-1000"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              Selected Work
            </h1>
          </div>

          <div
            data-animate
            className="transition-all duration-1000"
            style={{ opacity: 0, transform: 'translateX(20px)' }}
          >
            <button className="bg-primary px-8 py-2.5 md:px-10 md:py-3 rounded-full hover:bg-opacity-90 transition-all">
              <p className="text-white font-futura font-book text-sm md:text-base whitespace-nowrap">
                View All Works
              </p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
