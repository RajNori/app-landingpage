import ComingSoon from '../../components/ComingSoon';

export const metadata = {
    title: 'Insurance - Helpi',
    description:
        'Helpi insurance information and coverage details coming soon.',
};

export default function InsurancePage() {
    return (
        <ComingSoon
            title='Insurance'
            message='Comprehensive insurance coverage details will be available here soon. All our cleaners are fully insured and bonded for your peace of mind.'
        />
    );
}
