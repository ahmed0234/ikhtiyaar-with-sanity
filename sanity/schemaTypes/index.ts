import { type SchemaTypeDefinition } from "sanity";
import { landingPageType } from "./landingPageType";
import { blogPostType } from "./blogPostType";
import { siteSettingsType } from "./siteSettingsType";
import { googleAdsPageType } from "./googleAdsPageType";
import { metaAdsPageType } from "./metaAdsPageType";
import { seoPageType } from "./seoPageType";
import { coldEmailPageType } from "./coldEmailPageType";
import { chatgptAdsPageType } from "./chatgptAdsPageType";
import { aeoPageType } from "./aeoPageType";
import { caseStudiesPageType } from "./caseStudiesPageType";
import { ridgewellCaseStudyType } from "./ridgewellCaseStudyType";
import { caseyCaseStudyType } from "./caseyCaseStudyType";

export const schemaTypes: SchemaTypeDefinition[] = [
  landingPageType,
  blogPostType,
  siteSettingsType,
  googleAdsPageType,
  metaAdsPageType,
  seoPageType,
  coldEmailPageType,
  chatgptAdsPageType,
  aeoPageType,
  caseStudiesPageType,
  ridgewellCaseStudyType,
  caseyCaseStudyType,
];

