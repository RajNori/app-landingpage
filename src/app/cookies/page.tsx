import ComingSoon from '../../components/ComingSoon';

export const metadata = {
    title: 'Cookie Policy - Helpi',
    description: 'Helpi Cookie Policy coming soon.',
};

export default function CookiesPage() {
    return (
        <ComingSoon
            title='Cookie Policy'
            message="Our cookie policy details will be available here soon. We're committed to transparency about how we use cookies to improve your experience."
        />
    );
}
