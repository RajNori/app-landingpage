'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { FaUserCheck, FaCertificate, FaHeadset } from 'react-icons/fa';

type DemoPhase = 'home' | 'schedule' | 'slot';

export default function AppBookingDemo() {
    const reduceMotion = useReducedMotion();
    const skipMotion = reduceMotion === true;
    const [phase, setPhase] = useState<DemoPhase>('home');
    const [documentHidden, setDocumentHidden] = useState(false);
    const [visible, setVisible] = useState(true);
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const node = rootRef.current;
        if (!node) {
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry) {
                    setVisible(entry.isIntersecting);
                }
            },
            { threshold: 0.35 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onVisibility = () => {
            setDocumentHidden(document.hidden);
        };
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    useEffect(() => {
        if (skipMotion || documentHidden || !visible) {
            return;
        }

        const order: DemoPhase[] = ['home', 'schedule', 'slot', 'home'];
        let step = 0;
        const delays = [3200, 3200, 2600, 2200];

        let timer = window.setTimeout(function tick() {
            step = (step + 1) % order.length;
            const nextPhase = order[step];
            if (nextPhase) {
                setPhase(nextPhase);
            }
            const wait = delays[step];
            timer = window.setTimeout(tick, wait ?? 3000);
        }, delays[0]);

        return () => {
            window.clearTimeout(timer);
        };
    }, [documentHidden, skipMotion, visible]);

    const displayPhase = skipMotion ? 'home' : phase;

    return (
        <div ref={rootRef} className='flex h-full min-h-0 flex-col bg-white'>
            {displayPhase === 'home' ? (
                <HomeScreen />
            ) : (
                <ScheduleScreen highlight={displayPhase === 'slot'} />
            )}
        </div>
    );
}

function StatusRow({ light }: { light?: boolean }) {
    return (
        <div
            className={`flex h-10 items-end justify-between px-5 pb-1 text-[13px] font-semibold ${
                light ? 'text-white' : 'text-gray-900'
            }`}>
            <span>10:23</span>
            <span className='tracking-widest'>•••</span>
        </div>
    );
}

function HomeScreen() {
    return (
        <div className='flex min-h-0 flex-1 flex-col bg-white'>
            <div className='bg-gradient-to-r from-helpi-primary to-helpi-secondary text-white'>
                <StatusRow light />
                <div className='px-4 pb-3'>
                    <p className='text-[13px] font-medium'>Home</p>
                    <p className='truncate text-[11px] text-white/80'>
                        Docklands, Melbourne, Victoria
                    </p>
                </div>
            </div>
            <div className='relative h-[168px] w-full shrink-0 overflow-hidden bg-gray-100'>
                <Image
                    src='/images/hero-home.jpg'
                    alt=''
                    width={472}
                    height={320}
                    className='h-full w-full object-cover object-[50%_22%]'
                />
            </div>
            <div className='grid grid-cols-3 border-b border-gray-100 px-2 py-3 text-center'>
                <TrustMini icon={FaUserCheck} label='Trained Professional' />
                <TrustMini icon={FaCertificate} label='Verified Expert' />
                <TrustMini icon={FaHeadset} label='Dedicated Support' />
            </div>
            <div className='min-h-0 flex-1 px-4 pt-4'>
                <h3 className='mb-3 text-xl font-bold text-gray-900'>
                    Cleaning
                </h3>
                <div className='mb-3 flex rounded-full bg-gray-100 p-1'>
                    <span className='flex-1 rounded-full bg-helpi-primary py-2 text-center text-[12px] font-semibold text-white'>
                        In 15 mins
                    </span>
                    <span className='flex-1 rounded-full py-2 text-center text-[12px] font-medium text-gray-500'>
                        Schedule
                    </span>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DurationCard hours='2.5 hours' price='$248' />
                    <DurationCard hours='4 hours' price='$396' />
                </div>
            </div>
            <div className='mt-auto grid grid-cols-3 border-t border-gray-100 py-2 text-center text-[10px] text-gray-400'>
                <span className='font-semibold text-helpi-primary'>Home</span>
                <span>Bookings</span>
                <span>Account</span>
            </div>
        </div>
    );
}

