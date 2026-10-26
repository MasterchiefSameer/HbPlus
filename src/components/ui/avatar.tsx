import { View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, radius } from '@/theme';

import { ThemedText } from './themed-text';

const sizes = { sm: 32, md: 40, lg: 56 } as const;

export type AvatarProps = {
  name: string;
  size?: keyof typeof sizes;
  style?: StyleProp<ViewStyle>;
};

function initials(name: string) {
  return name
    .replace(/^(dr|mr|mrs|ms)\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

/** Initials avatar. Swap for an image source once profile photos exist. */
export function Avatar({ name, size = 'md', style }: AvatarProps) {
  const d = sizes[size];
  return (
    <View
      accessibilityLabel={name}
      style={[
        { width: d, height: d, borderRadius: radius.full, backgroundColor: colors.rust, alignItems: 'center', justifyContent: 'center' },
        style,
      ]}>
      <ThemedText style={{ fontFamily: fonts.heading, fontSize: d * 0.38, color: colors.cream }}>
        {initials(name)}
      </ThemedText>
    </View>
  );
}
