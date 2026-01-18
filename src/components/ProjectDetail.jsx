import { useEffect, useRef } from "react";
import { getTechIcon } from "../utils/techIcons";
import "../styles/projectDetail.css";

const ProjectDetail = ({ project, onBack }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

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
              <div className="pd-hero-image-wrapper">
                <img
                  src={project.cover}
                  alt={project.name}
                  className="pd-hero-image"
                />
              </div>

              <div className="pd-hero-info">
                <div className="pd-meta">
                  <span className="pd-category">{categoryLabel}</span>
                  <span className="pd-divider">·</span>
                  <span className="pd-year">{project.year}</span>
                </div>

                <h1 className="pd-title" id="project-title">
                  {project.name}
                </h1>

                <p className="pd-description">{project.description}</p>

                {/* Tech stack */}
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
            </div>

            {/* Project details section */}
            <div className="pd-details">
              {/* Problem / Approach / Result */}
              <div className="pd-sections">
                {project.problem && (
                  <div className="pd-section">
                    <div className="pd-section-label">The Challenge</div>
                    <p className="pd-section-text">{project.problem}</p>
                  </div>
                )}

                {project.approach && (
                  <div className="pd-section">
                    <div className="pd-section-label">The Approach</div>
                    <p className="pd-section-text">{project.approach}</p>
                  </div>
                )}

                {project.result && (
                  <div className="pd-section">
                    <div className="pd-section-label">The Outcome</div>
                    <p className="pd-section-text">{project.result}</p>
                  </div>
                )}
              </div>

              {/* Visit link */}
              {project.demo_link && (
                <div className="pd-cta">
                  <a
                    href={project.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-visit-link"
                  >
                    <span className="pd-visit-text">Visit Project</span>
                    <span className="pd-visit-arrow">
                      <svg
                        width="20"
                        height="20"
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
            </div>

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
