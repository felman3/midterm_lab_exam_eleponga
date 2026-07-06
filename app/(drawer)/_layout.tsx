import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppTheme } from '@/contexts/theme-context';

function ClinicalDrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const activeRoute = props.state.routes[props.state.index]?.name;

  const items = [
    {
      key: '(tabs)',
      label: 'Main Dashboard',
      icon: (color: string) => <MaterialCommunityIcons name="dots-grid" size={22} color={color} />,
      onPress: () => router.navigate('/(drawer)/(tabs)'),
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: (color: string) => <Ionicons name="person-outline" size={20} color={color} />,
      onPress: () => router.navigate('/(drawer)/profile'),
    },
  ];

  return (
    <View style={[styles.drawerRoot, { backgroundColor: colors.card }]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={[styles.drawerScroll, { paddingTop: insets.top + 28 }]}>
        <Text style={[styles.drawerTitle, { color: colors.text }]}>Drawer Menus</Text>
        <Text style={[styles.drawerSubtitle, { color: colors.subtext }]}>CLINICAL PORTAL</Text>

        <View style={styles.menuList}>
          {items.map((item) => {
            const active = activeRoute === item.key;
            const tint = active ? colors.accent : colors.subtext;
            return (
              <Pressable
                key={item.key}
                onPress={item.onPress}
                style={[styles.menuItem, active && { backgroundColor: colors.accentSoft }]}>
                {item.icon(tint)}
                <Text style={[styles.menuLabel, { color: active ? colors.accent : colors.text }]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </DrawerContentScrollView>

      <View
        style={[
          styles.logoutBlock,
          { borderTopColor: colors.divider, paddingBottom: insets.bottom + 28 },
        ]}>
        <Pressable style={styles.menuItem} onPress={() => router.navigate('/(drawer)/logout')}>
          <Ionicons name="log-out-outline" size={22} color={colors.danger} />
          <Text style={[styles.menuLabel, { color: colors.danger }]}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  const { colors } = useAppTheme();

  return (
    <Drawer
      drawerContent={(props) => <ClinicalDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.headerText,
        headerTitleStyle: { fontWeight: '700', fontSize: 17 },
        drawerStyle: { width: 300 },
      }}>
      <Drawer.Screen name="(tabs)" options={{ headerShown: false, title: 'Main Dashboard' }} />
      <Drawer.Screen name="profile" options={{ title: 'User Profile' }} />
      <Drawer.Screen name="account-details" options={{ title: 'Account Details' }} />
      <Drawer.Screen name="logout" options={{ headerShown: false, title: 'Logout' }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerRoot: {
    flex: 1,
  },
  drawerScroll: {
    paddingHorizontal: 18,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  drawerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 4,
    marginBottom: 26,
  },
  menuList: {
    gap: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  logoutBlock: {
    borderTopWidth: 1,
    paddingHorizontal: 18,
    paddingTop: 14,
  },
});
