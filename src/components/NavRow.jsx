import { colors, gradients, radius, shadow } from "../styles/tokens.js";

/** Previous / Flip / Next navigation buttons shown below the flashcard. */
export function NavRow({ s, safeIndex, deckLength, flipped, onPrev, onFlip, onNext }) {
  return (
    <div style={styles.row}>
      <button
        style={{ ...styles.navBtn, opacity: safeIndex === 0 ? 0.3 : 1 }}
        onClick={onPrev}
        disabled={safeIndex === 0}
      >
        {s.prev}
      </button>

      <button style={styles.flipBtn} onClick={onFlip}>
        {flipped ? s.hide : s.reveal}
      </button>

      <button
        style={{ ...styles.navBtn, opacity: safeIndex === deckLength - 1 ? 0.3 : 1 }}
        onClick={onNext}
        disabled={safeIndex === deckLength - 1}
      >
        {s.next}
      </button>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    gap: 10,
    marginTop: 20,
    alignItems: "stretch",
  },
  navBtn: {
    padding: "13px 26px",
    borderRadius: radius.md,
    border: `2px solid ${colors.green100}`,
    background: "var(--bg-card)",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
    color: colors.green900,
  },
  flipBtn: {
    width: 130,
    padding: "13px 0",
    borderRadius: radius.md,
    border: "none",
    background: gradients.green,
    color: "#fff",
    cursor: "pointer",
    fontSize: 17,
    fontWeight: 700,
    boxShadow: shadow.btn,
    textAlign: "center",
  },
};
