import type { Metadata } from 'next';
import Link from 'next/link';
import LegalShell, { LegalSection } from '@/components/legal/LegalShell';
import { SUPPORT_EMAIL } from '@/utils/constants';

export const metadata: Metadata = {
    title: 'Privacy Policy - Helpi',
    description:
        'How Helpi Pty Ltd collects, holds, uses and protects personal information.',
};

export default function PrivacyPage() {
    return (
        <LegalShell
            title='Privacy Policy'
            description='This policy explains how Helpi collects, holds, uses, discloses and protects personal information when you use the Helpi website or app, make or accept a booking, or otherwise deal with us.'>
            <LegalSection title='1. Who this policy applies to'>
                <p>
                    It applies to customers and prospective customers, cleaners
                    and applicants, representatives of agencies that supply
                    cleaners, and visitors to the website and app.
                </p>
            </LegalSection>
            <LegalSection title='2. Personal and sensitive information'>
                <p>
                    Personal information is information or an opinion about an
                    identified person, or someone who is reasonably
                    identifiable. Sensitive information includes health
                    information and criminal-record information. We collect
                    sensitive information only where it is reasonably necessary
                    and with consent, or where the law otherwise allows it.
                </p>
            </LegalSection>
            <LegalSection title='3. What we collect'>
                <p>
                    For customers: name, email, phone, service address and
                    access instructions, booking details, messages, ratings and
                    feedback, and payment information. Card details are stored
                    in tokenised form by our payment processor. Helpi does not
                    store full card numbers.
                </p>
                <p>
                    For cleaners and applicants: name, contact details, identity
                    and right-to-work information, qualifications, ABN and
                    tax details where they apply, bank details for payment,
                    availability and job records, location while performing a
                    booking, ratings and conduct records, and background-check
                    results, including a national police check collected with
                    consent.
                </p>
                <p>
                    For agency contacts: name, role and business contact
                    details. For all users: login details, device and usage
                    data, and anything you choose to send when you contact us.
                    We usually cannot arrange a booking without the information
                    needed to do so.
                </p>
            </LegalSection>
            <LegalSection title='4. How we collect it'>
                <p>
                    We collect it from you when you create an account, book or
                    accept work, apply, or contact us; automatically from the
                    website and app; and from agencies, background-check
                    providers, payment and identity providers, and referees
                    where relevant.
                </p>
            </LegalSection>
            <LegalSection title='5. Location'>
                <p>
                    We collect the service address from customers. From
                    cleaners using the app during a booking, we collect device
                    location to allocate and confirm jobs, record check-in and
                    check-out, and support safety and disputes. Turning location
                    off may prevent a cleaner from accepting or completing a
                    booking.
                </p>
            </LegalSection>
            <LegalSection title='6. Why we use it'>
                <p>
                    We use personal information to run accounts and bookings,
                    take payment and pay cleaners and agencies, vet and manage
                    cleaners, communicate about bookings and support, handle
                    ratings, complaints and disputes, keep the platform safe,
                    improve the service, meet legal obligations, and, where
                    permitted, send marketing. We use it for the purpose it was
                    collected, a related purpose you would reasonably expect, or
                    as the law or your consent allows.
                </p>
            </LegalSection>
            <LegalSection title='7. Who we share it with'>
                <p>
                    We share what is needed to perform a booking with the
                    allocated cleaner and the customer (for example, address and
                    access details with the cleaner, and a cleaner’s first name
                    with the customer). We also share information with supplying
                    agencies, service providers (payments, identity checks,
                    hosting, communications, mapping and analytics),
                    professional advisers, and authorities where the law
                    requires it or to protect someone’s safety. A purchaser of
                    the business may receive it under confidentiality
                    obligations.
                </p>
            </LegalSection>
            <LegalSection title='8. Overseas disclosure'>
                <p>
                    Some providers may store or process personal information
                    outside Australia. Where we disclose information overseas,
                    we take reasonable steps so the recipient handles it
                    consistently with applicable privacy law.
                </p>
            </LegalSection>
            <LegalSection title='9. Marketing'>
                <p>
                    You can opt out of marketing at any time using the
                    unsubscribe link or by emailing {SUPPORT_EMAIL}. We do not
                    use sensitive information for marketing without consent.
                </p>
            </LegalSection>
            <LegalSection title='10. Cookies'>
                <p>
                    The website and app use cookies and similar technologies to
                    operate, remember preferences, and understand use. See the{' '}
                    <Link href='/cookies' className='font-medium text-helpi-primary underline-offset-2 hover:underline'>
                        Cookie Policy
                    </Link>
                    .
                </p>
            </LegalSection>
            <LegalSection title='11. Automated processes'>
                <p>
                    We use technology to help match and allocate bookings. Where
                    an automated process could significantly affect your rights,
                    we will describe that process and the information it uses.
                </p>
            </LegalSection>
            <LegalSection title='12. Storage and breaches'>
                <p>
                    We take reasonable steps to protect personal information,
                    including access controls, reputable providers, tokenised
                    payments, and staff confidentiality. If we suspect a breach
                    that is likely to cause serious harm, we will notify
                    affected people and the relevant regulator as the law
                    requires.
                </p>
            </LegalSection>
            <LegalSection title='13. How long we keep it'>
                <p>
                    We keep personal information only while it is needed for
                    these purposes or as the law requires. When it is no longer
                    needed, we take reasonable steps to destroy or de-identify
                    it.
                </p>
            </LegalSection>
            <LegalSection title='14. Access and correction'>
                <p>
                    You can ask for access to the personal information we hold
                    about you, and ask us to correct it, by emailing{' '}
                    <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className='font-medium text-helpi-primary underline-offset-2 hover:underline'>
                        {SUPPORT_EMAIL}
                    </a>
                    . We respond within a reasonable period. If we decline a
                    request where the law allows that, we will explain why and
                    how you can complain.
                </p>
            </LegalSection>
            <LegalSection title='15. Complaints'>
                <p>
                    Email {SUPPORT_EMAIL}. If you are not satisfied with our
                    response, you can complain to the Office of the Australian
                    Information Commissioner at oaic.gov.au or 1300 363 992.
                </p>
            </LegalSection>
            <LegalSection title='16. Changes'>
                <p>
                    We may update this policy. The current version is published
                    here. Material changes apply from the date they are
                    published.
                </p>
            </LegalSection>
        </LegalShell>
    );
}
