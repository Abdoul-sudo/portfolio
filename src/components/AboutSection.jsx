import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/about.css';
import profilePhoto from '../assets/abdoul.jpg';
import cvPDF from '../assets/ISMAEL_Abdoul_Wahhaab_CV.pdf';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const expertiseRef = useRef([]);
  const ctaRef = useRef(null);

  const expertiseData = [
    {
      title: 'Game Development',
      skills: ['Unity', 'Godot', 'Game Design', 'Gameplay Programming']
    },
    {
      title: 'Web Development & AI Tools',
      skills: ['React', 'Next.js', 'N8N', 'AI Automation', 'Full-stack Development']
    }
  ];

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
      gsap.set([photoRef.current, titleRef.current, bioRef.current, ctaRef.current, ...expertiseRef.current], {
        opacity: 1,
        y: 0,
        scale: 1
      });
      return;
    }

    const tl = gsap.timeline();

    // Photo fade + scale
    tl.fromTo(photoRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    )
    // Title slide up with overlap
    .fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    // Bio fade in
    .fromTo(bioRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    // Expertise blocks stagger
    .fromTo(expertiseRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    // CTA button
    .fromTo(ctaRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    );
  };

  return (
    <section className="about-section section" id="about" ref={sectionRef}>
      <div className="about-content container">

        {/* Left Column - Photo + CTA */}
        <div className="about-left">
          <div className="about-photo-wrapper" ref={photoRef}>
            <img
              src={profilePhoto}
              alt="Abdoul Wahhaab ISMAEL"
              className="about-photo"
            />
          </div>

          <a
            href={cvPDF}
            download="ISMAEL_Abdoul_Wahhaab_CV.pdf"
            className="about-cta interactive"
            ref={ctaRef}
          >
            <span className="about-cta-icon">↓</span>
            <span className="about-cta-text">Download CV</span>
            <span className="about-cta-arrow">→</span>
          </a>
        </div>

        {/* Right Column - Content */}
        <div className="about-right">
          <h2 className="about-title" ref={titleRef}>
            ABOUT
          </h2>

          <div className="about-bio" ref={bioRef}>
            <p>
              I'm <span className="bio-highlight">Abdoul Wahhaab ISMAEL</span>, a polyvalent fullstack developer with <span className="bio-highlight">4 years of experience</span> across <span className="bio-highlight">web development</span>, <span className="bio-highlight">game development</span>, and <span className="bio-highlight">AI automations</span>. I create digital solutions that engage, inspire, and solve real-world problems.
            </p>
          </div>

          {/* Expertise - Compact Inline Style */}
          <div className="expertise-section">
            {expertiseData.map((expertise, index) => (
              <div
                key={expertise.title}
                className="expertise-item"
                ref={(el) => (expertiseRef.current[index] = el)}
              >
                <h3 className="expertise-title">{expertise.title}</h3>
                <div className="expertise-skills">
                  {expertise.skills.map(skill => (
                    <span key={skill} className="skill-badge interactive">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
