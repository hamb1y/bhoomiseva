import type { Program } from "./types";

export const programs: Program[] = [
  {
    id: "education",
    accent: "education",
    kicker: { en: "Education", kn: "ಶಿಕ್ಷಣ" },
    title: {
      en: "Helping students stay in school and move forward",
      kn: "ವಿದ್ಯಾರ್ಥಿಗಳು ಶಾಲೆಯಲ್ಲಿ ಉಳಿದು ಮುಂದೆ ಸಾಗಲು ನೆರವು",
    },
    summary: {
      en: "Scholarships and education fees, free online tutoring, JNV entrance coaching, mentoring and guidance toward external scholarship opportunities.",
      kn: "ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಶಿಕ್ಷಣ ಶುಲ್ಕ, ಉಚಿತ ಆನ್‌ಲೈನ್ ಪಾಠ, ಜೆಎನ್‌ವಿ ಪ್ರವೇಶ ತರಬೇತಿ, ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಹೊರಗಿನ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅವಕಾಶಗಳ ಬಗ್ಗೆ ದಾರಿ ತೋರಿಸುವುದು.",
    },
    lede: {
      en: "We identify rural students who are doing well and whose families are carrying a real financial load, then help them stay in the classroom. Support is often recurring: the same student may be helped year after year until they finish their education.",
      kn: "ಚೆನ್ನಾಗಿ ಓದುತ್ತಿರುವ, ಆದರೆ ಕುಟುಂಬದ ಮೇಲೆ ಆರ್ಥಿಕ ಹೊರೆ ಇರುವ ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಗುರುತಿಸಿ, ಅವರು ಶಾಲೆಯಲ್ಲಿ ಮುಂದುವರಿಯಲು ನೆರವಾಗುತ್ತೇವೆ. ಈ ಬೆಂಬಲ ಹಲವು ಬಾರಿ ಮರುಕಳಿಸುತ್ತದೆ — ಒಬ್ಬ ವಿದ್ಯಾರ್ಥಿಯ ಶಿಕ್ಷಣ ಮುಗಿಯುವವರೆಗೆ ವರ್ಷದಿಂದ ವರ್ಷ ನೆರವು ಸಿಗಬಹುದು.",
    },
    activities: [
      {
        title: { en: "Scholarships and school fees", kn: "ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಶಾಲಾ ಶುಲ್ಕ" },
        body: {
          en: "Deserving rural students are identified for scholarship and school-fee assistance. Where the need continues, so does the support.",
          kn: "ಅರ್ಹ ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಶಾಲಾ ಶುಲ್ಕ ಸಹಾಯ ನೀಡಲಾಗುತ್ತದೆ. ಅಗತ್ಯ ಮುಂದುವರಿದರೆ, ಬೆಂಬಲವೂ ಮುಂದುವರಿಯುತ್ತದೆ.",
        },
      },
      {
        title: {
          en: "Free online tutoring and mentoring",
          kn: "ಉಚಿತ ಆನ್‌ಲೈನ್ ಪಾಠ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ",
        },
        body: {
          en: "Volunteers teach and mentor students online, including subject-specific help such as the Chemistry tuition one student received alongside fee support.",
          kn: "ಸ್ವಯಂಸೇವಕರು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಪಾಠ ಮಾಡುತ್ತಾರೆ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾರೆ. ಒಬ್ಬ ವಿದ್ಯಾರ್ಥಿಗೆ ಶುಲ್ಕ ಸಹಾಯದ ಜೊತೆಗೆ ಸಿಗುವ ರಸಾಯನಶಾಸ್ತ್ರದ ಪಾಠದಂತಹ ವಿಷಯ ಆಧಾರಿತ ನೆರವೂ ಇದರಲ್ಲಿ ಸೇರಿದೆ.",
        },
      },
      {
        title: {
          en: "JNV Class 6 entrance coaching",
          kn: "ಜೆಎನ್‌ವಿ 6ನೇ ತರಗತಿ ಪ್ರವೇಶ ಪರೀಕ್ಷೆಯ ತರಬೇತಿ",
        },
        body: {
          en: "Free online coaching for Class 5 students preparing for the Jawahar Navodaya Vidyalaya Class 6 admission examination, drawn from different schools.",
          kn: "ಜವಾಹರ್ ನವೋದಯ ವಿದ್ಯಾಲಯದ 6ನೇ ತರಗತಿ ಪ್ರವೇಶ ಪರೀಕ್ಷೆಗೆ ಸಿದ್ಧರಾಗುತ್ತಿರುವ 5ನೇ ತರಗತಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಚಿತ ಆನ್‌ಲೈನ್ ತರಬೇತಿ, ಬೇರೆ ಬೇರೆ ಶಾಲೆಗಳಿಂದ.",
        },
      },
      {
        title: {
          en: "Guidance on external scholarships",
          kn: "ಹೊರಗಿನ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳ ಬಗ್ಗೆ ಮಾರ್ಗದರ್ಶನ",
        },
        body: {
          en: "We help eligible students find and apply for scholarships offered by other organisations, not only support from Bhoomi Seva itself.",
          kn: "ಭೂಮಿ ಸೇವಾದ ಬೆಂಬಲ ಮಾತ್ರವಲ್ಲದೆ, ಬೇರೆ ಸಂಸ್ಥೆಗಳು ನೀಡುವ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿಗಳು ಹುಡುಕಿ ಅರ್ಜಿ ಹಾಕಲು ನೆರವಾಗುತ್ತೇವೆ.",
        },
      },
      {
        title: { en: "Career and internship guidance", kn: "ವೃತ್ತಿ ಮತ್ತು ಇಂಟರ್ನ್‌ಶಿಪ್ ಮಾರ್ಗದರ್ಶನ" },
        body: {
          en: "For some students, help extends beyond fees into academic and career guidance, including assistance in finding a course-related internship.",
          kn: "ಕೆಲವು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಹಾಯ ಶುಲ್ಕದ ಆಚೆಗೂ ಹೋಗುತ್ತದೆ — ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ, ಮತ್ತು ಕೋರ್ಸ್‌ಗೆ ಸಂಬಂಧಿಸಿದ ಇಂಟರ್ನ್‌ಶಿಪ್ ಹುಡುಕಲು ನೆರವು ಸೇರಿದಂತೆ.",
        },
      },
    ],
  },
  {
    id: "farmers",
    accent: "farmers",
    kicker: { en: "Farmers & Environment", kn: "ರೈತರು ಮತ್ತು ಪರಿಸರ" },
    title: {
      en: "Stronger farms, healthier soil, resilient livelihoods",
      kn: "ಬಲವಾದ ಜಮೀನು, ಆರೋಗ್ಯಕರ ಮಣ್ಣು, ಸ್ಥಿರ ಜೀವನೋಪಾಯ",
    },
    summary: {
      en: "Training and practical guidance in natural and organic farming and agroforestry, plus desi cows for selected marginal farmers.",
      kn: "ನೈಸರ್ಗಿಕ ಮತ್ತು ಸಾವಯವ ಕೃಷಿ ಹಾಗೂ ಕೃಷಿ ಅರಣ್ಯದಲ್ಲಿ ತರಬೇತಿ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಮಾರ್ಗದರ್ಶನ, ಜೊತೆಗೆ ಆಯ್ದ ಸಣ್ಣ ರೈತರಿಗೆ ದೇಸಿ ಹಸುಗಳು.",
    },
    lede: {
      en: "Many farmers around us are tied to purchased chemical inputs and thin margins. We work with those who want to move toward natural or organic methods and agroforestry, using examples from farmers who have already made the change. This work began around Kanakapura.",
      kn: "ನಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ಅನೇಕ ರೈತರು ಖರೀದಿಸಬೇಕಾದ ರಾಸಾಯನಿಕ ಒಳಸುರಿಗಳಿಗೆ ಮತ್ತು ಕಡಿಮೆ ಲಾಭಕ್ಕೆ ಸಿಲುಕಿದ್ದಾರೆ. ನೈಸರ್ಗಿಕ ಅಥವಾ ಸಾವಯವ ಪದ್ಧತಿ ಹಾಗೂ ಕೃಷಿ ಅರಣ್ಯದತ್ತ ಸಾಗಲು ಇಚ್ಛಿಸುವವರೊಂದಿಗೆ ನಾವು ಕೆಲಸ ಮಾಡುತ್ತೇವೆ — ಈಗಾಗಲೇ ಬದಲಾವಣೆ ಮಾಡಿಕೊಂಡ ರೈತರ ಉದಾಹರಣೆಗಳನ್ನು ಬಳಸಿ. ಈ ಕೆಲಸ ಕನಕಪುರದ ಸುತ್ತಮುತ್ತ ಪ್ರಾರಂಭವಾಯಿತು.",
    },
    activities: [
      {
        title: {
          en: "Natural and organic farming training",
          kn: "ನೈಸರ್ಗಿಕ ಮತ್ತು ಸಾವಯವ ಕೃಷಿ ತರಬೇತಿ",
        },
        body: {
          en: "Awareness sessions and hands-on training on natural and organic methods, including why soil organic matter and soil biology matter.",
          kn: "ನೈಸರ್ಗಿಕ ಮತ್ತು ಸಾವಯವ ಪದ್ಧತಿಗಳ ಬಗ್ಗೆ ಅರಿವು ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ತರಬೇತಿ — ಮಣ್ಣಿನ ಸಾವಯವ ಅಂಶ ಮತ್ತು ಮಣ್ಣಿನ ಜೀವಿಗಳ ಮಹತ್ವ ಸೇರಿದಂತೆ.",
        },
      },
      {
        title: { en: "Agroforestry", kn: "ಕೃಷಿ ಅರಣ್ಯ" },
        body: {
          en: "Promoting tree-based farming that diversifies income and protects soil over the long term, rather than relying on a single crop.",
          kn: "ಒಂದೇ ಬೆಳೆಗೆ ಅವಲಂಬಿತವಾಗದೆ, ಆದಾಯವನ್ನು ವೈವಿಧ್ಯಗೊಳಿಸುವ ಮತ್ತು ಮಣ್ಣನ್ನು ದೀರ್ಘಕಾಲ ರಕ್ಷಿಸುವ ಮರ ಆಧಾರಿತ ಕೃಷಿಯನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುವುದು.",
        },
      },
      {
        title: { en: "Moving away from chemical inputs", kn: "ರಾಸಾಯನಿಕ ಒಳಸುರಿಗಳಿಂದ ದೂರ ಸರಿಯುವುದು" },
        body: {
          en: "Practical guidance for farmers who want to reduce their dependence on purchased chemical fertilisers and build farm-made inputs instead.",
          kn: "ಖರೀದಿಸಿದ ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಗಳ ಮೇಲಿನ ಅವಲಂಬನೆ ಕಡಿಮೆ ಮಾಡಿಕೊಂಡು, ತಮ್ಮ ಜಮೀನಿನಲ್ಲೇ ತಯಾರಿಸುವ ಒಳಸುರಿಗಳನ್ನು ಬಳಸಲು ಇಚ್ಛಿಸುವ ರೈತರಿಗೆ ಪ್ರಾಯೋಗಿಕ ಮಾರ್ಗದರ್ಶನ.",
        },
      },
      {
        title: { en: "Desi cow donation", kn: "ದೇಸಿ ಹಸು ದಾನ" },
        body: {
          en: "We donate desi cows to selected marginal farmers who want to practise natural farming. Cow dung and cow urine are used in several Indian natural-farming preparations, and milk can add household income.",
          kn: "ನೈಸರ್ಗಿಕ ಕೃಷಿ ಮಾಡಲು ಇಚ್ಛಿಸುವ ಆಯ್ದ ಸಣ್ಣ ರೈತರಿಗೆ ನಾವು ದೇಸಿ ಹಸುಗಳನ್ನು ದಾನ ಮಾಡುತ್ತೇವೆ. ಭಾರತದ ಹಲವು ನೈಸರ್ಗಿಕ ಕೃಷಿ ತಯಾರಿಕೆಗಳಲ್ಲಿ ಸೆಗಣಿ ಮತ್ತು ಗಂಜಲ ಬಳಕೆಯಾಗುತ್ತವೆ; ಜೊತೆಗೆ ಹಾಲು ಕುಟುಂಬದ ಆದಾಯವನ್ನೂ ಸೇರಿಸಬಹುದು.",
        },
      },
      {
        title: { en: "Learning from model farmers", kn: "ಮಾದರಿ ರೈತರಿಂದ ಕಲಿಕೆ" },
        body: {
          en: "We share examples, videos and information from farmers who have already changed their methods, so the argument rests on neighbours' experience rather than promises.",
          kn: "ಈಗಾಗಲೇ ಪದ್ಧತಿ ಬದಲಿಸಿಕೊಂಡ ರೈತರ ಉದಾಹರಣೆ, ವೀಡಿಯೊ ಮತ್ತು ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತೇವೆ — ಆದ್ದರಿಂದ ವಾದವು ಭರವಸೆಗಳ ಮೇಲಲ್ಲ, ನೆರೆಹೊರೆಯವರ ಅನುಭವದ ಮೇಲೆ ನಿಲ್ಲುತ್ತದೆ.",
        },
      },
    ],
  },
  {
    id: "children",
    accent: "children",
    kicker: { en: "Children & Community", kn: "ಮಕ್ಕಳು ಮತ್ತು ಸಮುದಾಯ" },
    title: {
      en: "Practical support where it is needed",
      kn: "ಅಗತ್ಯವಿರುವಲ್ಲಿ ಪ್ರಾಯೋಗಿಕ ಬೆಂಬಲ",
    },
    summary: {
      en: "Meals, education expenses, laptops, bicycles, clothes, stationery, LPG cylinders, medical and emergency support through children's homes.",
      kn: "ಮಕ್ಕಳ ಮನೆಗಳ ಮೂಲಕ ಊಟ, ಶಿಕ್ಷಣ ವೆಚ್ಚ, ಲ್ಯಾಪ್‌ಟಾಪ್, ಸೈಕಲ್, ಬಟ್ಟೆ, ಲೇಖನ ಸಾಮಗ್ರಿ, ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್, ವೈದ್ಯಕೀಯ ಮತ್ತು ತುರ್ತು ಸಹಾಯ.",
    },
    lede: {
      en: "We support children's homes according to their practical needs rather than a fixed programme. The list below is what has actually been provided over time, in partnership with the homes themselves.",
      kn: "ನಾವು ಮಕ್ಕಳ ಮನೆಗಳಿಗೆ ನಿಗದಿತ ಕಾರ್ಯಕ್ರಮದ ಬದಲು ಅವರ ಪ್ರಾಯೋಗಿಕ ಅಗತ್ಯಗಳಿಗೆ ಅನುಸಾರ ಬೆಂಬಲ ನೀಡುತ್ತೇವೆ. ಕೆಳಗಿನ ಪಟ್ಟಿ ಕಾಲಕಾಲಕ್ಕೆ ನಿಜವಾಗಿ ನೀಡಿದ ಸಹಾಯ — ಮನೆಗಳೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ.",
    },
    activities: [
      {
        title: { en: "Meals", kn: "ಊಟ" },
        body: {
          en: "Sponsoring meals for children at supported homes, including a meal sponsored at Sri Krishnashraya during Balipadyami.",
          kn: "ಬೆಂಬಲಿತ ಮನೆಗಳ ಮಕ್ಕಳಿಗೆ ಊಟದ ಪ್ರಾಯೋಜಕತ್ವ — ಬಲಿಪಾಡ್ಯಮಿಯಂದು ಶ್ರೀ ಕೃಷ್ಣಾಶ್ರಯದಲ್ಲಿ ಪ್ರಾಯೋಜಿಸಿದ ಊಟ ಸೇರಿದಂತೆ.",
        },
      },
      {
        title: { en: "Education fees", kn: "ಶಿಕ್ಷಣ ಶುಲ್ಕ" },
        body: {
          en: "School and college fee assistance for children growing up in care.",
          kn: "ಆಶ್ರಯದಲ್ಲಿ ಬೆಳೆಯುವ ಮಕ್ಕಳಿಗೆ ಶಾಲಾ ಮತ್ತು ಕಾಲೇಜು ಶುಲ್ಕ ಸಹಾಯ.",
        },
      },
      {
        title: { en: "Laptops and bicycles", kn: "ಲ್ಯಾಪ್‌ಟಾಪ್ ಮತ್ತು ಸೈಕಲ್" },
        body: {
          en: "Laptops so children can take online classes, and bicycles for getting to school.",
          kn: "ಮಕ್ಕಳು ಆನ್‌ಲೈನ್ ತರಗತಿಗಳಿಗೆ ಸೇರಲು ಲ್ಯಾಪ್‌ಟಾಪ್, ಮತ್ತು ಶಾಲೆಗೆ ಹೋಗಿಬರಲು ಸೈಕಲ್.",
        },
      },
      {
        title: {
          en: "Clothing, footwear and stationery",
          kn: "ಬಟ್ಟೆ, ಪಾದರಕ್ಷೆ ಮತ್ತು ಲೇಖನ ಸಾಮಗ್ರಿ",
        },
        body: {
          en: "Used and new clothing, footwear, stationery and furniture as needs arise.",
          kn: "ಅಗತ್ಯ ಬಂದಂತೆ ಹಳೆಯ ಮತ್ತು ಹೊಸ ಬಟ್ಟೆ, ಪಾದರಕ್ಷೆ, ಲೇಖನ ಸಾಮಗ್ರಿ ಮತ್ತು ಪೀಠೋಪಕರಣ.",
        },
      },
      {
        title: { en: "LPG cylinders", kn: "ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್" },
        body: {
          en: "Support with cooking-gas cylinders for day-to-day running of the home.",
          kn: "ಮನೆಯ ದಿನನಿತ್ಯದ ನಿರ್ವಹಣೆಗೆ ಅಡುಗೆ ಅನಿಲ ಸಿಲಿಂಡರ್‌ಗಳಿಗೆ ಸಹಾಯ.",
        },
      },
      {
        title: { en: "Medical and emergency support", kn: "ವೈದ್ಯಕೀಯ ಮತ್ತು ತುರ್ತು ಸಹಾಯ" },
        body: {
          en: "Help with medical needs, emergencies and other basic requirements as they come up.",
          kn: "ವೈದ್ಯಕೀಯ ಅಗತ್ಯಗಳು, ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಳು ಮತ್ತು ಇತರ ಮೂಲಭೂತ ಅಗತ್ಯಗಳಿಗೆ ಸಹಾಯ.",
        },
      },
    ],
  },
];

export const programById = (id: string) => programs.find((p) => p.id === id);
