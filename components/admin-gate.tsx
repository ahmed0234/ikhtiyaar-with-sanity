import { isAuthenticated } from "@/lib/auth";

export async function AdminGate({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();
  if (!authed) {
    return (
      <main className="admin-gate">
        <span className="eyebrow">IKHTIYAAR ADMIN</span>
        <h1>Protected Owner Portal</h1>
        <p>Sign in with your administrator credentials to manage your website.</p>
        <a className="button button-dark" href="/admin/login">
          Sign in
        </a>
        <p>
          <a href="/">Back to the website</a>
        </p>
      </main>
    );
  }
  return <>{children}</>;
}
