/**
 * UI string dictionary — English + Kannada.
 *
 * Long-form page content lives in src/data/*, where each field can carry
 * `{ en, kn }`; a missing `kn` falls back to `en`.
 */

export const languages = {
  en: "English",
  kn: "ಕನ್ನಡ",
} as const;

export const defaultLang = "en" as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    "site.name": "Bhoomi Seva",
    "site.tagline": "Let's give a better Earth to our children.",
    "site.description":
      "A volunteer-led initiative supporting rural communities in Karnataka through education, natural farming and practical support for children in need.",

    "common.readEntry": "Read this entry",
    "common.dateUnknown": "Date not recorded",
    "common.backToStories": "All stories",
    "common.dated": "Dated",
    "common.programme": "Programme",
    "common.location": "Location",
    "common.relatedStories": "Related entries",

    "a11y.skip": "Skip to content",

    "nav.work": "Our Work",
    "nav.work.education": "Education",
    "nav.work.farmers": "Farmers & Environment",
    "nav.work.children": "Children & Community",
    "nav.stories": "Stories",
    "nav.about": "About",
    "nav.involved": "Get Involved",
    "nav.donate": "Donate",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "nav.language": "Language",

    "cta.donate": "Donate",
    "cta.volunteer": "Volunteer with us",
    "cta.contact": "Contact us",
    "cta.readStories": "Read our stories",
    "cta.learnMore": "Learn more",
    "cta.allStories": "All stories",
    "cta.whatsapp": "Message us on WhatsApp",
    "cta.exploreWork": "Explore our work",

    "pillar.education.kicker": "Education",
    "pillar.education.title": "Helping students stay in school and move forward",
    "pillar.education.summary":
      "Scholarships and education fees, free online tutoring, JNV entrance coaching, mentoring and guidance toward external scholarship opportunities.",
    "pillar.farmers.kicker": "Farmers & Environment",
    "pillar.farmers.title": "Stronger farms, healthier soil, resilient livelihoods",
    "pillar.farmers.summary":
      "Training and practical guidance in natural and organic farming and agroforestry, plus desi cows for selected marginal farmers.",
    "pillar.children.kicker": "Children & Community",
    "pillar.children.title": "Practical support where it is needed",
    "pillar.children.summary":
      "Meals, education expenses, laptops, bicycles, clothes, stationery, LPG cylinders, medical and emergency support through children's homes.",

    "home.hero.kicker": "Volunteer-led · Karnataka",
    "home.hero.lede":
      "We work directly with rural families and farmers, one practical intervention at a time — from a student's school fees to farmer training or a desi cow that supports a family's farm and dairy income.",
    "home.pillars.kicker": "What we do",
    "home.pillars.title": "Three kinds of support, often for the same family",
    "home.model.kicker": "How we work",
    "home.model.title": "One family, three interventions",
    "home.model.body":
      "A farming family at Kurubarahalli Doddi near Kabbalu needed more than one thing at once. Their daughter's school fees were becoming hard to manage, the household relied on a single source of income, and they wanted to farm differently. Bhoomi Seva helped with all three: education fees, a desi cow, and a sewing machine.",
    "home.updates.kicker": "From the field",
    "home.updates.title": "Recent entries",
    "home.impact.kicker": "Stand with us",
    "home.impact.title": "Your support reaches a specific student, farmer or child",
    "home.impact.body":
      "Every contribution is recorded and acknowledged. Tell us which programme matters to you, or let us use it where it is needed most.",

    "work.kicker": "Our work",
    "work.title": "Three programmes, one community",
    "work.lede":
      "Our work sits in three areas. They often overlap: the same family may receive education support, livelihood help and practical assistance at once.",
    "work.activities": "What this includes",
    "work.stories": "Entries from this programme",
    "work.otherProgrammes": "Other programmes",
    "work.noStories": "Entries from this programme are being added.",

    "stories.kicker": "Stories & updates",
    "stories.title": "Field notes",
    "stories.lede":
      "Documented work, dated and located. Some entries are recent; others are kept as archive.",
    "stories.filter.programme": "Programme",
    "stories.filter.year": "Year",
    "stories.filter.all": "All",
    "stories.filter.noYear": "Undated",
    "stories.empty": "No entries match this filter yet.",
    "stories.count": "{n} entries",
    "story.context": "The details",
    "story.people": "People",
    "story.place": "Place",
    "story.period": "Period",

    "about.kicker": "About us",
    "about.title": "A small organisation, working at a human scale",
    "about.lede":
      "Bhoomi Seva began from a simple desire to help where practical support can make a real difference. Our work focuses mainly on rural communities and brings together volunteers, donors, teachers, farmers and local organisations.",
    "about.mission": "Mission",
    "about.vision": "Vision",
    "about.team": "The people",
    "about.team.lede":
      "Bhoomi Seva is run by volunteers and advisers who also work and live outside the organisation.",
    "about.community": "Our community",
    "about.community.body":
      "Bhoomi Seva is supported by a community of around 100 volunteers and donors, including volunteers who teach, mentor and coordinate programmes.",
    "about.disclaimer":
      "We try to keep this page honest. Where something is small-scale, or has been done once, we say so.",

    "involved.kicker": "Get involved",
    "involved.title": "There are a few ways to help",
    "involved.lede":
      "You can teach, mentor, coordinate, give useful goods, or fund a specific programme. Every bit of it reaches a named student, farmer or child.",
    "involved.volunteer.title": "Volunteer",
    "involved.volunteer.body":
      "Teach students online, mentor young people, support farmer programmes, or help coordinate initiatives online and on the ground.",
    "involved.goods.title": "Donate goods",
    "involved.goods.body":
      "Laptops, bicycles, clothing, footwear, stationery, furniture and LPG cylinders are needed by the children's homes we support. Tell us what you have and we will match it to a need.",
    "involved.give.title": "Give money",
    "involved.give.body":
      "Fund education, farmer support, a desi cow or a meal. You can earmark your contribution for a specific purpose.",
    "involved.follow.title": "Follow along",
    "involved.follow.body":
      "Join the WhatsApp group or follow us on social media to hear about new work.",

    "form.name": "Your name",
    "form.email": "Email address",
    "form.phone": "Phone or WhatsApp (optional)",
    "form.location": "Where you are based",
    "form.skills": "What can you help with?",
    "form.availability": "How much time can you give?",
    "form.interest": "Areas of interest",
    "form.message": "Message",
    "form.submit": "Send",
    "form.sending": "Sending…",
    "form.success": "Thank you — we have your message and will get back to you.",
    "form.error": "Something went wrong. Please try WhatsApp or email instead.",
    "form.required": "Required",
    "form.invalidEmail": "Please enter a valid email address.",
    "form.orContact": "Prefer not to use a form?",

    "donate.kicker": "Donate",
    "donate.title": "Choose where your contribution goes",
    "donate.lede":
      "We keep donations simple: choose a cause, transfer using UPI, and send us a short confirmation so we can thank you and report back.",
    "donate.cause": "Choose a cause",
    "donate.amount": "Suggested amount",
    "donate.upi": "UPI ID",
    "donate.copy": "Copy",
    "donate.copied": "Copied",
    "donate.qr": "Scan to pay",
    "donate.qr.alt": "Payment QR code",
    "donate.or": "or",
    "donate.step1": "Choose a cause and amount",
    "donate.step2": "Transfer by UPI and add the cause in the payment note",
    "donate.step3": "Send us the confirmation so we can acknowledge it",
    "donate.confirm.title": "After you transfer",
    "donate.confirm.body":
      "Please send us a message with the amount and the cause you chose. This is how we record and acknowledge every contribution.",
    "donate.unverified":
      "We are confirming that the payment details below are current. Please message us before transferring, or ask us for the latest details.",
    "donate.otherMethods": "Other ways to pay",
    "donate.causeNote": "Add the cause to the payment note so we can allocate it correctly.",
    "donate.qrPending": "Payment QR placeholder — replace with the current QR before launch.",

    "cause.education": "Education & scholarships",
    "cause.farmers": "Farmer support",
    "cause.cow": "Desi cow donation",
    "cause.children": "Children's home / meals",
    "cause.any": "Use where it is needed most",

    "contact.kicker": "Contact",
    "contact.title": "Write to us",
    "contact.lede":
      "Ask about a programme, offer to volunteer, or tell us about a student or family who needs support.",
    "contact.email": "Email",
    "contact.phone": "Phone / WhatsApp",
    "contact.socials": "Social",
    "contact.form.title": "Send a message",

    "notfound.title": "That page isn't here",
    "notfound.body":
      "The link may be old, or the page may have moved. Here are a few places to go instead.",
    "notfound.home": "Back to home",

    "lang.switch": "ಕನ್ನಡ",
    "lang.switchAria": "Switch to Kannada",

    "footer.mission": "Mission",
    "footer.vision": "Vision",
    "footer.contact": "Contact",
    "footer.explore": "Explore",
    "footer.follow": "Follow",
    "footer.rights": "Bhoomi Seva. Volunteer-led.",
    "footer.builtNote": "A volunteer-built site.",
    "footer.legal": "Source-available under CWSL-1.0",
  },

  kn: {
    "site.name": "ಭೂಮಿ ಸೇವಾ",
    "site.tagline": "ನಮ್ಮ ಮಕ್ಕಳಿಗೆ ಉತ್ತಮ ಭೂಮಿಯನ್ನು ನೀಡೋಣ.",
    "site.description":
      "ಶಿಕ್ಷಣ, ನೈಸರ್ಗಿಕ ಕೃಷಿ ಮತ್ತು ಅಗತ್ಯವಿರುವ ಮಕ್ಕಳಿಗೆ ಪ್ರಾಯೋಗಿಕ ಬೆಂಬಲದ ಮೂಲಕ ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳಿಗೆ ನೆರವು ನೀಡುವ ಸ್ವಯಂಸೇವಕರ ಉಪಕ್ರಮ.",

    "common.readEntry": "ಈ ನಮೂದನ್ನು ಓದಿ",
    "common.dateUnknown": "ದಿನಾಂಕ ದಾಖಲಾಗಿಲ್ಲ",
    "common.backToStories": "ಎಲ್ಲಾ ಕಥೆಗಳು",
    "common.dated": "ದಿನಾಂಕ",
    "common.programme": "ಕಾರ್ಯಕ್ರಮ",
    "common.location": "ಸ್ಥಳ",
    "common.relatedStories": "ಸಂಬಂಧಿತ ನಮೂದುಗಳು",

    "a11y.skip": "ವಿಷಯಕ್ಕೆ ಹೋಗಿ",

    "nav.work": "ನಮ್ಮ ಕೆಲಸ",
    "nav.work.education": "ಶಿಕ್ಷಣ",
    "nav.work.farmers": "ರೈತರು ಮತ್ತು ಪರಿಸರ",
    "nav.work.children": "ಮಕ್ಕಳು ಮತ್ತು ಸಮುದಾಯ",
    "nav.stories": "ಕಥೆಗಳು",
    "nav.about": "ನಮ್ಮ ಬಗ್ಗೆ",
    "nav.involved": "ಭಾಗಿಯಾಗಿ",
    "nav.donate": "ದೇಣಿಗೆ",
    "nav.contact": "ಸಂಪರ್ಕ",
    "nav.menu": "ಮೆನು",
    "nav.close": "ಮುಚ್ಚಿ",
    "nav.language": "ಭಾಷೆ",

    "cta.donate": "ದೇಣಿಗೆ ನೀಡಿ",
    "cta.volunteer": "ನಮ್ಮೊಂದಿಗೆ ಸ್ವಯಂಸೇವೆ ಮಾಡಿ",
    "cta.contact": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    "cta.readStories": "ನಮ್ಮ ಕಥೆಗಳನ್ನು ಓದಿ",
    "cta.learnMore": "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    "cta.allStories": "ಎಲ್ಲಾ ಕಥೆಗಳು",
    "cta.whatsapp": "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಂದೇಶ ಕಳುಹಿಸಿ",
    "cta.exploreWork": "ನಮ್ಮ ಕೆಲಸ ನೋಡಿ",

    "pillar.education.kicker": "ಶಿಕ್ಷಣ",
    "pillar.education.title": "ವಿದ್ಯಾರ್ಥಿಗಳು ಶಾಲೆಯಲ್ಲಿ ಉಳಿದು ಮುಂದೆ ಸಾಗಲು ನೆರವು",
    "pillar.education.summary":
      "ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಶಿಕ್ಷಣ ಶುಲ್ಕ, ಉಚಿತ ಆನ್‌ಲೈನ್ ಪಾಠ, ಜೆಎನ್‌ವಿ ಪ್ರವೇಶ ತರಬೇತಿ, ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಹೊರಗಿನ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅವಕಾಶಗಳ ಬಗ್ಗೆ ದಾರಿ ತೋರಿಸುವುದು.",
    "pillar.farmers.kicker": "ರೈತರು ಮತ್ತು ಪರಿಸರ",
    "pillar.farmers.title": "ಬಲವಾದ ಜಮೀನು, ಆರೋಗ್ಯಕರ ಮಣ್ಣು, ಸ್ಥಿರ ಜೀವನೋಪಾಯ",
    "pillar.farmers.summary":
      "ನೈಸರ್ಗಿಕ ಮತ್ತು ಸಾವಯವ ಕೃಷಿ ಹಾಗೂ ಕೃಷಿ ಅರಣ್ಯದಲ್ಲಿ ತರಬೇತಿ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಮಾರ್ಗದರ್ಶನ, ಜೊತೆಗೆ ಆಯ್ದ ಸಣ್ಣ ರೈತರಿಗೆ ದೇಸಿ ಹಸುಗಳು.",
    "pillar.children.kicker": "ಮಕ್ಕಳು ಮತ್ತು ಸಮುದಾಯ",
    "pillar.children.title": "ಅಗತ್ಯವಿರುವಲ್ಲಿ ಪ್ರಾಯೋಗಿಕ ಬೆಂಬಲ",
    "pillar.children.summary":
      "ಮಕ್ಕಳ ಮನೆಗಳ ಮೂಲಕ ಊಟ, ಶಿಕ್ಷಣ ವೆಚ್ಚ, ಲ್ಯಾಪ್‌ಟಾಪ್, ಸೈಕಲ್, ಬಟ್ಟೆ, ಲೇಖನ ಸಾಮಗ್ರಿ, ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್, ವೈದ್ಯಕೀಯ ಮತ್ತು ತುರ್ತು ಸಹಾಯ.",

    "home.hero.kicker": "ಸ್ವಯಂಸೇವಕರ ಉಪಕ್ರಮ · ಕರ್ನಾಟಕ",
    "home.hero.lede":
      "ನಾವು ಗ್ರಾಮೀಣ ಕುಟುಂಬಗಳು ಮತ್ತು ರೈತರೊಂದಿಗೆ ನೇರವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತೇವೆ — ಒಂದು ವಿದ್ಯಾರ್ಥಿಯ ಶಾಲಾ ಶುಲ್ಕದಿಂದ ಹಿಡಿದು ರೈತ ತರಬೇತಿ ಅಥವಾ ಕುಟುಂಬದ ಜಮೀನು ಮತ್ತು ಹಾಲಿನ ಆದಾಯಕ್ಕೆ ನೆರವಾಗುವ ದೇಸಿ ಹಸುವಿನವರೆಗೆ.",
    "home.pillars.kicker": "ನಾವು ಏನು ಮಾಡುತ್ತೇವೆ",
    "home.pillars.title": "ಮೂರು ರೀತಿಯ ಬೆಂಬಲ, ಹಲವು ಬಾರಿ ಒಂದೇ ಕುಟುಂಬಕ್ಕೆ",
    "home.model.kicker": "ನಾವು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತೇವೆ",
    "home.model.title": "ಒಂದು ಕುಟುಂಬ, ಮೂರು ನೆರವುಗಳು",
    "home.model.body":
      "ಕಬ್ಬಾಳು ಸಮೀಪದ ಕುರುಬರಹಳ್ಳಿ ದೊಡ್ಡಿಯ ಒಂದು ಕೃಷಿ ಕುಟುಂಬಕ್ಕೆ ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಬೇಕಿತ್ತು. ಮಗಳ ಶಾಲಾ ಶುಲ್ಕ ಭರಿಸುವುದು ಕಷ್ಟವಾಗಿತ್ತು, ಕುಟುಂಬ ಒಂದೇ ಆದಾಯದ ಮೂಲವನ್ನು ಅವಲಂಬಿಸಿತ್ತು, ಮತ್ತು ಅವರು ಬೇರೆ ರೀತಿಯಲ್ಲಿ ಕೃಷಿ ಮಾಡಲು ಬಯಸಿದ್ದರು. ಭೂಮಿ ಸೇವಾ ಮೂರಕ್ಕೂ ನೆರವಾಯಿತು: ಶಿಕ್ಷಣ ಶುಲ್ಕ, ಒಂದು ದೇಸಿ ಹಸು, ಮತ್ತು ಒಂದು ಹೊಲಿಗೆ ಯಂತ್ರ.",
    "home.updates.kicker": "ಜಮೀನಿನಿಂದ",
    "home.updates.title": "ಇತ್ತೀಚಿನ ನಮೂದುಗಳು",
    "home.impact.kicker": "ನಮ್ಮೊಂದಿಗೆ ನಿಲ್ಲಿ",
    "home.impact.title": "ನಿಮ್ಮ ಬೆಂಬಲವು ನಿರ್ದಿಷ್ಟ ವಿದ್ಯಾರ್ಥಿ, ರೈತ ಅಥವಾ ಮಗುವನ್ನು ತಲುಪುತ್ತದೆ",
    "home.impact.body":
      "ಪ್ರತಿ ಕೊಡುಗೆಯನ್ನೂ ದಾಖಲಿಸಿ ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸುತ್ತೇವೆ. ಯಾವ ಕಾರ್ಯಕ್ರಮ ನಿಮಗೆ ಮುಖ್ಯವೋ ಅದನ್ನು ಹೇಳಿ, ಅಥವಾ ಅಗತ್ಯವಿರುವಲ್ಲಿ ಬಳಸಲು ನಮಗೆ ಬಿಡಿ.",

    "work.kicker": "ನಮ್ಮ ಕೆಲಸ",
    "work.title": "ಮೂರು ಕಾರ್ಯಕ್ರಮಗಳು, ಒಂದೇ ಸಮುದಾಯ",
    "work.lede":
      "ನಮ್ಮ ಕೆಲಸ ಮೂರು ಕ್ಷೇತ್ರಗಳಲ್ಲಿದೆ. ಅವು ಹಲವು ಬಾರಿ ಒಂದಕ್ಕೊಂದು ಬೆರೆಯುತ್ತವೆ: ಒಂದೇ ಕುಟುಂಬಕ್ಕೆ ಶಿಕ್ಷಣ ಬೆಂಬಲ, ಜೀವನೋಪಾಯ ನೆರವು ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಸಹಾಯ ಒಟ್ಟಿಗೆ ಸಿಗಬಹುದು.",
    "work.activities": "ಇದರಲ್ಲಿ ಸೇರಿರುವುದು",
    "work.stories": "ಈ ಕಾರ್ಯಕ್ರಮದ ನಮೂದುಗಳು",
    "work.otherProgrammes": "ಇತರ ಕಾರ್ಯಕ್ರಮಗಳು",
    "work.noStories": "ಈ ಕಾರ್ಯಕ್ರಮದ ನಮೂದುಗಳನ್ನು ಸೇರಿಸುತ್ತಿದ್ದೇವೆ.",

    "stories.kicker": "ಕಥೆಗಳು ಮತ್ತು ಮಾಹಿತಿ",
    "stories.title": "ಜಮೀನಿನ ಟಿಪ್ಪಣಿಗಳು",
    "stories.lede":
      "ದಾಖಲಿತ ಕೆಲಸ, ದಿನಾಂಕ ಮತ್ತು ಸ್ಥಳದೊಂದಿಗೆ. ಕೆಲವು ನಮೂದುಗಳು ಇತ್ತೀಚಿನವು; ಇನ್ನು ಕೆಲವು ಸಂಗ್ರಹವಾಗಿ ಉಳಿದಿವೆ.",
    "stories.filter.programme": "ಕಾರ್ಯಕ್ರಮ",
    "stories.filter.year": "ವರ್ಷ",
    "stories.filter.all": "ಎಲ್ಲಾ",
    "stories.filter.noYear": "ದಿನಾಂಕವಿಲ್ಲ",
    "stories.empty": "ಈ ಜರಡಿಗೆ ಸದ್ಯಕ್ಕೆ ಯಾವುದೇ ನಮೂದು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.",
    "stories.count": "{n} ನಮೂದುಗಳು",
    "story.context": "ವಿವರಗಳು",
    "story.people": "ವ್ಯಕ್ತಿಗಳು",
    "story.place": "ಸ್ಥಳ",
    "story.period": "ಅವಧಿ",

    "about.kicker": "ನಮ್ಮ ಬಗ್ಗೆ",
    "about.title": "ಮನುಷ್ಯರ ಗಾತ್ರದಲ್ಲಿ ಕೆಲಸ ಮಾಡುವ ಸಣ್ಣ ಸಂಸ್ಥೆ",
    "about.lede":
      "ಪ್ರಾಯೋಗಿಕ ಬೆಂಬಲ ನಿಜವಾದ ಬದಲಾವಣೆ ತರಬಲ್ಲಲ್ಲಿ ಸಹಾಯ ಮಾಡುವ ಸರಳ ಬಯಕೆಯಿಂದ ಭೂಮಿ ಸೇವಾ ಪ್ರಾರಂಭವಾಯಿತು. ನಮ್ಮ ಕೆಲಸ ಮುಖ್ಯವಾಗಿ ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕೃತವಾಗಿದ್ದು, ಸ್ವಯಂಸೇವಕರು, ದಾನಿಗಳು, ಶಿಕ್ಷಕರು, ರೈತರು ಮತ್ತು ಸ್ಥಳೀಯ ಸಂಸ್ಥೆಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ.",
    "about.mission": "ಧ್ಯೇಯ",
    "about.vision": "ದೃಷ್ಟಿ",
    "about.team": "ಜನರು",
    "about.team.lede":
      "ಭೂಮಿ ಸೇವಾವನ್ನು ಸ್ವಯಂಸೇವಕರು ಮತ್ತು ಸಲಹೆಗಾರರು ನಡೆಸುತ್ತಾರೆ; ಅವರು ಸಂಸ್ಥೆಯ ಹೊರಗೆಯೂ ಕೆಲಸ ಮಾಡುತ್ತಾರೆ ಮತ್ತು ಬದುಕುತ್ತಾರೆ.",
    "about.community": "ನಮ್ಮ ಸಮುದಾಯ",
    "about.community.body":
      "ಭೂಮಿ ಸೇವಾಗೆ ಸುಮಾರು 100 ಸ್ವಯಂಸೇವಕರು ಮತ್ತು ದಾನಿಗಳ ಬೆಂಬಲವಿದೆ; ಪಾಠ ಮಾಡುವ, ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಸಂಯೋಜಿಸುವ ಸ್ವಯಂಸೇವಕರು ಇದರಲ್ಲಿ ಸೇರಿದ್ದಾರೆ.",
    "about.disclaimer":
      "ಈ ಪುಟವನ್ನು ಪ್ರಾಮಾಣಿಕವಾಗಿ ಇಟ್ಟುಕೊಳ್ಳಲು ನಾವು ಪ್ರಯತ್ನಿಸುತ್ತೇವೆ. ಏನಾದರೂ ಸಣ್ಣ ಪ್ರಮಾಣದ್ದಾಗಿದ್ದರೆ, ಅಥವಾ ಒಮ್ಮೆ ಮಾತ್ರ ಮಾಡಿದ್ದಾಗಿದ್ದರೆ, ಅದನ್ನು ನಾವು ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳುತ್ತೇವೆ.",

    "involved.kicker": "ಭಾಗಿಯಾಗಿ",
    "involved.title": "ಸಹಾಯ ಮಾಡಲು ಕೆಲವು ದಾರಿಗಳಿವೆ",
    "involved.lede":
      "ನೀವು ಪಾಠ ಮಾಡಬಹುದು, ಮಾರ್ಗದರ್ಶನ ನೀಡಬಹುದು, ಸಂಯೋಜನೆ ಮಾಡಬಹುದು, ಉಪಯುಕ್ತ ವಸ್ತುಗಳನ್ನು ನೀಡಬಹುದು, ಅಥವಾ ಒಂದು ನಿರ್ದಿಷ್ಟ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಹಣ ನೀಡಬಹುದು. ಇದರ ಪ್ರತಿಯೊಂದು ಭಾಗವೂ ಒಬ್ಬ ಹೆಸರಿನ ವಿದ್ಯಾರ್ಥಿ, ರೈತ ಅಥವಾ ಮಗುವನ್ನು ತಲುಪುತ್ತದೆ.",
    "involved.volunteer.title": "ಸ್ವಯಂಸೇವೆ",
    "involved.volunteer.body":
      "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಪಾಠ ಮಾಡಿ, ಯುವಕರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಿ, ರೈತ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ನೆರವಾಗಿ, ಅಥವಾ ಆನ್‌ಲೈನ್ ಮತ್ತು ಸ್ಥಳೀಯವಾಗಿ ಉಪಕ್ರಮಗಳ ಸಂಯೋಜನೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡಿ.",
    "involved.goods.title": "ವಸ್ತುಗಳ ದಾನ",
    "involved.goods.body":
      "ನಾವು ಬೆಂಬಲಿಸುವ ಮಕ್ಕಳ ಮನೆಗಳಿಗೆ ಲ್ಯಾಪ್‌ಟಾಪ್, ಸೈಕಲ್, ಬಟ್ಟೆ, ಪಾದರಕ್ಷೆ, ಲೇಖನ ಸಾಮಗ್ರಿ, ಪೀಠೋಪಕರಣ ಮತ್ತು ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್‌ಗಳ ಅಗತ್ಯವಿದೆ. ನಿಮ್ಮ ಬಳಿ ಏನಿದೆ ಎಂದು ಹೇಳಿ; ಅದನ್ನು ಒಂದು ಅಗತ್ಯಕ್ಕೆ ಹೊಂದಿಸುತ್ತೇವೆ.",
    "involved.give.title": "ಹಣ ನೀಡಿ",
    "involved.give.body":
      "ಶಿಕ್ಷಣ, ರೈತ ಬೆಂಬಲ, ಒಂದು ದೇಸಿ ಹಸು ಅಥವಾ ಒಂದು ಊಟಕ್ಕೆ ನೆರವಾಗಿ. ನಿಮ್ಮ ಕೊಡುಗೆಯನ್ನು ಒಂದು ನಿರ್ದಿಷ್ಟ ಉದ್ದೇಶಕ್ಕೆ ಮೀಸಲಿಡಬಹುದು.",
    "involved.follow.title": "ನಮ್ಮೊಂದಿಗೆ ಇರಿ",
    "involved.follow.body":
      "ಹೊಸ ಕೆಲಸಗಳ ಮಾಹಿತಿಗಾಗಿ ವಾಟ್ಸಾಪ್ ಗುಂಪಿಗೆ ಸೇರಿ ಅಥವಾ ಸಾಮಾಜಿಕ ಜಾಲತಾಣಗಳಲ್ಲಿ ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ.",

    "form.name": "ನಿಮ್ಮ ಹೆಸರು",
    "form.email": "ಇಮೇಲ್ ವಿಳಾಸ",
    "form.phone": "ಫೋನ್ ಅಥವಾ ವಾಟ್ಸಾಪ್ (ಐಚ್ಛಿಕ)",
    "form.location": "ನೀವಿರುವ ಸ್ಥಳ",
    "form.skills": "ನೀವು ಯಾವುದರಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲಿರಿ?",
    "form.availability": "ಎಷ್ಟು ಸಮಯ ನೀಡಬಲ್ಲಿರಿ?",
    "form.interest": "ಆಸಕ್ತಿಯ ಕ್ಷೇತ್ರಗಳು",
    "form.message": "ಸಂದೇಶ",
    "form.submit": "ಕಳುಹಿಸಿ",
    "form.sending": "ಕಳುಹಿಸುತ್ತಿದೆ…",
    "form.success": "ಧನ್ಯವಾದ — ನಿಮ್ಮ ಸಂದೇಶ ನಮಗೆ ಸಿಕ್ಕಿದೆ; ನಾವು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.",
    "form.error": "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ವಾಟ್ಸಾಪ್ ಅಥವಾ ಇಮೇಲ್ ಮೂಲಕ ಪ್ರಯತ್ನಿಸಿ.",
    "form.required": "ಅಗತ್ಯ",
    "form.invalidEmail": "ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ.",
    "form.orContact": "ಅಫಾರ್ಮ್ ಬಳಸಲು ಇಷ್ಟವಿಲ್ಲವೇ?",

    "donate.kicker": "ದೇಣಿಗೆ",
    "donate.title": "ನಿಮ್ಮ ಕೊಡುಗೆ ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕೆಂದು ಆರಿಸಿ",
    "donate.lede":
      "ದೇಣಿಗೆಯನ್ನು ಸರಳವಾಗಿಡುತ್ತೇವೆ: ಒಂದು ಉದ್ದೇಶ ಆರಿಸಿ, ಯುಪಿಐ ಮೂಲಕ ಹಣ ವರ್ಗಾಯಿಸಿ, ಮತ್ತು ಸಣ್ಣ ದೃಢೀಕರಣವನ್ನು ನಮಗೆ ಕಳುಹಿಸಿ — ನಾವು ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸಿ ಮಾಹಿತಿ ನೀಡಲು.",
    "donate.cause": "ಒಂದು ಉದ್ದೇಶ ಆರಿಸಿ",
    "donate.amount": "ಸೂಚಿತ ಮೊತ್ತ",
    "donate.upi": "ಯುಪಿಐ ಐಡಿ",
    "donate.copy": "ನಕಲಿಸಿ",
    "donate.copied": "ನಕಲಾಗಿದೆ",
    "donate.qr": "ಪಾವತಿಸಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    "donate.qr.alt": "ಪಾವತಿ ಕ್ಯೂಆರ್ ಕೋಡ್",
    "donate.or": "ಅಥವಾ",
    "donate.step1": "ಒಂದು ಉದ್ದೇಶ ಮತ್ತು ಮೊತ್ತ ಆರಿಸಿ",
    "donate.step2": "ಯುಪಿಐ ಮೂಲಕ ವರ್ಗಾಯಿಸಿ, ಪಾವತಿ ಟಿಪ್ಪಣಿಯಲ್ಲಿ ಉದ್ದೇಶ ಬರೆಯಿರಿ",
    "donate.step3": "ದೃಢೀಕರಣವನ್ನು ನಮಗೆ ಕಳುಹಿಸಿ",
    "donate.confirm.title": "ವರ್ಗಾವಣೆಯ ನಂತರ",
    "donate.confirm.body":
      "ಮೊತ್ತ ಮತ್ತು ನೀವು ಆರಿಸಿದ ಉದ್ದೇಶದೊಂದಿಗೆ ನಮಗೆ ಒಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ. ಪ್ರತಿ ಕೊಡುಗೆಯನ್ನು ದಾಖಲಿಸಿ ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸುವುದು ಹೀಗೆ.",
    "donate.unverified":
      "ಕೆಳಗಿನ ಪಾವತಿ ವಿವರಗಳು ಇನ್ನೂ ಜಾರಿಯಲ್ಲಿವೆಯೇ ಎಂದು ನಾವು ದೃಢಪಡಿಸುತ್ತಿದ್ದೇವೆ. ಹಣ ವರ್ಗಾಯಿಸುವ ಮೊದಲು ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ, ಅಥವಾ ಇತ್ತೀಚಿನ ವಿವರಗಳನ್ನು ಕೇಳಿ.",
    "donate.otherMethods": "ಪಾವತಿಸಲು ಇತರ ದಾರಿಗಳು",
    "donate.causeNote": "ಸರಿಯಾಗಿ ಹಂಚಲು ಪಾವತಿ ಟಿಪ್ಪಣಿಯಲ್ಲಿ ಉದ್ದೇಶವನ್ನು ಸೇರಿಸಿ.",
    "donate.qrPending": "ಪಾವತಿ ಕ್ಯೂಆರ್ ತಾತ್ಕಾಲಿಕ — ಪ್ರಕಟಣೆಗೆ ಮೊದಲು ಇತ್ತೀಚಿನ ಕ್ಯೂಆರ್ ಸೇರಿಸಿ.",

    "cause.education": "ಶಿಕ್ಷಣ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ",
    "cause.farmers": "ರೈತ ಬೆಂಬಲ",
    "cause.cow": "ದೇಸಿ ಹಸು ದಾನ",
    "cause.children": "ಮಕ್ಕಳ ಮನೆ / ಊಟ",
    "cause.any": "ಅಗತ್ಯವಿರುವಲ್ಲಿ ಬಳಸಿ",

    "contact.kicker": "ಸಂಪರ್ಕ",
    "contact.title": "ನಮಗೆ ಬರೆಯಿರಿ",
    "contact.lede":
      "ಒಂದು ಕಾರ್ಯಕ್ರಮದ ಬಗ್ಗೆ ಕೇಳಿ, ಸ್ವಯಂಸೇವೆ ಮಾಡಲು ಹೇಳಿ, ಅಥವಾ ಬೆಂಬಲ ಬೇಕಿರುವ ವಿದ್ಯಾರ್ಥಿ ಅಥವಾ ಕುಟುಂಬದ ಬಗ್ಗೆ ತಿಳಿಸಿ.",
    "contact.email": "ಇಮೇಲ್",
    "contact.phone": "ಫೋನ್ / ವಾಟ್ಸಾಪ್",
    "contact.socials": "ಸಾಮಾಜಿಕ ಜಾಲತಾಣ",
    "contact.form.title": "ಸಂದೇಶ ಕಳುಹಿಸಿ",

    "notfound.title": "ಈ ಪುಟ ಇಲ್ಲಿಲ್ಲ",
    "notfound.body":
      "ಕೊಂಡಿ ಹಳೆಯದಾಗಿರಬಹುದು, ಅಥವಾ ಪುಟ ಸ್ಥಳ ಬದಲಾಗಿರಬಹುದು. ಬದಲಿಗೆ ಕೆಲವು ಸ್ಥಳಗಳು ಇಲ್ಲಿವೆ.",
    "notfound.home": "ಮುಖಪುಟಕ್ಕೆ",

    "lang.switch": "English",
    "lang.switchAria": "Switch to English",

    "footer.mission": "ಧ್ಯೇಯ",
    "footer.vision": "ದೃಷ್ಟಿ",
    "footer.contact": "ಸಂಪರ್ಕ",
    "footer.explore": "ಅನ್ವೇಷಿಸಿ",
    "footer.follow": "ಅನುಸರಿಸಿ",
    "footer.rights": "ಭೂಮಿ ಸೇವಾ. ಸ್ವಯಂಸೇವಕರ ಉಪಕ್ರಮ.",
    "footer.builtNote": "ಸ್ವಯಂಸೇವಕರಿಂದ ನಿರ್ಮಿಸಲಾದ ತಾಣ.",
    "footer.legal": "CWSL-1.0 ಅಡಿಯಲ್ಲಿ ಮೂಲ ಲಭ್ಯ",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
