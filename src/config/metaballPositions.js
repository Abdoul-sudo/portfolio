/**
 * Metaball Position Configurations for Each Section
 *
 * Each section has 6 metaballs with specific positions optimized for that page's layout.
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
 * HD DESKTOP CONFIGURATIONS (Default)
 * Optimized for wide screens, landscape orientation
 */
export const METABALL_CONFIGS_DESKTOP = {
  /**
   * HOME/HERO SECTION
   * Current positions work well - frames centered headline beautifully
   */
  home: [
    { x: -2.5, y: 2.0, z: 0.0, radius: 0.85 },   // Top left corner - Large
    { x: 2.2, y: 1.8, z: 0.0, radius: 0.7 },     // Top right near corner - Medium-large
    { x: -1.0, y: 0.2, z: 0.0, radius: 0.65 },   // Center left - Medium
    { x: 2.0, y: -2.2, z: 0.0, radius: 0.75 },   // Bottom right - Medium-large
    { x: -2.5, y: -2.1, z: 0.0, radius: 0.85 },  // Bottom left corner - Large
    { x: 1.3, y: -0.5, z: 0.0, radius: 0.4 }     // Center right small - Small accent
  ],

  /**
   * WORK SECTION
   * Positioned around project cards in grid-aware pattern
   */
  work: [
    { x: -2.8, y: 2.3, z: 0.0, radius: 0.7 },    // Top left - flanking header
    { x: 2.8, y: 2.3, z: 0.0, radius: 0.7 },     // Top right - flanking header
    { x: -2.2, y: 0.5, z: 0.0, radius: 0.85 },   // Mid left - near Pixel Dunking
    { x: 2.4, y: 0.3, z: 0.0, radius: 0.75 },    // Mid right - near Pixel Dunking
    { x: -2.0, y: -2.0, z: 0.0, radius: 0.65 },  // Bottom left - near GameFeat
    { x: 2.2, y: -1.8, z: 0.0, radius: 0.6 }     // Bottom right - near Juicy
  ],

  /**
   * ABOUT SECTION
   * Concentrated near profile photo and skill clusters
   */
  about: [
    { x: -2.8, y: 1.5, z: 0.0, radius: 0.8 },    // Upper left - near photo
    { x: -2.5, y: 0.0, z: 0.0, radius: 0.9 },    // Mid left - emphasizing photo
    { x: -2.2, y: -1.5, z: 0.0, radius: 0.75 },  // Lower left - near photo bottom
    { x: 1.5, y: 1.0, z: 0.0, radius: 0.65 },    // Upper mid - near skill tags
    { x: 2.0, y: -0.8, z: 0.0, radius: 0.7 },    // Lower mid - near expertise blocks
    { x: 3.0, y: 2.2, z: 0.0, radius: 0.5 }      // Upper right - balance composition
  ],

  /**
   * CONTACT SECTION
   * Filling minimalist layout without overwhelming
   */
  contact: [
    { x: -2.5, y: 1.8, z: 0.0, radius: 0.75 },   // Upper left - near social media header
    { x: -1.8, y: 0.5, z: 0.0, radius: 0.7 },    // Mid left - near social links
    { x: 2.2, y: 1.5, z: 0.0, radius: 0.8 },     // Upper right - near mail header
    { x: 2.5, y: 0.0, z: 0.0, radius: 0.65 },    // Mid right - near email
    { x: -0.5, y: -1.5, z: 0.0, radius: 0.6 },   // Lower center - negative space
    { x: 1.0, y: -2.0, z: 0.0, radius: 0.55 }    // Lower right - negative space balance
  ]
};

/**
 * TABLET CONFIGURATIONS
 * Optimized for medium screens (768px - 1024px)
 * - Reduced horizontal spread (x coordinates scaled ~0.7x)
 * - Slightly adjusted vertical positions
 * - Smaller radii for better proportion
 */
