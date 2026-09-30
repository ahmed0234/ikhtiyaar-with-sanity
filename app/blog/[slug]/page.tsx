import {notFound} from "next/navigation";
import {getPost,getTemplate} from "@/lib/blog";
import {SITE_URL,pageMeta} from "@/lib/seo";
import {BlogArticle} from "@/components/blog-article";
import {SiteHeader} from "@/components/site-header";
import {SiteFooter} from "@/components/site-footer";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const p=await getPost(slug);return p?pageMeta(p.seo_title||p.title,p.seo_description||p.excerpt,'/blog/'+slug):{title:"Article not found",robots:{index:false}}}
export default async function Article({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const p=await getPost(slug);if(!p)notFound();const template=await getTemplate();return <><SiteHeader/><main id="main" className="section"><div className="container"><a className="breadcrumb dark" href="/blog">All articles</a><BlogArticle post={p} template={template}/></div></main><SiteFooter/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.excerpt,datePublished:p.published_at,dateModified:p.updated_at,author:{'@type':'Organization',name:template.author},publisher:{'@type':'Organization',name:'Ikhtiyaar LLC'},mainEntityOfPage:SITE_URL+'/blog/'+p.slug,...(p.cover?{image:SITE_URL+p.cover}:{})}).replace(/</g,'\u003c')}}/></>}
