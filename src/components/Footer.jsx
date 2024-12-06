import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { FaGithub, FaItchIo, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        // <nav className={`${styles.paddingX}  w-full bg-primary`}>
        //   <div className="w-full flex justify-between items-center max-w-7xl mx-auto py-10 ">
        //     <Link
        //       to="/"
        //       className="flex items-center gap-2"
        //       onClick={() => {
        //         setActive('');
        //         window.scrollTo(0, 0);
        //       }}
        //     >
        //       <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
        //       <p className="text-white text-[18px] font-bold cursor-pointer flex ">
        //         Abdoul &nbsp;
        //         <span className="sm:block hidden"> | Portfolio</span>
        //       </p>
        //     </Link>

        //     <ul className="list-none hidden sm:flex flex-row gap-10">
        //       {navLinks.map((nav) => (
        //         <li
        //           key={nav.id}
        //           className={`${
        //             active === nav.title ? 'text-white' : 'text-secondary'
        //           } hover:text-white text-[18px] font-medium cursor-pointer`}
        //           onClick={() => setActive(nav.title)}
        //         >
        //           <a href={`#${nav.id}`}>{nav.title}</a>
        //         </li>
        //       ))}
        //     </ul>
        //   </div>
        // </nav>

        <footer class='bg-primary  w-full shadow   py-1 drop-shadow-[0_0_0.1rem_#ffffff70] '>
            <div class='w-full mx-auto max-w-screen-xl p-4 flex flex-col items-center justify-center gap-5 sm:flex-row sm:items-center sm:justify-between'>
                <span class='text-lg font-bold sm:text-center text-[#f2f2f2]'>
                    © 2024 {/* <a href="https://flowbite.com/" class="hover:underline"> */}
                    Abdoul Wahhaab
                    {/* </a>{' '} */}
                    {/* All Rights Reserved. */}
                </span>
                <ul className='list-none flex flex-row gap-10'>
                    <div onClick={() => window.open('https://www.linkedin.com/in/abdoul-wahhaab', '_blank')} className='interactable2 w-11 h-11 border-1 p-1 rounded-full flex justify-center items-center cursor-pointer  text-[#f2f2f2] hover:text-white text-3xl '>
                        <FaLinkedinIn />
                    </div>
                    <div onClick={() => window.open('https://github.com/Abdoul-sudo', '_blank')} className='interactable2 w-11 h-11 p-1 rounded-full flex justify-center items-center cursor-pointer text-[#f2f2f2] hover:text-white text-3xl'>
                        <FaGithub />
                    </div>
                    <div onClick={() => window.open('https://wahhaab.itch.io/', '_blank')} className='interactable2 w-11 h-11 p-1 rounded-full flex justify-center items-center cursor-pointer text-[#f2f2f2] hover:text-white text-3xl'>
                        <FaItchIo />
                    </div>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
