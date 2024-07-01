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
  techs,
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
        className=" bg-fortiary border border-white/[.1] shadow-[0_0_1.5px_#ffffff70] opacity-90  p-5 rounded-2xl sm:w-[360px] w-full"
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

          {source_code_link && (
            <div
              onClick={() => window.open(source_code_link, '_blank')}
              className="interactable absolute bottom-0 right-0 m-3 card-img_hover  blue-pink-gradient w-10 h-10 rounded-full flex justify-self-end float-right justify-center items-center cursor-pointer hover:shadow-[0_0_25px_#ef64fe]"
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
          <p className="mt-2 text-secondary text-[14px] min-h-[70px]">
            {description}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between"> 
          <div className='flex items-center'>
            {techs.map((tech, index) => (
            <div
              key={index}
              className="bg-primary border border-white/[.2] shadow-[0_0_0.5px_#ffffff] rounded-full lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
              style={{
                transform: `translateX(-${5 * index + 2}px)`,
              }}
            >
              <img src={ `${tech.icon}`} alt="icon5" className="p-2" />
            </div>
          ))}
          </div>
          {game_link && (
            // <div
            //   onClick={() => window.open(game_link, '_blank')}
            //   className="interactable card-img_hover blue-pink-gradient lg:w-10 lg:h-10 w-8 h-8  rounded-full flex justify-self-start justify-center items-center cursor-pointer hover:shadow-[0_0_25px_#ef64fe]"
            // >
            //   {/* <img
            //     src={gamecontroller}
            //     alt="source code"
            //     className="w-2/3 h-2/3 object-contain"
            //   /> */}
            //   <FaItchIo className="w-2/3 h-2/3 object-contain" />
            // </div>
            <div
              className="interactable green-pink-gradient rounded-full p-[1.5px] lg:w-11 lg:h-11 w-9 h-9 flex justify-self-start justify-center items-center cursor-pointerhover:shadow-[0_0_5px_#fef4f5] overflow-hidden cursor-pointer hover:shadow-[0_0_25px_#ef64fe]"
              onClick={() => window.open(game_link, '_blank')}
            >
              <div
                className="bg-primary rounded-full p-1.5 w-full h-full overflow-hidden"
              >
                <FaItchIo className="w-full h-full object-contain" />
              </div>
            </div>

          )}
          {deployment_link && (
            <div
              className="interactable green-pink-gradient rounded-full p-[1.5px] lg:w-11 lg:h-11 w-9 h-9 flex justify-self-start justify-center items-center cursor-pointerhover:shadow-[0_0_5px_#fef4f5] overflow-hidden cursor-pointer hover:shadow-[0_0_25px_#ef64fe]"
              onClick={() => window.open(deployment_link, '_blank')}
            >
              <div
                className="bg-primary rounded-full p-1.5 w-full h-full overflow-hidden"
              >
                <img
                  src={online}
                  alt="source code"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
          
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
            These projects demonstrate my ability to work with various technologies. They each includes a link to{' '}
            a <span className="blue-text-gradient font-bold">live demo</span>.
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
