import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, radius, spacing } from '@/theme';

import { ThemedText } from './themed-text';

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** Filter chip: selected = terracotta fill, idle = white with sand border. */
export function Chip({ label, selected, onPress, style }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: 32,
          paddingHorizontal: spacing.smd,
          borderRadius: radius.full,
          borderWidth: 1,
          justifyContent: 'center',
          borderColor: selected ? colors.terracotta : colors.sand,
          backgroundColor: selected ? colors.terracotta : pressed ? colors.surfaceMuted : colors.surface,
        },
        style,
      ]}>
      <ThemedText
        variant="label"
        color={selected ? colors.onTint : colors.charcoal}
        style={{ fontFamily: fonts.sansSemiBold, fontSize: 12 }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}
