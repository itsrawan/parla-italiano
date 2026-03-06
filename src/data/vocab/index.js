import { capitalize } from "../../utils/string.js";
import italianVocabRaw from "./italian.js";

/**
 * Exported VOCAB applies capitalisation at module load time (once).
 * - source words are capitalised unless category === "sentences"
 *   (sentences already carry their own natural casing)
 * - English translations are capitalised
 * - Arabic translations are left as-is (Arabic capitalisation doesn't apply)
 */
export const VOCAB = italianVocabRaw.map(w => ({
  ...w,
  source: w.category === "sentences" ? w.source : capitalize(w.source),
  translations: {
    ...w.translations,
    en: capitalize(w.translations.en),
  },
}));
