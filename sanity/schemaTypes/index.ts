import { type SchemaTypeDefinition } from "sanity";
import { landingPageType } from "./landingPageType";
import { blogPostType } from "./blogPostType";
import { siteSettingsType } from "./siteSettingsType";
import { googleAdsPageType } from "./googleAdsPageType";

export const schemaTypes: SchemaTypeDefinition[] = [
  landingPageType,
  blogPostType,
  siteSettingsType,
  googleAdsPageType,
];
