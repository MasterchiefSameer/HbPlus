import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing } from '@/theme';

export type CardProps = {
  children: ReactNode;
  /** `panel` = top-level section surface; `inset` = nested block on a muted background. */
  variant?: 'panel' | 'inset';
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, variant = 'panel', style }: CardProps) {
  const panel = variant === 'panel';
  return (
    <View
      style={[
        {
          backgroundColor: panel ? colors.surface : colors.surfaceMuted,
          borderRadius: panel ? radius.xl : radius.md,
          borderCurve: 'continuous',
          padding: panel ? spacing.mlg : spacing.smd,
          gap: spacing.md,
          boxShadow: panel ? shadows.card : undefined,
          borderWidth: panel ? 1 : 0,
          borderColor: colors.sand,
        },
        style,
      ]}>
      {children}
    </View>
  );
}
