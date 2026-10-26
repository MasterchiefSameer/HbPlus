import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/context/auth-context';
import { colors } from '@/theme';

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (isLoaded && isSignedIn) {
    return <Redirect href="/(app)/dashboard" />;
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
