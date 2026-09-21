import Image from 'next/image';
import { SECTION_IDS } from '@/utils/constants';

interface Service {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
}

interface BenefitsGridProps {
    services: Service[];
}

export default function BenefitsGrid({ services }: BenefitsGridProps) {
    return (
        <section
            id={SECTION_IDS.services}
            className='scroll-mt-20 bg-white px-4 py-14 md:py-20'>
            <div className='mx-auto max-w-6xl'>
                <div className='mb-10 max-w-2xl md:mb-14'>
                    <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-helpi-primary'>
                        Services
                    </p>
                    <h2 className='mb-3 text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl'>
                        Cleaning for home and work
                    </h2>
                    <p className='text-base leading-relaxed text-gray-600 md:text-lg'>
                        Helpi shows Home, Office, and Warehouse cleaning. What
                        you can arrange depends on what the app displays for
                        your area.
                    </p>
                </div>
                <div className='flex flex-col gap-12 md:gap-16'>
                    {services.map((service, index) => {
                        const reverse = index % 2 === 1;
                        return (
                            <article
                                key={service.title}
                                className='grid items-center gap-6 md:grid-cols-2 md:gap-12'>
                                <div
                                    className={`relative min-h-[16rem] overflow-hidden rounded-[1.75rem] md:min-h-[22rem] ${
                                        reverse ? 'md:order-2' : ''
                                    }`}>
                                    <Image
                                        src={service.image}
                                        alt={service.imageAlt}
                                        width={720}
                                        height={520}
                                        className={`absolute inset-0 h-full w-full object-cover ${
                                            index === 0
                                                ? 'object-[50%_18%] md:scale-[1.15]'
                                                : 'object-[50%_24%]'
                                        }`}
                                    />
                                </div>
                                <div className={reverse ? 'md:order-1' : ''}>
                                    <p className='mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-helpi-primary'>
                                        {String(index + 1).padStart(2, '0')}
                                    </p>
                                    <h3 className='mb-3 text-3xl font-bold tracking-tight text-gray-900'>
                                        {service.title}
                                    </h3>
                                    <p className='max-w-md text-base leading-relaxed text-gray-600 md:text-lg'>
                                        {service.description}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
