import {SiteHeader} from "./site-header";
import {SiteFooter} from "./site-footer";
import {legalPages} from "@/content/legal";
export function LegalPage({kind}:{kind:keyof typeof legalPages}){const [title,intro,sections]=legalPages[kind];return <><SiteHeader/><main id="main" className="section"><div className="container legal-page"><span className="eyebrow">IKHTIYAAR LLC</span><h1>{title}</h1><p className="article-excerpt">{intro}</p><p className="legal-date">Last updated: September 30, 2026</p>{sections.map(([heading,body])=><section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}<div className="legal-links"><a href="/privacy">Privacy</a><a href="/cookies">Cookies</a><a href="/terms">Terms</a><a href="/accessibility">Accessibility</a></div></div></main><SiteFooter/></>}
