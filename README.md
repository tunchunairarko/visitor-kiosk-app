# Visitor Kiosk Application

A comprehensive desktop visitor management system built with **Electron**, **Next.js**, **Tailwind CSS**, and **Shadcn UI**. This application provides a full-screen kiosk interface for visitor check-ins and a secure admin dashboard for management.

## Features

### Visitor Interface
- **Full-screen kiosk mode** for visitor interactions
- **Check-in process** with visitor details and employee selection
- **Unique daily ticket generation** (0000-9999, resets daily)
- **Check-out functionality** using ticket numbers
- **Clean, touch-friendly interface**

### Admin Interface
- **Secure login** with username/password authentication
- **Real-time dashboard** with visitor statistics
- **Today's visitor list** with manual check-out capability
- **Data export** to Excel format
- **Historical records** with pagination and filtering

### Technical Features
- **SQLite database** for data persistence
- **Electron wrapper** for desktop deployment
- **Email notifications** for visitor arrivals
- **Responsive design** with Tailwind CSS
- **Modern UI components** with Shadcn UI

## Tech Stack

- **Frontend:** Next.js 14 with TypeScript
- **Desktop:** Electron 27
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI + Radix UI
- **Database:** SQLite3
- **Authentication:** JWT tokens
- **Email:** Nodemailer

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd visitor-kiosk-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Create data directory:**
   ```bash
   mkdir data
   ```

## Prerequisites

This project uses **pnpm** as the package manager for better performance and disk efficiency.

### Installing pnpm

If you don't have pnpm installed, you can install it globally:

```bash
npm install -g pnpm
```

Or visit [pnpm.io](https://pnpm.io/installation) for other installation methods.

## Development

1. **Start the Next.js development server:**
   ```bash
   pnpm run dev
   ```

2. **In a new terminal, start Electron (after Next.js is running):**
   ```bash
   pnpm run electron-dev
   ```

3. **For development with auto-reload:**
   ```bash
   pnpm run electron-dev
   ```

## Building for Production

1. **Build the Next.js application:**
   ```bash
   pnpm run build
   ```

2. **Build the Electron application:**
   ```bash
   pnpm run dist
   ```

The built application will be in the `dist` directory.

## Default Admin Credentials

- **Username:** admin
- **Password:** admin123

⚠️ **Important:** Change these credentials in a production environment!

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main kiosk interface
│   ├── check-in/          # Visitor check-in flow
│   ├── check-out/         # Visitor check-out flow
│   ├── admin/             # Admin interface
│   └── api/               # API routes
├── components/            # Reusable UI components
│   └── ui/               # Shadcn UI components
├── lib/                  # Utilities and database
└── styles/               # Global styles

electron/
├── main.js               # Electron main process
└── preload.js           # Preload script
```

## Database Schema

The application uses SQLite with the following tables:

- **visitors:** Main visitor records with check-in/out times
- **employees:** Company employees that can be visited
- **admins:** Admin users for dashboard access
- **daily_counters:** Daily ticket number tracking

## Email Notifications

When a visitor checks in, email notifications are sent to:
- The employee being visited
- System administrators (CC)

Configure email settings in `.env.local`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@company.com
```

## Kiosk Mode

The application runs in full-screen kiosk mode by default in production:
- Prevents navigation away from the app
- Disables right-click context menus
- Hides browser UI elements
- Prevents text selection (except in input fields)

To disable kiosk mode for development, modify `electron/main.js`:

```javascript
kiosk: false, // Set to false for development
```

## Security Features

- **Admin authentication** with JWT tokens
- **Input validation** on all forms
- **SQL injection prevention** with parameterized queries
- **XSS protection** through React's built-in escaping
- **CSRF protection** through same-origin policy

## Customization

### Adding New Employees

Employees can be added directly to the database or through the admin interface (feature can be extended). Default employees are seeded automatically.

### Modifying Ticket Number Format

Edit the `generateTicketNumber()` method in `src/lib/database.ts` to change the ticket format.

### Styling Changes

The application uses Tailwind CSS. Modify the design by editing the utility classes in the components or by updating the Tailwind configuration.

### Email Templates

Email notifications can be customized by implementing the email service in the API routes.

## Deployment

### Desktop Application

Build the Electron app for distribution:

```bash
pnpm run dist
```

### Kiosk Setup

1. Install the built application on the kiosk hardware
2. Configure the system to auto-start the application
3. Set up the display in portrait or landscape mode as needed
4. Ensure network connectivity for email notifications

## Troubleshooting

### Database Issues

If the database becomes corrupted:
1. Stop the application
2. Delete the `data/visitor-kiosk.db` file
3. Restart the application (it will recreate the database)

### Permission Issues

On some systems, you may need to grant permissions for:
- Database file creation
- Network access for emails
- Full-screen access

### Development Issues

- Ensure Node.js 18+ is installed
- Clear `node_modules` and reinstall if dependency issues occur (`pnpm install`)
- Check that ports 3000 is available for development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Support

For support and questions:
- Check the documentation
- Review the troubleshooting section
- Open an issue on the repository

---

**Note:** This application is designed for internal company use. Ensure proper security measures are in place before deploying in a production environment.
