import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { projectsData } from '../data/projects';
import { getTechIcon } from '../utils/techIcons';
import '../styles/work.css';

const WorkSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef([]);

  // Filter configuration
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'games', label: 'Game' }
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.categories.includes(activeFilter));

  // Initialize on mount - set mobile state and default project
  useEffect(() => {
    const mobile = window.innerWidth <= 1024;
    setIsMobile(mobile);
    if (mobile && filteredProjects.length > 0) {
      setSelectedProject(filteredProjects[0]);
    }
  }, []); // Run once on mount

  // Update selected project when filter changes (mobile)
  useEffect(() => {
    if (isMobile && filteredProjects.length > 0) {
      // If current selection is not in filtered list, select first
      if (!selectedProject || !filteredProjects.find(p => p.id === selectedProject.id)) {
        setSelectedProject(filteredProjects[0]);
      }
    }
  }, [activeFilter, isMobile]);

  // Handle resize - update mobile state only
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      // Don't reset selectedProject on resize
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleProjectClick = (project, e) => {
    if (isMobile) {
      // On mobile, clicking project selects it (updates preview)
      e.preventDefault();
      setSelectedProject(project);
    } else {
      // On desktop, clicking opens the link
      if (project.demo_link) {
        window.open(project.demo_link, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleTouchStart = (project) => {
    if (isMobile) {
      // Haptic feedback if available
      if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }
      setSelectedProject(project);
    }
  };

  const handleImageClick = () => {
    // Clicking image opens currently selected/hovered project
    const activeProject = isMobile ? selectedProject : hoveredProject;
    if (activeProject?.demo_link) {
      window.open(activeProject.demo_link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleProjectHover = (project) => {
    if (!isMobile) {
      setHoveredProject(project);
    }
  };

  const handleProjectLeave = () => {
    if (!isMobile) {
      setHoveredProject(null);
    }
  };

  return (
    <section className="work-section section" id="work" ref={sectionRef}>
      <div className="work-content-wrapper">
        {/* Left side - Image Preview - Container always present but content hidden */}
        <div className="work-image-preview">
          <div
            className={`work-image-container ${isMobile && selectedProject ? 'clickable' : ''}`}
            onClick={handleImageClick}
            style={{ cursor: (isMobile && selectedProject) || hoveredProject ? 'pointer' : 'default' }}
          >
            {projectsData.map((project) => {
              const activeProject = isMobile ? selectedProject : hoveredProject;
              const isActive = activeProject?.id === project.id;

              return (
                <div
                  key={project.id}
                  className="work-image-wrapper"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                >
                  <div className="work-image-inner">
                    <img
                      src={project.cover}
                      alt={project.name}
                      className="work-preview-image"
                    />
                    {/* Overlay gradient for text readability */}
                    <div className="work-image-overlay"></div>
                    {/* Project info overlay */}
                    <div className="work-project-info-overlay">
                      <h3 className="work-project-name">{project.name}</h3>
                      <p className="work-project-description">{project.description}</p>
                      <div className="work-project-techs">
                        {project.techs.map((tech, i) => {
                          const icon = getTechIcon(tech);
                          return (
                            <span key={i} className="tech-badge">
                              {icon && (
                                icon.type === 'image' ? (
                                  <img src={icon.value} alt={tech} className="tech-icon" />
                                ) : (
                                  <icon.value className="tech-icon" />
                                )
                              )}
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* {hoveredProject && (
            <div className="work-project-info">
              <h3 className="work-project-name">{hoveredProject.name}</h3>
              <p className="work-project-description">{hoveredProject.description}</p>
              <div className="work-project-techs">
                {hoveredProject.techs.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          )} */}
        </div>

        {/* Right side - Project List */}
        <div className="work-content">
          <div className="work-header">
            <h2 className="work-title" ref={titleRef}>
              WORK
            </h2>
            <span className="work-count">{filteredProjects.length}</span>
          </div>

          {/* Filter buttons */}
          <div className="work-filters">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`work-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="work-list">
            {filteredProjects.map((project, index) => {
              const isSelected = isMobile && selectedProject?.id === project.id;

              return (
                <button
                  key={project.id}
                  className={`work-item interactive ${isSelected ? 'selected' : ''}`}
                  ref={(el) => (projectsRef.current[index] = el)}
                  onClick={(e) => handleProjectClick(project, e)}
                  onTouchStart={() => handleTouchStart(project)}
                  onMouseEnter={!isMobile ? () => handleProjectHover(project) : undefined}
                  onMouseLeave={!isMobile ? handleProjectLeave : undefined}
                  aria-pressed={isSelected}
                  role="button"
                >
                  <div className="work-item-content">
                    <div className="work-item-left">
                      <span className="work-item-arrow">→</span>
                      <span className="work-item-name">{project.name}</span>
                    </div>
                    <div className="work-item-right">
                      <span className="work-item-type">
                        {project.categories.includes('games') ? 'Game Development' : 'Web Development'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
