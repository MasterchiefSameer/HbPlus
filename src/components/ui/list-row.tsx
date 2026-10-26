import Feather from '@expo/vector-icons/Feather';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import type { IconName } from './icon-button';
import { ThemedText } from './themed-text';

export type ListRowProps = {
  title: string;
  icon?: IconName;
  /** Right-side content (badge, value). A chevron is shown when `onPress` is set. */
  trailing?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** Settings/account row. Pressed feedback is a background highlight, not a scale. */
export function ListRow({ title, icon, trailing, onPress, style }: ListRowProps) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.surfaceMuted }, style]}>
      {icon && <Feather name={icon} size={15} color={colors.muted} />}
      <ThemedText variant="label" style={styles.title}>
        {title}
      </ThemedText>
      {trailing}
      {onPress && <Feather name="chevron-right" size={15} color={colors.muted} />}
    </Pressable>
  );
}

/** Groups rows with hairline separators instead of separate cards. */
export function ListGroup({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.group, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  group: {
    borderWidth: 1,
    borderColor: colors.sand,
    borderRadius: radius.md,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.smd,
    minHeight: 44,
    paddingHorizontal: spacing.smd,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.sand,
  },
  title: { flex: 1, fontSize: 12 },
});
