import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  // typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  // docker,
  vuejs,
  reactQuery,
  mysql,
  postgresql,
  bootstrap,
  php,
  laravel,
  symfony,
  csharp,
  unity,
  unity2,
  chatgpt,
  // nestjs,
  nextjs,
  cpa,
  sesame,
  webcup,
  onirix,
  fb_clone,
  flappy_bird,
  slime_adventure
  // threejs,
} from '../assets';

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
  // {
  //   name: 'HTML 5',
  //   icon: html,
  // },
  // {
  //   name: 'CSS 3',
  //   icon: css,
  // },
  // {
  //   name: 'PHP',
  //   icon: php,
  // },
  // {
  //   name: 'JavaScript',
  //   icon: javascript,
  // },
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
  // {
  //   name: 'Redux Toolkit',
  //   icon: redux,
  // },
  // {
  //   name: 'React Query',
  //   icon: reactQuery,
  // },
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
  // {
  //   name: 'Node JS',
  //   icon: nodejs,
  // },
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
  // {
  //   name: 'C#',
  //   icon: csharp,
  // },
  // {
  //   name: 'MongoDB',
  //   icon: mongodb,
  // },
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
  // {
  //   name: 'Figma',
  //   icon: figma,
  // },
  // {
  //   name: 'docker',
  //   icon: docker,
  // },
  {
    name: 'Unity',
    icon: unity,
  },
];

const experiences = [
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
      // {
      //   title: 'Frontend Developer',
      //   company_name: '24h by webcup Madagascar hackathon - 3rd place',
      //   icon: webcup,
      //   iconBg: '#ffffff',
      //   company_link: 'https://24h.webcup.fr/',
      // },
      // { title: 'Web Developer', company_name: 'Shopify', icon: shopify, iconBg: '#151030' },
    ],
  },
  // {
  //   date: '2023 - Now ',
  //   works: [
  //     {
  //       title: 'Full stack Developer',
  //       company_name: 'Meta',
  //       icon: meta,
  //       iconBg: '#151030',
  //       company_link: 'https://about.meta.com/fr/',
  //     },
  //   ],
  // },
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
    name: 'Facebook clone',
    description:
      'A Facebook clone that allows to write posts, as well as like and comment on them. My first project to learn the basics of Reactjs.',
    techs: [
      {
        name: 'React JS',
        icon: reactjs,
      },
      {
        name: 'Tailwind CSS',
        icon: tailwind,
      },
    ],
    image: fb_clone,
    source_code_link: '',
    // source_code_link: 'https://github.com/Abdoul-sudo/react-facebook-clone',
    deployment_link: 'https://abd-fb-clone.vercel.app/',
  },
  {
    name: 'Onirix',
    description:
      'An immersive platform that describes the hidden meanings of dreams. Earned us 3rd place in 24h by webcup Madagascar hackathon.',
    techs: [
      {
        name: 'React JS',
        icon: reactjs,
      },
      {
        name: 'Tailwind CSS',
        icon: tailwind,
      },
      {
        name: 'Chatgpt API',
        icon: chatgpt,
      },
      {
        name: 'Figma',
        icon: figma,
      },
    ],
    image: onirix,
    source_code_link: '',
    deployment_link: 'https://onirix.vercel.app/',
  },
  {
    name: 'Slime adventure',
    description:
      'A short platfomer game where you play as a young slime undergoing its rite of passage to adulthood',
    techs: [
      {
        name: 'Unity',
        icon: unity2,
      },
    ],
    image: slime_adventure,
    source_code_link: '',
    game_link: 'https://abdoul-sudo.itch.io/slime-adventure',
  },
];

export { services, technologies, experiences, testimonials, projects };
