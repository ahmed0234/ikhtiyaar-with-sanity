# Ikhtiyaar: Hostinger deployment

This is the standalone Node.js edition of your website. The marketing pages, blog editor, image uploads, API keys, and MCP tools are included. It does not depend on ChatGPT sign-in. The server trusts only its own administrator sessions or scoped API keys, never OpenAI identity headers.

## Hosting requirements

- Node.js 22.13+ (Node 22 LTS recommended), HTTPS, and a persistent writable disk.
- A Hostinger VPS is the direct fit for the included SQLite and file-storage adapter. A managed Node.js plan must guarantee a persistent data path outside releases; otherwise use a VPS or adapt storage before launch.
- This is not a static HTML upload and will not run on PHP-only hosting.
- No hosting plan, domain change, or external account has been purchased or configured.

## First deployment

1. Upload this project to your server or a private Git repository. Install dependencies using `pnpm install --frozen-lockfile` with the packageManager version in package.json.
2. Set `NEXT_PUBLIC_SITE_URL=https://www.ikhtiyaar.com` (or your chosen primary HTTPS domain) before building. Set `IKHTIYAAR_DATA_DIR=/var/lib/ikhtiyaar` to a private directory writable by the application user. Keep it outside your release/source folder. Set these environment variables for migration, build, setup, and runtime.
3. Run `pnpm migrate`. This creates the database and records applied migrations. Never delete the data directory when deploying code.
4. Run `pnpm admin:create` interactively on the server. Enter your email and a unique password of at least 14 characters. It stores a salted scrypt hash, not the password. There is no default password and no public registration. Run again with the same email to reset the password and invalidate sessions.
5. If migrating existing content, download the owner-only blog backup from the old admin guide. Run `pnpm restore /private/path/ikhtiyaar-blog-backup.json` before adding new articles. It restores only into an empty blog and preserves IDs and page addresses. API keys do not transfer: create new ones after migration.
6. Run `pnpm build`, then run `pnpm start` under your service manager. Reverse-proxy it through Nginx or your Hostinger app proxy and enable a valid HTTPS certificate. Bind the application port to the local interface or restrict it with the firewall. Set the correct public Host and forwarded protocol headers at your trusted proxy.
7. Visit `/admin/login` over HTTPS. Test article creation, an inline image, preview, publish, unpublish, sign-out, the public page, `/sitemap.xml`, and a content backup. Session cookies are secure, HttpOnly, SameSite=Strict, and expire after eight hours.
8. Before moving DNS, verify contact form delivery using a clearly identified test inquiry. The current form uses your existing contact endpoint at `https://ikhtiyaarbackend.vercel.app/api/contact`; keep it working or replace it with your intended mail service. Preserve MX, SPF, DKIM, and other email DNS records. Redirect the secondary www/non-www version to the primary one.
9. Set redirects for any old page addresses on the current ikhtiyaar.com website that differ. Verify Search Console and submit `/sitemap.xml` after the public site is accessible.

## AI access

`/mcp` is a stateless Streamable HTTP MCP endpoint. Tools: list_articles, get_article, save_article_draft, publish_article. Create a scoped key in `/admin/connections`, then configure `Authorization: Bearer YOUR_KEY` in your client's secure connector settings. Draft keys cannot edit already-published articles. Keys expire in 90 days and can be revoked. Tools never publish as a side effect of saving a draft.

On standalone hosting there is no OAuth server. Claude or ChatGPT connector support for Bearer headers depends on the client and plan. Use a client supporting secure custom headers, a secure local MCP bridge, or configure a standards-compliant OAuth gateway. Do not paste your password or access key into an article, public chat, URL, or repository. The plugin provisioned for the old Sites URL does not automatically follow a domain migration.

For image uploads use `POST /api/blog/upload` with Authorization and a multipart `file` (JPG, PNG, WebP under 5 MB). The response provides a `/media/...` URL. Use `{type:"image",src:"/media/...",alt:"A useful description",caption:"Optional caption",text:""}` between paragraph blocks. `GET /api/blog/posts` lists full articles; `POST` saves complete article payloads with the current revision. Publish writes require publish permission. Use JSON, never raw HTML.

## Maintenance and security

Back up the SQLite database with SQLite's online backup API or a consistent database snapshot, plus the media directory, to a separate location. Copying only a live database file can omit WAL changes. The admin JSON export includes up to 20 MB of referenced images; use server backups for larger libraries. Test restores. Restrict database, backups, and credential files to the application owner, maintain HTTPS and OS updates, rotate unused API keys, and monitor logs. The application includes conservative login throttling; a reverse-proxy rate limit and MFA-capable identity provider are recommended additions for production administrators.

A legal/privacy review and accessibility audit remain launch responsibilities. Check partner status, evidence for results, permissions for logos/testimonials, privacy retention practices, and applicable jurisdictional requirements. Adding new tracking requires matching consent controls and policy updates.

## Validation status

The Sites edition and the portable Next.js build passed their compilation and type checks. Automated checks cover article image validation, revision conflicts, draft/publish scope separation, revoked and expired keys, and unauthorized MCP calls. Browser visual QA was unavailable in the authoring environment. Your exact Hostinger account, DNS, certificate, production email delivery, backup scheduling, and client-specific AI connection still require deployment-environment verification.
