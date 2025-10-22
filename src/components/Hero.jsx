import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { styles } from '../styles';
import { FaDownload } from 'react-icons/fa';
import { cv } from '../assets';

const Hero = () => {
    const heroRef = useRef();
    const heyRef = useRef();
    const mainTextRef = useRef();
    const nameRef = useRef();
    const subtitleRef = useRef();
    const ctaRef = useRef();
    const profileRef = useRef();

    // GSAP animations on mount
    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        // Animate "Hey" with handwritten feel
        tl.from(heyRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: 'power2.out',
        });

        // Main headline stagger animation
        tl.from(mainTextRef.current, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',
        }, '-=0.3');

        // Name and subtitle
        tl.from([nameRef.current, subtitleRef.current], {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
        }, '-=0.5');

        // CTA buttons stagger
        tl.from('.hero-cta', {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power2.out',
        }, '-=0.3');

        // Profile image scale in
        tl.from(profileRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)',
        }, '-=0.8');
    }, { scope: heroRef });

    return (
        <section
            ref={heroRef}
            className='relative w-full min-h-screen mx-auto flex items-center pt-24 pb-20'
        >
            <div className={`max-w-7xl mx-auto ${styles.paddingX} w-full`}>
                <div className='flex lg:flex-row flex-col items-center justify-between gap-12 lg:gap-16'>
                    {/* Left Column - Text Content */}
                    <div className='lg:w-[60%] w-full flex flex-col'>
                        {/* Decorative Circle */}
                        <div className='w-16 h-16 rounded-full border-4 border-accent-sage absolute top-32 left-8 lg:left-24 opacity-40' />

                        {/* "Hey" */}
                        <h2
                            ref={heyRef}
                            className='font-syne font-light text-4xl md:text-5xl text-text-secondary mb-4'
                        >
                            Hey
                        </h2>

                        {/* Main Headline */}
                        <h1
                            ref={mainTextRef}
                            className='font-syne font-extrabold text-text-primary leading-tight mb-6'
                            style={{
                                fontSize: 'clamp(3rem, 10vw, 9rem)',
                            }}
                        >
                            <span className='terracotta-text-gradient'>I code stuff</span>
                        </h1>

                        {/* Name */}
                        <h3
                            ref={nameRef}
                            className='font-syne font-bold text-2xl md:text-3xl text-accent-navy mb-3'
                        >
                            Abdoul Wahhaab
                        </h3>

                        {/* Subtitle */}
                        <p
                            ref={subtitleRef}
                            className='font-inter text-text-secondary text-lg md:text-xl max-w-xl leading-relaxed mb-10'
                        >
                            Web Developer & Game Developer
                        </p>

                        {/* CTA Buttons */}
                        <div ref={ctaRef} className='flex flex-wrap gap-4 md:gap-6'>
                            <a
                                href='#work'
                                className='hero-cta group px-8 py-4 bg-accent-terracotta text-white font-inter font-medium text-lg rounded-full hover:bg-accent-orange transition-all duration-300 shadow-soft hover:shadow-soft-hover hover:scale-105'
                            >
                                My Projects
                            </a>

                            <a
                                href='#about'
                                className='hero-cta px-8 py-4 bg-transparent border-4 border-accent-terracotta text-accent-terracotta font-inter font-bold text-lg rounded-full hover:bg-accent-terracotta hover:text-white transition-all duration-300 hover:scale-105'
                            >
                                About
                            </a>

                            <a
                                href={cv}
                                download='ISMAEL Abdoul Wahhaab CV.pdf'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hero-cta px-8 py-4 bg-accent-sage text-white font-inter font-medium text-lg rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-soft hover:shadow-soft-hover hover:scale-105 flex items-center gap-2'
                            >
                                <FaDownload className='text-lg' />
                                CV
                            </a>

                            <a
                                href='#contact'
                                className='hero-cta px-8 py-4 bg-bg-secondary border-2 border-text-tertiary text-text-primary font-inter font-medium text-lg rounded-full hover:border-accent-navy hover:bg-bg-tertiary transition-all duration-300 hover:scale-105'
                            >
                                Contact Me
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Profile Image */}
                    <div className='lg:w-[35%] w-full flex justify-center lg:justify-end'>
                        <div
                            ref={profileRef}
                            className='home_profile w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96'
                        />
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className='absolute bottom-10 right-10 w-24 h-24 rounded-full bg-accent-amber opacity-20' />
            </div>

            {/* Scroll Indicator */}
            <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:block'>
                <a href='#about' className='flex flex-col items-center gap-2 group'>
                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'loop',
                        }}
                        className='w-8 h-12 rounded-full border-3 border-accent-terracotta flex justify-center items-start p-2'
                    >
                        <div className='w-2 h-2 rounded-full bg-accent-terracotta' />
                    </motion.div>
                    <span className='text-text-tertiary text-sm font-inter group-hover:text-accent-terracotta transition-colors duration-300'>
                        Scroll
                    </span>
                </a>
            </div>
        </section>
    );
};

export default Hero;
