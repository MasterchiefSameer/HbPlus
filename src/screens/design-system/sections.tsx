import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

import {
  AlertBanner,
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  GlassTabBar,
  IconButton,
  Input,
  ListGroup,
  ListRow,
  SegmentedControl,
  Stepper,
  ThemedText,
  type IconName,
} from '@/components/ui';
import { colors, fonts, radius, spacing } from '@/theme';

import { Panel, SpecLine } from './panel';

/* 01 ─ Brand & identity */
export function BrandPanel() {
  return (
    <Panel
      title="01. Brand & Identity"
      footer={
        <>
          <ThemedText variant="mono">Primary Mark: Monogram{'\n'}HB+</ThemedText>
          <ThemedText variant="mono">Aspect: 1:1 Square{'\n'}Lockup</ThemedText>
        </>
      }>
      <View style={styles.brandRow}>
        {/* Placeholder monogram until the official logo asset is added to assets/. */}
        <View style={styles.monogram}>
          <ThemedText style={styles.monogramText}>HB+</ThemedText>
        </View>
        <View>
          <ThemedText variant="heading">HB+</ThemedText>
          <ThemedText variant="overline" style={{ letterSpacing: 1.4 }}>
            Life Continuum
          </ThemedText>
        </View>
      </View>
      <ThemedText variant="title" style={{ fontSize: 22, lineHeight: 30 }}>
        Holistic longevity & expert-led longevity care for every stage of health.
      </ThemedText>
    </Panel>
  );
}

/* 02 ─ Color palette */
const swatches: { name: string; use: string; value: string; light?: boolean }[] = [
  { name: 'Terracotta', use: 'Primary CTAs, Key Action', value: colors.terracotta },
  { name: 'Deep Rust', use: 'Hover states, accents', value: colors.rust },
  { name: 'Warm Cream', use: 'Background canvas', value: colors.cream, light: true },
  { name: 'Charcoal', use: 'Headings & Primary text', value: colors.charcoal },
  { name: 'Muted Gray', use: 'Body copy, subtitles', value: colors.muted },
  { name: 'Sand Border', use: 'Cards, dividers, inputs', value: colors.sand, light: true },
  { name: 'Forest Success', use: 'Verified states & badges', value: colors.forest },
  { name: 'Restricted Red', use: 'Domain alerts, warnings', value: colors.restricted },
  { name: 'Domain Gold', use: 'Clinician & Tier badge', value: colors.gold },
  { name: 'Frosted Glass', use: 'Floating navbars, sheets', value: colors.glass, light: true },
];

export function PalettePanel() {
  return (
    <Panel title="02. Color Palette">
      <View style={styles.swatchGrid}>
        {swatches.map((s) => (
          <View key={s.name} style={styles.swatchCell}>
            <View style={[styles.swatch, { backgroundColor: s.value }, s.light && styles.swatchLight]}>
              <ThemedText variant="mono" color={s.light ? colors.charcoal : colors.onTint} style={{ fontSize: 9 }}>
                {s.value.toUpperCase()}
              </ThemedText>
            </View>
            <ThemedText variant="label" style={{ fontSize: 12 }}>
              {s.name}
            </ThemedText>
            <ThemedText variant="caption" style={{ fontSize: 10, lineHeight: 13 }}>
              {s.use}
            </ThemedText>
          </View>
        ))}
      </View>
    </Panel>
  );
}

/* 03 ─ Typography */
export function TypographyPanel() {
  return (
    <Panel title="03. Typography Hierarchy">
      <View style={styles.typeBlock}>
        <SpecLine left="Display • 42-52px" right="Playfair Bold" />
        <ThemedText variant="display">Redefining Human Longevity</ThemedText>
      </View>
      <View style={styles.typeBlock}>
        <SpecLine left="Heading • 24-28px" right="Playfair SemiBold" />
        <ThemedText variant="heading">Metabolic Cellular Optimization</ThemedText>
      </View>
      <View style={styles.typeBlock}>
        <SpecLine left="Body • 15px / 1.5" right="Plus Jakarta Sans" />
        <ThemedText variant="body">
          Tailored biological biomarker tracking, epigenetic age rejuvenation, and evidence-backed concierge medicine.
        </ThemedText>
      </View>
      <View style={styles.typeBlock}>
        <SpecLine left="Caption & Auth Mono" right="Mono 12-13px" />
        <View style={styles.rowBetween}>
          <ThemedText variant="mono" style={{ textTransform: 'uppercase' }}>
            Santa Monica Wellness Lab, CA
          </ThemedText>
          <Badge label="auth: @hbplus.fit" tone="terracotta" mono />
        </View>
      </View>
    </Panel>
  );
}

