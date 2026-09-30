export type Block={id:string;type:"paragraph"|"heading"|"list"|"image";text:string;src?:string;alt?:string;caption?:string};
export type Post={id:string;slug:string;title:string;excerpt:string;seo_title:string;seo_description:string;cover:string;cover_alt:string;blocks:Block[];status:"draft"|"published";created_at:string;updated_at:string;published_at:string|null;revision:number};
export type BlogTemplate={author:string;ctaTitle:string;ctaText:string;ctaButton:string};
export const defaultTemplate:BlogTemplate={author:"Ikhtiyaar LLC",ctaTitle:"Want to put this into practice?",ctaText:"Tell us about your business and the work you want more of. Let's see where we can help.",ctaButton:"Let's talk about your business"};
export function slugify(s:string){return s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,100)}
