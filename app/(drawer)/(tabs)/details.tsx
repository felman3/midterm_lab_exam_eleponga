import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';

export default function DetailsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{
    name?: string;
    role?: string;
    time?: string;
    body?: string;
    status?: string;
  }>();

  const critical = params.status === 'critical';
  const tint = critical ? colors.danger : colors.success;

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.navigate('/(drawer)/(tabs)');
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}>
      {params.body ? (
        <View
          style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.name, { color: colors.text }]}>{params.name}</Text>
          <Text style={[styles.role, { color: colors.subtext }]}>
            {params.role} · {params.time}
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <Text style={[styles.body, { color: colors.text }]}>{params.body}</Text>

          <View style={[styles.chip, { borderColor: tint }]}>
            <Ionicons name={critical ? 'warning' : 'checkbox'} size={13} color={tint} />
            <Text style={[styles.chipText, { color: tint }]}>
              {critical ? 'CRITICAL ANOMALY' : 'STATUS NOMINAL'}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.body, { color: colors.subtext }]}>
            Open a log from the Feed to inspect its full details.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.inputBg }]}
        activeOpacity={0.85}
        onPress={goBack}>
        <Ionicons name="arrow-back" size={16} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>Back to Feed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 18,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
  },
  role: {
    fontSize: 12.5,
    marginTop: 3,
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  body: {
    fontSize: 14.5,
    lineHeight: 22,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 14,
  },
  backText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
