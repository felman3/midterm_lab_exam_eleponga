import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/contexts/auth-context';
import { useAppTheme } from '@/contexts/theme-context';

export default function LogoutScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { colors } = useAppTheme();

  useFocusEffect(
    useCallback(() => {
      logout();
      router.replace('/(auth)');
    }, [logout, router])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={[styles.label, { color: colors.subtext }]}>Signing out…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
