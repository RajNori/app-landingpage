import ComingSoon from '../../components/ComingSoon';

export const metadata = {
    title: 'Blog - Helpi',
    description:
        'Helpi blog with cleaning tips and company updates coming soon.',
};

export default function BlogPage() {
    return (
        <ComingSoon
            title='Blog'
            message='Our blog is coming soon! Get ready for helpful cleaning tips, home maintenance advice, and the latest updates from the Helpi team.'
        />
    );
}