/* 04 ─ Buttons */
export function ButtonsPanel() {
  const [saved, setSaved] = useState(false);
  return (
    <Panel
      title="04. Interactive Buttons"
      footer={
        <>
          <ThemedText variant="mono" style={{ fontSize: 10 }}>Active State: 0.98 Scale Down</ThemedText>
          <ThemedText variant="mono" style={{ fontSize: 10 }}>Hover Tint Transition 200ms</ThemedText>
        </>
      }>
      <View style={styles.typeBlock}>
        <ThemedText variant="mono">Primary Action (Terracotta)</ThemedText>
        <Button
          title="Take the Free Assessment"
          fullWidth
          iconPosition="right"
          icon={<Feather name="arrow-right" size={16} color={colors.onTint} />}
        />
      </View>
      <View style={styles.typeBlock}>
        <ThemedText variant="mono">Secondary Social SSO</ThemedText>
        <Button
          title="Continue with Google"
          variant="secondary"
          fullWidth
          icon={<FontAwesome name="google" size={15} color={colors.googleBlue} />}
        />
      </View>
      <View style={styles.typeBlock}>
        <ThemedText variant="mono">Action Icon Group</ThemedText>
        <View style={styles.inlineRow}>
          <IconButton icon="heart" label="Save" selected={saved} onPress={() => setSaved((v) => !v)} />
          <IconButton icon="share-2" label="Share" />
          <IconButton icon="search" label="Search" />
          <IconButton icon="bookmark" label="Bookmark" />
        </View>
      </View>
    </Panel>
  );
}

/* 05 ─ Inputs */
export function InputsPanel() {
  const [query, setQuery] = useState('Biomarker Pathways & Clinicians');
  return (
    <Panel title="05. Input Fields & Validation">
      <Input label="Global Query Search" icon="search" trailingIcon="sliders" value={query} onChangeText={setQuery} />
      <Input
        label="Domain Whitelist (Approved)"
        status="approved"
        mono
        value="alexandra.chen@hbplus.fit"
        editable={false}
      />
      <Input
        label="Domain Whitelist (Rejected)"
        status="blocked"
        mono
        value="user.longevity@gmail.com"
        editable={false}
        helperText="Access restricted. Only official @hbplus.fit domain accounts permitted."
      />
    </Panel>
  );
}

/* 06 ─ Chips & badges */
const filters = ['All Protocols', 'Cellular NAD+', 'Hormonal'] as const;

export function ChipsPanel() {
  const [active, setActive] = useState<string>(filters[0]);
  return (
    <Panel
      title="06. Filter Chips & Badges"
      footer={<ThemedText variant="caption">Tags dynamically adapt by domain clearance.</ThemedText>}>
      <View style={styles.wrapRow}>
        {filters.map((f) => (
          <Chip key={f} label={f} selected={active === f} onPress={() => setActive(f)} />
        ))}
      </View>
      <View style={{ gap: spacing.sm }}>
        <Badge label="Longevity Tier I" dot />
        <Badge label="4.96 Verified" tone="gold" icon="star" />
        <Badge label="Role: Medical Director" tone="restricted" mono />
      </View>
    </Panel>
  );
}

