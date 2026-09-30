console.log(`
[INFO] Admin accounts are now configured directly through environment variables.
There are no database tables or terminal commands needed for admin accounts.

Simply set these in your .env or Vercel dashboard:
  AUTH_EMAIL=your-email@example.com
  AUTH_PASSWORD=your-secure-password
  AUTH_SECRET=your-random-32-char-secret

Then visit /admin/login to sign in.
`);
