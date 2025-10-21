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
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText}`}>Tech Stack</p>
                <h2 className={`${styles.sectionHeadText} mt-3`}>Skills</h2>
            </motion.div>

            <motion.div className='mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6'>
                {technologies.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        whileInView={{ opacity: [0, 1], y: [20, 0] }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className='group'>
                        <div className='backdrop-blur-md bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 flex flex-col items-center justify-center aspect-square hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300'>
                            <img src={skill.icon} alt={skill.name} className='w-12 h-12 object-contain mb-3 transition-transform duration-300 group-hover:scale-110' />
                            <p className='text-white/70 text-[11px] text-center font-medium'>{skill.name}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

// export default AppWrap(MotionWrap(Skills, 'app__skills'), 'skills', 'app__whitebg');
export default SectionWrapper(Skills, 'skills');
