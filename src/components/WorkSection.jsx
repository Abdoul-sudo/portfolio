import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { projectCategories, projectsData, filterProjects, shouldShowCategory } from '../data/projects';
import ProjectCard from './ProjectCard';
import '../styles/work.css';

const WorkSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayedProjects, setDisplayedProjects] = useState(projectsData);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const gridRef = useRef(null);

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
      gsap.set([titleRef.current, filtersRef.current, gridRef.current], {
        opacity: 1,
        y: 0
      });
      return;
    }

    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    })
      .from(
        filtersRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out'
        },
        '-=0.4'
      )
      .from(
        gridRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out'
        },
        '-=0.3'
      );
  };

  const handleFilterChange = (categoryId) => {
    if (categoryId === activeCategory) return;

    const cards = gsap.utils.toArray('.project-card');

    gsap.to(cards, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => {
        setActiveCategory(categoryId);
        const filtered = filterProjects(categoryId);
        setDisplayedProjects(filtered);

        // Animate new cards in
        setTimeout(() => {
          const newCards = gsap.utils.toArray('.project-card');
          gsap.fromTo(
            newCards,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.03,
              ease: 'power2.out'
            }
          );
        }, 50);
      }
    });
  };

  const visibleCategories = projectCategories.filter(cat => shouldShowCategory(cat.id));

  return (
    <section className="work-section section" id="work" ref={sectionRef}>
      <div className="work-content container">
        <h2 className="work-title" ref={titleRef}>
          Work
        </h2>

        <div className="work-filters" ref={filtersRef}>
          {visibleCategories.map(category => (
            <button
              key={category.id}
              className={`filter-btn interactive ${
                activeCategory === category.id ? 'active' : ''
              }`}
              onClick={() => handleFilterChange(category.id)}
              aria-pressed={activeCategory === category.id}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="projects-grid" ref={gridRef}>
          {displayedProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
