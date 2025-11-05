import { motion } from 'framer-motion';
import './Skills.scss';
import { technologies } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { styles } from '../../styles';
import { textVariant, fadeIn } from '../../utils/motion';

const Skills = () => {
    return (
        <div className='w-full max-w-4xl mx-auto'>
            {/* Section header */}
            <motion.div variants={textVariant()} className='mb-12'>
                <p className={styles.sectionSubText}>Tech Stack</p>
                <h2 className={styles.sectionHeadText}>
                    Tools & Technologies
                </h2>
            </motion.div>

            {/* Compact skills grid */}
            <motion.div
                variants={fadeIn('', '', 0.1, 1)}
                className='flex flex-wrap gap-3'
            >
                {technologies.map((skill, index) => (
                    <div
                        key={skill.name}
                        className='group flex items-center gap-2 px-4 py-2 border border-border hover:border-accent transition-colors duration-300'
                    >
                        <img
                            src={skill.icon}
                            alt={skill.name}
                            className='w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300'
                        />
                        <span className='text-muted group-hover:text-accent text-sm transition-colors duration-300'>
                            {skill.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Skills, 'skills');
