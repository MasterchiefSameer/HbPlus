import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { colors, motion, radius } from '@/theme';

export type IconName = ComponentProps<typeof Feather>['name'];

const sizes = { sm: { box: 32, icon: 16 }, md: { box: 40, icon: 18 } } as const;

export type IconButtonProps = {
  icon: IconName;
  /** Required: icon-only controls have no visible text. */
  label: string;
  size?: keyof typeof sizes;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({ icon, label, size = 'md', selected, onPress, style }: IconButtonProps) {
  const s = sizes[size];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: !!selected }}
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: s.box,
          height: s.box,
          borderRadius: radius.full,
          borderWidth: 1,
          borderColor: colors.sand,
          backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ scale: pressed ? motion.pressScale : 1 }],
        },
        style,
      ]}>
      <Feather name={icon} size={s.icon} color={selected ? colors.terracotta : colors.charcoal} />
    </Pressable>
  );
}
