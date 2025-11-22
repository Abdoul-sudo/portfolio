/**
 * Metaball Position Configurations for Each Section
 *
 * Each section has 4 metaballs with specific positions optimized for that page's layout.
 * Coordinates are in normalized space where:
 * - x: -4 to 4 (left to right)
 * - y: -3 to 3 (bottom to top)
 * - z: 0 (flat on background plane)
 *
 * RESPONSIVE DESIGN (6 tiers):
 * - Mobile (<768px): Tight x-spread (±1.3), smaller radii (0.3-0.7), portrait layout
 * - Tablet (768-1024px): Moderate x-spread (±2.0), medium radii (0.35-0.8)
 * - Desktop HD (1024-1920px): Standard x-spread (±3.0), radii (0.4-0.9), 1080p optimized
 * - Desktop 2K (1920-2560px): Extended x-spread (±3.5), larger radii (0.5-1.05), 1440p optimized
 * - Desktop 4K (2560px+): Maximum x-spread (±4.0), bold radii (0.6-1.2), 2160p+ optimized
 */

/**
 * Device Detection Utilities
 */
export const DEVICE_BREAKPOINTS = {
  mobile: 768,     // Below 768px width
  tablet: 1024,    // 768px - 1024px width
  desktop: 1920,   // 1024px - 1920px (HD/1080p)
  desktop2k: 2560, // 1920px - 2560px (2K/1440p)
  desktop4k: 3840  // 2560px+ (4K/2160p)
};

export function getDeviceType() {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = width / height;

  // Mobile: narrow width OR portrait orientation
  if (width < DEVICE_BREAKPOINTS.mobile || (width < 900 && aspectRatio < 1)) {
    return 'mobile';
  }

  // Tablet: medium width
  if (width < DEVICE_BREAKPOINTS.tablet) {
    return 'tablet';
  }

  // Desktop HD (1080p) - Standard laptop/desktop
  if (width < DEVICE_BREAKPOINTS.desktop) {
    return 'desktop';
  }

  // Desktop 2K (1440p) - High-res laptop/monitor
  if (width < DEVICE_BREAKPOINTS.desktop2k) {
    return 'desktop2k';
  }

  // Desktop 4K (2160p+) - Ultra high-res displays
  return 'desktop4k';
}

/**
 * DESKTOP HD CONFIGURATIONS (1024px - 1920px)
 * Optimized for standard HD/1080p laptops and desktop monitors
 */
export const METABALL_CONFIGS_DESKTOP = {
  /**
   * HOME/HERO SECTION
   * Frames centered headline beautifully
   */
  home: [
    { x: -2.5, y: 2.0, z: 0.0, radius: 0.85 },   // [0] 🔵 Light Blue - Top left
    { x: 1.0, y: 0.6, z: 0.0, radius: 0.7 },     // [1] 🌸 Coral/Pink - Top right
    { x: -2.0, y: -0.8, z: 0.0, radius: 0.55 },   // [2] 💜 Purple/Lavender - Center left
    { x: 2.8, y: -2.0, z: 0.0, radius: 0.85 }    // [3] 🌿 Mint Green - Bottom right
  ],

  /**
   * WORK SECTION
   * Distributed around project showcase area
   */
  work: [
    { x: -2.8, y: 2.0, z: 0.0, radius: 0.8 },    // [0] 🔵 Light Blue - Top left
    { x: 2.8, y: 2.3, z: 0.0, radius: 0.7 },     // [1] 🌸 Coral/Pink - Top right
    { x: -0.3, y: -0.5, z: 0.0, radius: 0.85 },  // [2] 💜 Purple/Lavender - Center
    { x: 2.4, y: 0.3, z: 0.0, radius: 0.55 }     // [3] 🌿 Mint Green - Mid right
  ],

  /**
   * ABOUT SECTION
   * Clustered around profile photo and bio content
   */
  about: [
    { x: -2.8, y: 1.7, z: 0.0, radius: 0.75 },   // [0] 🔵 Light Blue - Upper left
    { x: -3.5, y: -2.0, z: 0.0, radius: 0.85 },  // [1] 🌸 Coral/Pink - Lower left (large)
    { x: -0.6, y: 0.1, z: 0.0, radius: 0.45 },   // [2] 💜 Purple/Lavender - Mid left
    { x: 3.0, y: -1.0, z: 0.0, radius: 0.75 }     // [3] 🌿 Mint Green - Center
  ],

  /**
   * CONTACT SECTION
   * Balanced across social links and email areas
   */
  contact: [
    { x: -2.5, y: 1.9, z: 0.0, radius: 0.7 },    // [0] 🔵 Light Blue - Upper left
    { x: -0.9, y: -0.9, z: 0.0, radius: 0.5 },   // [1] 🌸 Coral/Pink - Center left
    { x: 1.8, y: 1.5, z: 0.0, radius: 0.65 },    // [2] 💜 Purple/Lavender - Upper right
    { x: 2.8, y: -1.4, z: 0.0, radius: 0.8 }     // [3] 🌿 Mint Green - Mid right (large)
  ]
};

