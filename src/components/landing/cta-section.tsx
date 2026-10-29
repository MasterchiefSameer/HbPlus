import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Button, ThemedText } from '@/components/ui';
import { colors } from '@/theme';

export function CtaSection() {
  const router = useRouter();

  return (
    <View className="w-full items-center py-12 px-4">
      <View className="w-full max-w-6xl bg-surface rounded-xl border border-sand py-12 px-6 items-center shadow-md">
        <View className="max-w-2xl items-center gap-4">
          {/* Badge */}
          <View className="flex-row items-center gap-1.5 bg-forest-tint border border-forest-border rounded-full py-1 px-3">
            <Feather name="shield" size={12} color={colors.forest} />
            <ThemedText className="font-sans-bold text-[10.5px] tracking-wider text-forest">
              ACCESSIBLE EVERYWHERE
            </ThemedText>
          </View>

          {/* Headline */}
          <ThemedText className="font-display text-2xl md:text-4xl text-charcoal text-center leading-snug">
            Ready to begin your vitality journey?
          </ThemedText>

          <ThemedText className="font-sans text-sm md:text-base text-muted text-center leading-relaxed">
            Join HB+ to unlock clinical assessment protocols, personalized lifestyle pathways, and direct consultations with our expert medical team.
          </ThemedText>

          {/* Action Buttons */}
          <View className="flex-col md:flex-row items-center justify-center gap-3 w-full pt-2">
            <Button
              title="Create Member Account"
              variant="primary"
              size="lg"
              iconPosition="right"
              icon={<Feather name="arrow-right" size={16} color={colors.onTint} />}
              onPress={() => router.push('/(auth)/signup')}
            />

            {/* Android APK Download Indicator */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Download Android APK"
              onPress={() => router.push('/(auth)/login')}
              className="flex-row items-center gap-2 h-12 px-4 rounded-full border border-sand bg-surface-muted active:bg-sand">
              <Feather name="smartphone" size={15} color={colors.charcoal} />
              <ThemedText className="font-sans-semibold text-xs text-charcoal">
                Available on Mobile (APK)
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
