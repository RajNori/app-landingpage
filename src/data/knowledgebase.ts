// Knowledge Management System Data
// Helpi KMS Content Structure

export type UserRole = 'helpers' | 'admins' | 'clients';
export type ArticleType = 'Guide' | 'FAQ' | 'Checklist';
export type ArticleStatus = 'Stable' | 'Beta';

export interface Article {
    slug: string;
    title: string;
    type: ArticleType;
    status: ArticleStatus;
    updated: string;
    excerpt: string;
    category?: string;
}

export interface KMSData {
    roles: Array<{ key: UserRole; label: string }>;
    categories: Record<UserRole, string[]>;
    facets: Array<{ key: string; label: string; values: string[] }>;
    articles: Record<UserRole, Article[]>;
}

export const KMS_CONTENT: KMSData = {
    roles: [
        { key: 'helpers', label: 'Helpers' },
        { key: 'admins', label: 'Admins' },
        { key: 'clients', label: 'Clients' },
    ],
    categories: {
        helpers: [
            'Getting Started',
            'Working on Jobs',
            'Payments & Invoices',
            'Profile & Documents',
            'App Settings',
            'Troubleshooting',
        ],
        admins: [
            'Getting Started',
            'User & Account Management',
            'Services & Documentation',
            'Jobs & Payments',
            'Operations & Support',
            'Best Practices & Troubleshooting',
            'Reference Materials',
        ],
        clients: [
            'Getting Started',
            'Posting Jobs',
            'Tracking Jobs',
            'Payments & Invoices',
            'Reviews & History',
            'Profile & Settings',
        ],
    },
    facets: [
        { key: 'type', label: 'Type', values: ['Guide', 'FAQ', 'Checklist'] },
        { key: 'status', label: 'Status', values: ['Stable', 'Beta'] },
    ],
    articles: {
        helpers: [
            // Getting Started
            {
                slug: 'welcome-to-helpi',
                title: 'Welcome to Helpi',
                type: 'Guide',
                status: 'Stable',
                updated: '1d',
                excerpt: 'Overview of the Helpi platform and how it works.',
                category: 'Getting Started',
            },
            {
                slug: 'create-account',
                title: 'Create your Helpi account',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Phone OTP signup in under a minute.',
                category: 'Getting Started',
            },
            {
                slug: 'identity-verification',
                title: 'Identity verification & checks',
                type: 'Checklist',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Submit Docs, ABN, and Police check.',
                category: 'Getting Started',
            },
            {
                slug: 'profile-completion',
                title: 'Complete your profile',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Add your personal details and work preferences.',
                category: 'Getting Started',
            },
            {
                slug: 'device-setup',
                title: 'Device setup & permissions',
                type: 'Checklist',
                status: 'Stable',
                updated: '1d',
                excerpt:
                    'Enable notifications, location, and battery optimization.',
                category: 'Getting Started',
            },
            {
                slug: 'work-readiness',
                title: 'Work readiness checklist',
                type: 'Checklist',
                status: 'Stable',
                updated: '1w',
                excerpt: 'Verify everything is ready before accepting jobs.',
                category: 'Getting Started',
            },
            // Working on Jobs
            {
                slug: 'accept-checkin',
                title: 'Accept & check-in to a job',
                type: 'Guide',
                status: 'Stable',
                updated: '1w',
                excerpt: 'Accept → navigate → geofence check-in.',
                category: 'Working on Jobs',
            },
            {
                slug: 'geofence-checkout',
                title: 'Geofenced check-out process',
                type: 'Guide',
                status: 'Stable',
                updated: '1w',
                excerpt: 'Complete job check-out within the geofence.',
                category: 'Working on Jobs',
            },
            {
                slug: 'complete-job',
                title: 'Complete a job & add proofs',
                type: 'Guide',
                status: 'Beta',
                updated: '1w',
                excerpt: 'Photos, notes, and rating flow.',
                category: 'Working on Jobs',
            },
            {
                slug: 'submitting-completion',
                title: 'Submitting job completion',
                type: 'Guide',
                status: 'Stable',
                updated: '5d',
                excerpt: 'Finalize and submit your completed work.',
                category: 'Working on Jobs',
            },
            {
                slug: 'ratings-reviews',
                title: 'Ratings & reviews',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Understanding how ratings work.',
                category: 'Working on Jobs',
            },
            {
                slug: 'disputed-jobs',
                title: 'Disputed jobs escalation',
                type: 'Guide',
                status: 'Stable',
                updated: '1w',
                excerpt: 'What to do when a job is disputed.',
                category: 'Working on Jobs',
            },
            // Payments & Invoices
            {
                slug: 'payment-schedule',
                title: 'Payment schedule & timing',
                type: 'FAQ',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Weekly/batch payment schedules.',
                category: 'Payments & Invoices',
            },
            {
                slug: 'view-earnings',
                title: 'View earnings & invoices',
                type: 'FAQ',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Breakdown of payouts & timelines.',
                category: 'Payments & Invoices',
            },
            {
                slug: 'payout-methods',
                title: 'Payout methods (Stripe & bank)',
                type: 'Guide',
                status: 'Stable',
                updated: '4d',
                excerpt: 'Set up your preferred payment method.',
                category: 'Payments & Invoices',
            },
            {
                slug: 'gst-compliance',
                title: 'GST & ABN compliance',
                type: 'Guide',
                status: 'Stable',
                updated: '1w',
                excerpt: 'Withholding, GST, and ABN requirements.',
                category: 'Payments & Invoices',
            },
            // Profile & Documents
            {
                slug: 'update-profile',
                title: 'Updating personal details',
                type: 'Guide',
                status: 'Stable',
                updated: '5d',
                excerpt: 'Keep your profile information current.',
                category: 'Profile & Documents',
            },
            {
                slug: 'upload-documents',
                title: 'Upload ID & police checks',
                type: 'Guide',
                status: 'Stable',
                updated: '1w',
                excerpt: 'Submit required verification documents.',
                category: 'Profile & Documents',
            },
            {
                slug: 'verify-expiry',
                title: 'Verifying document expiry',
                type: 'Guide',
                status: 'Stable',
                updated: '6d',
                excerpt: 'Track and renew expiring documents.',
                category: 'Profile & Documents',
            },
            {
                slug: 're-upload-workflow',
                title: 'Re-upload & approval workflows',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Understanding the approval process.',
                category: 'Profile & Documents',
            },
            // App Settings
            {
                slug: 'enable-location',
                title: 'Enable location & notifications',
                type: 'Checklist',
                status: 'Stable',
                updated: '5d',
                excerpt: 'Ensure accurate check-ins & job alerts.',
                category: 'App Settings',
            },
            {
                slug: 'notification-settings',
                title: 'Push notification configuration',
                type: 'Guide',
                status: 'Stable',
                updated: '4d',
                excerpt: 'Manage your notification preferences.',
                category: 'App Settings',
            },
            {
                slug: 'battery-optimization',
                title: 'Battery optimization & background modes',
                type: 'Guide',
                status: 'Stable',
                updated: '1w',
                excerpt: 'Keep the app running efficiently.',
                category: 'App Settings',
            },
            // Troubleshooting
            {
                slug: 'no-job-notifications',
                title: 'No job notifications',
                type: 'FAQ',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Fix missing job alerts.',
                category: 'Troubleshooting',
            },
            {
                slug: 'cant-check-in',
                title: "Can't check in/out",
                type: 'FAQ',
                status: 'Stable',
                updated: '1d',
                excerpt: 'Geofence check-in issues.',
                category: 'Troubleshooting',
            },
            {
                slug: 'app-not-updating',
                title: 'App not updating',
                type: 'FAQ',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Fix sync and update problems.',
                category: 'Troubleshooting',
            },
            {
                slug: 'payment-delays',
                title: 'Payment delays',
                type: 'FAQ',
                status: 'Stable',
                updated: '5d',
                excerpt: 'Understanding payment timelines.',
                category: 'Troubleshooting',
            },
        ],
        admins: [
            // Getting Started
            {
                slug: 'admin-dashboard-overview',
                title: 'Admin Dashboard Overview',
                type: 'Guide',
                status: 'Stable',
                updated: '1d',
                excerpt: 'Purpose, login, sidebar modules, and navigation.',
                category: 'Getting Started',
            },
            {
                slug: 'roles-permissions',
                title: 'Roles & Permissions',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Super Admin vs Admin, access levels, security.',
                category: 'Getting Started',
            },
            {
                slug: 'first-time-setup',
                title: 'First-Time Setup Checklist',
                type: 'Checklist',
                status: 'Stable',
                updated: '1d',
                excerpt:
                    'Verify login, email, mobile, review data, logout safely.',
                category: 'Getting Started',
            },
            // User & Account Management
            {
                slug: 'managing-users',
                title: 'Managing Users',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'View, search, activate/deactivate accounts.',
                category: 'User & Account Management',
            },
            {
                slug: 'managing-helpers',
                title: 'Managing Helpers',
                type: 'Guide',
                status: 'Stable',
                updated: '1d',
                excerpt:
                    'Verify details, status, device, location, Verified badge.',
                category: 'User & Account Management',
            },
            {
                slug: 'managing-clients',
                title: 'Managing Clients',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt:
                    'Add Clients, review profiles, edit details, view history.',
                category: 'User & Account Management',
            },
            // Services & Documentation
            {
                slug: 'managing-services',
                title: 'Managing Services',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt:
                    'Add services, set rates, edit/remove, understand categories.',
                category: 'Services & Documentation',
            },
            {
                slug: 'managing-documents',
                title: 'Managing Documents',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt:
                    'Upload, approve documents, Active vs Inactive status.',
                category: 'Services & Documentation',
            },
            {
                slug: 'helper-verification-and-document-review',
                title: 'Helper Verification and Document Review',
                type: 'Guide',
                status: 'Stable',
                updated: '1d',
                excerpt:
                    'Verify helper identity and documents to keep jobs compliant and safe.',
                category: 'Services & Documentation',
            },
            // Jobs & Payments
            {
                slug: 'managing-jobs',
                title: 'Managing Jobs',
                type: 'Guide',
                status: 'Stable',
                updated: '1d',
                excerpt:
                    'Job lifecycle, add manually, track status, handle disputes.',
                category: 'Jobs & Payments',
            },
            {
                slug: 'managing-payments',
                title: 'Managing Payments',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt:
                    'Payment stages, approve/reject, search, batch payments.',
                category: 'Jobs & Payments',
            },
            {
                slug: 'invoices',
                title: 'Invoices',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt:
                    'Generation, tabs, job/invoice numbers, overdue tracking.',
                category: 'Jobs & Payments',
            },
            // Operations & Support
            {
                slug: 'payment-methods',
                title: 'Payment Methods',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt:
                    'View, add, edit payment methods, Active vs Inactive status.',
                category: 'Operations & Support',
            },
            {
                slug: 'ticket-management',
                title: 'Ticket Management',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt: 'View, filter, update, resolve tickets, add remarks.',
                category: 'Operations & Support',
            },
            // Best Practices & Troubleshooting
            {
                slug: 'admin-best-practices',
                title: 'Admin Best Practices',
                type: 'Guide',
                status: 'Stable',
                updated: '1w',
                excerpt:
                    'Keep records clean, verify documents, check invoices.',
                category: 'Best Practices & Troubleshooting',
            },
            {
                slug: 'troubleshooting-common',
                title: 'Troubleshooting Common Issues',
                type: 'FAQ',
                status: 'Stable',
                updated: '3d',
                excerpt:
                    'Payments not updating, Helper visibility, Job allocation.',
                category: 'Best Practices & Troubleshooting',
            },
            // Reference Materials
            {
                slug: 'status-color-reference',
                title: 'Status Color Reference',
                type: 'Guide',
                status: 'Stable',
                updated: '1w',
                excerpt:
                    'Active (Green), Inactive (Red), Pending (Yellow), Disputed (Orange).',
                category: 'Reference Materials',
            },
            {
                slug: 'common-admin-terms',
                title: 'Common Admin Terms',
                type: 'Guide',
                status: 'Stable',
                updated: '5d',
                excerpt: 'Helper, Client, Service Code, ABN, UOM definitions.',
                category: 'Reference Materials',
            },
        ],
        clients: [
            // Getting Started
            {
                slug: 'register-login',
                title: 'Register & Log in',
                type: 'Guide',
                status: 'Stable',
                updated: '1d',
                excerpt: 'Create account and sign in to the app.',
                category: 'Getting Started',
            },
            {
                slug: 'verify-email-phone',
                title: 'Verify email & phone',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Complete verification for account security.',
                category: 'Getting Started',
            },
            {
                slug: 'add-address',
                title: 'Adding address & location',
                type: 'Guide',
                status: 'Stable',
                updated: '1d',
                excerpt: 'Set up your service locations.',
                category: 'Getting Started',
            },
            // Posting Jobs
            {
                slug: 'post-job',
                title: 'Post a new job',
                type: 'Guide',
                status: 'Stable',
                updated: '1d',
                excerpt: 'Pick service, time, and address.',
                category: 'Posting Jobs',
            },
            {
                slug: 'choose-service',
                title: 'Choosing a service type',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Select the right service for your needs.',
                category: 'Posting Jobs',
            },
            {
                slug: 'schedule-time',
                title: 'Scheduling date & time',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Set preferred dates and times.',
                category: 'Posting Jobs',
            },
            {
                slug: 'estimate-price',
                title: 'Estimating price',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Understand pricing for your job.',
                category: 'Posting Jobs',
            },
            {
                slug: 'add-job-notes',
                title: 'Adding job notes',
                type: 'Guide',
                status: 'Stable',
                updated: '4d',
                excerpt: 'Provide special instructions and details.',
                category: 'Posting Jobs',
            },
            // Tracking Jobs
            {
                slug: 'assigned-helper',
                title: 'Assigned Helper details',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'View your Helper profile and ratings.',
                category: 'Tracking Jobs',
            },
            {
                slug: 'track-helpi',
                title: 'Track your Helpi on map',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Live ETA and status.',
                category: 'Tracking Jobs',
            },
            {
                slug: 'eta-updates',
                title: 'ETA & progress updates',
                type: 'Guide',
                status: 'Stable',
                updated: '1d',
                excerpt: 'Stay informed about job progress.',
                category: 'Tracking Jobs',
            },
            {
                slug: 'chat-helper',
                title: 'Communication with Helper',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Use the chat module to communicate.',
                category: 'Tracking Jobs',
            },
            // Payments & Invoices
            {
                slug: 'add-payment-method',
                title: 'Adding payment method',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Link cards and payment methods.',
                category: 'Payments & Invoices',
            },
            {
                slug: 'pre-authorization',
                title: 'Pre-authorization & holds',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Understanding payment holds.',
                category: 'Payments & Invoices',
            },
            {
                slug: 'pay-invoice',
                title: 'Pay & get invoice',
                type: 'FAQ',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Card on file, receipts, refunds.',
                category: 'Payments & Invoices',
            },
            {
                slug: 'download-invoices',
                title: 'Downloading invoices',
                type: 'Guide',
                status: 'Stable',
                updated: '4d',
                excerpt: 'Access and download your invoices.',
                category: 'Payments & Invoices',
            },
            // Reviews & History
            {
                slug: 'rate-helpi',
                title: 'Rate your Helpi',
                type: 'Guide',
                status: 'Stable',
                updated: '5d',
                excerpt: 'Stars, comments, edit window.',
                category: 'Reviews & History',
            },
            {
                slug: 'edit-review',
                title: 'Editing or updating reviews',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Modify your previous reviews.',
                category: 'Reviews & History',
            },
            {
                slug: 'view-past-jobs',
                title: 'Viewing past jobs',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Access your job history.',
                category: 'Reviews & History',
            },
            {
                slug: 'rebook-history',
                title: 'Re-booking from history',
                type: 'Guide',
                status: 'Stable',
                updated: '4d',
                excerpt: 'Quickly rebook previous services.',
                category: 'Reviews & History',
            },
            // Profile & Settings
            {
                slug: 'update-contact',
                title: 'Updating contact info',
                type: 'Guide',
                status: 'Stable',
                updated: '1d',
                excerpt: 'Keep your contact details current.',
                category: 'Profile & Settings',
            },
            {
                slug: 'manage-cards',
                title: 'Managing cards & billing',
                type: 'Guide',
                status: 'Stable',
                updated: '3d',
                excerpt: 'Update payment methods.',
                category: 'Profile & Settings',
            },
            {
                slug: 'notification-preferences',
                title: 'Notification preferences',
                type: 'Guide',
                status: 'Stable',
                updated: '2d',
                excerpt: 'Customize your notification settings.',
                category: 'Profile & Settings',
            },
        ],
    },
};

