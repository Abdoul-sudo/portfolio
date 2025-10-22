import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import '../styles/contact.css';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const linksRef = useRef([]);

  const contactLinks = [
    {
      label: 'Email',
      href: 'mailto:abdoulwahhaab@gmail.com',
      text: 'abdoulwahhaab@gmail.com',
      icon: FiMail
    },
    {
      label: 'GitHub',
      href: 'https://github.com/Abdoul-sudo',
      text: '@Abdoul-sudo',
      icon: FiGithub
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/abdoul-wahhaab',
      text: 'abdoul-wahhaab',
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
      gsap.set([titleRef.current, ...linksRef.current], {
        opacity: 1,
        y: 0
      });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
      .fromTo(
        linksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
  };

  return (
    <section className="contact-section section" id="contact" ref={sectionRef}>
      <div className="contact-content">
        <h2 className="contact-title" ref={titleRef}>
          CONTACT
        </h2>

        <div className="contact-list">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="contact-item interactive"
                ref={(el) => (linksRef.current[index] = el)}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <Icon className="contact-icon" />
                <span className="contact-label">{link.label}</span>
                <span className="contact-text">{link.text}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
