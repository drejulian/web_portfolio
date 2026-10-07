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

  const handleDetailClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
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
  }, [projects]);

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

        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:hidden">
          {projects.length > 0 ? (
            projects.slice(0, 4).map((project) => (
              <ProjectCard
                key={project.id}
                compact
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
            ))
          ) : (
            <p className="col-span-2 py-10 text-center text-gray-500 md:col-span-3">
              No projects available
            </p>
          )}
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 justify-items-center">
          {projects.slice(0, 3).map((project) => (
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
