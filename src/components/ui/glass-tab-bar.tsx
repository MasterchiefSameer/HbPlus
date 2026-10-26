import Feather from '@expo/vector-icons/Feather';
import { Platform, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, radius, shadows, spacing } from '@/theme';

import type { IconName } from './icon-button';
import { ThemedText } from './themed-text';

export type GlassTabItem<T extends string> = { value: T; label: string; icon: IconName };

export type GlassTabBarProps<T extends string> = {
  items: GlassTabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * Frosted navigation chrome (panel 10). Visual spec for web/marketing surfaces;
 * app navigation should use the platform tab bar.
 */
export function GlassTabBar<T extends string>({ items, value, onChange, style }: GlassTabBarProps<T>) {
  return (
    <View accessibilityRole="tablist" style={[styles.bar, style]}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <Pressable
            key={it.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={it.label}
            onPress={() => onChange(it.value)}
            style={styles.item}>
            <View style={[styles.iconWrap, active && styles.iconActive]}>
              <Feather name={it.icon} size={15} color={active ? colors.onTint : colors.muted} />
            </View>
            <ThemedText
              style={{ fontFamily: active ? fonts.sansSemiBold : fonts.sansMedium, fontSize: 10, color: active ? colors.terracotta : colors.muted }}>
              {it.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.smd,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.sand,
    boxShadow: shadows.raised,
    // Web-only frosted blur (panel 10: "Blur 10px Frosted Backdrop").
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(10px)' } as object) : null),
  },
  item: { alignItems: 'center', gap: spacing.xs, minWidth: 56 },
  iconWrap: { width: 32, height: 28, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center' },
  iconActive: { backgroundColor: colors.terracotta },
});