/* 07 ─ Pathway card (composed from primitives; promote once a real screen needs it) */
export function PathwayPanel() {
  const [fav, setFav] = useState(false);
  return (
    <Panel title="07. Pathway Card">
      <View style={styles.pathway}>
        <View style={styles.pathwayMedia}>
          <Image
            source="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=70"
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            accessibilityLabel="Clinical protocol"
          />
          <View style={styles.pathwayShade} />
          <IconButton
            icon="heart"
            label="Favorite pathway"
            size="sm"
            selected={fav}
            onPress={() => setFav((v) => !v)}
            style={styles.pathwayFav}
          />
          <ThemedText variant="overline" color={colors.onTint} style={styles.pathwayTag}>
            Clinical Protocol
          </ThemedText>
        </View>
        <View style={styles.pathwayBody}>
          <View style={styles.rowBetween}>
            <ThemedText variant="caption" color={colors.terracotta} style={{ fontFamily: fonts.sansSemiBold }}>
              Santa Monica Clinic
            </ThemedText>
            <ThemedText variant="caption" color={colors.charcoal}>
              <Feather name="star" size={10} color={colors.gold} /> 4.98{' '}
              <ThemedText variant="caption">(214)</ThemedText>
            </ThemedText>
          </View>
          <ThemedText variant="title" style={{ fontSize: 17, lineHeight: 22 }}>
            Epigenetic Age Reversal & Biomarker Mapping
          </ThemedText>
          <View style={styles.wrapRow}>
            <Badge label="Full Lipid Panel" />
            <Badge label="DEXA Scan" />
          </View>
          <View style={styles.rowBetween}>
            <ThemedText variant="bodyStrong">
              $850 <ThemedText variant="caption">/ program</ThemedText>
            </ThemedText>
            <ThemedText variant="label" color={colors.terracotta} style={{ textDecorationLine: 'underline' }}>
              View Protocol
            </ThemedText>
          </View>
        </View>
      </View>
    </Panel>
  );
}

/* 08 ─ Auth policy */
export function AuthPolicyPanel() {
  return (
    <Panel title="08. Auth Policy & Security">
      <Card variant="inset" style={{ gap: spacing.smd }}>
        <View style={styles.inlineRow}>
          <View style={styles.iconBox}>
            <Feather name="lock" size={15} color={colors.terracotta} />
          </View>
          <View>
            <ThemedText variant="label">OAuth Whitelist Rule</ThemedText>
            <ThemedText variant="mono" style={{ fontSize: 10 }}>
              Strict Domain Gate
            </ThemedText>
          </View>
        </View>
        <ThemedText variant="body" style={{ fontSize: 12, lineHeight: 18 }}>
          Sign-ins are filtered through Google Identity Services. Non-
          <ThemedText variant="mono" color={colors.charcoal} style={{ fontFamily: fonts.monoMedium }}>
            @hbplus.fit
          </ThemedText>{' '}
          emails are automatically terminated with a 403-Forbidden state.
        </ThemedText>
        <View style={styles.divider} />
        <View style={styles.rowBetween}>
          <ThemedText variant="caption">Provider</ThemedText>
          <ThemedText variant="label" style={{ fontSize: 12 }}>Google Workspace</ThemedText>
        </View>
        <View style={styles.rowBetween}>
          <ThemedText variant="caption">Enforcement</ThemedText>
          <ThemedText variant="mono" color={colors.terracotta} style={{ fontFamily: fonts.monoMedium }}>
            STRICT_AUTH
          </ThemedText>
        </View>
      </Card>
      <Button
        title="Inspect JWT Claims"
        variant="secondary"
        size="sm"
        fullWidth
        iconPosition="right"
        icon={<Feather name="chevron-right" size={14} color={colors.charcoal} />}
      />
    </Panel>
  );
}

