import type { Metadata } from 'next';
import Link from 'next/link';
import LegalShell, { LegalSection } from '@/components/legal/LegalShell';
import { SUPPORT_EMAIL } from '@/utils/constants';

export const metadata: Metadata = {
    title: 'Cookie Policy - Helpi',
    description: 'How Helpi uses cookies and similar technologies.',
};

export default function CookiesPage() {
    return (
        <LegalShell
            title='Cookie Policy'
            description='This policy explains how Helpi uses cookies and similar technologies on the website and app. Where a cookie collects personal information, the Privacy Policy also applies.'>
            <LegalSection title='1. What cookies are'>
                <p>
                    Cookies are small text files placed on your device. We also
                    use similar technologies such as pixels, tags and local
                    storage. In this policy, “cookies” includes those.
                </p>
            </LegalSection>
            <LegalSection title='2. Why we use them'>
                <p>
                    We use cookies to run and secure the website and app,
                    remember settings, and understand how the service is used
                    so we can improve it. Some are necessary. Others are
                    optional.
                </p>
            </LegalSection>
            <LegalSection title='3. Types we use'>
                <p>
                    Strictly necessary cookies are required for security, login
                    and moving through the service. They cannot be switched off
                    in our systems.
                </p>
                <p>
                    Functional cookies remember preferences. Analytics and
                    performance cookies help us see which pages are used and
                    whether errors occur.
                </p>
            </LegalSection>
            <LegalSection title='4. Third parties'>
                <p>
                    Some cookies are set by providers that help us run the
                    service, such as analytics and payment providers. They
                    handle information under their own policies. The providers
                    in use can change over time.
                </p>
            </LegalSection>
            <LegalSection title='5. How long they last'>
                <p>
                    Session cookies are removed when you close the browser or
                    app. Persistent cookies stay until they expire or you delete
                    them.
                </p>
            </LegalSection>
            <LegalSection title='6. Managing cookies'>
                <p>
                    Most browsers let you view, delete or block cookies. Blocking
                    some cookies may stop parts of the service from working.
                    Strictly necessary cookies cannot be disabled through our
                    controls.
                </p>
            </LegalSection>
            <LegalSection title='7. Browser signals'>
                <p>
                    There is no consistent standard for “Do Not Track” signals.
                    We treat them in line with applicable law.
                </p>
            </LegalSection>
            <LegalSection title='8. Contact'>
                <p>
                    Questions about cookies:{' '}
                    <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className='font-medium text-helpi-primary underline-offset-2 hover:underline'>
                        {SUPPORT_EMAIL}
                    </a>
                    . See also the{' '}
                    <Link href='/privacy' className='font-medium text-helpi-primary underline-offset-2 hover:underline'>
                        Privacy Policy
                    </Link>
                    .
                </p>
            </LegalSection>
        </LegalShell>
    );
}
