'use client';

import { useEffect, useState, ReactNode } from 'react';

// Feature flag for hydration debugging (default true in dev)
export const HYDRATE_DEBUG = process.env.NODE_ENV === 'development';

interface HydrationGuardProps {
    children: ReactNode;
    placeholder?: ReactNode;
    fallback?: ReactNode;
    name?: string;
}

export function HydrationGuard({
    children,
    placeholder = null,
    name = 'HydrationGuard',
}: HydrationGuardProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (HYDRATE_DEBUG) {
            console.log(`[${name}] Client mounted, switching from SSR to CSR`);
        }
        setMounted(true);
    }, [name]);

    // Log SSR vs CSR differences when debugging
    useEffect(() => {
        if (HYDRATE_DEBUG && mounted) {
            console.log(`[${name}] First paint complete, hydration stable`);
        }
    }, [mounted, name]);

    if (!mounted) {
        if (HYDRATE_DEBUG) {
            console.log(`[${name}] Rendering SSR placeholder`);
        }
        return <>{placeholder}</>;
    }

    return <>{children}</>;
}

export function useIsMounted() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted;
}

// Debug component to show hydration state
export function HydrationDebugInfo({ name }: { name: string }) {
    const isMounted = useIsMounted();

    if (HYDRATE_DEBUG) {
        return (
            <div className='fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50'>
                <div>
                    {name}: {isMounted ? 'CSR' : 'SSR'}
                </div>
            </div>
        );
    }

    return null;
}
