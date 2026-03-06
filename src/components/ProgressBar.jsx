import { colors, gradients } from "../styles/tokens.js";

/** Displays current card position and a filled progress track. */
export function ProgressBar({ current, total }) {
  const pct = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div style={styles.wrap}>
      <div style={styles.track}>
        <div style={{ ...styles.fill, width: `${pct}%` }} />
      </div>
      <span style={styles.label}>{current + 1} / {total}</span>
    </div>
  );
}

const styles = {
  wrap: {
    /* width is controlled by .card-area class in index.css */
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  track: {
    flex: 1,
    height: 5,
    background: colors.green100,
    borderRadius: 6,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    background: gradients.progress,
    borderRadius: 6,
    transition: "width 0.3s",
  },
  label: {
    fontSize: 12,
    color: colors.slate400,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
};
