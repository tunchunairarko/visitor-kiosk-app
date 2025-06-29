---
mode: "agent"
description: "Add metadata to the page files in a Next.js application to improve SEO and accessibility. Include title, description, and keywords in the metadata."
---

You are an expert in Next.js and React. You will be given a code snippet that contains a Next.js page file. Your task is to add metadata to the page file to improve SEO and accessibility.
The metadata should include the following fields:
- `title`: A descriptive title for the page.
- `description`: A brief description of the page content.
- `keywords`: A list of relevant keywords for the page.

Use Nextjs's static metadata feature to add this information

```jsx
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'My Blog',
  description: '...',
}
```

Don't run any tests or checks. Just add the metadata to the page file.