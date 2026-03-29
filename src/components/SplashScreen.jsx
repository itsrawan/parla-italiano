import { useState } from "react";
import { LANGUAGES, UI_LANGUAGES, LEARNING_LANGUAGES } from "../data/config.js";
import { getStrings } from "../languages/index.js";
import { colors, gradients, fonts, radius, shadow } from "../styles/tokens.js";

/**
 * Two-step splash:
 *  Step 1 — pick UI/native language (en | ar)
 *  Step 2 — pick the language to learn (it | en | ar, minus uiLang)
 *
 * Calls onStart(uiLang, learningLang) when done.
 */
export function SplashScreen({ onStart }) {
  const [uiLang,  setUiLang]  = useState(null);

  const s = getStrings(uiLang);
  const isRtl = uiLang ? (LANGUAGES[uiLang]?.rtl ?? false) : false;

  if (!uiLang) {
    // Step 1 — choose interface language
    return (
      <div style={styles.splash}>
        <div style={styles.card}>
          <span style={styles.flagBig}>🌐</span>
          <h1 style={{ ...styles.title, fontFamily: fonts.splash }}>LinguaFlip</h1>
          <p style={{ ...styles.sub, fontFamily: fonts.ui }}>Learn languages with flashcards</p>

          <div style={styles.langRow}>
            {UI_LANGUAGES.map(code => {
              const l = LANGUAGES[code];
              return (
                <button
                  key={code}
                  style={{ ...styles.langBtn, fontFamily: l.rtl ? fonts.arabic : fonts.ui }}
                  onClick={() => setUiLang(code)}
                >
                  <span style={styles.langFlag}>{l.flag}</span>
                  <span style={styles.langLabel}>{l.nativeName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Step 2 — choose what to learn
  const learnOptions = LEARNING_LANGUAGES.filter(c => c !== uiLang);
  return (
    <div style={{ ...styles.splash, direction: isRtl ? "rtl" : "ltr" }}>
      <div style={styles.card}>
        <span style={styles.flagBig}>📚</span>
        <h1 style={{ ...styles.title, fontFamily: fonts.splash }}>LinguaFlip</h1>
        <p style={{ ...styles.prompt, fontFamily: isRtl ? fonts.arabic : fonts.ui }}>
          {s.pickLearning}
        </p>

        <div style={styles.langCol}>
          {learnOptions.map(code => {
            const l = LANGUAGES[code];
            return (
              <button
                key={code}
                style={{ ...styles.learnBtn, fontFamily: l.rtl ? fonts.arabic : fonts.ui }}
                onClick={() => onStart(uiLang, code)}
              >
                <span style={styles.learnFlag}>{l.flag}</span>
                <div style={styles.learnLabels}>
                  <span style={styles.learnName}>{l.name}</span>
                  <span style={styles.learnNative}>{l.nativeName}</span>
                </div>
              </button>
            );
          })}
        </div>

        <button style={styles.backBtn} onClick={() => setUiLang(null)}>
          ← Back
        </button>
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
    background: "var(--bg-card)",
    borderRadius: radius.xxl,
    padding: "44px 32px 36px",
    textAlign: "center",
    boxShadow: shadow.splash,
    maxWidth: 340,
    width: "90%",
  },
  flagBig: { fontSize: 64, display: "block", marginBottom: 10, lineHeight: 1 },
  title: {
    fontSize: 38, fontWeight: 900, color: colors.brandNavy,
    margin: "0 0 4px", letterSpacing: -1,
  },
  sub: {
    color: colors.slate400, fontSize: 13, fontWeight: 500, marginBottom: 32,
  },
  prompt: {
    color: colors.slate600, fontSize: 15, fontWeight: 700,
    marginBottom: 20, marginTop: 4,
  },
  langRow: { display: "flex", gap: 14, justifyContent: "center" },
  langBtn: {
    flex: 1, display: "flex", flexDirection: "column",
    alignItems: "center", gap: 8,
    padding: "20px 10px",
    borderRadius: radius.lg,
    border: `2px solid ${colors.slate200}`,
    background: colors.slate50,
    cursor: "pointer",
    color: colors.brandNavy,
  },
  langFlag:  { fontSize: 42, lineHeight: 1 },
  langLabel: { fontSize: 14, fontWeight: 800 },

  langCol: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 },
  learnBtn: {
    display: "flex", alignItems: "center", gap: 16,
    padding: "16px 20px",
    borderRadius: radius.lg,
    border: `2px solid ${colors.slate200}`,
    background: colors.slate50,
    cursor: "pointer",
    color: colors.brandNavy,
    textAlign: "left",
  },
  learnFlag:   { fontSize: 36, lineHeight: 1, flexShrink: 0 },
  learnLabels: { display: "flex", flexDirection: "column", gap: 2 },
  learnName:   { fontSize: 16, fontWeight: 800 },
  learnNative: { fontSize: 12, color: colors.slate400 },
  backBtn: {
    background: "none", border: "none", color: colors.slate400,
    fontSize: 13, cursor: "pointer", fontWeight: 600,
  },
};
