import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaGamepad } from 'react-icons/fa';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
    const sectionRef = useRef();
    const headingRef = useRef();
    const leftCardRef = useRef();
    const rightCardRef = useRef();

    useGSAP(() => {
        // Heading animation
        gsap.from(headingRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            },
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: 'power3.out',
        });

        // Cards parallax and fade in
        gsap.from(leftCardRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                end: 'bottom top',
                scrub: 1,
            },
            y: 100,
            opacity: 0,
        });

        gsap.from(rightCardRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                end: 'bottom top',
                scrub: 1,
            },
            y: 150,
            opacity: 0,
        });
    }, { scope: sectionRef });

    return (
        <div
            ref={sectionRef}
            className='w-full min-h-screen flex flex-col items-center justify-center py-20'
        >
            {/* Main Statement */}
            <div
                ref={headingRef}
                className='text-center mb-20'
            >
                <h2 className='font-syne font-extrabold text-4xl md:text-6xl lg:text-7xl text-accent-navy leading-tight max-w-5xl mx-auto px-4'>
                    <span className='inline-block mr-4 text-accent-terracotta'>[</span>
                    I specialize in{' '}
                    <span className='terracotta-text-gradient'>web</span>
                    {' '}and{' '}
                    <span className='terracotta-text-gradient'>game development</span>
                    <span className='inline-block ml-4 text-accent-terracotta'>]</span>
                </h2>
            </div>

            {/* Two Column Cards */}
            <div className='w-full max-w-6xl mx-auto px-4 grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-12'>
                {/* Web Development Card */}
                <div
                    ref={leftCardRef}
                    className='bg-bg-secondary border-4 border-accent-terracotta p-8 md:p-12 rounded-2xl shadow-soft hover:shadow-soft-hover transition-shadow duration-300 relative group'
                >
                    {/* Icon */}
                    <div className='w-16 h-16 md:w-20 md:h-20 bg-accent-terracotta rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                        <FaCode className='text-3xl md:text-4xl text-white' />
                    </div>

                    {/* Title */}
                    <h3 className='font-syne font-bold text-3xl md:text-4xl text-accent-navy mb-4'>
                        Web Development
                    </h3>

                    {/* Tech Stack */}
                    <div className='flex flex-wrap gap-2 mb-6'>
                        {['React', 'Next.js', 'Tailwind', 'Node.js'].map((tech) => (
                            <span
                                key={tech}
                                className='px-4 py-2 bg-accent-terracotta bg-opacity-10 text-accent-terracotta font-inter font-medium text-sm rounded-full border border-accent-terracotta'
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className='font-inter text-text-secondary text-lg leading-relaxed'>
                        Building scalable, beautiful web applications with modern frameworks and best practices. From dynamic SPAs to full-stack solutions.
                    </p>

                    {/* Decorative element */}
                    <div className='absolute -bottom-4 -right-4 w-24 h-24 bg-accent-terracotta opacity-10 rounded-full' />
                </div>

                {/* Game Development Card */}
                <div
                    ref={rightCardRef}
                    className='bg-bg-secondary border-4 border-accent-sage p-8 md:p-12 rounded-2xl shadow-soft hover:shadow-soft-hover transition-shadow duration-300 relative group lg:mt-12'
                >
                    {/* Icon */}
                    <div className='w-16 h-16 md:w-20 md:h-20 bg-accent-sage rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                        <FaGamepad className='text-3xl md:text-4xl text-white' />
                    </div>

                    {/* Title */}
                    <h3 className='font-syne font-bold text-3xl md:text-4xl text-accent-navy mb-4'>
                        Game Development
                    </h3>

                    {/* Tech Stack */}
                    <div className='flex flex-wrap gap-2 mb-6'>
                        {['Unity', 'Godot', 'C#'].map((tech) => (
                            <span
                                key={tech}
                                className='px-4 py-2 bg-accent-sage bg-opacity-10 text-accent-sage font-inter font-medium text-sm rounded-full border border-accent-sage'
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className='font-inter text-text-secondary text-lg leading-relaxed'>
                        Crafting immersive interactive experiences with game engines. From 2D platformers to engaging multiplayer games.
                    </p>

                    {/* Decorative element */}
                    <div className='absolute -top-4 -left-4 w-24 h-24 bg-accent-sage opacity-10 rounded-full' />
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper(Expertise, 'expertise');
