import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState, type ComponentRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AchievementsSection,
  CtaSection,
  HeroSection,
  LandingFooter,
  LandingNavbar,
  PillarsSection,
} from '@/components/landing';
import { useAuth } from '@/context/auth-context';
import { colors } from '@/theme';

export default function UniversalLandingScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const scrollViewRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const sectionOffsets = useRef<Record<string, number>>({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  // If user is already authenticated (returning to website or app), skip to dashboard
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/(app)/dashboard' as any);
    }
  }, [isLoaded, isSignedIn, router]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 260);
  };

  const scrollToSection = (sectionId: string) => {
    const targetY = sectionOffsets.current[sectionId];
    if (targetY !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: Math.max(0, targetY - 10), animated: true });
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={true}>
          {/* 1. Header / Navbar */}
          <LandingNavbar onScrollToSection={scrollToSection} />

          {/* 2. Hero Section with CTAs */}
          <View
            onLayout={(e) => {
              sectionOffsets.current['hero'] = e.nativeEvent.layout.y;
            }}
            className="w-full items-center">
            <HeroSection onScrollToSection={scrollToSection} />
          </View>

          {/* 3. Achievements & Proven Metrics */}
          <View
            onLayout={(e) => {
              sectionOffsets.current['achievements'] = e.nativeEvent.layout.y;
            }}
            className="w-full items-center">
            <AchievementsSection />
          </View>

          {/* 4. Three Pillars Deep-Dive (Body, Gut, Mind) */}
          <View
            onLayout={(e) => {
              sectionOffsets.current['pillars'] = e.nativeEvent.layout.y;
            }}
            className="w-full items-center">
            <PillarsSection />
          </View>

          {/* 5. Pre-Auth Conversion Banner with Mobile APK indicator */}
          <View
            onLayout={(e) => {
              sectionOffsets.current['cta'] = e.nativeEvent.layout.y;
            }}
            className="w-full items-center">
            <CtaSection />
          </View>

          {/* 6. Institutional Footer */}
          <LandingFooter />
        </ScrollView>

        {/* Floating Scroll to Top Action */}
        {showScrollTop && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll to top"
            onPress={scrollToTop}
            className="absolute bottom-6 right-6 w-11 h-11 rounded-full bg-charcoal items-center justify-center border border-sand shadow-lg active:opacity-80"
            style={{ elevation: 6 }}>
            <Feather name="arrow-up" size={18} color={colors.cream} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: colors.cream,
    alignItems: 'center',
  },
});
