import type { Metadata } from 'next';
import Link from 'next/link';
import LegalShell, { LegalSection } from '@/components/legal/LegalShell';
import { SUPPORT_EMAIL } from '@/utils/constants';

export const metadata: Metadata = {
    title: 'Terms and Conditions - Helpi',
    description:
        'Terms of use, booking terms, cancellations and community guidelines for the Helpi platform.',
};

const mail = (
    <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className='font-medium text-helpi-primary underline-offset-2 hover:underline'>
        {SUPPORT_EMAIL}
    </a>
);

export default function TermsPage() {
    return (
        <LegalShell
            title='Terms and Conditions'
            description='These terms apply when you use the Helpi website or app. If you make a booking, the booking terms, cancellation policy and privacy policy also form part of your agreement with Helpi Pty Ltd.'>
            <nav className='rounded-2xl bg-helpi-soft/50 p-4 text-sm' aria-label='On this page'>
                <ul className='space-y-1'>
                    <li><a className='hover:text-helpi-primary' href='#use'>Website and app terms of use</a></li>
                    <li><a className='hover:text-helpi-primary' href='#booking'>Customer booking terms</a></li>
                    <li><a className='hover:text-helpi-primary' href='#cancellation'>Cancellation and refunds</a></li>
                    <li><a className='hover:text-helpi-primary' href='#guidelines'>Service and community guidelines</a></li>
                </ul>
            </nav>

            <LegalSection id='use' title='Website and app terms of use'>
                <p>
                    These terms cover general use of the platform by anyone,
                    whether or not you book. Booking terms or a cleaner
                    agreement prevail over these terms if they conflict about a
                    booking. The <Link href='/privacy' className='text-helpi-primary underline-offset-2 hover:underline'>Privacy Policy</Link> and <Link href='/cookies' className='text-helpi-primary underline-offset-2 hover:underline'>Cookie Policy</Link> apply to everyone.
                </p>
                <p>
                    You must be at least 18 and able to enter a contract. Keep
                    your login secure, do not share your account, and tell us
                    promptly about unauthorised use. We grant a personal,
                    non-exclusive, revocable licence to use the platform for its
                    intended purpose. Features may change.
                </p>
                <p>
                    Do not use the platform unlawfully, interfere with it,
                    introduce malicious code, scrape it, reverse engineer it
                    except where the law does not allow that restriction, post
                    unlawful or infringing content, or arrange cleaning off the
                    platform with someone you met through it.
                </p>
                <p>
                    You keep ownership of content you submit, such as reviews
                    and messages, and you licence Helpi to host and display it
                    to operate and improve the platform. Helpi owns the brand,
                    software and design. Third-party links and payment or
                    mapping services have their own terms.
                </p>
                <p>
                    The platform is provided as available. We do not guarantee
                    it will be uninterrupted. Consumer guarantees that cannot be
                    excluded still apply. Subject to those guarantees, we are
                    not liable for indirect loss from general use of the
                    platform. Booking liability is covered in the booking terms.
                    We may suspend access for breach, or for legal or safety
                    reasons. You may close your account at any time.
                </p>
                <p>
                    These terms are governed by the laws of Victoria. Questions: {mail}.
                </p>
            </LegalSection>

            <LegalSection id='booking' title='Customer booking terms'>
                <p>
                    Helpi is the party you contract with for a booking. We
                    arrange domestic and commercial cleaning, set the price,
                    take payment, and stand behind the service as these terms
                    and the cancellation policy describe. The work is carried
                    out by independent cleaners or agency personnel. They are
                    not Helpi employees. Vetting, including identity checks and
                    a national police check, reduces risk. It does not guarantee
                    an outcome.
                </p>
                <p>
                    You must be 18 or older and authorised to arrange cleaning
                    of the premises. A contract is formed when we accept the
                    booking and allocate a cleaner. We may decline a request.
                    You are responsible for accurate address, access, size and
                    safety information. If the job differs materially from the
                    booking, we will agree any extra charge with you before it
                    is incurred.
                </p>
                <p>
                    Prices shown at booking include GST. We do not add a card
                    surcharge. We place a pre-authorisation on your card and
                    capture payment after the clean, or capture a cancellation
                    amount where the cancellation policy says so. Helpi does not
                    store your full card number. Extra time or tasks need the
                    cleaner’s availability and your agreement to the charge
                    first.
                </p>
                <p>
                    Provide safe access, water, power and light. Tell us about
                    hazards, animals, and surveillance. A cleaner may leave an
                    unsafe job, which is treated as a same-day cancellation by
                    you. Standard bookings do not include work at height, heavy
                    moving, biohazards, mould beyond the surface, pest control,
                    or hazardous materials. Secure cash, jewellery and
                    irreplaceable items before the clean.
                </p>
                <p>
                    If the clean is not to a reasonable standard, contact us
                    within 24 hours. Where the concern is reasonable, we will
                    arrange a re-clean of the affected areas or another
                    appropriate remedy. Consumer guarantees under Australian law
                    cannot be excluded. Where the law allows us to limit
                    liability, our total liability for a booking is the greater
                    of the fees you paid for that booking and AUD 5,000, except
                    property-damage claims, which are handled under our
                    insurance if you report them in writing within 72 hours.
                </p>
                <p>
                    During your use of the platform and for six months
                    afterwards, do not engage a cleaner you met through Helpi
                    to bypass the platform. These terms are governed by the
                    laws of Victoria. Contact {mail}.
                </p>
            </LegalSection>

            <LegalSection id='cancellation' title='Cancellation and refunds'>
                <p>
                    If you cancel or reschedule at least 24 hours before the
                    scheduled start, there is no fee and the card hold is
                    released. Less than 24 hours before the start, but not on
                    the day, a late-cancellation fee of AUD 40 applies. On the
                    day, if the cleaner cannot get in, or if the booking is
                    treated as a same-day cancellation because the premises are
                    unsafe, 50% of the booking price applies. We tell you the
                    fee before it is charged.
                </p>
                <p>
                    If the cleaner does not attend, or we cannot supply the
                    service, you are not charged. We will try to replace or
                    reschedule, or release the hold or refund any amount taken.
                    If you are not satisfied, contact us within 24 hours. A
                    re-clean, or another fair remedy including a refund where a
                    re-clean is not practical, may apply. Consumer guarantees
                    still apply.
                </p>
                <p>
                    Refunds go back to the card used for the booking. We aim to
                    process them within 5 business days. Contact us before
                    raising a chargeback.
                </p>
            </LegalSection>

            <LegalSection id='guidelines' title='Service and community guidelines'>
                <p>
                    Treat everyone with respect. Harassment, threats and
                    unlawful discrimination are not allowed. Tell us about
                    hazards before a booking. A cleaner may stop work that is
                    unsafe or outside scope.
                </p>
                <p>
                    A standard clean covers the areas booked, such as dusting,
                    vacuuming, mopping, and kitchen and bathroom cleaning,
                    within the booked time. Add-ons apply only if selected and
                    agreed, including any extra charge, before the work starts.
                    Heights, heavy furniture, biohazards, mould removal, pests,
                    exterior work and hazardous materials are out of scope.
                </p>
                <p>
                    Customers should give safe access, accurate details, and
                    secured valuables, and keep booking, messages and payment on
                    the platform. Cleaners should arrive on time, work within
                    scope, check in through the app, and keep customer
                    information confidential. Before-and-after photos may be
                    taken for quality. Other recording of a person without
                    their knowledge is not allowed.
                </p>
                <p>
                    If these guidelines are not followed, we may warn, decline
                    future bookings, or remove access, in line with the relevant
                    agreement. Report a concern to {mail}.
                </p>
            </LegalSection>
        </LegalShell>
    );
}
