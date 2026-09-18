'use client';
import Image from 'next/image';

export default function ProjectCard({ project }) {
  return (
    <div
      data-animate
      className="w-full flex justify-center transition-all duration-1000"
      style={{ opacity: 0, transform: 'translateY(50px)' }}
    >
      <div className="bg-white rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.15)] overflow-hidden w-full max-w-full h-auto">
        <Image
          src={project.image}
          alt={project.title}
          width={651}
          height={373}
          className="w-full h-auto rounded-t-2xl"
        />
        <div className="px-7 py-7 grid gap-2">
          <p className="text-black font-futura font-bold text-xl md:text-2xl">
            {project.title}
          </p>
          <p className="text-black font-futura font-book text-sm md:text-base">
            {project.description}
          </p>
          <a
            href={project.link || '#'}
            className="flex items-center gap-3.5 w-fit hover:underline underline-offset-4 mt-2"
          >
            <p className="text-black font-futura font-book text-sm md:text-base">
              Detail
            </p>
            <Image
              src="/svg/arrow-detail.svg"
              alt="arrow detail"
              width={14}
              height={14}
            />
          </a>
          <div className="w-10 h-[1px] bg-black mt-1"></div>
        </div>
      </div>
    </div>
  );
}
