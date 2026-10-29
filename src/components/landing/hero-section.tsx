import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Button, ThemedText } from '@/components/ui';
import { colors } from '@/theme';

interface HeroSectionProps {
  onScrollToSection?: (sectionId: string) => void;
}

export function HeroSection({ onScrollToSection }: HeroSectionProps = {}) {
  const router = useRouter();

  return (
    <View className="w-full items-center py-10 px-4">
      <View className="w-full max-w-6xl flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left Column: Headline, Description & CTAs */}
        <View className="w-full md:flex-1 gap-4">
          {/* Badge */}
          <View className="self-start flex-row items-center gap-1.5 bg-forest-tint border border-forest-border rounded-full py-1 px-3">
            <Feather name="activity" size={13} color={colors.forest} />
            <ThemedText className="font-sans-bold text-[10.5px] tracking-wider text-forest">
              CLINICALLY SUPERVISED WELLNESS
            </ThemedText>
          </View>

          {/* Headline */}
          <ThemedText className="font-display text-3xl md:text-5xl text-charcoal leading-tight">
            Elevate your vitality through precision wellness.
          </ThemedText>

          {/* Subtitle */}
          <ThemedText className="font-sans text-sm md:text-base text-muted leading-relaxed">
            Experience bespoke lifestyle care combining cellular regeneration, gut microbiome health, and movement science — guided by licensed medical practitioners and specialized coaches.
          </ThemedText>

          {/* CTA Row */}
          <View className="flex-row flex-wrap items-center gap-3 pt-2">
            <Button
              title="Start Your Pathway"
              variant="primary"
              size="lg"
              iconPosition="right"
              icon={<Feather name="arrow-right" size={16} color={colors.onTint} />}
              onPress={() => router.push('/(auth)/signup')}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Explore Portal"
              onPress={() => router.push('/(auth)/login')}
              className="flex-row items-center gap-2 h-12 px-4 rounded-full border border-sand bg-surface active:bg-sand">
              <Feather name="shield" size={14} color={colors.charcoal} />
              <ThemedText className="font-sans-semibold text-sm text-charcoal">
                Staff / Member Sign-In
              </ThemedText>
            </Pressable>
          </View>

          {/* Trust Highlights */}
          <View className="gap-2 pt-2">
            <View className="flex-row items-center gap-2">
              <Feather name="check-circle" size={14} color={colors.forest} />
              <ThemedText className="font-sans-medium text-xs text-charcoal">
                1:1 Live Doctor & Specialist Care
              </ThemedText>
            </View>
            <View className="flex-row items-center gap-2">
              <Feather name="check-circle" size={14} color={colors.forest} />
              <ThemedText className="font-sans-medium text-xs text-charcoal">
                Flexible Pause Mode for Travel
              </ThemedText>
            </View>
          </View>

          {/* Quick Scroll Indicator to Pillars */}
          {onScrollToSection && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Scroll down to explore HB+ clinical pillars"
              onPress={() => onScrollToSection('pillars')}
              className="flex-row items-center gap-1.5 self-start pt-1 active:opacity-75">
              <ThemedText className="font-sans-semibold text-xs text-terracotta">
                Explore Clinical Pillars & Methodology
              </ThemedText>
              <Feather name="arrow-down" size={14} color={colors.terracotta} />
            </Pressable>
          )}
        </View>

        {/* Right Column: Hero Visual Card */}
        <View className="w-full md:flex-1 items-center justify-center">
          <View className="w-full max-w-[440px] h-[360px] md:h-[400px] rounded-xl overflow-hidden border border-sand relative shadow-md">
            <Image
              source="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&auto=format&fit=crop&q=80"
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              transition={300}
              accessibilityLabel="HB+ Clinical Longevity"
            />

            {/* Floating Specialist Pill */}
            <View className="absolute top-4 left-4 bg-white/90 py-2 px-3 rounded-md flex-row items-center gap-2 border border-sand">
              <Feather name="award" size={14} color={colors.terracotta} />
              <View>
                <ThemedText className="font-sans-bold text-[11px] text-charcoal">
                  Multidisciplinary Faculty
                </ThemedText>
                <ThemedText className="font-sans text-[10px] text-muted">
                  Physios, Nutritionists & Doctors
                </ThemedText>
              </View>
            </View>

            {/* Floating Live Status Pill */}
            <View className="absolute bottom-4 right-4 bg-charcoal/90 py-2 px-3 rounded-md flex-row items-center gap-2">
              <View className="w-2 h-2 rounded-full bg-emerald-400" />
              <View>
                <ThemedText className="font-sans-bold text-[11px] text-white">
                  Active Longevity Protocol
                </ThemedText>
                <ThemedText className="font-sans text-[10px] text-zinc-300">
                  Real-Time Biomarker Tracking
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
