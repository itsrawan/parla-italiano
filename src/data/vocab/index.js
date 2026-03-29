import { capitalize } from "../../utils/string.js";
import italianVocabRaw from "./italian.js";

/**
 * Process raw cards: add `it` to translations (from `source`), apply capitalisation.
 * The result is a language-agnostic card: { id, level, category, translations: { it, en, ar } }
 */
function processCard(card) {
  const itText = card.category === "sentences" ? card.source : capitalize(card.source);
  return {
    id:       card.id,
    level:    card.level,
    category: card.category,
    translations: {
      it: itText,
      en: capitalize(card.translations.en),
      ar: card.translations.ar,
    },
  };
}

// Single master deck — reused for all learning directions
export const VOCAB = italianVocabRaw.map(processCard);

/**
 * Returns the master vocab, filtered to cards that have translations
 * in both the learning language and the native language.
 */
export function getVocab(learningLang = "it", nativeLang = "en") {
  if (learningLang === nativeLang) return [];
  return VOCAB.filter(
    c => c.translations[learningLang] && c.translations[nativeLang]
  );
}