/* 09 ─ Profile & account */
export function ProfilePanel() {
  return (
    <Panel
      title="09. Profile & Account Row"
      footer={
        <>
          <Button title="Sign Out of HB+" variant="danger" size="sm" style={{ paddingHorizontal: 0 }} />
          <ThemedText variant="mono" style={{ fontSize: 10, alignSelf: 'center' }}>
            Session 0X8A-4
          </ThemedText>
        </>
      }>
      <ListGroup>
        <View style={[styles.inlineRow, { padding: spacing.smd }]}>
          <Avatar name="Dr. Alexandra Chen" />
          <View style={{ flex: 1 }}>
            <ThemedText variant="label">Dr. Alexandra Chen</ThemedText>
            <ThemedText variant="mono" style={{ fontSize: 10 }}>
              alexandra@hbplus.fit
            </ThemedText>
          </View>
          <Feather name="chevron-right" size={15} color={colors.muted} />
        </View>
      </ListGroup>
      <ListGroup>
        <ListRow icon="award" title="Practitioner Credentials" trailing={<Badge label="Active" tone="forest" />} onPress={() => {}} />
        <ListRow icon="shield" title="Security & Permissions" onPress={() => {}} style={{ borderBottomWidth: 0 }} />
      </ListGroup>
    </Panel>
  );
}

/* 10 ─ Navigation chrome */
type NavKey = 'home' | 'explore' | 'protocols' | 'profile';
const navItems: { value: NavKey; label: string; icon: IconName }[] = [
  { value: 'home', label: 'Home', icon: 'home' },
  { value: 'explore', label: 'Explore', icon: 'search' },
  { value: 'protocols', label: 'Protocols', icon: 'clipboard' },
  { value: 'profile', label: 'Profile', icon: 'user' },
];

export function NavigationPanel() {
  const [tab, setTab] = useState<NavKey>('home');
  return (
    <Panel
      title="10. Navigation Chrome (Frosted Glass Surface)"
      footer={
        <>
          <ThemedText variant="mono" style={{ fontSize: 10 }}>Blur: 10px Frosted Backdrop</ThemedText>
          <ThemedText variant="mono" style={{ fontSize: 10 }}>Border: rgba(255,255,255,0.6)</ThemedText>
        </>
      }>
      <View style={styles.navStage}>
        <GlassTabBar items={navItems} value={tab} onChange={setTab} />
      </View>
    </Panel>
  );
}

/* 11 ─ Iconography */
const icons: { icon: IconName; label: string }[] = [
  { icon: 'home', label: 'home' },
  { icon: 'search', label: 'search' },
  { icon: 'heart', label: 'vital' },
  { icon: 'calendar', label: 'calendar' },
  { icon: 'lock', label: 'shield' },
  { icon: 'user', label: 'doctor' },
  { icon: 'settings', label: 'config' },
  { icon: 'plus-square', label: 'clinic' },
  { icon: 'filter', label: 'filter' },
  { icon: 'check-circle', label: 'verified' },
];

export function IconographyPanel() {
  return (
    <Panel
      title="11. Custom Iconography (24px Grid)"
      footer={
        <>
          <ThemedText variant="mono" style={{ fontSize: 10 }}>Stroke Width: 1.75px</ThemedText>
          <ThemedText variant="mono" style={{ fontSize: 10 }}>Endcaps: Round</ThemedText>
        </>
      }>
      <View style={styles.iconGrid}>
        {icons.map((i) => (
          <View key={i.label} style={styles.iconCell}>
            <Feather name={i.icon} size={18} color={colors.terracotta} />
            <ThemedText variant="mono" style={{ fontSize: 9 }}>
              {i.label}
            </ThemedText>
          </View>
        ))}
      </View>
    </Panel>
  );
}

/* 12 & 13 ─ Controls */
export function ControlsPanel() {
  const [view, setView] = useState<'protocols' | 'map'>('protocols');
  const [enforce, setEnforce] = useState(true);
  const [dosage, setDosage] = useState(2);
  return (
    <Panel title="12 & 13. Controls & Steppers">
      <View style={styles.typeBlock}>
        <ThemedText variant="mono">12. View Segment</ThemedText>
        <SegmentedControl
          value={view}
          onChange={setView}
          options={[
            { value: 'protocols', label: 'Protocols', icon: 'list' },
            { value: 'map', label: 'Map View', icon: 'map' },
          ]}
        />
      </View>
      <View style={styles.typeBlock}>
        <ThemedText variant="mono">13. State Toggle & Stepper</ThemedText>
        <View style={styles.rowBetween}>
          <ThemedText variant="label">Domain Enforce</ThemedText>
          {/* Platform switch, tinted with brand tokens (not wrapped — native styling is the system). */}
          <Switch
            value={enforce}
            onValueChange={setEnforce}
            accessibilityLabel="Domain enforce"
            trackColor={{ false: colors.sand, true: colors.terracotta }}
            thumbColor={colors.surface}
            {...({ activeThumbColor: colors.surface } as object)}
          />
        </View>
        <View style={styles.rowBetween}>
          <ThemedText variant="label">Cycle Dosage</ThemedText>
          <Stepper label="Cycle dosage" value={dosage} onChange={setDosage} min={1} max={10} />
        </View>
      </View>
    </Panel>
  );
}

