import { SUPPORTED_UI_LANGUAGES } from "../data/config.js";
import { colors, gradients, fonts, radius, shadow } from "../styles/tokens.js";

/**
 * Language-selection splash screen shown before the app loads.
 * Language options are driven by SUPPORTED_UI_LANGUAGES in config.js —
 * add a new entry there to automatically show it here.
 */
export function SplashScreen({ onSelectLang }) {
  return (
    <div style={styles.splash}>
      <div style={styles.card}>
        <span style={styles.flag}>🇮🇹</span>
        <h1 style={styles.title}>Parla Italiano</h1>
        <p style={styles.titleAr}>تحدث الإيطالية</p>
        <p style={styles.sub}>Learn Italian · تعلم الإيطالية</p>

        <div style={styles.langRow}>
          {SUPPORTED_UI_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              style={{
                ...styles.langBtn,
                fontFamily: lang.rtl ? fonts.arabic : fonts.ui,
              }}
              onClick={() => onSelectLang(lang.code)}
            >
              <span style={styles.langFlag}>{lang.flag}</span>
              <span style={styles.langLabel}>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  splash: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: gradients.brand,
  },
  card: {
    background: "#fff",
    borderRadius: radius.xxl,
    padding: "48px 36px 44px",
    textAlign: "center",
    boxShadow: shadow.splash,
    maxWidth: 340,
    width: "90%",
  },
  flag: {
    fontSize: 76,
    display: "block",
    marginBottom: 12,
    lineHeight: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 900,
    color: colors.brandNavy,
    margin: "0 0 2px",
    letterSpacing: -1,
    fontFamily: fonts.splash,
  },
  titleAr: {
    fontSize: 22,
    fontWeight: 800,
    color: colors.brandTeal,
    margin: "0 0 8px",
    fontFamily: fonts.arabic,
  },
  sub: {
    color: colors.slate400,
    marginBottom: 36,
    fontSize: 14,
    fontWeight: 500,
  },
  langRow: {
    display: "flex",
    gap: 14,
    justifyContent: "center",
  },
  langBtn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "20px 10px",
    borderRadius: radius.lg,
    border: `2px solid ${colors.slate200}`,
    background: colors.slate50,
    cursor: "pointer",
    transition: "all 0.2s",
    color: colors.brandNavy,
  },
  langFlag: { fontSize: 46, lineHeight: 1 },
  langLabel: { fontSize: 15, fontWeight: 800, fontFamily: fonts.ui },
};
