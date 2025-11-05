import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import '../styles/contact.css';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const dividerRef = useRef(null);
  const mailRef = useRef(null);
  const socialRef = useRef([]);

  const socialLinks = [
    {
      id: 'github',
      label: 'github',
      href: 'https://github.com/Abdoul-sudo',
      icon: FiGithub
    },
    {
      id: 'linkedin',
      label: 'linkedin',
      href: 'https://www.linkedin.com/in/abdoul-wahhaab',
      icon: FiLinkedin
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
      gsap.set([titleRef.current, dividerRef.current, mailRef.current, ...socialRef.current], {
        opacity: 1,
        y: 0
      });
      return;
    }

    const tl = gsap.timeline();

    // Title slide down
    tl.fromTo(titleRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    // Divider expand
    .fromTo(dividerRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out', transformOrigin: 'left' },
      '-=0.3'
    )
    // Mail section
    .fromTo(mailRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.4'
    )
    // Social links stagger
    .fromTo(socialRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );
  };

  return (
    <section className="contact-section section" id="contact" ref={sectionRef}>
      <div className="contact-wrapper">

        {/* Title */}
        <h2 className="contact-title" ref={titleRef}>
          CONTACT
        </h2>

        {/* Divider Line */}
        <div className="contact-divider" ref={dividerRef}></div>

        {/* Two Column Grid */}
        <div className="contact-grid">

          {/* Mail Column */}
          <div className="contact-column">
            <h3 className="contact-column-label">MAIL</h3>
            <div className="contact-links" ref={mailRef}>
              <a
                href="mailto:ismaelabdoul7@gmail.com"
                className="contact-link interactive"
              >
                <FiMail className="contact-icon" />
                <span className="contact-arrow">↗</span>
                <span className="contact-link-text">ismaelabdoul7@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Social Column */}
          <div className="contact-column">
            <h3 className="contact-column-label">SOCIAL MEDIAS</h3>
            <div className="contact-links">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className="contact-link interactive"
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={(el) => (socialRef.current[index] = el)}
                  >
                    <IconComponent className="contact-icon" />
                    <span className="contact-arrow">↗</span>
                    <span className="contact-link-text">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
