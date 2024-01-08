import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { github, online, online_icon } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { staggerContainer } from '../utils/motion';
import { FaItchIo } from 'react-icons/fa';

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  deployment_link,
  game_link,
  setImage,
}) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      className=""
    >
      <Tilt
        options={{
          max: 25,
          scale: 1,
          speed: 450,
        }}
        className=" bg-tertiary opacity-90  p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="interactable2 relative w-full sm:h-[230px] cursor-pointer">
          <img
            src={image}
            alt="project_image"
            className="interactable2 w-full h-full object-cover rounded-2xl "
            onClick={() => {
              setImage(image);
            }}
          />

          {deployment_link && (
            <div
              onClick={() => window.open(deployment_link, '_blank')}
              className="interactable absolute inset-0 m-3 card-img_hover blue-pink-gradient w-10 h-10 rounded-full flex justify-self-start justify-center items-center cursor-pointer hover:shadow-[0_0_25px_#ef64fe]"
            >
              <img
                src={online}
                alt="source code"
                className="w-2/3 h-2/3 object-contain"
              />
            </div>
          )}
          {game_link && (
            <div
              onClick={() => window.open(game_link, '_blank')}
              className="interactable absolute inset-0 m-3 card-img_hover blue-pink-gradient w-10 h-10 rounded-full flex justify-self-start justify-center items-center cursor-pointer hover:shadow-[0_0_25px_#ef64fe]"
            >
              {/* <img
                src={gamecontroller}
                alt="source code"
                className="w-2/3 h-2/3 object-contain"
              /> */}
              <FaItchIo className="w-2/3 h-2/3 object-contain" />
            </div>
          )}
          {source_code_link && (
            <div
              onClick={() => window.open(source_code_link, '_blank')}
              className="interactable absolute top-0 right-0 m-3 card-img_hover  blue-pink-gradient w-10 h-10 rounded-full flex justify-self-end float-right justify-center items-center cursor-pointer hover:shadow-[0_0_25px_#ef64fe]"
            >
              <img
                src={github}
                alt="source code"
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
          )}
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px] drop-shadow-[0_0_0.1rem_#ffffff70]">
            {name}
          </h3>
          <p className="mt-2 text-secondary text-[14px] h-[70px]">
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-1.5 gap-y-1">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              {tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = (props) => {
  return (
    <>
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.paddingX} max-w-7xl mx-auto relative z-0`}
      >
        <span className="block pb-32 lg:pb-36" id="work">
          &nbsp;
        </span>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} `}>My work</p>
          <h2
            className={`${styles.sectionHeadText} drop-shadow-[0_0_0.1rem_#ffffff70]`}
          >
            Projects.
          </h2>
        </motion.div>

        <div className="w-full flex">
          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            These projects demonstrate my skills and experience through
            real-world examples of my work. Each project is described briefly
            and includes links to{' '}
            <span className="blue-text-gradient font-bold">
              code repositories
            </span>{' '}
            and <span className="blue-text-gradient font-bold">live demos</span>
            . They showcase my ability to work with various technologies, and
            effectively manage projects.
          </motion.p>
        </div>

        <div className="mt-20 flex flex-wrap gap-7">
          {projects.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              {...project}
              setImage={props.setImage}
            />
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default Works;
