import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Handles all card navigation: button clicks, swipe gestures, keyboard shortcuts.
 *
 * @param {object} params
 * @param {number}   params.safeIndex   - current bounded card index
 * @param {number}   params.deckLength  - total cards in active deck
 * @param {string}   params.mode        - "flashcard" | "quiz"
 * @param {Function} params.setCardIndex
 * @param {Function} params.setFlipped
 */
export function useNavigation({ safeIndex, deckLength, mode, setCardIndex, setFlipped }) {
  const [swipeDir, setSwipeDir] = useState(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const goNext = useCallback(() => {
    if (safeIndex >= deckLength - 1) return;
    setFlipped(false);
    setSwipeDir("left");
    setTimeout(() => {
      setCardIndex(i => i + 1);
      setSwipeDir(null);
    }, 220);
  }, [safeIndex, deckLength, setCardIndex, setFlipped]);

  const goPrev = useCallback(() => {
    if (safeIndex <= 0) return;
    setFlipped(false);
    setSwipeDir("right");
    setTimeout(() => {
      setCardIndex(i => i - 1);
      setSwipeDir(null);
    }, 220);
  }, [safeIndex, setCardIndex, setFlipped]);

  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 50 && dy < 60) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  }, [goNext, goPrev]);

  // Keyboard shortcuts (flashcard mode only)
  useEffect(() => {
    if (mode !== "flashcard") return;
    const handler = (e) => {
      if (e.key === "ArrowRight")              goNext();
      else if (e.key === "ArrowLeft")          goPrev();
      else if (e.key === " " || e.key === "Enter") setFlipped(f => !f);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, mode, setFlipped]);

  return { swipeDir, goNext, goPrev, onTouchStart, onTouchEnd };
}
