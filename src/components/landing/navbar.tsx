import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { HbLogo, ThemedText } from '@/components/ui';
import { colors } from '@/theme';

interface LandingNavbarProps {
  onScrollToSection?: (sectionId: string) => void;
}

export function LandingNavbar({ onScrollToSection }: LandingNavbarProps = {}) {
  const router = useRouter();

  return (
    <View className="w-full bg-cream border-b border-sand items-center">
      <View className="w-full max-w-6xl px-4 py-3 flex-row items-center justify-between">
        {/* HB+ Brand Lockup */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="HB+ Home"
          onPress={() => onScrollToSection ? onScrollToSection('hero') : router.push('/')}
          className="flex-row items-center gap-2.5">
          <View className="w-10 h-10 rounded-full bg-surface border border-sand items-center justify-center p-1">
            <HbLogo size={26} variant="dark" />
          </View>
          <View>
            <ThemedText className="font-sans-bold text-sm text-charcoal tracking-wide">
              HB+ VITALITY
            </ThemedText>
            <ThemedText className="font-sans text-[11px] text-muted">
              Precision Longevity Care
            </ThemedText>
          </View>
        </Pressable>

        {/* Desktop Navigation Links (Responsive via NativeWind md:flex) */}
        <View className="hidden md:flex flex-row items-center gap-6">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll to Pillars"
            onPress={() => onScrollToSection?.('pillars')}
            className="py-1 px-2">
            <ThemedText className="font-sans-medium text-[13.5px] text-muted hover:text-charcoal active:text-charcoal">
              Pillars
            </ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll to Methodology"
            onPress={() => onScrollToSection?.('achievements')}
            className="py-1 px-2">
            <ThemedText className="font-sans-medium text-[13.5px] text-muted hover:text-charcoal active:text-charcoal">
              Methodology
            </ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll to Specialists"
            onPress={() => onScrollToSection?.('pillars')}
            className="py-1 px-2">
            <ThemedText className="font-sans-medium text-[13.5px] text-muted hover:text-charcoal active:text-charcoal">
              Specialists
            </ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll to Mobile App"
            onPress={() => onScrollToSection?.('cta')}
            className="py-1 px-2">
            <ThemedText className="font-sans-medium text-[13.5px] text-muted hover:text-charcoal active:text-charcoal">
              Get App
            </ThemedText>
          </Pressable>
        </View>

        {/* Auth Trigger Buttons */}
        <View className="flex-row items-center gap-2">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sign In"
            onPress={() => router.push('/(auth)/login')}
            className="flex-row items-center gap-1.5 py-2 px-3.5 rounded-full border border-sand bg-surface active:bg-sand">
            <Feather name="lock" size={13} color={colors.charcoal} />
            <ThemedText className="font-sans-semibold text-xs text-charcoal">
              Sign In
            </ThemedText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Get Started"
            onPress={() => router.push('/(auth)/signup')}
            className="flex-row items-center gap-1.5 py-2 px-4 rounded-full bg-terracotta active:bg-rust">
            <ThemedText className="font-sans-semibold text-xs text-white">
              Get Started
            </ThemedText>
            <Feather name="arrow-right" size={13} color={colors.onTint} />
          </Pressable>
        </View>
      </View>

      {/* Mobile Horizontal Quick-Scroll Pill Bar */}
      <View className="flex md:hidden w-full px-4 pb-2.5 pt-0.5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 16 }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll to Overview"
            onPress={() => onScrollToSection?.('hero')}
            className="py-1 px-3 rounded-full bg-surface border border-sand active:bg-sand">
            <ThemedText className="font-sans-medium text-xs text-charcoal">
              Overview
            </ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll to Pillars"
            onPress={() => onScrollToSection?.('pillars')}
            className="py-1 px-3 rounded-full bg-surface border border-sand active:bg-sand">
            <ThemedText className="font-sans-medium text-xs text-charcoal">
              3 Pillars
            </ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll to Outcomes"
            onPress={() => onScrollToSection?.('achievements')}
            className="py-1 px-3 rounded-full bg-surface border border-sand active:bg-sand">
            <ThemedText className="font-sans-medium text-xs text-charcoal">
              Outcomes
            </ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll to Get App"
            onPress={() => onScrollToSection?.('cta')}
            className="py-1 px-3 rounded-full bg-surface border border-sand active:bg-sand">
            <ThemedText className="font-sans-medium text-xs text-charcoal">
              Get App
            </ThemedText>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}
