/**
 * HB+ brand palette (reference sheet, panel 02).
 * Mirrored as `--color-*` variables in `src/global.css` so NativeWind
 * utilities (`bg-terracotta`, `text-muted`, ...) resolve to the same values.
 * Light theme only for now.
 */
export const colors = {
  // Brand
  terracotta: '#9F4022', // primary CTAs, key actions
  rust: '#7A2E1A', // pressed / hover states, accents
  cream: '#FCF8F0', // app background canvas
  charcoal: '#1A1918', // headings & primary text
  muted: '#6B6763', // body copy, subtitles
  sand: '#E9E4D8', // dividers, input borders
  forest: '#2D7A4D', // verified states & badges
  restricted: '#C53030', // domain alerts, errors
  gold: '#D97706', // clinician & tier badges, ratings
  glass: 'rgba(255, 255, 255, 0.7)', // floating nav bars, sheets

  // Surfaces
  surface: '#FFFFFF',
  surfaceMuted: '#F6F2EA', // icon boxes, segmented track, chip idle

  // Tints (alert / badge backgrounds and borders)
  terracottaTint: '#F8EAE3',
  forestTint: '#E8F3EC',
  forestBorder: '#BFDCC9',
  restrictedTint: '#FBEAEA',
  restrictedBorder: '#F0C2C2',
  goldTint: '#FDF1DE',
  goldBorder: '#F5D49E',

  // Fixed
  onTint: '#FFFFFF', // text on terracotta / filled surfaces
  googleBlue: '#4285F4', // Google SSO mark (third-party brand requirement)
} as const;

export type ColorToken = keyof typeof colors;
