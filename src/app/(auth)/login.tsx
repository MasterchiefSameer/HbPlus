import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
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
type UserAuthMode = 'password' | 'otp';

export default function LoginScreen() {
  const router = useRouter();
  const { sendSignInOtp, signInWithPassword, signInWithGoogle } = useAuth();

  // Portal tab state
  const [portal, setPortal] = useState<PortalType>('user');

  // User auth sub-mode (Password vs OTP)
  const [userAuthMode, setUserAuthMode] = useState<UserAuthMode>('password');

  // Form state
  const [personalEmail, setPersonalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailHandle, setEmailHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Primary authenticate handler
  const handleAuthenticate = async () => {
    setErrorMessage('');

    if (portal === 'user') {
      const email = personalEmail.trim().toLowerCase();
      if (!email || !email.includes('@')) {
        setErrorMessage('Please enter a valid personal email address.');
        return;
      }

      setLoading(true);

      if (userAuthMode === 'password') {
        if (!password) {
          setLoading(false);
          setErrorMessage('Please enter your account password.');
          return;
        }

        const res = await signInWithPassword(email, password, 'user');
        setLoading(false);

        if (res.success) {
          router.replace('/(app)/dashboard' as any);
        } else {
          setErrorMessage(res.error || 'Invalid email or password.');
        }
      } else {
        // OTP Mode
        const res = await sendSignInOtp(email, 'user');
        setLoading(false);

        if (res.success) {
          router.push({
            pathname: '/(auth)/verify',
            params: { email },
          });
        } else {
          setErrorMessage(res.error || 'Failed to send verification code.');
        }
      }
    } else {
      // Staff Portal authentication (strictly OTP / institutional verification)
      const handle = emailHandle.trim().toLowerCase();
      if (!handle) {
        setErrorMessage('Please enter your official staff email handle.');
        return;
      }

      if (handle.includes('@') && !handle.endsWith('@hbplus.fit')) {
        setErrorMessage(
          'Access restricted. Staff portal strictly requires your official @hbplus.fit domain email.'
        );
        return;
      }

      const cleanHandle = handle.split('@')[0];
      const fullEmail = `${cleanHandle}@hbplus.fit`;

      setLoading(true);
      const res = await sendSignInOtp(fullEmail, 'staff');
      setLoading(false);

      if (res.success) {
        router.push({
          pathname: '/(auth)/verify',
          params: { email: fullEmail },
        });
      } else {
        setErrorMessage(res.error || 'Failed to send verification code.');
      }
    }
  };

  // Google OAuth handler
  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setGoogleLoading(true);
    const res = await signInWithGoogle(portal);
    setGoogleLoading(false);

    if (!res.success && res.error) {
      setErrorMessage(res.error);
    } else if (res.success && Platform.OS !== 'web') {
      router.replace('/(app)/dashboard' as any);
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

          {/* Dual Portal Gateway Pill Badge */}
          <View style={[styles.gatewayBadge, portal === 'user' && styles.userGatewayBadge]}>
            <Feather
              name={portal === 'user' ? 'user-check' : 'lock'}
              size={12}
              color={portal === 'user' ? colors.terracotta : colors.forest}
            />
            <ThemedText
              style={[styles.gatewayText, portal === 'user' && styles.userGatewayText]}>
              {portal === 'user' ? 'MEMBER ACCESS' : 'SECURE STAFF GATEWAY'}
            </ThemedText>
          </View>

          {/* Headline and Subtitle */}
          <ThemedText style={styles.title}>
            {portal === 'user' ? 'HB+ Member Sign-In' : 'HB+ Staff Portal'}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {portal === 'user'
              ? 'Access your personalized longevity dashboard, biomarker logs, and vitality insights.'
              : 'Sign in with your official organisation credentials to access clinical protocols and member pathways.'}
          </ThemedText>

          {/* Portal Selector Switch */}
          <View style={styles.portalToggleContainer}>
            <Pressable
              onPress={() => {
                setPortal('user');
                setErrorMessage('');
              }}
              style={[
                styles.portalTab,
                portal === 'user' && styles.portalTabActive,
              ]}>
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
              style={[
                styles.portalTab,
                portal === 'staff' && styles.portalTabActive,
              ]}>
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

          {/* Central Authentication Card */}
          <View style={styles.card}>
            {/* Dynamic Error Alert Banner */}
            {errorMessage ? (
              <AlertBanner tone="error" onDismiss={() => setErrorMessage('')}>
                {errorMessage}
              </AlertBanner>
            ) : null}

            {/* Google OAuth Button */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              disabled={googleLoading}
              onPress={handleGoogleLogin}
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
                  <ThemedText style={styles.googleBtnText}>
                    {portal === 'user' ? 'Continue with Google' : 'Staff SSO with Google'}
                  </ThemedText>
                </>
              )}
            </Pressable>

            {/* Google OAuth Note */}
            <View style={styles.ssoNoteRow}>
              <Feather
                name={portal === 'user' ? 'check-circle' : 'shield'}
                size={12}
                color={portal === 'user' ? colors.terracotta : colors.forest}
              />
              <ThemedText style={styles.ssoNoteText}>
                {portal === 'user'
                  ? 'Instant sign-in with your personal Google account'
                  : 'Google OAuth 2.0 (Strict @hbplus.fit domain verification)'}
              </ThemedText>
            </View>

            {/* Hairline Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.hairline} />
              <ThemedText style={styles.dividerText}>
                {portal === 'user' ? 'OR EMAIL AUTHENTICATION' : 'OR WORK EMAIL'}
              </ThemedText>
              <View style={styles.hairline} />
            </View>

            {/* USER PORTAL: Auth Mode Sub-Switch (Password vs Passcode OTP) */}
            {portal === 'user' && (
              <View style={styles.authModeTrack}>
                <Pressable
                  onPress={() => {
                    setUserAuthMode('password');
                    setErrorMessage('');
                  }}
                  style={[
                    styles.authModePill,
                    userAuthMode === 'password' && styles.authModePillActive,
                  ]}>
                  <ThemedText
                    style={[
                      styles.authModeText,
                      userAuthMode === 'password' && styles.authModeTextActive,
                    ]}>
                    Password Sign-In
                  </ThemedText>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setUserAuthMode('otp');
                    setErrorMessage('');
                  }}
                  style={[
                    styles.authModePill,
                    userAuthMode === 'otp' && styles.authModePillActive,
                  ]}>
                  <ThemedText
                    style={[
                      styles.authModeText,
                      userAuthMode === 'otp' && styles.authModeTextActive,
                    ]}>
                    One-Time Code (OTP)
                  </ThemedText>
                </Pressable>
              </View>
            )}

            {/* Email Input Field */}
            {portal === 'user' ? (
              <>
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>Personal Email</ThemedText>
                  <View style={styles.handleInputWrap}>
                    <Feather name="mail" size={15} color={colors.muted} />
                    <TextInput
                      placeholder="you@example.com"
                      placeholderTextColor={colors.muted}
                      value={personalEmail}
                      onChangeText={(text) => {
                        setPersonalEmail(text);
                        if (errorMessage) setErrorMessage('');
                      }}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoCorrect={false}
                      style={styles.handleTextInput}
                    />
                  </View>
                </View>

                {/* Password field only when password mode is active */}
                {userAuthMode === 'password' && (
                  <View style={styles.inputGroup}>
                    <ThemedText style={styles.inputLabel}>Password</ThemedText>
                    <View style={styles.handleInputWrap}>
                      <Feather name="lock" size={15} color={colors.muted} />
                      <TextInput
                        placeholder="Enter your password"
                        placeholderTextColor={colors.muted}
                        value={password}
                        onChangeText={(text) => {
                          setPassword(text);
                          if (errorMessage) setErrorMessage('');
                        }}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        style={styles.handleTextInput}
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
                )}
              </>
            ) : (
              <View style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>Staff Email Handle</ThemedText>
                <View style={styles.handleInputWrap}>
                  <Feather name="briefcase" size={15} color={colors.muted} />
                  <TextInput
                    placeholder="first.last"
                    placeholderTextColor={colors.muted}
                    value={emailHandle}
                    onChangeText={(text) => {
                      setEmailHandle(text);
                      if (errorMessage) setErrorMessage('');
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.handleTextInput}
                  />
                  <View style={styles.domainChip}>
                    <ThemedText style={styles.domainChipText}>@hbplus.fit</ThemedText>
                  </View>
                </View>
              </View>
            )}

            {/* Primary Action Button */}
            <Button
              title={
                loading
                  ? 'Authenticating...'
                  : portal === 'user' && userAuthMode === 'otp'
                  ? 'Send Passcode'
                  : 'Sign In'
              }
              variant="primary"
              fullWidth
              size="lg"
              iconPosition="right"
              icon={
                loading ? (
                  <ActivityIndicator color={colors.onTint} size="small" />
                ) : (
                  <Feather name="arrow-right" size={16} color={colors.onTint} />
                )
              }
              onPress={handleAuthenticate}
            />

            {/* Bottom Links */}
            <View style={styles.bottomLinksRow}>
              <View style={styles.passkeyWrap}>
                <Feather name="key" size={14} color={colors.muted} />
                <ThemedText style={styles.passkeyText}>Passkey / FIDO2</ThemedText>
              </View>
              <Pressable
                onPress={() => router.push('/(auth)/signup')}
                style={({ pressed }) => pressed && { opacity: 0.7 }}>
                <ThemedText style={styles.forgotText}>
                  {portal === 'user' ? "Don't have an account? Sign up" : 'Request access?'}
                </ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Footer Navigation */}
          <View style={styles.footerNav}>
            <Pressable style={styles.footerLinkWrap}>
              <Feather name="headphones" size={13} color={colors.muted} />
              <ThemedText style={styles.footerLink}>Helpdesk</ThemedText>
            </Pressable>
            <View style={styles.footerDot} />
            <Pressable>
              <ThemedText style={styles.footerLink}>Privacy Policy</ThemedText>
            </Pressable>
          </View>

          {/* Legal Copyright */}
          <ThemedText style={styles.copyright}>
            Holistic Vitality Platform © 2026 HB+ Vitality Inc. Confidential System.
          </ThemedText>
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
  ssoNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
    marginTop: -spacing.xs,
  },
  ssoNoteText: {
    fontFamily: fonts.sans,
    fontSize: 11.5,
    color: colors.muted,
    textAlign: 'center',
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
  authModeTrack: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.sand,
    gap: 4,
  },
  authModePill: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: radius.sm,
  },
  authModePillActive: {
    backgroundColor: colors.surface,
    boxShadow: shadows.card,
  },
  authModeText: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.muted,
  },
  authModeTextActive: {
    fontFamily: fonts.sansBold,
    color: colors.charcoal,
  },
  inputGroup: {
    gap: spacing.xs + 2,
  },
  inputLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 12.5,
    color: colors.charcoal,
  },
  handleInputWrap: {
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
  handleTextInput: {
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
  bottomLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xs,
  },
  passkeyWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  passkeyText: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.muted,
  },
  forgotText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    color: colors.terracotta,
  },
  footerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  footerLinkWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerLink: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.muted,
  },
  footerDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.sand,
  },
  copyright: {
    fontFamily: fonts.sans,
    fontSize: 11,
    lineHeight: 16,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
});
