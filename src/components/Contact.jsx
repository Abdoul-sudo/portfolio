import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef();
    const headingRef = useRef();
    const contentRef = useRef();

    useGSAP(() => {
        // Heading animation
        gsap.from(headingRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            },
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power3.out',
        });

        // Content animation
        gsap.from(contentRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            },
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.2,
            ease: 'power2.out',
        });
    }, { scope: sectionRef });

    return (
        <div
            ref={sectionRef}
            className='w-full min-h-screen flex items-center justify-center py-20'
        >
            <div className='max-w-6xl mx-auto w-full grid lg:grid-cols-2 grid-cols-1 gap-12 lg:gap-20 items-center'>
                {/* Left Column - Heading */}
                <div ref={headingRef}>
                    <h2 className='font-syne font-extrabold text-6xl md:text-7xl lg:text-8xl text-accent-navy leading-tight'>
                        Let's
                        <br />
                        <span className='terracotta-text-gradient'>connect</span>
                    </h2>
                </div>

                {/* Right Column - Contact Options */}
                <div ref={contentRef} className='space-y-8'>
                    <p className='font-inter text-text-secondary text-xl leading-relaxed'>
                        Got a project in mind? Let's build something amazing together.
                    </p>

                    {/* Email CTA */}
                    <a
                        href='mailto:ismaelabdoul7@gmail.com'
                        className='group inline-block'
                    >
                        <div className='px-8 py-5 bg-accent-terracotta text-white font-inter font-bold text-xl rounded-2xl hover:bg-accent-orange transition-all duration-300 shadow-soft hover:shadow-soft-hover flex items-center gap-4 group-hover:scale-105'>
                            <FaEnvelope className='text-2xl' />
                            <span>Let's get in touch</span>
                        </div>
                    </a>

                    {/* Social Links */}
                    <div className='flex gap-4 pt-4'>
                        <a
                            href='https://www.linkedin.com/in/abdoul-wahhaab'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='w-14 h-14 bg-accent-sage rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-all duration-300 hover:scale-110 shadow-soft'
                            aria-label='LinkedIn Profile'
                        >
                            <FaLinkedinIn className='text-2xl' />
                        </a>

                        <a
                            href='https://github.com/Abdoul-sudo'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='w-14 h-14 bg-accent-navy rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-all duration-300 hover:scale-110 shadow-soft'
                            aria-label='GitHub Profile'
                        >
                            <FaGithub className='text-2xl' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper(Contact, 'contact');
