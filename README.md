# Helpi - On-Demand Cleaning Services Landing Page

A modern, responsive Next.js landing page for Helpi's on-demand cleaning services platform. Features a complete booking flow with service filtering, shopping cart functionality, and Stripe payment integration.

## ✨ Features

### 🏠 Service Management
- **Service Category Filtering**: Interactive pills to filter services by category (Home Cleaning, Deep Clean, End of Lease, Carpet, Windows)
- **Dynamic Service Packages**: 10+ service packages with detailed pricing, features, and add-ons
- **Responsive Package Cards**: Mobile-first design with hover effects and pricing transparency

### 🛒 Shopping Cart & Checkout
- **Persistent Cart**: LocalStorage-based cart that persists across sessions
- **Add-on Management**: Select and customize service add-ons with quantity controls
- **Real-time Pricing**: Dynamic pricing calculation including GST
- **Cart Summary**: Comprehensive cart page with item management and totals

### 💳 Stripe Integration
- **Secure Checkout**: Full Stripe Checkout integration for payment processing
- **Success/Error Handling**: Dedicated checkout status pages with user feedback
- **Test Mode Ready**: Configured for both test and production Stripe environments
- **GST Compliance**: Australian tax calculations built-in

### 🎨 User Experience
- **Hydration-Safe**: Zero hydration errors with proper SSR/CSR handling
- **Mobile-First**: Responsive design optimized for all device sizes
- **Fast Loading**: Optimized Next.js 15 with static generation where possible
- **Accessibility**: WCAG-compliant navigation and interactive elements

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stripe account (for checkout functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app-landingpage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Stripe keys:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── api/checkout/      # Stripe checkout API endpoint
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Payment success/error pages
│   ├── services/          # Service catalog page
│   └── debug/hydration/   # Development debugging tools
├── components/
│   ├── helpi-landing/     # Landing page components
│   └── services/          # Service-related components
│       ├── ServiceGrid.tsx    # Service filtering & display
│       └── PackageCard.tsx    # Individual service cards
├── contexts/
│   └── CartContext.tsx    # Global cart state management
├── lib/
│   ├── pricing/           # Pricing logic and configuration
│   └── catalog.ts         # Service catalog definitions
└── utils/
    └── constants.ts       # App-wide constants
```

## 💳 Stripe Setup

### 1. Get Stripe Keys
1. Create a [Stripe account](https://stripe.com)
2. Navigate to Dashboard → Developers → API Keys
3. Copy your Publishable and Secret keys

### 2. Configure Environment Variables
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...           # Your secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Your publishable key

# For production, use live keys:
# STRIPE_SECRET_KEY=sk_live_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 3. Test Payment Flow
1. Visit `/services` and add items to cart
2. Go to `/cart` and click "Proceed to Checkout"
3. Use Stripe test cards:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`

## 🛒 Cart & Service Features

### Service Categories
- **Home Cleaning**: Basic, Standard, Deep, Intensive options
- **End of Lease**: 1BR, 2BR, 3BR, 4BR+ packages
- **Carpet Cleaning**: Per-room pricing
- **Window Cleaning**: Professional window cleaning service

### Cart Functionality
- ✅ Add/remove items with quantity controls
- ✅ Service add-ons (oven cleaning, extra bathrooms, etc.)
- ✅ Persistent storage across browser sessions
- ✅ Real-time pricing with GST calculation
- ✅ Mobile-optimized cart interface

### Pricing Features
- **Transparent Pricing**: All prices include GST
- **Minimum Quantities**: Enforced per service type
- **Add-on System**: Optional extras with individual pricing
- **Dynamic Calculation**: Real-time total updates

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Import project in [Vercel Dashboard](https://vercel.com)
   - Add environment variables in project settings
   - Deploy automatically on push

3. **Environment Variables for Production**
   ```
   STRIPE_SECRET_KEY=sk_live_your_production_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_production_key
   ```

### Manual Deployment
```bash
npm run build
npm start
```

## 🧪 Testing

### Run Tests
```bash
npm test                    # Unit tests
npm run test:pricing       # Pricing calculation tests
```

### Debug Hydration
Visit `/debug/hydration` to verify SSR/CSR consistency

### Test Checkout Flow
1. Add services to cart
2. Proceed to checkout
3. Use Stripe test cards for verification

## 📱 Key Pages

| Page | Description | Features |
|------|-------------|----------|
| `/` | Landing page | Hero, features, testimonials, CTA |
| `/services` | Service catalog | Filtering, packages, pricing |
| `/cart` | Shopping cart | Item management, totals, checkout |
| `/checkout` | Payment status | Success/error handling |
| `/about` | Company info | About Helpi and services |
| `/contact` | Contact form | Customer inquiries |

## 🔧 Development Tools

### Available Scripts
```bash
npm run dev         # Development server
npm run build       # Production build
npm run start       # Production server
npm run lint        # ESLint checking
npm test           # Run test suites
```

### Debug Features
- **Hydration Debug**: `/debug/hydration` - Test SSR/CSR consistency
- **Console Logging**: Service filtering and cart operations
- **Error Boundaries**: Comprehensive error handling

## 🎯 Technical Highlights

### Performance
- **Static Generation**: Most pages pre-rendered at build time
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Size**: Optimized chunks under 170KB first load

### Reliability
- **Zero Hydration Errors**: Proper SSR/CSR handling
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error boundaries
- **Accessibility**: WCAG 2.1 compliant

### Security
- **Stripe Integration**: PCI-compliant payment processing
- **Environment Variables**: Sensitive data protection
- **HTTPS Ready**: Production security standards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Documentation

- [Stripe Integration Setup](STRIPE_SETUP.md)
- [Hydration Audit Report](docs/hydration-audit.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Documentation](https://stripe.com/docs)

---

**Helpi** - Professional cleaning services at your fingertips 🏠✨# Production Deployment Fri Oct  3 13:18:43 AEST 2025
# Force deployment Fri Oct  3 14:02:00 AEST 2025
