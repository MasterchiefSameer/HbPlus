import Feather from '@expo/vector-icons/Feather';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, Button, ThemedText } from '@/components/ui';
import { GridRow } from '@/screens/design-system/panel';
import {
  AlertsPanel,
  AuthPolicyPanel,
  BrandPanel,
  ButtonsPanel,
  ChipsPanel,
  ControlsPanel,
  IconographyPanel,
  InputsPanel,
  NavigationPanel,
  PalettePanel,
  PathwayPanel,
  ProfilePanel,
  TagsPanel,
  TypographyPanel,
} from '@/screens/design-system/sections';
import { colors, fonts, maxContentWidth, spacing } from '@/theme';

export default function DesignSystemScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          {/* Header Bar matching Master Sheet */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <ThemedText variant="overline" style={{ letterSpacing: 1.2 }}>
                DESIGN SYSTEM V2.4 • PRODUCTION READY
              </ThemedText>
              <ThemedText variant="display" style={styles.title}>
                HB+ Core System & UI Kit
              </ThemedText>
              <ThemedText variant="body" style={styles.subtitle}>
                Holistic longevity, high-trust clinical care, and domain-governed design specifications.
              </ThemedText>
            </View>

            <View style={styles.headerRight}>
              <Badge label="OAuth Whitelist: @hbplus.fit" tone="forest" dot />
              <Button
                title="Export Token Specs"
                variant="primary"
                size="sm"
                icon={<Feather name="download" size={14} color={colors.onTint} />}
              />
            </View>
          </View>

          {/* Section Row 1: Brand & Palette */}
          <GridRow weights={[1, 1.6]}>
            <BrandPanel />
            <PalettePanel />
          </GridRow>

          {/* Section Row 2: Typography, Buttons, Inputs */}
          <GridRow weights={[1, 1, 1]}>
            <TypographyPanel />
            <ButtonsPanel />
            <InputsPanel />
          </GridRow>

          {/* Section Row 3: Filter Chips, Pathway Card, Auth Policy, Profile Row */}
          <GridRow weights={[0.9, 1.1, 1.1, 1]}>
            <ChipsPanel />
            <PathwayPanel />
            <AuthPolicyPanel />
            <ProfilePanel />
          </GridRow>

          {/* Section Row 4: Navigation Chrome, Iconography, Controls */}
          <GridRow weights={[1.2, 1, 1]}>
            <NavigationPanel />
            <IconographyPanel />
            <ControlsPanel />
          </GridRow>

          {/* Section Row 5: Status Feedback & Tags */}
          <GridRow weights={[1.8, 1]}>
            <AlertsPanel />
            <TagsPanel />
          </GridRow>

          {/* Footer Metadata matching Sheet */}
          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              <View style={styles.footerDot} />
              <ThemedText variant="mono" style={{ fontSize: 10 }}>
                HB+ Design Tokens & Component System Specification • Master Sheet
              </ThemedText>
            </View>
            <ThemedText variant="mono" style={{ fontSize: 10 }}>
              Canvas: 1536 • Auto Grid • Palette: Terracotta #9F4022 • Status: Synchronized
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  scroll: { padding: spacing.md, alignItems: 'center' },
  container: { width: '100%', maxWidth: maxContentWidth, gap: spacing.md },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.sand,
    paddingBottom: spacing.md,
  },
  headerLeft: { flex: 1, minWidth: 280, gap: spacing.xs },
  title: { fontSize: 32, lineHeight: 38, fontFamily: fonts.display, color: colors.charcoal },
  subtitle: { fontSize: 14, lineHeight: 20, color: colors.muted },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.sand,
    marginTop: spacing.md,
  },
  footerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 2 },
  footerDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.terracotta },
});
