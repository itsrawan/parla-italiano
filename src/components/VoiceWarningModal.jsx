import { colors, radius, shadow, gradients } from "../styles/tokens.js";

/**
 * Modal shown when no Italian TTS voice is found on the user's system.
 * Explains what is wrong and how to fix it.
 * Respects the selected UI language (Arabic → RTL, English → LTR).
 */
export function VoiceWarningModal({ onDismiss, s, lang }) {
  const isRtl = lang === "ar";
  const dir   = isRtl ? "rtl" : "ltr";

  const steps = [
    s.voiceStep1,
    s.voiceStep2,
    s.voiceStep3,
    s.voiceStep4,
    s.voiceStep5,
  ];

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, direction: dir }} role="dialog" aria-modal="true">

        {/* Icon */}
        <div style={styles.iconRow}>
          <span style={styles.icon}>🔇</span>
        </div>

        {/* Heading */}
        <h2 style={styles.title}>{s.voiceTitle}</h2>

        {/* Body */}
        <p style={styles.body}>{s.voiceBody}</p>

        {/* Fix steps */}
        <div style={styles.stepsBox}>
          <p style={styles.stepsHeading}>{s.voiceHowToFix}</p>
          <ol style={styles.list}>
            {steps.map((text, i) => (
              <li key={i} style={{ ...styles.listItem, flexDirection: isRtl ? "row-reverse" : "row" }}>
                <span style={styles.stepNum}>{i + 1}</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* macOS note */}
        <p style={styles.note}>{s.voiceMac}</p>

        {/* Actions */}
        <div style={{ ...styles.btnRow, flexDirection: isRtl ? "row-reverse" : "row" }}>
          <button style={styles.dismissBtn} onClick={onDismiss}>
            {s.voiceDontShow}
          </button>
          <button style={styles.okBtn} onClick={onDismiss}>
            {s.voiceGotIt}
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
    background: "var(--bg-card)",
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
    background: "var(--bg-card)",
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
