import type { Localized } from "../i18n/utils";

export const site = {
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
  mission: {
    en: "Our mission is to support people in need, especially in rural communities, through education, livelihood support and practical assistance, while contributing to the restoration and long-term health of our environment.",
    kn: "ಶಿಕ್ಷಣ, ಜೀವನೋಪಾಯ ಬೆಂಬಲ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಸಹಾಯದ ಮೂಲಕ — ವಿಶೇಷವಾಗಿ ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳಲ್ಲಿ — ಅಗತ್ಯವಿರುವವರಿಗೆ ನೆರವು ನೀಡುವುದು, ಮತ್ತು ನಮ್ಮ ಪರಿಸರದ ಪುನರುಜ್ಜೀವನ ಹಾಗೂ ದೀರ್ಘಕಾಲೀನ ಆರೋಗ್ಯಕ್ಕೆ ಕೊಡುಗೆ ನೀಡುವುದು ನಮ್ಮ ಧ್ಯೇಯ.",
  } satisfies Localized,
  vision: {
    en: "Our vision is to strengthen rural communities while improving soil health by helping farmers adopt agroforestry and natural-farming practices, beginning with communities around Kanakapura and neighbouring regions.",
    kn: "ಕೃಷಿ ಅರಣ್ಯ ಮತ್ತು ನೈಸರ್ಗಿಕ ಕೃಷಿ ಪದ್ಧತಿಗಳನ್ನು ರೈತರು ಅಳವಡಿಸಿಕೊಳ್ಳಲು ನೆರವು ನೀಡುವ ಮೂಲಕ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸುಧಾರಿಸುವುದು ಮತ್ತು ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳನ್ನು ಬಲಪಡಿಸುವುದು ನಮ್ಮ ದೃಷ್ಟಿ — ಕನಕಪುರ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಪ್ರದೇಶಗಳಿಂದ ಪ್ರಾರಂಭಿಸಿ.",
  } satisfies Localized,
  shortDescription: {
    en: "Bhoomi Seva is a volunteer-led social initiative supporting rural communities in Karnataka. We help students continue their education through scholarships, tutoring and mentoring; work with farmers to promote natural farming and agroforestry; provide desi cows and other livelihood support to selected marginal farmers; and assist children's homes with meals, education, equipment and essential needs.",
    kn: "ಭೂಮಿ ಸೇವಾ ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳಿಗೆ ನೆರವಾಗುವ ಸ್ವಯಂಸೇವಕರ ಸಾಮಾಜಿಕ ಉಪಕ್ರಮ. ವಿದ್ಯಾರ್ಥಿವೇತನ, ಪಾಠ ಮತ್ತು ಮಾರ್ಗದರ್ಶನದ ಮೂಲಕ ವಿದ್ಯಾರ್ಥಿಗಳ ಶಿಕ್ಷಣಕ್ಕೆ ನೆರವು; ನೈಸರ್ಗಿಕ ಕೃಷಿ ಮತ್ತು ಕೃಷಿ ಅರಣ್ಯವನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಲು ರೈತರೊಂದಿಗೆ ಕೆಲಸ; ಆಯ್ದ ಸಣ್ಣ ರೈತರಿಗೆ ದೇಸಿ ಹಸುಗಳು ಮತ್ತು ಇತರ ಜೀವನೋಪಾಯ ಬೆಂಬಲ; ಮತ್ತು ಮಕ್ಕಳ ಮನೆಗಳಿಗೆ ಊಟ, ಶಿಕ್ಷಣ, ಉಪಕರಣ ಮತ್ತು ಅಗತ್ಯ ಸಹಾಯ.",
  } satisfies Localized,
};

export function pick(field: Localized, lang: "en" | "kn"): string {
  return typeof field === "string" ? field : (lang === "kn" ? field.kn : field.en) ?? field.en;
}
