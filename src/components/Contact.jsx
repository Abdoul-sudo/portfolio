import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const Contact = () => {
    const email = 'ismaelabdoul7@gmail.com';

    return (
        <div className='w-full max-w-4xl mx-auto'>
            {/* Section header */}
            <motion.div variants={textVariant()} className='mb-16'>
                <p className={styles.sectionSubText}>Get In Touch</p>
                <h2 className={styles.sectionHeadText}>
                    Contact
                </h2>
            </motion.div>

            {/* Contact info */}
            <motion.div
                variants={fadeIn('', '', 0.1, 1)}
                className='space-y-8'
            >
                <p className={styles.bodyText}>
                    I'm currently available for freelance work and open to discussing new projects or opportunities.
                </p>

                {/* Email */}
                <div className='border-l border-border pl-6 py-2'>
                    <p className='text-muted text-sm mb-2'>Email</p>
                    <a
                        href={`mailto:${email}`}
                        className='text-accent text-lg md:text-xl hover:text-white transition-colors duration-300'
                    >
                        {email}
                    </a>
                </div>

                {/* Social */}
                <div className='border-l border-border pl-6 py-2'>
                    <p className='text-muted text-sm mb-3'>Social</p>
                    <div className='flex flex-col gap-2'>
                        <a
                            href='https://github.com/Abdoul-sudo'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-muted hover:text-accent transition-colors duration-300 text-sm'
                        >
                            GitHub
                        </a>
                        <a
                            href='https://www.linkedin.com/in/abdoul-wahhaab'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-muted hover:text-accent transition-colors duration-300 text-sm'
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Contact, 'contact');
