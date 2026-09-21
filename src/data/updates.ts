import type { Update } from "./types";

/**
 * A dated archive. Entries without a documented date carry a `period` label
 * instead of an invented date.
 */
export const updates: Update[] = [
  {
    date: "2023-07",
    program: "farmers",
    kind: "event",
    title: {
      en: "Farmer training on natural farming at Chirantana School, Kabbalu",
      kn: "ಚಿರಂತನ ಶಾಲೆ, ಕಬ್ಬಾಳಿನಲ್ಲಿ ನೈಸರ್ಗಿಕ ಕೃಷಿ ರೈತ ತರಬೇತಿ",
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
      en: "A meal sponsored for children at Sri Krishnashraya",
      kn: "ಶ್ರೀ ಕೃಷ್ಣಾಶ್ರಯದ ಮಕ್ಕಳಿಗೆ ಪ್ರಾಯೋಜಿಸಿದ ಊಟ",
    },
    location: { en: "Sri Krishnashraya", kn: "ಶ್ರೀ ಕೃಷ್ಣಾಶ್ರಯ" },
  },
  {
    program: "farmers",
    kind: "donation",
    period: { en: "Recorded initiative", kn: "ದಾಖಲಿತ ಉಪಕ್ರಮ" },
    title: {
      en: "Desi cow support for a woman farmer near Kabbalu",
      kn: "ಕಬ್ಬಾಳು ಸಮೀಪದ ಮಹಿಳಾ ರೈತರಿಗೆ ದೇಸಿ ಹಸು ಬೆಂಬಲ",
    },
    location: { en: "Kabbalu, Kanakapura", kn: "ಕಬ್ಬಾಳು, ಕನಕಪುರ" },
  },
  {
    program: "education",
    kind: "milestone",
    period: { en: "Recurring", kn: "ಮರುಕಳಿಸುವ" },
    title: {
      en: "Scholarships and school fees paid for Bhoomi Seva students",
      kn: "ಭೂಮಿ ಸೇವಾ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಶಾಲಾ ಶುಲ್ಕ",
    },
    location: { en: "Karnataka", kn: "ಕರ್ನಾಟಕ" },
  },
];
