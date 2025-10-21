import React from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const About = () => {
    return (
        <div className='backdrop-blur-md bg-white/[0.02] border border-white/[0.05] rounded-3xl p-10 md:p-12 lg:p-16 w-full'>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>About</p>
                <h2 className={`${styles.sectionHeadText} mt-3`}>What I Do</h2>
            </motion.div>

            <motion.p variants={fadeIn('', '', 0.1, 1)} className='mt-8 text-white/70 xl:text-[20px] sm:text-[18px] text-[16px] max-w-4xl leading-relaxed font-light'>
                Specialized in React, Next.js, and modern web technologies. I build scalable applications with clean code and pixel-perfect design.
            </motion.p>
        </div>
    );
};

export default SectionWrapper(About, 'about');
