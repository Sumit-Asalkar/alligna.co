export const site = {
  name: 'Alignaa',
  domain: 'alignaa.co',
  url: 'https://alignaa.co',
  parentUrl: 'https://alignaa.in/',
  parentLabel: 'Visit the Alignaa professional website',
  language: 'en',
  draftMode: import.meta.env.VITE_DRAFT_MODE !== 'false',
  startingPrice: '₹39,999',
  startingPriceNote: 'Starting at',
  support: {
    email: '',
    phone: '',
    hours: '',
    pendingLabel: 'Support contact details are pending client confirmation.',
  },
  social: [],
  copyright: `© ${new Date().getFullYear()} Alignaa. All rights reserved.`,
}

export const navItems = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Results', href: '/#results' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Become a Partner', href: '/become-a-partner' },
]

export const hero = {
  headline: 'Your smile journey starts with Alignaa',
  supporting:
    'Clear aligner treatment planned with dental professionals. Request a scan and the Alignaa support team will contact you to guide the next steps.',
  videoSrc: '/assets/hero.mp4',
  posterSrc: '/assets/hero-poster.jpg',
  videoCredit: 'Draft footage from Alignaa brand materials. Final approved patient footage is a launch dependency.',
}

export const treatmentOffer = {
  title: 'Aligner Treatment',
  image: '/assets/aligner-product.jpg',
  imageAlt: 'Alignaa clear aligner on a white background',
  priceLabel: 'Starting at ₹39,999',
  emi:
    'Affordable EMI options may be available. The Alignaa team will confirm eligibility and terms after your enquiry. No monthly repayment amount is published until approved.',
  inclusions: [
    {
      text: 'Scan at home or at an Alignaa centre',
      pending: true,
      note: 'Locations, availability and any scan fee need client confirmation.',
    },
    {
      text: 'A licensed doctor prescribes a custom treatment plan',
      pending: false,
    },
    {
      text: 'Free shipping and handling',
      pending: true,
      note: 'Confirm applicable conditions before launch.',
    },
    {
      text: 'Full or phased treatment package delivered to you',
      pending: true,
      note: 'Subject to approved operational wording.',
    },
    {
      text: 'Free retainers',
      pending: true,
      note: 'Confirm number, replacement policy and package applicability.',
    },
  ],
}

export const processSteps = [
  {
    number: '01',
    title: 'Request a scan',
    text: 'Enquire with Alignaa. A scan can be arranged at home or at an Alignaa centre after the team confirms availability.',
    image: '/assets/records.png',
    imageAlt: 'Dental records and scan preparation',
  },
  {
    number: '02',
    title: 'Your plan is created',
    text: 'A dental professional reviews your records and creates a personalised Alignaa treatment plan.',
    image: '/assets/treatment-plan.png',
    imageAlt: 'Dental professional reviewing an Alignaa treatment plan on a tablet',
  },
  {
    number: '03',
    title: 'Aligners are shipped',
    text: 'Your aligners are produced and delivered according to the agreed treatment package.',
    image: '/assets/alignaa-box.png',
    imageAlt: 'Alignaa treatment box',
  },
  {
    number: '04',
    title: 'Treatment begins',
    text: 'You start wearing your aligners. The Alignaa team stays in touch to support your journey.',
    image: '/assets/dentist-patient.png',
    imageAlt: 'Dentist speaking with a patient',
  },
]

