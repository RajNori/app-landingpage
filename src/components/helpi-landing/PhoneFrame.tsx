import type { ReactNode } from 'react';

interface PhoneFrameProps {
    children: ReactNode;
    className?: string;
    labelledBy?: string;
    decorative?: boolean;
}

export default function PhoneFrame({
    children,
    className = 'hero-phone-frame',
    labelledBy,
    decorative = false,
}: PhoneFrameProps) {
    return (
        <div className={className}>
            <div
                className='hero-phone overflow-hidden rounded-[48px] bg-[#1c1c1e] p-[10px] shadow-2xl'
                aria-hidden={decorative ? true : undefined}
                aria-labelledby={decorative ? undefined : labelledBy}>
                <div className='relative flex h-full min-h-0 flex-col overflow-hidden rounded-[38px] bg-white'>
                    {children}
                </div>
            </div>
        </div>
    );
}
