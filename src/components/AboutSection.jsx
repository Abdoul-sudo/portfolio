import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/about.css';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const expertiseRef = useRef([]);

  const expertiseData = [
    {
      title: 'Game Development',
      skills: ['Unity', 'Godot', '2D gameplay systems', 'Multiplayer', 'Shipping to Itch.io']
    },
    {
      title: 'Web & AI Tools',
      skills: ['React', 'Next.js', 'Full-stack', 'AI automation & integrations']
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
      gsap.set([titleRef.current, descriptionRef.current, ...expertiseRef.current], {
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
        descriptionRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        },
        '-=0.4'
      )
      .from(
        expertiseRef.current,
        {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.5,
          ease: 'power2.out'
        },
        '-=0.3'
      );
  };

  return (
    <section className="about-section section" id="about" ref={sectionRef}>
      <div className="about-content container">
        <h2 className="about-title" ref={titleRef}>
          About
        </h2>

        <div className="about-description" ref={descriptionRef}>
          <p>
            I'm a passionate Full-Stack developer with 4 years of experience building games,
            AI automation, and web experiences.
          </p>
          <p>
            From competitive multiplayer games to hackathon-winning AI platforms,
            I create digital solutions that engage and inspire.
          </p>
        </div>

        <div className="expertise-grid">
          {expertiseData.map((expertise, index) => (
            <div
              key={expertise.title}
              className="expertise-block interactive"
              ref={(el) => (expertiseRef.current[index] = el)}
            >
              <h3 className="expertise-title">{expertise.title}</h3>
              <ul className="expertise-skills">
                {expertise.skills.map(skill => (
                  <li key={skill} className="skill-badge">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
