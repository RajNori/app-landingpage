export const HELPI_CONFIG = {
    brand: {
        name: 'Helpi',
        tagline: 'Find Help Fast',
        description:
            'Australia&apos;s leading on-demand cleaning platform - professional cleaners at your fingertips',
        primaryColor: '#511076',
        primaryColorLight: '#6b2a8f',
        primaryColorDark: '#3d0a5a',
    },
    hero: {
        title: 'Find Help Fast - Professional Cleaning On-Demand',
        subtitle:
            'Help on the way in minutes. Book trusted, vetted professionals instantly. Find help quick across Australia with same-day service and transparent pricing.',
        primaryCTA: 'Find Help Fast',
        secondaryCTA: 'View Services',
        image: '/hero-cleaning.svg',
    },
    steps: [
        {
            icon: '📱',
            title: 'Find Help Quick',
            text: 'Choose your service and get instant confirmation - help on the way in minutes',
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
            title: 'Find Help Fast',
            description:
                'Help on the way today - book now, get cleaned today, available 7 days a week',
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
                "See exactly what you&apos;ll pay upfront - no surprises, no hidden costs",
        },
        {
            icon: '🌟',
            title: '100% Satisfaction',
            description:
                "Not happy? We&apos;ll re-clean for free or give you a full refund",
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
                "Track your cleaner&apos;s arrival and service progress live - help on the way",
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
                'Helpi helps me find help fast when I need it most. I can book a cleaner last-minute when unexpected guests arrive - help on the way in minutes!',
            location: 'Sydney, NSW',
        },
        {
            name: 'Michael Chen',
            comment:
                'The find help quick service is incredible. I booked a deep clean at 9 AM and had someone here by 2 PM. The quality was outstanding.',
            location: 'Melbourne, VIC',
        },
        {
            name: 'Emma Rodriguez',
            comment:
                'Finally found a cleaning service I can trust on-demand. No more waiting weeks for appointments - I find help fast when I need it.',
            location: 'Brisbane, QLD',
        },
    ],
    faqs: [
        {
            question: 'How quickly can I find help fast?',
            answer: 'We offer same-day service! Book in the morning and get cleaned in the afternoon. For urgent requests, we can often arrange a cleaner within 2-4 hours - help on the way fast!',
        },
        {
            question: 'Are your cleaners background-checked?',
            answer: 'Yes, all our cleaners undergo thorough background checks, reference verification, and training before joining our platform. They are also fully insured and bonded for your protection.',
        },
        {
            question: "What if I'm not satisfied with the cleaning?",
            answer: "We offer a 100% satisfaction guarantee. If you&apos;re not happy with the service, contact us within 24 hours and we&apos;ll either re-clean for free or provide a full refund.",
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
        title: 'Ready to Find Help Fast?',
        subtitle:
            'Join thousands of Australian families who trust Helpi for instant, professional cleaning services. Help on the way when you need it most.',
        primaryCTA: 'Find Help Fast',
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
