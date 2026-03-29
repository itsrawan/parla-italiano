import { LEVEL_BG, LEVEL_BORDER, LEVEL_COLORS, CATEGORY_MAP, LANGUAGES } from "../data/config.js";
import { colors, gradients, fonts, radius, shadow } from "../styles/tokens.js";
import { SpeakerIcon } from "./SpeakerIcon.jsx";

/**
 * 3-D flip flashcard.
 *
 * Front: Italian (source) word + speak button
 * Back:  Italian word (faded) + English + Arabic translations
 *
 * Touch and click interactions are handled here;
 * keyboard + swipe are handled by useNavigation in the parent.
 */
export function FlashCard({
  card,
  lang,
  flipped,
  swipeDir,
  speak,
  canSpeak,
  learningLang,
  isBookmarked,
  onToggleBookmark,
  s,
  onFlip,
  onTouchStart,
  onTouchEnd,
}) {
  const frontDir = LANGUAGES[learningLang]?.rtl ? "rtl" : "ltr";
  const levelColor  = LEVEL_COLORS[card.level]  ?? colors.brandGreen;
  const levelBg     = LEVEL_BG[card.level]      ?? colors.slate50;
  const levelBorder = LEVEL_BORDER[card.level]  ?? colors.slate200;
  const cat         = CATEGORY_MAP[card.category];

  // Scale font down for long text so cards never overflow on mobile
  const srcLen  = (card.translations[learningLang] ?? "").length;
  const srcSize = srcLen > 80 ? 14 : srcLen > 60 ? 17 : srcLen > 40 ? 21 : srcLen > 25 ? 28 : srcLen > 15 ? 36 : 44;
  const srcLine = srcLen > 30 ? 1.45 : 1.2;

  const trlText = card.translations[lang] ?? card.translations.en ?? "";
  const trlLen  = trlText.length;
  const isAr    = lang === "ar";
  const trlBase = isAr ? 30 : 28;
  const trlSize = trlLen > 80 ? 14 : trlLen > 60 ? 17 : trlLen > 40 ? (isAr ? 20 : 18) : trlLen > 25 ? (isAr ? 24 : 22) : trlLen > 15 ? (isAr ? 27 : 25) : trlBase;
  const trlLine = trlLen > 30 ? 1.45 : 1.3;

  const cardTransform =
    swipeDir === "left"  ? "translateX(-90px)" :
    swipeDir === "right" ? "translateX(90px)"  : "translateX(0)";

  return (
    <div
      style={{
        ...styles.wrapper,
        transform:  cardTransform,
        opacity:    swipeDir ? 0 : 1,
        transition: swipeDir ? "all 0.22s ease" : "opacity 0.15s ease",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={onFlip}
    >
      <div style={styles.scene}>
        <div
          style={{
            ...styles.flipper,
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ── FRONT ── */}
          <div
            style={{
              ...styles.face,
              ...styles.front,
              background:   levelBg,
              borderColor:  levelBorder,
            }}
          >
            <div style={styles.metaRow}>
              <CardMeta levelColor={levelColor} card={card} cat={cat} lang={lang} />
              {!card.isCustom && (
                <button
                  style={{ ...styles.bookmarkBtn, color: isBookmarked ? "#ef4444" : "#fca5a5" }}
                  onClick={e => { e.stopPropagation(); onToggleBookmark(); }}
                >
                  <HeartIcon filled={isBookmarked} size={22} />
                </button>
              )}
            </div>

            <div style={styles.frontCenter}>
              <div style={{ ...styles.italianWord, direction: frontDir, fontSize: srcSize, lineHeight: srcLine, fontFamily: learningLang === "ar" ? fonts.arabic : fonts.serif }}>{card.translations[learningLang]}</div>
              <button
                disabled={!canSpeak}
                style={{ ...styles.speakBtnLarge, ...(!canSpeak && styles.speakBtnDisabled) }}
                onClick={e => { e.stopPropagation(); speak(card.translations[learningLang]); }}
              >
                <SpeakerIcon size={22} />
              </button>
            </div>

            <div style={styles.flipHint}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4 }}>
                <path d="M1 4v6h6" />
                <path d="M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
              {s.tapToReveal}
            </div>
          </div>

          {/* ── BACK ── */}
          <div
            style={{
              ...styles.face,
              ...styles.back,
              borderColor: levelColor,
            }}
          >
            <CardMeta
              levelColor="rgba(255,255,255,0.2)"
              card={card}
              cat={cat}
              lang={lang}
              dark
            />

            <div style={styles.backCenter}>
              <div style={{ ...styles.backSource, direction: frontDir, fontSize: Math.min(22, srcSize), lineHeight: srcLine }}>{card.translations[learningLang]}</div>
              <div style={styles.divider} />
              <div style={{
                ...(lang === "ar" ? styles.translationAr : styles.translationEn),
                direction: lang === "ar" ? "rtl" : "ltr",
                fontSize: trlSize,
                lineHeight: trlLine,
              }}>
                {trlText}
              </div>
            </div>

            <button
              disabled={!canSpeak}
              style={{ ...styles.speakBtnBack, ...(!canSpeak && styles.speakBtnDisabled) }}
              onClick={e => { e.stopPropagation(); speak(card.translations[learningLang]); }}
            >
              <SpeakerIcon size={15} />
              {s.listen}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeartIcon({ filled, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/** Small level badge + category label shown on both card faces. */
function CardMeta({ levelColor, card, cat, lang, dark = false }) {
  return (
    <div style={metaStyles.row}>
      <span style={{ ...metaStyles.levelBadge, background: levelColor }}>
        {card.level}
      </span>
      <span style={{ ...metaStyles.catBadge, color: dark ? "rgba(255,255,255,0.7)" : colors.slate500 }}>
        {cat?.emoji} {cat?.label[lang] ?? cat?.label.en}
      </span>
    </div>
  );
}

const metaStyles = {
  row:        { display: "flex", gap: 7, alignItems: "center" },
  levelBadge: { borderRadius: 7, padding: "3px 9px", fontSize: 11, fontWeight: 800, color: "#fff" },
  catBadge:   { fontSize: 12, fontWeight: 500 },
};

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: 480,
    cursor: "pointer",
    userSelect: "none",
  },
  scene: {
    width: "100%",
    perspective: "1200px",
    // Explicit height so position:absolute faces can fill it.
    // min() clamps to 520px on desktop; on mobile leaves room for header + NavRow.
    height: "min(520px, calc(100vh - 220px))",
  },
  flipper: {
    position: "relative",
    width: "100%",
    height: "100%",   // fill the scene exactly
    transformStyle: "preserve-3d",
    transition: "transform 0.55s cubic-bezier(0.45,0.05,0.55,0.95)",
  },
  face: {
    position: "absolute",
    inset: 0,          // top/right/bottom/left all 0 — fills the flipper
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: radius.xl,
    border: "2px solid",
    padding: "22px 26px 18px",
    boxShadow: shadow.card,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    overflow: "hidden",
  },
  front: {},
  back: {
    transform: "rotateY(180deg)",
    background: gradients.brand,
    color: "#fff",
  },
  frontCenter: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 0",
    overflowY: "auto",
    minHeight: 0,
  },
  italianWord: {
    fontSize: 44,
    fontWeight: 800,
    color: colors.green900,
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 1.2,
    fontFamily: fonts.serif,
    letterSpacing: -0.5,
  },
  speakBtnLarge: {
    background: gradients.green,
    border: "none",
    borderRadius: radius.pill,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: shadow.btnGreen,
    transition: "transform 0.15s",
  },
  flipHint: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    color: colors.slate400,
    marginTop: 2,
  },
  backCenter: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 0",
    overflowY: "auto",
    minHeight: 0,
  },
  backSource: {
    fontSize: 24,
    fontWeight: 800,
    color: "rgba(255,255,255,0.45)",
    fontFamily: fonts.serif,
    textAlign: "center",
    marginBottom: 10,
  },
  divider: {
    width: 44,
    height: 2,
    background: "rgba(255,255,255,0.25)",
    borderRadius: 2,
    marginBottom: 14,
  },
  translationEn: {
    fontSize: 30,
    fontWeight: 800,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  translationAr: {
    fontSize: 32,
    fontWeight: 700,
    color: "rgba(255,255,255,0.88)",
    fontFamily: fonts.arabic,
    textAlign: "center",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  bookmarkBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    lineHeight: 0,
    flexShrink: 0,
  },
  speakBtnDisabled: {
    opacity: 0.35,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  speakBtnBack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: "rgba(255,255,255,0.18)",
    border: "1.5px solid rgba(255,255,255,0.35)",
    color: "#fff",
    borderRadius: radius.md,
    padding: "7px 16px",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    marginTop: 6,
    alignSelf: "center",
  },
};
