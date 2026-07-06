import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { STUDENT } from '@/constants/student';
import { useAppTheme, type Palette } from '@/contexts/theme-context';

type LogStatus = 'nominal' | 'critical';

type MedicalLog = {
  id: string;
  name: string;
  role: string;
  time: string;
  body: string;
  status: LogStatus;
  avatar:
    | { type: 'initials'; value: string }
    | { type: 'icon'; value: keyof typeof MaterialCommunityIcons.glyphMap };
};

const INITIAL_LOGS: MedicalLog[] = [
  {
    id: '1',
    name: 'Dr. Jane Balan',
    role: 'Attending Pediatrician',
    time: '10m ago',
    body: 'Patient Room 402 blood metrics showing standard resting rates. Stable condition matapos ibigay ang morning maintenance medication.',
    status: 'nominal',
    avatar: { type: 'initials', value: 'JA' },
  },
  {
    id: '2',
    name: 'Dr. Calvin Placio',
    role: 'Ward Telemetry Automated System',
    time: '1h ago',
    body: 'Warning: Critical variance threshold surpassed on ward telemetry bands. Emergency response team notified for Room 205.',
    status: 'critical',
    avatar: { type: 'icon', value: 'robot' },
  },
  {
    id: '3',
    name: 'Dr. Oliver Hernandez',
    role: 'Automated Pathology Report',
    time: '2h ago',
    body: 'Lab Results Available: CBC and Electrolyte panel completed for Patient ID: #9941. All levels within safe operational limits.',
    status: 'nominal',
    avatar: { type: 'icon', value: 'microscope' },
  },
  {
    id: '4',
    name: 'Dr. Celeste Maranan',
    role: 'ICU Charge Nurse',
    time: '3h ago',
    body: 'End of shift turnover: ICU Bed 3 ventilator settings adjusted per Dr. Santos order. SpO2 stable at 98%.',
    status: 'nominal',
    avatar: { type: 'initials', value: 'CE' },
  },
  {
    id: '5',
    name: 'Dr. Harrol Evangelista',
    role: 'Bio-Telemetry Node',
    time: '5h ago',
    body: 'ALERT: Brief ventricular tachycardia detected on Patient Room 101. Incident lasted 4 seconds. Manual review requested.',
    status: 'critical',
    avatar: { type: 'icon', value: 'robot' },
  },
  {
    id: '6',
    name: 'Dr. Doms Javier',
    role: 'Chief of Cardiology',
    time: '6h ago',
    body: 'Scheduled rounds completed for Wing B. Proceeding with elective procedures. Please route urgent charts to the on-call resident.',
    status: 'nominal',
    avatar: { type: 'initials', value: 'DO' },
  },
];

function StatusChip({ status, colors }: { status: LogStatus; colors: Palette }) {
  const critical = status === 'critical';
  const tint = critical ? colors.danger : colors.success;
  return (
    <View style={[styles.chip, { borderColor: tint }]}>
      <Ionicons name={critical ? 'warning' : 'checkbox'} size={12} color={tint} />
      <Text style={[styles.chipText, { color: tint }]}>
        {critical ? 'CRITICAL ANOMALY' : 'STATUS NOMINAL'}
      </Text>
    </View>
  );
}

export default function FeedScreen() {
  const { colors, isDark } = useAppTheme();
  const router = useRouter();
  const [draft, setDraft] = useState('');
  const [logs, setLogs] = useState<MedicalLog[]>(INITIAL_LOGS);

  const addLog = () => {
    const body = draft.trim();
    if (!body) return;
    setLogs((prev) => [
      {
        id: `user-${Date.now()}`,
        name: `Dr. ${STUDENT.fullName}`,
        role: 'Clinical Node Operator',
        time: 'Just now',
        body,
        status: 'nominal',
        avatar: { type: 'initials', value: STUDENT.fullName.slice(0, 2).toUpperCase() },
      },
      ...prev,
    ]);
    setDraft('');
  };

  const openDetails = (log: MedicalLog) => {
    router.push({
      pathname: '/(drawer)/(tabs)/details',
      params: {
        name: log.name,
        role: log.role,
        time: log.time,
        body: log.body,
        status: log.status,
      },
    });
  };

  const avatarBg = isDark ? '#2C3A52' : '#E2E8F0';

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}>
      <Text style={[styles.sectionLabel, { color: colors.sectionLabel }]}>MEDICAL UPDATE</Text>

      {/* Composer card */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <View style={styles.composerRow}>
          <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
            <MaterialCommunityIcons name="stethoscope" size={20} color={colors.accent} />
          </View>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
            placeholder="Mag-post ng clinical note o status alert..."
            placeholderTextColor={colors.subtext}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
        </View>
        <TouchableOpacity
          style={[styles.addLogButton, { backgroundColor: colors.accent }]}
          activeOpacity={0.85}
          onPress={addLog}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={styles.addLogText}>Add Log</Text>
        </TouchableOpacity>
      </View>

      {/* Feed cards */}
      {logs.map((log) => (
        <TouchableOpacity
          key={log.id}
          activeOpacity={0.8}
          onPress={() => openDetails(log)}
          style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={styles.postHeader}>
            <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
              {log.avatar.type === 'initials' ? (
                <Text style={[styles.avatarInitials, { color: colors.subtext }]}>
                  {log.avatar.value}
                </Text>
              ) : (
                <MaterialCommunityIcons name={log.avatar.value} size={20} color="#7C3AED" />
              )}
            </View>
            <View style={styles.postHeaderText}>
              <Text style={[styles.postName, { color: colors.text }]}>{log.name}</Text>
              <Text style={[styles.postRole, { color: colors.subtext }]}>{log.role}</Text>
            </View>
            <Text style={[styles.postTime, { color: colors.subtext }]}>{log.time}</Text>
          </View>

          <Text style={[styles.postBody, { color: colors.text }]}>{log.body}</Text>

          <StatusChip status={log.status} colors={colors} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 48,
    gap: 14,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  composerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13.5,
    minHeight: 40,
  },
  addLogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-end',
    marginTop: 12,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addLogText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  postHeaderText: {
    flex: 1,
  },
  postName: {
    fontSize: 14.5,
    fontWeight: '800',
  },
  postRole: {
    fontSize: 12,
    marginTop: 1,
  },
  postTime: {
    fontSize: 11.5,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  postBody: {
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 12,
  },
  chipText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
});
