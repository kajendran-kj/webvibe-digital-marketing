# WebVibe Admin Workspace

This version adds a `/admin` workspace to the existing WebVibe static HTML/CSS/JS site.

## Deploy on Netlify

1. Upload/push this folder to the Netlify site that serves WebVibe.
2. In Netlify: Site configuration → Environment variables, add:
   - `WEBVIBE_ADMIN_EMAIL` = your admin email
   - `WEBVIBE_ADMIN_PASSWORD` = a strong unique password
   - `WEBVIBE_SESSION_SECRET` = a long random secret (at least 32 characters)
3. Trigger a new deploy.
4. Open `https://YOUR-DOMAIN/admin/`.
5. Sign in with the environment-variable credentials.

The backend uses Netlify Functions + Netlify Blobs. No Supabase account is required for this version.

## What it manages

- Homepage hero content
- Services
- Portfolio projects created in the admin
- Testimonials
- Leads from the website contact form
- Basic site settings

Existing static portfolio cards remain in place. The admin-created portfolio list is stored separately so the current design is not destroyed.

## Important

The admin requires Netlify Functions/Blobs. It will not work correctly by opening the HTML files with `file://` or using a simple static file server.

Do not put passwords or Netlify secrets in HTML/JavaScript. Keep them in Netlify environment variables.
