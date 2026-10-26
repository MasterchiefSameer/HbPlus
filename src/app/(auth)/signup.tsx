import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AlertBanner, Button, ThemedText } from '@/components/ui';
import { useAuth } from '@/context/auth-context';
import { colors, fonts, radius, shadows, spacing } from '@/theme';

type PortalType = 'user' | 'staff';
type StaffRole = 'Clinician' | 'Medical' | 'Director';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  // Portal selection: 'user' or 'staff'
  const [portal, setPortal] = useState<PortalType>('user');

  // Form states
  const [name, setName] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [staffEmailHandle, setStaffEmailHandle] = useState('');
  const [staffRole, setStaffRole] = useState<StaffRole>('Clinician');
  const [licenseId, setLicenseId] = useState('');

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full legal name.');
      return;
    }

    const emailToRegister =
      portal === 'user' ? personalEmail.trim().toLowerCase() : `${staffEmailHandle.trim().toLowerCase()}@hbplus.fit`;

    if (!emailToRegister || (portal === 'user' && !emailToRegister.includes('@'))) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (portal === 'user' && (!password || password.length < 6)) {
      setErrorMessage('Please enter a password with at least 6 characters.');
      return;
    }

    setSubmitting(true);
    const res = await signUp({
      fullName: name.trim(),
      email: emailToRegister,
      password: portal === 'user' ? password : undefined,
      portalType: portal,
      staffRole: portal === 'staff' ? staffRole : undefined,
      licenseId: portal === 'staff' ? licenseId.trim() : undefined,
    });
    setSubmitting(false);

    if (res.success) {
      router.push({
        pathname: '/(auth)/verify',
        params: { email: emailToRegister },
      });
    } else {
      setErrorMessage(res.error || 'Failed to create account.');
    }
  };

  const handleGoogleSignup = async () => {
    setErrorMessage('');
    setGoogleLoading(true);
    const res = await signInWithGoogle('user');
    setGoogleLoading(false);
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header Monogram Lockup */}
          <View style={styles.circleLogo}>
            <ThemedText style={styles.logoText}>HB+</ThemedText>
          </View>

          {/* Badge */}
          <View style={[styles.gatewayBadge, portal === 'user' && styles.userGatewayBadge]}>
            <Feather
              name={portal === 'user' ? 'user-plus' : 'shield'}
              size={12}
              color={portal === 'user' ? colors.terracotta : colors.forest}
            />
            <ThemedText
              style={[styles.gatewayText, portal === 'user' && styles.userGatewayText]}>
              {portal === 'user' ? 'MEMBER ONBOARDING' : 'STAFF REGISTRATION'}
            </ThemedText>
          </View>

          <ThemedText style={styles.title}>
            {portal === 'user' ? 'Join HB+ Wellness' : 'Staff Access Request'}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {portal === 'user'
              ? 'Create your personal account to access custom longevity pathways and clinical consultations.'
              : 'Register your institutional credentials for domain-authorized clinical access.'}
          </ThemedText>

          {/* 2 Portal Selector Switch (User vs Staff) */}
          <View style={styles.portalToggleContainer}>
            <Pressable
              onPress={() => {
                setPortal('user');
                setErrorMessage('');
              }}
              style={[styles.portalTab, portal === 'user' && styles.portalTabActive]}>
              <Feather
                name="user"
                size={14}
                color={portal === 'user' ? colors.terracotta : colors.muted}
              />
              <ThemedText
                style={[
                  styles.portalTabText,
                  portal === 'user' && styles.portalTabTextActive,
                ]}>
                User Portal
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => {
                setPortal('staff');
                setErrorMessage('');
              }}
              style={[styles.portalTab, portal === 'staff' && styles.portalTabActive]}>
              <Feather
                name="shield"
                size={14}
                color={portal === 'staff' ? colors.forest : colors.muted}
              />
              <ThemedText
                style={[
                  styles.portalTabText,
                  portal === 'staff' && styles.portalTabTextActiveStaff,
                ]}>
                Staff Portal
              </ThemedText>
            </Pressable>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {errorMessage ? (
              <AlertBanner tone="error" onDismiss={() => setErrorMessage('')}>
                {errorMessage}
              </AlertBanner>
            ) : null}

            {/* USER PORTAL: Fast Google OAuth Option */}
            {portal === 'user' && (
              <>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Sign up with Google"
                  disabled={googleLoading}
                  onPress={handleGoogleSignup}
                  style={({ pressed }) => [
                    styles.googleBtn,
                    pressed && { backgroundColor: colors.surfaceMuted, opacity: 0.9 },
                    googleLoading && { opacity: 0.6 },
                  ]}>
                  {googleLoading ? (
                    <ActivityIndicator size="small" color={colors.charcoal} />
                  ) : (
                    <>
                      <FontAwesome name="google" size={16} color={colors.googleBlue} />
                      <ThemedText style={styles.googleBtnText}>Sign up with Google</ThemedText>
                    </>
                  )}
                </Pressable>

                <View style={styles.dividerRow}>
                  <View style={styles.hairline} />
                  <ThemedText style={styles.dividerText}>OR REGISTER MANUALLY</ThemedText>
                  <View style={styles.hairline} />
                </View>
              </>
            )}

            {/* Legal / Full Name (Common) */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Full Name</ThemedText>
              <View style={styles.inputField}>
                <Feather name="user" size={15} color={colors.muted} />
                <TextInput
                  placeholder={portal === 'user' ? 'Alex Chen' : 'Dr. Alexandra Chen'}
                  placeholderTextColor={colors.muted}
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  style={styles.textInput}
                />
              </View>
            </View>

            {/* USER PORTAL: Personal Email and Password */}
            {portal === 'user' && (
              <>
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>Personal Email Address</ThemedText>
                  <View style={styles.inputField}>
                    <Feather name="mail" size={15} color={colors.muted} />
                    <TextInput
                      placeholder="you@example.com"
                      placeholderTextColor={colors.muted}
                      value={personalEmail}
                      onChangeText={(text) => {
                        setPersonalEmail(text);
                        if (errorMessage) setErrorMessage('');
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={styles.textInput}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>Create Password</ThemedText>
                  <View style={styles.inputField}>
                    <Feather name="lock" size={15} color={colors.muted} />
                    <TextInput
                      placeholder="At least 6 characters"
                      placeholderTextColor={colors.muted}
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errorMessage) setErrorMessage('');
                      }}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      style={styles.textInput}
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      hitSlop={8}>
                      <Feather
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={16}
                        color={colors.muted}
                      />
                    </Pressable>
                  </View>
                </View>
              </>
            )}

            {/* STAFF PORTAL: Role Selector (Clinician, Medical, Director) */}
            {portal === 'staff' && (
              <>
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>Staff Role</ThemedText>
                  <View style={styles.roleTabs}>
                    {(['Clinician', 'Medical', 'Director'] as const).map((r) => (
                      <Pressable
                        key={r}
                        onPress={() => setStaffRole(r)}
                        style={[
                          styles.roleTab,
                          staffRole === r && styles.roleTabActive,
                        ]}>
                        <ThemedText
                          style={[
                            styles.roleTabText,
                            staffRole === r && styles.roleTabTextActive,
                          ]}>
                          {r}
                        </ThemedText>
                      </Pressable>
                    ))}
                  </View>
                </View>

                {/* STAFF PORTAL: Institutional Email */}
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>Institution Email Handle</ThemedText>
                  <View style={styles.inputField}>
                    <Feather name="briefcase" size={15} color={colors.muted} />
                    <TextInput
                      placeholder="first.last"
                      placeholderTextColor={colors.muted}
                      value={staffEmailHandle}
                      onChangeText={(text) => {
                        setStaffEmailHandle(text);
                        if (errorMessage) setErrorMessage('');
                      }}
                      autoCapitalize="none"
                      style={styles.textInput}
                    />
                    <View style={styles.domainChip}>
                      <ThemedText style={styles.domainChipText}>@hbplus.fit</ThemedText>
                    </View>
                  </View>
                </View>

                {/* STAFF PORTAL: Practitioner License ID */}
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>Practitioner License ID</ThemedText>
                  <View style={styles.inputField}>
                    <Feather name="award" size={15} color={colors.muted} />
                    <TextInput
                      placeholder="LIC-8841-A"
                      placeholderTextColor={colors.muted}
                      value={licenseId}
                      onChangeText={(text) => {
                        setLicenseId(text);
                        if (errorMessage) setErrorMessage('');
                      }}
                      style={styles.textInput}
                    />
                  </View>
                </View>
              </>
            )}

            {/* Submit Action */}
            <Button
              title={
                submitting
                  ? 'Creating Account...'
                  : portal === 'user'
                  ? 'Register Account'
                  : 'Submit Staff Verification'
              }
              variant="primary"
              fullWidth
              size="lg"
              iconPosition="right"
              icon={
                submitting ? (
                  <ActivityIndicator color={colors.onTint} size="small" />
                ) : (
                  <Feather name="arrow-right" size={16} color={colors.onTint} />
                )
              }
              onPress={handleSubmit}
            />

            {/* Clerk Captcha Mount point */}
            <View nativeID="clerk-captcha" />

            {/* Back to Login link */}
            <Pressable
              onPress={() => router.push('/(auth)/login')}
              style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}>
              <ThemedText style={styles.backBtnText}>
                Already have an account? Sign in
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scroll: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    gap: spacing.md,
  },
  circleLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.sand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.charcoal,
    letterSpacing: -0.5,
  },
  gatewayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    backgroundColor: colors.forestTint,
    borderWidth: 1,
    borderColor: colors.forestBorder,
    borderRadius: radius.full,
    paddingVertical: 5,
    paddingHorizontal: spacing.smd,
  },
  userGatewayBadge: {
    backgroundColor: colors.terracottaTint,
    borderColor: colors.terracottaBorder,
  },
  gatewayText: {
    fontFamily: fonts.sansBold,
    fontSize: 10.5,
    letterSpacing: 0.8,
    color: colors.forest,
  },
  userGatewayText: {
    color: colors.terracotta,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 34,
    color: colors.charcoal,
    textAlign: 'center',
    marginTop: -2,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  portalToggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.full,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.sand,
    width: '100%',
  },
  portalTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  portalTabActive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.sand,
    boxShadow: shadows.card,
  },
  portalTabText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    color: colors.muted,
  },
  portalTabTextActive: {
    color: colors.terracotta,
  },
  portalTabTextActiveStaff: {
    color: colors.forest,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: colors.sand,
    padding: spacing.md,
    gap: spacing.md,
    boxShadow: shadows.card,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.smd,
    height: 48,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.sand,
    backgroundColor: colors.surface,
  },
  googleBtnText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    color: colors.charcoal,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  hairline: {
    flex: 1,
    height: 1,
    backgroundColor: colors.sand,
  },
  dividerText: {
    fontFamily: fonts.sansBold,
    fontSize: 9.5,
    letterSpacing: 0.8,
    color: colors.muted,
  },
  inputGroup: {
    gap: spacing.xs + 2,
  },
  inputLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 12.5,
    color: colors.charcoal,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.sand,
    borderRadius: radius.md,
    paddingHorizontal: spacing.smd,
    height: 46,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.charcoal,
    outlineStyle: 'none',
  } as object,
  domainChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.sand,
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  domainChipText: {
    fontFamily: fonts.monoMedium,
    fontSize: 11.5,
    color: colors.forest,
  },
  roleTabs: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.sand,
    borderRadius: radius.md,
    padding: 3,
    gap: 3,
  },
  roleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: radius.sm,
  },
  roleTabActive: {
    backgroundColor: colors.surface,
    boxShadow: shadows.card,
  },
  roleTabText: {
    fontFamily: fonts.sansMedium,
    fontSize: 11.5,
    color: colors.muted,
  },
  roleTabTextActive: {
    fontFamily: fonts.sansBold,
    color: colors.charcoal,
  },
  backBtn: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  backBtnText: {
    fontFamily: fonts.sansMedium,
    fontSize: 12.5,
    color: colors.muted,
  },
});
