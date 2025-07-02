# 🧹 Helpi Landing Page

> **Australia's Premier On-Demand Cleaning Services Landing Page**

A modern, responsive landing page for Helpi - Australia's trusted platform connecting busy households with reliable local cleaners. Built with cutting-edge web technologies and designed for maximum conversion.

![Helpi Landing Page](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)

## 🚀 Live Demo

**[View Live Landing Page](https://helpi.app)**

## 📱 About Helpi

Helpi revolutionizes how Australians access cleaning services. Our landing page showcases the seamless experience of booking trusted local cleaners through our mobile app - making household cleaning effortless, reliable, and affordable.

### Key Features Highlighted:

-   **One-Click Booking** - Instant cleaner matching
-   **Trusted Professionals** - Vetted, insured cleaners
-   **Real-Time Tracking** - Live updates on cleaner arrival
-   **Secure Payments** - Protected transactions
-   **Customer Reviews** - Transparent feedback system

## 🛠️ Technology Stack

### **Frontend Framework**

-   **[Next.js 15.3.4](https://nextjs.org/)** - React framework with App Router
-   **[React 19.0.0](https://react.dev/)** - Latest React with concurrent features
-   **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe development

### **Styling & UI**

-   **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
-   **[Framer Motion 12.23.0](https://www.framer.com/motion/)** - Smooth animations
-   **[Headless UI 2.2.4](https://headlessui.com/)** - Accessible UI components

### **Icons & Graphics**

-   **[Font Awesome 6.7.2](https://fontawesome.com/)** - Professional icon library
-   **[React Icons 5.5.0](https://react-icons.github.io/react-icons/)** - Popular icon sets
-   **[Lucide React 0.525.0](https://lucide.dev/)** - Beautiful, customizable icons

### **Interactive Components**

-   **[Keen Slider 6.8.6](https://keen-slider.io/)** - Touch-friendly carousels
-   **Custom Scroll Animations** - Smooth vertical scrolling effects
-   **Responsive Design** - Mobile-first approach

### **Development Tools**

-   **[ESLint 9](https://eslint.org/)** - Code quality enforcement
-   **[PostCSS](https://postcss.org/)** - CSS processing
-   **Zero-Config Setup** - Optimized for development

## 🎨 Design Philosophy

### **Modern UI/UX Standards**

-   **Airbnb-inspired** layout and white space usage
-   **Loom-style** mobile-first hero sections
-   **Linear-inspired** typography and testimonials
-   **Uber Eats-style** horizontal scrolling carousels

### **Brand Identity**

-   **Primary Color**: `#511076` (Helpi Purple)
-   **Typography**: Inter font family
-   **Icons**: Font Awesome + React Icons
-   **Animations**: Framer Motion for smooth interactions

## 📱 Landing Page Sections

### 1. **Hero Section**

-   Interactive phone mockup with scrolling service tiles
-   Horizontal helper tile carousel
-   Call-to-action buttons with app store badges
-   Floating elements with smooth animations

### 2. **Step Flow Section**

-   3-step process visualization
-   Icon-based workflow explanation
-   Responsive grid layout

### 3. **Benefits Grid**

-   Feature cards with icons
-   Hover effects and animations
-   2-3 column responsive layout

### 4. **App Screens Carousel**

-   Horizontal scrolling app mockups
-   Auto-play with 4-second intervals
-   Touch/drag support for mobile
-   Keen Slider integration

### 5. **Stats Section**

-   Key metrics display
-   Animated counters
-   Grid layout (2-4 columns responsive)

### 6. **Testimonial Carousel**

-   Customer reviews with avatars
-   Auto-scrolling testimonials
-   Professional presentation

### 7. **FAQ Accordion**

-   Expandable questions/answers
-   Headless UI integration
-   Smooth expand/collapse animations

### 8. **Final CTA Section**

-   App download buttons
-   Official app store badges
-   Sticky mobile CTA bar

### 9. **Footer**

-   Social media links
-   Company information
-   Clean, minimal design

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/RajNori/app-landingpage.git
cd app-landingpage

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Setup

The project uses Next.js with zero configuration required. All dependencies are pre-configured for optimal performance.

## 📁 Project Structure

```
helpi-landing/
├── public/
│   ├── badges/           # App store badges
│   └── [static assets]
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Home page
│   │   └── globals.css  # Global styles
│   ├── components/
│   │   └── helpi-landing/  # Landing page components
│   │       ├── HeroSection.tsx
│   │       ├── StepFlowSection.tsx
│   │       ├── BenefitsGrid.tsx
│   │       ├── AppScreensCarousel.tsx
│   │       ├── StatsSection.tsx
│   │       ├── TestimonialCarousel.tsx
│   │       ├── FAQAccordion.tsx
│   │       ├── FinalCTA.tsx
│   │       └── Footer.tsx
│   ├── data/            # Content data
│   │   ├── benefits.ts
│   │   ├── faqs.ts
│   │   ├── stats.ts
│   │   ├── steps.ts
│   │   └── testimonials.ts
│   └── utils/
│       └── constants.ts  # App constants
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎯 Performance Features

-   **Lazy Loading** - Images and components load on demand
-   **Optimized Images** - Next.js Image component with priority loading
-   **Code Splitting** - Automatic bundle optimization
-   **SEO Optimized** - Meta tags, Open Graph, and structured data
-   **Accessibility** - WCAG 2.1 AA compliant
-   **Mobile-First** - Responsive design for all devices

## 🔧 Customization

### **Content Management**

All content is stored in `/src/data/` files for easy updates:

-   `benefits.ts` - Feature benefits
-   `faqs.ts` - Frequently asked questions
-   `stats.ts` - Key metrics
-   `testimonials.ts` - Customer reviews
-   `steps.ts` - Process steps

### **Styling**

-   Tailwind CSS classes for consistent styling
-   CSS custom properties for brand colors
-   Responsive breakpoints for all screen sizes

### **Components**

-   Modular, reusable components
-   Prop-driven architecture
-   TypeScript interfaces for type safety

## 📊 Analytics & SEO

### **SEO Features**

-   Meta tags for search engines
-   Open Graph tags for social sharing
-   Structured data markup
-   Sitemap generation
-   Robots.txt configuration

### **Performance Metrics**

-   Lighthouse score: 95+ (Performance, Accessibility, Best Practices, SEO)
-   Core Web Vitals optimized
-   First Contentful Paint: < 1.5s
-   Largest Contentful Paint: < 2.5s

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Helpi. All rights reserved.

## 📞 Support

For support, email support@helpi.app or join our Slack channel.

---

**Built with ❤️ by the Helpi Team**

_Making cleaning services accessible to every Australian household_
