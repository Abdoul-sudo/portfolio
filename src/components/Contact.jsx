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
        <div className='bg-fortiary  shadow-[0_0_4px_#ffffff70] opacity-90  p-10 rounded-2xl w-full'>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Get in touch</p>
                <h2 className={`${styles.sectionHeadText} drop-shadow-[0_0_0.2rem_#ffffff70]`}>Contact</h2>
            </motion.div>
            <motion.p variants={fadeIn('', '', 0.1, 1)} className=' mt-4 text-secondary xl:text-[17px] lg:text-[14px] sm:text-[12px]  max-w-3xl leading-[35px]'>
                Reach out to me and let's discuss how I can help bring your ideas to life!
                <div className='flex gap-8'>
                    <a href='mailto:ismaelabdoul7@gmail.com'>
                        <MagicButton title="Let's get in touch" icon={<FaLocationArrow />} position='right' textClasses='bg-[#050816f0]' />
                    </a>
                    <div className='flex gap-4'>
                        <MagicButton handleClick={() => window.open('https://www.linkedin.com/in/abdoul-wahhaab', '_blank')} title='' icon={<FaLinkedinIn />} position='right' textClasses='bg-[#050816f0] !p-0 text-2xl' buttonClasses='!w-14 interactable2' />
                        <MagicButton handleClick={() => window.open('https://github.com/Abdoul-sudo', '_blank')} title='' icon={<FaGithub />} position='right' textClasses='bg-[#050816f0] !p-0 text-2xl' buttonClasses='!w-14 interactable2' />
                    </div>
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

export default SectionWrapper(Contact, 'contact');
