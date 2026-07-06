import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { STUDENT } from '@/constants/student';
import { useAppTheme } from '@/contexts/theme-context';

export default function ProfileScreen() {
  const { colors, isDark } = useAppTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}>
      <View style={styles.cover}>
        <MaterialCommunityIcons
          name="pulse"
          size={54}
          color="rgba(255,255,255,0.65)"
          style={styles.coverPulse}
        />
      </View>

      <View style={styles.avatarWrap}>
        <View style={[styles.avatar, { borderColor: colors.card }]}>
          <Ionicons name="person" size={54} color="#2F80ED" />
          <View style={[styles.cameraBadge, { backgroundColor: colors.card }]}>
            <Ionicons name="camera" size={15} color={colors.text} />
          </View>
        </View>
      </View>

      <Text style={[styles.name, { color: colors.text }]}>{STUDENT.fullName}</Text>
      <Text style={[styles.tagline, { color: colors.subtext }]}>
        {STUDENT.course} • {STUDENT.portal} • {STUDENT.roleTag}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.accent }]}
          activeOpacity={0.85}
          onPress={() => router.push('/(drawer)/account-details')}>
          <Ionicons name="information-circle" size={16} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Account Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: isDark ? '#2A3549' : '#E2E8F0' }]}
          activeOpacity={0.85}>
          <Ionicons name="pencil" size={15} color={colors.text} />
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.introCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Text style={[styles.introTitle, { color: colors.text }]}>Intro</Text>

        <View style={styles.introRow}>
          <Ionicons name="school-outline" size={19} color={colors.subtext} />
          <Text style={[styles.introText, { color: colors.text }]}>
            Studies at <Text style={styles.introBold}>{STUDENT.university}</Text>
          </Text>
        </View>

        <View style={styles.introRow}>
          <Ionicons name="phone-portrait-outline" size={19} color={colors.subtext} />
          <Text style={[styles.introText, { color: colors.text }]}>
            SR-Code: <Text style={styles.introBold}>{STUDENT.srCode}</Text>
          </Text>
        </View>

        <View style={styles.introRow}>
          <Ionicons name="mail-outline" size={19} color={colors.subtext} />
          <Text style={[styles.introText, { color: colors.text }]}>
            Email: <Text style={styles.introBold}>{STUDENT.institutionalEmail}</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  cover: {
    height: 150,
    backgroundColor: '#1B96D5',
  },
  coverPulse: {
    position: 'absolute',
    right: 26,
    top: 44,
  },
  avatarWrap: {
    alignItems: 'center',
    marginTop: -55,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    backgroundColor: '#CBE7FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 14,
  },
  tagline: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 18,
    paddingHorizontal: 20,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  secondaryButtonText: {
    fontWeight: '700',
    fontSize: 13,
  },
  introCard: {
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  introRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  introText: {
    fontSize: 13.5,
    flex: 1,
  },
  introBold: {
    fontWeight: '700',
  },
});
