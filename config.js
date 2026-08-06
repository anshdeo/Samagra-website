/* =============================================================================
   SAMAGRA WORKPLACE ADVISORY — SITE CONFIG
   -----------------------------------------------------------------------------
   This is the ONLY file you edit to change the website's words, images, and
   team. No coding needed — just change the text between the quotes.

   HOW TO...
   • Change any wording ....... edit the text inside the "quotes".
   • Change a section image ... drop your picture into the matching file under
                                ./source/images/ (keep the same file name).
   • Change a team photo ...... name your image after the person and drop it in
                                ./source/images/team/. Example:
                                "Chandra Deo"            -> chandra-deo.jpg
                                "Adv. Avdhesh Kumar Dubey" -> avdhesh-kumar-dubey.jpg
                                (titles like Dr./Adv. are ignored in the file name)
   • Add a social link ........ replace "None" with the full link (e.g.
                                "https://linkedin.com/in/..."). For email, just
                                write the email address. Leave "None" to hide it.
   • Add / remove a person .... copy or delete one { ... } block in team.members.
   ============================================================================= */

window.SITE_CONFIG = {

  /* ---- Brand & contact basics ------------------------------------------- */
  brand: {
    short: "Samagra",
    full: " Workplace Advisory",         // shown after "Samagra" on wide screens
    fullName: "Samagra Workplace Advisory",
    email: "hello@samagraworkplaceadvisory.com",
    ctaLabel: "Get in Touch"             // the button in the top-right + hero
  },

  /* ---- Company social links -----------------------------------------------
     Shown in the footer and the contact section. Put a full link, or "None"
     to hide that icon. (These are the FIRM's accounts — each team member has
     their own separate links further down in team.members.)                 */
  socials: {
    linkedin:  "None",
    x:         "None",
    instagram: "None",
    facebook:  "None",
    youtube:   "None"
  },

  /* ---- Images (drop replacements in with the same file name) ------------- */
  images: {
    heroBackground:     "./source/images/backgrounds/banyan-canopy.jpg",
    identityBackground: "./source/images/backgrounds/banyan-canopy.jpg",
    identityPhoto:      "./source/images/backgrounds/banyan-canopy.jpg",
    whySamagra:         "./source/images/sections/why-samagra-meeting.jpg",
    whatWeDo:           "./source/images/sections/what-we-do-desk.jpg"
  },

  /* ---- Top navigation (label + which section it jumps to) ---------------- */
  nav: [
    { label: "Home",         href: "#hero" },
    { label: "Why Samagra",  href: "#why-samagra" },
    { label: "Our Identity", href: "#identity" },
    { label: "What We Do",   href: "#what-we-do" },
    { label: "How We Work",  href: "#how-we-work" },
    { label: "Team",         href: "#team" },
    { label: "Contact",      href: "#contact" }
  ],

  /* ---- Hero (the first screen) ------------------------------------------- */
  hero: {
    eyebrow: "Workplace Advisory",
    title:   "One tree. Five roots. Every workplace challenge, held.",
    subtext: "Labour law, POSH compliance, HR strategy, legal support, and employee wellbeing — five disciplines, rooted in one integrated practice.",
    cta:     "Get in Touch",
    // The LAST word of the headline gently cycles through these. The first
    // one should match the word the title ends with. Set to [] to keep the
    // headline completely static.
    rotateWords: ["held.", "untangled.", "resolved.", "handled."]
  },

  /* ---- Why Samagra ------------------------------------------------------- */
  whySamagra: {
    eyebrow: "Integrated by design",
    heading: "Why Samagra",
    // <em>...</em> makes a word italic. Leave the tags in if you want italics.
    body: "<em>Samagra</em> means whole. Most firms split labour law, HR, training, and wellbeing across vendors who never talk to each other. We put five specialists under one roof instead — so when one issue touches all four, the right person's already in the room.",
    listHeading: "Why Teams Choose Us",
    list: [
      { title: "One Team",              desc: "Five disciplines, one point of contact." },
      { title: "Real Regulatory Depth", desc: "Built on decades inside India's own labour service." },
      { title: "Legal, Start to Finish", desc: "From policy to litigation, covered end-to-end." },
      { title: "HR That Works",         desc: "Practical advice from people who've run the shop floor." },
      { title: "Wellbeing Included",    desc: "Mental health support built in, not bolted on." },
      { title: "Built to Scale",        desc: "Compliance first, capability next, culture that lasts." }
    ]
  },

  /* ---- Impact numbers (the dark band) ------------------------------------ */
  impact: [
    { number: "5",   label: "Independent experts, one shared purpose" },
    { number: "50+", label: "Years combined inside India's Central Labour Service" },
    { number: "31",  label: "Years of experience held by our Head Consultant alone" }
  ],

  /* ---- Our Identity ------------------------------------------------------ */
  identity: {
    eyebrow: "Our identity",
    heading: "One Tree, Five Roots",
    paragraphs: [
      "Our emblem is a banyan tree. Its aerial roots are unique — each one draws nourishment on its own, yet all of them hold up the same canopy. That's Samagra: five independent experts, one shared purpose.",
      "A POSH case turns into a labour law question. A labour dispute reveals an HR gap. We built the firm so the right expert is already in the room when that happens — not a phone call away."
    ]
  },

  /* ---- What We Do (the five services) ------------------------------------ */
  whatWeDo: {
    eyebrow: "Five practices, one team",
    heading: "What We Do",
    cta: "Get in Touch",
    services: [
      { title: "Labour Law Advisory",           desc: "Statutory compliance under the new Labour Codes, industrial relations counsel, and CAT/High Court representation." },
      { title: "POSH Compliance",               desc: "ICC constitution and training, External Member services, fair and legally defensible inquiry conduct, and annual compliance reporting support." },
      { title: "HR & Organisation Development",  desc: "Leadership development, culture and change management, talent and succession planning, and employee engagement strategy." },
      { title: "Training & Capability Building", desc: "ICC and manager training, union workshops, and supervisory development for stronger shopfloor leadership." },
      { title: "Employee Wellbeing",            desc: "Counselling embedded into POSH and HR cases, plus broader work-life balance and coping-skills support." }
    ]
  },

  /* ---- How We Work (the three tiers) ------------------------------------- */
  howWeWork: {
    eyebrow: "Built ground-up",
    heading: "How We Work",
    intro: "A ground-up progression, not parallel workstreams — each layer depends on the one before it.",
    steps: [
      { number: "01", title: "Foundation", desc: "Compliance, labour relations, and business discipline — the conditions every other layer depends on. Most workplace issues trace back to gaps here." },
      { number: "02", title: "Build",      desc: "Once the fundamentals hold, focus shifts to HR and people practices — capability building, succession planning, first-time-manager development, and employee wellbeing." },
      { number: "03", title: "Culture",    desc: "Organisational systems that serve the company's vision and purpose. When the foundation holds and people practices are solid, strategy is far more likely to succeed." }
    ]
  },

  /* ---- Meet the Team ----------------------------------------------------- */
  team: {
    eyebrow: "One canopy · five roots",
    heading: "Meet the team",
    intro: "Each an independent expert who could stand alone — all anchored to one shared purpose. Tap anyone to read their background.",

    /* Each person below.
       • name / role / years / bio / expertise show in their popup.
       • photo is found automatically: ./source/images/team/<name>.jpg
         (lowercase, spaces become hyphens, titles like Dr./Adv. dropped).
       • socials: put a full link, or "None" to hide that icon.
         For "email", just write the email address (no https needed).           */
    members: [
      {
        name: "Chandra Deo",
        role: "Head Consultant",
        years: "31 years",
        bio: "31 years across government regulatory service, corporate HR, and independent compliance consulting — 26 of them as a Central Labour Service Officer with the Ministry of Labour and Employment, retiring as Welfare & Cess Commissioner. MA in Personnel Management and Industrial Relations (TISS Mumbai), LLB (Patna University) — a rare pairing of HR fluency and legal procedure.",
        expertise: [
          "POSH Compliance & ICC Constitution",
          "Government Regulatory Liaison",
          "ICC Chairing & External Member Services",
          "Workplace Wellbeing Strategy",
          "Workplace Investigations",
          "Policy Drafting",
          "Labour Law Advisory",
          "Senior Stakeholder Engagement"
        ],
        socials: 
        { linkedin: "https://in.linkedin.com/in/chandra-deo-52609b7a", 
          x: "None", 
          instagram: "None", 
          email: "None" }
      },
      {
        name: "Sonali Sarma",
        role: "Leadership Development & POSH Consultant",
        years: "37 years",
        bio: "37 years in HR, Learning, and Organisation Development across manufacturing, public sector, and multinational companies. Two years ago she moved into the not-for-profit sector while continuing to lead HR — and stayed just as hands-on with plant managers, supervisors, unions, and frontline teams.",
        expertise: [
          "Leadership Development & Coaching",
          "Change Management & Culture Transformation",
          "Talent Management & Succession Planning",
          "Industrial Relations & Employee Relations",
          "POSH Awareness & IC Training",
          "Employee Engagement & HR Strategy",
          "Conflict & Team Management",
          "Competency-Based Leadership & Managerial Capacity Building"
        ],
        socials: { 
          linkedin: "https://www.linkedin.com/in/sonali-sarma-32704016/", 
          x: "None", 
          instagram: "None", 
          email: "None" }
      },
      {
        name: "Adv. Avdhesh Kumar Dubey",
        role: "Advocate, Supreme Court",
        years: "15+ years",
        bio: "Practising advocate before the Supreme Court of India and the night courts, with 15+ years in corporate and family law. Chambers in Mumbai, Delhi, and at the Supreme Court give Samagra direct litigation capability — for POSH and labour matters that move beyond internal resolution into contested proceedings.",
        expertise: [
          "Supreme Court Litigation",
          "Night Court Practice",
          "Corporate Law Advisory & Disputes",
          "Client Representation in Contested Proceedings",
          "Family Law Matters",
          "Legal Risk Assessment",
          "Escalated POSH & Workplace Litigation",
          "Cross-Referral Coordination"
        ],
        socials: { linkedin: "None", x: "None", instagram: "None", email: "None" }
      },
      {
        name: "Pravin Parmar",
        role: "Labour Law Consultant",
        years: "26 years",
        bio: "26 years with the Government of India's Central Labour Service — Assistant Labour Commissioner, Welfare Commissioner, then Labour Welfare Commissioner. Has argued service matters before the Central Administrative Tribunal and High Court, and trained PSUs including BSNL, Power Grid, and Ordnance Factory on labour law.",
        expertise: [
          "Labour Law Implementation & Compliance",
          "Labour Welfare Administration",
          "Industrial Relations & Industrial Peace",
          "PSU Labour Law Training",
          "Service Matters — CAT & High Court",
          "Union–Management Relations Training",
          "Disciplinary Proceedings & Domestic Enquiries",
          "Complex Industrial Dispute Resolution"
        ],
        socials: { linkedin: "None", x: "None", instagram: "None", email: "None" }
      },
      {
        name: "Dr. Priyadarshini Deo",
        role: "Mental Health & Psychosocial Care Consultant",
        years: "16+ years",
        bio: "Mental health and psychosocial care specialist — MA in Medical & Psychiatric Social Work (TISS Mumbai), PhD in Psychology (SNDT). Senior Counsellor at Kokilaben Hospital's Centre for Cancer & Palliative Care since 2009, with deep experience in grief, bereavement, and caregiver support.",
        expertise: [
          "Counselling Across Age Groups & Major Mental Illnesses",
          "Psychiatric Social Work",
          "Grief & Bereavement Counselling",
          "PhD Guide — Psychology & Social Work",
          "Palliative & End-of-Life Care Counselling",
          "Fieldwork Supervision",
          "Caregiver Support Counselling",
          "International Professional Exchange"
        ],
        socials: { linkedin: "None", x: "None", instagram: "None", email: "None" }
      }
    ]
  },

  /* ---- Contact ----------------------------------------------------------- */
  contact: {
    eyebrow: "Get in touch",
    heading: "Tell us what you're facing",
    intro: "A compliance question, a POSH case, an HR knot to untangle — send it over and the right expert gets back to you.",
    emailLabel: "Email",
    officeLabel: "Office",
    officeValue: "Borivali (West), Mumbai — 400092",
    // Paste your Formspree form URL here once you have one.
    formAction: "https://formspree.io/f/REPLACE_THIS",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      phoneOptional: "(optional)",
      message: "How can we help?"
    },
    submit: "Send message",
    success: "Thanks — your message is on its way. We'll be in touch shortly.",
    // The error message shows the email as a link in the middle.
    errorBefore: "That didn't send. Email us directly at ",
    errorAfter: " and we'll pick it up."
  },

  /* ---- Footer ------------------------------------------------------------ */
  footer: {
    tagline: "Compliance and care under one canopy — five practices, one integrated team.",
    visitLabel: "Visit",
    address: [
      "201, Sun Plaza, Lokmanya Tilak Road,",
      "Opp. Diamond Talkies, Mhatre Wadi,",
      "Borivali (West), Mumbai — 400092"
    ],
    reachLabel: "Reach us",
    sendLabel: "Send a message",
    services: "Labour Law Advisory · POSH Compliance · HR & Organisation Development · Training & Capability Building · Employee Wellbeing",
    copyright: "© 2026 Samagra Workplace Advisory. All rights reserved.",
    location: "Mumbai, India"
  }
};
