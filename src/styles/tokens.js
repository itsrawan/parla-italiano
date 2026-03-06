/**
 * Design tokens — single source of truth for colours, radii, shadows, fonts.
 * Components import from here instead of hard-coding values inline.
 */

export const colors = {
  brandNavy:   "#1e3a5f",
  brandTeal:   "#0f766e",
  brandGreen:  "#22c55e",
  sky:         "#0ea5e9",
  slate50:     "#f8fafc",
  slate100:    "#f1f5f9",
  slate200:    "#e2e8f0",
  slate300:    "#cbd5e1",
  slate400:    "#94a3b8",
  slate500:    "#64748b",
  slate600:    "#475569",
  green50:     "#dcfce7",
  green100:    "#bbf7d0",
  green800:    "#166534",
  green900:    "#14532d",
  red50:       "#fee2e2",
  red700:      "#b91c1c",
  red900:      "#991b1b",
};

export const gradients = {
  brand:       `linear-gradient(135deg, ${colors.brandNavy} 0%, ${colors.brandTeal} 100%)`,
  brandH:      `linear-gradient(90deg, ${colors.brandNavy}, ${colors.brandTeal})`,
  green:       `linear-gradient(135deg, ${colors.brandGreen}, ${colors.brandTeal})`,
  progress:    `linear-gradient(90deg, ${colors.brandGreen}, ${colors.brandTeal})`,
};

export const fonts = {
  ui:    "'Outfit', system-ui, 'Noto Sans Arabic', sans-serif",
  serif: "Georgia, serif",
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
  card:   "0 10px 40px rgba(0,0,0,0.10)",
  splash: "0 32px 80px rgba(0,0,0,0.28)",
  btn:    "0 4px 14px rgba(34,197,94,0.35)",
  btnGreen: "0 4px 14px rgba(34,197,94,0.45)",
  header: "0 2px 16px rgba(0,0,0,0.15)",
  quiz:   "0 4px 20px rgba(0,0,0,0.08)",
};
