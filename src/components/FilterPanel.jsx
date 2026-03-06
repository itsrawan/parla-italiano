import { LEVELS, CATEGORIES, LEVEL_COLORS } from "../data/config.js";
import { colors, radius } from "../styles/tokens.js";

/**
 * Filter panel for levels and categories.
 * Shown/hidden by the Header filter button.
 */
export function FilterPanel({
  s,
  lang,
  selectedLevels,
  selectedCats,
  deckSize,
  onToggleLevel,
  onToggleCat,
  onClearAll,
}) {
  const hasFilters = selectedLevels.length + selectedCats.length > 0;

  return (
    <div style={styles.panel}>
      {/* Level chips */}
      <div style={styles.section}>
        <div style={styles.heading}>{s.level}</div>
        <div style={styles.chipRow}>
          {LEVELS.map(l => {
            const active = selectedLevels.includes(l);
            return (
              <button
                key={l}
                onClick={() => onToggleLevel(l)}
                style={{
                  ...styles.chip,
                  background:   active ? LEVEL_COLORS[l] : colors.slate100,
                  color:        active ? "#fff" : colors.slate600,
                  borderColor:  LEVEL_COLORS[l],
                }}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category chips */}
      <div style={styles.section}>
        <div style={styles.heading}>{s.category}</div>
        <div style={styles.chipRow}>
          {CATEGORIES.map(c => {
            const active = selectedCats.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => onToggleCat(c.id)}
                style={{
                  ...styles.chip,
                  background:  active ? colors.sky : colors.slate100,
                  color:       active ? "#fff" : colors.slate600,
                  borderColor: active ? colors.sky : colors.slate300,
                }}
              >
                {c.emoji} {c.label[lang] ?? c.label.en}
              </button>
            );
          })}
        </div>
      </div>

      {hasFilters && (
        <button style={styles.clearBtn} onClick={onClearAll}>
          {s.clearFilters}
        </button>
      )}
      <div style={styles.count}>{deckSize} {s.cards}</div>
    </div>
  );
}

const styles = {
  panel: {
    background: "#fff",
    borderBottom: `1px solid ${colors.slate200}`,
    padding: "14px 24px",
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
  },
  section:  { marginBottom: 10 },
  heading: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.slate400,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 5 },
  chip: {
    padding: "5px 11px",
    borderRadius: 20,
    border: "1.5px solid",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
  },
  clearBtn: {
    marginTop: 8,
    background: "none",
    border: "none",
    color: colors.sky,
    fontSize: 12,
    cursor: "pointer",
    fontWeight: 600,
    padding: 0,
  },
  count: { marginTop: 5, fontSize: 11, color: colors.slate400 },
};
