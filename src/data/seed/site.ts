import type { Localized } from "../../i18n/utils";
import type { Site } from "../types";

export const site: Site = {
  name: "Bhoomi Seva",
  email: "bhoomiseva.org@gmail.com",
  phone: "+91 9900103178",
  phoneHref: "+919900103178",
  whatsapp: "https://wa.me/919900103178",
  // TODO(verify before launch): confirm social URLs are current.
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    whatsappGroup: "https://chat.whatsapp.com/",
  },
  // TODO(verify before launch): confirm these payment details are still current
  // and do not publish stale UPI/QR information.
  payment: {
    upi: "9900103178@ybl",
    paytm: "+91 9900103178",
    gpay: "+91 9900103178",
    verified: false,
  },
  // Exact wording from the existing site, with grammar tidied only.
  mission: {
    en: "Bhoomi Seva's mission is to reach out and help people in need in various ways, especially the rural population, and to rejuvenate our environment within our capacity.",
    kn: "ಅಗತ್ಯವಿರುವವರಿಗೆ, ವಿಶೇಷವಾಗಿ ಗ್ರಾಮೀಣ ಜನರಿಗೆ, ಹಲವು ರೀತಿಯಲ್ಲಿ ನೆರವು ನೀಡುವುದು ಮತ್ತು ನಮ್ಮ ಶಕ್ತಿಯ ಮೇರೆಗೆ ಪರಿಸರವನ್ನು ಪುನಶ್ಚೇತನಗೊಳಿಸುವುದು ಭೂಮಿ ಸೇವಾದ ಧ್ಯೇಯ.",
  } satisfies Localized,
  vision: {
    en: "To uplift the rural population and improve the fertility of soil by encouraging farmers to take up agroforestry and/or natural farming, in the Kanakapura area to start with.",
    kn: "ರೈತರು ಕೃಷಿ ಅರಣ್ಯ ಮತ್ತು/ಅಥವಾ ನೈಸರ್ಗಿಕ ಕೃಷಿಯನ್ನು ಅಳವಡಿಸಿಕೊಳ್ಳುವಂತೆ ಪ್ರೋತ್ಸಾಹಿಸುವ ಮೂಲಕ ಗ್ರಾಮೀಣ ಜನರ ಉನ್ನತಿ ಮತ್ತು ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಸುಧಾರಣೆ — ಮೊದಲಿಗೆ ಕನಕಪುರ ಪ್ರದೇಶದಲ್ಲಿ.",
  } satisfies Localized,
  shortDescription: {
    en: "Bhoomi Seva is a volunteer-led social initiative supporting rural communities in Karnataka. We help students continue their education through scholarships, tutoring and mentoring; work with farmers to promote natural farming and agroforestry; provide desi cows and other livelihood support to selected marginal farmers; and assist children's homes with meals, education, equipment and essential needs.",
    kn: "ಭೂಮಿ ಸೇವಾ ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳಿಗೆ ನೆರವಾಗುವ ಸ್ವಯಂಸೇವಕರ ಸಾಮಾಜಿಕ ಉಪಕ್ರಮ. ವಿದ್ಯಾರ್ಥಿವೇತನ, ಪಾಠ ಮತ್ತು ಮಾರ್ಗದರ್ಶನದ ಮೂಲಕ ವಿದ್ಯಾರ್ಥಿಗಳ ಶಿಕ್ಷಣಕ್ಕೆ ನೆರವು; ನೈಸರ್ಗಿಕ ಕೃಷಿ ಮತ್ತು ಕೃಷಿ ಅರಣ್ಯವನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಲು ರೈತರೊಂದಿಗೆ ಕೆಲಸ; ಆಯ್ದ ಸಣ್ಣ ರೈತರಿಗೆ ದೇಸಿ ಹಸುಗಳು ಮತ್ತು ಇತರ ಜೀವನೋಪಾಯ ಬೆಂಬಲ; ಮತ್ತು ಮಕ್ಕಳ ಮನೆಗಳಿಗೆ ಊಟ, ಶಿಕ್ಷಣ, ಉಪಕರಣ ಮತ್ತು ಅಗತ್ಯ ಸಹಾಯ.",
  } satisfies Localized,
  /** Longer about text, built from facts stated on the existing site. */
  about: [
    {
      en: "Bhoomi Seva began from a simple desire to help where practical support can make a real difference. Our work focuses mainly on rural communities and brings together volunteers, donors, teachers, farmers and local organisations.",
      kn: "ಪ್ರಾಯೋಗಿಕ ಬೆಂಬಲ ನಿಜವಾದ ಬದಲಾವಣೆ ತರಬಲ್ಲಲ್ಲಿ ಸಹಾಯ ಮಾಡುವ ಸರಳ ಬಯಕೆಯಿಂದ ಭೂಮಿ ಸೇವಾ ಪ್ರಾರಂಭವಾಯಿತು. ನಮ್ಮ ಕೆಲಸ ಮುಖ್ಯವಾಗಿ ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕೃತವಾಗಿದ್ದು, ಸ್ವಯಂಸೇವಕರು, ದಾನಿಗಳು, ಶಿಕ್ಷಕರು, ರೈತರು ಮತ್ತು ಸ್ಥಳೀಯ ಸಂಸ್ಥೆಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ.",
    },
    {
      en: "In education, we support deserving students through scholarships, school and college fees, tutoring, mentoring, JNV entrance coaching and guidance toward other scholarship opportunities. For farmers, we promote natural and organic farming and agroforestry through training and awareness, and we donate desi cows to selected marginal farmers. We also support children's homes with meals, education costs, laptops, bicycles, clothing, LPG cylinders and other needs.",
      kn: "ಶಿಕ್ಷಣದಲ್ಲಿ, ವಿದ್ಯಾರ್ಥಿವೇತನ, ಶಾಲಾ ಮತ್ತು ಕಾಲೇಜು ಶುಲ್ಕ, ಪಾಠ, ಮಾರ್ಗದರ್ಶನ, ಜೆಎನ್‌ವಿ ಪ್ರವೇಶ ತರಬೇತಿ ಮತ್ತು ಇತರ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅವಕಾಶಗಳ ಬಗ್ಗೆ ದಾರಿ ತೋರಿಸುವ ಮೂಲಕ ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ನೆರವಾಗುತ್ತೇವೆ. ರೈತರಿಗೆ, ತರಬೇತಿ ಮತ್ತು ಅರಿವಿನ ಮೂಲಕ ನೈಸರ್ಗಿಕ ಹಾಗೂ ಸಾವಯವ ಕೃಷಿ ಮತ್ತು ಕೃಷಿ ಅರಣ್ಯವನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತೇವೆ, ಮತ್ತು ಆಯ್ದ ಸಣ್ಣ ರೈತರಿಗೆ ದೇಸಿ ಹಸುಗಳನ್ನು ದಾನ ಮಾಡುತ್ತೇವೆ. ಮಕ್ಕಳ ಮನೆಗಳಿಗೆ ಊಟ, ಶಿಕ್ಷಣ ವೆಚ್ಚ, ಲ್ಯಾಪ್‌ಟಾಪ್, ಸೈಕಲ್, ಬಟ್ಟೆ, ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್ ಮತ್ತು ಇತರ ಅಗತ್ಯಗಳಿಗೂ ನೆರವಾಗುತ್ತೇವೆ.",
    },
    {
      en: "Bhoomi Seva works at a human scale. Rather than limiting ourselves to a single type of assistance, we try to understand what a student, farmer, family or children's home actually needs and help within our capacity.",
      kn: "ಭೂಮಿ ಸೇವಾ ಮನುಷ್ಯರ ಗಾತ್ರದಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ. ಒಂದೇ ರೀತಿಯ ಸಹಾಯಕ್ಕೆ ಸೀಮಿತವಾಗದೆ, ವಿದ್ಯಾರ್ಥಿ, ರೈತ, ಕುಟುಂಬ ಅಥವಾ ಮಕ್ಕಳ ಮನೆಗೆ ನಿಜವಾಗಿ ಏನು ಬೇಕು ಎಂದು ಅರ್ಥ ಮಾಡಿಕೊಂಡು ನಮ್ಮ ಶಕ್ತಿಯ ಮೇರೆಗೆ ನೆರವಾಗಲು ಪ್ರಯತ್ನಿಸುತ್ತೇವೆ.",
    },
  ] satisfies Localized[],
  /** Preserved attribution from the existing site. */
  credit: "Website originally developed by Manav Mehta and Shubhashri C. G.",
};

export function pick(field: Localized, lang: "en" | "kn"): string {
  return typeof field === "string" ? field : ((lang === "kn" ? field.kn : field.en) ?? field.en);
}
