import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
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
        <nav className={`${styles.paddingX} w-full flex items-center py-6 fixed top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-black/30 border-b border-white/5' : 'bg-transparent'}`}>
            <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
                <Link
                    to='/'
                    className='flex items-center gap-3 group'
                    onClick={() => {
                        setActive('');
                        window.scrollTo(0, 0);
                    }}>
                    <div className='w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-300'>
                        <span className='text-white font-bold text-lg'>A</span>
                    </div>
                    <p className='text-white text-[16px] font-semibold cursor-pointer hidden sm:block'>Abdoul</p>
                </Link>

                <ul className='list-none hidden sm:flex flex-row gap-8'>
                    {navLinks.map((nav) => (
                        <li key={nav.id} className={`${active === nav.title ? 'text-white' : 'text-white/60'} interactable2 hover:text-white text-[14px] font-medium cursor-pointer transition-colors duration-300`} onClick={() => setActive(nav.title)}>
                            <a href={`#${nav.id}`}>{nav.title}</a>
                        </li>
                    ))}
                </ul>

                <div className='sm:hidden flex flex-1 justify-end items-center'>
                    <button onClick={() => setToggle(!toggle)} className='w-8 h-8 flex flex-col items-center justify-center gap-1.5 interactable'>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${toggle ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${toggle ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${toggle ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>

                    <div className={`${!toggle ? 'hidden' : 'flex'} p-6 backdrop-blur-xl bg-black/80 border border-white/10 absolute top-20 right-4 min-w-[160px] z-10 rounded-2xl`}>
                        <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    className={`font-medium cursor-pointer text-[14px] ${active === nav.title ? 'text-white' : 'text-white/60'} hover:text-white transition-colors duration-300`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                    }}>
                                    <a href={`#${nav.id}`}>{nav.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
