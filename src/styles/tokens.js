/**
 * Design tokens — single source of truth for colours, radii, shadows, fonts.
 * Semantic colours use CSS custom properties (defined in index.css) so the
 * app automatically respects the OS light/dark mode preference.
 */

export const colors = {
  // Brand — unchanged in both light and dark mode
  brandNavy:   "#1e3a5f",
  brandTeal:   "#0f766e",
  brandGreen:  "#22c55e",
  sky:         "#0ea5e9",

  // Semantic surfaces & text — auto-swap via CSS vars
  slate50:     "var(--bg-card)",
  slate100:    "var(--bg-subtle)",
  slate200:    "var(--border)",
  slate300:    "var(--border-light)",
  slate400:    "var(--text-muted)",
  slate500:    "var(--text-secondary)",
  slate600:    "var(--text-body)",

  // Italian word colour on card front (dark forest green ↔ bright mint)
  green900:    "var(--text-word)",

  // Badges / selected-state highlights
  green100:    "var(--color-badge-bg)",
  green50:     "var(--color-badge-light)",
  green800:    "#166534",

  // Quiz wrong-answer feedback
  red50:       "var(--quiz-wrong-bg)",
  red700:      "var(--quiz-wrong-txt)",
  red900:      "var(--quiz-wrong-txt)",
};

export const gradients = {
  brand:    `linear-gradient(135deg, ${colors.brandNavy} 0%, ${colors.brandTeal} 100%)`,
  brandH:   `linear-gradient(90deg, ${colors.brandNavy}, ${colors.brandTeal})`,
  green:    `linear-gradient(135deg, ${colors.brandGreen}, ${colors.brandTeal})`,
  progress: `linear-gradient(90deg, ${colors.brandGreen}, ${colors.brandTeal})`,
};

export const fonts = {
  ui:     "'Outfit', system-ui, 'Noto Sans Arabic', sans-serif",
  serif:  "Georgia, serif",
  arabic: "'Noto Sans Arabic', 'Arial', sans-serif",
  splash: "'Nunito', 'Outfit', sans-serif",
};

export const radius = {
  sm:  8,
  md:  12,
  lg:  18,
  xl:  24,
  xxl: 32,
  pill: 50,
};

export const shadow = {
  card:     "0 10px 40px rgba(0,0,0,0.10)",
  splash:   "0 32px 80px rgba(0,0,0,0.28)",
  btn:      "0 4px 14px rgba(34,197,94,0.35)",
  btnGreen: "0 4px 14px rgba(34,197,94,0.45)",
  header:   "0 2px 16px rgba(0,0,0,0.15)",
  quiz:     "0 4px 20px rgba(0,0,0,0.08)",
};
