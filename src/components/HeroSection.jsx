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

    // Create overlapping timeline animation
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: 'power2.out' }
    });

    tl.from(line1Ref.current, { y: 100, opacity: 0 })
      .from(line2Ref.current, { y: 100, opacity: 0 }, '-=0.6')
      .from(line3Ref.current, { y: 100, opacity: 0 }, '-=0.6')
      .from(line4Ref.current, { y: 100, opacity: 0 }, '-=0.6');
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
