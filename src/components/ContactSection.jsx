import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/contact.css';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const linksRef = useRef([]);

  const contactLinks = [
    {
      label: 'Email',
      href: 'mailto:abdoulwahhaab@gmail.com',
      text: 'abdoulwahhaab@gmail.com'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/Abdoul-sudo',
      text: 'github.com/Abdoul-sudo'
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/abdoul-wahhaab',
      text: 'linkedin.com/in/abdoul-wahhaab'
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
      gsap.set([titleRef.current, contentRef.current, ...linksRef.current], {
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
        contentRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out'
        },
        '-=0.4'
      )
      .from(
        linksRef.current,
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power2.out'
        },
        '-=0.3'
      );
  };

  return (
    <section className="contact-section section" id="contact" ref={sectionRef}>
      <div className="contact-content container">
        <h2 className="contact-title" ref={titleRef}>
          Let's Connect
        </h2>

        <p className="contact-description" ref={contentRef}>
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        <div className="contact-links">
          {contactLinks.map((link, index) => (
            <div
              key={link.label}
              className="contact-link-wrapper"
              ref={(el) => (linksRef.current[index] = el)}
            >
              <span className="contact-label">{link.label}</span>
              <a
                href={link.href}
                className="contact-link interactive"
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.text}
              </a>
            </div>
          ))}
        </div>

        <footer className="contact-footer">
          <p>&copy; {new Date().getFullYear()} Abdoul Wahhaab. Built with passion and code.</p>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
