// ── Source Language (the language being learned) ────────────
export const SOURCE_LANGUAGE = {
  code: "it",
  speechLang: "it-IT",
  name: "Italian",
  label: { en: "Italian", ar: "الإيطالية" },
};

// ── UI Languages (the learner's native language) ─────────────
// To add a new UI language: add an entry here and create src/languages/ui-XX.js
export const SUPPORTED_UI_LANGUAGES = [
  { code: "en", label: "English",  flag: "🇬🇧", rtl: false },
  { code: "ar", label: "العربية",  flag: "🇯🇴", rtl: true  },
];

// ── CEFR Levels ───────────────────────────────────────────────
export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const LEVEL_COLORS = {
  A1: "#22c55e", A2: "#84cc16", B1: "#f59e0b",
  B2: "#f97316", C1: "#ef4444", C2: "#a855f7",
};

export const LEVEL_BG = {
  A1: "#dcfce7", A2: "#ecfccb", B1: "#fef3c7",
  B2: "#ffedd5", C1: "#fee2e2", C2: "#f3e8ff",
};

export const LEVEL_BORDER = {
  A1: "#86efac", A2: "#bef264", B1: "#fcd34d",
  B2: "#fdba74", C1: "#fca5a5", C2: "#d8b4fe",
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
