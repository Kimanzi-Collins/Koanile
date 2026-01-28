export const theme = {
  colors: {
    background: '#F5F1F8',
    surface: 'rgba(255, 255, 255, 0.7)',
    surfaceStrong: 'rgba(255, 255, 255, 0.9)',
    surfaceTint: 'rgba(255, 255, 255, 0.5)',
    ink: '#1E1B2E',
    muted: '#7C7A8A',
    accent: '#FFB84D',
    accentSecondary: '#6EC7FF',
    accentTertiary: '#92E6A7',
    outline: 'rgba(255, 255, 255, 0.7)',
  },
  radius: {
    xs: 10,
    sm: 16,
    md: 22,
    lg: 28,
  },
  shadow: {
    shadowColor: '#1A1A2F',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
};

export const glassSurface = {
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.outline,
  borderWidth: 1,
  ...theme.shadow,
};
