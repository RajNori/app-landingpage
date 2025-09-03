import { PriceItem } from './schema';

export const PRICING_CITY = 'Melbourne';
export const GST_RATE = 0.1;

export const PRICE_ITEMS: PriceItem[] = [
    // Home Cleaning (HOURLY)
    {
        id: 'home_basic',
        name: 'Basic Home Cleaning',
        description:
            'Standard cleaning service for maintaining a clean and tidy home',
        unit: 'HOURLY',
        unitLabel: 'hour',
        basePriceCents: 5500, // $55.00 incl. GST
        minQty: 2,
        recommendedQty: 2,
        maxQty: 8,
        features: [
            'Dusting and wiping surfaces',
            'Vacuuming and mopping floors',
            'Bathroom cleaning',
            'Kitchen cleaning',
            'General tidying up',
        ],
        estimatedDuration: '2-3 hours',
        addons: [
            {
                id: 'oven_deep_clean',
                name: 'Oven Deep Clean',
                description:
                    'Professional oven cleaning with eco-friendly degreaser',
                priceCents: 6500, // $65.00 incl. GST
            },
            {
                id: 'appliance_package',
                name: 'Appliance Clean Package',
                description:
                    'Fridge, microwave, and dishwasher interior cleaning',
                priceCents: 5500, // $55.00 incl. GST
            },
            {
                id: 'wardrobe_organise',
                name: 'Wardrobe Organization',
                description: 'Declutter and organize bedroom wardrobes',
                priceCents: 4500, // $45.00 incl. GST
            },
            {
                id: 'outdoor_area',
                name: 'Outdoor Area Clean',
                description: 'Balcony, patio, or small outdoor space cleaning',
                priceCents: 3500, // $35.00 incl. GST
            },
            {
                id: 'laundry_fold',
                name: 'Laundry & Folding',
                description: 'Wash, dry, and fold one load of laundry',
                priceCents: 2500, // $25.00 incl. GST
            },
        ],
    },
    {
        id: 'home_standard',
        name: 'Standard Home Cleaning',
        description: 'Enhanced cleaning service with attention to detail',
        unit: 'HOURLY',
        unitLabel: 'hour',
        basePriceCents: 6000, // $60.00 incl. GST
        minQty: 2,
        recommendedQty: 2,
        maxQty: 10,
        features: [
            'All basic cleaning tasks',
            'Detailed surface cleaning',
            'Inside appliance cleaning',
            'Enhanced bathroom sanitization',
            'Kitchen deep clean',
            'Window cleaning',
        ],
        estimatedDuration: '2-4 hours',
        addons: [
            {
                id: 'oven_cleaning',
                name: 'Oven Cleaning',
                description: 'Deep clean inside oven and stovetop',
                priceCents: 6500, // $65.00 incl. GST
            },
            {
                id: 'fridge_cleaning',
                name: 'Fridge Cleaning',
                description: 'Clean inside refrigerator and freezer',
                priceCents: 3500, // $35.00 incl. GST
            },
            {
                id: 'extra_bathroom',
                name: 'Extra Bathroom',
                description: 'Additional bathroom cleaning',
                priceCents: 4000, // $40.00 incl. GST
            },
            {
                id: 'balcony_cleaning',
                name: 'Balcony Cleaning',
                description: 'Clean balcony or outdoor area',
                priceCents: 3000, // $30.00 incl. GST
            },
        ],
    },
    {
        id: 'home_deep',
        name: 'Deep Home Cleaning',
        description:
            'Comprehensive cleaning service for thorough home refreshment',
        unit: 'HOURLY',
        unitLabel: 'hour',
        basePriceCents: 7000, // $70.00 incl. GST
        minQty: 3,
        recommendedQty: 3,
        maxQty: 12,
        features: [
            'All standard cleaning tasks',
            'Inside appliances cleaning',
            'Detailed bathroom sanitization',
            'Kitchen deep clean',
            'Window cleaning',
            'Baseboard cleaning',
            'Light fixture cleaning',
        ],
        estimatedDuration: '3-5 hours',
        addons: [
            {
                id: 'oven_cleaning',
                name: 'Oven Cleaning',
                description: 'Deep clean inside oven and stovetop',
                priceCents: 6500, // $65.00 incl. GST
            },
            {
                id: 'fridge_cleaning',
                name: 'Fridge Cleaning',
                description: 'Clean inside refrigerator and freezer',
                priceCents: 3500, // $35.00 incl. GST
            },
            {
                id: 'extra_bathroom',
                name: 'Extra Bathroom',
                description: 'Additional bathroom cleaning',
                priceCents: 4000, // $40.00 incl. GST
            },
            {
                id: 'balcony_cleaning',
                name: 'Balcony Cleaning',
                description: 'Clean balcony or outdoor area',
                priceCents: 3000, // $30.00 incl. GST
            },
        ],
    },
    {
        id: 'home_deep_intensive',
        name: 'Intensive Deep Cleaning',
        description: 'Ultra-thorough cleaning for major refresh or pre-sale',
        unit: 'HOURLY',
        unitLabel: 'hour',
        basePriceCents: 8000, // $80.00 incl. GST
        minQty: 4,
        recommendedQty: 4,
        maxQty: 16,
        features: [
            'All deep cleaning tasks',
            'Wall cleaning and spot treatment',
            'Cabinet and drawer cleaning',
            'Detailed appliance cleaning',
            'Window frame cleaning',
            'Light fixture cleaning',
            'Final inspection',
        ],
        estimatedDuration: '4-6 hours',
        addons: [
            {
                id: 'oven_cleaning',
                name: 'Oven Cleaning',
                description: 'Deep clean inside oven and stovetop',
                priceCents: 6500, // $65.00 incl. GST
            },
            {
                id: 'fridge_cleaning',
                name: 'Fridge Cleaning',
                description: 'Clean inside refrigerator and freezer',
                priceCents: 3500, // $35.00 incl. GST
            },
            {
                id: 'extra_bathroom',
                name: 'Extra Bathroom',
                description: 'Additional bathroom cleaning',
                priceCents: 4000, // $40.00 incl. GST
            },
            {
                id: 'balcony_cleaning',
                name: 'Balcony Cleaning',
                description: 'Clean balcony or outdoor area',
                priceCents: 3000, // $30.00 incl. GST
            },
        ],
    },

    // End-of-Lease (FIXED by size)
    {
        id: 'eol_1br',
        name: 'End of Lease - 1 Bedroom',
        description: 'Complete cleaning service for 1 bedroom properties',
        unit: 'FIXED',
        unitLabel: 'job',
        basePriceCents: 32000, // $320.00 incl. GST
        minQty: 1,
        recommendedQty: 1,
        maxQty: 1,
        features: [
            'Complete deep cleaning',
            'Carpet cleaning',
            'Wall cleaning',
            'Cabinet and drawer cleaning',
            'Light fixture cleaning',
            'Final inspection',
        ],
        estimatedDuration: '4-6 hours',
        addons: [
            {
                id: 'carpet_per_room',
                name: 'Carpet Cleaning per Room',
                description: 'Deep carpet cleaning for additional rooms',
                priceCents: 4000, // $40.00 incl. GST
            },
            {
                id: 'windows_pack_small',
                name: 'Windows Pack (Small)',
                description: 'Window cleaning for up to 8 windows',
                priceCents: 9000, // $90.00 incl. GST
            },
            {
                id: 'oven_cleaning',
                name: 'Oven Cleaning',
                description: 'Deep clean inside oven and stovetop',
                priceCents: 6500, // $65.00 incl. GST
            },
            {
                id: 'fridge_cleaning',
                name: 'Fridge Cleaning',
                description: 'Clean inside refrigerator and freezer',
                priceCents: 3500, // $35.00 incl. GST
            },
        ],
    },
    {
        id: 'eol_2br',
        name: 'End of Lease - 2 Bedroom',
        description: 'Complete cleaning service for 2 bedroom properties',
        unit: 'FIXED',
        unitLabel: 'job',
        basePriceCents: 42000, // $420.00 incl. GST
        minQty: 1,
        recommendedQty: 1,
        maxQty: 1,
        features: [
            'Complete deep cleaning',
            'Carpet cleaning',
            'Wall cleaning',
            'Cabinet and drawer cleaning',
            'Light fixture cleaning',
            'Final inspection',
        ],
        estimatedDuration: '6-8 hours',
        addons: [
            {
                id: 'carpet_per_room',
                name: 'Carpet Cleaning per Room',
                description: 'Deep carpet cleaning for additional rooms',
                priceCents: 4000, // $40.00 incl. GST
            },
            {
                id: 'windows_pack_medium',
                name: 'Windows Pack (Medium)',
                description: 'Window cleaning for 9-15 windows',
                priceCents: 12000, // $120.00 incl. GST
            },
            {
                id: 'oven_cleaning',
                name: 'Oven Cleaning',
                description: 'Deep clean inside oven and stovetop',
                priceCents: 6500, // $65.00 incl. GST
            },
            {
                id: 'fridge_cleaning',
                name: 'Fridge Cleaning',
                description: 'Clean inside refrigerator and freezer',
                priceCents: 3500, // $35.00 incl. GST
            },
        ],
    },
    {
        id: 'eol_3br',
        name: 'End of Lease - 3 Bedroom',
        description: 'Complete cleaning service for 3 bedroom properties',
        unit: 'FIXED',
        unitLabel: 'job',
        basePriceCents: 52000, // $520.00 incl. GST
        minQty: 1,
        recommendedQty: 1,
        maxQty: 1,
        features: [
            'Complete deep cleaning',
            'Carpet cleaning',
            'Wall cleaning',
            'Cabinet and drawer cleaning',
            'Light fixture cleaning',
            'Final inspection',
        ],
        estimatedDuration: '8-10 hours',
        addons: [
            {
                id: 'carpet_per_room',
                name: 'Carpet Cleaning per Room',
                description: 'Deep carpet cleaning for additional rooms',
                priceCents: 4000, // $40.00 incl. GST
            },
            {
                id: 'windows_pack_large',
                name: 'Windows Pack (Large)',
                description: 'Window cleaning for 16+ windows',
                priceCents: 15000, // $150.00 incl. GST
            },
            {
                id: 'oven_cleaning',
                name: 'Oven Cleaning',
                description: 'Deep clean inside oven and stovetop',
                priceCents: 6500, // $65.00 incl. GST
            },
            {
                id: 'fridge_cleaning',
                name: 'Fridge Cleaning',
                description: 'Clean inside refrigerator and freezer',
                priceCents: 3500, // $35.00 incl. GST
            },
        ],
    },
    {
        id: 'eol_4br_plus',
        name: 'End of Lease - 4+ Bedroom',
        description: 'Complete cleaning service for 4+ bedroom properties',
        unit: 'FIXED',
        unitLabel: 'job',
        basePriceCents: 65000, // $650.00 incl. GST (from $650)
        minQty: 1,
        recommendedQty: 1,
        maxQty: 1,
        features: [
            'Complete deep cleaning',
            'Carpet cleaning',
            'Wall cleaning',
            'Cabinet and drawer cleaning',
            'Light fixture cleaning',
            'Final inspection',
        ],
        estimatedDuration: '10-12 hours',
        addons: [
            {
                id: 'carpet_per_room',
                name: 'Carpet Cleaning per Room',
                description: 'Deep carpet cleaning for additional rooms',
                priceCents: 4000, // $40.00 incl. GST
            },
            {
                id: 'windows_pack_large',
                name: 'Windows Pack (Large)',
                description: 'Window cleaning for 16+ windows',
                priceCents: 15000, // $150.00 incl. GST
            },
            {
                id: 'oven_cleaning',
                name: 'Oven Cleaning',
                description: 'Deep clean inside oven and stovetop',
                priceCents: 6500, // $65.00 incl. GST
            },
            {
                id: 'fridge_cleaning',
                name: 'Fridge Cleaning',
                description: 'Clean inside refrigerator and freezer',
                priceCents: 3500, // $35.00 incl. GST
            },
        ],
    },

    // Carpet Cleaning (PER_ROOM)
    {
        id: 'carpet_room',
        name: 'Carpet Cleaning per Room',
        description: 'Specialized carpet and upholstery cleaning per room',
        unit: 'PER_ROOM',
        unitLabel: 'room',
        basePriceCents: 6000, // $60.00 incl. GST
        minQty: 2,
        recommendedQty: 2,
        maxQty: 10,
        features: [
            'Deep carpet extraction',
            'Stain removal',
            'Odor elimination',
            'Protective treatment',
            'Quick drying process',
        ],
        estimatedDuration: '2-3 hours',
    },

    // Window Cleaning (PER_JOB)
    {
        id: 'windows_job',
        name: 'Window Cleaning',
        description: 'Professional window and glass cleaning service',
        unit: 'PER_JOB',
        unitLabel: 'job',
        basePriceCents: 20000, // $200.00 incl. GST minimum
        minQty: 1,
        recommendedQty: 1,
        maxQty: 1,
        features: [
            'Interior and exterior windows',
            'Glass door cleaning',
            'Mirror cleaning',
            'Window frame cleaning',
            'Screen cleaning',
            'Streak-free finish',
        ],
        estimatedDuration: '1-2 hours',
        addons: [
            {
                id: 'screen_cleaning',
                name: 'Screen & Frame Deep Clean',
                description: 'Detailed cleaning of window screens and frames',
                priceCents: 4000, // $40.00 incl. GST
            },
            {
                id: 'high_access',
                name: 'High Access Cleaning',
                description: 'Professional equipment for upper floor windows',
                priceCents: 7500, // $75.00 incl. GST
            },
            {
                id: 'pressure_wash',
                name: 'Pressure Wash Frames',
                description: 'Pressure cleaning of window frames and sills',
                priceCents: 5500, // $55.00 incl. GST
            },
            {
                id: 'glass_protection',
                name: 'Glass Protection Treatment',
                description: 'Water-repellent coating application',
                priceCents: 8000, // $80.00 incl. GST
            },
        ],
    },

    // Car Detailing (FIXED)
    {
        id: 'car_exterior',
        name: 'Car Exterior Detailing',
        description: 'Professional car wash and exterior detailing service',
        unit: 'FIXED',
        unitLabel: 'car',
        basePriceCents: 12000, // $120.00 incl. GST
        minQty: 1,
        recommendedQty: 1,
        maxQty: 3,
        features: [
            'Exterior wash and dry',
            'Wheel and tire cleaning',
            'Window cleaning',
            'Chrome and trim polishing',
            'Wax application',
            'Interior vacuum',
        ],
        estimatedDuration: '2-3 hours',
        addons: [
            {
                id: 'premium_interior',
                name: 'Premium Interior Package',
                description:
                    'Leather conditioning, fabric protection, and dashboard treatment',
                priceCents: 9500, // $95.00 incl. GST
            },
            {
                id: 'ceramic_coating',
                name: 'Ceramic Paint Protection',
                description: '6-month ceramic coating for paint protection',
                priceCents: 15000, // $150.00 incl. GST
            },
            {
                id: 'headlight_restoration',
                name: 'Headlight Restoration',
                description:
                    'Professional headlight polishing and UV protection',
                priceCents: 7500, // $75.00 incl. GST
            },
            {
                id: 'engine_detailing',
                name: 'Engine Bay Detailing',
                description:
                    'Professional engine compartment cleaning and dressing',
                priceCents: 6500, // $65.00 incl. GST
            },
        ],
    },
];
