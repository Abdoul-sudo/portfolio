import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import '../styles/contact.css';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const linksRef = useRef([]);

  const mailLinks = [
    {
      href: 'mailto:ismaelabdoul7@gmail.com',
      text: 'ismaelabdoul7@gmail.com'
    }
  ];

  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/abdoul-wahhaab',
      text: 'linkedin'
    },
    {
      href: 'https://github.com/Abdoul-sudo',
      text: 'github'
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
      gsap.set([titleRef.current], {
        opacity: 1,
        y: 0
      });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
      .fromTo(
        '.contact-grid > *',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
  };

  return (
    <section className="contact-section section" id="contact" ref={sectionRef}>
      <div className="contact-content">
        <h2 className="contact-title" ref={titleRef}>
          CONTACT
        </h2>
        <div className="contact-divider"></div>

        <div className="contact-grid">
          {/* Mail Section */}
          <div className="contact-column">
            <h3 className="contact-column-title">MAIL</h3>
            <div className="contact-links">
              {mailLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="contact-link interactive"
                >
                  <span className="contact-arrow">↗</span>
                  <span className="contact-text">{link.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Social Medias Section */}
          <div className="contact-column">
            <h3 className="contact-column-title">SOCIAL MEDIAS</h3>
            <div className="contact-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="contact-link interactive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-arrow">↗</span>
                  <span className="contact-text">{link.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
