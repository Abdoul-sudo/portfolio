import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { projectsData } from '../data/projects';
import '../styles/work.css';

const WorkSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef([]);
  const imageRef = useRef(null);

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
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
      .fromTo(
        projectsRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
  };

  const handleProjectClick = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleProjectHover = (project) => {
    if (hoveredProject?.id !== project.id) {
      // Fade out current image
      if (imageRef.current && hoveredProject) {
        gsap.to(imageRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.inOut',
          onComplete: () => {
            setHoveredProject(project);
            // Fade in new image with slight delay
            gsap.fromTo(
              imageRef.current,
              { opacity: 0, scale: 0.98 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                delay: 0.1,
                ease: 'power2.inOut'
              }
            );
          }
        });
      } else {
        setHoveredProject(project);
        // First hover - animate in with delay
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.98 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              delay: 0.15,
              ease: 'power2.inOut'
            }
          );
        }
      }
    }
  };

  const handleProjectLeave = () => {
    // Keep last hovered project visible
  };

  return (
    <section className="work-section section" id="work" ref={sectionRef}>
      <div className="work-content-wrapper">
        {/* Left side - Image Preview - Only visible on hover */}
        {hoveredProject && (
          <div className="work-image-preview">
            <div className="work-image-container">
              <img
                src={hoveredProject.cover}
                alt={hoveredProject.name}
                className="work-preview-image"
                ref={imageRef}
              />
            </div>
            <div className="work-project-info">
              <h3 className="work-project-name">{hoveredProject.name}</h3>
              <p className="work-project-description">{hoveredProject.description}</p>
              <div className="work-project-techs">
                {hoveredProject.techs.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right side - Project List */}
        <div className="work-content">
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
                onMouseEnter={() => handleProjectHover(project)}
                onMouseLeave={handleProjectLeave}
              >
                <div className="work-item-content">
                  <div className="work-item-left">
                    <span className="work-item-arrow">→</span>
                    <span className="work-item-name">{project.name}</span>
                  </div>
                  <span className="work-item-type">
                    {project.categories.includes('games') ? 'Game Development' : 'Web Development'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
