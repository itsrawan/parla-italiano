import { colors, gradients, radius, shadow } from "../styles/tokens.js";

/**
 * Sticky app header containing:
 *  - App title / flag
 *  - Quiz mode toggle
 *  - Shuffle toggle
 *  - Filter toggle (with active-count badge)
 *  - Language switcher
 *  - Mode / shuffle banners
 */
export function Header({
  s,               // UI string bundle from getStrings(lang)
  mode,
  isShuffled,
  activeFilterCount,
  onToggleMode,
  onToggleShuffle,
  onToggleFilter,
  onChangeLang,
}) {
  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <div style={styles.left}>
          <span style={styles.flag}>🇮🇹</span>
          <span style={styles.title}>{s.appTitle}</span>
        </div>

        <div style={styles.right}>
          {/* Quiz toggle */}
          <button
            title={s.quiz}
            style={{
              ...styles.iconBtn,
              background:
                mode === "quiz"
                  ? "rgba(245,158,11,0.75)"
                  : "rgba(255,255,255,0.15)",
            }}
            onClick={onToggleMode}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>

          {/* Shuffle toggle */}
          <button
            title={s.shuffle}
            style={{
              ...styles.iconBtn,
              background: isShuffled
                ? "rgba(34,197,94,0.6)"
                : "rgba(255,255,255,0.15)",
            }}
            onClick={onToggleShuffle}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
            </svg>
          </button>

          {/* Filter toggle */}
          <button title={s.filter} style={styles.iconBtn} onClick={onToggleFilter}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            {activeFilterCount > 0 && (
              <span style={styles.badge}>{activeFilterCount}</span>
            )}
          </button>

          {/* Language switcher */}
          <button title={s.language} style={styles.iconBtn} onClick={onChangeLang}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mode banners */}
      {mode === "quiz" && (
        <div style={styles.banner}>{s.quizModeBanner}</div>
      )}
      {isShuffled && mode !== "quiz" && (
        <div style={{ ...styles.banner, background: "rgba(34,197,94,0.2)" }}>
          {s.shuffledBanner}
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    background: gradients.brandH,
    boxShadow: shadow.header,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  inner: {
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    padding: "13px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left:  { display: "flex", alignItems: "center", gap: 9 },
  right: { display: "flex", gap: 6 },
  flag:  { fontSize: 22 },
  title: { color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: 0.3 },
  iconBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: radius.sm,
    padding: "7px 9px",
    cursor: "pointer",
    color: "#fff",
    position: "relative",
    display: "flex",
    alignItems: "center",
    transition: "background 0.2s",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    background: colors.brandTeal,
    color: "#fff",
    borderRadius: 10,
    fontSize: 10,
    fontWeight: 700,
    padding: "1px 5px",
    lineHeight: 1.4,
  },
  banner: {
    background: "rgba(245,158,11,0.2)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    textAlign: "center",
    padding: "4px 16px",
  },
};
