import { type SchemaTypeDefinition } from "sanity";
import { landingPageType } from "./landingPageType";
import { blogPostType } from "./blogPostType";
import { postType } from "./postType";

export const schemaTypes: SchemaTypeDefinition[] = [
  landingPageType,
  blogPostType,
  postType,
];
