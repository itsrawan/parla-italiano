// ── Language registry ─────────────────────────────────────────
export const LANGUAGES = {
  it: { code: "it", name: "Italian",  nativeName: "Italiano",  speechLang: "it-IT", rtl: false, flag: "🇮🇹", script: "latin"  },
  en: { code: "en", name: "English",  nativeName: "English",   speechLang: "en-US", rtl: false, flag: "🇬🇧", script: "latin"  },
  ar: { code: "ar", name: "Arabic",   nativeName: "العربية",   speechLang: "ar-JO", rtl: true,  flag: "🇯🇴", script: "arabic" },
};

// Languages that have a src/languages/ui-XX.js file
export const UI_LANGUAGES = ["en", "ar", "it"];

// Languages that have a vocab deck (can be learned)
export const LEARNING_LANGUAGES = ["it", "en", "ar"];

// ── CEFR Levels ───────────────────────────────────────────────
export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const LEVEL_COLORS = {
  A1: "#22c55e", A2: "#84cc16", B1: "#f59e0b",
  B2: "#f97316", C1: "#ef4444", C2: "#a855f7",
};

export const LEVEL_BG = {
  A1: "var(--lvl-a1-bg)", A2: "var(--lvl-a2-bg)", B1: "var(--lvl-b1-bg)",
  B2: "var(--lvl-b2-bg)", C1: "var(--lvl-c1-bg)", C2: "var(--lvl-c2-bg)",
};

export const LEVEL_BORDER = {
  A1: "var(--lvl-a1-bd)", A2: "var(--lvl-a2-bd)", B1: "var(--lvl-b1-bd)",
  B2: "var(--lvl-b2-bd)", C1: "var(--lvl-c1-bd)", C2: "var(--lvl-c2-bd)",
};

// ── Categories ────────────────────────────────────────────────
// label keys must match SUPPORTED_UI_LANGUAGES codes
export const CATEGORIES = [
  { id: "colors",     label: { en: "Colors",           ar: "الألوان"          }, emoji: "🎨" },
  { id: "numbers",    label: { en: "Numbers",          ar: "الأرقام"          }, emoji: "🔢" },
  { id: "food",       label: { en: "Food & Eat",       ar: "الطعام"           }, emoji: "🍝" },
  { id: "shopping",   label: { en: "Shopping",         ar: "التسوق"           }, emoji: "🛒" },
  { id: "greetings",  label: { en: "Greetings",        ar: "التحيات"          }, emoji: "👋" },
  { id: "family",     label: { en: "Family",           ar: "العائلة"          }, emoji: "👨‍👩‍👧" },
  { id: "body",       label: { en: "Body",             ar: "الجسم"            }, emoji: "🫀" },
  { id: "house",      label: { en: "House",            ar: "المنزل"           }, emoji: "🏠" },
  { id: "transport",  label: { en: "Transport",        ar: "المواصلات"        }, emoji: "🚗" },
  { id: "weather",    label: { en: "Weather",          ar: "الطقس"            }, emoji: "🌤️" },
  { id: "time",       label: { en: "Time",             ar: "الوقت"            }, emoji: "⏰" },
  { id: "verbs",      label: { en: "Verbs",            ar: "الأفعال"          }, emoji: "⚡" },
  { id: "sentences",  label: { en: "Sentences",        ar: "الجمل"            }, emoji: "💬" },
  { id: "adjectives", label: { en: "Adjectives",       ar: "الصفات"           }, emoji: "✨" },
  { id: "work",       label: { en: "Work",             ar: "العمل"            }, emoji: "💼" },
  { id: "health",     label: { en: "Health",           ar: "الصحة"            }, emoji: "🏥" },
  { id: "education",  label: { en: "Education",        ar: "التعليم"          }, emoji: "📚" },
  { id: "nature",     label: { en: "Nature",           ar: "الطبيعة"          }, emoji: "🌿" },
  { id: "general",    label: { en: "General",          ar: "عام"              }, emoji: "🌍" },
  { id: "places",     label: { en: "Places",           ar: "الأماكن"          }, emoji: "🏛️" },
  { id: "technology", label: { en: "Technology",       ar: "التكنولوجيا"      }, emoji: "💻" },
  { id: "sports",     label: { en: "Sports & Leisure", ar: "الرياضة والترفيه" }, emoji: "⚽" },
  { id: "clothing",   label: { en: "Clothing",         ar: "الملابس"          }, emoji: "👕" },
  { id: "emotions",   label: { en: "Emotions",         ar: "المشاعر"          }, emoji: "❤️" },
];

// O(1) lookup — use CATEGORY_MAP[id] instead of CATEGORIES.find() in render
export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));
