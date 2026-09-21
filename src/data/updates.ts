import type { Update } from "./types";

/**
 * Dated events from the existing site. Entries without a documented date carry
 * a `period` label instead of an invented date.
 */
export const updates: Update[] = [
  {
    date: "2023-07",
    program: "farmers",
    kind: "event",
    title: {
      en: "Farmers' training in natural and organic farming",
      kn: "ನೈಸರ್ಗಿಕ ಮತ್ತು ಸಾವಯವ ಕೃಷಿಯಲ್ಲಿ ರೈತರ ತರಬೇತಿ",
    },
    location: {
      en: "Chirantana School, Kabbalu, Kanakapura",
      kn: "ಚಿರಂತನ ಶಾಲೆ, ಕಬ್ಬಾಳು, ಕನಕಪುರ",
    },
  },
  {
    program: "children",
    kind: "donation",
    period: { en: "Balipadyami", kn: "ಬಲಿಪಾಡ್ಯಮಿ" },
    title: {
      en: "Meal sponsored at Sri Krishnashraya orphanage",
      kn: "ಶ್ರೀ ಕೃಷ್ಣಾಶ್ರಯ ಅನಾಥಾಶ್ರಮದಲ್ಲಿ ಪ್ರಾಯೋಜಿಸಿದ ಊಟ",
    },
    location: { en: "Sri Krishnashraya", kn: "ಶ್ರೀ ಕೃಷ್ಣಾಶ್ರಯ" },
  },
  {
    program: "farmers",
    kind: "donation",
    period: { en: "Recorded event", kn: "ದಾಖಲಿತ ಕಾರ್ಯಕ್ರಮ" },
    title: {
      en: "Cow donation to a woman farmer, Sunitha from Kabbalu",
      kn: "ಕಬ್ಬಾಳಿನ ಮಹಿಳಾ ರೈತೆ ಸುನೀತಾ ಅವರಿಗೆ ಹಸು ದಾನ",
    },
    location: { en: "Kabbalu, Kanakapura", kn: "ಕಬ್ಬಾಳು, ಕನಕಪುರ" },
  },
  {
    program: "education",
    kind: "milestone",
    period: { en: "Every year", kn: "ಪ್ರತಿ ವರ್ಷ" },
    title: {
      en: "Scholarship and school-fee payment for Bhoomi Seva students",
      kn: "ಭೂಮಿ ಸೇವಾ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಶಾಲಾ ಶುಲ್ಕ ಪಾವತಿ",
    },
    location: { en: "Karnataka", kn: "ಕರ್ನಾಟಕ" },
  },
];
