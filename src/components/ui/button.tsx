import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, motion, radius, shadows, spacing } from '@/theme';

import { ThemedText } from './themed-text';

const variants = {
  primary: { bg: colors.terracotta, pressedBg: colors.rust, fg: colors.onTint, border: 'transparent', shadow: shadows.cta },
  secondary: { bg: colors.surface, pressedBg: colors.surfaceMuted, fg: colors.charcoal, border: colors.sand, shadow: shadows.card },
  ghost: { bg: 'transparent', pressedBg: colors.terracottaTint, fg: colors.terracotta, border: 'transparent', shadow: undefined },
  danger: { bg: 'transparent', pressedBg: colors.restrictedTint, fg: colors.restricted, border: 'transparent', shadow: undefined },
} as const;

const sizes = {
  sm: { height: 36, paddingHorizontal: spacing.md, fontSize: 13 },
  md: { height: 44, paddingHorizontal: spacing.mlg, fontSize: 14 },
  lg: { height: 52, paddingHorizontal: spacing.lg, fontSize: 15 },
} as const;

export type ButtonProps = {
  title: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Icon node rendered beside the title. */
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading,
  disabled,
  fullWidth,
  onPress,
  style,
}: ButtonProps) {
  const v = variants[variant];
  const s = sizes[size];
  const inactive = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: !!inactive, busy: !!loading }}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          backgroundColor: pressed ? v.pressedBg : v.bg,
          borderColor: v.border,
          boxShadow: v.shadow,
          opacity: disabled ? 0.45 : 1,
          transform: [{ scale: pressed ? motion.pressScale : 1 }],
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={v.fg} />
      ) : (
        <View style={[styles.content, iconPosition === 'right' && styles.reverse]}>
          {icon}
          <ThemedText style={{ fontFamily: fonts.sansSemiBold, fontSize: s.fontSize, color: v.fg }}>
            {title}
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  reverse: { flexDirection: 'row-reverse' },
});
