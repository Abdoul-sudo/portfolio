// Placeholder image generator for testing
// Replace these with actual project images in production

export const createPlaceholderImage = (projectName, width = 800, height = 450) => {
  // Create SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${projectName}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#22D3EE;stop-opacity:0.5" />
          <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad-${projectName})"/>
      <text
        x="50%"
        y="50%"
        font-family="Arial, sans-serif"
        font-size="32"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${projectName}
      </text>
    </svg>
  `;

  // Convert SVG to data URL
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Generate placeholders for all projects
export const placeholderImages = {
  'pixel-dunking': createPlaceholderImage('Pixel Dunking'),
  'onirix': createPlaceholderImage('Onirix'),
  'slime-adventure': createPlaceholderImage('Slime Adventure'),
  'gamefeat': createPlaceholderImage('GameFeat'),
  'juicy': createPlaceholderImage('Juicy'),
  'facebook-clone': createPlaceholderImage('Facebook Clone')
};

// Helper to get image path (checks if real image exists, falls back to placeholder)
export const getProjectImage = (projectId) => {
  // Try to use real image path first
  const realImagePath = `/assets/projects/${projectId}.jpg`;

  // In production, you'd check if the image exists
  // For now, you can manually toggle between real images and placeholders
  const useRealImages = false; // Set to true when you have real images

  return useRealImages ? realImagePath : placeholderImages[projectId];
};
