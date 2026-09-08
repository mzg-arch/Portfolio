# Micahel Biru — Portfolio

A responsive personal portfolio built with Next.js 16.2, TypeScript, and Tailwind CSS 4.3.
It presents Micahel's resume-backed experience, projects, skills, and education, and
includes a server-side contact form that sends mail through the Resend REST API.

## Requirements

- Node.js 20.9 or newer
- npm (included with Node.js)
- A Resend account for contact form delivery

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   macOS or Linux:

   ```bash
   cp .env.example .env.local
   ```

3. Replace the placeholder values in `.env.local`:

   ```dotenv
   RESEND_API_KEY=re_your_api_key
   CONTACT_FROM_EMAIL="Micahel Biru Portfolio <portfolio@your-verified-domain.com>"
   CONTACT_TO_EMAIL=mdawit384@gmail.com
   ```

   These variables are server-only. Do not prefix them with `NEXT_PUBLIC_` and do not
   commit `.env.local`.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Contact form and Resend

The contact endpoint uses Resend's HTTPS API directly, so the project does not need a mail
SDK. The three required environment variables are:

| Variable             | Purpose                                                     |
| -------------------- | ----------------------------------------------------------- |
| `RESEND_API_KEY`     | Secret server-side API key used to authorize email requests |
| `CONTACT_FROM_EMAIL` | Sender name and address shown on contact-form messages      |
| `CONTACT_TO_EMAIL`   | Inbox that receives contact-form messages                   |

### Verify a sending domain

1. In the Resend dashboard, open **Domains**, choose **Add Domain**, and enter a domain or
   sending subdomain you control (for example, `send.example.com`).
2. Add every DNS record Resend provides to your DNS host. These records establish DKIM and
   SPF authentication.
3. Wait for the domain status in Resend to become **Verified**.
4. Open **API Keys**, create a key with **Sending access**, and restrict it to the
   verified domain when that option is available.
5. Set `CONTACT_FROM_EMAIL` to an address on that verified domain. The address itself does
   not need a mailbox, but its domain must match the verified domain.

For a short local test, Resend's test sender may be usable with the recipient restrictions
shown in your Resend account. A verified domain is required before using a custom sender
or receiving messages reliably from public visitors.

## Quality checks

Run the same checks before every deployment:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

To run the production build locally after `npm run build`:

```bash
npm run start
```

## Deploy to Vercel

### Vercel dashboard

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. Sign in to Vercel and select **Add New → Project**.
3. Import the repository.
4. Leave **Framework Preset** set to **Next.js** and the project root set to `./`. Vercel
   detects `npm run build` automatically.
5. Before deploying, expand **Environment Variables** and add: `RESEND_API_KEY`,
   `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.
6. Apply all three variables to **Production**, **Preview**, and **Development**, or limit
   them deliberately if preview contact forms should not send email.
7. Select **Deploy**.
8. If variables were added after the first build, open **Deployments**, choose the latest
   deployment, and select **Redeploy** so the server runtime receives them.

### Vercel CLI

The CLI can link and deploy the project without a global installation:

```bash
npx vercel@latest login
npx vercel@latest link
npx vercel@latest env add RESEND_API_KEY production
npx vercel@latest env add CONTACT_FROM_EMAIL production
npx vercel@latest env add CONTACT_TO_EMAIL production
npx vercel@latest --prod
```

Each `env add` command prompts for the value. Add the same variables for the `preview`
environment if preview deployments should have a working form:

```bash
npx vercel@latest env add RESEND_API_KEY preview
npx vercel@latest env add CONTACT_FROM_EMAIL preview
npx vercel@latest env add CONTACT_TO_EMAIL preview
```

After linking, you can pull Development variables into `.env.local` with:

```bash
npx vercel@latest env pull .env.local
```

## Project scripts

| Command                | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start the local development server            |
| `npm run build`        | Create an optimized production build          |
| `npm run start`        | Serve the production build                    |
| `npm run format`       | Format source and documentation with Prettier |
| `npm run lint`         | Run ESLint with Next.js and TypeScript rules  |
| `npm run typecheck`    | Run TypeScript without emitting files         |
| `npm run format:check` | Verify formatting with Prettier               |
