import { useEffect } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/auth-context';
import { colors } from '@/theme';

export default function SSOCallbackScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.replace('/(app)/dashboard' as any);
      } else {
        const timer = setTimeout(() => {
          if (isSignedIn) {
            router.replace('/(app)/dashboard' as any);
          } else {
            router.replace('/(auth)/login' as any);
          }
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.cream }}>
      <ActivityIndicator size="large" color={colors.terracotta} />
    </View>
  );
}
