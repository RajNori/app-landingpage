# Backend Setup Guide - Helpi Cleaning Services

This guide covers the complete backend setup with Clerk authentication, PostgreSQL database, and Stripe payment processing.

## 🗄️ Database Setup

### 1. PostgreSQL Database
Make sure you have a PostgreSQL database running. Update your `.env.local` with:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/helpi_db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Run Database Migrations
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 3. Database Schema Overview
The database includes the following models:

- **User**: Synced with Clerk authentication
- **Address**: Service locations for users
- **Booking**: Cleaning service bookings
- **ServiceItem**: Individual services within a booking
- **ServiceAddon**: Add-ons for service items

## 🔐 Clerk Authentication Setup

### 1. Configure Clerk Webhooks
1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Webhooks**
3. Click **Add Endpoint**
4. Set URL to: `https://yourdomain.com/api/webhooks/clerk`
5. Select events: `user.created`, `user.updated`, `user.deleted`
6. Copy the webhook secret to your `.env.local`

### 2. Clerk Webhook Events
The webhook handler automatically:
- Creates user records when users sign up
- Updates user data when profiles change
- Removes user data when accounts are deleted

## 💳 Stripe Payment Setup

### 1. Configure Stripe Webhooks
1. Go to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers > Webhooks**
3. Click **Add endpoint**
4. Set URL to: `https://yourdomain.com/api/webhooks/stripe`
5. Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
6. Copy the webhook secret to your `.env.local`

### 2. Payment Flow
1. User creates booking with cart items
2. Checkout API creates Stripe session and booking record
3. User completes payment via Stripe Checkout
4. Stripe webhook updates booking status to `PAID`

## 📡 API Endpoints

### User Management
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/users/addresses` - Get user addresses
- `POST /api/users/addresses` - Create new address
- `PUT /api/users/addresses/[id]` - Update address
- `DELETE /api/users/addresses/[id]` - Delete address

### Booking Management
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get specific booking
- `PATCH /api/bookings/[id]` - Update booking status
- `DELETE /api/bookings/[id]` - Cancel booking

### Webhooks
- `POST /api/webhooks/clerk` - Clerk authentication webhooks
- `POST /api/webhooks/stripe` - Stripe payment webhooks

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Generate Prisma client
npx prisma generate

# Reset database (development only)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio

# Check database status
npx prisma db status
```

## 🚀 Production Deployment

### 1. Environment Variables
Ensure all environment variables are set in your production environment:

```env
# Database (use production PostgreSQL)
DATABASE_URL="postgresql://user:pass@prod-db:5432/helpi"

# Clerk (use production keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...

# Stripe (use live keys)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Database Migration
```bash
# Run production migration
npx prisma migrate deploy
```

### 3. Webhook URLs
Update webhook URLs in Clerk and Stripe dashboards to point to your production domain.

## 🧪 Testing

### 1. Test User Flow
1. Sign up with Clerk
2. Add address via API
3. Create booking with services
4. Complete Stripe payment
5. Verify booking status updates

### 2. Test Webhooks
Use tools like ngrok for local webhook testing:
```bash
# Install ngrok
npm install -g ngrok

# Expose local server
ngrok http 3000

# Use ngrok URL for webhook endpoints
```

## 🔍 Monitoring

### 1. Database Monitoring
- Use Prisma Studio for data inspection
- Monitor database performance
- Set up alerts for failed queries

### 2. Webhook Monitoring
- Check Clerk dashboard for webhook delivery status
- Monitor Stripe webhook logs
- Set up error alerts for failed webhooks

## 📊 Analytics & Reporting

The database schema supports comprehensive reporting:
- User acquisition and retention
- Booking patterns and frequency
- Revenue tracking by service type
- Geographic service distribution
- Payment success rates

## 🛡️ Security Considerations

1. **Authentication**: All API routes require Clerk authentication
2. **Authorization**: Users can only access their own data
3. **Webhook Verification**: All webhooks verify signatures
4. **Database Security**: Use connection pooling and prepared statements
5. **Environment Variables**: Never commit secrets to version control

## 🔄 Backup & Recovery

1. **Database Backups**: Set up regular PostgreSQL backups
2. **Webhook Replay**: Stripe supports webhook event replay
3. **User Data**: Clerk handles user data backup automatically
4. **Application State**: All critical state is stored in PostgreSQL

## 📞 Support

For issues with:
- **Database**: Check Prisma documentation
- **Clerk**: Contact Clerk support
- **Stripe**: Use Stripe dashboard support
- **Application**: Check application logs and error handling
