import { notFound, redirect } from "next/navigation";
import { ServiceVisual } from "@/components/service-visual";
import { serviceDetails } from "@/content/service-details";
import { services } from "@/content/services";
import { SiteHeader } from "@/components/site-header";
import { SanityFooter } from "@/components/sanity-footer";
import { PageCTA } from "@/components/site-footer";
import { pageMeta, SITE_URL } from "@/lib/seo";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s
    ? pageMeta(s.name + " for Service Businesses", s.intro, "/services/" + slug)
    : {};
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug.toLowerCase() === "google-ads") redirect("/services/google-ads");
  if (slug.toLowerCase() === "meta-ads") redirect("/services/meta-ads");
  if (slug.toLowerCase() === "seo") redirect("/services/seo");
  if (slug.toLowerCase() === "cold-email") redirect("/services/cold-email");
  if (slug.toLowerCase() === "chatgpt-ads") redirect("/services/chatgpt-ads");
  if (slug.toLowerCase() === "aeo") redirect("/services/aeo");
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const detail = serviceDetails[s.slug];
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="inner-hero">
          <div className="container service-hero-grid">
            <div>
              <a className="breadcrumb" href="/">
                Home
              </a>
              <span className="eyebrow">{s.name}</span>
              <h1>{s.headline}</h1>
              <p>{s.intro}</p>
              <a href="/#contact" className="button button-blue">
                Let's see if this fits your business
              </a>
              <span className="small-note">
                A straightforward conversation. No technical homework.
              </span>
            </div>
            <ServiceVisual slug={s.slug} name={s.name} />
          </div>
        </section>
        <section className="section">
          <div className="container service-explainer">
            <div>
              <span className="eyebrow">WHAT IT ACTUALLY MEANS</span>
              <h2>{s.name}, in plain English.</h2>
              <p>{detail.explain}</p>
            </div>
            <aside>
              <span className="eyebrow">PICTURE THIS</span>
              <p>{detail.example}</p>
            </aside>
          </div>
        </section>
        <section className="section soft-section">
          <div className="container">
            <span className="eyebrow">WHAT WE HANDLE FOR YOU</span>
            <h2 className="section-title">The work behind the result.</h2>
            <div className="deliverables-grid">
              {detail.includes.map(([title, text], i) => (
                <article key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="section-intro">
              <span className="eyebrow">A PLAN BUILT AROUND YOUR BUSINESS</span>
              <h2>{s.hook}</h2>
            </div>
            <div className="service-steps">
              {s.steps.map(([title, body], i) => (
                <article key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="measure-box">
              <h3>What we'll pay attention to</h3>
              <p>{s.measure}</p>
            </div>
            {(slug === "google-ads" || slug === "seo") && (
              <a
                className="case-proof-link"
                href={
                  "/case-studies/" +
                  (slug === "seo"
                    ? "casey-insurance-group"
                    : "ridgewell-landscape-design")
                }
              >
                <strong>
                  {slug === "seo"
                    ? "2,000 average monthly organic visitors. 100+ leads."
                    : "About $4,000 spent. $200,000 in client revenue."}
                </strong>
                <span>
                  Read the{" "}
                  {slug === "seo" ? "Casey Insurance Group" : "Ridgewell"} case
                  study
                </span>
              </a>
            )}
          </div>
        </section>
        <section className="section service-fit-section">
          <div className="container service-fit">
            <div>
              <span className="eyebrow">IS THIS RIGHT FOR YOU?</span>
              <h2>A good fit starts here.</h2>
              <ul>
                {detail.fit.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>What to expect along the way</h3>
              <p>{detail.timeline}</p>
              <h3>What we need from you</h3>
              <p>{detail.yourpart}</p>
            </div>
          </div>
        </section>
        <section className="section soft-section">
          <div className="container narrow">
            <span className="eyebrow">BEFORE YOU DECIDE</span>
            <h2>A few things you might be wondering.</h2>
            <div className="plain-faq">
              {s.faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <span className="eyebrow">OTHER WAYS WE CAN HELP</span>
            <div className="related-services">
              {services
                .filter((x) => x.slug !== slug)
                .map((x) => (
                  <a href={"/services/" + x.slug} key={x.slug}>
                    {x.name}
                  </a>
                ))}
            </div>
          </div>
        </section>
        <PageCTA />
      </main>
      <SanityFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            description: s.intro,
            url: SITE_URL + "/services/" + slug,
            provider: { "@type": "Organization", name: "Ikhtiyaar LLC" },
          }).replace(/</g, "\u003c"),
        }}
      />
    </>
  );
}