/**
 * TABLET CONFIGURATIONS (768px - 1024px)
 * Optimized for medium screens (iPad, small laptops)
 * Scale factor: ~0.72x horizontal, radii -0.1
 */
export const METABALL_CONFIGS_TABLET = {
  home: [
    { x: -1.8, y: 2.0, z: 0.0, radius: 0.75 },   // [0] 🔵 Light Blue - Top left
    { x: 0.7, y: 0.6, z: 0.0, radius: 0.6 },     // [1] 🌸 Coral/Pink - Top right
    { x: -1.4, y: -0.8, z: 0.0, radius: 0.45 },  // [2] 💜 Purple/Lavender - Center left
    { x: 2.0, y: -2.0, z: 0.0, radius: 0.75 }    // [3] 🌿 Mint Green - Bottom right
  ],

  work: [
    { x: -2.0, y: 2.0, z: 0.0, radius: 0.7 },    // [0] 🔵 Light Blue - Top left
    { x: 2.0, y: 2.3, z: 0.0, radius: 0.6 },     // [1] 🌸 Coral/Pink - Top right
    { x: -0.2, y: -0.5, z: 0.0, radius: 0.75 },  // [2] 💜 Purple/Lavender - Center
    { x: 1.7, y: 0.3, z: 0.0, radius: 0.45 }     // [3] 🌿 Mint Green - Mid right
  ],

  about: [
    { x: -2.0, y: 1.7, z: 0.0, radius: 0.65 },   // [0] 🔵 Light Blue - Upper left
    { x: -2.5, y: -2.0, z: 0.0, radius: 0.75 },  // [1] 🌸 Coral/Pink - Lower left (large)
    { x: -0.4, y: 0.1, z: 0.0, radius: 0.35 },   // [2] 💜 Purple/Lavender - Mid left
    { x: 2.2, y: -1.0, z: 0.0, radius: 0.65 }    // [3] 🌿 Mint Green - Center
  ],

  contact: [
    { x: -1.8, y: 1.9, z: 0.0, radius: 0.6 },    // [0] 🔵 Light Blue - Upper left
    { x: -0.6, y: -0.9, z: 0.0, radius: 0.4 },   // [1] 🌸 Coral/Pink - Center left
    { x: 1.3, y: 1.5, z: 0.0, radius: 0.55 },    // [2] 💜 Purple/Lavender - Upper right
    { x: 2.0, y: -1.4, z: 0.0, radius: 0.7 }     // [3] 🌿 Mint Green - Mid right (large)
  ]
};

/**
 * MOBILE CONFIGURATIONS (<768px)
 * Optimized for phones and narrow portrait screens
 * Scale factor: ~0.48x horizontal, radii -0.2, extended vertical
 */
