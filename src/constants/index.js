import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  vuejs,
  reactQuery,
  mysql,
  postgresql,
  bootstrap,
  php,
  laravel,
  symfony,
  nestjs,
  nextjs,
  // meta,
  // starbucks,
  // tesla,
  // shopify,
  // cpa,
  // sesame,
  // webcup,
  carrent,
  jobit,
  tripguide,
  onirix,
  threejs,
} from '../assets';

import meta from '../assets/company/meta.png';
import shopify from '../assets/company/shopify.png';
import starbucks from '../assets/company/starbucks.png';
import tesla from '../assets/company/tesla.png';
import cpa from '../assets/company/cpa.jfif';
import webcup from '../assets/company/webcup.jfif';
import sesame from '../assets/company/sesame.jpg';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'skills',
    title: 'Skills',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Web Developer',
    icon: web,
  },
  {
    title: 'Designer',
    icon: mobile,
  },
  {
    title: 'Backend Developer',
    icon: backend,
  },
  {
    title: 'Entrepreneur',
    icon: creator,
  },
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'PHP',
    icon: php,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  // {
  //   name: 'TypeScript',
  //   icon: typescript,
  // },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Next JS',
    icon: nextjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'React Query',
    icon: reactQuery,
  },
  {
    name: 'Vuejs',
    icon: vuejs,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Bootstrap',
    icon: bootstrap,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  // {
  //   name: 'Nest JS',
  //   icon: nestjs,
  // },
  {
    name: 'Laravel',
    icon: laravel,
  },
  {
    name: 'Symfony',
    icon: symfony,
  },
  {
    name: 'MongoDB',
    icon: mongodb,
  },
  {
    name: 'MySQL',
    icon: mysql,
  },
  {
    name: 'PostgreSQL',
    icon: postgresql,
  },
  // {
  //   name: 'Three JS',
  //   icon: threejs,
  // },
  {
    name: 'Git',
    icon: git,
  },
  {
    name: 'Figma',
    icon: figma,
  },
  // {
  //   name: 'docker',
  //   icon: docker,
  // },
];

const experiences = [
  {
    date: '2021 - 2022',
    works: [
      {
        title: 'Frontend Developer',
        company_name: 'Sesame Program - Guidance and careers platform development',
        icon: sesame,
        iconBg: '#ffffff',
        company_link: 'https://programme-sesame.mg/',
      },
    ],
  },
  {
    date: '2021 - 2023',
    works: [
      {
        title: 'Full stack Developer',
        company_name: 'CPA Sarl',
        icon: cpa,
        iconBg: '#ffffff',
        company_link: 'https://www.experts-cpa.com/apropos',
      },
      {
        title: 'Frontend Developer',
        company_name: '24h by webcup Madagascar hackathon - 3rd place',
        icon: webcup,
        iconBg: '#ffffff',
        company_link: 'https://24h.webcup.fr/',
      },
      // { title: 'Web Developer', company_name: 'Shopify', icon: shopify, iconBg: '#151030' },
    ],
  },
  {
    date: '2023 - Now ',
    works: [
      {
        title: 'Full stack Developer',
        company_name: 'Meta',
        icon: meta,
        iconBg: '#151030',
        company_link: 'https://about.meta.com/fr/',
      },
    ],
  },
];

const testimonials = [
  {
    testimonial:
      'I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.',
    name: 'Sara Lee',
    designation: 'CFO',
    company: 'Acme Co',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: 'Chris Brown',
    designation: 'COO',
    company: 'DEF Corp',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: 'Lisa Wang',
    designation: 'CTO',
    company: '456 Enterprises',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

const projects = [
  {
    name: 'Car Rent',
    description:
      'Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: carrent,
    source_code_link: '',
    deployment_link: '',
  },
  {
    name: 'Onirix',
    description:
      'An immersive platform unveiling the power of Onirix AI in unlocking the hidden meanings of dreams.',
    tags: [
      {
        name: 'reactjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'pocketbase',
        color: 'orange-text-gradient',
      },
      {
        name: 'tailwindcss',
        color: 'green-text-gradient',
      },
      {
        name: 'chatgpt_api',
        color: 'pink-text-gradient',
      },
    ],
    image: onirix,
    source_code_link: '',
    deployment_link: 'https://onirix.iteam-s.mg/',
  },

  {
    name: 'Job IT',
    description:
      'Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'pink-text-gradient',
      },
    ],
    image: jobit,
    source_code_link: 'https://github.com/',
    deployment_link: 'https://onirix.iteam-s.mg/',
  },
  {
    name: 'Trip Guide',
    description:
      'A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: tripguide,
    source_code_link: '',
    deployment_link: '',
  },
];

export { services, technologies, experiences, testimonials, projects };
