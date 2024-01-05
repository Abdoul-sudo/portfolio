import React from 'react';
import {} from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const ServiceCard = ({ index, title, icon }) => (
  <Tilt
    options={{
      max: 45,
      Tilt,
    }}
    className="xs:w-[250px] w-full"
  >
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <div className="bg-primary  shadow-[0_0_4px_#ffffff70] opacity-90  p-10 rounded-2xl w-full">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2
          className={`${styles.sectionHeadText} drop-shadow-[0_0_0.2rem_#ffffff70]`}
        >
          Overview.
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className=" mt-4 text-secondary xl:text-[17px] lg:text-[14px] sm:text-[12px]  max-w-3xl leading-[35px]"
      >
        I'm a quick learner with a strong{' '}
        <span className="blue-text-gradient font-bold">passion</span> for
        software development. <br /> Continuously, I aim to{' '}
        <span className="blue-text-gradient font-bold">expand</span> my
        personnal knowledge and skills. <br /> My primary focus revolves around
        building <span className="blue-text-gradient font-bold">efficient</span>{' '}
        web applications and constantly challenging the limits of what is
        possible in the digital world.
        <div className="h-11"></div>
        <div className="flex flex-col">
          <a
            href="#contact"
            className="interactable self-center orange-text-gradient sm:text-[26px] text-[22px]  font-bold px-[28px] py-[12px] rounded-lg border-2 border-[#f15811] drop-shadow-[0_0_0.1rem_#f15811]  hover:shadow-[0_0_4px_#f15811] whitespace-nowrap"
          >
            Let's work together!
          </a>
        </div>
      </motion.p>

      {/* <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div> */}
    </div>
  );
};

export default SectionWrapper(About, 'about');
