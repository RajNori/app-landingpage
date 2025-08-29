import { PRICE_ITEMS } from './pricing/config';
import React from 'react';
import { PriceItem } from './pricing/schema';
import {
    FaHome,
    FaStar,
    FaBoxes,
    FaCouch,
    FaWindowMaximize,
} from 'react-icons/fa';

export interface Service {
    id: string;
    icon: React.ComponentType<{ className?: string }> | string;
    title: string;
    name: string;
    description: string;
    duration: string;
    price: string;
    features: string[];
    isPopular?: boolean;
}

export interface ServicePackage {
    id: string;
    name: string;
    description: string;
    unit: string;
    unitLabel: string;
    basePriceCents: number;
    minQty: number;
    recommendedQty: number;
    maxQty: number;
    features: string[];
    estimatedDuration?: string;
    category?: string;
    addons?: Array<{
        id: string;
        name: string;
        description?: string;
        priceCents: number;
        maxQuantity?: number;
    }>;
}

// Map price items to service categories
export const SERVICES: Service[] = [
    {
        id: 'home_cleaning',
        icon: FaHome,
        title: 'Home Cleaning',
        name: 'Home Cleaning',
        description:
            'Professional home cleaning services with flexible hourly rates',
        duration: '2-16 hours',
        price: 'From $55/hour',
        features: [
            'Basic to intensive cleaning options',
            'Flexible hourly rates',
            'Professional equipment',
            'Eco-friendly products',
            'Satisfaction guaranteed',
        ],
    },
    {
        id: 'deep_intensive',
        icon: FaStar,
        title: 'Deep & Intensive Cleaning',
        name: 'Deep & Intensive Cleaning',
        description:
            'Thorough cleaning for major refresh or pre-sale preparation',
        duration: '3-16 hours',
        price: 'From $70/hour',
        features: [
            'Comprehensive deep cleaning',
            'Appliance cleaning',
            'Detailed sanitization',
            'Wall and surface treatment',
            'Final inspection',
        ],
    },
    {
        id: 'end_of_lease',
        icon: FaBoxes,
        title: 'End of Lease Cleaning',
        name: 'End of Lease Cleaning',
        description: 'Complete cleaning service for moving transitions',
        duration: '4-12 hours',
        price: 'From $320',
        features: [
            'Complete deep cleaning',
            'Carpet cleaning',
            'Wall cleaning',
            'Cabinet and drawer cleaning',
            'Light fixture cleaning',
            'Final inspection',
        ],
    },
    {
        id: 'carpet_cleaning',
        icon: FaCouch,
        title: 'Carpet Cleaning',
        name: 'Carpet Cleaning',
        description: 'Specialized carpet and upholstery cleaning per room',
        duration: '2-3 hours',
        price: 'From $60/room',
        features: [
            'Deep carpet extraction',
            'Stain removal',
            'Odor elimination',
            'Protective treatment',
            'Quick drying process',
        ],
    },
    {
        id: 'window_cleaning',
        icon: FaWindowMaximize,
        title: 'Window Cleaning',
        name: 'Window Cleaning',
        description: 'Professional window and glass cleaning service',
        duration: '1-2 hours',
        price: 'From $200',
        features: [
            'Interior and exterior windows',
            'Glass door cleaning',
            'Mirror cleaning',
            'Window frame cleaning',
            'Screen cleaning',
            'Streak-free finish',
        ],
    },
];

// Map price items to service packages
export const SERVICE_PACKAGES: ServicePackage[] = PRICE_ITEMS.map(
    (item: PriceItem) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        unit: item.unit,
        unitLabel: item.unitLabel,
        basePriceCents: item.basePriceCents,
        minQty: item.minQty,
        recommendedQty: item.recommendedQty,
        maxQty: item.maxQty,
        features: item.features,
        estimatedDuration: item.estimatedDuration,
        addons: item.addons?.map((addon) => ({
            id: addon.id,
            name: addon.name,
            description: addon.description,
            priceCents: addon.priceCents,
            maxQuantity: addon.maxQuantity,
        })),
    })
);

// Get service package by ID
export function getServicePackage(id: string): ServicePackage | undefined {
    return SERVICE_PACKAGES.find((pkg) => pkg.id === id);
}

// Get all packages for a specific service category
export function getPackagesByCategory(categoryId: string): ServicePackage[] {
    const categoryMap: { [key: string]: string[] } = {
        home_cleaning: [
            'home_basic',
            'home_standard',
            'home_deep',
            'home_deep_intensive',
        ],
        deep_intensive: ['home_deep', 'home_deep_intensive'],
        end_of_lease: ['eol_1br', 'eol_2br', 'eol_3br', 'eol_4br_plus'],
        carpet_cleaning: ['carpet_room'],
        window_cleaning: ['windows_job'],
    };

    const packageIds = categoryMap[categoryId] || [];
    return SERVICE_PACKAGES.filter((pkg) => packageIds.includes(pkg.id));
}

// Mark popular packages
export function getPopularPackages(): ServicePackage[] {
    return SERVICE_PACKAGES.filter((pkg) => pkg.id === 'home_standard');
}
