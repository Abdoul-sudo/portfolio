// Import actual project images
import pixel_dunking from "../assets/projects/pixel_dunking.jpg";
import onirix from "../assets/projects/onirix.png";
import slime_adventure from "../assets/projects/slime_adventure.png";
import gamefeat from "../assets/projects/gamefeat.png";
import juicy from "../assets/projects/juicy.png";
import fb_clone from "../assets/projects/fb_clone.png";
import neonblast from "../assets/projects/neonblast.png";
import flowmora from "../assets/projects/flowmora.png";

// Flowmora feature images
import flowmoraHome from "../assets/projects/flowmora/home.png";
import flowmoraTransactions from "../assets/projects/flowmora/transactions.png";
import flowmoraSchedules from "../assets/projects/flowmora/schedules.png";
import flowmoraGoals from "../assets/projects/flowmora/goals.png";
import flowmoraSettings from "../assets/projects/flowmora/settings.jpg";

// GameFeat feature images
import gamefeatHero from "../assets/projects/gamefeat/hero.png";
import gamefeatScreenshots from "../assets/projects/gamefeat/screenshots.png";
import gamefeatFooter from "../assets/projects/gamefeat/footer.png";

export const projectCategories = [
  { id: "all", name: "All Projects" },
  { id: "games", name: "Game Development" },
  { id: "web", name: "Web Development" },
  { id: "mobile", name: "Mobile Apps" }, // future-ready, hide if none
];

export const projectsData = [
  {
    id: "pixel-dunking",
    name: "Pixel Dunking",
    categories: ["games"],
    description:
      "Competitive 2v2 basketball in 2D with dynamic courts and team play.",
    techs: ["Godot"],
    demo_link: "https://deadpixelmg.itch.io/pixel-dunking",
    featured: true,
    cover: pixel_dunking,
    role: "Game Developer",
    year: "2025",
    inspiration:
      "Growing up watching NBA games, I always wanted to capture that fast-paced, competitive energy in a pixelated format. The goal was to make basketball accessible and fun in a couch co-op setting.",
  },
  {
    id: "onirix",
    name: "Onirix",
    categories: ["web"],
    description:
      "AI-powered dream interpretation. 3rd place at Webcup Madagascar (24h).",
    techs: ["React", "Tailwind", "GPT API", "Figma"],
    demo_link: "https://onirix.vercel.app/",
    featured: true,
    cover: onirix,
    role: "Full-Stack Developer",
    year: "2023",
    inspiration:
      "Dreams have always fascinated me - they're mysterious windows into our subconscious. I wanted to build something that helps people explore the meaning behind their dreams using AI, making dream analysis accessible to everyone.",
  },
  {
    id: "slime-adventure",
    name: "Slime Adventure",
    categories: ["games"],
    description:
      "A short platformer following a young slime's rite of passage.",
    techs: ["Unity"],
    demo_link: "https://wahhaab.itch.io/slime-adventure",
    cover: slime_adventure,
    role: "Game Developer",
    year: "2024",
    inspiration:
      "I love how simple characters can tell powerful stories. A slime seemed like the perfect protagonist - bouncy, cute, and underestimated. This game explores growth through a tiny creature's big adventure.",
  },
  {
    id: "gamefeat",
    name: "GameFeat",
    categories: ["web"],
    description: "Showcase a different game with every refresh.",
    techs: ["Next.js", "Tailwind", "Upstash"],
    demo_link: "https://gamefeat.vercel.app/",
    cover: gamefeat,
    role: "Full-Stack Developer",
    year: "2024",
    inspiration:
      "As an indie game enthusiast, I noticed how hard it is to discover hidden gems. With GameFeat, I wanted to showcase games in an original way, something that makes you want to play the game.",
    features: [
      {
        image: gamefeatHero,
        title: "First Impression",
        description: "Every refresh, a new game to discover.",
      },
      {
        image: gamefeatScreenshots,
        title: "See It in Action",
        description: "Screenshots that sell the experience.",
      },
      {
        image: gamefeatFooter,
        title: "Know Before You Play",
        description: "Price, stats, and a direct link to Steam.",
      },
    ],
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
    year: "2025",
    inspiration:
      "Food brings people together. I wanted to create a space where home cooks could share their creations and inspire others - like a digital cookbook that grows with every contribution from the community.",
  },
  {
    id: "neonblast",
    name: "NeonBlast",
    categories: ["games"],
    description:
      "Vampire Survivors-style shooter with neon aesthetics and wave-based survival.",
    techs: ["React"],
    demo_link: "https://neonblast.vercel.app",
    cover: neonblast,
    role: "Game Developer",
    year: "2025",
    inspiration:
      "Vampire Survivors showed me how addictive simple mechanics can be. I wanted to bring that 'just one more run' feeling to the browser with a synthwave aesthetic - no download required, instant action.",
  },
  {
    id: "flowmora",
    name: "Flowmora",
    categories: ["web"],
    description:
      "Smart money manager to track expenses and visualize spending habits.",
    techs: ["Next.js", "Tailwind", "Supabase"],
    demo_link: "https://flowmora.vercel.app",
    cover: flowmora,
    role: "Full-Stack Developer",
    year: "2026",
    inspiration:
      "I wanted a simple, beautiful way to track my spending without the complexity of traditional finance apps. Most budgeting tools feel overwhelming - Flowmora focuses on clarity.",
    features: [
      {
        image: flowmoraHome,
        title: "Dashboard",
        description: "Overview of your finances with spending breakdowns.",
      },
      {
        image: flowmoraTransactions,
        title: "Transactions",
        description: "Log, categorize, and manage all your transactions.",
      },
      {
        image: flowmoraSchedules,
        title: "Scheduled Payments",
        description: "Set up recurring payments and bill reminders.",
      },
      {
        image: flowmoraGoals,
        title: "Savings Goals",
        description: "Track your savings progress with visual milestones.",
      },
      {
        image: flowmoraSettings,
        title: "Settings",
        description: "Manage categories, currency, and preferences.",
      },
    ],
  },
];

// Helper function to filter projects
export const filterProjects = (categoryId) => {
  if (categoryId === "all") return projectsData;
  return projectsData.filter((project) =>
    project.categories.includes(categoryId),
  );
};

// Helper to check if category should be visible
export const shouldShowCategory = (categoryId) => {
  if (categoryId === "all") return true;
  return filterProjects(categoryId).length > 0;
};
