import { motion } from 'framer-motion';

import { styles } from '../styles';
// import { ComputersCanvas } from './canvas';
import { FaDownload, FaFileDownload, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { cv } from '../assets';
import MagicButton from './MagicButton';

const Hero = () => {
    return (
        <section className={`relative w-full min-h-[100vh] flex items-center justify-center mx-auto`}>
            <div className={`max-w-7xl mx-auto ${styles.paddingX} w-full`}>
                {/* Frosted glass container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='backdrop-blur-md bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl'>
                    <div className='flex flex-col gap-8'>
                        {/* Main headline */}
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className={`${styles.heroHeadText} mb-6`}>
                                Building digital
                                <br />
                                <span className='text-[#b084e9]'>experiences</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className={`${styles.heroSubText} max-w-2xl`}>
                                Full-stack developer crafting web apps & games
                            </motion.p>
                        </div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className='flex flex-wrap gap-4 items-center'>
                            <a href='#work' className='interactable group'>
                                <div className='relative px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105'>
                                    View Work
                                </div>
                            </a>
                            <a href={cv} download='ISMAEL Abdoul Wahhaab CV.pdf' target='_blank' rel='noopener noreferrer' className='interactable group'>
                                <div className='relative px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300 hover:scale-105 flex items-center gap-2'>
                                    <span>Download CV</span>
                                    <FaDownload className='text-sm' />
                                </div>
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className='flex gap-4 pt-4'>
                            <a href='https://github.com/Abdoul-sudo' target='_blank' rel='noopener noreferrer' className='interactable w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-all duration-300 group'>
                                <FaGithub className='text-white/70 group-hover:text-white text-xl' />
                            </a>
                            <a href='https://www.linkedin.com/in/abdoul-wahhaab' target='_blank' rel='noopener noreferrer' className='interactable w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-all duration-300 group'>
                                <FaLinkedinIn className='text-white/70 group-hover:text-white text-xl' />
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <div className='absolute bottom-10 w-full flex justify-center items-center'>
                <a href='#about' className='interactable'>
                    <div className='w-[32px] h-[58px] rounded-3xl border-2 border-white/20 flex justify-center items-start p-2'>
                        <motion.div
                            animate={{
                                y: [0, 20, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'loop',
                            }}
                            className='w-2 h-2 rounded-full bg-white/60 mb-1'
                        />
                    </div>
                </a>
            </div>
        </section>
    );
};

export default Hero;
