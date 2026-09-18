'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    FaLightbulb,
    FaUsers,
    FaChartLine,
    FaAward,
    FaMapMarkerAlt,
    FaHandshake,
} from 'react-icons/fa';
import { MdBusinessCenter, MdTrendingUp } from 'react-icons/md';

export default function AboutPage() {
    const router = useRouter();

    const handleBookNow = () => router.push('/services');
    const handleLearnMore = () => router.push('/');

    return (
        <div className='bg-white min-h-screen'>
            {/* Hero Section */}
            <section className='relative py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50'>
                <div className='absolute inset-0 bg-white/60' />
                <div className='relative max-w-7xl mx-auto text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='mb-8'>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6'>
                            About Helpi
                        </h1>
                        <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                            Born from a decade of experience in the service
                            marketplace, we&apos;re revolutionizing how
                            Australians access cleaning services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className='py-20 px-4 bg-white'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid lg:grid-cols-2 gap-16 items-center'>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}>
                            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                                Our Story
                            </h2>
                            <div className='space-y-6 text-lg text-gray-600 leading-relaxed'>
                                <p>
                                    For over a decade, we&apos;ve been deeply
                                    embedded in the Australian service
                                    marketplace, witnessing firsthand the
                                    challenges that both service providers and
                                    customers face.
                                </p>
                                <p>
                                    Through countless conversations, market
                                    research, and industry analysis, we
                                    identified a significant gap in the cleaning
                                    services sector.
                                </p>
                                <p>
                                    Traditional cleaning services were often
                                    unreliable, expensive, and lacked
                                    transparency. Customers struggled to find
                                    trusted professionals, while qualified
                                    cleaners had difficulty connecting with
                                    potential clients.
                                </p>
                                <p>
                                    That&apos;s when the idea for Helpi was born
                                    – a revolutionary{' '}
                                    <strong>on-demand platform</strong> that
                                    would bridge this gap and create a better,
                                    more efficient marketplace for cleaning
                                    services.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className='relative'>
                            <div className='bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 lg:p-12 shadow-2xl'>
                                <div className='text-center'>
                                    <div className='w-24 h-24 bg-[#511076] text-white rounded-full flex items-center justify-center mx-auto mb-6'>
                                        <FaLightbulb className='text-3xl' />
                                    </div>
                                    <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                                        The Market Opportunity
                                    </h3>
                                    <p className='text-gray-700 leading-relaxed'>
                                        After thorough research and analysis, we
                                        discovered that the Australian cleaning
                                        services market was ripe for disruption.
                                        The need for a better, more reliable
                                        <strong>on-demand service</strong> was
                                        clear, and we had the experience and
                                        insights to make it happen.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className='py-20 px-4 bg-gray-50'>
                <div className='max-w-7xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='text-center mb-16'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                            Our Journey
                        </h2>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                            From market research to launching Helpi, here&apos;s
                            how we got here
                        </p>
                    </motion.div>

                    <div className='space-y-12'>
                        {[
                            {
                                year: '2013-2023',
                                title: 'Service Marketplace Experience',
                                description:
                                    'Over 10 years of deep immersion in the Australian service marketplace, understanding customer needs and pain points.',
                                icon: MdBusinessCenter,
                            },
                            {
                                year: '2022',
                                title: 'Market Research & Analysis',
                                description:
                                    'Comprehensive research identifying gaps in the cleaning services sector and opportunities for improvement.',
                                icon: FaChartLine,
                            },
                            {
                                year: '2023',
                                title: 'Concept Development',
                                description:
                                    'Developing the Helpi concept based on market insights and customer feedback.',
                                icon: FaLightbulb,
                            },
                            {
                                year: '2024',
                                title: 'Helpi Launch',
                                description:
                                    'Bringing our vision to life with a platform that connects trusted cleaners with Australian households.',
                                icon: FaAward,
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                }}
                                viewport={{ once: true }}
                                className='relative'>
                                <div className='flex flex-col lg:flex-row items-center lg:items-start gap-8'>
                                    <div className='flex-shrink-0'>
                                        <div className='w-16 h-16 bg-[#511076] text-white rounded-full flex items-center justify-center'>
                                            <item.icon className='text-2xl' />
                                        </div>
                                    </div>
                                    <div className='flex-1 text-center lg:text-left'>
                                        <div className='bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100'>
                                            <div className='text-sm font-semibold text-[#511076] mb-2'>
                                                {item.year}
                                            </div>
                                            <h3 className='text-xl font-bold text-gray-900 mb-3'>
                                                {item.title}
                                            </h3>
                                            <p className='text-gray-600 leading-relaxed'>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Melbourne Section */}
            <section className='py-20 px-4 bg-white'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid lg:grid-cols-2 gap-16 items-center'>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className='relative'>
                            <div className='bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 lg:p-12 shadow-2xl'>
                                <div className='text-center'>
                                    <div className='w-24 h-24 bg-[#511076] text-white rounded-full flex items-center justify-center mx-auto mb-6'>
                                        <FaMapMarkerAlt className='text-3xl' />
                                    </div>
                                    <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                                        Why Melbourne?
                                    </h3>
                                    <p className='text-gray-700 leading-relaxed'>
                                        Melbourne&apos;s vibrant startup
                                        ecosystem, diverse population, and
                                        strong service economy make it the
                                        perfect place to launch Helpi.
                                        We&apos;re proud to call this innovative
                                        city our home.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}>
                            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                                Melbourne: Our Home Base
                            </h2>
                            <div className='space-y-6 text-lg text-gray-600 leading-relaxed'>
                                <p>
                                    Melbourne&apos;s dynamic business
                                    environment and forward-thinking approach to
                                    technology and services align perfectly with
                                    our vision for Helpi.
                                </p>
                                <p>
                                    The city&apos;s diverse population and
                                    strong emphasis on quality of life make it
                                    an ideal market for our cleaning services
                                    platform.
                                </p>
                                <p>
                                    We&apos;re excited to contribute to
                                    Melbourne&apos;s growing reputation as a hub
                                    for innovative startups and service-based
                                    businesses.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className='py-20 px-4 bg-gray-50'>
                <div className='max-w-7xl mx-auto text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='mb-16'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                            Our Mission
                        </h2>
                        <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                            To revolutionize the cleaning services industry by
                            creating an <strong>on-demand platform</strong> that
                            benefits both customers and service providers,
                            making quality cleaning accessible to every
                            Australian household{' '}
                            <strong>when they need it</strong>.
                        </p>
                    </motion.div>

                    <div className='grid md:grid-cols-3 gap-8'>
                        {[
                            {
                                icon: FaUsers,
                                title: 'Connect Instantly',
                                description:
                                    'Bridging the gap between qualified cleaners and customers who need reliable services on-demand.',
                            },
                            {
                                icon: FaHandshake,
                                title: 'Trust & Quality',
                                description:
                                    'Building a community of vetted, insured professionals that customers can rely on instantly.',
                            },
                            {
                                icon: MdTrendingUp,
                                title: 'Innovate Continuously',
                                description:
                                    'Continuously improving our on-demand platform based on user feedback and market needs.',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                }}
                                viewport={{ once: true }}
                                className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2'>
                                <div className='w-16 h-16 bg-[#511076] text-white rounded-full flex items-center justify-center mx-auto mb-6'>
                                    <item.icon className='text-2xl' />
                                </div>
                                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                                    {item.title}
                                </h3>
                                <p className='text-gray-600 leading-relaxed'>
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='py-20 px-4 bg-white'>
                <div className='max-w-4xl mx-auto text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-2xl border border-purple-100'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                            Join Us on This Journey
                        </h2>
                        <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
                            We&apos;re just getting started, and we&apos;d love
                            for you to be part of our story. Try Helpi today and
                            experience the future of{' '}
                            <strong>on-demand cleaning services</strong>.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <button
                                onClick={handleBookNow}
                                className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                                Book Your First Clean
                            </button>
                            <button
                                onClick={handleLearnMore}
                                className='border-2 border-[#511076] text-[#511076] hover:bg-[#511076] hover:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200'>
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
