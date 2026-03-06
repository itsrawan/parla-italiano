import { useCallback, useEffect, useState } from "react";
import { SOURCE_LANGUAGE } from "../data/config.js";

const DISMISSED_KEY = "parla_voice_warning_dismissed";

/**
 * Finds the best voice for the given BCP-47 language tag.
 * Priority: exact match → prefix match (e.g. "it") → null.
 * Called fresh at speak-time because Chrome loads voices in two batches.
 */
function findVoice(speechLang) {
  const voices     = window.speechSynthesis.getVoices();
  const langPrefix = speechLang.slice(0, 2).toLowerCase();
  return (
    voices.find(v => v.lang === speechLang) ||
    voices.find(v => v.lang.toLowerCase().startsWith(langPrefix)) ||
    null
  );
}

/**
 * Returns `{ speak, voiceMissing }`.
 *
 * - `speak(text)`      — pronounces text in the source language.
 * - `voiceMissing`     — true when no Italian TTS voice is installed.
 *                        Used to show the installation warning popup.
 *
 * Voice detection waits 2 s after voices first load to let Chrome finish
 * delivering its second (Google network) voice batch before declaring them missing.
 */
export function useSpeech() {
  const { speechLang }  = SOURCE_LANGUAGE;
  const [voiceMissing, setVoiceMissing] = useState(false);

  useEffect(() => {
    if (!window.speechSynthesis) return;
    // Already dismissed by user in a previous session
    if (localStorage.getItem(DISMISSED_KEY)) return;

    const check = () => {
      // Wait 2 s so Chrome's second voice batch (Google voices) can arrive.
      setTimeout(() => {
        if (!findVoice(speechLang)) setVoiceMissing(true);
      }, 2000);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      check();
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", check, { once: true });
    }
  }, [speechLang]);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const doSpeak = () => {
      const utt  = new SpeechSynthesisUtterance(text);
      utt.lang   = speechLang;
      utt.rate   = 0.82;
      utt.pitch  = 1.0;
      const voice = findVoice(speechLang);
      if (voice) utt.voice = voice;
      window.speechSynthesis.speak(utt);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak();
    } else {
      const onReady = () => {
        window.speechSynthesis.removeEventListener("voiceschanged", onReady);
        doSpeak();
      };
      window.speechSynthesis.addEventListener("voiceschanged", onReady);
    }
  }, [speechLang]);

  const dismissVoiceWarning = useCallback(() => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVoiceMissing(false);
  }, []);

  return { speak, voiceMissing, dismissVoiceWarning };
}
