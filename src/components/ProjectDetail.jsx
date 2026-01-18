import { useEffect, useRef } from "react";
import { getTechIcon } from "../utils/techIcons";
import { HiArrowUpRight } from "react-icons/hi2";
import "../styles/projectDetail.css";

const ProjectDetail = ({ project, onBack }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
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

    // Scroll to top when component mounts with a project
    if (project) {
      window.scrollTo(0, 0);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onBack, project]);

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
        <div className="project-detail-scroll-wrapper">
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

            {/* Project Story - Editorial Style */}
            <article className="pd-story">
              {/* The narrative content */}
              {(project.problem || project.approach || project.result) && (
                <div className="pd-narrative">
                  {project.problem && (
                    <div className="pd-narrative-block">
                      <span className="pd-narrative-label">Challenge</span>
                      <p className="pd-narrative-text">{project.problem}</p>
                    </div>
                  )}

                  {project.approach && (
                    <div className="pd-narrative-block">
                      <span className="pd-narrative-label">Approach</span>
                      <p className="pd-narrative-text">{project.approach}</p>
                    </div>
                  )}

                  {project.result && (
                    <div className="pd-narrative-block">
                      <span className="pd-narrative-label">Outcome</span>
                      <p className="pd-narrative-text">{project.result}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Visit link - refined CTA */}
              {project.demo_link && (
                <div className="pd-cta">
                  <a
                    href={project.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-visit-link"
                  >
                    <span className="pd-visit-text">View Live Project</span>
                    <span className="pd-visit-arrow">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </a>
                </div>
              )}
            </article>

            {/* Screenshots gallery - placeholder for future */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="pd-gallery">
                <div className="pd-gallery-label">Gallery</div>
                <div className="pd-gallery-grid">
                  {project.screenshots.map((screenshot, i) => (
                    <div key={i} className="pd-gallery-item">
                      <img
                        src={screenshot}
                        alt={`${project.name} screenshot ${i + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectDetail;
