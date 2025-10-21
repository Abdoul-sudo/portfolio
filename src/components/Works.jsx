import React, { useState } from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { github, online, online_icon } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { staggerContainer } from '../utils/motion';
import { FaItchIo } from 'react-icons/fa';

const ProjectCard = ({ index, name, description, tags, techs, image, source_code_link, deployment_link, game_link, setImage }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='group'>
            <a href={game_link || deployment_link} target='_blank' rel='noopener noreferrer' className='block h-full'>
                <div className='backdrop-blur-md bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]'>
                    {/* Image */}
                    <div className='relative w-full aspect-video overflow-hidden'>
                        <img src={image} alt={name} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                        {/* GitHub link */}
                        {source_code_link && (
                            <div onClick={(e) => { e.preventDefault(); window.open(source_code_link, '_blank'); }} className='interactable absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300'>
                                <img src={github} alt='source code' className='w-5 h-5 object-contain' />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className='p-6'>
                        <h3 className='text-white font-bold text-[20px] mb-2'>{name}</h3>
                        <p className='text-white/60 text-[14px] leading-relaxed mb-4'>{description}</p>

                        {/* Tech stack */}
                        <div className='flex flex-wrap gap-2'>
                            {techs.map((tech, idx) => (
                                <div key={idx} className='px-3 py-1.5 bg-white/5 border border-white/10 rounded-full flex items-center gap-2'>
                                    <img src={tech.icon} alt={tech.name} className='w-4 h-4 object-contain' />
                                    <span className='text-white/70 text-[11px] font-medium'>{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

const Works = (props) => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Get unique project types
    const projectTypes = ['all', ...new Set(projects.map((p) => p.project_type))];

    // Filter projects based on active filter
    const filteredProjects = activeFilter === 'all' ? projects : projects.filter((project) => project.project_type === activeFilter);

    // Capitalize first letter for display
    const capitalizeFilter = (str) => {
        if (str === 'all') return 'All';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <>
            <motion.section variants={staggerContainer()} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.25 }} className={`${styles.paddingX} max-w-7xl mx-auto relative z-0`}>
                <span className='block pb-32 lg:pb-36' id='work'>
                    &nbsp;
                </span>
                <motion.div variants={textVariant()}>
                    <p className={`${styles.sectionSubText}`}>Selected Work</p>
                    <h2 className={`${styles.sectionHeadText} mt-3`}>Projects</h2>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div variants={fadeIn('', '', 0.1, 1)} className='mt-8 flex flex-wrap gap-3'>
                    {projectTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveFilter(type)}
                            className={`px-6 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 ${
                                activeFilter === type
                                    ? 'bg-white text-black'
                                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                            }`}>
                            {capitalizeFilter(type)}
                        </button>
                    ))}
                </motion.div>

                <div key={activeFilter} className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={`project-${project.name}-${index}`} index={index} {...project} setImage={props.setImage} />
                    ))}
                </div>
            </motion.section>
        </>
    );
};

export default Works;
