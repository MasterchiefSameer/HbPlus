import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, radius, spacing } from '@/theme';

import type { IconName } from './icon-button';
import { ThemedText } from './themed-text';

const tones = {
  neutral: { bg: colors.surface, border: colors.sand, fg: colors.charcoal, accent: colors.terracotta },
  terracotta: { bg: colors.terracottaTint, border: colors.terracottaTint, fg: colors.terracotta, accent: colors.terracotta },
  forest: { bg: colors.forestTint, border: colors.forestBorder, fg: colors.forest, accent: colors.forest },
  gold: { bg: colors.goldTint, border: colors.goldBorder, fg: colors.rust, accent: colors.gold },
  restricted: { bg: colors.restrictedTint, border: colors.restrictedBorder, fg: colors.restricted, accent: colors.restricted },
} as const;

export type BadgeTone = keyof typeof tones;

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  /** Leading status dot in the tone's accent color. */
  dot?: boolean;
  icon?: IconName;
  mono?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Non-interactive tag / protocol badge. Capsule radius per panel 15. */
export function Badge({ label, tone = 'neutral', dot, icon, mono, style }: BadgeProps) {
  const t = tones[tone];
  return (
    <View style={[styles.base, { backgroundColor: t.bg, borderColor: t.border }, style]}>
      {dot && <View style={[styles.dot, { backgroundColor: t.accent }]} />}
      {icon && <Feather name={icon} size={11} color={t.accent} />}
      <ThemedText
        style={{ fontFamily: mono ? fonts.monoMedium : fonts.sansSemiBold, fontSize: 11, lineHeight: 14, color: t.fg }}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.smd,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  dot: { width: 6, height: 6, borderRadius: radius.full },
});
