import { z } from 'zod';

export const UnitKindSchema = z.enum([
    'HOURLY',
    'PER_JOB',
    'PER_ROOM',
    'FIXED',
]);
export type UnitKind = z.infer<typeof UnitKindSchema>;

export const AddonSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    priceCents: z.number().int().positive(), // GST-inclusive
    maxQuantity: z.number().int().positive().optional(),
});

export const PriceItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    unit: UnitKindSchema,
    unitLabel: z.string(),
    basePriceCents: z.number().int().positive(), // GST-inclusive
    minQty: z.number().int().positive(),
    recommendedQty: z.number().int().positive(),
    maxQty: z.number().int().positive(),
    features: z.array(z.string()),
    estimatedDuration: z.string().optional(),
    addons: z.array(AddonSchema).optional(),
});

export type Addon = z.infer<typeof AddonSchema>;
export type PriceItem = z.infer<typeof PriceItemSchema>;

export const CartItemSchema = z.object({
    packageId: z.string(),
    quantity: z.number(),
    addons: z
        .array(
            z.object({
                id: z.string(),
                quantity: z.number(),
            })
        )
        .optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