export const METABALL_CONFIGS_MOBILE = {
  home: [
    { x: -1.2, y: 2.5, z: 0.0, radius: 0.65 },   // [0] 🔵 Light Blue - Top left
    { x: 0.5, y: 0.6, z: 0.0, radius: 0.5 },     // [1] 🌸 Coral/Pink - Top right
    { x: -1.0, y: -0.8, z: 0.0, radius: 0.35 },  // [2] 💜 Purple/Lavender - Center left
    { x: 1.3, y: -2.0, z: 0.0, radius: 0.65 }    // [3] 🌿 Mint Green - Lower right
  ],

  work: [
    { x: -1.3, y: 2.5, z: 0.0, radius: 0.6 },    // [0] 🔵 Light Blue - Top left
    { x: 1.3, y: 2.8, z: 0.0, radius: 0.5 },     // [1] 🌸 Coral/Pink - Top right
    { x: -0.1, y: -0.3, z: 0.0, radius: 0.65 },  // [2] 💜 Purple/Lavender - Center
    { x: 1.2, y: 0.5, z: 0.0, radius: 0.35 }     // [3] 🌿 Mint Green - Mid right
  ],

  about: [
    { x: -1.3, y: 2.2, z: 0.0, radius: 0.55 },   // [0] 🔵 Light Blue - Upper left
    { x: -1.7, y: -1.5, z: 0.0, radius: 0.65 },  // [1] 🌸 Coral/Pink - Lower left (large)
    { x: -0.3, y: 0.1, z: 0.0, radius: 0.25 },   // [2] 💜 Purple/Lavender - Mid left
    { x: 1.4, y: -1.0, z: 0.0, radius: 0.55 }    // [3] 🌿 Mint Green - Center
  ],

  contact: [
    { x: -1.2, y: 2.5, z: 0.0, radius: 0.5 },    // [0] 🔵 Light Blue - Upper left
    { x: -0.4, y: -0.9, z: 0.0, radius: 0.3 },   // [1] 🌸 Coral/Pink - Center left
    { x: 0.9, y: 2.0, z: 0.0, radius: 0.45 },    // [2] 💜 Purple/Lavender - Top right
    { x: 1.3, y: -1.4, z: 0.0, radius: 0.6 }     // [3] 🌿 Mint Green - Mid right (large)
  ]
};

/**
 * 2K DESKTOP CONFIGURATIONS (1920px - 2560px)
 * Optimized for QHD displays and high-res laptops (1440p)
 * Scale factor: ~1.18x horizontal, radii +0.1
 */
export const METABALL_CONFIGS_2K = {
  home: [
    { x: -3.0, y: 2.2, z: 0.0, radius: 0.95 },   // [0] 🔵 Light Blue - Top left
    { x: 1.2, y: 0.6, z: 0.0, radius: 0.8 },     // [1] 🌸 Coral/Pink - Top right
    { x: -2.4, y: -0.8, z: 0.0, radius: 0.65 },  // [2] 💜 Purple/Lavender - Center left
    { x: 3.3, y: -2.0, z: 0.0, radius: 0.95 }    // [3] 🌿 Mint Green - Bottom right
  ],

  work: [
    { x: -3.3, y: 2.2, z: 0.0, radius: 0.9 },    // [0] 🔵 Light Blue - Top left
    { x: 3.3, y: 2.5, z: 0.0, radius: 0.8 },     // [1] 🌸 Coral/Pink - Top right
    { x: -0.4, y: -0.6, z: 0.0, radius: 0.95 },  // [2] 💜 Purple/Lavender - Center
    { x: 2.8, y: 0.4, z: 0.0, radius: 0.65 }     // [3] 🌿 Mint Green - Mid right
  ],

  about: [
    { x: -3.3, y: 1.9, z: 0.0, radius: 0.85 },   // [0] 🔵 Light Blue - Upper left
    { x: -4.1, y: -2.2, z: 0.0, radius: 0.95 },  // [1] 🌸 Coral/Pink - Lower left (large)
    { x: -0.7, y: 0.1, z: 0.0, radius: 0.55 },   // [2] 💜 Purple/Lavender - Mid left
    { x: 3.5, y: -1.0, z: 0.0, radius: 0.85 }    // [3] 🌿 Mint Green - Center
  ],

  contact: [
    { x: -3.0, y: 2.1, z: 0.0, radius: 0.8 },    // [0] 🔵 Light Blue - Upper left
    { x: -1.1, y: -0.9, z: 0.0, radius: 0.6 },   // [1] 🌸 Coral/Pink - Center left
    { x: 2.1, y: 1.7, z: 0.0, radius: 0.75 },    // [2] 💜 Purple/Lavender - Upper right
    { x: 3.3, y: -1.4, z: 0.0, radius: 0.9 }     // [3] 🌿 Mint Green - Mid right (large)
  ]
};

