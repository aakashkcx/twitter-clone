# Twitter Clone

This project features a full-stack web application that clones the Twitter (now known as X) social media platform. The project is built with the following technologies:

- A [Next.js](https://nextjs.org/) web application
- [Typescript](https://www.typescriptlang.org/) type checking
- React [server components](https://react.dev/reference/rsc/server-components) for server-side UI rendering and caching
- Next.js [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) for asynchronous server calls and data mutations
- A SQLite database with [Drizzle ORM](https://orm.drizzle.team/) for data query APIs
- [Tailwind CSS](https://tailwindcss.com/) utility classes
- Re-usable and customisable components by [shadcn/ui](https://ui.shadcn.com/)
- Stateless session management using [JSON Web Tokens](https://jwt.io/)
- Light/dark mode by [next-themes](https://github.com/pacocoursey/next-themes)
- [Zod](https://zod.dev/) schema validation with [React Hook Form](https://react-hook-form.com/)

## Installation

Clone the git repository:

```bash
git clone https://github.com/aakashkcx/twitter-clone.git
git clone git@github.com:aakashkcx/twitter-clone.git
```

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Deploy the application:

```bash
pnpm build
pnpm start
```

Optional: run Drizzle Studio to explore database:

```bash
db:studio
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
