import { useState, useMemo, useEffect } from "react";
import { shuffle } from "../utils/string.js";
import { VOCAB } from "../data/vocab/index.js";

/**
 * Manages the active deck of vocabulary cards.
 *
 * Responsibilities:
 *  - Filter VOCAB by selected levels and categories (memoised)
 *  - Toggle shuffle on/off (Fisher-Yates)
 *  - Track and bound the current card index
 *  - Reset to card 0 whenever filters change
 */
export function useDeck(selectedLevels, selectedCats) {
  const baseFiltered = useMemo(
    () =>
      VOCAB.filter(
        w =>
          (selectedLevels.length === 0 || selectedLevels.includes(w.level)) &&
          (selectedCats.length  === 0 || selectedCats.includes(w.category))
      ),
    [selectedLevels, selectedCats]
  );

  const [shuffledDeck, setShuffledDeck] = useState(null);
  const [cardIndex, setCardIndex]       = useState(0);

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
