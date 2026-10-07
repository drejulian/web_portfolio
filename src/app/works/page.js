'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectCard from '@/component/projectcard/page';
import ProjectModal from '@/component/projectmodal/page';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function WorksPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      let snapshot;

      try {
        snapshot = await getDocs(collection(db, 'projects'));
      } catch (loadError) {
        if (loadError.code !== 'permission-denied') {
          throw loadError;
        }

        snapshot = await getDocs(
          query(collection(db, 'projects'), where('isSelected', '==', true))
        );
      }

      setProjects(
        snapshot.docs
          .map((item) => ({ id: item.id, ...item.data() }))
          .sort((first, second) => (first.order || 0) - (second.order || 0))
      );
    } catch (loadError) {
      console.error('Unable to load projects:', loadError);
      setError('Project belum dapat dimuat. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document
      .querySelectorAll('[data-animate]')
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [projects]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section className="min-h-[70vh] pt-8 pb-20 sm:pt-12 md:pb-28">
      <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/#project"
            className="mb-8 inline-flex items-center gap-2 font-futura text-sm text-primary transition-transform hover:-translate-x-1"
          >
            <span aria-hidden="true">←</span>
            Back to portfolio
          </Link>
          <p className="mb-3 font-futura text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Selected ideas, made real
          </p>
          <h1 className="font-futura text-4xl font-bold text-primary sm:text-5xl md:text-6xl">
            All Works
          </h1>
          <p className="mt-4 max-w-2xl font-futura text-sm leading-relaxed text-gray-600 sm:text-base">
            A collection of projects I have designed, built, and explored.
          </p>
        </div>

        {!isLoading && !error && (
          <div className="flex w-fit items-center gap-3 rounded-full border border-primary/15 bg-primary/5 px-4 py-2">
            <span className="font-futura text-2xl font-bold text-primary">
              {projects.length}
            </span>
            <span className="font-futura text-xs text-gray-600 sm:text-sm">
              {projects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="h-[390px] animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center"
        >
          <p className="font-futura text-gray-700">{error}</p>
          <button
            type="button"
            onClick={loadProjects}
            className="mt-5 rounded-full bg-primary px-6 py-2.5 font-futura text-sm text-white transition-opacity hover:opacity-90"
          >
            Coba lagi
          </button>
        </div>
      ) : projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
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
              onDetailClick={(projectDetails) => {
                setSelectedProject(projectDetails);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-primary/20 px-6 py-16 text-center">
          <Image
            src="/svg/arrow-detail.svg"
            alt=""
            width={28}
            height={28}
            className="mb-4 rotate-90 opacity-60"
          />
          <h2 className="font-futura text-xl font-bold text-primary">
            No projects yet
          </h2>
          <p className="mt-2 font-futura text-sm text-gray-500">
            Please check back soon to see the latest work.
          </p>
        </div>
      )}

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
