import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { STUDENT } from '@/constants/student';
import { useAuth } from '@/contexts/auth-context';
import { useAppTheme } from '@/contexts/theme-context';

export default function SettingsScreen() {
  const { colors, isDark, toggleDark } = useAppTheme();
  const { logout } = useAuth();
  const router = useRouter();

  const [biometrics, setBiometrics] = useState(true);
  const [anomalyAlerts, setAnomalyAlerts] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace('/(auth)');
  };

  const cardStyle = [styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <Text style={[styles.sectionLabel, { color: colors.sectionLabel }]}>DISPLAY</Text>
      <View style={cardStyle}>
        <View style={styles.row}>
          <Ionicons name="moon-outline" size={20} color={colors.accent} />
          <Text style={[styles.rowLabel, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleDark}
            trackColor={{ false: '#CBD5E1', true: '#34D399' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={[styles.sectionLabel, { color: colors.sectionLabel }]}>SECURITY & PRIVACY</Text>
      <View style={cardStyle}>
        <View style={styles.row}>
          <Ionicons name="finger-print" size={20} color={colors.accent} />
          <Text style={[styles.rowLabel, { color: colors.text }]}>Biometric Authentication</Text>
          <Switch
            value={biometrics}
            onValueChange={setBiometrics}
            trackColor={{ false: '#CBD5E1', true: '#34D399' }}
            thumbColor="#FFFFFF"
          />
        </View>
        <View style={[styles.rowDivider, { backgroundColor: colors.divider }]} />
        <Pressable style={styles.row}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.accent} />
          <Text style={[styles.rowLabel, { color: colors.text }]}>Change Passcode</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
        </Pressable>
      </View>

      <Text style={[styles.sectionLabel, { color: colors.sectionLabel }]}>NOTIFICATIONS</Text>
      <View style={cardStyle}>
        <View style={styles.row}>
          <Ionicons name="alert-circle-outline" size={20} color={colors.danger} />
          <View style={styles.rowTextBlock}>
            <Text style={[styles.rowLabel, { color: colors.text }]}>Critical Anomaly Alerts</Text>
            <Text
              style={[
                styles.rowSubLabel,
                { color: anomalyAlerts ? colors.danger : colors.subtext },
              ]}>
              {anomalyAlerts ? 'Status: Live Auditory Dumps ON' : 'Status: Muted'}
            </Text>
          </View>
          <Switch
            value={anomalyAlerts}
            onValueChange={setAnomalyAlerts}
            trackColor={{ false: '#CBD5E1', true: '#F87171' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.dangerSoft }]}
        activeOpacity={0.85}
        onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color={colors.danger} />
        <Text style={[styles.logoutText, { color: colors.danger }]}>Log Out Account</Text>
      </TouchableOpacity>

      <Text style={[styles.version, { color: colors.subtext }]}>{STUDENT.appVersion}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 18,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 14,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  rowTextBlock: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '600',
  },
  rowSubLabel: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  rowDivider: {
    height: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 28,
  },
  logoutText: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  version: {
    textAlign: 'center',
    fontSize: 11.5,
    marginTop: 22,
  },
});
