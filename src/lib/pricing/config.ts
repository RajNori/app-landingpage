import { PriceItem } from './schema';

export const PRICING_CITY = 'Melbourne';
export const GST_RATE = 0.10;

export const PRICE_ITEMS: PriceItem[] = [
  // Home Cleaning (HOURLY)
  {
    id: 'home_basic',
    name: 'Basic Home Cleaning',
    description: 'Standard cleaning service for maintaining a clean and tidy home',
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
    description: 'Comprehensive cleaning service for thorough home refreshment',
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
        id: 'extra_panes',
        name: 'Extra Panes',
        description: 'Additional panes beyond 15 (80c per pane)',
        priceCents: 80, // $0.80 incl. GST per pane
      },
      {
        id: 'ladder_fee',
        name: 'Ladder Fee',
        description: 'Ladder access for high windows',
        priceCents: 5000, // $50.00 incl. GST
      },
      {
        id: 'mirrors_glass_doors',
        name: 'Mirrors & Glass Doors',
        description: 'Additional mirrors and glass doors',
        priceCents: 3000, // $30.00 incl. GST
      },
    ],
  },
];
