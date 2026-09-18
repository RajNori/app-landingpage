import ComingSoon from '../../components/ComingSoon';

export const metadata = {
    title: 'Help Center - Helpi',
    description:
        'Helpi Help Center with FAQs and support resources coming soon.',
};

export default function HelpPage() {
    return (
        <ComingSoon
            title='Help Center'
            message='Our comprehensive help center is under construction! In the meantime, feel free to contact us directly for any questions or support needs.'
        />
    );
}
