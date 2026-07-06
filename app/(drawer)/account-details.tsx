import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { STUDENT } from '@/constants/student';
import { useAppTheme } from '@/contexts/theme-context';

type RowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  label: string;
  value: string;
  locked?: boolean;
};

export default function AccountDetailsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const Row = ({ icon, iconColor, label, value, locked }: RowProps) => (
    <View style={styles.row}>
      <Ionicons name={icon} size={21} color={iconColor} />
      <View style={styles.rowBody}>
        <Text style={[styles.rowLabel, { color: colors.subtext }]}>{label}</Text>
        <Text style={[styles.rowValue, { color: colors.text }]}>{value}</Text>
      </View>
      <Ionicons
        name={locked ? 'lock-closed' : 'chevron-forward'}
        size={16}
        color={colors.subtext}
      />
    </View>
  );

  const Divider = () => <View style={[styles.divider, { backgroundColor: colors.divider }]} />;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>Personal Information</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>
        Manage your personal details, academic identification nodes, and institutional credentials.
      </Text>

      <Text style={[styles.sectionLabel, { color: colors.sectionLabel }]}>PROFILE DETAILS</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Row icon="person-circle-outline" iconColor="#2F80ED" label="Full Name" value={STUDENT.fullName} />
        <Divider />
        <Row icon="calendar-outline" iconColor="#DB2777" label="Date of Birth" value={STUDENT.birthDate} />
        <Divider />
        <Row icon="location-outline" iconColor="#DC2626" label="Location / Region" value={STUDENT.location} />
      </View>

      <Text style={[styles.sectionLabel, { color: colors.sectionLabel }]}>
        INSTITUTIONAL CREDENTIALS
      </Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Row
          icon="phone-portrait-outline"
          iconColor="#16A34A"
          label="SR-Code Identification"
          value={STUDENT.srCode}
          locked
        />
        <Divider />
        <Row
          icon="mail-outline"
          iconColor="#D97706"
          label="Institutional Email"
          value={STUDENT.institutionalEmail}
          locked
        />
      </View>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        activeOpacity={0.85}
        onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={16} color={colors.text} />
        <Text style={[styles.backButtonText, { color: colors.text }]}>Return to Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    marginBottom: 22,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
  },
  rowBody: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 11.5,
    marginBottom: 3,
  },
  rowValue: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginLeft: 35,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 15,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
