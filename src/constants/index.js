import {
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
    upstash,
    godot,
    n8n,
    // nestjs,
    nextjs,
    nextjs_white,
    cpa,
    nextaura,
    sesame,
    webcup,
    onirix,
    fb_clone,
    flappy_bird,
    slime_adventure,
    pixel_dunking,
    gamefeat,
    juicy,
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
    // {
    //     name: 'Bootstrap',
    //     icon: bootstrap,
    // },
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
    {
        name: 'Godot',
        icon: godot,
    },
    {
        name: 'C#',
        icon: csharp,
    },
    {
        name: 'N8N',
        icon: n8n,
    },
];

const experiences = [
    {
        date: '2024',
        works: [
            {
                title: 'Frontend Developer',
                company_name: 'Nextaura',
                icon: nextaura,
                iconBg: '#ffffff',
                company_link: 'https://www.linkedin.com/company/nextaura/',
            },
        ],
    },
    {
        date: '2021 - 2023',
        works: [
            {
                title: 'Full-stack Developer',
                company_name: 'CPA Sarl',
                icon: cpa,
                iconBg: '#ffffff',
                company_link: 'https://www.experts-cpa.com/apropos/',
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

const projects = [
    {
        name: 'Juicy',
        project_type: 'websites',
        description: 'A web application for sharing, and discovering a variety of recipes, allowing users to connect through culinary ideas.',
        techs: [
            {
                name: 'Next JS',
                icon: nextjs_white,
            },
            {
                name: 'Tailwind CSS',
                icon: tailwind,
            },
        ],
        image: juicy,
        source_code_link: '',
        deployment_link: 'https://juicy-recipe.vercel.app',
    },
    {
        name: 'GameFeat',
        project_type: 'websites',
        description: 'A platform that features a different game every time you refresh the page.',
        techs: [
            {
                name: 'Next JS',
                icon: nextjs_white,
            },
            {
                name: 'Tailwind CSS',
                icon: tailwind,
            },
            {
                name: 'Upstash',
                icon: upstash,
            },
        ],
        image: gamefeat,
        source_code_link: '',
        deployment_link: 'https://gamefeat.vercel.app/',
    },
    {
        name: 'Pixel Dunking',
        project_type: 'games',
        description: 'A competitive 2 vs 2 basketball game in 2D. On a dynamic court, use your individual skills to showcase your team play.',
        techs: [
            {
                name: 'Godot',
                icon: godot,
            },
        ],
        image: pixel_dunking,
        source_code_link: '',
        game_link: 'https://deadpixelmg.itch.io/pixel-dunking',
    },
    {
        name: 'Slime adventure',
        project_type: 'games',
        description: 'A short platfomer game where you play as a young slime undergoing its rite of passage to adulthood',
        techs: [
            {
                name: 'Unity',
                icon: unity2,
            },
        ],
        image: slime_adventure,
        source_code_link: '',
        game_link: 'https://wahhaab.itch.io/slime-adventure',
    },
    {
        name: 'Onirix',
        project_type: 'websites',
        description: 'An immersive platform that describes the hidden meanings of dreams. Earned us 3rd place in 24h by webcup Madagascar hackathon.',
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
        name: 'Facebook clone',
        project_type: 'websites',
        description: 'A Facebook clone that allows to write posts, as well as like and comment on them. My first project to learn the basics of Reactjs.',
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
];

export { technologies, experiences, projects };
