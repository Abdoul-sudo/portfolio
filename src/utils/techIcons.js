// Import colored tech icons from assets
import reactIcon from '../assets/tech/reactjs.png';
import tailwindIcon from '../assets/tech/tailwind.png';
import godotIcon from '../assets/tech/godot.png';
import figmaIcon from '../assets/tech/figma.png';
import chatgptIcon from '../assets/tech/chatgpt.png';
import upstashIcon from '../assets/tech/upstash.svg';

// Import react-icons as fallback
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiUnity,
  SiGodotengine,
  SiFigma,
  SiOpenai,
  SiRedis
} from 'react-icons/si';

/**
 * Tech Icon Mapping - Image paths
 * Maps technology names to their corresponding colored icon images
 */
export const techIconImages = {
  // Frontend Frameworks
  'React': reactIcon,

  // Styling
  'Tailwind': tailwindIcon,

  // Game Engines
  'Godot': godotIcon,

  // Design Tools
  'Figma': figmaIcon,

  // APIs & Services
  'ChatGPT API': chatgptIcon,
  'GPT API': chatgptIcon,
  'Upstash': upstashIcon
};

/**
 * Tech Icon Mapping - React Icons (fallback)
 * Maps technology names to their corresponding React Icon components
 */
export const techIconComponents = {
  // Frontend Frameworks
  'React': SiReact,
  'Next.js': SiNextdotjs,

  // Styling
  'Tailwind': SiTailwindcss,

  // Game Engines
  'Unity': SiUnity,
  'Godot': SiGodotengine,

  // Design Tools
  'Figma': SiFigma,

  // APIs & Services
  'ChatGPT API': SiOpenai,
  'GPT API': SiOpenai,
  'Upstash': SiRedis
};

/**
 * Get icon for a technology (image path or React component)
 * @param {string} techName - Technology name
 * @returns {{ type: 'image' | 'component', value: string | Component } | null}
 */
export const getTechIcon = (techName) => {
  // First, try to get the image
  const imagePath = techIconImages[techName];
  if (imagePath) {
    return { type: 'image', value: imagePath };
  }

  // Fallback to React icon component
  const iconComponent = techIconComponents[techName];
  if (iconComponent) {
    return { type: 'component', value: iconComponent };
  }

  // No icon found
  return null;
};
