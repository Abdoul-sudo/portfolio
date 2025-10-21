import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { navLinks } from '../constants';

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
        <nav
            className={`
                ${styles.paddingX} w-full flex items-center py-6 fixed top-0 z-50
                transition-all duration-300
                ${scrolled
                    ? 'backdrop-blur-xl bg-dark/95 border-b border-border'
                    : 'bg-transparent'}
            `}
        >
            <div className='w-full flex justify-between items-center max-w-6xl mx-auto'>
                {/* Logo */}
                <Link
                    to='/'
                    className='flex items-center gap-3'
                    onClick={() => {
                        setActive('');
                        window.scrollTo(0, 0);
                    }}
                >
                    <span className='text-accent hover:text-white text-sm font-medium transition-colors duration-300'>
                        Abdoul Wahhaab
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className='list-none hidden sm:flex flex-row gap-8'>
                    {navLinks.map((nav) => {
                        const isActive = active === nav.title;
                        return (
                            <li
                                key={nav.id}
                                className='interactable2'
                                onClick={() => setActive(nav.title)}
                            >
                                <a
                                    href={`#${nav.id}`}
                                    className={`
                                        text-sm transition-colors duration-300
                                        ${isActive ? 'text-white' : 'text-muted hover:text-accent'}
                                    `}
                                >
                                    {nav.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile Menu Button */}
                <div className='sm:hidden flex flex-1 justify-end items-center'>
                    <button
                        onClick={() => setToggle(!toggle)}
                        className='w-8 h-8 flex flex-col items-center justify-center gap-1.5 interactable'
                    >
                        <span className={`w-6 h-px bg-accent transition-all duration-300 ${toggle ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-6 h-px bg-accent transition-all duration-300 ${toggle ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-px bg-accent transition-all duration-300 ${toggle ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>

                    {/* Mobile Menu */}
                    <div
                        className={`${
                            !toggle ? 'hidden' : 'flex'
                        } p-6 backdrop-blur-xl bg-dark/95 border border-border absolute top-20 right-4 min-w-[180px]`}
                    >
                        <ul className='list-none flex flex-col gap-4 w-full'>
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                    }}
                                >
                                    <a
                                        href={`#${nav.id}`}
                                        className={`
                                            text-sm transition-colors duration-300
                                            ${active === nav.title ? 'text-white' : 'text-muted hover:text-accent'}
                                        `}
                                    >
                                        {nav.title}
                                    </a>
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
