import type { Lang } from "../i18n/ui";

const MONTHS: Record<Lang, string[]> = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  kn: [
    "ಜನವರಿ",
    "ಫೆಬ್ರವರಿ",
    "ಮಾರ್ಚ್",
    "ಏಪ್ರಿಲ್",
    "ಮೇ",
    "ಜೂನ್",
    "ಜುಲೈ",
    "ಆಗಸ್ಟ್",
    "ಸೆಪ್ಟೆಂಬರ್",
    "ಅಕ್ಟೋಬರ್",
    "ನವೆಂಬರ್",
    "ಡಿಸೆಂಬರ್",
  ],
};

/** Format a `YYYY-MM` or `YYYY-MM-DD` string in the given locale. */
export function formatDate(value: string, lang: Lang): string {
  const [year, month, day] = value.split("-");
  const monthName = month ? MONTHS[lang][Number(month) - 1] : undefined;
  if (!monthName) return year;
  const monthYear = `${monthName} ${year}`;
  return day ? `${day} ${monthYear}` : monthYear;
}

/** Year only, for filtering. */
export function yearOf(value?: string): string | null {
  return value ? value.slice(0, 4) : null;
}

/** CSS `object-position` from a Payload focal point. */
export function objectPosition(focal?: { x: number; y: number }): string {
  return focal ? `${focal.x}% ${focal.y}%` : "50% 50%";
}
