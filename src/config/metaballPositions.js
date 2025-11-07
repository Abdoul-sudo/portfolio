/**
 * Metaball Position Configurations for Each Section
 *
 * Each section has 6 metaballs with specific positions optimized for that page's layout.
 * Coordinates are in normalized space where:
 * - x: -4 to 4 (left to right)
 * - y: -3 to 3 (bottom to top)
 * - z: 0 (flat on background plane)
 */

export const METABALL_CONFIGS = {
  /**
   * HOME/HERO SECTION
   * Current positions work well - frames centered headline beautifully
   */
  home: [
    { x: -2.5, y: 2.0, z: 0.0, radius: 0.85 },   // Top left - Large
    { x: 2.2, y: 1.8, z: 0.0, radius: 0.7 },     // Top right - Medium-large
    { x: -1.0, y: 0.2, z: 0.0, radius: 0.65 },   // Center left - Medium
    { x: 2.0, y: -2.2, z: 0.0, radius: 0.75 },   // Bottom right - Medium-large
    { x: -2.5, y: -2.1, z: 0.0, radius: 0.85 },  // Bottom left - Large
    { x: 1.3, y: -0.5, z: 0.0, radius: 0.4 }     // Center right small - Small accent
  ],

  /**
   * WORK SECTION
   * Positioned around project cards in grid-aware pattern
   * - 2 metaballs flanking "WORK 6" header
   * - 2 near Pixel Dunking card (featured project)
   * - 2 in lower section near GameFeat/Juicy projects
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
   * - 3 metaballs near profile photo (left side)
   * - 2 around skill tag clusters
   * - 1 in upper right for balance
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
   * - 2 near "SOCIAL MEDIAS" section
   * - 2 near "MAIL" section
   * - 2 floating in negative space
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
 * Default configuration fallback
 */
export const DEFAULT_CONFIG = METABALL_CONFIGS.home;

/**
 * Get metaball configuration for a specific section
 * @param {string} section - Section name (home, work, about, contact)
 * @returns {Array} Array of metaball position objects
 */
export function getMetaballConfig(section) {
  return METABALL_CONFIGS[section] || DEFAULT_CONFIG;
}

/**
 * Transition timing configuration
 */
export const TRANSITION_CONFIG = {
  duration: 0.8,        // seconds for position transition
  smoothness: 0.15,     // interpolation factor (0-1, lower = smoother)
  easing: 'easeInOut'   // visual easing type
};
