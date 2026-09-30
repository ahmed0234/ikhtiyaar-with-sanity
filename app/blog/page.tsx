import { getPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, PageCTA } from "@/components/site-footer";
export const dynamic = "force-dynamic";
export const metadata = pageMeta(
  "Practical Marketing Advice for Service Businesses",
  "Plain-language advice to help your business get found, bring in better inquiries, and turn more opportunities into work.",
  "/blog",
);
export default async function Blog() {
  let posts;
  try {
    posts = await getPosts();
  } catch (e) {
    console.error(e);
  }
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="inner-hero">
          <div className="container">
            <span className="eyebrow">THE IKHTIYAAR BLOG</span>
            <h1>
              A little clarity.
              <br />
              <em>A better next step.</em>
            </h1>
            <p>
              Straightforward advice on getting found, bringing in inquiries,
              and making your marketing work harder.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            {!posts ? (
              <div className="empty-state">
                <h2>Our articles are temporarily unavailable.</h2>
                <p>Please try again shortly.</p>
              </div>
            ) : posts.length ? (
              <div className="blog-grid">
                {posts.map((p) => (
                  <a className="blog-card" href={"/blog/" + p.slug} key={p.id}>
                    {p.cover && <img src={p.cover} alt={p.cover_alt} />}
                    <span className="eyebrow">
                      {new Date(p.published_at!).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <h2>{p.title}</h2>
                    <p>{p.excerpt}</p>
                    <strong>Read article</strong>
                  </a>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="eyebrow">GOOD ADVICE TAKES THOUGHT</span>
                <h2>Our first articles are on the way.</h2>
                <p>
                  In the meantime, see what our work has done for other
                  businesses.
                </p>
                <a href="/case-studies" className="button button-dark">
                  Explore the case studies
                </a>
              </div>
            )}
          </div>
        </section>
        <PageCTA />
      </main>
      <SiteFooter />
    </>
  );
}
