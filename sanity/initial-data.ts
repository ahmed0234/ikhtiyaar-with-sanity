/**
 * Initial & Fallback Content for Root Landing Page
 * Exact copy from existing codebase - no wording has been changed or invented.
 */
export const defaultLandingPageContent = {
  _id: "landingPage",
  _type: "landingPage",

  // 1. Hero Section (Screenshot 1)
  googlePartnerImageUrl: "/google-partner.svg",
  googlePartnerImageAlt: "Google Partner",
  hostingerPartnerImageUrl: "/hostinger-partner.webp",
  hostingerPartnerImageAlt: "Hostinger Partner",
  heroHeadingLine1: "More good jobs.",
  heroHeadingLine2: "Fewer quiet weeks.",
  heroDescription:
    "You know how to do the work. We help the right people find you, call you, and ask for an estimate.",
  heroCtaButtonText: "Show me what's possible",
  heroCtaSecondaryText: "See the results",
  heroProofTitle: "$1M+ revenue produced for clients.",
  heroProofSubtitle: "See what that looks like for the people we work with.",
  heroTrust1: "Calls come straight to you",
  heroTrust2: "Your business. Your leads.",
  heroFormKicker: "LET'S START WITH YOUR AREA",
  heroFormHeading: "Could this work for your business?",
  heroFormDescription:
    "Tell us a little about what you do. We'll look at the demand, the costs, and whether the numbers make sense.",
  heroFormFirstNameLabel: "First name",
  heroFormLastNameLabel: "Last name",
  heroFormEmailLabel: "Email",
  heroFormPhoneLabel: "Phone",
  heroFormTradeLabel: "What work do you do?",
  heroFormCityLabel: "City / service area",
  heroFormCompanyLabel: "Business name",
  heroFormSubmitButtonText: "Let's look at my area",
  heroFormNote: "No pressure. No obligation.",
  heroFormConsent: "We'll only contact you about your request.",
  heroFormPrivacyText: "Privacy Policy",

  // 2. Video Testimonials Section (Screenshot)
  testimonialsEyebrow: "IN THEIR OWN WORDS",
  testimonialsHeading: "Hear it from the people\nwe work with.",
  testimonialsDescription:
    "What's it actually like working with us? Let our clients tell you.",
  testimonialsList: [
    {
      _key: "testimonial-michael",
      name: "Michael Swisher",
      roleCompany: "Owner, Swisher Capital",
      company: "Swisher Capital",
      youtubeUrl: "https://www.youtube.com/watch?v=zLIhI9GthRs",
      thumbnailUrl: "/testimonial-michael.webp",
      watchStoryText: "Watch their story",
      tag: "CLIENT STORY",
    },
    {
      _key: "testimonial-john",
      name: "John Hall",
      roleCompany: "Owner, J & J Cash Home Buyers",
      company: "J & J Cash Home Buyers",
      youtubeUrl: "https://www.youtube.com/watch?v=QLyqYDhV__I",
      thumbnailUrl: "/testimonial-john.webp",
      watchStoryText: "Watch their story",
      tag: "CLIENT STORY",
    },
  ],

  // 3. Client Logos & Reassurance Section (Image 1)
  clientLogosHeading: "GOOD BUSINESSES. REAL WORK TO SHOW FOR IT.",
  clientLogosList: [
    {
      _key: "logo-ridgewell",
      name: "Ridgewell Landscape & Design",
      logoUrl: "/clients/ridgewell.png",
      style: "ridgewell",
    },
    {
      _key: "logo-casey",
      name: "Casey Insurance Group",
      logoUrl: "/clients/casey-transparent.png",
      style: "casey",
    },
    {
      _key: "logo-beckon",
      name: "Beckon Homes",
      logoUrl: "/clients/beckon-transparent.png",
      style: "beckon",
    },
    {
      _key: "logo-swisher",
      name: "Swisher Capital",
      logoUrl: "/clients/swisher.png",
      style: "swisher",
    },
  ],
  reassurance1Title: "No shared leads",
  reassurance1Description: "People contact your business.",
  reassurance2Title: "You own what we build",
  reassurance2Description: "Your accounts. Your information.",
  reassurance3Title: "Your jobs. Your area.",
  reassurance3Description: "Built around the work you want.",
  reassurance4Title: "Numbers you understand",
  reassurance4Description: "What you spent. What came back.",

  // 4. Ridgewell Results Section & Stats (Image 2)
  resultsProjectImageUrl: "/ridgewell-project.webp",
  resultsProjectName: "RIDGEWELL LANDSCAPE & DESIGN",
  resultsProjectLocation: "Colorado",
  resultsBadgeEyebrow: "REAL CLIENT RESULTS",
  resultsBadgeTitle: "Good work. More people seeing it.",
  resultsEyebrow: "LESS TALK. HERE'S WHAT HAPPENED.",
  resultsHeading: "More people asking. More work coming in.",
  resultsDescription:
    "Ridgewell wanted more landscaping and hardscaping projects. We helped homeowners in their area find them and get in touch.",
  stat1Value: "2200+",
  stat1Label: "homeowner inquiries in two months",
  stat2Value: "$500k",
  stat2Label: "in client-reported revenue",
  resultsDisclaimer:
    "One client's results, not a promise of what every business will make. Revenue is not profit.",
  resultsCtaText: "Let's look at the numbers for your business",

  // 5. Outcomes Section (Image 1)
  outcomesEyebrow: "HERE'S WHERE WE COME IN",
  outcomesHeading: "You run the jobs. We help bring in the next ones.",
  outcomesSubtitle:
    "You shouldn't have to finish a project and wonder where the next one is coming from. Here's what we take off your plate.",
  outcomesCard1Number: "01",
  outcomesCard1Title: "Get calls for work\nyou actually want.",
  outcomesCard1Description:
    "More patios? Full roof replacements? Bigger remodels? We focus on your best jobs and the places you want to work.",
  outcomesCard1Bottom: "Your services. Your service area.",
  outcomesCard2Number: "02",
  outcomesCard2Title: "Give people a reason\nto choose you.",
  outcomesCard2Description:
    "We show your work, explain what makes you a good choice, and make it easy for someone to pick up the phone.",
  outcomesCard2Bottom: "A clear path from looking to calling.",
  outcomesCard3Number: "03",
  outcomesCard3Title: "See if the money\nis making you money.",
  outcomesCard3Description:
    "We keep track of the calls and estimate requests. Together, we look at which ones become jobs and what needs to change.",
  outcomesCard3Bottom: "Simple answers about your results.",

  // 6. Ownership Section (Screenshot 3)
  ownershipEyebrow: "BUILD SOMETHING THAT'S YOURS",
  ownershipHeading: "Stop racing five other contractors to the same lead.",
  ownershipParagraph1:
    "When someone finds your business through the work we do, they call you. They ask you for an estimate.",
  ownershipParagraph2:
    "We're helping you build your own source of customers. Your name is on it. Your accounts and information stay yours.",
  ownershipButtonText: "That's what I want",

  // 7. Process Section (Image 2)
  processEyebrow: "PRETTY STRAIGHTFORWARD",
  processHeading: "Here's how we'd get started.",
  processSubtitle: "No homework. No long marketing presentation.",
  processStep1Number: "1",
  processStep1Title: "Tell us what you want more of.",
  processStep1Description:
    "The jobs you like, the areas you cover, and how much work your crew can take on.",
  processStep2Number: "2",
  processStep2Title: "We'll work through the numbers.",
  processStep2Description:
    "We check local demand and likely costs. If the budget doesn't make sense, we'll tell you.",
  processStep3Number: "3",
  processStep3Title: "We set it up. You take the calls.",
  processStep3Description:
    "Once we agree on a plan, we handle the setup and keep improving it as we learn what brings good work.",

  // 8. Trades Section (Image 3)
  tradesEyebrow: "BUILT AROUND YOUR BUSINESS",
  tradesHeading: "What kind of work\ndo you want more of?",
  tradesDescription:
    "A roof replacement and a moving job have different numbers. Your plan should too.",
  tradesList: [
    "Landscaping & hardscaping",
    "Roofing",
    "Remodeling",
    "Concrete & paving",
    "Moving",
    "Other home services",
  ],

  // 9. FAQ Section (Image 4)
  faqEyebrow: "FAIR QUESTIONS",
  faqHeading: "Let's clear\na few things up.",
  faqDescription:
    "Wondering about your own situation?\nJust ask. We'll give you a straight answer.",
  faqPhoneDisplay: "(954) 787-3401",
  faqPhoneTel: "+19547873401",
  faqItems: [
    {
      _key: "faq-0",
      question: "Are you selling the same leads to other contractors?",
      answer:
        "No. People see your business and contact you directly. We don't take one person's details and sell them to five different companies. You're building a source of inquiries for your own business.",
    },
    {
      _key: "faq-1",
      question: "What do you actually do to bring the calls in?",
      answer:
        "We put your business in front of people looking for the work you do. That usually means Google Ads, a clear page showing your work, and a simple way to call or request an estimate. We can also help you show up in Google's regular search results. We handle the setup and ongoing work.",
    },
    {
      _key: "faq-2",
      question: "How much do I need to spend?",
      answer:
        "That depends on your area, the jobs you want, and what you make on each job. We look at those numbers before recommending a budget. You'll see the ad budget and our fee separately, so you know where your money is going.",
    },
    {
      _key: "faq-3",
      question: "I've tried this before. What would be different?",
      answer:
        "First, we'd look at what happened. Were the calls for the wrong service? Outside your area? Were good inquiries going unanswered? We want to find the actual problem before asking you to spend another dollar.",
    },
    {
      _key: "faq-4",
      question: "Can you guarantee a certain number of jobs?",
      answer:
        "No one can honestly promise that every inquiry will become a job. We can help you attract the right people and track what happens next. The estimate, your pricing, and how quickly you follow up all matter too. We'll agree on what a good inquiry looks like before we start.",
    },
    {
      _key: "faq-5",
      question: "What if my crew is already booked out?",
      answer:
        "Tell us. We can adjust the ad budget around the work you can actually take on, or focus on the types of jobs you want next. You shouldn't have to keep pushing for more calls when you can't handle them.",
    },
    {
      _key: "faq-6",
      question: "Do I need to learn any of the technical stuff?",
      answer:
        "No. We take care of that. You tell us where you work, what jobs you want, and which inquiries are turning into customers. We explain the results in normal language, and your accounts and information stay yours.",
    },
  ],

  // 10. Final CTA Section (Screenshot 4)
  finalEyebrow: "LET'S SEE IF WE'RE A GOOD FIT",
  finalHeading: "Got room for a few more good jobs?",
  finalDescription:
    "Let's look at your area and see what it would take to bring them in.",
  finalButtonText: "Show me what's possible",
  finalMicroCopy: "A quick conversation. A clear next step.",

  // 11. Footer Section
  footerLogoUrl: "/ikhtiyaar-logo.png",
  footerLogoAlt: "Ikhtiyaar",
  footerLogoHref: "/",
  footerTagline: "Good work deserves to get found.\nLet's make sure yours does.",
  footerNavHeading: "Explore",
  footerNavLinks: [
    { _key: "fn-1", label: "About Ikhtiyaar", href: "/about" },
    { _key: "fn-2", label: "Contact us", href: "/contact" },
    { _key: "fn-3", label: "Case studies", href: "/case-studies" },
    { _key: "fn-4", label: "Helpful reads", href: "/blog" },
    { _key: "fn-5", label: "Google Ads", href: "/services/google-ads" },
    { _key: "fn-6", label: "Meta Ads", href: "/services/meta-ads" },
    { _key: "fn-7", label: "ChatGPT Ads", href: "/services/chatgpt-ads" },
    { _key: "fn-8", label: "Search Engine Optimization", href: "/services/seo" },
    { _key: "fn-9", label: "AEO", href: "/services/aeo" },
    { _key: "fn-10", label: "Cold Email", href: "/services/cold-email" },
  ],
  footerContactHeading: "Let's talk",
  footerPhoneDisplay: "(954) 787-3401",
  footerPhoneTel: "+19547873401",
  footerEmail: "support@ikhtiyaar.com",
  footerAddress: "30 N Gould St, Ste R\nSheridan, WY 82801",
  footerCopyright: `© ${new Date().getFullYear()} Ikhtiyaar LLC.`,
  footerLegalLinks: [
    { _key: "fl-1", label: "Privacy", href: "/privacy" },
    { _key: "fl-2", label: "Terms", href: "/terms" },
    { _key: "fl-3", label: "Cookies", href: "/cookies" },
    { _key: "fl-4", label: "Accessibility", href: "/accessibility" },
    { _key: "fl-5", label: "Admin portal", href: "/studio" },
    { _key: "fl-6", label: "Get in touch", href: "/#contact" },
  ],
};

export type LandingPageContent = typeof defaultLandingPageContent;

export interface SanityFooterLink {
  _key?: string;
  label: string;
  href: string;
}

export interface SanityTestimonialItem {
  _key?: string;
  name: string;
  roleCompany?: string;
  company?: string;
  youtubeUrl: string;
  thumbnailUrl?: string;
  thumbnail?: any;
  watchStoryText?: string;
  tag?: string;
}

export interface SanityClientLogoItem {
  _key?: string;
  name: string;
  logoUrl?: string;
  logo?: any;
  style?: string;
}

export interface SanityFaqItem {
  _key?: string;
  question: string;
  answer: string;
}


