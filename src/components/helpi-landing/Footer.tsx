'use client';

import { HELPI_CONFIG } from '@/utils/constants';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const { footer } = HELPI_CONFIG;

export default function Footer() {
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
                                <a
                                    href='#'
                                    className='text-sm text-gray-600 hover:text-[#511076] hover:underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 leading-relaxed'>
                                    {item}
                                </a>
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
                                <a
                                    href='#'
                                    className='text-sm text-gray-600 hover:text-[#511076] hover:underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 leading-relaxed'>
                                    {item}
                                </a>
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
                        {footer.links.company.map((item) => (
                            <li key={item}>
                                <a
                                    href='#'
                                    className='text-sm text-gray-600 hover:text-[#511076] hover:underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 leading-relaxed'>
                                    {item}
                                </a>
                            </li>
                        ))}
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
                                className='w-14 h-14 bg-gray-100 hover:bg-[#511076] text-gray-600 hover:text-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200 shadow-sm hover:shadow-lg'>
                                <FaFacebookF className='w-6 h-6' />
                            </a>
                        )}
                        {footer.social.instagram && (
                            <a
                                href={footer.social.instagram}
                                aria-label='Follow us on Instagram'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='w-14 h-14 bg-gray-100 hover:bg-[#511076] text-gray-600 hover:text-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200 shadow-sm hover:shadow-lg'>
                                <FaInstagram className='w-6 h-6' />
                            </a>
                        )}
                        {footer.social.twitter && (
                            <a
                                href={footer.social.twitter}
                                aria-label='Follow us on LinkedIn'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='w-14 h-14 bg-gray-100 hover:bg-[#511076] text-gray-600 hover:text-white rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200 shadow-sm hover:shadow-lg'>
                                <FaLinkedinIn className='w-6 h-6' />
                            </a>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className='mt-8 pt-6 border-t border-gray-100'>
                        <p className='text-sm text-gray-500 mb-2'>
                            Need help? Contact us:
                        </p>
                        <p className='text-sm text-[#511076] font-medium'>
                            support@helpi.com.au
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
                            href='#'
                            className='text-gray-500 hover:text-[#511076] transition-colors duration-200'>
                            Privacy Policy
                        </a>
                        <a
                            href='#'
                            className='text-gray-500 hover:text-[#511076] transition-colors duration-200'>
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
