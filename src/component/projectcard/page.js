'use client';
import Image from 'next/image';

export default function ProjectCard({ project, onDetailClick }) {
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
            className="w-full h-auto rounded-t-2xl"
          />
        ) : (
          <div className="w-full h-[373px] bg-gray-200 flex items-center justify-center rounded-t-2xl">
            <p className="text-gray-400 font-futura text-lg">No Image</p>
          </div>
        )}
        <div className="px-7 py-7 grid gap-2">
          <p className="text-black font-futura font-bold text-xl md:text-2xl">
            {project.title}
          </p>
          <p className="text-black font-futura font-book text-sm md:text-base line-clamp-3">
            {project.description}
          </p>
          <button
            onClick={() => onDetailClick(project)}
            className="flex items-center gap-3.5 w-fit hover:underline underline-offset-4 mt-2 cursor-pointer"
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
          </button>
          <div className="w-10 h-[1px] bg-black mt-1"></div>
        </div>
      </div>
    </div>
  );
}
