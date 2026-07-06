import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/auth-context';

export default function WelcomeScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();

  const handleGetStarted = () => {
    login();
    router.replace('/(drawer)/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.banner, { paddingTop: insets.top + 18 }]}>
        <Text style={styles.bannerText}>MIDTERM LABORATORY EXAM</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.heart}>🩷</Text>
        <Text style={styles.title}>HealthTrack Enterprise</Text>
        <Text style={styles.subtitle}>
          Real-time vitals checking metrics and structural logging framework for regional ward
          clinics.
        </Text>

        <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.footerTitle}>BATANGAS STATE UNIVERSITY · CICS</Text>
        <Text style={styles.footerSubtitle}>Midterm Lab Exam - Mobile App Development (2026)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  banner: {
    backgroundColor: '#1B96D5',
    paddingBottom: 18,
    alignItems: 'center',
  },
  bannerText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 2.5,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  heart: {
    fontSize: 64,
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 14,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 320,
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    alignSelf: 'stretch',
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    gap: 6,
  },
  footerTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#94A3B8',
  },
  footerSubtitle: {
    fontSize: 11,
    color: '#CBD5E1',
  },
});
