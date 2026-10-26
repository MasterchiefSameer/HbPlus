import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, Badge, Button, ThemedText } from '@/components/ui';
import { useAuth } from '@/context/auth-context';
import { colors, fonts, radius, shadows, spacing } from '@/theme';

export default function DashboardScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const isStaff = user?.portalType === 'staff';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Top Bar with Brand and Logout */}
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <View style={styles.monogram}>
                <ThemedText style={styles.monogramText}>HB+</ThemedText>
              </View>
              <View>
                <ThemedText variant="heading" style={{ fontSize: 20 }}>
                  {isStaff ? 'Clinical Portal' : 'Member Portal'}
                </ThemedText>
                <ThemedText variant="overline" style={{ fontSize: 9.5 }}>
                  {isStaff ? 'Institutional Access' : 'Precision Longevity'}
                </ThemedText>
              </View>
            </View>

            <Button
              title="Sign Out"
              variant="secondary"
              size="sm"
              icon={<Feather name="log-out" size={13} color={colors.charcoal} />}
              onPress={handleSignOut}
            />
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <Avatar name={user?.fullName || 'HB+ Member'} size="lg" />
            <View style={{ flex: 1, gap: 2 }}>
              <ThemedText style={styles.userName}>{user?.fullName}</ThemedText>
              <ThemedText style={styles.userEmail}>{user?.email}</ThemedText>
              <View style={{ flexDirection: 'row', gap: spacing.xs, marginTop: 4 }}>
                <Badge
                  label={user?.role || 'Member'}
                  tone={isStaff ? 'gold' : 'forest'}
                />
                <Badge
                  label={isStaff ? 'Verified @hbplus.fit' : 'Active Member'}
                  tone={isStaff ? 'forest' : 'neutral'}
                  dot
                />
              </View>
            </View>
          </View>

          {/* Quick Metrics / Pathways Bento */}
          <View style={styles.bentoGrid}>
            <View style={styles.metricCard}>
              <ThemedText style={styles.metricLabel}>Daily Status</ThemedText>
              <ThemedText style={styles.metricValue}>Body • Mind • Gut</ThemedText>
              <ThemedText style={styles.metricSub}>Synchronized Care Active</ThemedText>
            </View>

            <View style={styles.metricCard}>
              <ThemedText style={styles.metricLabel}>Active Session</ThemedText>
              <ThemedText style={styles.metricValue}>
                {isStaff ? 'Clinician Gateway' : 'Longevity Pathway'}
              </ThemedText>
              <ThemedText style={styles.metricSub}>Continuous Session Protection</ThemedText>
            </View>
          </View>

          {/* Action Trigger */}
          <Button
            title={isStaff ? 'Review Clinical Protocols' : 'Explore My Care Pathways'}
            variant="primary"
            fullWidth
            size="lg"
            iconPosition="right"
            icon={<Feather name="arrow-right" size={16} color={colors.onTint} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  scroll: { padding: spacing.md, alignItems: 'center' },
  container: { width: '100%', maxWidth: 640, gap: spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.sand,
    paddingBottom: spacing.smd,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.smd },
  monogram: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1.5,
    borderColor: colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogramText: { fontFamily: fonts.sansBold, fontSize: 16, color: colors.charcoal },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.sand,
    boxShadow: shadows.card,
  },
  userName: { fontFamily: fonts.display, fontSize: 20, color: colors.charcoal },
  userEmail: { fontFamily: fonts.monoMedium, fontSize: 12, color: colors.muted },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  metricCard: {
    flex: 1,
    minWidth: 260,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.sand,
    gap: 4,
    boxShadow: shadows.card,
  },
  metricLabel: { fontFamily: fonts.sansBold, fontSize: 11, color: colors.muted, textTransform: 'uppercase' },
  metricValue: { fontFamily: fonts.display, fontSize: 18, color: colors.charcoal },
  metricSub: { fontFamily: fonts.sans, fontSize: 12, color: colors.terracotta },
});
