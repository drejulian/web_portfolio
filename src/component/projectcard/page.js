'use client';
import Image from 'next/image';

export default function ProjectCard({ project, onDetailClick, compact = false }) {
  const displayImage = project.imageUrls?.[0] || project.image;

  return (
    <div
      data-animate
      className="w-full flex justify-center transition-all duration-1000"
      style={{ opacity: 0, transform: 'translateY(50px)' }}
    >
      <div className="bg-white rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.15)] overflow-hidden w-full max-w-full h-auto">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={project.title}
            width={651}
            height={373}
            className={`w-full rounded-t-2xl ${compact ? 'aspect-[4/3] object-cover' : 'h-auto'}`}
          />
        ) : (
          <div
            className={`w-full bg-gray-200 flex items-center justify-center rounded-t-2xl ${compact ? 'aspect-[4/3]' : 'h-[373px]'}`}
          >
            <p className="text-gray-400 font-futura text-sm md:text-lg">
              No Image
            </p>
          </div>
        )}
        <div
          className={`grid gap-2 ${compact ? 'px-3 py-3 sm:px-4 sm:py-4 md:px-5' : 'px-7 py-7'}`}
        >
          <p
            className={`text-black font-futura font-bold ${compact ? 'line-clamp-2 text-sm sm:text-base md:text-lg' : 'text-xl md:text-2xl'}`}
          >
            {project.title}
          </p>
          <p
            className={`text-black font-futura font-book line-clamp-3 ${compact ? 'text-[11px] leading-relaxed sm:text-xs md:text-sm' : 'text-sm md:text-base'}`}
          >
            {project.description}
          </p>
          <button
            onClick={() => onDetailClick(project)}
            className={`flex items-center w-fit hover:underline underline-offset-4 mt-2 cursor-pointer ${compact ? 'gap-2' : 'gap-3.5'}`}
          >
            <p
              className={`text-black font-futura font-book ${compact ? 'text-xs sm:text-sm' : 'text-sm md:text-base'}`}
            >
              Detail
            </p>
            <Image
              src="/svg/arrow-detail.svg"
              alt="arrow detail"
              width={14}
              height={14}
            />
          </button>
          <div className="w-10 h-[1px] bg-black mt-1"></div>
        </div>
      </div>
    </div>
  );
}
