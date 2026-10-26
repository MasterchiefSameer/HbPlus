import { Text, type TextProps } from 'react-native';

import { type, type TypeVariant } from '@/theme';

export type ThemedTextProps = TextProps & {
  variant?: TypeVariant;
  /** Override the ramp color with a theme color value (e.g. `colors.terracotta`). */
  color?: string;
};

/** The only way screens render text: sizes and fonts come from the type ramp. */
export function ThemedText({ variant = 'body', color, style, ...props }: ThemedTextProps) {
  return <Text style={[type[variant], color ? { color } : null, style]} {...props} />;
}
