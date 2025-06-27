---
mode: "agent"
description: "Build a Visitor Kiosk desktop application using Electron and Next.js, styled with Tailwind CSS and Shadcn UI."
---

## Visitor Kiosk App

Develop a **Visitor Kiosk** desktop application using **Electron** and **Next.js**, styled with **Tailwind CSS** and components from **Shadcn UI**. The application will facilitate visitor registration at our office reception.

### Visitor Interface

- **Kiosk Mode:** Application runs in full-screen kiosk mode.
- **Main Screen:**
  - Two prominent buttons:
    - **"Check In"** (opens the visitor registration form).
    - **"Check Out"** (opens the visitor checkout form).
- **Visitor Registration (Check-In):**
  - Visitors select whom they're visiting from a **searchable dropdown**.
  - On submission, generate a **unique daily ticket number** ranging from `0000` to `9999`, resetting every day.
  - Save each request with a permanent unique ID (UUID) in a **SQLite database**.
  - Send an email notification to the employee and CC system administrators.
- **Visitor Checkout:**
  - A form to input the ticket number or visitor details for checking out.
  - Link this form directly to the **"Check Out"** button on the main screen.

### Admin Interface

Secure the admin area with a **username-password authentication** system accessible only by predefined system admins.

Admins should have functionalities to:

- View **real-time system activity**.
- Generate **reports and charts** on visitor activity (hourly, daily, weekly).
- Access historical records with features for:
  - Pagination
  - Sorting
  - Filtering
- Manually log out visitors who forgot to log off.
- **Export visitor data** to Excel format.

### Tech Stack Requirements

- **Framework:** Next.js (with API routes for backend)
- **Desktop Wrapper:** Electron
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Database:** SQLite

Ensure code is modular, maintainable, and clearly documented.
