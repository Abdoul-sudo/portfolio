import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { styles } from '../styles';
import { logo, menu, close } from '../assets';

// Updated nav links for new design
const navLinks = [
    {
        id: 'about',
        title: 'About',
    },
    {
        id: 'work',
        title: 'Projects',
    },
    {
        id: 'contact',
        title: 'Contact',
    },
];

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

    // Animate nav links on mount
    useGSAP(() => {
        gsap.from('.nav-link', {
            opacity: 0,
            y: -20,
            stagger: 0.1,
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.out',
        });
    }, []);

    return (
        <nav
            className={`${styles.paddingX} w-full flex items-center py-6 fixed top-0 z-20 transition-all duration-300 ${
                scrolled
                    ? 'glass shadow-soft'
                    : 'bg-transparent'
            }`}
        >
            <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
                <Link
                    to='/'
                    className='flex items-center gap-2'
                    onClick={() => {
                        setActive('');
                        window.scrollTo(0, 0);
                    }}
                >
                    <img src={logo} alt='logo' className='w-10 h-10 object-contain' />
                    <p className='text-text-primary text-[20px] font-syne font-bold cursor-pointer flex '>
                        Abdoul
                    </p>
                </Link>

                {/* Desktop Nav */}
                <ul className='list-none hidden sm:flex flex-row gap-10'>
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className={`nav-link relative ${
                                active === nav.title
                                    ? 'text-accent-terracotta'
                                    : 'text-text-primary'
                            } hover:text-accent-terracotta text-[17px] font-inter font-medium cursor-pointer transition-colors duration-300`}
                            onClick={() => setActive(nav.title)}
                        >
                            <a href={`#${nav.id}`} className='relative group'>
                                {nav.title}
                                <span
                                    className={`absolute left-0 -bottom-1 w-full h-0.5 bg-accent-terracotta transform origin-left transition-transform duration-300 ${
                                        active === nav.title
                                            ? 'scale-x-100'
                                            : 'scale-x-0 group-hover:scale-x-100'
                                    }`}
                                />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <div className='sm:hidden flex flex-1 justify-end items-center'>
                    <button
                        onClick={() => setToggle(!toggle)}
                        className='w-8 h-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer'
                        aria-label='Toggle menu'
                    >
                        <span
                            className={`w-7 h-0.5 bg-text-primary transition-all duration-300 ${
                                toggle ? 'rotate-45 translate-y-2' : ''
                            }`}
                        />
                        <span
                            className={`w-7 h-0.5 bg-text-primary transition-all duration-300 ${
                                toggle ? 'opacity-0' : 'opacity-100'
                            }`}
                        />
                        <span
                            className={`w-7 h-0.5 bg-text-primary transition-all duration-300 ${
                                toggle ? '-rotate-45 -translate-y-2' : ''
                            }`}
                        />
                    </button>

                    {/* Mobile Menu */}
                    <div
                        className={`${
                            !toggle ? 'hidden' : 'flex'
                        } p-6 glass absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-2xl shadow-soft-hover`}
                    >
                        <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    className={`font-inter font-medium cursor-pointer text-[16px] ${
                                        active === nav.title
                                            ? 'text-accent-terracotta'
                                            : 'text-text-primary'
                                    } hover:text-accent-terracotta transition-colors duration-300`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                    }}
                                >
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
