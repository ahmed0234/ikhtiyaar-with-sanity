import { groq } from "next-sanity";

// Query global site settings (singleton) — used by the navbar
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" || _id == "siteSettings"][0] {
    _id,
    _type,
    topbarLeft,
    topbarRight,
    logoAlt,
    logoImage {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    serviceLinks[] {
      _key,
      label,
      href
    },
    navLinks[] {
      _key,
      label,
      href
    },
    phoneDisplay,
    phoneTel,
    ctaLabel,
    ctaHref
  }
`;

// Query root landing page content (singleton document)
export const LANDING_PAGE_QUERY = groq`
  *[_type == "landingPage" || _id == "landingPage"][0] {
    _id,
    _type,
    heroHeadingLine1,
    heroHeadingLine2,
    heroDescription,
    heroCtaButtonText,
    heroCtaSecondaryText,
    heroProofTitle,
    heroProofSubtitle,
    heroTrust1,
    heroTrust2,
    googlePartnerImage {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    "googlePartnerImageUrl": googlePartnerImage.asset->url,
    "googlePartnerImageAlt": googlePartnerImage.alt,
    hostingerPartnerImage {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    "hostingerPartnerImageUrl": hostingerPartnerImage.asset->url,
    "hostingerPartnerImageAlt": hostingerPartnerImage.alt,
    heroFormKicker,
    heroFormHeading,
    heroFormDescription,
    heroFormFirstNameLabel,
    heroFormLastNameLabel,
    heroFormEmailLabel,
    heroFormPhoneLabel,
    heroFormTradeLabel,
    heroFormCityLabel,
    heroFormCompanyLabel,
    heroFormSubmitButtonText,
    heroFormNote,
    heroFormConsent,
    heroFormPrivacyText,
    testimonialsEyebrow,
    testimonialsHeading,
    testimonialsDescription,
    testimonialsList[] {
      _key,
      name,
      roleCompany,
      youtubeUrl,
      thumbnail {
        asset-> {
          _id,
          url
        },
        alt,
        hotspot,
        crop
      },
      "thumbnailUrl": thumbnail.asset->url,
      watchStoryText,
      tag
    },
    clientLogosHeading,
    clientLogosList[] {
      _key,
      name,
      style,
      logo {
        asset-> {
          _id,
          url
        },
        alt,
        hotspot,
        crop
      },
      "logoUrl": logo.asset->url
    },
    reassurance1Title,
    reassurance1Description,
    reassurance2Title,
    reassurance2Description,
    reassurance3Title,
    reassurance3Description,
    reassurance4Title,
    reassurance4Description,
    resultsProjectImage {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    "resultsProjectImageUrl": resultsProjectImage.asset->url,
    resultsEyebrow,
    resultsHeading,
    resultsDescription,
    resultsProjectName,
    resultsProjectLocation,
    resultsBadgeEyebrow,
    resultsBadgeTitle,
    stat1Value,
    stat1Label,
    stat2Value,
    stat2Label,
    resultsDisclaimer,
    resultsCtaText,
    ownershipEyebrow,
    ownershipHeading,
    ownershipParagraph1,
    ownershipParagraph2,
    outcomesEyebrow,
    outcomesHeading,
    outcomesSubtitle,
    outcomesCard1Number,
    outcomesCard1Title,
    outcomesCard1Description,
    outcomesCard1Bottom,
    outcomesCard2Number,
    outcomesCard2Title,
    outcomesCard2Description,
    outcomesCard2Bottom,
    outcomesCard3Number,
    outcomesCard3Title,
    outcomesCard3Description,
    outcomesCard3Bottom,
    processEyebrow,
    processHeading,
    processSubtitle,
    processStep1Number,
    processStep1Title,
    processStep1Description,
    processStep2Number,
    processStep2Title,
    processStep2Description,
    processStep3Number,
    processStep3Title,
    processStep3Description,
    tradesEyebrow,
    tradesHeading,
    tradesDescription,
    tradesList,
    faqEyebrow,
    faqHeading,
    faqDescription,
    faqPhoneDisplay,
    faqPhoneTel,
    faqItems[] {
      _key,
      question,
      answer
    },
    finalEyebrow,
    finalHeading,
    finalDescription,
    finalButtonText,
    finalMicroCopy,
    footerLogo {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    "footerLogoUrl": footerLogo.asset->url,
    footerLogoAlt,
    footerLogoHref,
    footerTagline,
    footerNavHeading,
    footerNavLinks[] {
      _key,
      label,
      href
    },
    footerContactHeading,
    footerPhoneDisplay,
    footerPhoneTel,
    footerEmail,
    footerAddress,
    footerCopyright,
    footerLegalLinks[] {
      _key,
      label,
      href
    }
  }
`;

// Query all published blog posts for index listing (/blog)
export const BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage {
      asset->,
      alt,
      caption,
      hotspot
    },
    author,
    publishedAt,
    updatedAt,
    categories,
    tags,
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
  }
`;

// Query single blog post by slug (/blog/[slug])
export const BLOG_POST_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage {
      asset->,
      alt,
      caption,
      hotspot
    },
    author,
    publishedAt,
    updatedAt,
    categories,
    tags,
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    seoTitle,
    seoDescription,
    seoImage {
      asset->
    },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
  }
`;

// Query slugs for static generation
export const BLOG_SLUGS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }
`;

// Query Google Ads service page singleton
export const GOOGLE_ADS_PAGE_QUERY = groq`
  *[_type == "googleAdsPage" || _id == "googleAdsPage"][0] {
    _id,
    _type,
    heroEyebrow,
    heroHeadline,
    heroIntro,
    heroCtaText,
    heroCtaHref,
    heroSmallNote,
    visualLabel,
    visualFlow1,
    visualFlow2,
    visualFlow3,
    visualTagline,
    heroImage {
      asset-> { _id, url },
      alt, hotspot, crop
    },
    "heroImageUrl": heroImage.asset->url,
    explainEyebrow,
    explainHeading,
    explainBody,
    exampleEyebrow,
    exampleBody,
    deliverablesEyebrow,
    deliverablesHeading,
    deliverables[] {
      _key,
      title,
      body
    },
    stepsEyebrow,
    stepsHeading,
    steps[] {
      _key,
      title,
      body
    },
    measureHeading,
    measureBody,
    caseStudyResult,
    caseStudyLinkText,
    caseStudyHref,
    fitEyebrow,
    fitHeading,
    fitItems[] {
      _key,
      text
    },
    timelineHeading,
    timelineBody,
    yourPartHeading,
    yourPartBody,
    faqEyebrow,
    faqHeading,
    faqs[] {
      _key,
      question,
      answer
    },
    relatedEyebrow,
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonText,
    ctaButtonHref
  }
`;

// Query Meta Ads service page singleton
export const META_ADS_PAGE_QUERY = groq`
  *[_type == "metaAdsPage" || _id == "metaAdsPage"][0] {
    _id,
    _type,
    heroEyebrow,
    heroHeadline,
    heroIntro,
    heroCtaText,
    heroCtaHref,
    heroSmallNote,
    visualLabel,
    visualFlow1,
    visualFlow2,
    visualFlow3,
    visualTagline,
    heroImage {
      asset-> { _id, url },
      alt, hotspot, crop
    },
    "heroImageUrl": heroImage.asset->url,
    explainEyebrow,
    explainHeading,
    explainBody,
    exampleEyebrow,
    exampleBody,
    deliverablesEyebrow,
    deliverablesHeading,
    deliverables[] {
      _key,
      title,
      body
    },
    stepsEyebrow,
    stepsHeading,
    steps[] {
      _key,
      title,
      body
    },
    measureHeading,
    measureBody,
    caseStudyResult,
    caseStudyLinkText,
    caseStudyHref,
    fitEyebrow,
    fitHeading,
    fitItems[] {
      _key,
      text
    },
    timelineHeading,
    timelineBody,
    yourPartHeading,
    yourPartBody,
    faqEyebrow,
    faqHeading,
    faqs[] {
      _key,
      question,
      answer
    },
    relatedEyebrow,
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonText,
    ctaButtonHref
  }
`;

// Query SEO service page singleton
export const SEO_PAGE_QUERY = groq`
  *[_type == "seoPage" || _id == "seoPage"][0] {
    _id,
    _type,
    heroEyebrow,
    heroHeadline,
    heroIntro,
    heroCtaText,
    heroCtaHref,
    heroSmallNote,
    visualLabel,
    visualFlow1,
    visualFlow2,
    visualFlow3,
    visualTagline,
    heroImage {
      asset-> { _id, url },
      alt, hotspot, crop
    },
    "heroImageUrl": heroImage.asset->url,
    explainEyebrow,
    explainHeading,
    explainBody,
    exampleEyebrow,
    exampleBody,
    deliverablesEyebrow,
    deliverablesHeading,
    deliverables[] {
      _key,
      title,
      body
    },
    stepsEyebrow,
    stepsHeading,
    steps[] {
      _key,
      title,
      body
    },
    measureHeading,
    measureBody,
    caseStudyResult,
    caseStudyLinkText,
    caseStudyHref,
    fitEyebrow,
    fitHeading,
    fitItems[] {
      _key,
      text
    },
    timelineHeading,
    timelineBody,
    yourPartHeading,
    yourPartBody,
    faqEyebrow,
    faqHeading,
    faqs[] {
      _key,
      question,
      answer
    },
    relatedEyebrow,
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonText,
    ctaButtonHref
  }
`;

// Query Cold Email service page singleton
export const COLD_EMAIL_PAGE_QUERY = groq`
  *[_type == "coldEmailPage" || _id == "coldEmailPage"][0] {
    _id,
    _type,
    heroEyebrow,
    heroHeadline,
    heroIntro,
    heroCtaText,
    heroCtaHref,
    heroSmallNote,
    visualLabel,
    visualFlow1,
    visualFlow2,
    visualFlow3,
    visualTagline,
    heroImage {
      asset-> { _id, url },
      alt, hotspot, crop
    },
    "heroImageUrl": heroImage.asset->url,
    explainEyebrow,
    explainHeading,
    explainBody,
    exampleEyebrow,
    exampleBody,
    deliverablesEyebrow,
    deliverablesHeading,
    deliverables[] {
      _key,
      title,
      body
    },
    stepsEyebrow,
    stepsHeading,
    steps[] {
      _key,
      title,
      body
    },
    measureHeading,
    measureBody,
    caseStudyResult,
    caseStudyLinkText,
    caseStudyHref,
    fitEyebrow,
    fitHeading,
    fitItems[] {
      _key,
      text
    },
    timelineHeading,
    timelineBody,
    yourPartHeading,
    yourPartBody,
    faqEyebrow,
    faqHeading,
    faqs[] {
      _key,
      question,
      answer
    },
    relatedEyebrow,
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonText,
    ctaButtonHref
  }
`;

// Query ChatGPT Ads service page singleton
export const CHATGPT_ADS_PAGE_QUERY = groq`
  *[_type == "chatgptAdsPage" || _id == "chatgptAdsPage"][0] {
    _id,
    _type,
    heroEyebrow,
    heroHeadline,
    heroIntro,
    heroCtaText,
    heroCtaHref,
    heroSmallNote,
    visualLabel,
    visualFlow1,
    visualFlow2,
    visualFlow3,
    visualTagline,
    heroImage {
      asset-> { _id, url },
      alt, hotspot, crop
    },
    "heroImageUrl": heroImage.asset->url,
    explainEyebrow,
    explainHeading,
    explainBody,
    exampleEyebrow,
    exampleBody,
    deliverablesEyebrow,
    deliverablesHeading,
    deliverables[] {
      _key,
      title,
      body
    },
    stepsEyebrow,
    stepsHeading,
    steps[] {
      _key,
      title,
      body
    },
    measureHeading,
    measureBody,
    caseStudyResult,
    caseStudyLinkText,
    caseStudyHref,
    fitEyebrow,
    fitHeading,
    fitItems[] {
      _key,
      text
    },
    timelineHeading,
    timelineBody,
    yourPartHeading,
    yourPartBody,
    faqEyebrow,
    faqHeading,
    faqs[] {
      _key,
      question,
      answer
    },
    relatedEyebrow,
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonText,
    ctaButtonHref
  }
`;

// Query AEO service page singleton
export const AEO_PAGE_QUERY = groq`
  *[_type == "aeoPage" || _id == "aeoPage"][0] {
    _id,
    _type,
    heroEyebrow,
    heroHeadline,
    heroIntro,
    heroCtaText,
    heroCtaHref,
    heroSmallNote,
    visualLabel,
    visualFlow1,
    visualFlow2,
    visualFlow3,
    visualTagline,
    heroImage {
      asset-> { _id, url },
      alt, hotspot, crop
    },
    "heroImageUrl": heroImage.asset->url,
    explainEyebrow,
    explainHeading,
    explainBody,
    exampleEyebrow,
    exampleBody,
    deliverablesEyebrow,
    deliverablesHeading,
    deliverables[] {
      _key,
      title,
      body
    },
    stepsEyebrow,
    stepsHeading,
    steps[] {
      _key,
      title,
      body
    },
    measureHeading,
    measureBody,
    caseStudyResult,
    caseStudyLinkText,
    caseStudyHref,
    fitEyebrow,
    fitHeading,
    fitItems[] {
      _key,
      text
    },
    timelineHeading,
    timelineBody,
    yourPartHeading,
    yourPartBody,
    faqEyebrow,
    faqHeading,
    faqs[] {
      _key,
      question,
      answer
    },
    relatedEyebrow,
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonText,
    ctaButtonHref
  }
`;

// Query Case Studies index page singleton
export const CASE_STUDIES_PAGE_QUERY = groq`
  *[_type == "caseStudiesPage" || _id == "caseStudiesPage"][0] {
    _id,
    _type,
    heroEyebrow,
    heroHeadingLine1,
    heroHeadingLine2,
    heroIntro,
    cases[] {
      _key,
      clientName,
      service,
      headline,
      intro,
      buttonText,
      buttonHref,
      visualType,
      backgroundColor,
      image {
        asset-> { _id, url },
        alt, hotspot, crop
      },
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      statBadge,
      statNumber,
      statLabel
    },
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonText,
    ctaButtonHref
  }
`;

// Query Ridgewell Case Study singleton
export const RIDGEWELL_CASE_STUDY_QUERY = groq`
  *[_type == "ridgewellCaseStudy" || _id == "ridgewellCaseStudy"][0] {
    _id,
    _type,
    breadcrumbText,
    breadcrumbHref,
    clientName,
    service,
    heroEyebrow,
    headline,
    intro,
    metrics[] {
      _key,
      value,
      label
    },
    contextEyebrow,
    contextHeading,
    contextBody,
    objectiveLabel,
    objectiveText,
    producedHeading,
    producedBody,
    image {
      asset-> { _id, url },
      alt, hotspot, crop
    },
    "imageUrl": image.asset->url,
    imageAlt,
    interpretHeading,
    interpretBody,
    processTitle,
    processNote,
    processSteps[] {
      _key,
      title,
      text
    },
    takeawayHeading,
    takeawayBody,
    lessonBody,
    serviceLinkText,
    serviceLinkHref,
    resultNote,
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonText,
    ctaButtonHref
  }
`;

// Query Casey Insurance Group Case Study singleton
export const CASEY_CASE_STUDY_QUERY = groq`
  *[_type == "caseyCaseStudy" || _id == "caseyCaseStudy"][0] {
    _id,
    _type,
    breadcrumbText,
    breadcrumbHref,
    clientName,
    service,
    heroEyebrow,
    headline,
    intro,
    metrics[] {
      _key,
      value,
      label
    },
    contextEyebrow,
    contextHeading,
    contextBody,
    objectiveLabel,
    objectiveText,
    producedHeading,
    producedBody,
    image {
      asset-> { _id, url },
      alt, hotspot, crop
    },
    "imageUrl": image.asset->url,
    imageAlt,
    interpretHeading,
    interpretBody,
    processTitle,
    processNote,
    processSteps[] {
      _key,
      title,
      text
    },
    takeawayHeading,
    takeawayBody,
    lessonBody,
    serviceLinkText,
    serviceLinkHref,
    resultNote,
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonText,
    ctaButtonHref
  }
`;

// Lightweight query — fetch only footer fields from the landing page singleton

// Used by pages that share the global editable footer without loading all landing page data.
export const FOOTER_QUERY = groq`
  *[_type == "landingPage" || _id == "landingPage"][0] {
    _id,
    _type,
    footerLogo {
      asset-> { _id, url },
      alt, hotspot, crop
    },
    "footerLogoUrl": footerLogo.asset->url,
    footerLogoAlt,
    footerLogoHref,
    footerTagline,
    footerNavHeading,
    footerNavLinks[] { _key, label, href },
    footerContactHeading,
    footerPhoneDisplay,
    footerPhoneTel,
    footerEmail,
    footerAddress,
    footerCopyright,
    footerLegalLinks[] { _key, label, href }
  }
`;
