import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Cursor from './components/Cursor';
import Logo from './components/Logo';
import Menu from './components/Menu';
import MetaballBackground from './components/MetaballBackground';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import ContactSection from './components/ContactSection';

// Import all styles
import './styles/base.css';
import './styles/app.css';

const AppNew = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const menuRef = useRef(null);

  const sections = ['home', 'about', 'work', 'contact'];

  // Show home section on mount
  useEffect(() => {
    const homeSection = document.querySelector('#home');
    if (homeSection) {
      homeSection.classList.add('active');
      gsap.set(homeSection, { display: 'flex', opacity: 1 });
    }
  }, []);

  const transitionToSection = (targetSectionId) => {
    const targetIndex = sections.indexOf(targetSectionId);

    if (targetIndex === -1 || targetIndex === currentSection || isTransitioning) {
      return;
    }

    setIsTransitioning(true);

    // Select sections directly by ID
    const currentEl = document.querySelector(`#${sections[currentSection]}`);
    const targetEl = document.querySelector(`#${targetSectionId}`);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSection(targetIndex);
        setIsTransitioning(false);
      }
    });

    // Animate all children out (bottom to top)
    const currentChildren = currentEl.querySelectorAll('.hero-line, .about-title, .about-description, .expertise-block, .work-header, .work-item, .contact-title, .contact-description, .contact-link-wrapper');

    tl.to(currentChildren, {
      y: -60,
      opacity: 0,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.in'
    });

    // Fade out section
    tl.to(currentEl, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, '-=0.2');

    // Switch visibility
    tl.set(currentEl, { display: 'none' });
    tl.set(targetEl, { display: 'flex', opacity: 0 });

    // Fade in new section
    tl.to(targetEl, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Animate all children in (top to bottom)
    const targetChildren = targetEl.querySelectorAll('.hero-line, .about-title, .about-description, .expertise-block, .work-header, .work-item, .contact-title, .contact-description, .contact-link-wrapper');

    tl.fromTo(
      targetChildren,
      { y: -60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
      },
      '-=0.1'
    );
  };

  return (
    <>
      <MetaballBackground />
      <div className="app">
        <Cursor />
        <Logo onNavigate={transitionToSection} menuRef={menuRef} />
        <Menu ref={menuRef} onNavigate={transitionToSection} currentSection={sections[currentSection]} />

        <main className="main-content">
          <HeroSection onNavigate={transitionToSection} />
          <AboutSection />
          <WorkSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
};

export default AppNew;
