/** @type {import('tailwindcss').Config} */
// Unused by Tailwind CSS 4. Live brand tokens live in src/app/globals.css (@theme inline).
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // New vibrant brand colors
                helpi: {
                    // Primary purple - deeper and bolder
                    primary: '#4B0082', // Deep indigo
                    'primary-light': '#6A1B9A', // Lighter indigo
                    'primary-dark': '#3A0E5C', // Darker indigo
                    'primary-50': '#F3F0FF', // Very light lavender
                    'primary-100': '#E6E0FF', // Light lavender
                    'primary-200': '#C7B8FF', // Medium lavender
                    'primary-300': '#A88FFF', // Medium purple
                    'primary-400': '#8966FF', // Purple
                    'primary-500': '#4B0082', // Primary
                    'primary-600': '#3A0E5C', // Dark purple
                    'primary-700': '#2A0A42', // Darker purple
                    'primary-800': '#1A0629', // Very dark purple
                    'primary-900': '#0A0310', // Almost black purple
                },
                // Accent colors
                accent: {
                    amber: '#FFC107', // Strong amber for badges
                    'amber-light': '#FFD54F', // Light amber
                    'amber-dark': '#FF8F00', // Dark amber
                    green: '#28A745', // Success green
                    'green-light': '#4CAF50', // Light green
                    'green-dark': '#1E7E34', // Dark green
                    azure: '#0077B6', // Deep azure for security
                    'azure-light': '#0096D6', // Light azure
                    'azure-dark': '#005A8B', // Dark azure
                },
                // Background colors
                bg: {
                    primary: '#FFFFFF', // Pure white
                    secondary: '#F8F9FA', // Light gray
                    tertiary: '#F5F3FF', // Very light lavender
                    quaternary: '#EDEDED', // Light gray
                },
                // Text colors
                text: {
                    primary: '#1E1E1E', // Dark slate
                    secondary: '#4A4A4A', // Medium gray
                    tertiary: '#6B6B6B', // Light gray
                    muted: '#9CA3AF', // Muted gray
                },
            },
            backgroundImage: {
                'gradient-hero':
                    'linear-gradient(135deg, #4B0082 0%, #6A1B9A 50%, #8E24AA 100%)',
                'gradient-accent':
                    'linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)',
                'gradient-success':
                    'linear-gradient(135deg, #28A745 0%, #4CAF50 100%)',
                'gradient-security':
                    'linear-gradient(135deg, #0077B6 0%, #0096D6 100%)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                helpi: '0 4px 20px rgba(75, 0, 130, 0.15)',
                'helpi-lg': '0 8px 30px rgba(75, 0, 130, 0.2)',
                accent: '0 4px 20px rgba(255, 193, 7, 0.15)',
                success: '0 4px 20px rgba(40, 167, 69, 0.15)',
            },
            animation: {
                'scroll-up': 'scrollUp 10s linear infinite',
            },
            keyframes: {
                scrollUp: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-50%)' },
                },
            },
        },
    },
    plugins: [],
};

