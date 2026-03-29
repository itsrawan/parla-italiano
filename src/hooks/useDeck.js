import { useState, useMemo, useEffect } from "react";
import { shuffle } from "../utils/string.js";
import { getVocab } from "../data/vocab/index.js";

/**
 * Manages the active deck of vocabulary cards.
 *
 * Responsibilities:
 *  - Filter vocab by selected levels and categories (memoised)
 *  - Toggle shuffle on/off (Fisher-Yates)
 *  - Track and bound the current card index
 *  - Reset to card 0 whenever filters change
 */
export function useDeck(
  selectedLevels,
  selectedCats,
  myDeckOnly     = false,
  bookmarkedIds  = new Set(),
  customCards    = [],
  initialCardIndex = 0,
  learningLang   = "it",
  nativeLang     = "en",
) {
  const baseFiltered = useMemo(() => {
    const pool = myDeckOnly
      ? [...getVocab(learningLang, nativeLang).filter(w => bookmarkedIds.has(w.id)), ...customCards]
      : getVocab(learningLang, nativeLang);
    return pool.filter(
      w =>
        (selectedLevels.length === 0 || selectedLevels.includes(w.level)) &&
        (selectedCats.length   === 0 || selectedCats.includes(w.category))
    );
  }, [selectedLevels, selectedCats, myDeckOnly, bookmarkedIds, customCards, learningLang, nativeLang]);

  const [shuffledDeck, setShuffledDeck] = useState(null);
  const [cardIndex, setCardIndex]       = useState(initialCardIndex);

  // Reset to top whenever the filtered set changes
  useEffect(() => {
    setShuffledDeck(null);
    setCardIndex(0);
  }, [baseFiltered]);

  const deck      = shuffledDeck ?? baseFiltered;
  const safeIndex = deck.length > 0 ? Math.min(cardIndex, deck.length - 1) : 0;
  const card      = deck[safeIndex] ?? null;

  const toggleShuffle = () => {
    setShuffledDeck(prev => (prev ? null : shuffle(baseFiltered)));
    setCardIndex(0);
  };

  return {
    deck,
    baseFiltered,
    card,
    safeIndex,
    setCardIndex,
    isShuffled: shuffledDeck !== null,
    toggleShuffle,
  };
}
