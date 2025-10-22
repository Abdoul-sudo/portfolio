import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Cursor from './components/Cursor';
import Menu from './components/Menu';
import AnimatedBackground from './components/AnimatedBackground';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import ContactSection from './components/ContactSection';

// Import all styles
import './styles/base.css';
import './styles/app.css';

const AppNew = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionsRef = useRef({});

  const sections = ['home', 'about', 'work', 'contact'];

  useEffect(() => {
    // Smooth scroll to section on load or hash change
    const hash = window.location.hash.slice(1);
    if (hash && sections.includes(hash)) {
      setTimeout(() => {
        navigateToSection(hash);
      }, 100);
    }
  }, []);

  const navigateToSection = (sectionId) => {
    if (isTransitioning || sectionId === currentSection) return;

    setIsTransitioning(true);
    const targetSection = sectionsRef.current[sectionId];

    if (targetSection) {
      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update current section after transition
      setTimeout(() => {
        setCurrentSection(sectionId);
        setIsTransitioning(false);
        window.history.pushState(null, '', `#${sectionId}`);
      }, 600);
    }
  };

  // Track which section is currently in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isTransitioning) {
          const sectionId = entry.target.id;
          setCurrentSection(sectionId);
          window.history.replaceState(null, '', `#${sectionId}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isTransitioning]);

  return (
    <div className="app">
      <Cursor />
      <AnimatedBackground />
      <Menu onNavigate={navigateToSection} currentSection={currentSection} />

      <main className="main-content">
        <div ref={(el) => (sectionsRef.current.home = el)}>
          <HeroSection />
        </div>

        <div ref={(el) => (sectionsRef.current.about = el)}>
          <AboutSection />
        </div>

        <div ref={(el) => (sectionsRef.current.work = el)}>
          <WorkSection />
        </div>

        <div ref={(el) => (sectionsRef.current.contact = el)}>
          <ContactSection />
        </div>
      </main>
    </div>
  );
};

export default AppNew;
