import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';

// Center tab styled as a bright blue floating circle that breaks
// upward out of the normal tab boundary.
function ScanFabButton({ onPress }: BottomTabBarButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.fabWrap}>
      <View style={styles.fabCircle}>
        <MaterialCommunityIcons name="qrcode-scan" size={26} color="#FFFFFF" />
      </View>
    </Pressable>
  );
}

export default function TabsLayout() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.headerText,
        headerTitleStyle: { fontWeight: '700', fontSize: 17 },
        headerLeft: () => <DrawerToggleButton tintColor={colors.headerText} />,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          height: 64,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Medical App',
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => <Ionicons name="newspaper-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'QR Scanner Node',
          tabBarLabel: () => null,
          tabBarIcon: () => null,
          tabBarButton: (props) => <ScanFabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'System Preferences',
          tabBarLabel: 'Preferences',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} />,
        }}
      />
      {/* Details screen lives in the tab stack but is hidden from the tab bar. */}
      <Tabs.Screen
        name="details"
        options={{
          title: 'Log Details',
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  fabWrap: {
    flex: 1,
    alignItems: 'center',
  },
  fabCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginTop: -26,
    backgroundColor: '#1B96D5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0C4A6E',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