/**
 * 4K DESKTOP CONFIGURATIONS (2560px+)
 * Optimized for UHD displays (2160p) and ultra high-res screens
 * Scale factor: ~1.36x horizontal, radii +0.25
 */
export const METABALL_CONFIGS_4K = {
  home: [
    { x: -3.4, y: 2.4, z: 0.0, radius: 1.1 },    // [0] 🔵 Light Blue - Top left (massive)
    { x: 1.4, y: 0.6, z: 0.0, radius: 0.95 },    // [1] 🌸 Coral/Pink - Top right
    { x: -2.7, y: -0.8, z: 0.0, radius: 0.8 },   // [2] 💜 Purple/Lavender - Center left
    { x: 3.8, y: -2.0, z: 0.0, radius: 1.1 }     // [3] 🌿 Mint Green - Bottom right
  ],

  work: [
    { x: -3.8, y: 2.4, z: 0.0, radius: 1.05 },   // [0] 🔵 Light Blue - Top left
    { x: 3.8, y: 2.7, z: 0.0, radius: 0.95 },    // [1] 🌸 Coral/Pink - Top right
    { x: -0.4, y: -0.7, z: 0.0, radius: 1.1 },   // [2] 💜 Purple/Lavender - Center (hero)
    { x: 3.3, y: 0.5, z: 0.0, radius: 0.8 }      // [3] 🌿 Mint Green - Mid right
  ],

  about: [
    { x: -3.8, y: 2.1, z: 0.0, radius: 1.0 },    // [0] 🔵 Light Blue - Upper left
    { x: -4.8, y: -2.4, z: 0.0, radius: 1.1 },   // [1] 🌸 Coral/Pink - Lower left (statement)
    { x: -0.8, y: 0.1, z: 0.0, radius: 0.7 },    // [2] 💜 Purple/Lavender - Mid left
    { x: 4.1, y: -1.0, z: 0.0, radius: 1.0 }     // [3] 🌿 Mint Green - Center
  ],

  contact: [
    { x: -3.4, y: 2.3, z: 0.0, radius: 0.95 },   // [0] 🔵 Light Blue - Upper left
    { x: -1.2, y: -0.9, z: 0.0, radius: 0.75 },  // [1] 🌸 Coral/Pink - Center left
    { x: 2.4, y: 1.9, z: 0.0, radius: 0.9 },     // [2] 💜 Purple/Lavender - Upper right
    { x: 3.8, y: -1.4, z: 0.0, radius: 1.05 }    // [3] 🌿 Mint Green - Mid right (large)
  ]
};

/**
 * Get the appropriate config object based on device type
 * @returns {Object} Configuration object for current device
 */
function getConfigForDevice() {
  const deviceType = getDeviceType();

  switch (deviceType) {
    case 'mobile':
      return METABALL_CONFIGS_MOBILE;
    case 'tablet':
      return METABALL_CONFIGS_TABLET;
    case 'desktop':
      return METABALL_CONFIGS_DESKTOP;
    case 'desktop2k':
      return METABALL_CONFIGS_2K;
    case 'desktop4k':
      return METABALL_CONFIGS_4K;
    default:
      return METABALL_CONFIGS_DESKTOP;
  }
}

/**
 * Get metaball configuration for a specific section
 * Automatically selects the appropriate config based on device type
 * @param {string} section - Section name (home, work, about, contact)
 * @returns {Array} Array of metaball position objects
 */
export function getMetaballConfig(section) {
  const config = getConfigForDevice();
  return config[section] || config.home || METABALL_CONFIGS_DESKTOP.home;
}

/**
 * Default configuration fallback (desktop home)
 */
export const DEFAULT_CONFIG = METABALL_CONFIGS_DESKTOP.home;

/**
 * Transition timing configuration
 */
export const TRANSITION_CONFIG = {
  duration: 0.8,        // seconds for position transition
  smoothness: 0.15,     // interpolation factor (0-1, lower = smoother)
  easing: 'easeInOut'   // visual easing type
};
