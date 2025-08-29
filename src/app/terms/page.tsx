import ComingSoon from '../../components/ComingSoon';

export const metadata = {
    title: 'Terms of Service - Helpi',
    description: 'Helpi Terms of Service coming soon.',
};

export default function TermsPage() {
    return (
        <ComingSoon
            title='Terms of Service'
            message='Our terms of service are being finalized. Clear, fair terms that protect both customers and service providers will be available here soon.'
        />
    );
}
