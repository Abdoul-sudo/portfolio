import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animation configurations for reuse across components

/**
 * Fade up animation config
 * Use with gsap.from() for reveal on scroll
 */
export const fadeUp = {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
};

/**
 * Fade in animation config
 */
export const fadeIn = {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
};

/**
 * Stagger animation for multiple elements (cards, list items)
 */
export const staggerCards = {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out',
};

/**
 * Scale in animation
 */
export const scaleIn = {
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)',
};

/**
 * Slide in from left
 */
export const slideInLeft = {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
};

/**
 * Slide in from right
 */
export const slideInRight = {
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
};

/**
 * Default ScrollTrigger config for section reveals
 */
export const scrollTriggerDefaults = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
};

/**
 * Create a scroll-triggered animation
 * @param {string} trigger - CSS selector for trigger element
 * @param {object} animationConfig - GSAP animation properties
 * @param {object} scrollConfig - ScrollTrigger options (optional)
 */
export const createScrollAnimation = (trigger, animationConfig, scrollConfig = {}) => {
    return {
        ...animationConfig,
        scrollTrigger: {
            trigger,
            ...scrollTriggerDefaults,
            ...scrollConfig,
        },
    };
};

/**
 * Parallax effect helper
 * @param {element} element - DOM element to animate
 * @param {number} speed - Parallax speed (0.5 = half speed, 2 = double speed)
 */
export const createParallax = (element, speed = 0.5) => {
    gsap.to(element, {
        yPercent: 100 * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });
};

/**
 * Button hover animation
 * @param {element} button - Button element
 */
export const buttonHover = (button) => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });
    button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
};

/**
 * Stagger text reveal (split by characters)
 * Note: This is a simple implementation. For production, use SplitText plugin or similar.
 * @param {element} element - Text element
 */
export const staggerTextReveal = (element) => {
    const text = element.innerText;
    const chars = text.split('');
    element.innerHTML = chars.map(char => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');

    gsap.from(element.children, {
        opacity: 0,
        y: 20,
        stagger: 0.03,
        duration: 0.5,
        ease: 'power2.out',
    });
};

export default gsap;
