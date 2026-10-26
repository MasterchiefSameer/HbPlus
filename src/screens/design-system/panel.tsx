import { Children, type ReactNode } from 'react';
import { StyleSheet, View, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';

import { Card, ThemedText } from '@/components/ui';
import { spacing } from '@/theme';

/** Breakpoint where the sheet switches from a single column to the multi-column grid. */
export const WIDE_BREAKPOINT = 1024;

export function useIsWide() {
  return useWindowDimensions().width >= WIDE_BREAKPOINT;
}

/** One reference-sheet panel: numbered overline + content. */
export function Panel({
  title,
  children,
  footer,
  style,
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Card style={[styles.panel, style]}>
      <ThemedText variant="overline">{title}</ThemedText>
      <View style={styles.body}>{children}</View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </Card>
  );
}

/** Row of panels: side by side with flex `weights` on wide screens, stacked otherwise. */
export function GridRow({ weights, children }: { weights?: number[]; children: ReactNode }) {
  const wide = useIsWide();
  const items = Children.toArray(children);
  return (
    <View style={[styles.row, wide && styles.rowWide]}>
      {items.map((child, i) => (
        <View key={i} style={wide ? { flex: weights?.[i] ?? 1, minWidth: 0 } : undefined}>
          {child}
        </View>
      ))}
    </View>
  );
}

/** Small mono spec line: "Label ........ value". */
export function SpecLine({ left, right }: { left: string; right?: string }) {
  return (
    <View style={styles.spec}>
      <ThemedText variant="mono">{left}</ThemedText>
      {right && <ThemedText variant="mono">{right}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { flex: 1 },
  body: { flex: 1, gap: spacing.md },
  footer: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: spacing.sm },
  row: { gap: spacing.md },
  rowWide: { flexDirection: 'row', alignItems: 'stretch' },
  spec: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
});
