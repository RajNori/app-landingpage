'use client';

import { HELPI_CONFIG } from '@/utils/constants';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const { footer } = HELPI_CONFIG;

export default function Footer() {
    const router = useRouter();

    const handleServiceClick = (service: string) => {
        router.push('/services');
        // Could add specific service filtering here later
    };

    const handleSupportClick = (support: string) => {
        if (support === 'Contact Us') {
            router.push('/contact');
        } else if (support === 'Help Center') {
            router.push('/help');
        } else if (support === 'Safety') {
            router.push('/safety');
        } else if (support === 'Privacy') {
            router.push('/privacy');
        } else {
            // Default to contact for any unmapped items
            router.push('/contact');
        }
    };

    return (
        <footer className='border-t border-gray-200 py-16 px-4 bg-white'>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
                {/* Help */}
                <nav aria-label='Help' className='flex flex-col gap-3'>
                    <span className='font-semibold text-gray-900 mb-3 text-lg'>
                        Help
                    </span>
                    <ul className='space-y-2'>
                        {footer.links.support.map((item) => (
                            <li key={item}>
                                <button
                                    onClick={() => handleSupportClick(item)}
                                    className='text-sm text-gray-600 hover:text-[#511076] hover:underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 leading-relaxed text-left w-full cursor-pointer'>
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Services */}
                <nav aria-label='Services' className='flex flex-col gap-3'>
                    <span className='font-semibold text-gray-900 mb-3 text-lg'>
                        Services
                    </span>
                    <ul className='space-y-2'>
                        {footer.links.services.map((item) => (
                            <li key={item}>
                                <button
                                    onClick={() => handleServiceClick(item)}
                                    className='text-sm text-gray-600 hover:text-[#511076] hover:underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 leading-relaxed text-left w-full cursor-pointer'>
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Company */}
                <nav aria-label='Company' className='flex flex-col gap-3'>
                    <span className='font-semibold text-gray-900 mb-3 text-lg'>
                        Company
                    </span>
                    <ul className='space-y-2'>
                        <li>
                            <a
                                href='/about'
                                className='text-sm text-gray-600 hover:text-[#511076] hover:underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 leading-relaxed cursor-pointer'>
                                About Us
                            </a>
                        </li>
                        {footer.links.company.slice(1).map((item) => {
                            const href =
                                item === 'Careers'
                                    ? '/careers'
                                    : item === 'Press'
                                    ? '/press'
                                    : item === 'Blog'
                                    ? '/blog'
                                    : '#';
                            return (
                                <li key={item}>
                                    <a
                                        href={href}
                                        className='text-sm text-gray-600 hover:text-[#511076] hover:underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 leading-relaxed cursor-pointer'>
                                        {item}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Connect (Social) */}
                <div className='flex flex-col gap-3'>
                    <span className='font-semibold text-gray-900 mb-3 text-lg'>
                        Connect
                    </span>
                    <div className='flex gap-4 justify-start'>
                        {footer.social.facebook && (
                            <a
                                href={footer.social.facebook}
                                aria-label='Follow us on Facebook'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='w-14 h-14 bg-gray-100 hover:bg-[#511076] text-gray-600 hover:text-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200 shadow-sm hover:shadow-lg cursor-pointer'>
                                <FaFacebookF className='w-6 h-6' />
                            </a>
                        )}
                        {footer.social.instagram && (
                            <a
                                href={footer.social.instagram}
                                aria-label='Follow us on Instagram'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='w-14 h-14 bg-gray-100 hover:bg-[#511076] text-gray-600 hover:text-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200 shadow-sm hover:shadow-lg cursor-pointer'>
                                <FaInstagram className='w-6 h-6' />
                            </a>
                        )}
                        {footer.social.twitter && (
                            <a
                                href={footer.social.twitter}
                                aria-label='Follow us on Twitter'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='w-14 h-14 bg-gray-100 hover:bg-[#511076] text-gray-600 hover:text-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200 shadow-sm hover:shadow-lg cursor-pointer'>
                                <svg
                                    className='w-6 h-6'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                                </svg>
                            </a>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className='mt-8 pt-6 border-t border-gray-100'>
                        <p className='text-sm text-gray-500 mb-2'>
                            Need help? Contact us:
                        </p>
                        <p className='text-sm text-[#511076] font-medium'>
                            support@gethelpi.com
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Footer Bottom */}
            <div className='max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-100'>
                <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                    <div className='text-sm text-gray-500'>
                        © {new Date().getFullYear()} Helpi. All rights reserved.
                    </div>
                    <div className='flex gap-6 text-sm'>
                        <a
                            href='/privacy'
                            className='text-gray-500 hover:text-[#511076] transition-colors duration-200 cursor-pointer'>
                            Privacy Policy
                        </a>
                        <a
                            href='/terms'
                            className='text-gray-500 hover:text-[#511076] transition-colors duration-200 cursor-pointer'>
                            Terms of Service
                        </a>
                        <a
                            href='/cookies'
                            className='text-gray-500 hover:text-[#511076] transition-colors duration-200 cursor-pointer'>
                            Cookies
                        </a>
                        <a
                            href='/insurance'
                            className='text-gray-500 hover:text-[#511076] transition-colors duration-200 cursor-pointer'>
                            Insurance
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
