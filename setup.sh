#!/bin/bash

# Visitor Kiosk Setup Script
echo "🚀 Setting up Visitor Kiosk Application..."

# Create data directory if it doesn't exist
if [ ! -d "data" ]; then
  echo "📁 Creating data directory..."
  mkdir -p data
fi

# Check if .env.local exists, if not create from template
if [ ! -f ".env.local" ]; then
  echo "🔧 Creating environment configuration..."
  cat > .env.local << 'EOF'
# Environment Variables for Visitor Kiosk

# JWT Secret for admin authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@company.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@company.com

# Admin notifications
ADMIN_EMAIL=admin@company.com

# Database path (SQLite)
DATABASE_PATH=./data/visitor-kiosk.db
EOF
  echo "✏️  Please edit .env.local with your email configuration"
else
  echo "✅ Environment file already exists"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  if command -v pnpm &> /dev/null; then
    pnpm install
  else
    echo "⚠️  pnpm not found, using npm instead"
    npm install
  fi
else
  echo "✅ Dependencies already installed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application in development mode:"
echo "  pnpm run dev        # Start Next.js dev server"
echo "  pnpm run electron   # Start Electron (in another terminal)"
echo ""
echo "Or use the combined command:"
echo "  pnpm run electron-dev"
echo ""
echo "Default admin credentials:"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo "🔒 Remember to change the default admin password in production!"
