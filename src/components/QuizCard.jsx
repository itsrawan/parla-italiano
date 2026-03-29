import { useState, useEffect, useCallback } from "react";
import { LEVEL_BG, LEVEL_BORDER, LEVEL_COLORS, CATEGORY_MAP, LANGUAGES } from "../data/config.js";
import { colors, gradients, fonts, radius, shadow } from "../styles/tokens.js";
import { shuffle } from "../utils/string.js";
import { SpeakerIcon } from "./SpeakerIcon.jsx";

/**
 * Multiple-choice quiz card.
 *
 * Given the current card, it builds 4 options (1 correct + 3 distractors)
 * using the active filtered deck as the distractor pool.
 *
 * The correct-answer key is driven by card.translations[lang], so it works
 * with any translation language without code changes.
 */
export function QuizCard({ card, lang, pool, onNext, speak, canSpeak, isBookmarked, onToggleBookmark, s, learningLang }) {
  const [state, setState] = useState(null);
  const frontDir = LANGUAGES[learningLang]?.rtl ? "rtl" : "ltr";

  const buildOptions = useCallback(() => {
    if (!card || pool.length < 4) return;

    const correct = card.translations[lang] ?? card.translations.en;
    const distractors = shuffle(
      pool.filter(w => (w.translations[lang] ?? w.translations.en) !== correct)
    )
      .slice(0, 3)
      .map(w => w.translations[lang] ?? w.translations.en);

    setState({
      options:  shuffle([correct, ...distractors]),
      correct,
      chosen:   null,
      answered: false,
    });
  }, [card?.id, lang, pool.length]);

  useEffect(() => { buildOptions(); }, [buildOptions]);

  if (!state) return null;

  const choose = (opt) => {
    if (state.answered) return;
    setState(s => ({ ...s, chosen: opt, answered: true }));
  };

  const isCorrect = state.chosen === state.correct;
  const levelColor  = LEVEL_COLORS[card.level]  ?? colors.brandGreen;
  const levelBg     = LEVEL_BG[card.level]      ?? colors.slate50;
  const levelBorder = LEVEL_BORDER[card.level]  ?? colors.slate200;
  const cat         = CATEGORY_MAP[card.category];

  return (
    <div style={styles.wrap}>
      {/* Question */}
      <div style={{ ...styles.questionCard, background: levelBg, borderColor: levelBorder }}>
        <div style={styles.meta}>
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            <span style={{ ...styles.levelBadge, background: levelColor }}>{card.level}</span>
            <span style={styles.catBadge}>
              {cat?.emoji} {cat?.label[lang] ?? cat?.label.en}
            </span>
          </div>
          {!card.isCustom && (
            <button
              style={{ ...styles.bookmarkBtn, color: isBookmarked ? "#ef4444" : "#fca5a5" }}
              onClick={onToggleBookmark}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          )}
        </div>

        <div style={{ ...styles.sourceWord, direction: frontDir, fontFamily: learningLang === "ar" ? fonts.arabic : fonts.serif }}>{card.translations[learningLang]}</div>

        <button
          disabled={!canSpeak}
          style={{ ...styles.speakBtn, ...(!canSpeak && styles.speakBtnDisabled) }}
          onClick={() => speak(card.translations[learningLang])}
        >
          <SpeakerIcon size={16} />
          {s.listen}
        </button>

        <div style={styles.subtitle}>{s.whatDoesThisMean}</div>
      </div>

      {/* Options grid */}
      <div style={styles.grid}>
        {state.options.map((opt, i) => {
          let bg     = "#fff";
          let border = colors.slate200;
          let color  = colors.brandNavy;

          if (state.answered) {
            if (opt === state.correct) {
              bg = colors.green50; border = colors.brandGreen; color = colors.green800;
            } else if (opt === state.chosen) {
              bg = colors.red50;   border = "#ef4444";         color = colors.red900;
            }
          }

          return (
            <button
              key={i}
              onClick={() => choose(opt)}
              style={{
                ...styles.optionBtn,
                background:  bg,
                borderColor: border,
                color,
                fontFamily: lang === "ar" ? fonts.arabic : "inherit",
                direction:  lang === "ar" ? "rtl" : "ltr",
                cursor:     state.answered ? "default" : "pointer",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {state.answered && (
        <div style={styles.feedback}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>{isCorrect ? "🎉" : "❌"}</div>
          <div style={{ fontWeight: 700, color: isCorrect ? colors.green800 : colors.red900, marginBottom: 4 }}>
            {isCorrect ? s.correct : s.notQuite}
          </div>
          {!isCorrect && (
            <div style={{ fontSize: 14, color: colors.slate600, marginBottom: 8, direction: lang === "ar" ? "rtl" : "ltr" }}>
              {s.answer} <strong style={{ fontFamily: lang === "ar" ? fonts.arabic : "inherit" }}>{state.correct}</strong>
            </div>
          )}
          <button style={styles.nextBtn} onClick={onNext}>
            {s.nextCard}
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: { width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: 14 },

  questionCard: {
    borderRadius: radius.xl,
    border: "2px solid",
    padding: "22px 26px 18px",
    boxShadow: shadow.card,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  meta:       { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, alignSelf: "stretch" },
  bookmarkBtn: { background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 0, flexShrink: 0 },
  levelBadge: { borderRadius: 7, padding: "3px 9px", fontSize: 11, fontWeight: 800, color: "#fff" },
  catBadge:   { fontSize: 12, color: colors.slate500, fontWeight: 500 },

  sourceWord: {
    fontSize: 42,
    fontWeight: 800,
    color: colors.green900,
    fontFamily: fonts.serif,
    textAlign: "center",
    margin: "8px 0 12px",
  },
  speakBtnDisabled: {
    opacity: 0.35,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  speakBtn: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    background: gradients.green,
    border: "none",
    borderRadius: radius.sm,
    padding: "6px 14px",
    color: "#fff",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
  },
  subtitle: { fontSize: 13, color: colors.slate400, marginTop: 6 },

  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  optionBtn: {
    padding: "14px 10px",
    borderRadius: radius.md,
    border: "2px solid",
    fontSize: 15,
    fontWeight: 700,
    transition: "all 0.15s",
    textAlign: "center",
    lineHeight: 1.3,
    minHeight: 56,
  },

  feedback: {
    textAlign: "center",
    background: "#fff",
    borderRadius: radius.lg,
    padding: "20px",
    boxShadow: shadow.quiz,
  },
  nextBtn: {
    background: gradients.green,
    color: "#fff",
    border: "none",
    borderRadius: radius.md,
    padding: "10px 28px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 4,
  },
};
