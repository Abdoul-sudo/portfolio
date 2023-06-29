import React from 'react';
import Tilt from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { github, online, online_icon } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  deployment_link,
}) => {
  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 40,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img src={image} alt="project_image" className="w-full h-full object-cover rounded-2xl" />

          <div
            className={`absolute inset-0  ${
              deployment_link && source_code_link ? 'flex justify-between' : 'grid'
            } m-3 card-img_hover`}
          >
            {deployment_link && (
              <div
                onClick={() => window.open(deployment_link, '_blank')}
                className="blue-pink-gradient w-10 h-10 rounded-full flex justify-self-start justify-center items-center cursor-pointer hover:shadow-[0_0_25px_#ef64fe]"
              >
                <img src={online} alt="source code" className="w-2/3 h-2/3 object-contain" />
              </div>
            )}
            {source_code_link && (
              <div
                onClick={() => window.open(source_code_link, '_blank')}
                className="blue-pink-gradient w-10 h-10 rounded-full flex justify-self-end float-right justify-center items-center cursor-pointer hover:shadow-[0_0_25px_#ef64fe]"
              >
                <img src={github} alt="source code" className="w-3/4 h-3/4 object-contain" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          These projects demonstrate my skills and experience through real-world examples of my
          work. Each project is described briefly and includes links to{' '}
          <span className="orange-text-gradient">code repositories</span> and{' '}
          <span className="orange-text-gradient">live demos</span>. They showcase my ability to work
          with various technologies, and effectively manage projects.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'work');
