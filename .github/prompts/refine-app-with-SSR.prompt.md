---
mode: "agent"
description: "Refine the Next.js app to use server-side rendering (SSR) and modularize the client-side code."
---

- Make every page render on the server side
- transfer the 'use client' part of every page to files that will be named as "_____Module.tsx", where "_____" part is the name of the module. For instance, "CheckinModule.tsx", "CheckoutModule.tsx" etc. Store them in at `src/modules` directory.
- All functions of this app must be using arrow functions