import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { projectsData } from '../data/projects';
import '../styles/work.css';

const WorkSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateIn();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateIn = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([titleRef.current, ...projectsRef.current], {
        opacity: 1,
        y: 0
      });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
      .fromTo(
        projectsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
  };

  const handleProjectClick = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="work-section section" id="work" ref={sectionRef}>
      <div className="work-content container">
        <div className="work-header">
          <h2 className="work-title" ref={titleRef}>
            WORK
          </h2>
          <span className="work-count">{projectsData.length}</span>
        </div>

        <div className="work-list">
          {projectsData.map((project, index) => (
            <button
              key={project.id}
              className="work-item interactive"
              ref={(el) => (projectsRef.current[index] = el)}
              onClick={() => handleProjectClick(project.demo_link)}
            >
              <span className="work-item-arrow">→</span>
              <span className="work-item-name">{project.name}</span>
              <span className="work-item-type">
                {project.categories.includes('games') ? 'Game Development' : 'Web Development'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