/* 14 ─ Alerts */
export function AlertsPanel() {
  const [showSuccess, setShowSuccess] = useState(true);
  const [showError, setShowError] = useState(true);
  const emph = { fontFamily: fonts.monoMedium, color: colors.charcoal } as const;
  return (
    <Panel title="14. Status Feedback & System Alerts">
      {showSuccess && (
        <AlertBanner tone="success" onDismiss={() => setShowSuccess(false)}>
          Authentication verified. Signed in under official account <ThemedText style={emph}>alex@hbplus.fit</ThemedText>.
        </AlertBanner>
      )}
      {showError && (
        <AlertBanner tone="error" onDismiss={() => setShowError(false)}>
          Domain verification failed: Access restricted. Please authenticate using your official{' '}
          <ThemedText style={emph}>@hbplus.fit</ThemedText> address.
        </AlertBanner>
      )}
      {!showSuccess && !showError && (
        <Button
          title="Restore alerts"
          variant="ghost"
          size="sm"
          onPress={() => {
            setShowSuccess(true);
            setShowError(true);
          }}
        />
      )}
    </Panel>
  );
}

/* 15 ─ Tags */
export function TagsPanel() {
  return (
    <Panel
      title="15. Tags & Protocol Badges"
      footer={
        <>
          <ThemedText variant="mono" style={{ fontSize: 10 }}>Border Radius: 9999px</ThemedText>
          <ThemedText variant="mono" style={{ fontSize: 10 }}>Typography: 11px Semi</ThemedText>
        </>
      }>
      <View style={styles.wrapRow}>
        <Badge label="Guest Favorite" tone="gold" />
        <Badge label="New Protocol" tone="forest" />
        <Badge label="-25% Concierge" tone="terracotta" mono />
        <Badge label="Superhost Lab" />
        <Badge label="Fast-Track Clearance" tone="forest" dot />
      </View>
    </Panel>
  );
}

const styles = StyleSheet.create({
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  monogram: {
    width: 64,
    height: 64,
    borderWidth: 1.5,
    borderColor: colors.charcoal,
    borderRadius: radius.md,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogramText: { fontFamily: fonts.display, fontSize: 22, color: colors.charcoal },
  swatchGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: spacing.md, columnGap: spacing.smd },
  swatchCell: { width: 104, flexGrow: 1, gap: 2 },
  swatch: {
    height: 64,
    borderRadius: radius.md,
    borderCurve: 'continuous',
    padding: spacing.sm,
    justifyContent: 'flex-end',
    marginBottom: spacing.xs,
  },
  swatchLight: { borderWidth: 1, borderColor: colors.sand },
  typeBlock: { gap: spacing.sm },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  inlineRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.smd },
  wrapRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  pathway: {
    borderWidth: 1,
    borderColor: colors.sand,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  pathwayMedia: { height: 132, backgroundColor: colors.rust, justifyContent: 'flex-end' },
  pathwayShade: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(26, 25, 24, 0.35)' },
  pathwayFav: { position: 'absolute', top: spacing.sm, right: spacing.sm },
  pathwayTag: { margin: spacing.smd },
  pathwayBody: { padding: spacing.smd, gap: spacing.sm },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.terracottaTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.sand },
  navStage: {
    flex: 1,
    minHeight: 120,
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMuted,
  },
  iconGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  iconCell: {
    width: 56,
    height: 56,
    flexGrow: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.sand,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
});
