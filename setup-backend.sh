#!/bin/bash

# Helpi Backend Setup Script
# This script helps set up the backend with database and webhooks

echo "🚀 Setting up Helpi Backend..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found. Please create it with the required environment variables."
    echo "📝 See BACKEND_SETUP.md for details on required variables."
    exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL=" .env.local; then
    echo "❌ DATABASE_URL not found in .env.local"
    echo "📝 Please add your PostgreSQL connection string to .env.local"
    exit 1
fi

echo "✅ Environment variables found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Check database connection
echo "🔍 Checking database connection..."
if npx prisma db status > /dev/null 2>&1; then
    echo "✅ Database connection successful"
    
    # Run migrations
    echo "🗄️ Running database migrations..."
    npx prisma migrate dev --name init
    
    echo "✅ Database setup complete"
else
    echo "❌ Database connection failed"
    echo "📝 Please check your DATABASE_URL in .env.local"
    echo "💡 Make sure PostgreSQL is running and accessible"
    exit 1
fi

# Check if webhook secrets are set
echo "🔐 Checking webhook configuration..."

if ! grep -q "CLERK_WEBHOOK_SECRET=" .env.local; then
    echo "⚠️  CLERK_WEBHOOK_SECRET not found"
    echo "📝 Please add your Clerk webhook secret to .env.local"
fi

if ! grep -q "STRIPE_WEBHOOK_SECRET=" .env.local; then
    echo "⚠️  STRIPE_WEBHOOK_SECRET not found"
    echo "📝 Please add your Stripe webhook secret to .env.local"
fi

echo ""
echo "🎉 Backend setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure Clerk webhooks: https://dashboard.clerk.com/webhooks"
echo "2. Configure Stripe webhooks: https://dashboard.stripe.com/webhooks"
echo "3. Start the development server: npm run dev"
echo "4. Test the authentication flow"
echo ""
echo "📚 For detailed setup instructions, see BACKEND_SETUP.md"
