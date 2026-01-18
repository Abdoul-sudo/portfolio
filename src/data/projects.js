// Import actual project images
import pixel_dunking from '../assets/projects/pixel_dunking.jpg';
import onirix from '../assets/projects/onirix.png';
import slime_adventure from '../assets/projects/slime_adventure.png';
import gamefeat from '../assets/projects/gamefeat.png';
import juicy from '../assets/projects/juicy.png';
import fb_clone from '../assets/projects/fb_clone.png';
import neonblast from '../assets/projects/neonblast.png';
import flowmora from '../assets/projects/flowmora.png';

export const projectCategories = [
  { id: "all", name: "All Projects" },
  { id: "games", name: "Game Development" },
  { id: "web", name: "Web Development" },
  { id: "mobile", name: "Mobile Apps" } // future-ready, hide if none
];

export const projectsData = [
  {
    id: "pixel-dunking",
    name: "Pixel Dunking",
    categories: ["games"],
    description: "Competitive 2v2 basketball in 2D with dynamic courts and team play.",
    techs: ["Godot"],
    demo_link: "https://deadpixelmg.itch.io/pixel-dunking",
    featured: true,
    cover: pixel_dunking,
    role: "Game Developer",
    year: "2024",
    problem: "Creating an engaging multiplayer basketball experience in 2D while maintaining competitive balance.",
    approach: "Built dynamic court systems and team-based mechanics using Godot's networking capabilities.",
    result: "Launched successful 2v2 basketball game with smooth multiplayer interactions and positive player feedback."
  },
  {
    id: "onirix",
    name: "Onirix",
    categories: ["web"],
    description: "AI-powered dream interpretation. 3rd place at Webcup Madagascar (24h).",
    techs: ["React", "Tailwind", "GPT API", "Figma"],
    demo_link: "https://onirix.vercel.app/",
    featured: true,
    cover: onirix,
    role: "Full-Stack Developer",
    year: "2024",
    problem: "Building an intuitive AI-powered dream interpretation platform within a 24-hour hackathon timeframe.",
    approach: "Integrated GPT API with a React frontend, focusing on user experience and rapid prototyping.",
    result: "Secured 3rd place at Webcup Madagascar, delivering a functional and engaging dream analysis tool."
  },
  {
    id: "slime-adventure",
    name: "Slime Adventure",
    categories: ["games"],
    description: "A short platformer following a young slime's rite of passage.",
    techs: ["Unity"],
    demo_link: "https://wahhaab.itch.io/slime-adventure",
    cover: slime_adventure,
    role: "Game Developer",
    year: "2023",
    problem: "Creating a charming platformer with tight controls and engaging level design.",
    approach: "Designed intuitive movement mechanics and progressive difficulty using Unity's 2D tools.",
    result: "Published on itch.io with positive player reviews highlighting responsive controls and visual charm."
  },
  {
    id: "gamefeat",
    name: "GameFeat",
    categories: ["web"],
    description: "Features a different game on every refresh.",
    techs: ["Next.js", "Tailwind", "Upstash"],
    demo_link: "https://gamefeat.vercel.app/",
    cover: gamefeat,
    role: "Full-Stack Developer",
    year: "2024",
    problem: "Discovering new indie games is challenging; gamers need fresh recommendations.",
    approach: "Built a randomization system with Upstash Redis to showcase curated games on each page load.",
    result: "Deployed game discovery platform that introduces users to diverse indie titles daily."
  },
  {
    id: "juicy",
    name: "Juicy",
    categories: ["web"],
    description: "Recipe sharing app connecting people through culinary ideas.",
    techs: ["Next.js", "Tailwind"],
    demo_link: "https://juicy-recipe.vercel.app",
    cover: juicy,
    role: "Full-Stack Developer",
    year: "2024",
    problem: "Home cooks need an easy way to share and discover recipes in a social format.",
    approach: "Developed a recipe sharing platform with Next.js, focusing on visual presentation and community features.",
    result: "Launched intuitive recipe platform enabling users to share culinary creations and discover new dishes."
  },
  {
    id: "neonblast",
    name: "NeonBlast",
    categories: ["games"],
    description: "Vampire Survivors-style shooter with neon aesthetics and wave-based survival.",
    techs: ["React"],
    demo_link: "https://neonblast.vercel.app",
    cover: neonblast,
    role: "Game Developer",
    year: "2024",
    problem: "Creating an engaging browser-based survival shooter with smooth performance.",
    approach: "Built with React for reactive UI, implementing wave spawning and upgrade systems.",
    result: "Developed addictive arcade shooter with satisfying progression and retro-neon visuals."
  },
  {
    id: "flowmora",
    name: "Flowmora",
    categories: ["web"],
    description: "Smart money manager to track expenses and visualize spending habits.",
    techs: ["Next.js", "Tailwind", "Supabase"],
    demo_link: "https://flowmora.vercel.app",
    cover: flowmora,
    role: "Full-Stack Developer",
    year: "2024",
    problem: "People struggle to track and understand their spending patterns.",
    approach: "Built with Next.js and Supabase for real-time data sync and intuitive expense categorization.",
    result: "Delivered a clean finance dashboard helping users gain control over their budgets."
  }
];

// Helper function to filter projects
export const filterProjects = (categoryId) => {
  if (categoryId === "all") return projectsData;
  return projectsData.filter(project => project.categories.includes(categoryId));
};

// Helper to check if category should be visible
export const shouldShowCategory = (categoryId) => {
  if (categoryId === "all") return true;
  return filterProjects(categoryId).length > 0;
};
