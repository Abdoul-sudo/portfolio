import { motion } from 'framer-motion';
import { styles } from '../styles';
import { FaDownload, FaArrowDown } from 'react-icons/fa';
import { cv } from '../assets';

const Hero = () => {
    return (
        <section className='relative w-full min-h-screen flex items-center justify-center'>
            <div className={`max-w-6xl mx-auto ${styles.paddingX} w-full`}>
                <div className='flex flex-col justify-center min-h-screen py-32'>
                    {/* Small intro */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='mb-8'
                    >
                        <p className='text-muted text-sm md:text-base tracking-wide'>
                            Hey, I code stuff
                        </p>
                    </motion.div>

                    {/* Large headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={`${styles.heroHeadText} mb-10`}
                    >
                        Full-stack developer
                        <br />
                        crafting web apps
                        <br />
                        & games
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className={`${styles.heroSubText} max-w-2xl mb-16`}
                    >
                        Specializing in React, Next.js, and modern web technologies.
                        <br />
                        Building scalable applications with clean code and thoughtful design.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className='flex flex-wrap gap-6 items-center mb-16'
                    >
                        <a href='#work' className='interactable group'>
                            <div className='relative px-8 py-4 bg-white text-dark font-medium hover:bg-accent transition-all duration-300'>
                                <span className='relative z-10'>View Work</span>
                            </div>
                        </a>
                        <a href={cv} download='ISMAEL Abdoul Wahhaab CV.pdf' target='_blank' rel='noopener noreferrer' className='interactable group'>
                            <div className='relative px-8 py-4 border border-border text-white font-medium hover:border-white transition-all duration-300 flex items-center gap-3'>
                                <span>Download CV</span>
                                <FaDownload className='text-sm' />
                            </div>
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className='flex gap-6'
                    >
                        <a
                            href='https://github.com/Abdoul-sudo'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='interactable text-muted hover:text-white transition-colors duration-300 text-sm'
                        >
                            GitHub
                        </a>
                        <a
                            href='https://www.linkedin.com/in/abdoul-wahhaab'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='interactable text-muted hover:text-white transition-colors duration-300 text-sm'
                        >
                            LinkedIn
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className='absolute bottom-12 left-1/2 -translate-x-1/2'
            >
                <a href='#about' className='interactable flex flex-col items-center gap-2 text-muted hover:text-white transition-colors duration-300'>
                    <span className='text-xs tracking-wider uppercase'>Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <FaArrowDown className='text-sm' />
                    </motion.div>
                </a>
            </motion.div>
        </section>
    );
};

export default Hero;
