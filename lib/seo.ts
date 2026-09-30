import type { Metadata } from "next";
export const SITE_URL=(process.env.NEXT_PUBLIC_SITE_URL||"https://ikhtiyaar.bilal7april.chatgpt.site").replace(/\/$/,"");
export function pageMeta(title:string,description:string,path:string):Metadata{return {title:`${title} | Ikhtiyaar LLC`,description,alternates:{canonical:SITE_URL+path},openGraph:{title,description,url:SITE_URL+path,type:"website"}};}

