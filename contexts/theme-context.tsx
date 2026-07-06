import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Palette = {
  background: string;
  card: string;
  cardBorder: string;
  text: string;
  subtext: string;
  header: string;
  headerText: string;
  accent: string;
  accentSoft: string;
  danger: string;
  dangerSoft: string;
  success: string;
  successSoft: string;
  tabBar: string;
  tabBarBorder: string;
  tabInactive: string;
  inputBg: string;
  divider: string;
  sectionLabel: string;
};

const light: Palette = {
  background: '#EEF1F6',
  card: '#FFFFFF',
  cardBorder: '#E2E8F0',
  text: '#0F172A',
  subtext: '#64748B',
  header: '#1B96D5',
  headerText: '#FFFFFF',
  accent: '#2563EB',
  accentSoft: '#DBEAFE',
  danger: '#DC2626',
  dangerSoft: '#FEE2E2',
  success: '#16A34A',
  successSoft: '#DCFCE7',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E2E8F0',
  tabInactive: '#94A3B8',
  inputBg: '#F1F5F9',
  divider: '#E2E8F0',
  sectionLabel: '#64748B',
};

const dark: Palette = {
  background: '#000000',
  card: '#1B2434',
  cardBorder: '#2C384C',
  text: '#F8FAFC',
  subtext: '#94A3B8',
  header: '#182234',
  headerText: '#FFFFFF',
  accent: '#3B82F6',
  accentSoft: '#1E3A5F',
  danger: '#F87171',
  dangerSoft: '#3B1519',
  success: '#4ADE80',
  successSoft: '#12291B',
  tabBar: '#0D1524',
  tabBarBorder: '#232E42',
  tabInactive: '#64748B',
  inputBg: '#243047',
  divider: '#2C384C',
  sectionLabel: '#94A3B8',
};

type ThemeContextValue = {
  isDark: boolean;
  colors: Palette;
  toggleDark: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const value = useMemo<ThemeContextValue>(
    () => ({
      isDark,
      colors: isDark ? dark : light,
      toggleDark: () => setIsDark((prev) => !prev),
    }),
    [isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used inside AppThemeProvider');
  }
  return ctx;
}
