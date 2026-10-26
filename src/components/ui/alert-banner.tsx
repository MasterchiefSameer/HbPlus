import Feather from '@expo/vector-icons/Feather';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { ThemedText } from './themed-text';

const tones = {
  success: { bg: colors.forestTint, border: colors.forestBorder, accent: colors.forest, icon: 'check' },
  error: { bg: colors.restrictedTint, border: colors.restrictedBorder, accent: colors.restricted, icon: 'alert-triangle' },
} as const;

export type AlertBannerProps = {
  tone: keyof typeof tones;
  /** Message; may contain nested `<ThemedText>` for emphasis. */
  children: ReactNode;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** Inline status feedback (panel 14). Never an `alert()`. */
export function AlertBanner({ tone, children, onDismiss, style }: AlertBannerProps) {
  const t = tones[tone];
  return (
    <View
      accessibilityRole="alert"
      style={[styles.base, { backgroundColor: t.bg, borderColor: t.border }, style]}>
      <View style={[styles.iconBox, { backgroundColor: t.accent }]}>
        <Feather name={t.icon} size={12} color={colors.onTint} />
      </View>
      <ThemedText variant="body" color={colors.charcoal} style={styles.text}>
        {children}
      </ThemedText>
      {onDismiss && (
        <Pressable accessibilityRole="button" accessibilityLabel="Dismiss" onPress={onDismiss} hitSlop={8}>
          <Feather name="x" size={16} color={colors.muted} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.smd,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.smd,
    borderWidth: 1,
    borderRadius: radius.md,
    borderCurve: 'continuous',
  },
  iconBox: { width: 20, height: 20, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center' },
  text: { flex: 1, fontSize: 13, lineHeight: 19 },
});
