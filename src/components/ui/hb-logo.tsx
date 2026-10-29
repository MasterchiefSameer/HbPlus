import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const darkLogo = require('@/../assets/images/hbplus-logo.png');
const whiteLogo = require('@/../assets/images/hbplus-logo-white.png');

interface HbLogoProps {
  size?: number;
  variant?: 'dark' | 'white';
}

export function HbLogo({ size = 36, variant = 'dark' }: HbLogoProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={variant === 'white' ? whiteLogo : darkLogo}
        style={{ width: size, height: size }}
        contentFit="contain"
        accessibilityLabel="HB+ Official Logo"
      />
    </View>
  );
}
