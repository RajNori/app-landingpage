export const SUPPORT_EMAIL = 'support@gethelpi.com';

export const SECTION_IDS = {
    howItWorks: 'how-it-works',
    services: 'services',
    appPreview: 'app-preview',
    getTheApp: 'get-the-app',
} as const;

export const HELPI_CONFIG = {
    brand: {
        name: 'Helpi',
        tagline: 'Helpi - Find Help Fast',
        description:
            'Find cleaning help for your home or workspace in the Helpi app.',
        primaryColor: '#6A1AD9',
        primaryColorLight: '#8926E9',
        primaryColorDark: '#6A1AD9',
        storeUrls: {
            appStore: null,
            googlePlay: null,
        },
    },
    hero: {
        title: 'Helpi - Find Help Fast',
        subtitle:
            'Find cleaning help for your home or workspace. Choose a time that suits you in the Helpi app.',
        primaryCTA: 'Get the App',
        secondaryCTA: 'See how it works',
    },
    finalCTA: {
        title: 'Helpi - Find Help Fast',
        subtitle:
            'Arrange Home, Office, or Warehouse cleaning in the Helpi app.',
        primaryCTA: 'Email Helpi for the app',
    },
    footer: {
        social: {
            facebook: 'https://www.facebook.com/gethelpi/',
            instagram: 'https://www.instagram.com/gethelpi.app/',
            twitter: 'https://twitter.com/gethelpi',
        },
    },
} as const;
