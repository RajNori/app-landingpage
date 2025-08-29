import ComingSoon from '../../components/ComingSoon';

export const metadata = {
    title: 'Press - Helpi',
    description: 'Helpi press releases and media resources coming soon.',
};

export default function PressPage() {
    return (
        <ComingSoon
            title='Press'
            message="Media resources and press releases coming soon! Stay tuned for the latest news and announcements about Helpi's journey."
        />
    );
}
