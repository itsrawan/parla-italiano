import { colors, radius, shadow, gradients } from "../styles/tokens.js";

const STEPS = [
  { n: 1, text: "Open Windows Settings" },
  { n: 2, text: "Go to  Time & Language → Language & Region" },
  { n: 3, text: 'Click "Add a language" and choose Italiano' },
  { n: 4, text: 'Tick "Text-to-speech" then click Install' },
  { n: 5, text: "Restart your browser" },
];

/**
 * Modal shown when no Italian TTS voice is found on the user's system.
 * Explains what is wrong and how to fix it.
 * The user can dismiss it permanently ("Don't show again").
 */
export function VoiceWarningModal({ onDismiss }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal} role="dialog" aria-modal="true">

        {/* Icon + heading */}
        <div style={styles.iconRow}>
          <span style={styles.icon}>🔇</span>
        </div>
        <h2 style={styles.title}>Italian Voice Not Found</h2>
        <p style={styles.body}>
          Your browser is pronouncing Italian words with an English voice because
          no Italian Text-to-Speech voice is installed on your system.
        </p>

        {/* Fix steps */}
        <div style={styles.stepsBox}>
          <p style={styles.stepsHeading}>How to fix (Windows):</p>
          <ol style={styles.list}>
            {STEPS.map(s => (
              <li key={s.n} style={styles.listItem}>
                <span style={styles.stepNum}>{s.n}</span>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <p style={styles.note}>
          On macOS: System Settings → Accessibility → Spoken Content → System Voice → Italian.
        </p>

        {/* Actions */}
        <div style={styles.btnRow}>
          <button style={styles.dismissBtn} onClick={onDismiss}>
            Don't show again
          </button>
          <button style={styles.okBtn} onClick={onDismiss}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 16,
  },
  modal: {
    background: "#fff",
    borderRadius: radius.xxl,
    padding: "32px 28px 24px",
    maxWidth: 440,
    width: "100%",
    boxShadow: shadow.splash,
  },
  iconRow: {
    textAlign: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 48,
    lineHeight: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
    color: colors.brandNavy,
    textAlign: "center",
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    color: colors.slate600,
    lineHeight: 1.6,
    textAlign: "center",
    marginBottom: 18,
  },
  stepsBox: {
    background: colors.slate100,
    borderRadius: radius.md,
    padding: "14px 16px",
    marginBottom: 14,
  },
  stepsHeading: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.slate500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: 13,
    color: colors.slate600,
    lineHeight: 1.5,
  },
  stepNum: {
    minWidth: 22,
    height: 22,
    borderRadius: "50%",
    background: gradients.green,
    color: "#fff",
    fontSize: 11,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  note: {
    fontSize: 12,
    color: colors.slate400,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 1.5,
  },
  btnRow: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
  },
  dismissBtn: {
    padding: "9px 16px",
    borderRadius: radius.md,
    border: `1.5px solid ${colors.slate200}`,
    background: "#fff",
    color: colors.slate500,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  okBtn: {
    padding: "9px 22px",
    borderRadius: radius.md,
    border: "none",
    background: gradients.green,
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: shadow.btn,
  },
};
