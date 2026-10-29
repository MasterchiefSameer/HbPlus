import Feather from '@expo/vector-icons/Feather';
import { View } from 'react-native';

import { ThemedText } from '@/components/ui';
import { colors } from '@/theme';

interface StatItem {
  metric: string;
  label: string;
  sub: string;
  icon: keyof typeof Feather.glyphMap;
}

const STATS: StatItem[] = [
  {
    metric: '94%',
    label: 'Biomarker Optimization',
    sub: 'Measured functional vitality & gut recovery within 90 days.',
    icon: 'trending-up',
  },
  {
    metric: '100%',
    label: 'Physician-Verified',
    sub: 'Every care journey supervised by registered medical doctors.',
    icon: 'check-circle',
  },
  {
    metric: '3-Pillar',
    label: 'Integrated Continuum',
    sub: 'Harmonizing Body movement, Gut microbiome, and Mind resilience.',
    icon: 'activity',
  },
  {
    metric: '1:1 Live',
    label: 'Human Accountability',
    sub: 'Personalized sessions replacing rigid automated fitness apps.',
    icon: 'users',
  },
];

export function AchievementsSection() {
  return (
    <View className="w-full bg-surface-muted border-y border-sand items-center py-12 px-4">
      <View className="w-full max-w-6xl gap-8">
        {/* Section Header */}
        <View className="items-center gap-1.5">
          <ThemedText className="font-sans-bold text-xs tracking-widest text-terracotta">
            PROVEN CLINICAL EXCELLENCE
          </ThemedText>
          <ThemedText className="font-display text-2xl md:text-3xl text-charcoal text-center">
            Measurable vitality, not temporary fixes.
          </ThemedText>
        </View>

        {/* Stats Grid */}
        <View className="flex-col md:flex-row gap-4">
          {STATS.map((stat, idx) => (
            <View
              key={idx}
              className="flex-1 bg-surface rounded-xl p-4 gap-1.5 border border-sand shadow-sm">
              <View className="w-9 h-9 rounded-full bg-terracotta-tint items-center justify-center mb-1">
                <Feather name={stat.icon} size={18} color={colors.terracotta} />
              </View>
              <ThemedText className="font-display text-3xl text-charcoal tracking-tight">
                {stat.metric}
              </ThemedText>
              <ThemedText className="font-sans-bold text-sm text-charcoal">
                {stat.label}
              </ThemedText>
              <ThemedText className="font-sans text-xs text-muted leading-relaxed">
                {stat.sub}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
