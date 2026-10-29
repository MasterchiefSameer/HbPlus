import Feather from '@expo/vector-icons/Feather';
import { View } from 'react-native';

import { ThemedText } from '@/components/ui';
import { colors } from '@/theme';

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  bullets: string[];
  icon: keyof typeof Feather.glyphMap;
  iconBgClass: string;
  iconColor: string;
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'BODY',
    subtitle: 'Functional Movement & Mobility',
    bullets: [
      'Strength conditioning & animal flow',
      'Clinical posture restoration',
      'Pain & musculoskeletal management',
    ],
    icon: 'activity',
    iconBgClass: 'bg-terracotta-tint',
    iconColor: colors.terracotta,
  },
  {
    number: '02',
    title: 'GUT',
    subtitle: 'Microbiome & Metabolic Health',
    bullets: [
      'Tailored anti-inflammatory nutrition',
      'Gut-brain axis optimization',
      'Metabolic biomarker balance',
    ],
    icon: 'compass',
    iconBgClass: 'bg-forest-tint',
    iconColor: colors.forest,
  },
  {
    number: '03',
    title: 'MIND',
    subtitle: 'Neuro-Linguistic Programming (NLP)',
    bullets: [
      'Stress regulation & nervous system reset',
      'Behavioral habit architectures',
      'Master NLP practitioner guidance',
    ],
    icon: 'feather',
    iconBgClass: 'bg-surface-muted',
    iconColor: colors.charcoal,
  },
];

export function PillarsSection() {
  return (
    <View className="w-full items-center py-12 px-4">
      <View className="w-full max-w-6xl gap-8">
        {/* Header */}
        <View className="items-center gap-2">
          <ThemedText className="font-sans-bold text-xs tracking-widest text-terracotta">
            THE HB+ TRIFECTA
          </ThemedText>
          <ThemedText className="font-display text-2xl md:text-3xl text-charcoal text-center">
            Three pillars. One cohesive transformation.
          </ThemedText>
          <ThemedText className="font-sans text-sm text-muted text-center max-w-xl leading-relaxed">
            True longevity requires harmony between physical biomechanics, metabolic digestion, and mental resilience.
          </ThemedText>
        </View>

        {/* Pillars Grid */}
        <View className="flex-col md:flex-row gap-4">
          {PILLARS.map((pillar, idx) => (
            <View
              key={idx}
              className="flex-1 bg-surface rounded-xl p-6 border border-sand shadow-sm gap-3">
              {/* Top Accent Lockup */}
              <View className="flex-row items-center justify-between">
                <View className={`w-10 h-10 rounded-full ${pillar.iconBgClass} items-center justify-center`}>
                  <Feather name={pillar.icon} size={18} color={pillar.iconColor} />
                </View>
                <ThemedText className="font-mono-medium text-sm text-muted">
                  {pillar.number}
                </ThemedText>
              </View>

              {/* Title & Subtitle */}
              <View className="gap-0.5 pt-1">
                <ThemedText className="font-display text-xl text-charcoal tracking-wide">
                  {pillar.title}
                </ThemedText>
                <ThemedText className="font-sans-semibold text-xs text-muted">
                  {pillar.subtitle}
                </ThemedText>
              </View>

              <View className="h-[1px] bg-sand my-1" />

              {/* Bullets */}
              <View className="gap-2">
                {pillar.bullets.map((bullet, bIdx) => (
                  <View key={bIdx} className="flex-row items-center gap-2">
                    <Feather name="check" size={13} color={pillar.iconColor} />
                    <ThemedText className="font-sans text-xs text-charcoal flex-1">
                      {bullet}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