export const METABALL_CONFIGS_TABLET = {
  home: [
    { x: -1.8, y: 2.0, z: 0.0, radius: 0.75 },   // Top left
    { x: 1.6, y: 1.8, z: 0.0, radius: 0.6 },     // Top right
    { x: -0.7, y: 0.2, z: 0.0, radius: 0.55 },   // Center left
    { x: 1.5, y: -2.0, z: 0.0, radius: 0.65 },   // Bottom right
    { x: -1.8, y: -2.0, z: 0.0, radius: 0.75 },  // Bottom left
    { x: 1.0, y: -0.5, z: 0.0, radius: 0.35 }    // Center right accent
  ],

  work: [
    { x: -2.0, y: 2.3, z: 0.0, radius: 0.6 },    // Top left
    { x: 2.0, y: 2.3, z: 0.0, radius: 0.6 },     // Top right
    { x: -1.6, y: 0.5, z: 0.0, radius: 0.75 },   // Mid left
    { x: 1.7, y: 0.3, z: 0.0, radius: 0.65 },    // Mid right
    { x: -1.5, y: -1.8, z: 0.0, radius: 0.55 },  // Bottom left
    { x: 1.6, y: -1.6, z: 0.0, radius: 0.5 }     // Bottom right
  ],

  about: [
    { x: -2.0, y: 1.5, z: 0.0, radius: 0.7 },    // Upper left
    { x: -1.8, y: 0.0, z: 0.0, radius: 0.8 },    // Mid left
    { x: -1.6, y: -1.5, z: 0.0, radius: 0.65 },  // Lower left
    { x: 1.2, y: 1.0, z: 0.0, radius: 0.55 },    // Upper mid
    { x: 1.5, y: -0.8, z: 0.0, radius: 0.6 },    // Lower mid
    { x: 2.2, y: 2.2, z: 0.0, radius: 0.45 }     // Upper right
  ],

  contact: [
    { x: -1.8, y: 1.8, z: 0.0, radius: 0.65 },   // Upper left
    { x: -1.3, y: 0.5, z: 0.0, radius: 0.6 },    // Mid left
    { x: 1.6, y: 1.5, z: 0.0, radius: 0.7 },     // Upper right
    { x: 1.8, y: 0.0, z: 0.0, radius: 0.55 },    // Mid right
    { x: -0.4, y: -1.5, z: 0.0, radius: 0.5 },   // Lower center
    { x: 0.8, y: -1.8, z: 0.0, radius: 0.45 }    // Lower right
  ]
};

/**
 * MOBILE CONFIGURATIONS
 * Optimized for narrow screens, portrait orientation
 * - Tight horizontal spread (x coordinates scaled ~0.5x)
 * - Extended vertical range for portrait layout
 * - Smaller radii to avoid overwhelming small screens
 * - Positioned to not obscure text content
 */
export const METABALL_CONFIGS_MOBILE = {
  home: [
    { x: -1.2, y: 2.5, z: 0.0, radius: 0.6 },    // Top left
    { x: 1.1, y: 2.3, z: 0.0, radius: 0.5 },     // Top right
    { x: -0.5, y: 0.8, z: 0.0, radius: 0.45 },   // Upper center left
    { x: 0.9, y: -1.5, z: 0.0, radius: 0.55 },   // Lower right
    { x: -1.1, y: -2.3, z: 0.0, radius: 0.65 },  // Bottom left
    { x: 0.6, y: -0.2, z: 0.0, radius: 0.3 }     // Center accent
  ],

  work: [
    { x: -1.3, y: 2.8, z: 0.0, radius: 0.5 },    // Top left (above header)
    { x: 1.3, y: 2.8, z: 0.0, radius: 0.5 },     // Top right (above header)
    { x: -1.0, y: 1.0, z: 0.0, radius: 0.6 },    // Upper left
    { x: 1.1, y: 0.5, z: 0.0, radius: 0.55 },    // Upper right
    { x: -0.9, y: -1.5, z: 0.0, radius: 0.5 },   // Lower left
    { x: 1.0, y: -2.0, z: 0.0, radius: 0.45 }    // Lower right
  ],

  about: [
    { x: -1.1, y: 2.2, z: 0.0, radius: 0.6 },    // Top left
    { x: -0.9, y: 0.8, z: 0.0, radius: 0.7 },    // Upper left (near content)
    { x: -0.8, y: -0.8, z: 0.0, radius: 0.6 },   // Lower left
    { x: 0.8, y: 1.5, z: 0.0, radius: 0.5 },     // Upper right
    { x: 0.9, y: -0.3, z: 0.0, radius: 0.55 },   // Mid right
    { x: 1.2, y: -2.0, z: 0.0, radius: 0.4 }     // Lower right
  ],

  contact: [
    { x: -1.0, y: 2.5, z: 0.0, radius: 0.55 },   // Top left
    { x: -0.8, y: 1.0, z: 0.0, radius: 0.5 },    // Upper left
    { x: 0.9, y: 2.0, z: 0.0, radius: 0.6 },     // Top right
    { x: 1.0, y: 0.5, z: 0.0, radius: 0.5 },     // Upper right
    { x: -0.3, y: -1.2, z: 0.0, radius: 0.45 },  // Lower center
    { x: 0.6, y: -2.2, z: 0.0, radius: 0.4 }     // Bottom right
  ]
};

/**
 * 2K DESKTOP CONFIGURATIONS (1440p / QHD)
 * Optimized for 2560x1440 displays and high-res laptops
 * - Extended horizontal spread (x coordinates scaled ~1.15x)
 * - Larger radii for better visibility on high-DPI screens
 * - More dramatic positioning for immersive experience
 * - Takes advantage of extra screen real estate
 */
