import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { staggerContainer } from '../utils/motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ index, name, description, techs, image, source_code_link, deployment_link, game_link }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='group'
        >
            <a
                href={game_link || deployment_link}
                target='_blank'
                rel='noopener noreferrer'
                className='block'
            >
                {/* Image */}
                <div className='relative w-full aspect-[4/3] overflow-hidden bg-dark-card mb-6'>
                    <img
                        src={image}
                        alt={name}
                        className='w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300'
                    />
                </div>

                {/* Content */}
                <div>
                    <h3 className='text-accent text-xl md:text-2xl font-light mb-3 group-hover:text-white transition-colors duration-300'>
                        {name}
                    </h3>

                    <p className='text-muted text-sm leading-relaxed mb-4'>
                        {description}
                    </p>

                    {/* Tech stack */}
                    <div className='flex flex-wrap gap-2'>
                        {techs.map((tech, idx) => (
                            <span
                                key={idx}
                                className='text-muted text-xs'
                            >
                                {tech.name}{idx < techs.length - 1 ? ',' : ''}
                            </span>
                        ))}
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
        <motion.section
            variants={staggerContainer()}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.25 }}
            className={`${styles.paddingX} max-w-5xl mx-auto relative z-0`}
        >
            <span className='block pb-32 lg:pb-36' id='work'>&nbsp;</span>

            {/* Section header */}
            <motion.div variants={textVariant()} className='mb-16'>
                <p className={styles.sectionSubText}>Portfolio</p>
                <h2 className={styles.sectionHeadText}>
                    Selected Work
                </h2>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
                variants={fadeIn('', '', 0.1, 1)}
                className='flex flex-wrap gap-4 mb-16'
            >
                {projectTypes.map((type) => {
                    const isActive = activeFilter === type;

                    return (
                        <button
                            key={type}
                            onClick={() => setActiveFilter(type)}
                            className={`
                                px-6 py-2 text-sm transition-all duration-300
                                ${
                                    isActive
                                        ? 'bg-white text-dark'
                                        : 'border border-border text-muted hover:text-accent hover:border-accent'
                                }
                            `}
                        >
                            {capitalizeFilter(type)}
                        </button>
                    );
                })}
            </motion.div>

            {/* Projects grid */}
            <AnimatePresence mode='wait'>
                <div
                    key={activeFilter}
                    className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16'
                >
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={`project-${project.name}-${index}`}
                            index={index}
                            {...project}
                            setImage={props.setImage}
                        />
                    ))}
                </div>
            </AnimatePresence>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
                <div className='text-center py-20'>
                    <p className='text-muted text-sm'>No projects found in this category</p>
                </div>
            )}
        </motion.section>
    );
};

export default Works;
