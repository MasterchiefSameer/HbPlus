import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { HbLogo, ThemedText } from '@/components/ui';
import { colors } from '@/theme';

export function LandingFooter() {
  const router = useRouter();

  return (
    <View className="w-full bg-surface border-t border-sand items-center py-12 px-4">
      <View className="w-full max-w-6xl flex-col md:flex-row items-start justify-between gap-10">
        {/* Brand & Mission Column */}
        <View className="flex-1 max-w-sm gap-3">
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 rounded-full bg-surface-muted border border-sand items-center justify-center p-0.5">
              <HbLogo size={20} variant="dark" />
            </View>
            <ThemedText className="font-sans-bold text-sm text-charcoal tracking-wide">
              HB+ VITALITY
            </ThemedText>
          </View>
          <ThemedText className="font-sans text-xs text-muted leading-relaxed">
            Holistic lifestyle transformation combining physical biomechanics, microbiome nutrition, and cognitive NLP resilience.
          </ThemedText>
          <ThemedText className="font-sans text-[11px] text-muted pt-1">
            © 2026 HB+ Vitality Inc. Confidential System. All rights reserved.
          </ThemedText>
        </View>

        {/* Portal Access Column */}
        <View className="flex-1 gap-2.5">
          <ThemedText className="font-sans-bold text-[11px] tracking-wider text-charcoal mb-1">
            AUTHENTICATION
          </ThemedText>
          <Pressable onPress={() => router.push('/(auth)/login')} className="flex-row items-center gap-2 py-0.5">
            <Feather name="shield" size={13} color={colors.muted} />
            <ThemedText className="font-sans-medium text-xs text-muted hover:text-charcoal">
              Staff Clinical Gateway
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => router.push('/(auth)/login')} className="flex-row items-center gap-2 py-0.5">
            <Feather name="user" size={13} color={colors.muted} />
            <ThemedText className="font-sans-medium text-xs text-muted hover:text-charcoal">
              Member Sign-In
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => router.push('/(auth)/signup')} className="flex-row items-center gap-2 py-0.5">
            <Feather name="plus-circle" size={13} color={colors.muted} />
            <ThemedText className="font-sans-medium text-xs text-muted hover:text-charcoal">
              Create Member Account
            </ThemedText>
          </Pressable>
        </View>

        {/* Ecosystem & Studios Column */}
        <View className="flex-1 gap-2.5">
          <ThemedText className="font-sans-bold text-[11px] tracking-wider text-charcoal mb-1">
            ECOSYSTEM
          </ThemedText>
          <View className="flex-row items-center gap-2 py-0.5">
            <Feather name="map-pin" size={13} color={colors.muted} />
            <ThemedText className="font-sans-medium text-xs text-muted">
              Hop Studio (Bhubaneswar)
            </ThemedText>
          </View>
          <View className="flex-row items-center gap-2 py-0.5">
            <Feather name="briefcase" size={13} color={colors.muted} />
            <ThemedText className="font-sans-medium text-xs text-muted">
              HB+ Business Wellness
            </ThemedText>
          </View>
          <View className="flex-row items-center gap-2 py-0.5">
            <Feather name="headphones" size={13} color={colors.muted} />
            <ThemedText className="font-sans-medium text-xs text-muted">
              Clinical IT Helpdesk
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}
