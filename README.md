# Twitter Clone

This project features a full-stack web application that clones the core functionality of the social media platform Twitter (now known as X).

The project is built with the following technologies:

- A [Next.js](https://nextjs.org/) web application hosted on [Vercel](https://vercel.com/)
- React [server components](https://react.dev/reference/rsc/server-components) for server-side UI rendering and caching
- Next.js [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) for asynchronous server API calls
- A serverless [PostgreSQL](https://www.postgresql.org/) database hosted on [Neon](https://neon.tech/)
- [Drizzle](https://orm.drizzle.team/) for a TypeScript SQL-like ORM
- [Tailwind CSS](https://tailwindcss.com/) utility classes
- Re-usable and customisable components by [shadcn/ui](https://ui.shadcn.com/)
- Stateless session management using [JSON Web Tokens](https://jwt.io/)
- Light/dark mode by [next-themes](https://github.com/pacocoursey/next-themes)
- [Zod](https://zod.dev/) schema validation with [React Hook Form](https://react-hook-form.com/)

## Installation

Clone the git repository:

```bash
git clone https://github.com/aakashkcx/twitter-clone.git
# or
git clone git@github.com:aakashkcx/twitter-clone.git
```

Install dependencies:

```bash
pnpm install
```

Load the appropriate environment variables, as seen in `.env.example`:

```sh
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>

SESSION_TOKEN_SECRET=secret
SESSION_TOKEN_EXPIRY=1h
SESSION_COOKIE_NAME=session
SESSION_COOKIE_EXPIRY=3600
```

Apply the database schema:

```bash
pnpm db:push
```

Run development server:

```bash
pnpm dev
```

Or, deploy the application:

```bash
pnpm build
pnpm start
```

Optional: run Drizzle Studio to explore the database:

```bash
db:studio
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
