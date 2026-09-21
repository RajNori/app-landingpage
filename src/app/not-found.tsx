import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-white px-4 py-16'>
            <div className='mx-auto max-w-2xl text-center'>
                <div className='mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-helpi-soft'>
                    <span className='text-3xl font-bold text-helpi-primary'>
                        404
                    </span>
                </div>

                <h1 className='mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl'>
                    Page not found
                </h1>

                <p className='mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-600 md:text-xl'>
                    The page you&apos;re looking for doesn&apos;t exist or has
                    moved. Head back to Helpi to find cleaning help.
                </p>

                <Link
                    href='/'
                    className='inline-flex min-h-11 items-center justify-center rounded-2xl bg-helpi-primary px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-helpi-secondary hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
