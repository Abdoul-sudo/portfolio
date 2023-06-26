import { motion } from 'framer-motion';

import './Skills.scss';
import { experiences } from '../../constants';
import { technologies } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { styles } from '../../styles';
import { textVariant } from '../../utils/motion';

const Skills = () => {
  return (
    <>
      {/* <h2 className="head-text">Skills & Experiences</h2> */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>What I have done so far</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Skills & Experiences</h2>
      </motion.div>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {technologies.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
                <img src={skill.icon} alt={skill.name} />
              </div>
              <p className="p-text text-secondary">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.date}>
              <div className="app__skills-exp-year">
                <p className="text-[#915EFF] font-bold">{experience.date}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.title}
                      key={work.title}
                    >
                      <div className="flex justify-center items-center gap-3">
                        <div
                          className="green-pink-gradient rounded-full p-[2px] w-[45px] h-[45px] flex justify-center items-center hover:shadow-[0_0_15px_#fef4f5]"
                          onClick={() => window.open(work.company_link, '_blank')}
                        >
                          <div
                            className=" rounded-full p-1.5 w-full h-full flex justify-center items-center"
                            style={{ background: work.iconBg }}
                          >
                            <img src={work.icon} alt={work.company_name} />
                          </div>
                        </div>
                        <div className="cursor-text">
                          <h4 className="text-white font-bold">{work.title}</h4>

                          <p className="font-medium text-sm text-secondary">{work.company_name}</p>
                        </div>
                      </div>
                    </motion.div>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

// export default AppWrap(MotionWrap(Skills, 'app__skills'), 'skills', 'app__whitebg');
export default SectionWrapper(Skills, 'skills');
