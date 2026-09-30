import { AdminGate } from "@/components/admin-gate";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin Portal | Ikhtiyaar LLC",
  robots: { index: false, follow: false },
};
export default function Admin() {
  return (
    <AdminGate>
      <div className="cms">
        <header className="cms-header">
          <a className="cms-brand" href="/">
            Ikhtiyaar<span>Owner portal</span>
          </a>
          <a href="/admin/logout">Sign out</a>
        </header>
        <main className="cms-main">
          <div className="cms-title">
            <div>
              <span className="eyebrow">EVERYTHING IN ONE PLACE</span>
              <h1>What would you like to work on?</h1>
              <p>
                Your website content and publishing access, without touching
                code.
              </p>
            </div>
          </div>
          <div className="portal-grid">
            <a href="/admin/blog" className="cms-panel">
              <span className="step-number">01</span>
              <h2>Write & manage articles</h2>
              <p>
                Add text and images, save drafts, preview articles, and publish
                when they are ready.
              </p>
              <strong>Open blog manager</strong>
            </a>
            <a href="/admin/connections" className="cms-panel">
              <span className="step-number">02</span>
              <h2>Connect your AI tools</h2>
              <p>
                Let ChatGPT or another compatible assistant work on your blog
                with permission you control.
              </p>
              <strong>Manage AI access</strong>
            </a>
            <a href="/admin/guide" className="cms-panel">
              <span className="step-number">03</span>
              <h2>Website & hosting guide</h2>
              <p>
                Learn how to publish articles, move to Hostinger, and prepare
                for a public launch.
              </p>
              <strong>Read the guide</strong>
            </a>
          </div>
        </main>
      </div>
    </AdminGate>
  );
}
