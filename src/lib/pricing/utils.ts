import { GST_RATE } from './config';
import { PriceItem, Addon } from './schema';
import { PRICE_ITEMS } from './config';

/**
 * Convert GST-inclusive cents to ex-GST and GST breakdown
 */
export function toExGst(inclCents: number): {
    exCents: number;
    gstCents: number;
} {
    const exCents = Math.round(inclCents / (1 + GST_RATE));
    const gstCents = inclCents - exCents;
    return { exCents, gstCents };
}

/**
 * Apply minimum quantity enforcement
 */
export function applyMinQty(selected: number, min: number): number {
    return Math.max(selected, min);
}

/**
 * Calculate line total in cents including minimums and add-ons
 */
export function lineTotalCents(
    basePriceCents: number,
    qty: number,
    minQty: number,
    addons: Array<{ id: string; quantity: number }> = []
): number {
    const billedQty = applyMinQty(qty, minQty);
    const baseTotal = basePriceCents * billedQty;

    // Add add-on costs
    const addonTotal = addons.reduce((total, addon) => {
        // Find addon in price items to get price
        // This would typically come from a lookup function
        // For now, we'll assume addon prices are passed separately
        return total + addon.quantity * 0; // Placeholder
    }, 0);

    return baseTotal + addonTotal;
}

/**
 * Format price display with minimum quantity indicator
 */
export function formatPriceDisplay(
    priceCents: number,
    unit: string,
    minQty: number,
    unitLabel: string
): string {
    const price = (priceCents / 100).toFixed(2);

    if (minQty > 1) {
        return `$${price}/${unitLabel} (Min: ${minQty} ${unitLabel}${
            minQty > 1 ? 's' : ''
        })`;
    }

    if (unit === 'FIXED' || unit === 'PER_JOB') {
        return `$${price} minimum job`;
    }

    return `$${price}/${unitLabel}`;
}

/**
 * Calculate minimum total price for a service
 */
export function getMinTotalPrice(priceItem: PriceItem): number {
    return priceItem.basePriceCents * priceItem.minQty;
}

/**
 * Get addon by ID from a price item
 */
export function getAddonById(
    priceItem: PriceItem,
    addonId: string
): Addon | undefined {
    return priceItem.addons?.find((addon) => addon.id === addonId);
}

/**
 * Calculate addon total for a specific addon
 */
export function calculateAddonTotal(
    priceItem: PriceItem,
    addonId: string,
    quantity: number
): number {
    const addon = getAddonById(priceItem, addonId);
    if (!addon) return 0;

    return addon.priceCents * quantity;
}

/**
 * Calculate total for a cart with multiple items
 */
export function calculateCartTotal(
    cartItems: Array<{
        packageId: string;
        quantity: number;
        addons?: Array<{ id: string; quantity: number }>;
    }>
): { subtotalCents: number; gstCents: number; totalCents: number } {
    let subtotalCents = 0;

    for (const item of cartItems) {
        const priceItem = PRICE_ITEMS.find(
            (p: PriceItem) => p.id === item.packageId
        );
        if (!priceItem) continue;

        // Calculate base price
        const billedQty = applyMinQty(item.quantity, priceItem.minQty);
        const baseAmount = priceItem.basePriceCents * billedQty;
        subtotalCents += baseAmount;

        // Add add-ons
        if (item.addons) {
            for (const addon of item.addons) {
                const addonAmount = calculateAddonTotal(
                    priceItem,
                    addon.id,
                    addon.quantity
                );
                subtotalCents += addonAmount;
            }
        }
    }

    // Calculate GST
    const gstCents = Math.round(subtotalCents * GST_RATE);
    const totalCents = subtotalCents + gstCents;

    return { subtotalCents, gstCents, totalCents };
}
