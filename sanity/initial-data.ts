/**
 * Initial & Fallback Content for Root Landing Page
 * Exact copy from existing codebase - no wording has been changed or invented.
 */
export const defaultLandingPageContent = {
  _id: "landingPage",
  _type: "landingPage",

  // 1. Hero Section (Screenshot 1)
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

  // 2. Ridgewell Results Section & Stats (Screenshot 2)
  resultsEyebrow: "LESS TALK. HERE'S WHAT HAPPENED.",
  resultsHeading: "More people asking. More work coming in.",
  resultsDescription:
    "Ridgewell wanted more landscaping and hardscaping projects. We helped homeowners in their area find them and get in touch.",
  resultsProjectName: "RIDGEWELL LANDSCAPE & DESIGN",
  resultsProjectLocation: "Colorado",
  resultsBadgeEyebrow: "REAL CLIENT RESULTS",
  resultsBadgeTitle: "Good work. More people seeing it.",
  stat1Value: "80+",
  stat1Label: "homeowner inquiries in two months",
  stat2Value: "$200k",
  stat2Label: "in client-reported revenue",
  resultsDisclaimer:
    "One client's results, not a promise of what every business will make. Revenue is not profit.",
  resultsCtaText: "Let's look at the numbers for your business",

  // 3. Outcomes Section
  outcomesEyebrow: "HERE'S WHERE WE COME IN",
  outcomesHeading: "You run the jobs. We help bring in the next ones.",
  outcomesSubtitle:
    "You shouldn't have to finish a project and wonder where the next one is coming from. Here's what we take off your plate.",

  // 4. Ownership Section (Screenshot 3)
  ownershipEyebrow: "BUILD SOMETHING THAT'S YOURS",
  ownershipHeading: "Stop racing five other contractors to the same lead.",
  ownershipParagraph1:
    "When someone finds your business through the work we do, they call you. They ask you for an estimate.",
  ownershipParagraph2:
    "We're helping you build your own source of customers. Your name is on it. Your accounts and information stay yours.",
  ownershipButtonText: "That's what I want",

  // 5. Final CTA Section (Screenshot 4)
  finalEyebrow: "LET'S SEE IF WE'RE A GOOD FIT",
  finalHeading: "Got room for a few more good jobs?",
  finalDescription:
    "Let's look at your area and see what it would take to bring them in.",
  finalButtonText: "Show me what's possible",
  finalMicroCopy: "A quick conversation. A clear next step.",
};

export type LandingPageContent = typeof defaultLandingPageContent;
