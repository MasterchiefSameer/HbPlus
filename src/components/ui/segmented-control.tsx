import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, radius, shadows, spacing } from '@/theme';

import type { IconName } from './icon-button';
import { ThemedText } from './themed-text';

export type SegmentOption<T extends string> = { value: T; label: string; icon?: IconName };

export type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
};

export function SegmentedControl<T extends string>({ options, value, onChange, style }: SegmentedControlProps<T>) {
  return (
    <View accessibilityRole="tablist" style={[styles.track, style]}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(o.value)}
            style={[styles.segment, active && styles.active]}>
            {o.icon && <Feather name={o.icon} size={13} color={active ? colors.charcoal : colors.muted} />}
            <ThemedText
              style={{ fontFamily: fonts.sansSemiBold, fontSize: 12, color: active ? colors.charcoal : colors.muted }}>
              {o.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    padding: 3,
    gap: 3,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.sand,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
    height: 32,
    borderRadius: radius.full,
  },
  active: { backgroundColor: colors.surface, boxShadow: shadows.card },
});
