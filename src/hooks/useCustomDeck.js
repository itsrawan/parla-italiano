import { useState, useCallback } from "react";

const BOOKMARKS_KEY  = "parla_bookmarks";
const CUSTOM_KEY     = "parla_custom_cards";

function loadBookmarks() {
  try { return new Set(JSON.parse(localStorage.getItem(BOOKMARKS_KEY) ?? "[]")); }
  catch { return new Set(); }
}

function loadCustomCards() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) ?? "[]"); }
  catch { return []; }
}

/**
 * Manages the user's personal card collection:
 *  - bookmarkedIds  — Set of VOCAB card IDs the user has saved
 *  - customCards    — Array of user-created card objects
 * Both are persisted to localStorage.
 */
export function useCustomDeck() {
  const [bookmarkedIds, setBookmarkedIds] = useState(loadBookmarks);
  const [customCards,   setCustomCards]   = useState(loadCustomCards);

  const isBookmarked = useCallback(
    (id) => bookmarkedIds.has(id),
    [bookmarkedIds]
  );

  const toggleBookmark = useCallback((id) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const removeBookmark = useCallback((id) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const addCustomCard = useCallback((data) => {
    const card = { ...data, id: `custom_${Date.now()}`, isCustom: true };
    setCustomCards(prev => {
      const next = [...prev, card];
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeCustomCard = useCallback((id) => {
    setCustomCards(prev => {
      const next = prev.filter(c => c.id !== id);
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return {
    bookmarkedIds,
    customCards,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    addCustomCard,
    removeCustomCard,
    myDeckCount: bookmarkedIds.size + customCards.length,
  };
}
