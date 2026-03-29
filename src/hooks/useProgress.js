import { useState, useEffect } from "react";

const STORAGE_KEY = "parla_progress";

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}; }
  catch { return {}; }
}

/**
 * Persists the user's session to localStorage so the app resumes
 * exactly where they left off after a page reload or browser restart.
 *
 * Saves: selected language, mode (flashcard/quiz), active level/category
 * filters, My Deck toggle, and the current card index.
 */
export function useProgress() {
  const [saved] = useState(load);   // read once at mount

  const [lang,           setLang]           = useState(saved.lang           ?? null);
  const [learningLang,   setLearningLang]   = useState(saved.learningLang   ?? "it");
  const [mode,           setMode]           = useState(saved.mode           ?? "flashcard");
  const [selectedLevels, setSelectedLevels] = useState(saved.selectedLevels ?? []);
  const [selectedCats,   setSelectedCats]   = useState(saved.selectedCats   ?? []);
  const [myDeckOnly,     setMyDeckOnly]     = useState(saved.myDeckOnly     ?? false);
  const [savedCardIndex, setSavedCardIndex] = useState(saved.cardIndex      ?? 0);

  // Write all state to localStorage whenever any piece changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      lang,
      learningLang,
      mode,
      selectedLevels,
      selectedCats,
      myDeckOnly,
      cardIndex: savedCardIndex,
    }));
  }, [lang, learningLang, mode, selectedLevels, selectedCats, myDeckOnly, savedCardIndex]);

  return {
    lang,           setLang,
    learningLang,   setLearningLang,
    mode,           setMode,
    selectedLevels, setSelectedLevels,
    selectedCats,   setSelectedCats,
    myDeckOnly,     setMyDeckOnly,
    savedCardIndex, setSavedCardIndex,
  };
}