function ScheduleScreen({ highlight }: { highlight: boolean }) {
    return (
        <div className='flex min-h-0 flex-1 flex-col bg-white'>
            <StatusRow />
            <div className='px-4 pb-2'>
                <p className='text-[15px] font-semibold text-helpi-primary'>
                    Book service
                </p>
                <p className='text-[11px] text-gray-500'>
                    Docklands, Melbourne
                </p>
            </div>
            <div className='min-h-0 flex-1 space-y-3 overflow-hidden px-4'>
                <p className='text-[12px] font-medium text-gray-700'>
                    Select start date
                </p>
                <div className='flex gap-2'>
                    <Chip active label={'Wed\n16'} />
                    <Chip label={'Thu\n17'} />
                    <Chip label={'Fri\n18'} />
                    <Chip label={'Sat\n19'} />
                </div>
                <p className='text-[12px] font-medium text-gray-700'>
                    Duration
                </p>
                <div className='flex gap-2'>
                    <span className='rounded-2xl bg-helpi-soft px-3 py-2 text-[11px] font-semibold text-helpi-primary'>
                        2.5 hrs
                    </span>
                    <span className='rounded-2xl border border-gray-200 px-3 py-2 text-[11px] text-gray-500'>
                        4 hrs
                    </span>
                    <span className='rounded-2xl border border-gray-200 px-3 py-2 text-[11px] text-gray-500'>
                        8 hrs
                    </span>
                </div>
                <p className='text-[12px] font-medium text-gray-700'>
                    Time slot
                </p>
                <div className='flex gap-2'>
                    <span className='rounded-full bg-helpi-soft px-3 py-1.5 text-[11px] font-semibold text-helpi-primary'>
                        Morning
                    </span>
                    <span className='rounded-full px-3 py-1.5 text-[11px] text-gray-500'>
                        Afternoon
                    </span>
                    <span className='rounded-full px-3 py-1.5 text-[11px] text-gray-500'>
                        Evening
                    </span>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                    <span
                        className={`rounded-full px-2 py-2 text-center text-[11px] font-semibold ${
                            highlight
                                ? 'bg-helpi-primary text-white'
                                : 'bg-helpi-soft text-helpi-primary'
                        }`}>
                        6:00 AM
                    </span>
                    <span className='rounded-full border border-gray-200 px-2 py-2 text-center text-[11px] text-gray-500'>
                        7:00 AM
                    </span>
                    <span className='rounded-full border border-gray-200 px-2 py-2 text-center text-[11px] text-gray-500'>
                        8:00 AM
                    </span>
                </div>
            </div>
            <div className='mt-auto flex items-center justify-between bg-white px-4 py-3'>
                <span className='text-[15px] font-semibold text-gray-900'>
                    $248
                </span>
                <span className='rounded-full bg-gradient-to-r from-helpi-primary to-helpi-secondary px-8 py-2.5 text-[13px] font-semibold text-white'>
                    Continue
                </span>
            </div>
        </div>
    );
}

function TrustMini({
    icon: Icon,
    label,
}: {
    icon: typeof FaUserCheck;
    label: string;
}) {
    return (
        <div className='px-1'>
            <Icon className='mx-auto mb-1 text-helpi-mid' />
            <p className='text-[9px] leading-tight text-gray-500'>{label}</p>
        </div>
    );
}

function DurationCard({ hours, price }: { hours: string; price: string }) {
    return (
        <div className='rounded-2xl border border-gray-200 p-3'>
            <p className='text-[12px] font-medium text-gray-800'>{hours}</p>
            <p className='text-[16px] font-bold text-gray-900'>{price}</p>
            <span className='mt-2 block rounded-full border border-helpi-primary py-1 text-center text-[11px] font-semibold text-helpi-primary'>
                Book
            </span>
        </div>
    );
}

function Chip({ label, active }: { label: string; active?: boolean }) {
    return (
        <span
            className={`whitespace-pre-line rounded-2xl px-3 py-2 text-center text-[11px] leading-tight ${
                active
                    ? 'bg-helpi-soft font-semibold text-helpi-primary'
                    : 'border border-gray-200 text-gray-500'
            }`}>
            {label}
        </span>
    );
}
