import { useState } from "react";

import { SUPPORTED_UI_LANGUAGES } from "./data/config.js";
import { getStrings } from "./languages/index.js";
import { fonts } from "./styles/tokens.js";

import { useSpeech }      from "./hooks/useSpeech.js";
import { useDeck }        from "./hooks/useDeck.js";
import { useNavigation }  from "./hooks/useNavigation.js";
import { useCustomDeck }  from "./hooks/useCustomDeck.js";

import { SplashScreen }      from "./components/SplashScreen.jsx";
import { Header }            from "./components/Header.jsx";
import { FilterPanel }       from "./components/FilterPanel.jsx";
import { ProgressBar }       from "./components/ProgressBar.jsx";
import { FlashCard }         from "./components/FlashCard.jsx";
import { QuizCard }          from "./components/QuizCard.jsx";
import { NavRow }            from "./components/NavRow.jsx";
import { VoiceWarningModal } from "./components/VoiceWarningModal.jsx";
import { CustomDeckModal }   from "./components/CustomDeckModal.jsx";

/**
 * Root orchestrator — owns top-level state, wires hooks and components.
 * No UI rendering or business logic lives here directly.
 */
export default function App() {
  const [lang, setLang]               = useState(null);
  const [mode, setMode]               = useState("flashcard"); // "flashcard" | "quiz"
  const [flipped, setFlipped]         = useState(false);
  const [showFilter, setShowFilter]   = useState(false);
  const [myDeckOnly, setMyDeckOnly]   = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedCats,   setSelectedCats]   = useState([]);

  // ── Derived state ────────────────────────────────────────────
  const currentLangConfig = SUPPORTED_UI_LANGUAGES.find(l => l.code === lang);
  const isRTL = currentLangConfig?.rtl ?? false;
  const dir   = isRTL ? "rtl" : "ltr";
  const s     = getStrings(lang);            // UI string bundle

  // ── Custom hooks ─────────────────────────────────────────────
  const { speak, voiceMissing, dismissVoiceWarning } = useSpeech();

  const {
    bookmarkedIds, customCards, isBookmarked,
    toggleBookmark, removeBookmark, addCustomCard, removeCustomCard, myDeckCount,
  } = useCustomDeck();

  const {
    deck, baseFiltered, card, safeIndex,
    setCardIndex, isShuffled, toggleShuffle,
  } = useDeck(selectedLevels, selectedCats, myDeckOnly, bookmarkedIds, customCards);

  const { swipeDir, goNext, goPrev, onTouchStart, onTouchEnd } = useNavigation({
    safeIndex,
    deckLength: deck.length,
    mode,
    setCardIndex,
    setFlipped,
  });

  // ── Event handlers ───────────────────────────────────────────
  const handleToggleMode = () => {
    setMode(m => (m === "quiz" ? "flashcard" : "quiz"));
    setCardIndex(0);
    setFlipped(false);
  };

  const toggleLevel = (l) =>
    setSelectedLevels(prev =>
      prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]
    );

  const toggleCat = (c) =>
    setSelectedCats(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );

  const clearFilters = () => {
    setSelectedLevels([]);
    setSelectedCats([]);
  };

  // ── Splash (lang not selected yet) ───────────────────────────
  if (!lang) {
    return <SplashScreen onSelectLang={setLang} />;
  }

  return (
    <div
      style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: fonts.ui }}
      dir={dir}
    >
      <Header
        s={s}
        mode={mode}
        isShuffled={isShuffled}
        activeFilterCount={selectedLevels.length + selectedCats.length}
        myDeckOnly={myDeckOnly}
        myDeckCount={myDeckCount}
        onToggleMode={handleToggleMode}
        onToggleShuffle={toggleShuffle}
        onToggleFilter={() => setShowFilter(f => !f)}
        onToggleMyDeck={() => setMyDeckOnly(m => !m)}
        onOpenAddCard={() => setShowCustomModal(true)}
        onChangeLang={() => setLang(null)}
      />

      {showFilter && (
        <FilterPanel
          s={s}
          lang={lang}
          selectedLevels={selectedLevels}
          selectedCats={selectedCats}
          deckSize={deck.length}
          onToggleLevel={toggleLevel}
          onToggleCat={toggleCat}
          onClearAll={clearFilters}
        />
      )}

      <main className="app-container" style={styles.main}>
        {deck.length === 0 ? (
          <EmptyState s={s} onClear={clearFilters} />
        ) : (
          <div className="card-area" style={styles.cardArea}>
            <ProgressBar current={safeIndex} total={deck.length} />

            {mode === "quiz" ? (
              <QuizCard
                card={card}
                lang={lang}
                pool={baseFiltered}
                onNext={goNext}
                speak={speak}
                canSpeak={!voiceMissing}
                isBookmarked={isBookmarked(card?.id)}
                onToggleBookmark={() => toggleBookmark(card?.id)}
                s={s}
              />
            ) : (
              <>
                <FlashCard
                  card={card}
                  lang={lang}
                  flipped={flipped}
                  swipeDir={swipeDir}
                  speak={speak}
                  canSpeak={!voiceMissing}
                  isBookmarked={isBookmarked(card?.id)}
                  onToggleBookmark={() => toggleBookmark(card?.id)}
                  s={s}
                  onFlip={() => setFlipped(f => !f)}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                />
                <NavRow
                  s={s}
                  safeIndex={safeIndex}
                  deckLength={deck.length}
                  flipped={flipped}
                  onPrev={goPrev}
                  onFlip={() => setFlipped(f => !f)}
                  onNext={goNext}
                />
                <div style={styles.swipeHint}>{s.swipeHint}</div>
              </>
            )}
          </div>
        )}
      </main>

      {voiceMissing && <VoiceWarningModal onDismiss={dismissVoiceWarning} />}

      {showCustomModal && (
        <CustomDeckModal
          lang={lang}
          s={s}
          bookmarkedIds={bookmarkedIds}
          customCards={customCards}
          onRemoveBookmark={removeBookmark}
          onRemoveCustom={removeCustomCard}
          onAddCustom={addCustomCard}
          onClose={() => setShowCustomModal(false)}
        />
      )}
    </div>
  );
}

/** Shown when no cards match the current filters. */
function EmptyState({ s, onClear }) {
  return (
    <div style={styles.emptyState}>
      <div style={{ fontSize: 48 }}>🔍</div>
      <p>{s.noCards}</p>
      <button style={styles.clearBtn} onClick={onClear}>
        {s.clearFiltersShort}
      </button>
    </div>
  );
}

const styles = {
  main: {
    /* width/max-width/padding handled by .app-container in index.css */
    paddingTop: 22,
    paddingBottom: 44,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardArea: {
    /* max-width controlled by .card-area in index.css; this centres content */
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  swipeHint: {
    marginTop: 14,
    fontSize: 11,
    color: "#cbd5e1",
    textAlign: "center",
  },
  emptyState: {
    textAlign: "center",
    color: "#64748b",
    padding: "60px 20px",
    fontSize: 16,
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "#0ea5e9",
    fontSize: 12,
    cursor: "pointer",
    fontWeight: 600,
    padding: 0,
  },
};
