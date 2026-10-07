'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectCard from '@/component/projectcard/page';
import ProjectModal from '@/component/projectmodal/page';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDetailClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const snapshot = await getDocs(
          query(collection(db, 'projects'), where('isSelected', '==', true))
        );
        setProjects(
          snapshot.docs
            .map((item) => ({ id: item.id, ...item.data() }))
            .sort((first, second) => (first.order || 0) - (second.order || 0))
        );
      } catch (error) {
        console.error('Unable to load selected projects:', error);
      }
    };

    loadProjects();
  }, []);

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
  }, [projects, currentIndex]);

  return (
    <div className="mt-10">
      <div className="grid gap-6">
        <div className="flex flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="flex-1">
            <h1
              data-animate
              className="font-futura font-bold text-[24px] sm:text-[32px] md:text-[48px] text-primary text-left transition-all duration-1000"
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
            <Link
              href="/works"
              className="inline-flex bg-primary px-5 py-1.5 md:px-8 md:py-2.5 rounded-full hover:bg-opacity-90 transition-all"
            >
              <p className="text-white font-futura font-book text-xs md:text-sm whitespace-nowrap">
                View All Works
              </p>
            </Link>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          {projects.length > 0 ? (
            <div className="relative" key={`carousel-${currentIndex}`}>
              <ProjectCard
                key={`mobile-project-${projects[currentIndex].id}-${currentIndex}`}
                project={{
                  ...projects[currentIndex],
                  image:
                    projects[currentIndex].image ||
                    projects[currentIndex].imageUrl,
                  imageUrls:
                    projects[currentIndex].imageUrls ||
                    (projects[currentIndex].imageUrl
                      ? [projects[currentIndex].imageUrl]
                      : []),
                  link:
                    projects[currentIndex].link ||
                    projects[currentIndex].projectUrl,
                }}
                onDetailClick={handleDetailClick}
              />

              {projects.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full hover:bg-opacity-90 transition-all shadow-lg z-10"
                    aria-label="Previous project"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full hover:bg-opacity-90 transition-all shadow-lg z-10"
                    aria-label="Next project"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  <div className="flex justify-center gap-2 mt-4">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300'}`}
                        aria-label={`Go to project ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              No projects available
            </p>
          )}
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={{
                ...project,
                image: project.image || project.imageUrl,
                imageUrls:
                  project.imageUrls ||
                  (project.imageUrl ? [project.imageUrl] : []),
                link: project.link || project.projectUrl,
              }}
              onDetailClick={handleDetailClick}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
