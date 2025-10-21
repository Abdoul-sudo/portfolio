import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const About = () => {
    const expertise = [
        {
            title: 'Web Development',
            desc: 'Building fast, responsive applications with React, Next.js, and modern frameworks',
        },
        {
            title: 'Game Development',
            desc: 'Creating immersive games with Unity, Godot, and interactive experiences',
        },
    ];

    return (
        <div className='w-full max-w-4xl mx-auto'>
            {/* Section header */}
            <motion.div variants={textVariant()} className='mb-16'>
                <p className={styles.sectionSubText}>Overview</p>
                <h2 className={styles.sectionHeadText}>
                    What I Do
                </h2>
            </motion.div>

            {/* Bio */}
            <motion.div
                variants={fadeIn('', '', 0.1, 1)}
                className='mb-20'
            >
                <p className={`${styles.bodyText} max-w-3xl`}>
                    I'm a full-stack developer specializing in React, Next.js, and modern web technologies, with additional expertise in game development using Unity and Godot.
                    <br /><br />
                    My approach combines technical precision with thoughtful design to deliver polished, user-centric experiences.
                </p>
            </motion.div>

            {/* Expertise list */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8'>
                {expertise.map((item, index) => (
                    <motion.div
                        key={item.title}
                        variants={fadeIn('up', 'tween', index * 0.15, 0.6)}
                        className='group'
                    >
                        <div className='border-l border-border group-hover:border-accent transition-colors duration-300 pl-6 py-1'>
                            <h3 className='text-accent text-lg md:text-xl font-normal mb-2'>
                                {item.title}
                            </h3>
                            <p className='text-muted text-sm leading-relaxed'>
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(About, 'about');
