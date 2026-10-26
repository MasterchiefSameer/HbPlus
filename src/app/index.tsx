import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ThemedText } from '@/components/ui';
import { useAuth } from '@/context/auth-context';
import { colors, fonts, radius, shadows, spacing } from '@/theme';

// 3 Curated Editorial Photos from Unsplash for the Carousel Slider
const SLIDE_IMAGES = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&auto=format&fit=crop&q=80',
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const slideScrollRef = useRef<any>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/(app)/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  const handleGoToLogin = () => {
    router.push('/(auth)/login');
  };

  const handleNextSlide = () => {
    if (activeIndex < SLIDE_IMAGES.length - 1) {
      const nextIdx = activeIndex + 1;
      setActiveIndex(nextIdx);
      slideScrollRef.current?.scrollTo({
        x: nextIdx * Math.min(Dimensions.get('window').width - 32, 420),
        animated: true,
      });
    } else {
      handleGoToLogin();
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideWidth = Math.min(Dimensions.get('window').width - 32, 420);
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / slideWidth);
    if (index >= 0 && index < SLIDE_IMAGES.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrap}>
          {/* Top Header Navigation */}
          <View style={styles.topNav}>
            {/* HB+ Monogram */}
            <View style={styles.monogram}>
              <ThemedText style={styles.monogramText}>HB+</ThemedText>
            </View>

            {/* Pagination Indicators matching 3 photos */}
            <View style={styles.pagination}>
              {SLIDE_IMAGES.map((_, i) => (
                <View
                  key={i}
                  style={[
                    i === activeIndex ? styles.pageActivePill : styles.pageDot,
                  ]}
                />
              ))}
            </View>

            {/* Skip to Login Text Button */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Skip to Login"
              onPress={handleGoToLogin}
              style={({ pressed }) => [styles.skipBtn, pressed && { opacity: 0.7 }]}>
              <ThemedText style={styles.skipText}>Skip to Login</ThemedText>
            </Pressable>
          </View>

          {/* Swipeable 3-Photo Carousel */}
          <View style={styles.carouselContainer}>
            <ScrollView
              ref={slideScrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              decelerationRate="fast"
              style={styles.photoScrollView}>
              {SLIDE_IMAGES.map((imgUrl, idx) => (
                <View key={idx} style={styles.slideHeroWrap}>
                  <Image
                    source={imgUrl}
                    style={styles.heroImage}
                    contentFit="cover"
                    transition={250}
                    accessibilityLabel={`HB+ wellness photo ${idx + 1}`}
                  />

                  {/* Floating Overlay Status Pills */}
                  <View style={styles.floatingOverlay}>
                    {/* Left Pill: Frosted Glass */}
                    <View style={styles.doctorPill}>
                      <Feather name="check-circle" size={13} color={colors.terracotta} />
                      <ThemedText style={styles.doctorPillText}>
                        DOCTOR &{'\n'}SPECIALIST-LED
                      </ThemedText>
                    </View>

                    {/* Right Pill: Dark Translucent Status */}
                    <View style={styles.enginePill}>
                      <View style={styles.glowingDot} />
                      <ThemedText style={styles.enginePillText}>
                        Longevity Engine{'\n'}Active
                      </ThemedText>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Overline & Category Row (Single consistent text matching design) */}
          <View style={styles.categoryRow}>
            <ThemedText style={styles.overlineLeft}>
              HOLISTIC CLINICAL{'\n'}CONTINUUM
            </ThemedText>
            <View style={styles.categoryRightWrap}>
              <View style={styles.categoryDot} />
              <ThemedText style={styles.overlineRight}>
                HB+{'\n'}PROTOCOLS
              </ThemedText>
            </View>
          </View>

          {/* Headline Display Typography */}
          <ThemedText style={styles.headline}>
            Elevate your vitality through precision wellness.
          </ThemedText>

          {/* Subtitle / Descriptive Body */}
          <ThemedText style={styles.description}>
            Experience bespoke clinical care combining cellular regeneration, gut microbiome health, and posture restoration — guided by licensed medical practitioners.
          </ThemedText>

          {/* 3 Numbered Protocol Value Cards matching the design */}
          <View style={styles.cardsContainer}>
            {/* Card 01 */}
            <View style={styles.valueCard}>
              <View style={[styles.iconCircle, { backgroundColor: colors.terracottaTint }]}>
                <Feather name="activity" size={16} color={colors.terracotta} />
              </View>
              <View style={styles.cardTextWrap}>
                <View style={styles.cardTitleRow}>
                  <ThemedText style={styles.cardNumber}>01</ThemedText>
                  <ThemedText style={styles.cardTitle}>Personalized Protocols</ThemedText>
                </View>
                <ThemedText style={styles.cardSub}>
                  Microbiome restoration, pain...
                </ThemedText>
              </View>
            </View>

            {/* Card 02 */}
            <View style={styles.valueCard}>
              <View style={[styles.iconCircle, { backgroundColor: colors.forestTint }]}>
                <Feather name="user-check" size={16} color={colors.forest} />
              </View>
              <View style={styles.cardTextWrap}>
                <View style={styles.cardTitleRow}>
                  <ThemedText style={styles.cardNumber}>02</ThemedText>
                  <ThemedText style={styles.cardTitle}>Verified Care Network</ThemedText>
                </View>
                <ThemedText style={styles.cardSub}>
                  Direct 1-on-1 consultations with...
                </ThemedText>
              </View>
            </View>

            {/* Card 03 (Without any HIPAA mentions) */}
            <View style={styles.valueCard}>
              <View style={[styles.iconCircle, { backgroundColor: colors.surface }]}>
                <Feather name="shield" size={16} color={colors.charcoal} />
              </View>
              <View style={styles.cardTextWrap}>
                <View style={styles.cardTitleRow}>
                  <ThemedText style={styles.cardNumber}>03</ThemedText>
                  <ThemedText style={styles.cardTitle}>Domain-Governed Security</ThemedText>
                </View>
                <ThemedText style={styles.cardSub}>
                  Encrypted @hbplus.fit practitioner...
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            {/* Primary Action Button */}
            <Button
              title="Continue with HB+"
              variant="primary"
              fullWidth
              size="lg"
              iconPosition="right"
              icon={<Feather name="arrow-right" size={16} color={colors.onTint} />}
              onPress={handleNextSlide}
            />

            {/* Secondary Action Button */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Already a member? Sign in"
              onPress={handleGoToLogin}
              style={({ pressed }) => [
                styles.memberBtn,
                pressed && { backgroundColor: colors.sand, opacity: 0.9 },
              ]}>
              <Feather name="lock" size={14} color={colors.charcoal} />
              <ThemedText style={styles.memberBtnText}>
                Already a member? Sign in
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
    paddingVertical: spacing.smd,
    alignItems: 'center',
  },
  contentWrap: {
    width: '100%',
    maxWidth: 420,
    gap: spacing.md,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  monogram: {
    paddingVertical: 2,
  },
  monogramText: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    letterSpacing: -0.5,
    color: colors.charcoal,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pageActivePill: {
    width: 22,
    height: 3.5,
    borderRadius: radius.full,
    backgroundColor: colors.terracotta,
  },
  pageDot: {
    width: 4,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.sand,
  },
  skipBtn: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  skipText: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.charcoal,
  },
  carouselContainer: {
    width: '100%',
    height: 250,
    borderRadius: radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
    boxShadow: shadows.card,
  },
  photoScrollView: {
    width: '100%',
    height: '100%',
  },
  slideHeroWrap: {
    width: Math.min(Dimensions.get('window').width - 32, 420),
    height: 250,
    position: 'relative',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
  },
  floatingOverlay: {
    position: 'absolute',
    bottom: spacing.smd,
    left: spacing.smd,
    right: spacing.smd,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  doctorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    backgroundColor: 'rgba(252, 248, 240, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: radius.full,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.smd,
    boxShadow: shadows.card,
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(8px)' } as object) : null),
  },
  doctorPillText: {
    fontFamily: fonts.sansBold,
    fontSize: 9,
    lineHeight: 11,
    letterSpacing: 0.5,
    color: colors.charcoal,
    textTransform: 'uppercase',
  },
  enginePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    backgroundColor: 'rgba(26, 25, 24, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: radius.full,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.smd,
    boxShadow: shadows.card,
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(8px)' } as object) : null),
  },
  glowingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
  },
  enginePillText: {
    fontFamily: fonts.sansMedium,
    fontSize: 9.5,
    lineHeight: 12,
    color: colors.onTint,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  overlineLeft: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.8,
    color: colors.terracotta,
    textTransform: 'uppercase',
  },
  categoryRightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  categoryDot: {
    width: 5,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: colors.muted,
  },
  overlineRight: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.8,
    color: colors.terracotta,
    textTransform: 'uppercase',
  },
  headline: {
    fontFamily: fonts.display,
    fontSize: 27,
    lineHeight: 33,
    color: colors.charcoal,
    letterSpacing: -0.3,
  },
  description: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
  },
  cardsContainer: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  valueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.smd,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    borderCurve: 'continuous',
    paddingVertical: spacing.smd,
    paddingHorizontal: spacing.md,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextWrap: {
    flex: 1,
    gap: 2,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs + 2,
  },
  cardNumber: {
    fontFamily: fonts.monoMedium,
    fontSize: 11,
    color: colors.terracotta,
  },
  cardTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 13.5,
    color: colors.charcoal,
  },
  cardSub: {
    fontFamily: fonts.sans,
    fontSize: 11.5,
    color: colors.muted,
  },
  actionsContainer: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  memberBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: 50,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceMuted,
  },
  memberBtnText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 13.5,
    color: colors.charcoal,
  },
});
