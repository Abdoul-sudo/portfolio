import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();

    useGSAP(() => {
        // Title animation
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
        });

        // Content animation
        gsap.from(contentRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
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
            className='w-full min-h-[60vh] flex items-center justify-center'
        >
            <div className='max-w-5xl mx-auto'>
                {/* Decorative "About" label */}
                <motion.div
                    ref={titleRef}
                    className='mb-8'
                >
                    <h2 className='font-syne font-extrabold text-6xl md:text-7xl text-accent-sage opacity-20 transform -rotate-3'>
                        About
                    </h2>
                </motion.div>

                {/* Content - offset to the right */}
                <div
                    ref={contentRef}
                    className='lg:ml-20 ml-0 bg-bg-secondary px-8 py-12 md:px-12 md:py-16 rounded-3xl shadow-soft relative'
                >
                    {/* Decorative element */}
                    <div className='absolute -top-6 -left-6 w-20 h-20 rounded-full bg-accent-terracotta opacity-20' />

                    <p className='font-inter text-text-secondary text-xl md:text-2xl leading-relaxed mb-6'>
                        With <span className='font-semibold text-accent-terracotta'>4 years of experience</span> in software development, I've built a passion for creating engaging web applications and immersive game experiences.
                    </p>

                    <p className='font-inter text-text-secondary text-xl md:text-2xl leading-relaxed'>
                        I specialize in <span className='font-semibold text-accent-navy'>React.js, Next.js, and Unity</span>—transforming ideas into polished, interactive digital products that users love.
                    </p>

                    {/* Decorative bottom element */}
                    <div className='absolute -bottom-4 -right-4 w-16 h-16 bg-accent-amber rounded-lg opacity-30 transform rotate-12' />
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper(About, 'about');
