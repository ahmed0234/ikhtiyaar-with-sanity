import { isAuthenticated } from "@/lib/auth";
import { getPosts, getTemplate } from "@/lib/blog";
import { BlogManager } from "@/components/blog-manager";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Blog Manager | Ikhtiyaar LLC",
  robots: { index: false, follow: false },
};

export default async function AdminBlogPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    return (
      <main className="admin-gate">
        <h1>Your blog, made simple.</h1>
        <p>Sign in with your administrator credentials to write, edit, and publish.</p>
        <a className="button button-dark" href="/admin/login?returnTo=/admin/blog">
          Sign in
        </a>
      </main>
    );
  }

  try {
    return (
      <BlogManager
        initialPosts={await getPosts(true)}
        initialTemplate={await getTemplate()}
      />
    );
  } catch (e) {
    console.error(e);
    return (
      <main className="admin-gate">
        <h1>Your blog is temporarily unavailable.</h1>
        <p>
          Your saved articles have not been changed. Please reload to try again.
        </p>
        <a href="/admin/blog">Retry</a>
      </main>
    );
  }
}
