import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/hero.css';

const HeroSection = () => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Just show everything immediately
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current], {
        y: 0,
        opacity: 1
      });
      return;
    }

    // Create overlapping timeline animation - text comes from TOP down (Sharlee-style)
    const tl = gsap.timeline();

    tl.fromTo(line1Ref.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
    )
      .fromTo(line2Ref.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(line3Ref.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(line4Ref.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      );
  }, []);

  return (
    <section className="hero-section section" id="home" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-lines">
          <h1 className="hero-line hero-line-1" ref={line1Ref}>
            Hey, I'm Abdoul
          </h1>
          <h1 className="hero-line hero-line-2" ref={line2Ref}>
            But you can call me Code Architect
          </h1>
          <h1 className="hero-line hero-line-3" ref={line3Ref}>
            I build games & AI-powered experiences
          </h1>
          <h1 className="hero-line hero-line-4" ref={line4Ref}>
            Turning ideas into interactive realities
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