// Article detail content
export interface ArticleDetail {
    slug: string;
    title: string;
    excerpt: string;
    type: ArticleType;
    status: ArticleStatus;
    updated: string;
    role: UserRole;
    toc: Array<{ id: string; label: string }>;
    content: Array<{
        id: string;
        title: string;
        content: string | React.ReactNode;
    }>;
    callouts?: Array<{
        tone: 'info' | 'warning';
        title: string;
        content: string;
    }>;
    troubleshooting?: string[];
}

export const ARTICLE_DETAILS: Record<string, Partial<ArticleDetail>> = {
    'helpers-welcome-to-helpi': {
        role: 'helpers',
        slug: 'welcome-to-helpi',
        toc: [
            { id: 'purpose', label: 'Purpose' },
            { id: 'overview', label: 'Platform Overview' },
            { id: 'helpi-app', label: 'Helpi App (Helper Mobile App)' },
            { id: 'client-app', label: 'Client App' },
            { id: 'admin-dashboard', label: 'Admin Dashboard' },
            { id: 'how-it-works', label: 'How It All Works Together' },
            { id: 'getting-started', label: 'Getting Started' },
        ],
        content: [
            {
                id: 'purpose',
                title: 'Purpose',
                content:
                    'Welcome to Helpi! This guide provides an overview of the Helpi platform ecosystem — a three-sided marketplace connecting Clients who need services with Helpers who provide them, all managed through a central Admin Dashboard. Understanding how these three components work together will help you navigate your journey as a Helper on the platform.',
            },
            {
                id: 'overview',
                title: 'Platform Overview',
                content:
                    'Helpi is a gig economy platform designed for on-demand service work. The platform consists of three main applications: The Helpi App (mobile app for Helpers like you), The Client App (mobile app for Clients requesting services), and The Admin Dashboard (web application for platform administrators). All three work together to create a seamless experience from job posting to completion and payment.',
            },
            {
                id: 'helpi-app',
                title: 'Helpi App (Helper Mobile App)',
                content:
                    'The Helpi App is your mobile companion for accepting and completing jobs. Key features include: Job Notifications — receive real-time alerts when jobs are available in your area, Job Browser — view available jobs, filter by service type, location, and pay rate, Navigation & Maps — built-in GPS navigation to job locations with geofence check-in and check-out, Job Management — accept jobs, track your work, and submit completion proofs (photos, notes), Payment Tracking — view your earnings, payment history, and payout schedule, Profile Management — update your details, documents, and work preferences. The app is available for both iOS and Android devices.',
            },
            {
                id: 'client-app',
                title: 'Client App',
                content:
                    'Clients use the Client App to request services. What you need to know: Clients post jobs through their app, selecting service type, location, date, and time, Once you accept a job, Clients can track your arrival in real-time on their app, Clients receive notifications when you check in, complete work, and submit proofs, After job completion, Clients rate and pay through the app. As a Helper, you interact with Clients primarily through the in-app chat feature and during the job itself.',
            },
            {
                id: 'admin-dashboard',
                title: 'Admin Dashboard',
                content:
                    'The Admin Dashboard is a web-based tool used by Helpi administrators to manage the platform. Admins handle: Job Assignment — matching jobs to available Helpers based on location and skills, Verification — reviewing and approving Helper documents (ID, ABN, Police Check), Payment Processing — approving and processing Helper payouts, Quality Assurance — monitoring job quality, resolving disputes, and managing Client-Helper relationships, Platform Operations — managing services, rates, and overall platform health. While you do not access the dashboard directly, Admins use it to support you throughout your work on Helpi.',
            },
            {
                id: 'how-it-works',
                title: 'How It All Works Together',
                content:
                    'Step 1: Client posts a job through the Client App, selecting service type, location, and time. Step 2: Admin reviews the job in the Dashboard and assigns it to you (or you see it in your Helpi App and accept it). Step 3: You receive a notification in your Helpi App, accept the job, and navigate to the location. Step 4: You check in using geofence technology when you arrive at the job site. Step 5: You complete the work and submit proof (photos, notes) through your Helpi App. Step 6: Client reviews the completion and rates you through their Client App. Step 7: Admin verifies completion in the Dashboard and processes your payment. Step 8: Payment appears in your Helpi App earnings within the payment schedule. This workflow ensures accountability, safety, and timely payments for all parties.',
            },
            {
                id: 'getting-started',
                title: 'Getting Started',
                content:
                    'To begin working on Helpi: Download the Helpi App from the App Store (iOS) or Google Play Store (Android), Create your account using your phone number (OTP verification), Complete your profile with personal details, work preferences, and location, Upload required documents: Photo ID, ABN Certificate, National Police Check, Insurance Certificate, Wait for Admin approval (typically within 24 hours), Once verified, you will start receiving job notifications. The more complete and accurate your profile, the more jobs you will be eligible for. Keep your documents current and your availability updated to maximize your opportunities.',
            },
        ],
        callouts: [
            {
                tone: 'info',
                title: 'Tip: Stay Active',
                content:
                    'Keep your Helpi App notifications enabled and your location services active to receive job opportunities in your area.',
            },
            {
                tone: 'warning',
                title: 'Important: Document Verification',
                content:
                    'All documents must be verified by Admins before you can accept jobs. Ensure your documents are clear, current, and match your profile information.',
            },
        ],
        troubleshooting: [
            "Haven't received any jobs? Check that your profile is complete and documents are approved, verify your location settings are enabled, and ensure you're within an active service area.",
            'Account not verified? Contact support through the app if verification takes longer than 48 hours — your documents may need review.',
            "Can't see available jobs? Ensure your app is updated to the latest version and check your notification permissions.",
            'Payment questions? View your earnings in the Helpi App under Payments, or contact Admin support for payout inquiries.',
        ],
    },
    'helpers-accept-checkin': {
        role: 'helpers',
        slug: 'accept-checkin',
        toc: [
            { id: 'preface', label: 'Before you start' },
            { id: 'step1', label: 'Open the app' },
            { id: 'step2', label: 'Accept job' },
            { id: 'step3', label: 'Check in (geofence)' },
            { id: 'step4', label: 'Complete & rate' },
            { id: 'troubleshoot', label: 'Troubleshooting' },
        ],
        content: [
            {
                id: 'preface',
                title: 'Before you start',
                content:
                    'Ensure location and notifications are enabled in Settings.',
            },
            {
                id: 'step1',
                title: 'Open the app',
                content: 'Go to Jobs → New. Tap a job card to view details.',
            },
            {
                id: 'step2',
                title: 'Accept job',
                content:
                    'Tap Accept. The job screen shows a map with ETA and address.',
            },
            {
                id: 'step3',
                title: 'Check in (geofence)',
                content:
                    "Tap Check In when you're within ~50m of client coordinates.",
            },
            {
                id: 'step4',
                title: 'Complete & rate',
                content:
                    'Tap Complete Job, add notes/photos if required, then rate the client.',
            },
        ],
        callouts: [
            {
                tone: 'info',
                title: 'Tip: Faster check-ins',
                content:
                    'Keep GPS on High accuracy and Wi‑Fi scanning enabled for better geofence locks.',
            },
            {
                tone: 'warning',
                title: 'Heads up: Proof photos',
                content:
                    "Some jobs require before/after photos. You'll see a prompt before completion.",
            },
        ],
        troubleshooting: [
            "Didn't receive push? Reopen the app; ensure notifications are allowed.",
            "Can't check in? Verify GPS is High accuracy and you're inside the fence.",
            'Payment missing? It may take up to 24h after job approval.',
        ],
    },
    'admins-admin-dashboard-overview': {
        role: 'admins',
        slug: 'admin-dashboard-overview',
        toc: [
            { id: 'purpose', label: 'Purpose' },
            { id: 'when-to-use', label: 'When to Use' },
            { id: 'before-start', label: 'Before You Start' },
            { id: 'dashboard', label: 'Dashboard (Home Overview)' },
            { id: 'users', label: 'Users Module' },
            { id: 'services', label: 'Services Module' },
            { id: 'documents', label: 'Documents Module' },
            { id: 'helpers', label: 'Helpers Module' },
            { id: 'clients', label: 'Clients Module' },
            { id: 'jobs', label: 'Jobs Module' },
            { id: 'payments', label: 'Payments Module' },
            { id: 'invoices', label: 'Invoices Module' },
            { id: 'payment-methods', label: 'Payment Methods' },
            { id: 'tickets', label: 'Ticket Management' },
            { id: 'reports', label: 'Reports' },
            { id: 'settings', label: 'System Settings' },
            { id: 'logout', label: 'Logout & Security' },
            { id: 'troubleshoot', label: 'Troubleshooting' },
            { id: 'best-practices', label: 'Tips & Best Practices' },
        ],
        content: [
            {
                id: 'purpose',
                title: 'Purpose',
                content:
                    'This article provides a full overview of the Helpi Admin Dashboard — your central command centre for managing Clients, Helpers, Jobs, Payments, Invoices, Services, and Support Tickets. It is designed for Admins and Super Admins responsible for day-to-day platform operations, financial reconciliation, and quality assurance. The dashboard gives a 360-degree view of all platform activity, allowing Admins to track users, control workflows, and ensure compliance across all modules.',
            },
            {
                id: 'when-to-use',
                title: 'When to Use This Guide',
                content:
                    'Use this guide when: You are a new Admin learning the Helpi Dashboard, You need to understand the purpose of each sidebar module, You are auditing or verifying data across multiple sections, You are preparing internal documentation or training new staff.',
            },
            {
                id: 'before-start',
                title: 'Before You Start',
                content:
                    "Ensure you have: Admin credentials (username & password), Verified two-factor authentication (if enabled), Appropriate role permissions — some sections like Payments or Tickets may be restricted, Stable internet access and an updated browser (Chrome or Edge recommended). Always log in through your organisation's secure Helpi link.",
            },
            {
                id: 'dashboard',
                title: 'Dashboard (Home Overview)',
                content:
                    'The Dashboard is your landing page after login. It provides quick system-wide insights such as: Total Jobs (Unallocated, In Progress, Completed), Number of Active Helpers and Clients, Pending or Overdue Payments, Ticket Summary (Open vs Resolved), Quick links to key modules (Jobs, Payments, Invoices). Check the dashboard every morning to: Spot unallocated jobs needing assignment, Review overdue invoices, Monitor dispute and ticket volume, Track active Helper availability by region.',
            },
            {
                id: 'users',
                title: 'Users Module',
                content:
                    "The Users section lists all registered individuals — Admins, Helpers, and Clients — linked to the Helpi ecosystem. Key columns include: Email (login and contact address), Mobile (verified phone number), Role (Admin, Helper, or Client), Status (Active / Inactive), Created Date (registration timestamp). Admin actions: Search users by name or email, View and edit user information, Deactivate or reactivate accounts, Check roles to prevent access errors. Only Super Admins can modify another Admin's role or permissions.",
            },
            {
                id: 'services',
                title: 'Services Module',
                content:
                    'Defines all the job types available on the Helpi platform. You can: Add New Services — define job category, description, Helper/Client rates, and minimum hours, Edit Existing Services — update pricing, scope, or UOM (Unit of Measure), Deactivate Services — remove outdated categories without deleting records. Best practice: Use consistent naming (e.g., "Moving Work – 2hr Minimum"), Verify Helper and Client rates with the Finance team monthly, Keep the Active toggle on only for current offerings.',
            },
            {
                id: 'documents',
                title: 'Documents Module',
                content:
                    'Central repository for Helper and Client verification files. Admins use this to verify compliance and safety before allowing work assignments. Tabs: Pending (new or unreviewed documents), Active (approved and current), Inactive (rejected or outdated), Expired (documents past validity date). Admin actions: View file type and expiry date, Approve or reject uploads, Leave remarks explaining the decision, Trigger reminders for renewals. Common document types: Photo ID (Driver Licence, Passport), ABN Certificate, Police Check (national), Insurance Certificates. Always verify ABN names and document clarity before activation.',
            },
            {
                id: 'helpers',
                title: 'Helpers (Helpies) Module',
                content:
                    'Lists all approved and pending Helpers in the system. Columns include: Helper Name (full legal name), Device ID (unique identifier from their mobile), OS (Android or iOS), Gender (optional field), Suburb / City (work location), Status (Pending, Active, Verified, Suspended). Key admin tasks: Verify Helper status before job assignment, Check their device info for app troubleshooting, Review job history and performance, Suspend Helpers with repeated disputes. Use filters to quickly view only Pending Helpers needing document verification.',
            },
            {
                id: 'clients',
                title: 'Clients Module',
                content:
                    "Manages all Client records — both individual users and organisations. Columns include: Mobile (Client's registered number), Business Name (organisation name), Type (Individual or Organisation), Contact Name (first and last name), Email (used for login and communication), Suburb (primary job location). Admin actions: Add new Clients manually, Update contact details or business name, Deactivate inactive or duplicate records, Review linked job and payment history. Never delete Clients; mark them Inactive instead to preserve historical job data.",
            },
            {
                id: 'jobs',
                title: 'Jobs Module',
                content:
                    'The operational centre of Helpi — every task created, assigned, and completed is recorded here. Tabs: Unallocated (jobs awaiting Helper assignment), Allocated (assigned and notified to Helper), In Progress (Helper has checked in and started), Completed (job finished and pending payment), Disputed (flagged by Client or Helper), Closed (finalised and archived). Admin actions: Create new jobs (Client + Service required), Assign Helpers based on location, Monitor ongoing job progress, Resolve disputes and close jobs. Always verify Helper distance (geo-match radius) before assignment.',
            },
            {
                id: 'payments',
                title: 'Payments Module',
                content:
                    'Handles all Helper payout transactions and approvals. Tabs: Pending (awaiting Admin approval), Processing (approved but in transfer queue), Completed (successfully paid), Disputed (under review), Cancelled (voided or duplicate entries). Admin actions: Approve or reject payments, Reconcile totals with the Finance team, Track disputes and update remarks, Export payment data for accounting. Once marked Completed, payments cannot be reversed without Super Admin intervention.',
            },
            {
                id: 'invoices',
                title: 'Invoices Module',
                content:
                    'Synchronised with Payments to track all Client billing. Tabs: Due (awaiting payment from Client), Overdue (past due date), Paid (fully settled), Disputed (in question), Cancelled (voided or refunded). Admin tasks: Mark invoices as Paid, Adjust Client Amount or Due Date, Add remarks for audit records, Export monthly invoice reports.',
            },
            {
                id: 'payment-methods',
                title: 'Payment Methods',
                content:
                    'Lists available payout channels for Helpers (e.g., bank transfer, Stripe). Admin tasks: Add or remove payment methods, Toggle Active/Inactive status, Verify payout accuracy and compliance, Cross-check Helpers have at least one active payment method. Check all payment methods before batch payouts to prevent transaction errors.',
            },
            {
                id: 'tickets',
                title: 'Ticket Management',
                content:
                    'Support and issue-resolution hub. Tracks system or user-reported problems across the Helpi network. Columns include: Ticket Number (unique reference), User Type (Helper or Client), Issue Date / Type (when and what type of issue), Resolved By (assigned Admin), Remarks (notes explaining resolution), Status (Pending / Resolved / Escalated / Closed). Best practice: Review open tickets daily, Escalate security or payment-related issues immediately, Close resolved tickets within 48 hours, Maintain clear, dated remarks.',
            },
            {
                id: 'reports',
                title: 'Reports',
                content:
                    'Generates analytics for Admins and leadership: Total Jobs Completed by Week or Region, Helper Performance Metrics, Client Volume Reports, Payment and Revenue Summaries. Use exports for board meetings, client billing audits, or monthly reconciliation.',
            },
            {
                id: 'settings',
                title: 'System Settings',
                content:
                    'Configure global rules and visibility settings: Role management (Admin, Super Admin, Finance, Support), Default job distance radius, Notification templates and system alerts, API or third-party integrations (Stripe, Twilio). Only accessible to Super Admins.',
            },
            {
                id: 'logout',
                title: 'Logout & Security',
                content:
                    'To log out safely: Click your profile icon (top-right), Select Logout, Always close your browser window after logging out from a shared device. Security tips: Never share your login credentials, Change your password every 90 days, Use secure Wi-Fi when accessing the dashboard, If you suspect unauthorised access, contact the Super Admin immediately.',
            },
        ],
        callouts: [
            {
                tone: 'info',
                title: 'Tip: Morning Dashboard Check',
                content:
                    'Check the dashboard every morning to spot unallocated jobs needing assignment, review overdue invoices, and monitor dispute and ticket volume.',
            },
            {
                tone: 'warning',
                title: 'Important: Data Preservation',
                content:
                    'Never delete Clients or Users; mark them Inactive instead to preserve historical job data.',
            },
        ],
        troubleshooting: [
            'Missing module or page? Insufficient permissions — request access from Super Admin.',
            'Data not updating? Browser cache — refresh or clear cache.',
            'Unauthorized error? Session expired — log out and back in.',
            'Slow loading dashboard? Too many open tabs — close others, check network.',
            'Payment or job sync delays? API latency — wait a few minutes, refresh module.',
        ],
    },
    'admins-managing-jobs': {
        role: 'admins',
        slug: 'managing-jobs',
        toc: [
            { id: 'purpose', label: 'Purpose' },
            { id: 'when-to-use', label: 'When to Use' },
            { id: 'before-start', label: 'Before You Start' },
            { id: 'navigating', label: 'Navigating to Jobs' },
            { id: 'lifecycle', label: 'Understanding Job Lifecycle' },
            { id: 'creating', label: 'Creating a New Job' },
            { id: 'allocating', label: 'Allocating a Job to a Helper' },
            { id: 'monitoring', label: 'Monitoring Active Jobs' },
            { id: 'completing', label: 'Completing Jobs' },
            { id: 'disputes', label: 'Handling Disputed Jobs' },
            { id: 'closing', label: 'Closing Jobs' },
            { id: 'troubleshoot', label: 'Troubleshooting' },
            { id: 'best-practices', label: 'Tips & Best Practices' },
        ],
        content: [
            {
                id: 'purpose',
                title: 'Purpose',
                content:
                    'This guide teaches Admins how to create, track, and manage jobs from start to finish in the Helpi Admin Dashboard. Jobs are the core activity unit in Helpi — they connect Clients (who post tasks) with Helpers (who perform the work). As an Admin, your job is to ensure that every job record moves smoothly through its lifecycle, from posting to completion or dispute resolution.',
            },
            {
                id: 'when-to-use',
                title: 'When to Use This Guide',
                content:
                    'Use this guide when: Creating a new job for a Client, Assigning or reallocating jobs to Helpers, Monitoring live or ongoing jobs, Resolving disputes or closing completed tasks.',
            },
            {
                id: 'before-start',
                title: 'Before You Start',
                content:
                    'Before managing jobs, make sure: You are logged into the Helpi Admin Dashboard, The Client and Helper accounts are verified and active, The Service associated with the job already exists in the Services tab, Your role permissions include access to Jobs, Payments, and Invoices.',
            },
            {
                id: 'navigating',
                title: 'Navigating to the Jobs Section',
                content:
                    "From the left sidebar, click Jobs. You'll see a list of all jobs in the system, organised into tabs: Unallocated, Allocated, In Progress, Completed, Disputed, Closed. Use the Search bar at the top to find jobs by: Job Number, Client Name, Helper Name, Status. Each job record displays key details like: Job Number, Client Business Name, Service Name and Code, Date, Time, and Location, Job Amount, Helper Name (if assigned), Status Badge.",
            },
            {
                id: 'lifecycle',
                title: 'Understanding the Job Lifecycle',
                content:
                    'Every job in Helpi moves through six possible stages: Unallocated (job created but not yet assigned to a Helper), Allocated (Helper assigned and notified), In Progress (Helper checked in and started work), Completed (Helper marked the job complete in the app), Disputed (Client or Helper reported a problem), Closed (job reviewed, paid, and archived). Jobs that stall in Unallocated or Disputed status affect revenue flow — check these tabs daily.',
            },
            {
                id: 'creating',
                title: 'Creating a New Job',
                content:
                    'Click Add Job in the top-right corner. Fill out the required fields: Client Business Name (select existing Client), Service Name / Code (select from dropdown), Job Date & Time, Job Location (address or coordinates), Job Amount ($ value payable to Helper). Click Save to create the job. The job appears instantly under the Unallocated tab. The Client and Service must exist before creating a job — if either is missing, the system will reject the entry.',
            },
            {
                id: 'allocating',
                title: 'Allocating a Job to a Helper',
                content:
                    'Go to the Unallocated tab. Click the Job Number to open job details. Click Assign Helper. Search for an available Helper near the job location. Review Helper status (Verified, Active, etc.). Click Assign Job. Once assigned: Job status changes to Allocated, The Helper receives a notification on their mobile app. Assign Helpers who are within 5–10 km of the Client location for faster acceptance.',
            },
            {
                id: 'monitoring',
                title: 'Monitoring Active Jobs',
                content:
                    'Switch to the In Progress tab. You will see real-time updates like: Check-in Time, Helper Coordinates (geo-tracking), Job Duration, Status Badge (Active, Delayed, or Paused). Use this to monitor field activity and verify Helper attendance. Cross-check coordinates to ensure Helpers are actually on-site.',
            },
            {
                id: 'completing',
                title: 'Completing Jobs',
                content:
                    'Jobs move to Completed automatically when: The Helper marks the job as complete in the app, and The geofence validates their check-out at the Client location. Admins can manually mark completion if necessary: Open the job, Click Mark as Completed, Add remarks (e.g., "Completed manually after Helper confirmed via phone"). Once completed, the job auto-generates an Invoice and becomes visible in Payments.',
            },
            {
                id: 'disputes',
                title: 'Handling Disputed Jobs',
                content:
                    'If a Client or Helper flags an issue: The job appears under the Disputed tab, Click the job to open details, Review comments or uploaded photos, Investigate by checking chat logs, GPS, or payment data, Add resolution remarks (e.g., "Job quality confirmed, refund approved"), Update status to either Closed or Reassigned. Always close disputes within 48 hours to maintain service standards.',
            },
            {
                id: 'closing',
                title: 'Closing Jobs',
                content:
                    'After resolution: Confirm payment processed under the Payments tab, Move job status to Closed, Add closing remarks. Closed jobs remain accessible for reports and audits.',
            },
        ],
        callouts: [
            {
                tone: 'info',
                title: 'Tip: Jobs Affect Revenue Flow',
                content:
                    'Jobs that stall in Unallocated or Disputed status affect revenue flow — check these tabs daily.',
            },
            {
                tone: 'warning',
                title: 'Important: Required Fields',
                content:
                    'The Client and Service must exist before creating a job. If either is missing, the system will reject the entry.',
            },
        ],
        troubleshooting: [
            'Job not saving? Missing required field — add Client & Service before saving.',
            'Helper not receiving notification? App permissions off — ask Helper to re-enable push notifications.',
            'Job showing wrong status? Cached data — refresh or clear browser cache.',
            'Duplicate job created? Double-clicked during save — delete or mark one as Cancelled.',
            'Location mismatch? Wrong coordinates — edit and correct location manually.',
            'Job not visible? Check if it is filtered by status.',
            'Helper claims no notification? Reassign job manually.',
            'Client disputes charge? Review evidence before escalating to Super Admin.',
        ],
    },
    'admins-managing-helpers': {
        role: 'admins',
        slug: 'managing-helpers',
        toc: [
            { id: 'purpose', label: 'Purpose' },
            { id: 'when-to-use', label: 'When to Use' },
            { id: 'before-start', label: 'Before You Start' },
            { id: 'navigating', label: 'Navigating to Helpers' },
            { id: 'statuses', label: 'Understanding Helper Statuses' },
            { id: 'reviewing', label: 'Reviewing Helper Details' },
            { id: 'verifying', label: 'Verifying Helpers' },
            { id: 'rejecting', label: 'Rejecting or Holding Helpers' },
            { id: 'editing', label: 'Editing Helper Profiles' },
            { id: 'deactivating', label: 'Deactivating or Suspending' },
            { id: 'monitoring', label: 'Monitoring Helper Activity' },
            { id: 'troubleshoot', label: 'Troubleshooting' },
            { id: 'best-practices', label: 'Tips & Best Practices' },
        ],
        content: [
            {
                id: 'purpose',
                title: 'Purpose',
                content:
                    'This guide explains how Admins can view, verify, and manage Helpers (Helpies) — the independent workers who complete jobs on the Helpi platform. Proper Helper management ensures safety, compliance, and a reliable experience for Clients. Admins use this section to monitor Helper profiles, approve verification documents, and manage active or inactive statuses.',
            },
            {
                id: 'when-to-use',
                title: 'When to Use This Guide',
                content:
                    'Use this guide when: A new Helper has registered and needs document verification, You want to view or edit Helper profiles, You need to deactivate or reactivate Helpers, A Helper reports login, location, or job notification issues, You are conducting a weekly audit for compliance.',
            },
            {
                id: 'before-start',
                title: 'Before You Start',
                content:
                    'Make sure you have: Admin or Super Admin access to the Helpi Dashboard, Permission to edit or verify user data in the Helpers and Documents modules, A stable internet connection for data syncs (some Helper lists are large). Always confirm document verification (ID, ABN, Police Check) before activating a Helper — unverified profiles cannot accept jobs.',
            },
            {
                id: 'navigating',
                title: 'Navigating to the Helpers Section',
                content:
                    "From the left sidebar, click Helpers. You'll see a searchable list of all registered Helpies. Columns typically include: Helper Name (full name as per registration), Device ID (unique identifier from the Helper's phone), OS (Android or iOS), Gender (self-reported), Suburb / City (primary work area), Status (Active, Inactive, or Verified), Joined Date (registration timestamp). Use the Search bar to find Helpers by name, suburb, or device ID. Use filters to view only Active, Inactive, or Pending Verification Helpers.",
            },
            {
                id: 'statuses',
                title: 'Understanding Helper Statuses',
                content:
                    'Pending: New Helper, waiting for document verification — review documents before approval. Active: Fully verified, eligible to receive job notifications — no action required. Inactive: Temporarily blocked (document expired or issue pending) — review cause, reactivate if compliant. Suspended: Under investigation or repeated issues — escalate to Super Admin. Verified: ID, ABN, and Police Check confirmed — standard operational state. Only Active + Verified Helpers appear in job allocation lists.',
            },
            {
                id: 'reviewing',
                title: 'Reviewing Helper Details',
                content:
                    'Click a Helper\'s name to open their full profile. Review the following sections: Personal Info (Name, Email, Phone, Address, Gender), Documents (ID, ABN, Police Check, Insurance), Device Info (Device ID and OS for troubleshooting), Activity Log (record of accepted, completed, and disputed jobs). Check the Status Badge at the top right — it should read Verified before allowing work. Keep remarks short and factual (e.g., "Verified 2025-10-24 – ABN and ID confirmed").',
            },
            {
                id: 'verifying',
                title: 'Verifying Helpers',
                content:
                    'To approve a new Helper: Open the Helper profile, Click Documents tab, Review uploaded files: ID must be clear and match the name, ABN certificate must match business name, Police Check must be current and national-level, Insurance certificate must list valid coverage. Click Approve next to each document. When all required docs are approved, toggle Helper Status → Active. Once approved: A green Verified badge appears, Helper receives a push notification confirming approval.',
            },
            {
                id: 'rejecting',
                title: 'Rejecting or Holding Helpers',
                content:
                    'If a Helper fails verification: Open their profile, Click Reject beside the non-compliant document, Add a remark explaining why (e.g., "Expired ID – please upload updated version"), Leave Status → Inactive until fixed. Never mark unverified Helpers as Active — doing so can create compliance risk for paid jobs.',
            },
            {
                id: 'editing',
                title: 'Editing Helper Profiles',
                content:
                    'From the Helpers list, click the Edit icon beside a name. You can modify: Mobile Number, Suburb / City, Gender, Notes / Comments. Click Save Changes. All updates reflect instantly across linked modules (Jobs, Payments, etc.). Always re-save profiles after editing location — it updates job radius mapping for that Helper.',
            },
            {
                id: 'deactivating',
                title: 'Deactivating or Suspending a Helper',
                content:
                    'To temporarily remove a Helper: Select their record, Toggle Status → Inactive, Add a remark such as "Document expired" or "Repeated job cancellations", Click Save. For suspensions: For repeated misconduct, select Suspend Helper, Include reason in remarks (e.g., "Multiple client complaints – pending review"), Notify the Super Admin immediately.',
            },
            {
                id: 'monitoring',
                title: 'Monitoring Helper Activity',
                content:
                    'Click a Helper\'s name to open the Activity Log tab. You will see job performance stats: Jobs Accepted / Completed, Average Rating, Cancellations, Disputes Raised. Use these insights to identify top performers or patterns needing coaching. Example: "Helper completed 10 jobs this week – 100% on-time rate – no disputes."',
            },
        ],
        callouts: [
            {
                tone: 'info',
                title: 'Tip: Document Verification Required',
                content:
                    'Always confirm document verification (ID, ABN, Police Check) before activating a Helper — unverified profiles cannot accept jobs.',
            },
            {
                tone: 'warning',
                title: 'Important: Never Activate Unverified Helpers',
                content:
                    'Never mark unverified Helpers as Active. Doing so can create compliance risk for paid jobs.',
            },
        ],
        troubleshooting: [
            'Helper not receiving job notifications? App notifications disabled — ask Helper to re-enable in phone settings.',
            "Helper can't log in? Account marked Inactive — reactivate Helper in dashboard.",
            'Location not updating? GPS permission off — ask Helper to enable "Allow Always" location access.',
            'Duplicate Helper records? Registered twice with new number — keep verified record, deactivate duplicate.',
            'Helper claims payment missing? Job not yet marked Completed — confirm job status, re-check Payments tab.',
            'Helper missing from list? Check filter (Active/Inactive) or refresh page.',
            'Profile edits not saving? Likely a session timeout — re-login and retry.',
            'Unable to approve? Verify your Admin role has edit rights for verification.',
        ],
    },
    'admins-managing-payments': {
        role: 'admins',
        slug: 'managing-payments',
        toc: [
            { id: 'purpose', label: 'Purpose' },
            { id: 'when-to-use', label: 'When to Use' },
            { id: 'navigating', label: 'Navigating to Payments' },
            { id: 'columns', label: 'Understanding Columns' },
            { id: 'pending', label: 'Viewing Pending Payments' },
            { id: 'approving', label: 'Approving Payment Batch' },
            { id: 'processing', label: 'Processing Payments' },
            { id: 'completed', label: 'Completed Payments' },
            { id: 'disputed', label: 'Disputed Payments' },
            { id: 'cancelled', label: 'Cancelled Payments' },
            { id: 'checklist', label: 'Quick Approval Checklist' },
            { id: 'troubleshoot', label: 'Troubleshooting' },
        ],
        content: [
            {
                id: 'purpose',
                title: 'Purpose',
                content:
                    'This guide helps Admins manage, track, and approve Helper payments in the Payments section. Learn how to monitor payment statuses, handle disputes, and ensure Helpers are paid correctly and on time.',
            },
            {
                id: 'when-to-use',
                title: 'When to Use This Guide',
                content:
                    'Use this guide to: View or filter payments by status, Approve or cancel payments, Track Helper earnings against job data, Handle payment disputes or errors.',
            },
            {
                id: 'navigating',
                title: 'Navigating to the Payments Section',
                content:
                    "From the sidebar, click Payments. You'll see tabs: Pending, Processing, Completed, Disputed, Cancelled. Each tab filters the table below. Use Search bar to find Job Number, Payment No., or Helper Name.",
            },
            {
                id: 'columns',
                title: 'Understanding the Payment Columns',
                content:
                    'Columns include: Job Number (clickable for details), Payment No. (unique reference), Job Date (completion date), Helper Name & Code, Service Name & Code.',
            },
            {
                id: 'pending',
                title: 'Viewing Pending Payments',
                content:
                    'Click Pending tab. Each row shows: Helper Code, Service Name/Code, Helper Amount, Paid Date (blank if not approved), Payment Methods, Payment Status (yellow Pending tag). Review all amounts before approving.',
            },
            {
                id: 'approving',
                title: 'Approving a Payment Batch',
                content:
                    'Tick checkbox beside each payment to approve. Top-right shows Selected count and Total Amount. Verify total matches finance records. Click Approve button (purple). Payments move to Processing tab automatically.',
            },
            {
                id: 'processing',
                title: 'Processing Payments',
                content:
                    "Processing tab shows approved payments being sent to Helper's payment method. Payment Status shows Processing. Monitor totals and cross-check with Stripe or payment gateway logs. Avoid edits at this stage.",
            },
            {
                id: 'completed',
                title: 'Completed Payments',
                content:
                    'When payment succeeds, it moves to Completed tab. Job Number, Helper Name, and Amount confirmed. Payment Status marked Completed (green). Paid Date populated automatically. Reconcile records weekly.',
            },
            {
                id: 'disputed',
                title: 'Disputed Payments',
                content:
                    'Challenged payments appear under Disputed tab. Click Job Number to view details. Review remarks and evidence. Contact Helper if needed. Update resolution notes and move to Completed or Cancelled.',
            },
            {
                id: 'cancelled',
                title: 'Cancelled Payments',
                content:
                    'Failed, duplicated, or manually voided payments appear here. Reasons: Wrong Helper assigned, Duplicate entry, Job cancelled/refunded. Select payment, click Cancel, enter remarks explaining reason.',
            },
        ],
        callouts: [
            {
                tone: 'info',
                title: 'Tip: Verify Totals',
                content:
                    'Always verify the total before clicking Approve — once processed, approvals can only be reversed by a Super Admin.',
            },
            {
                tone: 'warning',
                title: 'Important: Verification Required',
                content:
                    'Only verified Helpers with valid documents and payment methods should be approved.',
            },
        ],
        troubleshooting: [
            'Payment not appearing in Pending? Job not marked Completed — ask Helper to complete job in app.',
            'Helper not receiving payment? Wrong or inactive payment method — verify in Helper profile.',
            'Payment stuck on Processing? Gateway delay or API timeout — check Stripe dashboard and refresh.',
            'Duplicate payment entry? Job ID reused accidentally — cancel one and add remarks.',
            'Status not updating? Browser cache or network issue — refresh or clear browser cache.',
        ],
    },
    'admins-invoices': {
        role: 'admins',
        slug: 'invoices',
        toc: [
            { id: 'purpose', label: 'Purpose' },
            { id: 'when-to-use', label: 'When to Use' },
            { id: 'navigating', label: 'Navigating to Invoices' },
            { id: 'columns', label: 'Understanding Columns' },
            { id: 'due-tab', label: 'Due Tab' },
            { id: 'overdue-tab', label: 'Overdue Tab' },
            { id: 'paid-tab', label: 'Paid Tab' },
            { id: 'disputed-tab', label: 'Disputed Tab' },
            { id: 'cancelled-tab', label: 'Cancelled Tab' },
            { id: 'marking-paid', label: 'Marking Invoice as Paid' },
            { id: 'editing', label: 'Editing Amounts or Dates' },
            { id: 'reviewing', label: 'Reviewing Totals' },
            { id: 'troubleshoot', label: 'Troubleshooting' },
        ],
        content: [
            {
                id: 'purpose',
                title: 'Purpose',
                content:
                    'This guide helps Admins manage all invoices generated from completed jobs. Invoices record the financial relationship between Clients and Helpers, showing what has been billed, paid, or disputed.',
            },
            {
                id: 'when-to-use',
                title: 'When to Use This Guide',
                content:
                    'Use this when you need to: Review invoices linked to completed jobs, Monitor overdue or disputed payments, Confirm Client payment status, Cross-check totals for finance or reporting, Cancel or resolve billing errors.',
            },
            {
                id: 'navigating',
                title: 'Navigating to the Invoices Section',
                content:
                    "In the left sidebar, click Invoices. You'll see tabs: Due, Overdue, Paid, Disputed, Cancelled. Each tab filters invoices by payment status. This section syncs automatically with the Payments module.",
            },
            {
                id: 'columns',
                title: 'Understanding the Invoice Columns',
                content:
                    'Columns include: Job Number (Job ID), Invoice No. (unique reference), Job Date, Client Business Name, Service Name/Code, Client Amount (billed amount), Due Date/Paid Date, Payment Methods, Payment Status.',
            },
            {
                id: 'due-tab',
                title: 'Due Tab',
                content:
                    'Shows invoices issued but not yet paid. Each row lists Service Name, Client Amount, and Due Date. Select invoices with checkboxes, review total outstanding amount, click Paid button after confirming payment. Invoice moves to Paid tab automatically.',
            },
            {
                id: 'overdue-tab',
                title: 'Overdue Tab',
                content:
                    'Displays invoices past their Due Date. Shows Client Name, Amount, Original Due Date, Payment Status (red Overdue tag). Actions: Send reminders to Clients, Cross-check with Payments tab, Update Paid Date once received.',
            },
            {
                id: 'paid-tab',
                title: 'Paid Tab',
                content:
                    'Contains all fully paid invoices. Shows Service Name/Code, Client Amount, Paid Date, Payment Method, Payment Status: Paid (green badge). Verify these match Completed tab under Payments. Export Paid invoices monthly for reconciliation.',
            },
            {
                id: 'disputed-tab',
                title: 'Disputed Tab',
                content:
                    'Used when Client raises issue. Click Invoice No. to open details. Review remarks or dispute comments. Cross-check job data. Update invoice or issue partial refund if necessary. Once resolved, move to Paid or Cancelled.',
            },
            {
                id: 'cancelled-tab',
                title: 'Cancelled Tab',
                content:
                    'Shows invoices voided manually or system-cancelled due to job deletion or refund. Cancelled invoices remain for audit purposes — cannot be edited but can be referenced.',
            },
            {
                id: 'marking-paid',
                title: 'Marking an Invoice as Paid',
                content:
                    'Go to Due or Overdue tab. Select invoice(s). Verify total at top right (Selected count and Total Amount). Click Paid button (purple). Confirm Paid Date if prompted. Invoice appears under Paid tab.',
            },
            {
                id: 'editing',
                title: 'Editing Client Amount or Dates',
                content:
                    'Locate invoice in any tab. Click edit icon beside Client Amount or Due Date. Update values and save. All changes logged in audit trails. Only Admins with edit permissions can change financial fields.',
            },
            {
                id: 'reviewing',
                title: 'Reviewing Totals',
                content:
                    'At top of page: Selected shows how many invoices ticked, Total Amount shows combined total for all selected invoices. Helps when reconciling bulk Client payments.',
            },
        ],
        callouts: [
            {
                tone: 'info',
                title: 'Tip: Sync with Payments',
                content:
                    'This section syncs automatically with the Payments module — any job marked Completed generates a corresponding invoice here.',
            },
            {
                tone: 'warning',
                title: 'Important: Confirm Payment',
                content:
                    'Only mark an invoice as Paid after confirming the transaction in your bank or payment gateway.',
            },
        ],
        troubleshooting: [
            'Invoice missing? Job not completed yet — confirm job marked as Completed.',
            'Amount is $0? Missing rate in Service module — update Service Rate.',
            'Wrong Client showing? Client reassigned in Job — update job link or reissue invoice.',
            'Duplicate invoice? Job cloned or imported twice — cancel duplicate and mark with remarks.',
            "Can't mark Paid? Insufficient permissions — contact Super Admin.",
        ],
    },
    'admins-helper-verification-and-document-review': {
        role: 'admins',
        slug: 'helper-verification-and-document-review',
        toc: [
            { id: 'purpose', label: 'Purpose' },
            { id: 'when-to-use', label: 'When to Use' },
            { id: 'navigating', label: 'Navigating to Documents' },
            { id: 'document-types', label: 'Understanding Document Types' },
            { id: 'verification-process', label: 'Verification Process' },
            { id: 'approving', label: 'Approving Documents' },
            { id: 'rejecting', label: 'Rejecting Documents' },
            { id: 'active-inactive', label: 'Active vs Inactive Status' },
            { id: 'expiry-management', label: 'Managing Document Expiry' },
            { id: 'compliance', label: 'Compliance & Safety' },
            { id: 'best-practices', label: 'Best Practices' },
            { id: 'troubleshoot', label: 'Troubleshooting' },
        ],
        content: [
            {
                id: 'purpose',
                title: 'Purpose',
                content:
                    'This guide teaches Admins how to verify Helper identity and review documents to ensure compliance, safety, and legal requirements. Proper document verification protects Clients, maintains Helpi standards, and ensures Helpers meet eligibility criteria.',
            },
            {
                id: 'when-to-use',
                title: 'When to Use This Guide',
                content:
                    'Use this guide when: Reviewing Helper identity documents, Verifying police checks and ABN credentials, Managing document expiry and renewals, Ensuring compliance with legal requirements, Resolving document-related disputes.',
            },
            {
                id: 'navigating',
                title: 'Navigating to Documents',
                content:
                    "From the sidebar, click Documents. You'll see tabs: Pending, Active, Inactive, Expired. Filter by Helper name or document type using the search bar. Each document shows Helper name, document type, upload date, expiry date, and verification status.",
            },
            {
                id: 'document-types',
                title: 'Understanding Document Types',
                content:
                    'Helper documents include: Photo ID (Driver License, Passport, Government ID), Police Check (National criminal history verification), ABN Certificate (Australian Business Number for tax purposes), Insurance Certificate (Coverage documentation). All documents must be current and valid.',
            },
            {
                id: 'verification-process',
                title: 'Verification Process',
                content:
                    'Step 1: Check document clarity and completeness. Step 2: Verify name matches Helper profile. Step 3: Confirm expiry date is in the future. Step 4: Cross-check with government databases if needed. Step 5: Ensure document type meets requirements. Step 6: Mark as Approved or Rejected with remarks.',
            },
            {
                id: 'approving',
                title: 'Approving Documents',
                content:
                    'Open document for review. Click Approve button (green). Add optional remarks explaining any conditions. Document status changes to Active. Helper receives notification that verification succeeded. Verified badge appears on Helper profile.',
            },
            {
                id: 'rejecting',
                title: 'Rejecting Documents',
                content:
                    'If document is: Blurry or unreadable, Expired or invalid, Wrong type for requirements, Suspected fraudulent. Click Reject button (red). Enter detailed rejection remarks explaining the issue. Helper receives notification with next steps. Document appears under Inactive tab.',
            },
            {
                id: 'active-inactive',
                title: 'Active vs Inactive Status',
                content:
                    'Active documents: Current, valid, and approved. Helper can accept jobs. Inactive documents: Rejected, expired, or pending review. Helper cannot accept jobs until document is Active. Monitor Active tab daily to catch upcoming expiries.',
            },
            {
                id: 'expiry-management',
                title: 'Managing Document Expiry',
                content:
                    'Expired documents automatically move to Expired tab. Helper status changes to Inactive. Send renewal reminder via email or in-app notification. Once new document uploaded, review and approve promptly. Helper returns to Active status.',
            },
            {
                id: 'compliance',
                title: 'Compliance & Safety',
                content:
                    'Compliance requirements: Verify all documents before first job allocation, Ensure Police Check is national-level (not local), Confirm ABN matches Helper business name, Check Insurance covers work-related incidents. Non-compliance risks: Legal liability, Client safety concerns, Platform credibility.',
            },
        ],
        callouts: [
            {
                tone: 'info',
                title: 'Tip: Set Reminders',
                content:
                    'Set calendar reminders 30 days before document expiry to proactively reach out to Helpers for renewal.',
            },
            {
                tone: 'warning',
                title: 'Important: Never Skip Verification',
                content:
                    'Always verify documents thoroughly. Skipping verification can lead to legal issues and compromise client safety.',
            },
        ],
        troubleshooting: [
            "Document won't upload? File size too large — ask Helper to compress or use PDF format.",
            'Helper showing as Inactive? Missing or expired document — check Documents tab and approve/renew.',
            'Duplicate documents? Helper uploaded twice — keep most recent and mark others as Inactive.',
            'Fraudulent document suspected? Contact Super Admin immediately — do not approve.',
            'Police Check not national-level? Request national verification — local checks are insufficient.',
        ],
    },
    'admins-ticket-management': {
        role: 'admins',
        slug: 'ticket-management',
        toc: [
            { id: 'purpose', label: 'Purpose' },
            { id: 'when-to-use', label: 'When to Use' },
            { id: 'before-start', label: 'Before You Start' },
            { id: 'navigating', label: 'Navigating to Ticket Management' },
            { id: 'statuses', label: 'Understanding Ticket Statuses' },
            { id: 'reviewing', label: 'Reviewing a Ticket' },
            { id: 'adding-remarks', label: 'Adding Remarks & Updating Status' },
            { id: 'escalating', label: 'Escalating Tickets' },
            { id: 'resolving', label: 'Resolving and Closing Tickets' },
            { id: 'weekly-review', label: 'Weekly Ticket Review' },
            { id: 'troubleshoot', label: 'Troubleshooting' },
            { id: 'best-practices', label: 'Tips & Best Practices' },
        ],
        content: [
            {
                id: 'purpose',
                title: 'Purpose',
                content:
                    'This guide teaches Admins how to handle tickets raised by Helpers or Clients through the Helpi Dashboard. Tickets help track issues — from payment errors to job disputes — so that every concern is logged, resolved, and auditable. Efficient ticket handling ensures quick resolutions, happy Clients, and consistent Helper performance.',
            },
            {
                id: 'when-to-use',
                title: 'When to Use This Guide',
                content:
                    "Use this guide when: A Helper or Client reports a problem through the app, A job or payment status seems incorrect, A dispute or complaint needs admin attention, You're performing weekly quality checks on unresolved tickets.",
            },
            {
                id: 'before-start',
                title: 'Before You Start',
                content:
                    'Make sure you have: Admin login access to the Helpi Dashboard, Visibility over the Ticket Management module in the left sidebar, A basic understanding of job and payment flows — since many tickets reference these modules.',
            },
            {
                id: 'navigating',
                title: 'Navigating to Ticket Management',
                content:
                    "From the left sidebar, click Ticket Management. You'll see a table with all open and historical tickets. Each row includes: Ticket Number (system-generated unique ID), User Type (Helper or Client), Issue Type (Payment, Job, App Issue, Verification), Issue Date, Resolved By, Resolved Remarks, Status (Pending, Resolved, Escalated). Filter or search by Ticket Number, User Type, or Status using the search bar.",
            },
            {
                id: 'statuses',
                title: 'Understanding Ticket Statuses',
                content:
                    'Pending: Awaiting review — assign to an Admin and start investigation. In Progress: Admin currently handling — keep notes updated. Resolved: Issue fixed — add closing remarks. Escalated: Needs Super Admin input — reassign for final approval. Closed: Archived for recordkeeping — no further action needed. Always leave remarks when changing a status for accountability.',
            },
            {
                id: 'reviewing',
                title: 'Reviewing a Ticket',
                content:
                    'Click on a Ticket Number to open its details view. Read the User Type, Issue Description, and Attachments (if any). Identify which module it relates to: Job Issue → cross-check Jobs tab, Payment/Invoice Issue → review Payments or Invoices tab, Document/Verification Issue → open Documents tab. Note down any irregularities and take screenshots if necessary.',
            },
            {
                id: 'adding-remarks',
                title: 'Adding Remarks and Updating Status',
                content:
                    'Click Add Remark. Write a short, factual summary (e.g., "Helper\'s payment reissued — incorrect ABN corrected"). Change Status to: Resolved (if issue fixed), Escalated (if waiting for Super Admin confirmation), Closed (if no further action needed). Click Save Changes. Remarks are timestamped automatically for traceability.',
            },
            {
                id: 'escalating',
                title: 'Escalating Tickets',
                content:
                    'Certain issues (like fraudulent activity, major payment disputes, or app-level bugs) need to be escalated. Open the ticket, add a detailed note summarising what you found, change Status → Escalated, select or tag the Super Admin in charge (if available), and save. The Super Admin will receive an internal alert to review and close.',
            },
            {
                id: 'resolving',
                title: 'Resolving and Closing Tickets',
                content:
                    'Double-check that the job or payment linked to the issue reflects the fix. Click Mark as Resolved. Add a final remark (e.g., "Client refunded – overpayment corrected"). After 7 days (if no further action), move to Closed. Keep remarks concise, neutral, and dated. Example: "2025-10-23: Helper refund approved – resolution confirmed by finance."',
            },
            {
                id: 'weekly-review',
                title: 'Weekly Ticket Review',
                content:
                    'Admins should: Check Pending and Escalated tabs every Friday, Ensure no ticket stays open beyond 5 business days, Export or review recurring issues (e.g., repeated job sync errors).',
            },
        ],
        callouts: [
            {
                tone: 'info',
                title: 'Tip: Accountability Matters',
                content:
                    'Always leave remarks when changing a status. It helps track accountability and provides an audit trail.',
            },
            {
                tone: 'warning',
                title: 'Important: Verify Before Closing',
                content:
                    'Always verify the fix before closing. Keep remarks concise, neutral, and dated for traceability.',
            },
        ],
        troubleshooting: [
            'Ticket not saving? Browser issue or timeout — refresh page, retry, ensure connection stable.',
            'Remarks missing? Not saved before page reload — always click "Save Changes" after editing.',
            'Duplicate ticket? User submitted twice — merge manually, mark one as Closed.',
            'Escalation stuck? Assigned Super Admin inactive — reassign or notify another Super Admin.',
            'Missing attachment? File type unsupported — request user resend as PDF or JPG.',
            "Ticket won't update? Check your permissions — only Admins with edit rights can change status.",
            'Ticket not showing up? Try searching by User Type or refresh the page.',
            'Old tickets missing? They may have been auto-archived — ask Super Admin to restore.',
        ],
    },
};
