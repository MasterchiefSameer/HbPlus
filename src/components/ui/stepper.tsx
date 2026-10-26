import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, radius, spacing } from '@/theme';

import { ThemedText } from './themed-text';

export type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Accessible name, e.g. "Cycle dosage". */
  label: string;
  style?: StyleProp<ViewStyle>;
};

export function Stepper({ value, onChange, min = 0, max = 99, label, style }: StepperProps) {
  const canDec = value > min;
  const canInc = value < max;
  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ min, max, now: value }}
      style={[styles.wrap, style]}>
      <StepButton icon="minus" label={`Decrease ${label}`} enabled={canDec} onPress={() => onChange(value - 1)} />
      <ThemedText style={styles.value}>{value}</ThemedText>
      <StepButton icon="plus" label={`Increase ${label}`} enabled={canInc} onPress={() => onChange(value + 1)} />
    </View>
  );
}

function StepButton({
  icon,
  label,
  enabled,
  onPress,
}: {
  icon: 'minus' | 'plus';
  label: string;
  enabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !enabled }}
      disabled={!enabled}
      onPress={onPress}
      style={({ pressed }) => [styles.btn, pressed && { backgroundColor: colors.surfaceMuted }]}>
      <Feather name={icon} size={14} color={enabled ? colors.charcoal : colors.sand} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    padding: 2,
    borderWidth: 1,
    borderColor: colors.sand,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  btn: { width: 28, height: 28, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center' },
  value: { minWidth: 20, textAlign: 'center', fontFamily: fonts.monoMedium, fontSize: 13, color: colors.charcoal },
});
