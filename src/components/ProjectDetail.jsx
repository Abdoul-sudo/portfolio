import { useEffect, useRef } from "react";
import { getTechIcon } from "../utils/techIcons";
import { HiArrowUpRight } from "react-icons/hi2";
import "../styles/projectDetail.css";

const ProjectDetail = ({ project, onBack, nextProject, onNavigateToProject }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const cursorLabelRef = useRef(null);

  // Handle escape key to go back
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && project) {
        onBack();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onBack, project]);

  // Scroll to top when project changes
  useEffect(() => {
    if (project && scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [project?.id]);

  // Handle cursor following on image hover with delay
  useEffect(() => {
    const wrapper = imageWrapperRef.current;
    const label = cursorLabelRef.current;

    if (!wrapper || !label) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationId = null;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);

      label.style.left = `${currentX}px`;
      label.style.top = `${currentY}px`;

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseenter", handleMouseEnter);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseenter", handleMouseEnter);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [project]);

  const categoryLabel = project?.categories?.includes("games")
    ? "Game Development"
    : "Web Development";

  return (
    <section
      className="project-detail-section section"
      id="project-detail"
      ref={sectionRef}
    >
      {/* Static blurred metaball shapes - fixed position */}
      <div className="project-detail-bg">
        <div className="pd-blob pd-blob-1"></div>
        <div className="pd-blob pd-blob-2"></div>
        <div className="pd-blob pd-blob-3"></div>
        <div className="pd-blob pd-blob-4"></div>
      </div>

      {/* Scrollable content wrapper */}
      {project && (
        <div className="project-detail-scroll-wrapper" ref={scrollWrapperRef}>
          {/* Main content */}
          <div className="project-detail-content" ref={contentRef}>
            {/* Hero section with image */}
            <div className="pd-hero">
              {project.demo_link ? (
                <a
                  href={project.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-hero-image-wrapper"
                  ref={imageWrapperRef}
                >
                  <img
                    src={project.cover}
                    alt={project.name}
                    className="pd-hero-image"
                  />
                  <div className="pd-hero-overlay"></div>
                  <span className="pd-hero-cursor-label" ref={cursorLabelRef}>
                    <HiArrowUpRight />
                  </span>
                </a>
              ) : (
                <div className="pd-hero-image-wrapper">
                  <img
                    src={project.cover}
                    alt={project.name}
                    className="pd-hero-image"
                  />
                </div>
              )}

              <div className="pd-hero-info">
                {/* Meta row with category/year and tech stack */}
                <div className="pd-meta-row">
                  <div className="pd-meta">
                    <span className="pd-category">{categoryLabel}</span>
                    <span className="pd-divider">·</span>
                    <span className="pd-year">{project.year}</span>
                  </div>

                  <div className="pd-techs">
                    {project.techs.map((tech, i) => {
                      const icon = getTechIcon(tech);
                      return (
                        <span key={i} className="pd-tech-badge">
                          {icon &&
                            (icon.type === "image" ? (
                              <img
                                src={icon.value}
                                alt={tech}
                                className="pd-tech-icon"
                              />
                            ) : (
                              <icon.value className="pd-tech-icon" />
                            ))}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="pd-title-row">
                  <h1 className="pd-title" id="project-title">
                    {project.name}
                  </h1>
                  {project.demo_link && (
                    <a
                      href={project.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pd-title-link"
                    >
                      <span className="pd-title-link-text">View Live Project</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                </div>

                <p className="pd-description">{project.description}</p>
              </div>
            </div>

            {/* Project Details */}
            <article className="pd-story">
              {/* Inspiration section */}
              {project.inspiration && (
                <div className="pd-section-block">
                  <span className="pd-section-label">Inspiration</span>
                  <p className="pd-section-text">{project.inspiration}</p>
                </div>
              )}

              {/* Features section */}
              {project.features && project.features.length > 0 && (
                <div className="pd-features">
                  <span className="pd-section-label">What you can do</span>
                  <div className="pd-feature-rows">
                    {project.features.map((feature, i) => (
                      <div key={i} className="pd-feature-row">
                        {feature.image && (
                          <div className="pd-feature-image">
                            <img
                              src={feature.image}
                              alt={feature.title || `Feature ${i + 1}`}
                            />
                          </div>
                        )}
                        <div className="pd-feature-content">
                          <div className="pd-feature-header">
                            {feature.title && (
                              <h3 className="pd-feature-title">{feature.title}</h3>
                            )}
                            <span className="pd-feature-number">{String(i + 1).padStart(2, '0')}</span>
                          </div>
                          {feature.description && (
                            <p className="pd-feature-desc">{feature.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Section - Next Project */}
              <div className="pd-footer">
                {/* Next Project Navigation */}
                {nextProject && (
                  <button
                    className="pd-next-card"
                    onClick={() => onNavigateToProject(nextProject)}
                  >
                    <div className="pd-next-info">
                      <span className="pd-next-label">Next Project</span>
                      <span className="pd-next-name">{nextProject.name}</span>
                      <span className="pd-next-desc">{nextProject.description}</span>
                    </div>
                    <div className="pd-next-preview">
                      <img src={nextProject.cover} alt={nextProject.name} />
                    </div>
                  </button>
                )}
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectDetail;
