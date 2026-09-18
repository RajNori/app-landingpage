'use client';

import { useState, useEffect } from 'react';
import {
    HydrationGuard,
    useIsMounted,
    HYDRATE_DEBUG,
} from '../../../lib/hydrationDebug';

export default function HydrationDebugPage() {
    const [clientTime, setClientTime] = useState<string>('');
    const [localStorageValue, setLocalStorageValue] = useState<string>('');
    const isMounted = useIsMounted();

    useEffect(() => {
        if (isMounted) {
            setClientTime(new Date().toLocaleTimeString());
            setLocalStorageValue(
                localStorage.getItem('test-key') || 'No value'
            );
        }
    }, [isMounted]);

    return (
        <div className='min-h-screen bg-gray-50 p-8'>
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-3xl font-bold text-gray-900 mb-8'>
                    Hydration Debug Page
                </h1>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Time-based content tile */}
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Time Content (Fixed)
                        </h3>
                        <div className='space-y-2'>
                            <div className='text-sm text-gray-600'>
                                SSR: <span className='font-mono'>--:--:--</span>
                            </div>
                            <div className='text-sm text-gray-600'>
                                CSR:{' '}
                                <span className='font-mono'>
                                    {clientTime || 'Loading...'}
                                </span>
                            </div>
                        </div>
                        {HYDRATE_DEBUG && (
                            <div className='mt-4 p-2 bg-blue-50 text-blue-800 text-xs rounded'>
                                Debug: This tile now renders deterministically
                                on SSR
                            </div>
                        )}
                    </div>

                    {/* localStorage tile */}
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h3 className='text-lg font-semibold mb-4'>
                            localStorage (Fixed)
                        </h3>
                        <HydrationGuard
                            name='localStorage-tile'
                            placeholder={
                                <div className='text-sm text-gray-500'>
                                    SSR: <span className='font-mono'>--</span>
                                </div>
                            }>
                            <div className='text-sm text-gray-600'>
                                Value:{' '}
                                <span className='font-mono'>
                                    {localStorageValue}
                                </span>
                            </div>
                        </HydrationGuard>
                        {HYDRATE_DEBUG && (
                            <div className='mt-4 p-2 bg-green-50 text-green-800 text-xs rounded'>
                                Debug: localStorage only accessed after mount
                            </div>
                        )}
                    </div>

                    {/* Cart summary tile */}
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Cart Summary (Fixed)
                        </h3>
                        <HydrationGuard
                            name='cart-summary'
                            placeholder={
                                <div className='text-sm text-gray-500'>
                                    Items: <span className='font-mono'>0</span>
                                </div>
                            }>
                            <div className='text-sm text-gray-600'>
                                Items: <span className='font-mono'>3</span>{' '}
                                (simulated)
                            </div>
                        </HydrationGuard>
                        {HYDRATE_DEBUG && (
                            <div className='mt-4 p-2 bg-purple-50 text-purple-800 text-xs rounded'>
                                Debug: Cart count stable on SSR, updates on CSR
                            </div>
                        )}
                    </div>

                    {/* Theme tile */}
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Theme (Fixed)
                        </h3>
                        <div className='text-sm text-gray-600'>
                            Current: <span className='font-mono'>light</span>
                        </div>
                        {HYDRATE_DEBUG && (
                            <div className='mt-4 p-2 bg-yellow-50 text-yellow-800 text-xs rounded'>
                                Debug: Theme class stable, no hydration mismatch
                            </div>
                        )}
                    </div>
                </div>

                {/* Hydration status */}
                <div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
                    <h3 className='text-lg font-semibold mb-4'>
                        Hydration Status
                    </h3>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <div
                                className={`w-3 h-3 rounded-full ${
                                    isMounted ? 'bg-green-500' : 'bg-yellow-500'
                                }`}></div>
                            <span className='text-sm'>
                                {isMounted
                                    ? 'Client-side rendered'
                                    : 'Server-side rendered'}
                            </span>
                        </div>
                        {HYDRATE_DEBUG && (
                            <div className='mt-4 p-2 bg-gray-50 text-gray-700 text-xs rounded'>
                                Check console for detailed hydration logs
                            </div>
                        )}
                    </div>
                </div>

                {/* Instructions */}
                <div className='mt-8 bg-blue-50 p-6 rounded-lg'>
                    <h3 className='text-lg font-semibold mb-4 text-blue-900'>
                        Testing Instructions
                    </h3>
                    <ul className='text-blue-800 text-sm space-y-2'>
                        <li>• Reload the page to test SSR → CSR transition</li>
                        <li>• Check console for hydration debug logs</li>
                        <li>• Navigate away and back to test navigation</li>
                        <li>
                            • Verify no &quot;Hydration failed&quot; warnings
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
