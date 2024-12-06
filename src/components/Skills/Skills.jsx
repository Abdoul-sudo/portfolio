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
                <p className={`${styles.sectionSubText}`}>What I have done so far</p>
                <h2 className={`${styles.sectionHeadText} drop-shadow-[0_0_0.2rem_#ffffff70]`}>Skills & Experiences.</h2>
            </motion.div>

            <div className='app__skills-container'>
                <motion.div className='app__skills-list'>
                    {technologies.map((skill) => (
                        <motion.div key={skill.name} whileInView={{ opacity: [0, 1] }} transition={{ duration: 0.5 }} className='app__skills-item app__flex'>
                            <div className='app__flex' style={{ backgroundColor: skill.bgColor }}>
                                <img src={skill.icon} alt={skill.name} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className='app__skills-exp'>
                    {experiences.map((experience, index) => (
                        <motion.div key={`${experience.date}-${index}`} className='app__skills-exp-item'>
                            <div className='app__skills-exp-year'>
                                <p className='text-[#b084e9] font-bold '>{experience.date}</p>
                            </div>
                            <motion.div className='app__skills-exp-works'>
                                {experience.works.map((work, id) => (
                                    <motion.div whileInView={{ opacity: [0, 1] }} transition={{ duration: 0.5 }} className='app__skills-exp-work' data-tip data-for={work.title} key={`${index}-${id}`}>
                                        <div className='flex justify-center items-center gap-3'>
                                            <div className='interactable green-pink-gradient rounded-full p-[2.5px] w-[55px] h-[55px] flex justify-center items-center flex-none hover:shadow-[0_0_5px_#fef4f5] overflow-hidden' onClick={() => window.open(work.company_link, '_blank')}>
                                                <div className=' rounded-full p-1.5 w-full h-full overflow-hidden' style={{ background: work.iconBg }}>
                                                    <img src={work.icon} alt={work.company_name} className='w-full h-full object-contain' />
                                                </div>
                                            </div>
                                            <div className='cursor-text'>
                                                <h4 className='text-white font-bold'>{work.title}</h4>
                                                <p className='font-medium text-sm text-secondary text-wrap'>{work.company_name}</p>
                                            </div>
                                        </div>
                                    </motion.div>
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
