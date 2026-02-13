import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Cursor from './components/Cursor';
import Logo from './components/Logo';
import Menu from './components/Menu';
import ThemeToggle from './components/ThemeToggle';
import AudioToggle from './components/AudioToggle';
import { spatialAudio } from './utils/spatialAudio';
import NoiseBackground from './components/NoiseBackground';
import MetaballBackground from './components/MetaballBackground';
import MobileBalls from './components/MobileBalls';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import ContactSection from './components/ContactSection';
import ProjectDetail from './components/ProjectDetail';
import { getTheme } from './config/metaballThemes';
import { projectsData } from './data/projects';

// Import all styles
import './styles/base.css';
import './styles/app.css';

// Animatable children selectors for GSAP transitions
const SECTION_CHILDREN_SELECTOR = '.hero-line, .about-title, .about-description, .expertise-block, .work-header, .work-item, .contact-title, .contact-description, .contact-link-wrapper';

const AppNew = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Get theme from URL: / = dark, /light = light
  const getThemeFromURL = () => {
    const path = window.location.pathname;
    return path === '/light' ? 'light' : 'dark';
  };

  // Parse hash to get section and optional project ID
  const parseHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (!hash || hash === 'home') return { section: 'home', projectId: null };
    if (hash.startsWith('project/')) {
      const projectId = hash.replace('project/', '');
      return { section: 'project-detail', projectId };
    }
    if (['about', 'work', 'contact'].includes(hash)) {
      return { section: hash, projectId: null };
    }
    return { section: 'home', projectId: null };
  };

  // Get initial state from URL hash
  const initialState = parseHash();
  const initialSectionIndex = ['home', 'about', 'work', 'contact', 'project-detail'].indexOf(
    initialState.section
  );

  const [currentSection, setCurrentSection] = useState(initialSectionIndex >= 0 ? initialSectionIndex : 0);
  const [theme, setTheme] = useState(getThemeFromURL());
  const menuRef = useRef(null);

  const sections = ['home', 'about', 'work', 'contact', 'project-detail'];

  // Update URL hash (without triggering popstate)
  const updateHash = (sectionId, projectId = null) => {
    let hash = '';
    if (sectionId === 'home') {
      hash = '';
    } else if (sectionId === 'project-detail' && projectId) {
      hash = `#project/${projectId}`;
    } else {
      hash = `#${sectionId}`;
    }
    const url = window.location.pathname + hash;
    window.history.pushState({ section: sectionId, projectId }, '', url);
  };

  // Show correct section on mount (instant, no animation)
  useEffect(() => {
    const { section, projectId } = parseHash();
    const sectionIndex = sections.indexOf(section);

    // If project detail, set the project
    if (section === 'project-detail' && projectId) {
      const project = projectsData.find(p => p.id === projectId);
      if (project) {
        setSelectedProject(project);
      } else {
        // Project not found, fall back to home
        const homeEl = document.querySelector('#home');
        if (homeEl) {
          homeEl.classList.add('active');
          gsap.set(homeEl, { display: 'flex', opacity: 1 });
        }
        setCurrentSection(0);

        return;
      }
    }

    // Hide all sections, then show the target
    sections.forEach(s => {
      const el = document.querySelector(`#${s}`);
      if (el) gsap.set(el, { display: 'none', opacity: 0 });
    });

    const targetEl = document.querySelector(`#${section}`);
    if (targetEl) {
      targetEl.classList.add('active');
      gsap.set(targetEl, { display: 'flex', opacity: 1 });
      // Reset children to visible state, but skip home (it has its own entrance animation)
      if (section !== 'home') {
        const children = targetEl.querySelectorAll(SECTION_CHILDREN_SELECTOR);
        gsap.set(children, { y: 0, opacity: 1 });
      }
    }

    setCurrentSection(sectionIndex >= 0 ? sectionIndex : 0);
  }, []);

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = (e) => {
      setTheme(getThemeFromURL());

      const { section, projectId } = parseHash();
      const targetIndex = sections.indexOf(section);
      if (targetIndex === -1 || targetIndex === currentSection) return;

      // Set project if navigating to project detail
      if (section === 'project-detail' && projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (project) setSelectedProject(project);
      }

      // Use GSAP transition for back/forward too
      const currentEl = document.querySelector(`#${sections[currentSection]}`);
      const targetEl = document.querySelector(`#${section}`);
      if (!currentEl || !targetEl) return;

      setIsTransitioning(true);
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentSection(targetIndex);
          setIsTransitioning(false);
        }
      });

      tl.to(currentEl, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      tl.set(currentEl, { display: 'none' });
      tl.set(targetEl, { display: 'flex', opacity: 0 });
      tl.to(targetEl, { opacity: 1, duration: 0.3, ease: 'power2.out' });

      const targetChildren = targetEl.querySelectorAll(SECTION_CHILDREN_SELECTOR);
      tl.fromTo(targetChildren, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, '-=0.1');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentSection]);

  // Handle theme changes - update CSS variables and body background
  useEffect(() => {
    const themeConfig = getTheme(theme);

    // Update CSS custom properties for theme
    document.documentElement.style.setProperty('--text-color', themeConfig.textColor);
    document.documentElement.style.setProperty('--text-secondary-color', themeConfig.textSecondaryColor);
    document.documentElement.style.setProperty('--background-color', themeConfig.bodyBackgroundColor);

    // Update html background for mobile overscroll, body stays transparent
    document.documentElement.style.backgroundColor = themeConfig.bodyBackgroundColor;
    document.documentElement.setAttribute('data-theme', theme);
    document.body.style.backgroundColor = 'transparent';
    document.body.style.color = themeConfig.textColor;
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    // Update URL without reload, preserve hash
    const newPath = newTheme === 'light' ? '/light' : '/';
    window.history.pushState({}, '', newPath + window.location.hash);
    setTheme(newTheme);
  };

  const transitionToSection = (targetSectionId, { pushState = true } = {}) => {
    const targetIndex = sections.indexOf(targetSectionId);

    if (targetIndex === -1 || targetIndex === currentSection || isTransitioning) {
      return;
    }

    // Fade out any playing audio when changing sections
    spatialAudio.fadeAllSounds();

    // Update URL hash
    if (pushState) {
      updateHash(targetSectionId, targetSectionId === 'project-detail' ? selectedProject?.id : null);
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
    const currentChildren = currentEl.querySelectorAll(SECTION_CHILDREN_SELECTOR);

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
    const targetChildren = targetEl.querySelectorAll(SECTION_CHILDREN_SELECTOR);

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

  // Open project detail page
  const openProjectDetail = (project) => {
    setSelectedProject(project);
    updateHash('project-detail', project.id);
    transitionToSection('project-detail', { pushState: false });
  };

  // Go back from project detail to work section
  const closeProjectDetail = () => {
    setSelectedProject(null);
    updateHash('work');
    transitionToSection('work', { pushState: false });
  };

  // Get next project - sorted by type (web, then games) and alphabetically within each type
  const getNextProject = () => {
    if (!selectedProject) return null;

    // Sort projects: web first (alphabetically), then games (alphabetically)
    const sortedProjects = [...projectsData].sort((a, b) => {
      const aIsWeb = a.categories?.includes('web');
      const bIsWeb = b.categories?.includes('web');

      // Web projects come first
      if (aIsWeb && !bIsWeb) return -1;
      if (!aIsWeb && bIsWeb) return 1;

      // Within same type, sort alphabetically
      return a.name.localeCompare(b.name);
    });

    const currentIndex = sortedProjects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % sortedProjects.length;
    return sortedProjects[nextIndex];
  };

  // Navigate to next project
  const navigateToProject = (project) => {
    // Scroll to top
    const scrollWrapper = document.querySelector('.project-detail-scroll-wrapper');
    if (scrollWrapper) {
      scrollWrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Short delay to let scroll start, then change project
    setTimeout(() => {
      setSelectedProject(project);
      updateHash('project-detail', project.id);
    }, 100);
  };

  return (
    <>
      <NoiseBackground theme={theme} />
      {/* Key prop forces remount when theme changes for proper shader initialization */}
      <MetaballBackground
        key={theme}
        currentSection={sections[currentSection]}
        theme={theme}
      />
      {/* CSS balls for mobile - replaces WebGL for better appearance */}
      <MobileBalls
        currentSection={sections[currentSection]}
        theme={theme}
      />
      <div className="app">
        <Cursor />
        <Logo onNavigate={transitionToSection} menuRef={menuRef} theme={theme} />
        {sections[currentSection] !== 'project-detail' && (
          <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} />
        )}
        <AudioToggle />
        <Menu ref={menuRef} onNavigate={transitionToSection} currentSection={sections[currentSection]} theme={theme} onThemeChange={handleThemeChange} />

        <main className="main-content">
          <HeroSection onNavigate={transitionToSection} />
          <AboutSection />
          <WorkSection onProjectClick={openProjectDetail} />
          <ContactSection />
          <ProjectDetail
            project={selectedProject}
            onBack={closeProjectDetail}
            nextProject={getNextProject()}
            onNavigateToProject={navigateToProject}
          />
        </main>
      </div>
    </>
  );
};

export default AppNew;
