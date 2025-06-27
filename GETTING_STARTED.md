# Getting Started with Visitor Kiosk

Welcome to the Visitor Kiosk application! This guide will help you get the application up and running quickly.

## Quick Start

### 1. Prerequisites

Make sure you have the following installed:
- **Node.js 18+** (Download from [nodejs.org](https://nodejs.org/))
- **pnpm** (Install with `npm install -g pnpm` or visit [pnpm.io](https://pnpm.io/))

### 2. Installation

1. **Clone or download** the project to your local machine
2. **Open terminal** in the project directory
3. **Run the setup script**:
   ```bash
   ./setup.sh
   ```
   Or manually run:
   ```bash
   pnpm install
   mkdir -p data
   ```

### 3. Configuration

Edit the `.env.local` file with your email settings:

```env
# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@company.com
ADMIN_EMAIL=admin@company.com
```

**Note:** Email configuration is optional for development but recommended for production.

### 4. Running the Application

#### Development Mode (Recommended for testing)

1. **Start the web server**:
   ```bash
   pnpm run dev
   ```

2. **Open your browser** to `http://localhost:3000`

#### Full Desktop Application

1. **Start the web server** (in one terminal):
   ```bash
   pnpm run dev
   ```

2. **Start Electron** (in another terminal):
   ```bash
   pnpm run electron
   ```

3. **Or use the combined command**:
   ```bash
   pnpm run electron-dev
   ```

## First Time Setup

### Default Admin Account

The application comes with a default admin account:
- **Username:** `admin`
- **Password:** `admin123`

**⚠️ Important:** Change these credentials in production!

### Default Employees

The system includes sample employees:
- John Doe (Engineering)
- Jane Smith (Marketing)
- Mike Johnson (Sales)
- Sarah Wilson (HR)

You can modify these in the database or add more through the admin interface.

## Using the Application

### Visitor Interface

1. **Main Screen**: Choose "Check In" or "Check Out"
2. **Check In**: Fill out visitor details and select who you're visiting
3. **Ticket Generated**: Note your 4-digit ticket number
4. **Check Out**: Enter your ticket number to complete your visit

### Admin Interface

1. **Access**: Click "Admin" on the main screen or go to `/admin`
2. **Login**: Use admin credentials
3. **Dashboard**: View real-time visitor activity
4. **Manual Check-out**: Force check-out visitors who forgot
5. **Export Data**: Download visitor records as Excel file

## File Structure

```
visitor-kiosk-app/
├── src/
│   ├── app/              # Next.js pages
│   │   ├── page.tsx      # Main kiosk interface
│   │   ├── check-in/     # Visitor check-in
│   │   ├── check-out/    # Visitor check-out
│   │   ├── admin/        # Admin interface
│   │   └── api/          # Backend API routes
│   ├── components/       # UI components
│   ├── lib/             # Utilities & database
│   └── styles/          # CSS styles
├── electron/            # Electron app files
├── data/               # SQLite database (created automatically)
└── dist/               # Built application (after build)
```

## Common Issues & Solutions

### Port Already in Use
If port 3000 is busy, Next.js will automatically use 3001. Update the Electron configuration if needed.

### Database Issues
If you encounter database problems:
1. Stop the application
2. Delete the `data/visitor-kiosk.db` file
3. Restart the application (it will recreate the database)

### Email Not Working
Email notifications are optional. The application will work without email configuration, but you'll see console warnings.

### Kiosk Mode Issues
In development, kiosk mode is disabled. To test full kiosk mode:
1. Build the application: `pnpm run build`
2. Run the built version: `pnpm run electron`

## Development

### Adding New Features

1. **Frontend**: Add React components in `src/components/`
2. **Pages**: Add new pages in `src/app/`
3. **API**: Add backend routes in `src/app/api/`
4. **Database**: Modify `src/lib/database.ts`

### Styling

The application uses **Tailwind CSS** for styling. Key files:
- `src/styles/globals.css` - Global styles
- `tailwind.config.js` - Tailwind configuration

### Database Schema

SQLite tables:
- `visitors` - Main visitor records
- `employees` - Company employees
- `admins` - Admin users
- `daily_counters` - Ticket number tracking

## Production Deployment

### Building the Application

```bash
pnpm run build
pnpm run dist
```

This creates a distributable Electron app in the `dist/` folder.

### Kiosk Hardware Setup

1. **Install** the built application on kiosk hardware
2. **Configure** auto-start on boot
3. **Set up** network connectivity
4. **Test** all functionality

### Security Considerations

- [ ] Change default admin credentials
- [ ] Use strong JWT secret
- [ ] Secure email credentials
- [ ] Regular database backups
- [ ] Update dependencies regularly

## Support

### Troubleshooting Steps

1. **Check the console** for error messages
2. **Verify dependencies** are installed (`pnpm install`)
3. **Check port availability** (3000/3001)
4. **Review configuration** in `.env.local`
5. **Clear data** if database is corrupted

### Getting Help

- Check the main `README.md` file
- Review the code comments
- Check the browser developer console
- Look at the terminal output for errors

---

## Summary

You now have a fully functional visitor kiosk system! The application provides:

✅ **Touch-friendly kiosk interface**  
✅ **Secure admin dashboard**  
✅ **Automatic ticket generation**  
✅ **Email notifications**  
✅ **Data export capabilities**  
✅ **Full-screen kiosk mode**  

The system is ready for deployment in office reception areas or any location where visitor management is needed.

**Next Steps:**
1. Customize the employee list for your organization
2. Configure email notifications
3. Test the full workflow
4. Deploy to your kiosk hardware

Good luck with your visitor management system! 🚀
