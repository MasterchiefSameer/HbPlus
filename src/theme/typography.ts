import type { TextStyle } from 'react-native';

import { colors } from './colors';

/**
 * Font family names as registered by `useFonts` in `src/app/_layout.tsx`.
 * Static per-weight files: weight is chosen via `fontFamily`, never `fontWeight`.
 */
export const fonts = {
  display: 'PlayfairDisplay_700Bold',
  heading: 'PlayfairDisplay_600SemiBold',
  sans: 'PlusJakartaSans_400Regular',
  sansMedium: 'PlusJakartaSans_500Medium',
  sansSemiBold: 'PlusJakartaSans_600SemiBold',
  sansBold: 'PlusJakartaSans_700Bold',
  mono: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',
} as const;

/** Text ramp (reference sheet, panel 03). */
export const type = {
  display: { fontFamily: fonts.display, fontSize: 44, lineHeight: 50, color: colors.charcoal },
  heading: { fontFamily: fonts.heading, fontSize: 26, lineHeight: 32, color: colors.charcoal },
  title: { fontFamily: fonts.heading, fontSize: 20, lineHeight: 26, color: colors.charcoal },
  body: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.muted },
  bodyStrong: { fontFamily: fonts.sansSemiBold, fontSize: 15, lineHeight: 22, color: colors.charcoal },
  label: { fontFamily: fonts.sansSemiBold, fontSize: 13, lineHeight: 18, color: colors.charcoal },
  caption: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 16, color: colors.muted },
  mono: { fontFamily: fonts.mono, fontSize: 12, lineHeight: 16, color: colors.muted },
  overline: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.terracotta,
  },
} as const satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof type;
