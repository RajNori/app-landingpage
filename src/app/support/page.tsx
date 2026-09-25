import type { Metadata } from 'next';
import Link from 'next/link';
import LegalShell, { LegalSection } from '@/components/legal/LegalShell';
import { SUPPORT_EMAIL } from '@/utils/constants';

export const metadata: Metadata = {
    title: 'Support - Helpi',
    description: 'Contact Helpi support for bookings, the app, and privacy questions.',
};

export default function SupportPage() {
    return (
        <LegalShell
            title='Support'
            description='Email the Helpi team about a booking, the app, or a privacy question. We read messages sent to the address below.'>
            <LegalSection title='Contact'>
                <p>
                    <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className='inline-flex min-h-11 items-center rounded-full bg-helpi-primary px-5 text-sm font-semibold text-white hover:bg-helpi-secondary'>
                        Email {SUPPORT_EMAIL}
                    </a>
                </p>
                <p>
                    Use this address for booking help, cancellations, a re-clean
                    request, account access, and privacy requests or complaints.
                    Include your name, the email on your Helpi account, and the
                    booking date if you have one.
                </p>
            </LegalSection>
            <LegalSection title='Policies'>
                <p>
                    <Link href='/terms' className='font-medium text-helpi-primary underline-offset-2 hover:underline'>
                        Terms and conditions
                    </Link>
                    , including bookings and cancellations.{' '}
                    <Link href='/privacy' className='font-medium text-helpi-primary underline-offset-2 hover:underline'>
                        Privacy policy
                    </Link>
                    .{' '}
                    <Link href='/cookies' className='font-medium text-helpi-primary underline-offset-2 hover:underline'>
                        Cookie policy
                    </Link>
                    .
                </p>
                <p>
                    If you are not satisfied with our response to a privacy
                    complaint, you can contact the Office of the Australian
                    Information Commissioner at oaic.gov.au or 1300 363 992.
                </p>
            </LegalSection>
        </LegalShell>
    );
}
