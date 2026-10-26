import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@/context/auth-context';
import { colors } from '@/theme';

export default function AppLayout() {
  const { user, isSignedIn, isLoading } = useAuth();

  // 1. Loading state: don't flash protected screen or redirect prematurely
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.terracotta} />
      </View>
    );
  }

  // 2. Auth Guard: if not authenticated, redirect directly to /login
  if (!isSignedIn || !user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.cream },
      }}
    />
  );
}
