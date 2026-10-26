import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { StyleSheet, TextInput, View, type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';

import { colors, fonts, radius, spacing } from '@/theme';

import type { IconName } from './icon-button';
import { ThemedText } from './themed-text';

const statuses = {
  default: { border: colors.sand, bg: colors.surface, tag: undefined, tagColor: colors.muted, icon: undefined },
  approved: { border: colors.forest, bg: colors.forestTint, tag: 'VERIFIED', tagColor: colors.forest, icon: 'check-circle' },
  blocked: { border: colors.restricted, bg: colors.restrictedTint, tag: 'BLOCKED', tagColor: colors.restricted, icon: 'alert-circle' },
} as const;

export type InputProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  status?: keyof typeof statuses;
  helperText?: string;
  /** Leading icon, e.g. `search`. */
  icon?: IconName;
  /** Trailing icon for default status, e.g. `sliders`. */
  trailingIcon?: IconName;
  /** Monospace value — for emails, tokens and IDs. */
  mono?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Input({
  label,
  status = 'default',
  helperText,
  icon,
  trailingIcon,
  mono,
  style,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const st = statuses[status];
  const borderColor = status === 'default' && focused ? colors.terracotta : st.border;
  const trailing = st.icon ?? trailingIcon;

  return (
    <View style={[styles.wrap, style]}>
      {(label || st.tag) && (
        <View style={styles.labelRow}>
          {label ? <ThemedText variant="mono">{label}</ThemedText> : <View />}
          {st.tag && (
            <ThemedText variant="mono" color={st.tagColor} style={styles.tag}>
              {st.tag}
            </ThemedText>
          )}
        </View>
      )}
      <View style={[styles.field, { borderColor, backgroundColor: st.bg }]}>
        {icon && <Feather name={icon} size={16} color={colors.muted} />}
        <TextInput
          placeholderTextColor={colors.muted}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[styles.input, { fontFamily: mono ? fonts.mono : fonts.sansMedium }]}
          {...props}
        />
        {trailing && <Feather name={trailing} size={16} color={status === 'default' ? colors.muted : st.tagColor} />}
      </View>
      {helperText && (
        <ThemedText variant="caption" color={status === 'blocked' ? colors.restricted : colors.muted}>
          {helperText}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.xs + 2 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tag: { fontFamily: fonts.monoMedium, fontSize: 10, letterSpacing: 0.6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 44,
    paddingHorizontal: spacing.smd,
    borderWidth: 1,
    borderRadius: radius.md,
    borderCurve: 'continuous',
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: colors.charcoal,
    paddingVertical: spacing.smd,
    // Web: remove the browser focus ring; the border color is the focus indicator.
    outlineStyle: 'none',
  } as object,
});
