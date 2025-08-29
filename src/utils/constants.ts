export const HELPI_CONFIG = {
    brand: {
        name: 'Helpi',
        tagline: 'Click. Book. Relax.',
        description:
            'Australia&apos;s leading on-demand cleaning platform - professional cleaners at your fingertips',
        primaryColor: '#511076',
        primaryColorLight: '#6b2a8f',
        primaryColorDark: '#3d0a5a',
    },
    hero: {
        title: 'Professional Cleaning, On-Demand',
        subtitle:
            'Need a cleaner now? Book trusted, vetted professionals in under 2 minutes. Available across Australia with same-day service and transparent pricing.',
        primaryCTA: 'Book Now',
        secondaryCTA: 'View Services',
        image: '/hero-cleaning.svg',
    },
    steps: [
        {
            icon: '📱',
            title: 'Book in 2 Minutes',
            text: 'Choose your service and get instant confirmation - no waiting, no calls',
        },
        {
            icon: '👥',
            title: 'Vetted Cleaners',
            text: 'Our cleaners are background-checked and insured professionals',
        },
        {
            icon: '✨',
            title: 'Quality Guaranteed',
            text: 'Enjoy a spotless home with our 100% satisfaction guarantee',
        },
        {
            icon: '💳',
            title: 'Pay Securely',
            text: 'Secure online payment with upfront pricing - no hidden fees',
        },
    ],
    benefits: [
        {
            icon: '🕒',
            title: 'Same-Day Service',
            description:
                'Book now, get cleaned today - available 7 days a week',
        },
        {
            icon: '🛡️',
            title: 'Fully Insured',
            description:
                'All cleaners are bonded and insured for your complete peace of mind',
        },
        {
            icon: '💰',
            title: 'Transparent Pricing',
            description:
                "See exactly what you'll pay upfront - no surprises, no hidden costs",
        },
        {
            icon: '🌟',
            title: '100% Satisfaction',
            description:
                "Not happy? We'll re-clean for free or give you a full refund",
        },
        {
            icon: '🌿',
            title: 'Eco-Friendly Options',
            description:
                'Choose from our range of green cleaning products at no extra cost',
        },
        {
            icon: '📱',
            title: 'Real-Time Tracking',
            description:
                "Track your cleaner's arrival and service progress live",
        },
    ],
    stats: [
        { number: '50K+', label: 'Happy Customers' },
        { number: '500+', label: 'Vetted Cleaners' },
        { number: '99%', label: 'Satisfaction Rate' },
        { number: '24/7', label: 'Support Available' },
    ],
    testimonials: [
        {
            name: 'Sarah Mitchell',
            comment:
                'Helpi has been a lifesaver for our busy family. I can book a cleaner last-minute when unexpected guests arrive - it&apos;s so convenient!',
            location: 'Sydney, NSW',
        },
        {
            name: 'Michael Chen',
            comment:
                'The on-demand service is incredible. I booked a deep clean at 9 AM and had someone here by 2 PM. The quality was outstanding.',
            location: 'Melbourne, VIC',
        },
        {
            name: 'Emma Rodriguez',
            comment:
                'Finally found a cleaning service I can trust on-demand. No more waiting weeks for appointments - I get cleaned when I need it.',
            location: 'Brisbane, QLD',
        },
    ],
    faqs: [
        {
            question: 'How quickly can I get a cleaner?',
            answer: 'We offer same-day service! Book in the morning and get cleaned in the afternoon. For urgent requests, we can often arrange a cleaner within 2-4 hours depending on availability in your area.',
        },
        {
            question: 'Are your cleaners background-checked?',
            answer: 'Yes, all our cleaners undergo thorough background checks, reference verification, and training before joining our platform. They are also fully insured and bonded for your protection.',
        },
        {
            question: "What if I'm not satisfied with the cleaning?",
            answer: "We offer a 100% satisfaction guarantee. If you're not happy with the service, contact us within 24 hours and we'll either re-clean for free or provide a full refund.",
        },
        {
            question: 'Can I schedule recurring cleanings?',
            answer: 'Absolutely! You can set up weekly, bi-weekly, or monthly recurring cleanings. You can also pause, modify, or cancel your recurring schedule anytime through the app.',
        },
        {
            question: 'What cleaning products do you use?',
            answer: 'We use professional-grade cleaning products that are safe for your family and pets. You can also request eco-friendly cleaning products at no additional cost.',
        },
    ],
    finalCTA: {
        title: 'Ready for On-Demand Cleaning?',
        subtitle:
            'Join thousands of Australian families who trust Helpi for instant, professional cleaning services',
        primaryCTA: 'Book Your First Clean',
        secondaryCTA: 'Get Quote',
    },
    footer: {
        links: {
            services: [
                'Regular Cleaning',
                'Deep Cleaning',
                'Move-in/out',
                'Office Cleaning',
            ],
            company: ['About Us', 'Careers', 'Press', 'Blog'],
            support: ['Help Center', 'Contact Us', 'Safety', 'Privacy'],
            legal: [
                'Terms of Service',
                'Privacy Policy',
                'Cookie Policy',
                'Insurance',
            ],
        },
        social: {
            facebook: 'https://www.facebook.com/gethelpi/',
            instagram: 'https://www.instagram.com/gethelpi.app/',
            twitter: 'https://twitter.com/gethelpi',
        },
    },
} as const;
