// Re-export all pricing utilities and types
export * from './pricing/schema';
export * from './pricing/config';
export * from './pricing/utils';

// Legacy exports for backward compatibility
export { toExGst } from './pricing/utils';

// Additional utility functions
export function formatAud(cents: number): string {
    return `$${(cents / 100).toFixed(2)}`;
}

export function getUnitLabelDisplay(unit: string, qty: number): string {
    return qty === 1 ? unit : `${unit}s`;
}
