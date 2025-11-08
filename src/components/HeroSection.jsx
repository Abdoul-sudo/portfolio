import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { splitTextIntoChars } from '../utils/splitText';
import '../styles/hero.css';

const HeroSection = ({ onNavigate }) => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line1bRef = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const ctasRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Just show everything immediately
      gsap.set([line1Ref.current, line1bRef.current, line2Ref.current, line3Ref.current, ctasRef.current], {
        y: 0,
        opacity: 1
      });
      return;
    }

    // Split main heading into characters for sophisticated animation
    const chars1 = splitTextIntoChars(line1Ref.current);
    const chars1b = splitTextIntoChars(line1bRef.current);
    const chars = [...chars1, ...chars1b];

    // Create master timeline with smooth overlapping animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate each character with stagger and variations
    tl.to(chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      stagger: {
        each: 0.03,
        from: 'start',
        ease: 'power2.inOut'
      },
      ease: 'back.out(1.5)', // Adds slight bounce for organic feel
    })
      // Add subtle rotation variation to some characters
      .to(chars.filter((_, i) => i % 3 === 0), {
        rotateZ: '2deg',
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.6')
      .to(chars.filter((_, i) => i % 3 === 1), {
        rotateZ: '-2deg',
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.6')
      // Reset rotation for clean state
      .to(chars, {
        rotateZ: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.3')
      // Tagline with sophisticated reveal
      .fromTo(line2Ref.current,
        {
          y: -60,
          opacity: 0,
          scale: 0.9,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out'
        },
        '-=0.4'
      )
      // Description with complementary motion
      .fromTo(line3Ref.current,
        {
          y: -40,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.6'
      )
      // CTAs with magnetic entrance
      .fromTo(ctasRef.current,
        {
          y: -30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out'
        },
        '-=0.5'
      );
  }, []);

  return (
      <section className='hero-section section' id='home' ref={heroRef}>
          <div className='hero-content'>
              <div className='hero-lines'>
                  <div className='hero-name-wrapper'>
                      <h1 className='hero-line hero-line-1' ref={line1Ref}>
                          Hey, I'm
                      </h1>
                      <h1 className='hero-line hero-line-1b' ref={line1bRef}>
                          Abdoul Wahhaab
                      </h1>
                  </div>
                  <h1 className='hero-line hero-line-2' ref={line2Ref}>
                      I'm a Full-Stack Developer
                  </h1>
                  <h1 className='hero-line hero-line-3' ref={line3Ref}>
                      I build Web, Games & AI-powered experiences
                  </h1>
              </div>

              <div className='hero-ctas' ref={ctasRef}>
                  <button onClick={() => onNavigate?.('work')} className='hero-cta interactive'>
                      <svg className='hero-cta-arrow' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M5 12H19M19 12L12 5M19 12L12 19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                      <span>see my projects</span>
                  </button>
                  <button onClick={() => onNavigate?.('about')} className='hero-cta interactive'>
                      <svg className='hero-cta-arrow' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M5 12H19M19 12L12 5M19 12L12 19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                      <span>more about me</span>
                  </button>
              </div>
          </div>
      </section>
  );
};

export default HeroSection;
