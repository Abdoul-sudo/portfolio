import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import { styles } from '../styles';
import { projects } from '../constants';
import { SectionWrapper } from '../hoc';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    { id: 'all', label: 'All' },
    { id: 'game', label: 'Games' },
    { id: 'website', label: 'Websites' },
    { id: 'ai', label: 'AI' },
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='project-card group bg-bg-secondary rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col h-full'
        >
            {/* Project Image */}
            <div className='relative w-full h-64 overflow-hidden bg-bg-tertiary'>
                <img
                    src={project.image}
                    alt={project.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />

                {/* Overlay with link on hover */}
                <div className='absolute inset-0 bg-accent-terracotta bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center'>
                    <a
                        href={project.deployment_link || project.game_link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0'
                    >
                        <span className='px-6 py-3 bg-white text-accent-terracotta font-inter font-bold rounded-full flex items-center gap-2 hover:bg-bg-primary transition-colors'>
                            View Project
                            <FaExternalLinkAlt />
                        </span>
                    </a>
                </div>

                {/* GitHub Link (if available) */}
                {project.source_code_link && (
                    <a
                        href={project.source_code_link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='absolute top-4 right-4 w-10 h-10 bg-accent-navy rounded-full flex items-center justify-center text-white hover:bg-accent-terracotta transition-colors duration-300 z-10'
                    >
                        <FaGithub className='text-xl' />
                    </a>
                )}
            </div>

            {/* Project Details */}
            <div className='p-6 flex flex-col flex-grow'>
                {/* Project Name */}
                <h3 className='font-syne font-bold text-2xl text-accent-navy mb-3'>
                    {project.name}
                </h3>

                {/* Description */}
                <p className='font-inter text-text-secondary text-base leading-relaxed mb-4 flex-grow'>
                    {project.description}
                </p>

                {/* Tech Stack Icons */}
                <div className='flex items-center gap-2 flex-wrap'>
                    {project.techs.map((tech, idx) => (
                        <div
                            key={idx}
                            className='w-8 h-8 bg-bg-primary rounded-full flex items-center justify-center p-1.5 border border-text-tertiary'
                            title={tech.name}
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className='w-full h-full object-contain'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Works = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const sectionRef = useRef();
    const titleRef = useRef();
    const filterRef = useRef();
    const gridRef = useRef();

    // Filter projects based on active category
    const filteredProjects =
        activeFilter === 'all'
            ? projects
            : projects.filter((project) => project.category === activeFilter);

    // GSAP Animations
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

        // Filter buttons animation
        gsap.from('.filter-btn', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            },
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
        });
    }, { scope: sectionRef });

    const handleFilterChange = (filterId) => {
        // Animate out current projects
        gsap.to('.project-card', {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            stagger: 0.05,
            onComplete: () => {
                setActiveFilter(filterId);
                // Animate in new projects
                gsap.fromTo(
                    '.project-card',
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.out',
                    }
                );
            },
        });
    };

    return (
        <div
            ref={sectionRef}
            className='w-full min-h-screen py-20'
        >
            {/* Section Title */}
            <div ref={titleRef} className='mb-12'>
                <h2 className='font-syne font-extrabold text-5xl md:text-6xl text-accent-navy mb-4'>
                    Projects
                </h2>
                <p className='font-inter text-text-secondary text-lg md:text-xl max-w-3xl'>
                    These projects demonstrate my ability to work with various technologies. Each includes a link to a{' '}
                    <span className='font-semibold text-accent-terracotta'>live demo</span>.
                </p>
            </div>

            {/* Filter Buttons */}
            <div ref={filterRef} className='flex flex-wrap gap-4 mb-12'>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleFilterChange(category.id)}
                        className={`filter-btn px-8 py-3 font-inter font-bold text-lg rounded-full transition-all duration-300 ${
                            activeFilter === category.id
                                ? 'bg-accent-terracotta text-white shadow-soft'
                                : 'bg-transparent border-2 border-accent-terracotta text-accent-terracotta hover:bg-accent-terracotta hover:text-white'
                        }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div
                ref={gridRef}
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            >
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={`${project.name}-${index}`} project={project} index={index} />
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className='text-center py-20'>
                    <p className='font-inter text-text-secondary text-xl'>
                        No projects found in this category.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SectionWrapper(Works, 'work');
