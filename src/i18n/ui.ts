/**
 * UI strings — English + Kannada.
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
    "site.tagline": "Let's give a better Earth to our children!",

    "common.readEntry": "Read this story",
    "common.dateUnknown": "Date not recorded",
    "common.relatedStories": "Related stories",

    "a11y.skip": "Skip to content",
    "lightbox.close": "Close image",
    "lightbox.prev": "Previous image",
    "lightbox.next": "Next image",

    "nav.home": "Home",
    "nav.work": "Our Work",
    "nav.work.education": "Education",
    "nav.work.farmers": "Farmers & Environment",
    "nav.work.children": "Children & Community",
    "nav.stories": "Stories",
    "nav.about": "About",
    "nav.involved": "Get Involved",
    "nav.donate": "Donate",
    "nav.contact": "Contact",
    "nav.events": "Events",
    "nav.blogs": "Blogs",
    "nav.blogs.donors": "Donor blogs",
    "nav.blogs.donees": "Donee blogs",
    "nav.menu": "Menu",
    "nav.close": "Close",

    "cta.donate": "Donate",
    "cta.volunteer": "Volunteer with us",
    "cta.readStories": "Read our stories",
    "cta.learnMore": "Read more",
    "cta.allStories": "All stories",
    "cta.allEvents": "All events",
    "cta.whatsapp": "Message us on WhatsApp",

    "home.hero.kicker": "Volunteer-led · Karnataka",
    "home.pillars.title": "What we do",
    "home.model.kicker": "How we work",
    "home.model.title": "A cow, a sewing machine and school fees",
    "home.model.body":
      "Sunita Kumara Swamy's family at Kurubarahalli Doddi near Kabbalu needed more than one thing at once. Their daughter's school fees had become hard to pay, and the household was running on a single source of income. Bhoomi Seva helped with three: a scholarship and fee payment for their daughter, a desi cow for the family's farm and dairy income, and a sewing machine for a second income.",
    "home.updates.title": "Recent stories",
    "home.impact.kicker": "Support our work",
    "home.impact.title": "Donate or volunteer",
    "home.impact.body":
      "Contributions are recorded and acknowledged. Tell us which programme you want to support, or let us use it where it is needed most.",

    "work.kicker": "Our work",
    "work.title": "Our programmes",
    "work.lede":
      "Bhoomi Seva works in three areas: education, farmers and the environment, and support for children's homes. They often overlap — the same family may receive education support, livelihood help and practical assistance at the same time.",
    "work.stories": "Stories from this programme",
    "work.otherProgrammes": "Other programmes",
    "work.noStories": "Stories from this programme are being added.",

    "stories.kicker": "Archive",
    "stories.title": "Stories and updates",
    "stories.lede":
      "Documented work from Bhoomi Seva, dated and located where the records allow. Some entries are recent; others are kept as archive.",
    "stories.filter.programme": "Programme",
    "stories.filter.year": "Year",
    "stories.filter.all": "All",
    "stories.empty": "No entries match this filter yet.",
    "stories.count": "{n} entries",
    "story.people": "People",
    "story.quoteLabel": "In their own words",

    "events.kicker": "Events",
    "events.title": "Events",
    "events.lede":
      "Dated records of things that happened — training sessions, distributions, donations and meals.",
    "events.empty": "No events have been added yet.",
    "events.related": "Other events",

    "blogs.kicker": "Blogs",
    "blogs.title": "Blogs",
    "blogs.lede":
      "Writing from the people involved in this work — the donors who fund it, and the students, farmers and families we work with.",
    "blogs.empty": "No blog posts yet.",
    "blogs.donors.title": "Donor blogs",
    "blogs.donors.lede": "Posts written by the people who fund and volunteer for this work.",
    "blogs.donors.empty": "No donor blog posts yet.",
    "blogs.donees.title": "Donee blogs",
    "blogs.donees.lede": "Posts written by the students, farmers and families we work with.",
    "blogs.donees.empty": "No donee blog posts yet.",
    "blogs.related": "Other posts",

    "about.kicker": "About us",
    "about.title": "About Bhoomi Seva",
    "about.lede":
      "Bhoomi Seva is a volunteer-led social initiative working with rural communities in Karnataka. It runs education support, farmer training and desi cow donations, and practical support for children's homes.",
    "about.mission": "Mission",
    "about.vision": "Vision",
    "about.team": "The people",
    "about.team.lede":
      "Bhoomi Seva is run by volunteers and advisers who also work and live outside the organisation.",
    "about.community": "Our volunteers",
    "about.community.body":
      "Bhoomi Seva has a group of volunteers who teach, coach and mentor underprivileged students. It also has around 95–110 volunteers who donate in support of various initiatives.",
    "about.disclaimer":
      "We try to keep this page accurate. Where something is small-scale, or was done once, we say so.",

    "involved.kicker": "Get involved",
    "involved.title": "Get involved",
    "involved.lede":
      "You can teach, mentor, coordinate, give goods, or fund a specific programme. Every bit of it reaches a student, farmer or child.",
    "involved.volunteer.title": "Volunteer",
    "involved.volunteer.body":
      "We have volunteering opportunities in online teaching, and in online or offline coordination for various initiatives. Contact us to know more.",
    "involved.goods.title": "Donate goods",
    "involved.goods.body":
      "Laptops, bicycles, used clothes, footwear, stationery, furniture and LPG cylinders are needed by the children's homes we support. Tell us what you have and we will match it to a need.",
    "involved.give.title": "Donate money",
    "involved.give.body":
      "Fund education, farmer support, a desi cow or an orphanage meal. You can add the purpose while transferring the amount.",
    "involved.follow.title": "Follow along",
    "involved.follow.body":
      "Join the Bhoomi Seva WhatsApp group or support us on Facebook to hear about new work.",

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
    "form.invalidEmail": "Please enter a valid email address.",
    "form.orContact": "Prefer not to use a form?",

    "donate.kicker": "Donate",
    "donate.title": "Donate to Bhoomi Seva",
    "donate.lede":
      "If you want your donation to be used for a specific purpose, add CowDonation / Education / FarmersSupport / OrphanageMeal / Any in the comment while transferring the amount.",
    "donate.cause": "Choose a purpose",
    "donate.amount": "Amount",
    "donate.upi": "UPI ID",
    "donate.copy": "Copy",
    "donate.copied": "Copied",
    "donate.qr": "QR code",
    "donate.step1": "Choose a purpose and an amount",
    "donate.step2": "Transfer by UPI, Paytm or Google Pay",
    "donate.step3": "Send us the confirmation so we can acknowledge it",
    "donate.confirm.title": "After you transfer",
    "donate.confirm.body":
      "You can get confirmation of your transferred amount by sending a WhatsApp message to Bhoomi Seva (+91 9900103178), or by emailing bhoomiseva.org@gmail.com. We record every contribution by name and purpose.",
    "donate.unverified":
      "We are confirming that the payment details below are still current. Please message us before transferring, or ask us for the latest details.",
    "donate.otherMethods": "Other ways to pay",
    "donate.causeNote": "Add the purpose in the payment comment so we can allocate it correctly.",
    "donate.qrPending": "Payment QR placeholder — replace with the current QR before launch.",

    "cause.education": "Education",
    "cause.farmers": "Farmer support",
    "cause.cow": "Cow donation",
    "cause.children": "Orphanage meal",
    "cause.any": "Any",

    "contact.kicker": "Contact",
    "contact.title": "Contact us",
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

    "footer.contact": "Contact",
    "footer.explore": "Explore",
    "footer.follow": "Follow",
    "footer.legal": "Source-available under CWSL-1.0",
  },

  kn: {
    "site.name": "ಭೂಮಿ ಸೇವಾ",
    "site.tagline": "ನಮ್ಮ ಮಕ್ಕಳಿಗೆ ಉತ್ತಮ ಭೂಮಿಯನ್ನು ನೀಡೋಣ!",

    "common.readEntry": "ಈ ಕಥೆಯನ್ನು ಓದಿ",
    "common.dateUnknown": "ದಿನಾಂಕ ದಾಖಲಾಗಿಲ್ಲ",
    "common.relatedStories": "ಸಂಬಂಧಿತ ಕಥೆಗಳು",

    "a11y.skip": "ವಿಷಯಕ್ಕೆ ಹೋಗಿ",
    "lightbox.close": "ಚಿತ್ರ ಮುಚ್ಚಿ",
    "lightbox.prev": "ಹಿಂದಿನ ಚಿತ್ರ",
    "lightbox.next": "ಮುಂದಿನ ಚಿತ್ರ",

    "nav.home": "ಮುಖಪುಟ",
    "nav.work": "ನಮ್ಮ ಕೆಲಸ",
    "nav.work.education": "ಶಿಕ್ಷಣ",
    "nav.work.farmers": "ರೈತರು ಮತ್ತು ಪರಿಸರ",
    "nav.work.children": "ಮಕ್ಕಳು ಮತ್ತು ಸಮುದಾಯ",
    "nav.stories": "ಕಥೆಗಳು",
    "nav.about": "ನಮ್ಮ ಬಗ್ಗೆ",
    "nav.involved": "ಭಾಗಿಯಾಗಿ",
    "nav.donate": "ದೇಣಿಗೆ",
    "nav.contact": "ಸಂಪರ್ಕ",
    "nav.events": "ಕಾರ್ಯಕ್ರಮಗಳು",
    "nav.blogs": "ಬ್ಲಾಗ್‌ಗಳು",
    "nav.blogs.donors": "ದಾನಿಗಳ ಬ್ಲಾಗ್",
    "nav.blogs.donees": "ಪಡೆದವರ ಬ್ಲಾಗ್",
    "nav.menu": "ಮೆನು",
    "nav.close": "ಮುಚ್ಚಿ",

    "cta.donate": "ದೇಣಿಗೆ ನೀಡಿ",
    "cta.volunteer": "ನಮ್ಮೊಂದಿಗೆ ಸ್ವಯಂಸೇವೆ ಮಾಡಿ",
    "cta.readStories": "ನಮ್ಮ ಕಥೆಗಳನ್ನು ಓದಿ",
    "cta.learnMore": "ಇನ್ನಷ್ಟು ಓದಿ",
    "cta.allStories": "ಎಲ್ಲಾ ಕಥೆಗಳು",
    "cta.allEvents": "ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು",
    "cta.whatsapp": "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಂದೇಶ ಕಳುಹಿಸಿ",

    "home.hero.kicker": "ಸ್ವಯಂಸೇವಕರ ಉಪಕ್ರಮ · ಕರ್ನಾಟಕ",
    "home.pillars.title": "ನಾವು ಏನು ಮಾಡುತ್ತೇವೆ",
    "home.model.kicker": "ನಾವು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತೇವೆ",
    "home.model.title": "ಒಂದು ಹಸು, ಒಂದು ಹೊಲಿಗೆ ಯಂತ್ರ ಮತ್ತು ಶಾಲಾ ಶುಲ್ಕ",
    "home.model.body":
      "ಕಬ್ಬಾಳು ಸಮೀಪದ ಕುರುಬರಹಳ್ಳಿ ದೊಡ್ಡಿಯ ಸುನೀತ ಕುಮಾರ ಸ್ವಾಮಿ ಅವರ ಕುಟುಂಬಕ್ಕೆ ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಬೇಕಿತ್ತು. ಮಗಳ ಶಾಲಾ ಶುಲ್ಕ ಭರಿಸುವುದು ಕಷ್ಟವಾಗಿತ್ತು, ಮತ್ತು ಕುಟುಂಬ ಒಂದೇ ಆದಾಯದ ಮೂಲದ ಮೇಲೆ ನಡೆಯುತ್ತಿತ್ತು. ಭೂಮಿ ಸೇವಾ ಮೂರಕ್ಕೂ ನೆರವಾಯಿತು: ಮಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಶುಲ್ಕ ಪಾವತಿ, ಕುಟುಂಬದ ಜಮೀನು ಮತ್ತು ಹಾಲಿನ ಆದಾಯಕ್ಕೆ ಒಂದು ದೇಸಿ ಹಸು, ಮತ್ತು ಇನ್ನೊಂದು ಆದಾಯಕ್ಕೆ ಒಂದು ಹೊಲಿಗೆ ಯಂತ್ರ.",
    "home.updates.title": "ಇತ್ತೀಚಿನ ಕಥೆಗಳು",
    "home.impact.kicker": "ನಮ್ಮ ಕೆಲಸಕ್ಕೆ ಬೆಂಬಲ",
    "home.impact.title": "ದೇಣಿಗೆ ನೀಡಿ ಅಥವಾ ಸ್ವಯಂಸೇವೆ ಮಾಡಿ",
    "home.impact.body":
      "ಪ್ರತಿ ಕೊಡುಗೆಯನ್ನೂ ದಾಖಲಿಸಿ ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸುತ್ತೇವೆ. ಯಾವ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಬೆಂಬಲ ನೀಡಬೇಕೋ ಹೇಳಿ, ಅಥವಾ ಅಗತ್ಯವಿರುವಲ್ಲಿ ಬಳಸಲು ನಮಗೆ ಬಿಡಿ.",

    "work.kicker": "ನಮ್ಮ ಕೆಲಸ",
    "work.title": "ನಮ್ಮ ಕಾರ್ಯಕ್ರಮಗಳು",
    "work.lede":
      "ಭೂಮಿ ಸೇವಾ ಮೂರು ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ: ಶಿಕ್ಷಣ, ರೈತರು ಮತ್ತು ಪರಿಸರ, ಮತ್ತು ಮಕ್ಕಳ ಮನೆಗಳಿಗೆ ಬೆಂಬಲ. ಇವು ಹಲವು ಬಾರಿ ಒಂದಕ್ಕೊಂದು ಬೆರೆಯುತ್ತವೆ — ಒಂದೇ ಕುಟುಂಬಕ್ಕೆ ಶಿಕ್ಷಣ ಬೆಂಬಲ, ಜೀವನೋಪಾಯ ನೆರವು ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಸಹಾಯ ಒಟ್ಟಿಗೆ ಸಿಗಬಹುದು.",
    "work.stories": "ಈ ಕಾರ್ಯಕ್ರಮದ ಕಥೆಗಳು",
    "work.otherProgrammes": "ಇತರ ಕಾರ್ಯಕ್ರಮಗಳು",
    "work.noStories": "ಈ ಕಾರ್ಯಕ್ರಮದ ಕಥೆಗಳನ್ನು ಸೇರಿಸುತ್ತಿದ್ದೇವೆ.",

    "stories.kicker": "ಸಂಗ್ರಹ",
    "stories.title": "ಕಥೆಗಳು ಮತ್ತು ಮಾಹಿತಿ",
    "stories.lede":
      "ಭೂಮಿ ಸೇವಾದ ದಾಖಲಿತ ಕೆಲಸ, ದಾಖಲೆ ಇರುವಲ್ಲಿ ದಿನಾಂಕ ಮತ್ತು ಸ್ಥಳದೊಂದಿಗೆ. ಕೆಲವು ನಮೂದುಗಳು ಇತ್ತೀಚಿನವು; ಇನ್ನು ಕೆಲವು ಸಂಗ್ರಹವಾಗಿ ಉಳಿದಿವೆ.",
    "stories.filter.programme": "ಕಾರ್ಯಕ್ರಮ",
    "stories.filter.year": "ವರ್ಷ",
    "stories.filter.all": "ಎಲ್ಲಾ",
    "stories.empty": "ಈ ಜರಡಿಗೆ ಸದ್ಯಕ್ಕೆ ಯಾವುದೇ ನಮೂದು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.",
    "stories.count": "{n} ನಮೂದುಗಳು",
    "story.people": "ವ್ಯಕ್ತಿಗಳು",
    "story.quoteLabel": "ಅವರದೇ ಮಾತಿನಲ್ಲಿ",

    "events.kicker": "ಕಾರ್ಯಕ್ರಮಗಳು",
    "events.title": "ಕಾರ್ಯಕ್ರಮಗಳು",
    "events.lede": "ನಡೆದ ಸಂಗತಿಗಳ ದಿನಾಂಕಿತ ದಾಖಲೆಗಳು — ತರಬೇತಿ, ವಿತರಣೆ, ದಾನ ಮತ್ತು ಊಟ.",
    "events.empty": "ಇನ್ನೂ ಯಾವುದೇ ಕಾರ್ಯಕ್ರಮ ಸೇರಿಸಲಾಗಿಲ್ಲ.",
    "events.related": "ಇತರ ಕಾರ್ಯಕ್ರಮಗಳು",

    "blogs.kicker": "ಬ್ಲಾಗ್‌ಗಳು",
    "blogs.title": "ಬ್ಲಾಗ್‌ಗಳು",
    "blogs.lede":
      "ಈ ಕೆಲಸದಲ್ಲಿ ಭಾಗಿಯಾದವರ ಬರಹಗಳು — ಹಣ ನೀಡುವ ದಾನಿಗಳು, ಮತ್ತು ನಾವು ಕೆಲಸ ಮಾಡುವ ವಿದ್ಯಾರ್ಥಿಗಳು, ರೈತರು ಹಾಗೂ ಕುಟುಂಬಗಳು.",
    "blogs.empty": "ಇನ್ನೂ ಬ್ಲಾಗ್ ಬರಹಗಳಿಲ್ಲ.",
    "blogs.donors.title": "ದಾನಿಗಳ ಬ್ಲಾಗ್",
    "blogs.donors.lede": "ಈ ಕೆಲಸಕ್ಕೆ ಹಣ ನೀಡುವ ಮತ್ತು ಸ್ವಯಂಸೇವೆ ಮಾಡುವವರ ಬರಹಗಳು.",
    "blogs.donors.empty": "ಇನ್ನೂ ದಾನಿಗಳ ಬ್ಲಾಗ್ ಬರಹಗಳಿಲ್ಲ.",
    "blogs.donees.title": "ಪಡೆದವರ ಬ್ಲಾಗ್",
    "blogs.donees.lede": "ನಾವು ಕೆಲಸ ಮಾಡುವ ವಿದ್ಯಾರ್ಥಿಗಳು, ರೈತರು ಮತ್ತು ಕುಟುಂಬಗಳ ಬರಹಗಳು.",
    "blogs.donees.empty": "ಇನ್ನೂ ಪಡೆದವರ ಬ್ಲಾಗ್ ಬರಹಗಳಿಲ್ಲ.",
    "blogs.related": "ಇತರ ಬರಹಗಳು",

    "about.kicker": "ನಮ್ಮ ಬಗ್ಗೆ",
    "about.title": "ಭೂಮಿ ಸೇವಾ ಬಗ್ಗೆ",
    "about.lede":
      "ಭೂಮಿ ಸೇವಾ ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುವ ಸ್ವಯಂಸೇವಕರ ಸಾಮಾಜಿಕ ಉಪಕ್ರಮ. ಇದು ಶಿಕ್ಷಣ ಬೆಂಬಲ, ರೈತ ತರಬೇತಿ ಮತ್ತು ದೇಸಿ ಹಸು ದಾನ, ಮತ್ತು ಮಕ್ಕಳ ಮನೆಗಳಿಗೆ ಪ್ರಾಯೋಗಿಕ ಸಹಾಯ ನಡೆಸುತ್ತದೆ.",
    "about.mission": "ಧ್ಯೇಯ",
    "about.vision": "ದೃಷ್ಟಿ",
    "about.team": "ಜನರು",
    "about.team.lede":
      "ಭೂಮಿ ಸೇವಾವನ್ನು ಸ್ವಯಂಸೇವಕರು ಮತ್ತು ಸಲಹೆಗಾರರು ನಡೆಸುತ್ತಾರೆ; ಅವರು ಸಂಸ್ಥೆಯ ಹೊರಗೆಯೂ ಕೆಲಸ ಮಾಡುತ್ತಾರೆ ಮತ್ತು ಬದುಕುತ್ತಾರೆ.",
    "about.community": "ನಮ್ಮ ಸ್ವಯಂಸೇವಕರು",
    "about.community.body":
      "ಭೂಮಿ ಸೇವಾದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪಾಠ ಮಾಡುವ, ತರಬೇತಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ಸ್ವಯಂಸೇವಕರ ಗುಂಪಿದೆ. ಜೊತೆಗೆ ವಿವಿಧ ಉಪಕ್ರಮಗಳಿಗೆ ದೇಣಿಗೆ ನೀಡುವ ಸುಮಾರು 95–110 ಸ್ವಯಂಸೇವಕರೂ ಇದ್ದಾರೆ.",
    "about.disclaimer":
      "ಈ ಪುಟವನ್ನು ನಿಖರವಾಗಿ ಇಟ್ಟುಕೊಳ್ಳಲು ನಾವು ಪ್ರಯತ್ನಿಸುತ್ತೇವೆ. ಏನಾದರೂ ಸಣ್ಣ ಪ್ರಮಾಣದ್ದಾಗಿದ್ದರೆ, ಅಥವಾ ಒಮ್ಮೆ ಮಾತ್ರ ಮಾಡಿದ್ದಾಗಿದ್ದರೆ, ಅದನ್ನು ನಾವು ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳುತ್ತೇವೆ.",

    "involved.kicker": "ಭಾಗಿಯಾಗಿ",
    "involved.title": "ಭಾಗಿಯಾಗಿ",
    "involved.lede":
      "ನೀವು ಪಾಠ ಮಾಡಬಹುದು, ಮಾರ್ಗದರ್ಶನ ನೀಡಬಹುದು, ಸಂಯೋಜನೆ ಮಾಡಬಹುದು, ವಸ್ತುಗಳನ್ನು ನೀಡಬಹುದು, ಅಥವಾ ಒಂದು ನಿರ್ದಿಷ್ಟ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಹಣ ನೀಡಬಹುದು. ಇದರ ಪ್ರತಿಯೊಂದು ಭಾಗವೂ ಒಬ್ಬ ವಿದ್ಯಾರ್ಥಿ, ರೈತ ಅಥವಾ ಮಗುವನ್ನು ತಲುಪುತ್ತದೆ.",
    "involved.volunteer.title": "ಸ್ವಯಂಸೇವೆ",
    "involved.volunteer.body":
      "ಆನ್‌ಲೈನ್ ಪಾಠ, ಮತ್ತು ವಿವಿಧ ಉಪಕ್ರಮಗಳಿಗೆ ಆನ್‌ಲೈನ್ ಅಥವಾ ಸ್ಥಳೀಯ ಸಂಯೋಜನೆಯಲ್ಲಿ ಸ್ವಯಂಸೇವೆ ಮಾಡುವ ಅವಕಾಶಗಳಿವೆ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    "involved.goods.title": "ವಸ್ತುಗಳ ದಾನ",
    "involved.goods.body":
      "ನಾವು ಬೆಂಬಲಿಸುವ ಮಕ್ಕಳ ಮನೆಗಳಿಗೆ ಲ್ಯಾಪ್‌ಟಾಪ್, ಸೈಕಲ್, ಹಳೆಯ ಬಟ್ಟೆ, ಪಾದರಕ್ಷೆ, ಲೇಖನ ಸಾಮಗ್ರಿ, ಪೀಠೋಪಕರಣ ಮತ್ತು ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್‌ಗಳ ಅಗತ್ಯವಿದೆ. ನಿಮ್ಮ ಬಳಿ ಏನಿದೆ ಎಂದು ಹೇಳಿ; ಅದನ್ನು ಒಂದು ಅಗತ್ಯಕ್ಕೆ ಹೊಂದಿಸುತ್ತೇವೆ.",
    "involved.give.title": "ಹಣ ನೀಡಿ",
    "involved.give.body":
      "ಶಿಕ್ಷಣ, ರೈತ ಬೆಂಬಲ, ಒಂದು ದೇಸಿ ಹಸು ಅಥವಾ ಒಂದು ಅನಾಥಾಶ್ರಮದ ಊಟಕ್ಕೆ ನೆರವಾಗಿ. ಹಣ ವರ್ಗಾಯಿಸುವಾಗ ಉದ್ದೇಶವನ್ನು ಸೇರಿಸಬಹುದು.",
    "involved.follow.title": "ನಮ್ಮೊಂದಿಗೆ ಇರಿ",
    "involved.follow.body":
      "ಹೊಸ ಕೆಲಸಗಳ ಮಾಹಿತಿಗಾಗಿ ಭೂಮಿ ಸೇವಾ ವಾಟ್ಸಾಪ್ ಗುಂಪಿಗೆ ಸೇರಿ ಅಥವಾ ಫೇಸ್‌ಬುಕ್‌ನಲ್ಲಿ ನಮಗೆ ಬೆಂಬಲ ನೀಡಿ.",

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
    "form.invalidEmail": "ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ.",
    "form.orContact": "ಅಫಾರ್ಮ್ ಬಳಸಲು ಇಷ್ಟವಿಲ್ಲವೇ?",

    "donate.kicker": "ದೇಣಿಗೆ",
    "donate.title": "ಭೂಮಿ ಸೇವಾಗೆ ದೇಣಿಗೆ",
    "donate.lede":
      "ನಿಮ್ಮ ದೇಣಿಗೆ ಒಂದು ನಿರ್ದಿಷ್ಟ ಉದ್ದೇಶಕ್ಕೆ ಬಳಕೆಯಾಗಬೇಕೆಂದಿದ್ದರೆ, ಹಣ ವರ್ಗಾಯಿಸುವಾಗ CowDonation / Education / FarmersSupport / OrphanageMeal / Any ಎಂದು ಕಾಮೆಂಟ್‌ನಲ್ಲಿ ಸೇರಿಸಿ.",
    "donate.cause": "ಉದ್ದೇಶ ಆರಿಸಿ",
    "donate.amount": "ಮೊತ್ತ",
    "donate.upi": "ಯುಪಿಐ ಐಡಿ",
    "donate.copy": "ನಕಲಿಸಿ",
    "donate.copied": "ನಕಲಾಗಿದೆ",
    "donate.qr": "ಕ್ಯೂಆರ್ ಕೋಡ್",
    "donate.step1": "ಒಂದು ಉದ್ದೇಶ ಮತ್ತು ಮೊತ್ತ ಆರಿಸಿ",
    "donate.step2": "ಯುಪಿಐ, ಪೇಟಿಎಂ ಅಥವಾ ಗೂಗಲ್ ಪೇ ಮೂಲಕ ವರ್ಗಾಯಿಸಿ",
    "donate.step3": "ದೃಢೀಕರಣವನ್ನು ನಮಗೆ ಕಳುಹಿಸಿ",
    "donate.confirm.title": "ವರ್ಗಾವಣೆಯ ನಂತರ",
    "donate.confirm.body":
      "ನಿಮ್ಮ ವರ್ಗಾವಣೆಯ ದೃಢೀಕರಣವನ್ನು ಭೂಮಿ ಸೇವಾಗೆ (+91 9900103178) ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಕಳುಹಿಸಿ ಪಡೆಯಬಹುದು, ಅಥವಾ bhoomiseva.org@gmail.com ಗೆ ಇಮೇಲ್ ಮಾಡಬಹುದು. ಪ್ರತಿ ಕೊಡುಗೆಯನ್ನೂ ಹೆಸರು ಮತ್ತು ಉದ್ದೇಶದೊಂದಿಗೆ ದಾಖಲಿಸುತ್ತೇವೆ.",
    "donate.unverified":
      "ಕೆಳಗಿನ ಪಾವತಿ ವಿವರಗಳು ಇನ್ನೂ ಜಾರಿಯಲ್ಲಿವೆಯೇ ಎಂದು ನಾವು ದೃಢಪಡಿಸುತ್ತಿದ್ದೇವೆ. ಹಣ ವರ್ಗಾಯಿಸುವ ಮೊದಲು ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ, ಅಥವಾ ಇತ್ತೀಚಿನ ವಿವರಗಳನ್ನು ಕೇಳಿ.",
    "donate.otherMethods": "ಪಾವತಿಸಲು ಇತರ ದಾರಿಗಳು",
    "donate.causeNote": "ಸರಿಯಾಗಿ ಹಂಚಲು ಪಾವತಿ ಕಾಮೆಂಟ್‌ನಲ್ಲಿ ಉದ್ದೇಶವನ್ನು ಸೇರಿಸಿ.",
    "donate.qrPending": "ಪಾವತಿ ಕ್ಯೂಆರ್ ತಾತ್ಕಾಲಿಕ — ಪ್ರಕಟಣೆಗೆ ಮೊದಲು ಇತ್ತೀಚಿನ ಕ್ಯೂಆರ್ ಸೇರಿಸಿ.",

    "cause.education": "ಶಿಕ್ಷಣ",
    "cause.farmers": "ರೈತ ಬೆಂಬಲ",
    "cause.cow": "ಹಸು ದಾನ",
    "cause.children": "ಅನಾಥಾಶ್ರಮದ ಊಟ",
    "cause.any": "ಅಗತ್ಯವಿರುವಲ್ಲಿ ಬಳಸಿ",

    "contact.kicker": "ಸಂಪರ್ಕ",
    "contact.title": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
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

    "footer.contact": "ಸಂಪರ್ಕ",
    "footer.explore": "ಅನ್ವೇಷಿಸಿ",
    "footer.follow": "ಅನುಸರಿಸಿ",
    "footer.legal": "CWSL-1.0 ಅಡಿಯಲ್ಲಿ ಮೂಲ ಲಭ್ಯ",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
