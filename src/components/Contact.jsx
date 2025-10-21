import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { fadeIn, slideIn, textVariant } from '../utils/motion';
import MagicButton from './MagicButton';
import { FaGithub, FaLinkedinIn, FaLocationArrow } from 'react-icons/fa';

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: 'ISMAEL Abdoul Wahhaab',
                    from_email: form.email,
                    to_email: 'ismaelabdoul7@gmail.com',
                    message: form.message,
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
            )
            .then(
                () => {
                    setLoading(false);
                    alert('Thank you. I will get back to you as soon as possible.');

                    setForm({
                        name: '',
                        email: '',
                        message: '',
                    });
                },
                (error) => {
                    setLoading(false);
                    console.error(error);

                    alert('Ahh, something went wrong. Please try again.');
                },
            );
    };

    return (
        <div className='backdrop-blur-md bg-white/[0.02] border border-white/[0.05] rounded-3xl p-10 md:p-12 lg:p-16 w-full'>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Get In Touch</p>
                <h2 className={`${styles.sectionHeadText} mt-3`}>Contact</h2>
            </motion.div>

            <motion.div variants={fadeIn('', '', 0.1, 1)} className='mt-8'>
                <p className='text-white/70 xl:text-[20px] sm:text-[18px] text-[16px] mb-8 font-light leading-relaxed max-w-2xl'>
                    Let's build something great together.
                </p>

                <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
                    <a href='mailto:ismaelabdoul7@gmail.com' className='group interactable'>
                        <div className='px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 flex items-center gap-2'>
                            <span>Send Email</span>
                            <FaLocationArrow className='text-sm transition-transform duration-300 group-hover:translate-x-1' />
                        </div>
                    </a>

                    <div className='flex gap-3'>
                        <a href='https://www.linkedin.com/in/abdoul-wahhaab' target='_blank' rel='noopener noreferrer' className='interactable w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-all duration-300 group'>
                            <FaLinkedinIn className='text-white/70 group-hover:text-white text-xl' />
                        </a>
                        <a href='https://github.com/Abdoul-sudo' target='_blank' rel='noopener noreferrer' className='interactable w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-all duration-300 group'>
                            <FaGithub className='text-white/70 group-hover:text-white text-xl' />
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Contact, 'contact');
