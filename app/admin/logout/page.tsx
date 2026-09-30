export default function Logout() {
  return (
    <main className="admin-gate">
      <span className="eyebrow">ADMIN PORTAL</span>
      <h1>Sign out of your account?</h1>
      <p>You will need your administrator email and password to sign back in.</p>
      <form method="post" action="/api/admin/logout" style={{ marginTop: "20px" }}>
        <button type="submit" className="button button-dark">
          Sign out now
        </button>
      </form>
      <p style={{ marginTop: "16px" }}>
        <a href="/admin">Cancel and return to dashboard</a>
      </p>
    </main>
  );
}
