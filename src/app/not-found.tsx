import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='min-h-screen flex items-center justify-center px-4 py-16 bg-white'>
            <div className='max-w-2xl mx-auto text-center'>
                <div className='w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8'>
                    <span className='text-3xl font-bold text-[#511076]'>
                        404
                    </span>
                </div>

                <h1 className='text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6'>
                    Page not found
                </h1>

                <p className='text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed mb-10'>
                    The page you&apos;re looking for doesn&apos;t exist or has
                    moved. Let&apos;s get you back to finding help fast.
                </p>

                <Link
                    href='/'
                    className='inline-flex items-center justify-center bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200 cursor-pointer'>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
