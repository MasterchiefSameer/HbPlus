import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, HbLogo, ThemedText } from '@/components/ui';
import { useAuth } from '@/context/auth-context';
import { colors, fonts, radius, shadows, spacing } from '@/theme';

export default function VerificationScreen() {
  const router = useRouter();
  const { verifyOtp, sendSignInOtp } = useAuth();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const displayEmail = email || 'alexandra.chen@hbplus.fit';

  // 6-digit code state
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRefs = useRef<Array<any>>([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleDigitChange = (text: string, index: number) => {
    setErrorMsg('');
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto advance focus
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setErrorMsg('Please enter all 6 digits.');
      return;
    }

    setVerifying(true);
    const res = await verifyOtp(fullCode);
    setVerifying(false);

    if (res.success) {
      router.replace('/dashboard' as any);
    } else {
      setErrorMsg(res.error || 'Verification code failed or expired.');
    }
  };

  const handleResend = async () => {
    setTimer(59);
    setErrorMsg('');
    await sendSignInOtp(displayEmail);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header Monogram Lockup with official HB+ logo (clickable to landing page) */}
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Return to HB+ Home"
            onPress={() => router.replace('/')}
            style={({ pressed }) => [
              styles.circleLogo,
              pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
            ]}>
            <HbLogo size={42} variant="dark" />
          </Pressable>

          {/* Badge */}
          <View style={styles.gatewayBadge}>
            <Feather name="shield" size={12} color={colors.forest} />
            <ThemedText style={styles.gatewayText}>TWO-FACTOR AUTHORIZATION</ThemedText>
          </View>

          <ThemedText style={styles.title}>Verify Identity</ThemedText>
          <ThemedText style={styles.subtitle}>
            A secure 6-digit access code was dispatched to your verified email account:
          </ThemedText>
          <ThemedText style={styles.emailBadge}>{displayEmail}</ThemedText>

          {/* Central Verification Card */}
          <View style={styles.card}>
            <ThemedText style={styles.codeLabel}>Enter 6-Digit Passcode</ThemedText>

            {/* OTP Input Boxes */}
            <View style={styles.otpRow}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(text) => handleDigitChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  style={[
                    styles.otpBox,
                    digit.length > 0 && styles.otpBoxFilled,
                    errorMsg.length > 0 && styles.otpBoxError,
                  ]}
                />
              ))}
            </View>

            {errorMsg ? (
              <ThemedText style={styles.errorText}>{errorMsg}</ThemedText>
            ) : null}

            {/* Countdown & Resend link */}
            <View style={styles.timerRow}>
              <ThemedText style={styles.timerText}>
                {timer > 0 ? (
                  `Code expires in 0:${timer < 10 ? `0${timer}` : timer}`
                ) : (
                  'Code expired'
                )}
              </ThemedText>
              <Pressable
                disabled={timer > 0}
                onPress={handleResend}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}>
                <ThemedText
                  style={[
                    styles.resendText,
                    timer > 0 && { color: colors.sand },
                  ]}>
                  Resend Code
                </ThemedText>
              </Pressable>
            </View>

            {/* Primary Action Button */}
            <Button
              title={verifying ? 'Verifying Code...' : 'Verify & Access Portal'}
              variant="primary"
              fullWidth
              size="lg"
              iconPosition="right"
              icon={
                verifying ? (
                  <ActivityIndicator color={colors.onTint} size="small" />
                ) : (
                  <Feather name="arrow-right" size={16} color={colors.onTint} />
                )
              }
              onPress={handleVerify}
            />

            {/* Change Account / Back */}
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}>
              <ThemedText style={styles.backBtnText}>Use a different email address</ThemedText>
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
  gatewayText: {
    fontFamily: fonts.sansBold,
    fontSize: 10,
    letterSpacing: 0.8,
    color: colors.forest,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    lineHeight: 32,
    color: colors.charcoal,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  emailBadge: {
    fontFamily: fonts.monoMedium,
    fontSize: 12,
    color: colors.terracotta,
    backgroundColor: colors.terracottaTint,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginTop: -4,
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
  codeLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.charcoal,
    textAlign: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  otpBox: {
    width: 44,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.sand,
    backgroundColor: colors.surfaceMuted,
    fontFamily: fonts.monoMedium,
    fontSize: 20,
    textAlign: 'center',
    color: colors.charcoal,
    outlineStyle: 'none',
  } as object,
  otpBoxFilled: {
    borderColor: colors.terracotta,
    backgroundColor: colors.surface,
  },
  otpBoxError: {
    borderColor: colors.restricted,
  },
  errorText: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.restricted,
    textAlign: 'center',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
  },
  timerText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.muted,
  },
  resendText: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.terracotta,
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
