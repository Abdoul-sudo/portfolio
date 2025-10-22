import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../styles/projectcard.css';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    const handleMouseMove = (e) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000
      });

      gsap.to(image, {
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const handleClick = () => {
    window.open(project.demo_link, '_blank', 'noopener,noreferrer');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={cardRef}
      className="project-card interactive"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.name} project`}
    >
      <div className="project-card-inner">
        <div className="project-image-wrapper">
          <img
            ref={imageRef}
            src={project.cover}
            alt={project.name}
            className="project-image"
            loading="lazy"
          />
          <div className="project-overlay">
            <span className="project-view-text">View Project</span>
          </div>
        </div>

        <div className="project-info">
          <h3 className="project-name">{project.name}</h3>
          <p className="project-description">{project.description}</p>

          <div className="project-techs">
            {project.techs.map(tech => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
