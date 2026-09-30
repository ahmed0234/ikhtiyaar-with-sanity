import {SITE_URL} from "@/lib/seo";
import {services} from "@/content/services";
import {cases} from "@/content/case-studies";
import {getPosts} from "@/lib/blog";
export const dynamic="force-dynamic";
export async function GET(){try{const posts=await getPosts();const urls=["","/about","/contact","/services","/privacy","/terms","/cookies","/accessibility","/case-studies","/blog",...services.map(s=>'/services/'+s.slug),...cases.map(c=>'/case-studies/'+c.slug)];const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(p=>'<url><loc>'+SITE_URL+p+'</loc></url>').join('')+posts.map(p=>'<url><loc>'+SITE_URL+'/blog/'+p.slug+'</loc><lastmod>'+p.updated_at+'</lastmod></url>').join('')+'</urlset>';return new Response(xml,{headers:{'Content-Type':'application/xml','Cache-Control':'no-cache'}})}catch(e){console.error(e);return new Response('Sitemap temporarily unavailable',{status:503})}}
