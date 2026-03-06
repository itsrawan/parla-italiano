import { useState } from "react";
import { LEVELS, CATEGORIES, LEVEL_COLORS, CATEGORY_MAP } from "../data/config.js";
import { VOCAB } from "../data/vocab/index.js";
import { colors, gradients, radius, shadow } from "../styles/tokens.js";

/**
 * Modal for managing a user's personal card collection.
 *
 * Two tabs:
 *  "My Cards"  — list of bookmarked vocab + custom cards, with remove buttons
 *  "Add Card"  — form to create a new custom word / sentence
 */
export function CustomDeckModal({
  lang,
  s,
  bookmarkedIds,
  customCards,
  onRemoveBookmark,
  onRemoveCustom,
  onAddCustom,
  onClose,
}) {
  const [tab, setTab] = useState("manage");
  const [form, setForm] = useState({
    source: "",
    en:     "",
    ar:     "",
    level:  "A1",
    category: CATEGORIES[0].id,
  });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const bookmarkedCards = VOCAB.filter(w => bookmarkedIds.has(w.id));
  const totalCount = bookmarkedCards.length + customCards.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.source.trim()) errs.source = true;
    if (!form.en.trim())     errs.en     = true;
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    onAddCustom({
      source:       form.source.trim(),
      translations: { en: form.en.trim(), ar: form.ar.trim() || form.en.trim() },
      level:        form.level,
      category:     form.category,
    });

    setForm({ source: "", en: "", ar: "", level: "A1", category: CATEGORIES[0].id });
    setErrors({});
    setSaved(true);
    setTimeout(() => { setSaved(false); setTab("manage"); }, 900);
  };

  return (
    <div style={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={styles.modal} role="dialog" aria-modal="true">

        {/* Header */}
        <div style={styles.header}>
          <span style={styles.headerTitle}>♥ {s.myDeck}</span>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(tab === "manage" && styles.tabActive) }}
            onClick={() => setTab("manage")}
          >
            {s.myCards}{totalCount > 0 ? ` (${totalCount})` : ""}
          </button>
          <button
            style={{ ...styles.tab, ...(tab === "add" && styles.tabActive) }}
            onClick={() => setTab("add")}
          >
            + {s.addCard}
          </button>
        </div>

        {/* ── My Cards tab ── */}
        {tab === "manage" && (
          <div style={styles.scrollArea}>
            {totalCount === 0 ? (
              <div style={styles.empty}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>📚</div>
                <p style={styles.emptyText}>{s.myDeckEmpty}</p>
                <p style={styles.emptyHint}>{s.myDeckEmptyHint}</p>
              </div>
            ) : (
              <div style={styles.list}>
                {bookmarkedCards.map(card => (
                  <CardRow
                    key={card.id}
                    card={card}
                    lang={lang}
                    badgeLabel={s.bookmarkedCards}
                    badgeColor="#ef4444"
                    onRemove={() => onRemoveBookmark(card.id)}
                    removeLabel={s.removeCard}
                  />
                ))}
                {customCards.map(card => (
                  <CardRow
                    key={card.id}
                    card={card}
                    lang={lang}
                    badgeLabel={s.customCards}
                    badgeColor={colors.brandTeal}
                    onRemove={() => onRemoveCustom(card.id)}
                    removeLabel={s.removeCard}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Add Card tab ── */}
        {tab === "add" && (
          <form style={styles.form} onSubmit={handleSubmit}>

            <label style={styles.label}>{s.italianWord} *</label>
            <input
              dir="ltr"
              style={{ ...styles.input, ...(errors.source && styles.inputError) }}
              value={form.source}
              onChange={e => { setForm(f => ({ ...f, source: e.target.value })); setErrors(v => ({ ...v, source: false })); }}
              placeholder="e.g. buongiorno"
            />

            <label style={styles.label}>{s.englishTranslation} *</label>
            <input
              dir="ltr"
              style={{ ...styles.input, ...(errors.en && styles.inputError) }}
              value={form.en}
              onChange={e => { setForm(f => ({ ...f, en: e.target.value })); setErrors(v => ({ ...v, en: false })); }}
              placeholder="e.g. good morning"
            />

            <label style={styles.label}>{s.arabicTranslation} {s.optional}</label>
            <input
              style={styles.input}
              value={form.ar}
              onChange={e => setForm(f => ({ ...f, ar: e.target.value }))}
              placeholder="e.g. صباح الخير"
              dir="rtl"
            />

            <div style={styles.row2}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>{s.selectLevel}</label>
                <select
                  style={styles.select}
                  value={form.level}
                  onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
                >
                  {LEVELS.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 2 }}>
                <label style={styles.label}>{s.selectCategory}</label>
                <select
                  style={styles.select}
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.emoji} {c.label[lang] ?? c.label.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.btnRow}>
              <button type="button" style={styles.cancelBtn} onClick={onClose}>
                {s.cancel}
              </button>
              <button type="submit" style={{ ...styles.saveBtn, ...(saved && styles.saveBtnDone) }}>
                {saved ? "✓" : s.saveCard}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function CardRow({ card, lang, badgeLabel, badgeColor, onRemove, removeLabel }) {
  const cat = CATEGORY_MAP[card.category];
  const levelColor = LEVEL_COLORS[card.level] ?? colors.slate400;
  return (
    <div style={rowStyles.row}>
      <div style={rowStyles.left}>
        <span style={{ ...rowStyles.levelDot, background: levelColor }} />
        <div style={rowStyles.text}>
          <span style={{ ...rowStyles.source, direction: "ltr" }}>{card.source}</span>
          <span style={{ ...rowStyles.trans, direction: lang === "ar" ? "rtl" : "ltr" }}>
            {card.translations[lang] ?? card.translations.en}
          </span>
        </div>
        <span style={{ ...rowStyles.typeBadge, background: badgeColor }}>{badgeLabel}</span>
      </div>
      <button style={rowStyles.removeBtn} onClick={onRemove}>{removeLabel}</button>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, padding: 16,
  },
  modal: {
    background: "#fff",
    borderRadius: radius.xxl,
    width: "100%", maxWidth: 480,
    boxShadow: shadow.splash,
    display: "flex", flexDirection: "column",
    maxHeight: "88vh",
    overflow: "hidden",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 24px 0",
  },
  headerTitle: {
    fontSize: 18, fontWeight: 800, color: colors.brandNavy,
  },
  closeBtn: {
    background: "none", border: "none", fontSize: 18,
    color: colors.slate400, cursor: "pointer", padding: 4,
    lineHeight: 1,
  },
  tabs: {
    display: "flex", gap: 0,
    padding: "12px 24px 0",
    borderBottom: `1px solid ${colors.slate200}`,
  },
  tab: {
    flex: 1, padding: "8px 0 10px",
    background: "none", border: "none",
    fontSize: 13, fontWeight: 600, cursor: "pointer",
    color: colors.slate400, borderBottom: "2px solid transparent",
    transition: "all 0.15s",
  },
  tabActive: {
    color: colors.brandNavy,
    borderBottom: `2px solid ${colors.brandNavy}`,
  },
  scrollArea: {
    overflowY: "auto", flex: 1,
    padding: "12px 0",
  },
  list: {
    display: "flex", flexDirection: "column",
  },
  empty: {
    textAlign: "center", padding: "40px 24px",
  },
  emptyText:  { fontSize: 15, color: colors.slate600, margin: "0 0 6px" },
  emptyHint:  { fontSize: 12, color: colors.slate400, margin: 0 },

  form: {
    padding: "16px 24px 20px",
    display: "flex", flexDirection: "column", gap: 4,
    overflowY: "auto",
  },
  label: {
    fontSize: 11, fontWeight: 700, color: colors.slate500,
    textTransform: "uppercase", letterSpacing: 0.4,
    marginTop: 8, marginBottom: 4, display: "block",
  },
  input: {
    width: "100%", padding: "9px 12px",
    border: `1.5px solid ${colors.slate200}`,
    borderRadius: radius.sm,
    fontSize: 14, color: colors.brandNavy,
    outline: "none", boxSizing: "border-box",
    fontFamily: "inherit",
  },
  inputError: { borderColor: "#ef4444" },
  select: {
    width: "100%", padding: "9px 12px",
    border: `1.5px solid ${colors.slate200}`,
    borderRadius: radius.sm,
    fontSize: 13, color: colors.brandNavy,
    background: "#fff", cursor: "pointer",
    fontFamily: "inherit",
  },
  row2: {
    display: "flex", gap: 12, marginTop: 4,
  },
  btnRow: {
    display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16,
  },
  cancelBtn: {
    padding: "9px 18px", borderRadius: radius.md,
    border: `1.5px solid ${colors.slate200}`,
    background: "#fff", color: colors.slate500,
    fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  saveBtn: {
    padding: "9px 22px", borderRadius: radius.md,
    border: "none",
    background: gradients.green,
    color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
    transition: "opacity 0.2s",
    minWidth: 100, textAlign: "center",
  },
  saveBtnDone: { opacity: 0.7 },
};

const rowStyles = {
  row: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 24px",
    borderBottom: `1px solid ${colors.slate100}`,
    gap: 10,
  },
  left: {
    display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0,
  },
  levelDot: {
    width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
  },
  text: {
    display: "flex", flexDirection: "column", minWidth: 0,
  },
  source: {
    fontSize: 14, fontWeight: 700, color: colors.brandNavy,
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  },
  trans: {
    fontSize: 12, color: colors.slate500,
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  },
  typeBadge: {
    fontSize: 10, fontWeight: 700, color: "#fff",
    padding: "2px 7px", borderRadius: 10, flexShrink: 0,
  },
  removeBtn: {
    background: "none", border: `1px solid ${colors.slate200}`,
    borderRadius: radius.sm, padding: "4px 10px",
    fontSize: 12, color: colors.slate500, cursor: "pointer",
    flexShrink: 0, fontWeight: 600,
  },
};
