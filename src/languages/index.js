import en from "./ui-en.js";
import ar from "./ui-ar.js";
import it from "./ui-it.js";

/**
 * Map of language code → UI string object.
 * To add a new UI language: import its file here and add it to this map.
 */
export const uiStrings = { en, ar, it };

/** Returns the string bundle for the given language code, falling back to English. */
export function getStrings(langCode) {
  return uiStrings[langCode] ?? uiStrings.en;
}
