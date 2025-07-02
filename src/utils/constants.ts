export const HELPI_CONFIG = {
    brand: {
        name: 'Helpi',
        tagline: 'Click. Book. Relax.',
        description:
            'Professional cleaning services for busy Australian households',
        primaryColor: '#511076',
        primaryColorLight: '#6b2a8f',
        primaryColorDark: '#3d0a5a',
    },
    hero: {
        title: 'Professional Cleaning Services for Your Home',
        subtitle:
            'Book trusted, vetted cleaners in minutes. Available across Australia with flexible scheduling and transparent pricing.',
        primaryCTA: 'Book Now',
        secondaryCTA: 'View Services',
        image: '/hero-cleaning.svg',
    },
    steps: [
        {
            icon: '📱',
            title: 'Book Online',
            text: 'Choose your service, date, and time in just a few clicks',
        },
        {
            icon: '👥',
            title: 'Vetted Cleaners',
            text: 'Our cleaners are background-checked and insured professionals',
        },
        {
            icon: '✨',
            title: 'Quality Service',
            text: 'Enjoy a spotless home with our guaranteed satisfaction policy',
        },
        {
            icon: '💳',
            title: 'Easy Payment',
            text: 'Secure online payment with no hidden fees or surprises',
        },
    ],
    benefits: [
        {
            icon: '🕒',
            title: 'Flexible Scheduling',
            description: 'Book same-day or schedule recurring cleanings',
        },
        {
            icon: '🛡️',
            title: 'Fully Insured',
            description:
                'All cleaners are bonded and insured for your peace of mind',
        },
        {
            icon: '💰',
            title: 'Transparent Pricing',
            description: "Know exactly what you'll pay with upfront quotes",
        },
        {
            icon: '🌟',
            title: 'Quality Guarantee',
            description:
                "Not satisfied? We'll make it right or your money back",
        },
        {
            icon: '🌿',
            title: 'Eco-Friendly Options',
            description: 'Choose from our range of green cleaning products',
        },
        {
            icon: '📱',
            title: 'Real-Time Updates',
            description: "Track your cleaner's arrival and service progress",
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
                'Helpi has been a lifesaver for our busy family. The cleaners are always professional and our home looks amazing!',
            location: 'Sydney, NSW',
        },
        {
            name: 'Michael Chen',
            comment:
                'I love the flexibility - I can book last minute or schedule regular cleanings. The app is so easy to use.',
            location: 'Melbourne, VIC',
        },
        {
            name: 'Emma Rodriguez',
            comment:
                'Finally found a cleaning service I can trust. The quality is consistently excellent and pricing is fair.',
            location: 'Brisbane, QLD',
        },
    ],
    faqs: [
        {
            question: 'How do I book a cleaning service?',
            answer: "Simply download our app or visit our website, choose your service type, select your preferred date and time, and confirm your booking. You'll receive instant confirmation and can track your cleaner's arrival.",
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
        title: 'Ready for a Cleaner Home?',
        subtitle:
            'Join thousands of Australian families who trust Helpi for their cleaning needs',
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
            facebook: 'https://facebook.com/helpi',
            instagram: 'https://instagram.com/helpi',
            twitter: 'https://twitter.com/helpi',
        },
    },
} as const;
