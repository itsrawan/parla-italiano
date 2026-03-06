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
    alignItems: "center",
  },
  navBtn: {
    padding: "9px 18px",
    borderRadius: radius.md,
    border: `2px solid ${colors.green100}`,
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    color: colors.green900,
  },
  flipBtn: {
    padding: "9px 22px",
    borderRadius: radius.md,
    border: "none",
    background: gradients.green,
    color: "#fff",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    boxShadow: shadow.btn,
  },
};
