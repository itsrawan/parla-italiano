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
  myDeckOnly,
  myDeckCount,
  onToggleMode,
  onToggleShuffle,
  onToggleFilter,
  onToggleMyDeck,
  onOpenAddCard,
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
          {/* Quiz toggle — pencil on clipboard */}
          <button
            title={s.quiz}
            style={{
              ...styles.iconBtn,
              background:
                mode === "quiz"
                  ? "rgba(245,158,11,0.85)"
                  : "rgba(255,255,255,0.15)",
            }}
            onClick={onToggleMode}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          {/* Shuffle toggle — dice */}
          <button
            title={s.shuffle}
            style={{
              ...styles.iconBtn,
              background: isShuffled
                ? "rgba(34,197,94,0.75)"
                : "rgba(255,255,255,0.15)",
            }}
            onClick={onToggleShuffle}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="2" y="2" width="20" height="20" rx="4" ry="4" />
              <circle cx="8"  cy="8"  r="1.5" fill="currentColor" stroke="none" />
              <circle cx="16" cy="8"  r="1.5" fill="currentColor" stroke="none" />
              <circle cx="8"  cy="16" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
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

          {/* My Deck toggle */}
          <button
            title={s.myDeck}
            style={{
              ...styles.iconBtn,
              background: myDeckOnly
                ? "rgba(239,68,68,0.65)"
                : "rgba(255,255,255,0.15)",
            }}
            onClick={onToggleMyDeck}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill={myDeckOnly ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {myDeckCount > 0 && (
              <span style={styles.badge}>{myDeckCount}</span>
            )}
          </button>

          {/* Add custom card */}
          <button title={s.addCard} style={styles.iconBtn} onClick={onOpenAddCard}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
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
        <div style={{ ...styles.banner, background: "rgba(245,158,11,0.55)" }}>
          ✏️ {s.quizModeBanner}
        </div>
      )}
      {isShuffled && mode !== "quiz" && (
        <div style={{ ...styles.banner, background: "rgba(34,197,94,0.45)" }}>
          🎲 {s.shuffledBanner}
        </div>
      )}
      {myDeckOnly && (
        <div style={{ ...styles.banner, background: "rgba(239,68,68,0.45)" }}>
          ♥ {s.myDeck}
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
    background: "rgba(245,158,11,0.55)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    textAlign: "center",
    padding: "7px 16px",
    letterSpacing: 0.2,
  },
};
