# Copilot Instructions

This file guides GitHub Copilot to follow Next.js-specific conventions for consistent and idiomatic code generation.

---

## 1. Overview

Briefly state the project’s purpose and name, e.g.:

> This is "Visitor Kios", a Next.js (App Router) application for managing visitor check-ins and appointments.

---

## 2. Project Structure & Naming

```
src/
  app/                # App Router directory
    layout.tsx        # Root layout
    page.tsx          # Route entry points
    [param]/          # Dynamic route segments
    api/              # Serverless route handlers
  components/         # Reusable UI components
  lib/                # Utilities and helpers
  styles/             # Global and shared styles (globals.css)
  public/             # Static assets
next.config.js
tsconfig.json
```

* **Directories:** Keep all pages and layouts under `src/app/`.
* **File Names:**

  * Routes: `page.tsx`,
  * Layouts: `layout.tsx`,
  * Error boundaries: `error.tsx`,
  * Loading states: `loading.tsx`.
* **Components:** PascalCase (`Button.tsx`).
* **Utilities:** kebab-case (`api-client.ts`).
* **Variables & Functions:** camelCase.
* **Path Aliases:** Use `@/*` mapping to `src/*` in `tsconfig.json`.

---

## 3. App Router Conventions

* **Layouts & Nesting:**

  * Create shared layouts with nested `layout.tsx` files.
  * Use `children` prop and React Server Components by default.
* **Server vs Client Components:**

  * Default to Server Components; add `'use client'` only at the top of files requiring state/hooks.
* **Dynamic Routes:**

  * Use `[slug]`, `[...rest]`, or `[[optional]]` folder names.
  * Retrieve params via the `params` argument in page components.

---

## 4. Data Fetching Patterns

* **Server Components:**

  * Fetch data with `async` directly in component.
  * Example:

    ```tsx
    export default async function Page() {
      const data = await fetch(...);
      return <div>{data.title}</div>;
    }
    ```
* **Client Components:**

  * Use React Hooks (`useEffect`, `useState`) or SWR/React Query.
  * Mark with `'use client'` at top.
* **Caching & Revalidation:**

  * Leverage Next.js `fetch` options: `{ next: { revalidate: 60 } }` for ISR.

---

## 5. Metadata & SEO

* Export `metadata` in layouts or pages:

  ```ts
  export const metadata: Metadata = {
    title: 'My Page',
    description: 'Page description',
  };
  ```
* Use `<Head>` only for specialized tags not covered by `metadata`.

---

## 6. Styling & Assets

* **Global Styles:** Define in `styles/globals.css` and import in root layout.
* **CSS Modules:** Use `[name].module.css` for scoped styles if needed.
* **Tailwind CSS:** Apply utility classes; configure JIT and prefix in `tailwind.config.js`.
* **Images:** Use Next.js `<Image>` for optimized loading.

---

## 7. Copilot Usage Guidelines

* **Snippet Generation:**

  * Provide concise code blocks; denote unchanged parts with `// ...`
* **Following Patterns:**

  * Mirror existing file and directory conventions before adding new files.
* **API Routes:**

  * Place under `src/app/api/[route]/route.ts` with exported HTTP handlers.
* **Focus on Conventions:**

  * Prioritize on SSR, App Router patterns, file naming, and data fetching best practices.

---