export const concerns = [
  {
    id: 'spacing',
    formValue: 'Spacing',
    name: 'Spacing or gaps',
    short: 'Visible spaces between teeth that you would like to close.',
    details:
      'Spacing can appear between one or several teeth. Alignaa treatment is planned by a dental professional after your scan. This overview is not an eligibility assessment.',
    image: '/assets/concern-spacing.png',
  },
  {
    id: 'crowding',
    formValue: 'Crowding',
    name: 'Crowding',
    short: 'Teeth that overlap or sit too close together.',
    details:
      'Crowding happens when there is not enough space for teeth to sit in a straight line. A clinician reviews whether aligners are suitable for your case.',
    image: '/assets/concern-crowding.png',
  },
  {
    id: 'forward',
    formValue: 'Forwardly placed',
    name: 'Forwardly placed teeth',
    short: 'Upper teeth that sit further forward than you would like.',
    details:
      'Forwardly placed teeth can affect bite and smile appearance. Treatment is individual and begins only after professional planning.',
    image: '/assets/concern-forward.png',
  },
  {
    id: 'crossbite',
    formValue: 'Crossbite',
    name: 'Crossbite',
    short: 'Upper and lower teeth that do not meet in the usual position.',
    details:
      'A crossbite can involve front or back teeth. Alignaa does not diagnose online. Request a scan so a professional can review your records.',
    image: '/assets/concern-crossbite.png',
  },
  {
    id: 'openbite',
    formValue: 'Open bite',
    name: 'Open bite',
    short: 'A gap that remains when the back teeth meet.',
    details:
      'An open bite can make it harder for the front teeth to meet. Suitability for aligners is confirmed after clinical review.',
    image: '/assets/concern-openbite.png',
  },
  {
    id: 'deepbite',
    formValue: 'Deep bite',
    name: 'Deep bite',
    short: 'Upper teeth that cover the lower teeth more than usual.',
    details:
      'A deep bite is a vertical overlap of the front teeth. Your Alignaa plan, if suitable, is prescribed by a licensed doctor.',
    image: '/assets/concern-deepbite.png',
  },
]

export const results = [
  {
    id: 'gap-closure',
    category: 'Gap closure',
    duration: '8.5 months',
    aligners: 17,
    beforeImage: '/assets/result-gap-closure-before.jpg',
    afterImage: '/assets/result-gap-closure-after.jpg',
    beforeFull: '/assets/result-gap-closure-before-full.jpg',
    afterFull: '/assets/result-gap-closure-after-full.jpg',
    note: 'Verified clinical case from Alignaa treatment records. Duration describes this specific case.',
  },
  {
    id: 'forwardly-placed',
    category: 'Forwardly placed',
    duration: '10 months',
    aligners: 20,
    beforeImage: '/assets/result-forwardly-placed-before.jpg',
    afterImage: '/assets/result-forwardly-placed-after.jpg',
    beforeFull: '/assets/result-forwardly-placed-before-full.jpg',
    afterFull: '/assets/result-forwardly-placed-after-full.jpg',
    note: 'Verified clinical case from Alignaa treatment records. Duration describes this specific case.',
  },
  {
    id: 'crowding',
    category: 'Crowding',
    duration: '8 months',
    aligners: 16,
    beforeImage: '/assets/result-crowding-before.jpg',
    afterImage: '/assets/result-crowding-after.jpg',
    beforeFull: '/assets/result-crowding-before-full.jpg',
    afterFull: '/assets/result-crowding-after-full.jpg',
    note: 'Verified clinical case from Alignaa treatment records. Duration describes this specific case.',
  },
]

export const benefits = [
  {
    title: 'Personalised planning',
    text: 'Your aligners are planned around your records, not a one-size routine.',
  },
  {
    title: 'Professional involvement',
    text: 'A licensed doctor reviews your case and prescribes the treatment plan.',
  },
  {
    title: 'Patient support',
    text: 'After you enquire, the Alignaa team contacts you and coordinates the next steps.',
  },
  {
    title: 'Clear, removable aligners',
    text: 'Wear aligners designed to move teeth gradually as directed by your clinician.',
  },
]

export const reviews = [
  {
    quote:
      'I wanted a simple way to ask about aligners without visiting multiple clinics. The Alignaa team arranged a digital scan, and my custom plan arrived within a week.',
    name: 'Priyanka S.',
    location: 'Mumbai, India',
    treatment: 'Gap Closure · 17 Aligners',
    rating: 5,
    sample: true,
  },
  {
    quote:
      'The process felt effortless and transparent. Send an enquiry, discuss records with a certified clinician, and receive precision clear trays right at your doorstep.',
    name: 'Rahul M.',
    location: 'Pune, India',
    treatment: 'Crowding Correction · 16 Aligners',
    rating: 5,
    sample: true,
  },
  {
    quote:
      'I was hesitant about traditional braces at 28. Alignaa aligners are virtually invisible and comfortable. The personal support team checked in throughout my smile journey.',
    name: 'Ananya V.',
    location: 'Bengaluru, India',
    treatment: 'Deep Bite Treatment · 20 Aligners',
    rating: 5,
    sample: true,
  },
]

