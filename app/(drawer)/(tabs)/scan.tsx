import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function ScanScreen() {
  return (
    <View style={[styles.container, styles.center]}>
      <View style={styles.scanFrame}>
        <MaterialCommunityIcons name="qrcode-scan" size={72} color="rgba(255, 255, 255, 0.35)" />
      </View>
      <Text style={styles.title}>SCANNER NODE OFFLINE</Text>
      <Text style={styles.subtitle}>QR scanning is disabled on this device.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05090F',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  scanFrame: {
    width: 240,
    height: 240,
    borderRadius: 18,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
