import type { Program } from "./types";

export const programs: Program[] = [
  {
    id: "education",
    accent: "education",
    kicker: { en: "Education", kn: "ಶಿಕ್ಷಣ" },
    title: { en: "Education", kn: "ಶಿಕ್ಷಣ" },
    summary: {
      en: "Scholarships and school fees for merit rural students, free online coaching for the JNV entrance exam and for Class 10, and guidance toward other scholarship opportunities.",
      kn: "ಮೆರಿಟ್ ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮತ್ತು ಶಾಲಾ ಶುಲ್ಕ, ಜೆಎನ್‌ವಿ ಪ್ರವೇಶ ಪರೀಕ್ಷೆ ಹಾಗೂ 10ನೇ ತರಗತಿಗೆ ಉಚಿತ ಆನ್‌ಲೈನ್ ತರಬೇತಿ, ಮತ್ತು ಇತರ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅವಕಾಶಗಳ ಬಗ್ಗೆ ಮಾರ್ಗದರ್ಶನ.",
    },
    lede: {
      en: "Bhoomi Seva identifies merit students in rural areas and supports their education with scholarships, fee payment, coaching and guidance. Scholarship support is meant to continue every year until the student completes their education, so that a family's financial situation does not end a child's schooling.",
      kn: "ಭೂಮಿ ಸೇವಾ ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳ ಮೆರಿಟ್ ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಗುರುತಿಸಿ, ವಿದ್ಯಾರ್ಥಿವೇತನ, ಶುಲ್ಕ ಪಾವತಿ, ತರಬೇತಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನದ ಮೂಲಕ ಅವರ ಶಿಕ್ಷಣಕ್ಕೆ ನೆರವಾಗುತ್ತದೆ. ವಿದ್ಯಾರ್ಥಿ ತನ್ನ ಶಿಕ್ಷಣ ಪೂರ್ಣಗೊಳಿಸುವವರೆಗೆ ಪ್ರತಿ ವರ್ಷ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮುಂದುವರಿಯಬೇಕೆಂಬುದು ಉದ್ದೇಶ — ಕುಟುಂಬದ ಆರ್ಥಿಕ ಪರಿಸ್ಥಿತಿ ಮಗುವಿನ ಓದಿಗೆ ಅಂತ್ಯ ಹಾಡಬಾರದು.",
    },
    activities: [
      {
        title: {
          en: "Scholarships for merit rural students",
          kn: "ಮೆರಿಟ್ ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ",
        },
        body: {
          en: "Merit students with aggregate marks of 80% and above have been identified by Bhoomi Seva for scholarships. They are facilitated with the scholarship every year until they complete their education. The 80% figure is the benchmark used when students were identified; selection today also takes individual circumstances into account.",
          kn: "80% ಮತ್ತು ಅದಕ್ಕಿಂತ ಹೆಚ್ಚು ಒಟ್ಟು ಅಂಕ ಪಡೆದ ಮೆರಿಟ್ ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಭೂಮಿ ಸೇವಾ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕಾಗಿ ಗುರುತಿಸಿದೆ. ಅವರ ಶಿಕ್ಷಣ ಪೂರ್ಣಗೊಳ್ಳುವವರೆಗೆ ಪ್ರತಿ ವರ್ಷ ವಿದ್ಯಾರ್ಥಿವೇತನ ನೀಡಲಾಗುತ್ತದೆ. 80% ಎಂಬುದು ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಗುರುತಿಸಿದಾಗ ಬಳಸಿದ ಮಾನದಂಡ; ಇಂದು ಆಯ್ಕೆಯಲ್ಲಿ ವೈಯಕ್ತಿಕ ಪರಿಸ್ಥಿತಿಯನ್ನೂ ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.",
        },
      },
      {
        title: {
          en: "Free online coaching for 10th grade students",
          kn: "10ನೇ ತರಗತಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಚಿತ ಆನ್‌ಲೈನ್ ತರಬೇತಿ",
        },
        body: {
          en: "Online coaching for rural students in Class 10. It began with one rural girl student and continues. One student also received subject-specific online tuition in Chemistry.",
          kn: "ಗ್ರಾಮೀಣ 10ನೇ ತರಗತಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಆನ್‌ಲೈನ್ ತರಬೇತಿ. ಒಬ್ಬ ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿನಿಯಿಂದ ಪ್ರಾರಂಭವಾಯಿತು, ಮತ್ತು ಮುಂದುವರಿಯುತ್ತಿದೆ. ಒಬ್ಬ ವಿದ್ಯಾರ್ಥಿಗೆ ರಸಾಯನಶಾಸ್ತ್ರದ ವಿಷಯ ಆಧಾರಿತ ಆನ್‌ಲೈನ್ ಪಾಠವನ್ನೂ ನೀಡಲಾಗಿದೆ.",
        },
      },
      {
        title: {
          en: "JNV Class 6 entrance coaching",
          kn: "ಜೆಎನ್‌ವಿ 6ನೇ ತರಗತಿ ಪ್ರವೇಶ ಪರೀಕ್ಷೆಯ ತರಬೇತಿ",
        },
        body: {
          en: "Coaching selected students from Class 5 for the Jawahar Navodaya Vidyalaya Class 6 admission test. It is open to all Class 5 students from all schools, and classes are held online.",
          kn: "ಜವಾಹರ್ ನವೋದಯ ವಿದ್ಯಾಲಯದ 6ನೇ ತರಗತಿ ಪ್ರವೇಶ ಪರೀಕ್ಷೆಗೆ 5ನೇ ತರಗತಿಯ ಆಯ್ದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ತರಬೇತಿ. ಎಲ್ಲಾ ಶಾಲೆಗಳ 5ನೇ ತರಗತಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೂ ಮುಕ್ತ, ತರಗತಿಗಳು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ.",
        },
      },
      {
        title: { en: "External scholarship guidance", kn: "ಹೊರಗಿನ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳ ಮಾರ್ಗದರ್ಶನ" },
        body: {
          en: "Guiding rural students toward the various scholarship opportunities available from other organisations, in addition to the support Bhoomi Seva provides directly.",
          kn: "ಭೂಮಿ ಸೇವಾ ನೇರವಾಗಿ ನೀಡುವ ಬೆಂಬಲದ ಜೊತೆಗೆ, ಬೇರೆ ಸಂಸ್ಥೆಗಳು ನೀಡುವ ವಿವಿಧ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅವಕಾಶಗಳತ್ತ ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮಾರ್ಗದರ್ಶನ.",
        },
      },
    ],
  },
  {
    id: "farmers",
    accent: "farmers",
    kicker: { en: "Farmers & Environment", kn: "ರೈತರು ಮತ್ತು ಪರಿಸರ" },
    title: { en: "Farmers & Environment", kn: "ರೈತರು ಮತ್ತು ಪರಿಸರ" },
    summary: {
      en: "Training and awareness in natural and organic farming and agroforestry, and desi cow donations to marginal farmers who want to make the switch.",
      kn: "ನೈಸರ್ಗಿಕ ಮತ್ತು ಸಾವಯವ ಕೃಷಿ ಹಾಗೂ ಕೃಷಿ ಅರಣ್ಯದಲ್ಲಿ ತರಬೇತಿ ಮತ್ತು ಅರಿವು, ಮತ್ತು ಬದಲಾವಣೆ ಬಯಸುವ ಸಣ್ಣ ರೈತರಿಗೆ ದೇಸಿ ಹಸು ದಾನ.",
    },
    lede: {
      en: "Farming is one of the most important occupations there is: every meal begins in a farmer's field. Yet many farmers are in distress, and some have taken their own lives because they could not sustain a livelihood. Soil fertility has also been depleted by the long-term use of chemical fertilisers. Bhoomi Seva works with farmers who want to move to agroforestry and natural or organic farming, which the organisation has found to be more lucrative over time. This work started in the Kanakapura area.",
      kn: "ಕೃಷಿ ಅತ್ಯಂತ ಮುಖ್ಯವಾದ ವೃತ್ತಿಗಳಲ್ಲಿ ಒಂದು: ಪ್ರತಿ ಊಟವೂ ರೈತನ ಹೊಲದಲ್ಲಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ. ಆದರೂ ಅನೇಕ ರೈತರು ಸಂಕಷ್ಟದಲ್ಲಿದ್ದಾರೆ; ಜೀವನೋಪಾಯ ನಡೆಸಲಾಗದೆ ಕೆಲವರು ಆತ್ಮಹತ್ಯೆ ಮಾಡಿಕೊಂಡಿದ್ದಾರೆ. ದೀರ್ಘಕಾಲದ ರಾಸಾಯನಿಕ ಗೊಬ್ಬರದ ಬಳಕೆಯಿಂದ ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯೂ ಕುಸಿದಿದೆ. ಕೃಷಿ ಅರಣ್ಯ ಹಾಗೂ ನೈಸರ್ಗಿಕ/ಸಾವಯವ ಕೃಷಿಯತ್ತ ಸಾಗಲು ಇಚ್ಛಿಸುವ ರೈತರೊಂದಿಗೆ ಭೂಮಿ ಸೇವಾ ಕೆಲಸ ಮಾಡುತ್ತದೆ — ಇವು ಕಾಲಕ್ರಮೇಣ ಹೆಚ್ಚು ಲಾಭದಾಯಕ ಎಂದು ಸಂಸ್ಥೆ ಕಂಡುಕೊಂಡಿದೆ. ಈ ಕೆಲಸ ಕನಕಪುರ ಪ್ರದೇಶದಲ್ಲಿ ಪ್ರಾರಂಭವಾಯಿತು.",
    },
    activities: [
      {
        title: {
          en: "Farmer training in natural farming and agroforestry",
          kn: "ನೈಸರ್ಗಿಕ ಕೃಷಿ ಮತ್ತು ಕೃಷಿ ಅರಣ್ಯದಲ್ಲಿ ರೈತ ತರಬೇತಿ",
        },
        body: {
          en: "Training and awareness sessions for farmers. Training covers the benefits of organic farming and agroforestry, how continuous use of chemical fertilisers reduces yield over a period of time, how natural farming practised for more than a couple of years can produce yields above those from chemical fertilisers, and practical guidance on how to make the switch. Sessions use videos and information from model farmers who have successfully made the change and describe how their lives changed afterwards.",
          kn: "ರೈತರಿಗೆ ತರಬೇತಿ ಮತ್ತು ಅರಿವಿನ ಕಾರ್ಯಕ್ರಮಗಳು. ಸಾವಯವ ಕೃಷಿ ಮತ್ತು ಕೃಷಿ ಅರಣ್ಯದ ಪ್ರಯೋಜನಗಳು, ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಗಳ ನಿರಂತರ ಬಳಕೆಯಿಂದ ಕಾಲಕ್ರಮೇಣ ಇಳುವರಿ ಕಡಿಮೆಯಾಗುವುದು, ಎರಡು ವರ್ಷಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ನೈಸರ್ಗಿಕ ಕೃಷಿ ಮಾಡಿದರೆ ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಕ್ಕಿಂತ ಹೆಚ್ಚು ಇಳುವರಿ ಸಿಗಬಹುದು ಎಂಬುದು, ಮತ್ತು ಬದಲಾವಣೆ ಮಾಡಿಕೊಳ್ಳುವ ಪ್ರಾಯೋಗಿಕ ಮಾರ್ಗದರ್ಶನ ಇವುಗಳನ್ನು ತರಬೇತಿ ಒಳಗೊಂಡಿದೆ. ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾವಣೆ ಮಾಡಿಕೊಂಡ ಮಾದರಿ ರೈತರ ವೀಡಿಯೊ ಮತ್ತು ಮಾಹಿತಿಯನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.",
        },
      },
      {
        title: { en: "Farmer training events", kn: "ರೈತ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮಗಳು" },
        body: {
          en: "Training has been organised in the Kanakapura area with the intention of holding it each year in July or August. A session was held in July 2023 at Chirantana School, Kabbalu, Kanakapura.",
          kn: "ಕನಕಪುರ ಪ್ರದೇಶದಲ್ಲಿ ಪ್ರತಿ ವರ್ಷ ಜುಲೈ ಅಥವಾ ಆಗಸ್ಟ್‌ನಲ್ಲಿ ತರಬೇತಿ ನಡೆಸುವ ಉದ್ದೇಶದಿಂದ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸಲಾಗಿದೆ. ಜುಲೈ 2023ರಲ್ಲಿ ಕಬ್ಬಾಳಿನ ಚಿರಂತನ ಶಾಲೆಯಲ್ಲಿ ಒಂದು ಕಾರ್ಯಕ್ರಮ ನಡೆಯಿತು.",
        },
      },
      {
        title: { en: "Desi cow donation", kn: "ದೇಸಿ ಹಸು ದಾನ" },
        body: {
          en: "Desi cows are needed by farmers who want to practise natural farming, so Bhoomi Seva donates desi cows to marginal farmers who do not have one. Cow dung and cow urine are used in farm-made natural-farming preparations, and selling milk gives the family additional income.",
          kn: "ನೈಸರ್ಗಿಕ ಕೃಷಿ ಮಾಡಲು ಬಯಸುವ ರೈತರಿಗೆ ದೇಸಿ ಹಸು ಬೇಕು; ಆದ್ದರಿಂದ ಹಸು ಇಲ್ಲದ ಸಣ್ಣ ರೈತರಿಗೆ ಭೂಮಿ ಸೇವಾ ದೇಸಿ ಹಸುಗಳನ್ನು ದಾನ ಮಾಡುತ್ತದೆ. ಸೆಗಣಿ ಮತ್ತು ಗಂಜಲ ಜಮೀನಿನಲ್ಲೇ ತಯಾರಿಸುವ ನೈಸರ್ಗಿಕ ಕೃಷಿ ತಯಾರಿಕೆಗಳಲ್ಲಿ ಬಳಕೆಯಾಗುತ್ತವೆ, ಮತ್ತು ಹಾಲು ಮಾರುವುದರಿಂದ ಕುಟುಂಬಕ್ಕೆ ಹೆಚ್ಚುವರಿ ಆದಾಯ ಸಿಗುತ್ತದೆ.",
        },
      },
      {
        title: { en: "Learning from model farmers", kn: "ಮಾದರಿ ರೈತರಿಂದ ಕಲಿಕೆ" },
        body: {
          en: "The organisation shares examples, videos and information from farmers who have already made the change, so that other farmers can see what actually happened on similar land.",
          kn: "ಈಗಾಗಲೇ ಬದಲಾವಣೆ ಮಾಡಿಕೊಂಡ ರೈತರ ಉದಾಹರಣೆ, ವೀಡಿಯೊ ಮತ್ತು ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ — ಇತರ ರೈತರಿಗೆ ತಮ್ಮಂತೆಯೇ ಇರುವ ಜಮೀನಿನಲ್ಲಿ ನಿಜವಾಗಿ ಏನಾಯಿತು ಎಂದು ತಿಳಿಯಲು.",
        },
      },
    ],
  },
  {
    id: "children",
    accent: "children",
    kicker: { en: "Children & Community", kn: "ಮಕ್ಕಳು ಮತ್ತು ಸಮುದಾಯ" },
    title: {
      en: "Orphanage and children's home support",
      kn: "ಅನಾಥಾಶ್ರಮ ಮತ್ತು ಮಕ್ಕಳ ಮನೆಗಳಿಗೆ ಬೆಂಬಲ",
    },
    summary: {
      en: "Meals, school and college fees, laptops, bicycles, clothing, stationery, furniture, LPG cylinders, medical and emergency support for children living in care.",
      kn: "ಆಶ್ರಯದಲ್ಲಿ ಬೆಳೆಯುವ ಮಕ್ಕಳಿಗೆ ಊಟ, ಶಾಲಾ ಮತ್ತು ಕಾಲೇಜು ಶುಲ್ಕ, ಲ್ಯಾಪ್‌ಟಾಪ್, ಸೈಕಲ್, ಬಟ್ಟೆ, ಲೇಖನ ಸಾಮಗ್ರಿ, ಪೀಠೋಪಕರಣ, ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್, ವೈದ್ಯಕೀಯ ಮತ್ತು ತುರ್ತು ಸಹಾಯ.",
    },
    lede: {
      en: "Bhoomi Seva supports children's homes according to their actual needs, rather than through a fixed programme. The support below has been given over time, in partnership with the homes themselves. A meal for the children can be sponsored for around ₹6,000.",
      kn: "ಭೂಮಿ ಸೇವಾ ಮಕ್ಕಳ ಮನೆಗಳಿಗೆ ನಿಗದಿತ ಕಾರ್ಯಕ್ರಮದ ಬದಲು ಅವರ ನಿಜವಾದ ಅಗತ್ಯಗಳಿಗೆ ಅನುಸಾರ ಬೆಂಬಲ ನೀಡುತ್ತದೆ. ಕೆಳಗಿನ ಸಹಾಯ ಕಾಲಕಾಲಕ್ಕೆ, ಮನೆಗಳೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ ನೀಡಲಾಗಿದೆ. ಮಕ್ಕಳಿಗೆ ಊಟವನ್ನು ಸುಮಾರು ₹6,000ಕ್ಕೆ ಪ್ರಾಯೋಜಿಸಬಹುದು.",
    },
    activities: [
      {
        title: { en: "Sponsor a meal — around ₹6,000", kn: "ಊಟದ ಪ್ರಾಯೋಜಕತ್ವ — ಸುಮಾರು ₹6,000" },
        body: {
          en: "A meal for the children of a home can be sponsored for around ₹6,000. A meal was sponsored at Sri Krishnashraya during Balipadyami.",
          kn: "ಒಂದು ಮನೆಯ ಮಕ್ಕಳಿಗೆ ಊಟವನ್ನು ಸುಮಾರು ₹6,000ಕ್ಕೆ ಪ್ರಾಯೋಜಿಸಬಹುದು. ಬಲಿಪಾಡ್ಯಮಿಯಂದು ಶ್ರೀ ಕೃಷ್ಣಾಶ್ರಯದಲ್ಲಿ ಊಟ ಪ್ರಾಯೋಜಿಸಲಾಗಿತ್ತು.",
        },
      },
      {
        title: { en: "School and college fees", kn: "ಶಾಲಾ ಮತ್ತು ಕಾಲೇಜು ಶುಲ್ಕ" },
        body: {
          en: "Fee support for the children's education, as and when the need arises.",
          kn: "ಅಗತ್ಯ ಬಂದಂತೆ ಮಕ್ಕಳ ಶಿಕ್ಷಣದ ಶುಲ್ಕಕ್ಕೆ ಸಹಾಯ.",
        },
      },
      {
        title: { en: "Laptops and bicycles", kn: "ಲ್ಯಾಪ್‌ಟಾಪ್ ಮತ್ತು ಸೈಕಲ್" },
        body: {
          en: "Laptops so that the children can attend online classes, and bicycles for getting to school.",
          kn: "ಮಕ್ಕಳು ಆನ್‌ಲೈನ್ ತರಗತಿಗಳಿಗೆ ಸೇರಲು ಲ್ಯಾಪ್‌ಟಾಪ್, ಮತ್ತು ಶಾಲೆಗೆ ಹೋಗಿಬರಲು ಸೈಕಲ್.",
        },
      },
      {
        title: {
          en: "Clothing, footwear and stationery",
          kn: "ಬಟ್ಟೆ, ಪಾದರಕ್ಷೆ ಮತ್ತು ಲೇಖನ ಸಾಮಗ್ರಿ",
        },
        body: {
          en: "Donations of used clothes, footwear, stationery and furniture.",
          kn: "ಹಳೆಯ ಬಟ್ಟೆ, ಪಾದರಕ್ಷೆ, ಲೇಖನ ಸಾಮಗ್ರಿ ಮತ್ತು ಪೀಠೋಪಕರಣಗಳ ದಾನ.",
        },
      },
      {
        title: { en: "LPG cylinders", kn: "ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್" },
        body: {
          en: "Support to provide LPG cylinders for the home.",
          kn: "ಮನೆಗೆ ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್ ಒದಗಿಸಲು ಸಹಾಯ.",
        },
      },
      {
        title: { en: "Medical and emergency support", kn: "ವೈದ್ಯಕೀಯ ಮತ್ತು ತುರ್ತು ಸಹಾಯ" },
        body: {
          en: "Help with medical needs, emergency requirements and other basic needs of the children.",
          kn: "ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಅಗತ್ಯಗಳು, ತುರ್ತು ಅಗತ್ಯಗಳು ಮತ್ತು ಇತರ ಮೂಲಭೂತ ಅಗತ್ಯಗಳಿಗೆ ಸಹಾಯ.",
        },
      },
    ],
  },
];

export const programById = (id: string) => programs.find((p) => p.id === id);