export const METABALL_CONFIGS_2K = {
    home: [
        { x: -4.0, y: 2.2, z: 0.0, radius: 0.95 }, // Top left - Extra large
        { x: 2.7, y: 2.0, z: 0.0, radius: 0.85 }, // Top right - Large
        { x: -1.3, y: 0.3, z: 0.0, radius: 0.75 }, // Center left - Medium-large
        { x: 2.5, y: -2.4, z: 0.0, radius: 0.9 }, // Bottom right - Large
        { x: -3.7, y: -2.3, z: 0.0, radius: 0.9 }, // Bottom left - Extra large
        { x: 1.6, y: -0.6, z: 0.0, radius: 0.5 }, // Center accent
    ],

    work: [
        { x: -3.3, y: 2.5, z: 0.0, radius: 0.85 }, // Top left - Wide placement
        { x: 3.3, y: 2.5, z: 0.0, radius: 0.85 }, // Top right - Wide placement
        { x: -2.7, y: 0.6, z: 0.0, radius: 1.0 }, // Mid left - Large feature
        { x: 2.9, y: 0.4, z: 0.0, radius: 0.9 }, // Mid right - Large
        { x: -2.5, y: -2.2, z: 0.0, radius: 0.8 }, // Bottom left
        { x: 2.7, y: -2.0, z: 0.0, radius: 0.75 }, // Bottom right
    ],

    about: [
        { x: -3.3, y: 1.7, z: 0.0, radius: 0.95 }, // Upper left - Prominent
        { x: -3.0, y: 0.0, z: 0.0, radius: 1.05 }, // Mid left - Hero blob
        { x: -2.7, y: -1.7, z: 0.0, radius: 0.9 }, // Lower left
        { x: 1.9, y: 1.2, z: 0.0, radius: 0.8 }, // Upper mid
        { x: 2.5, y: -1.0, z: 0.0, radius: 0.85 }, // Lower mid
        { x: 3.5, y: 2.4, z: 0.0, radius: 0.65 }, // Upper right accent
    ],

    contact: [
        { x: -3.0, y: 2.0, z: 0.0, radius: 0.9 }, // Upper left
        { x: -2.2, y: 0.6, z: 0.0, radius: 0.85 }, // Mid left
        { x: 2.7, y: 1.7, z: 0.0, radius: 0.95 }, // Upper right
        { x: 3.0, y: 0.0, z: 0.0, radius: 0.8 }, // Mid right
        { x: -0.6, y: -1.7, z: 0.0, radius: 0.75 }, // Lower center
        { x: 1.3, y: -2.2, z: 0.0, radius: 0.7 }, // Lower right
    ],
};

/**
 * 4K DESKTOP CONFIGURATIONS (2160p / UHD)
 * Optimized for 3840x2160+ displays and ultra high-res screens
 * - Maximum horizontal spread (x coordinates scaled ~1.3x)
 * - Large, bold radii for stunning visual impact
 * - Cinematic positioning that fills the viewport
 * - Premium experience for high-end displays
 */
export const METABALL_CONFIGS_4K = {
  home: [
    { x: -3.5, y: 2.4, z: 0.0, radius: 1.15 },   // Top left - Massive
    { x: 3.2, y: 2.2, z: 0.0, radius: 1.0 },     // Top right - Very large
    { x: -1.5, y: 0.4, z: 0.0, radius: 0.9 },    // Center left - Large
    { x: 3.0, y: -2.6, z: 0.0, radius: 1.05 },   // Bottom right - Very large
    { x: -3.5, y: -2.5, z: 0.0, radius: 1.15 },  // Bottom left - Massive
    { x: 2.0, y: -0.7, z: 0.0, radius: 0.6 }     // Center accent
  ],

  work: [
    { x: -3.8, y: 2.7, z: 0.0, radius: 1.0 },    // Top left - Ultra wide
    { x: 3.8, y: 2.7, z: 0.0, radius: 1.0 },     // Top right - Ultra wide
    { x: -3.2, y: 0.7, z: 0.0, radius: 1.15 },   // Mid left - Hero blob
    { x: 3.4, y: 0.5, z: 0.0, radius: 1.05 },    // Mid right - Very large
    { x: -3.0, y: -2.4, z: 0.0, radius: 0.95 },  // Bottom left
    { x: 3.2, y: -2.2, z: 0.0, radius: 0.9 }     // Bottom right
  ],

  about: [
    { x: -3.8, y: 1.9, z: 0.0, radius: 1.1 },    // Upper left - Dominant
    { x: -3.5, y: 0.0, z: 0.0, radius: 1.2 },    // Mid left - Statement piece
    { x: -3.2, y: -1.9, z: 0.0, radius: 1.05 },  // Lower left - Large
    { x: 2.3, y: 1.4, z: 0.0, radius: 0.95 },    // Upper mid
    { x: 3.0, y: -1.2, z: 0.0, radius: 1.0 },    // Lower mid
    { x: 4.0, y: 2.6, z: 0.0, radius: 0.75 }     // Upper right balance
  ],

  contact: [
    { x: -3.5, y: 2.2, z: 0.0, radius: 1.05 },   // Upper left - Large
    { x: -2.6, y: 0.7, z: 0.0, radius: 1.0 },    // Mid left
    { x: 3.2, y: 1.9, z: 0.0, radius: 1.1 },     // Upper right - Large
    { x: 3.5, y: 0.0, z: 0.0, radius: 0.95 },    // Mid right
    { x: -0.8, y: -1.9, z: 0.0, radius: 0.9 },   // Lower center
    { x: 1.6, y: -2.4, z: 0.0, radius: 0.85 }    // Lower right
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