export const comparison = {
  disclaimer:
    'Illustrative comparison for private drafts only. Final categories and values remain pending client approval. Do not treat these figures as launch claims.',
  headers: ['Topic', 'Alignaa clear aligners', 'Traditional braces'],
  rows: [
    ['Appearance', 'Clear, removable trays', 'Fixed brackets and wires'],
    ['Daily care', 'Remove to eat and brush as advised', 'Special cleaning around braces'],
    ['Starting price shown here', 'Starting at ₹39,999', 'Varies by clinic'],
    ['How to begin', 'Request a scan through Alignaa', 'Clinic consultation'],
  ],
}

export const faqs = [
  {
    q: 'What are clear aligners?',
    a: 'Clear aligners are a series of custom-made, removable trays designed to move teeth gradually. A dental professional decides whether they are suitable after reviewing your records. Final clinical wording must be approved by the client before launch.',
  },
  {
    q: 'How does Alignaa assess my teeth?',
    a: 'This website collects an enquiry only. Alignaa support contacts you to arrange a scan at home or at an Alignaa centre, subject to confirmed availability. There is no online eligibility quiz or diagnosis.',
  },
  {
    q: 'What is the treatment process?',
    a: 'After your enquiry, the team coordinates a scan. A licensed doctor creates a plan. Aligners are then produced and shipped, and your treatment journey begins with ongoing Alignaa support.',
  },
  {
    q: 'How much does treatment cost?',
    a: 'Alignaa treatment starts at ₹39,999 as supplied in the client offer. Your exact plan depends on the professional assessment. Later plan names such as Lite, Essential and Complete are not published as current pricing.',
  },
  {
    q: 'Is EMI available?',
    a: 'EMI may be available for some patients. Alignaa will confirm whether EMI applies in your case. No monthly repayment amount is shown until the client approves it.',
  },
  {
    q: 'Do I receive retainers?',
    a: 'The current offer includes free retainers, subject to confirmed number, replacement policy and package conditions. The support team will explain what applies to your treatment.',
  },
  {
    q: 'How should I care for my aligners?',
    a: 'Wear and care instructions come from your clinician and the Alignaa team after your plan is ready. Do not rely on generic wear times published without client approval.',
  },
  {
    q: 'How do I enquire?',
    a: 'Use the Request a Scan form on this website. Share your name, mobile number and concern. The Alignaa support team will contact you to discuss requirements and next steps.',
  },
]

export const partnerContent = {
  title: 'Become an Alignaa partner',
  intro:
    'Dentists and dental clinic owners can enquire about working with Alignaa. Our team will contact you to discuss how partnership could work for your practice.',
  benefits: [
    'A dedicated conversation with the Alignaa team about your clinic and patients.',
    'Access to Alignaa professional information on the parent website.',
    'A clear enquiry route for practices that want to offer Alignaa treatment.',
  ],
  disclaimer:
    'Partnership details are discussed individually. Alignaa does not promise earnings, exclusive territory, free equipment or guaranteed patient leads on this page.',
}

export const patientAgeGroups = [
  'Under 18',
  '18–24',
  '25–34',
  '35–44',
  '45 and above',
]

export const teethConcernOptions = [
  'Spacing',
  'Crowding',
  'Forwardly placed',
  'Crossbite',
  'Open bite',
  'Deep bite',
  'Not sure',
  'General enquiry',
]

export const partnerRoles = ['Dentist', 'Clinic owner', 'Other']

export const messages = {
  patientSuccess:
    'Thank you for your enquiry. The Alignaa support team will contact you to discuss your requirements and guide you through the next steps.',
  partnerSuccess:
    'Thank you for your interest in partnering with Alignaa. Our team will contact you to discuss the next steps.',
  failure: 'We could not send your enquiry. Please try again.',
  pendingDelivery:
    'Email delivery is not configured yet. Your enquiry was not sent. Please try again after the inbox service is connected.',
  patientConsent:
    'I agree that the Alignaa team may contact me about this enquiry. I have read the Privacy Policy.',
  partnerConsent:
    'I agree that the Alignaa team may contact me about this partnership enquiry. I have read the Privacy Policy.',
}
