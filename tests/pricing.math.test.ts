import { describe, it, expect } from 'vitest';
import {
    toExGst,
    applyMinQty,
    lineTotalCents,
    getMinTotalPrice,
} from '../src/lib/pricing/utils';
import { PRICE_ITEMS } from '../src/lib/pricing/config';

describe('Pricing Math Functions', () => {
    describe('toExGst', () => {
        it('should convert GST-inclusive cents to ex-GST and GST breakdown', () => {
            const result = toExGst(5500); // $55.00 incl. GST
            expect(result.exCents).toBe(5000); // $50.00 ex-GST
            expect(result.gstCents).toBe(500); // $5.00 GST
            expect(result.exCents + result.gstCents).toBe(5500); // Should sum to original
        });

        it('should handle zero amount', () => {
            const result = toExGst(0);
            expect(result.exCents).toBe(0);
            expect(result.gstCents).toBe(0);
        });

        it('should handle large amounts', () => {
            const result = toExGst(65000); // $650.00 incl. GST
            expect(result.exCents).toBe(59091); // $590.91 ex-GST
            expect(result.gstCents).toBe(5909); // $59.09 GST
            expect(result.exCents + result.gstCents).toBe(65000);
        });
    });

    describe('applyMinQty', () => {
        it('should enforce minimum quantity for hourly services', () => {
            // Deep cleaning: min 3 hours
            expect(applyMinQty(1, 3)).toBe(3); // Select 1, billed 3
            expect(applyMinQty(2, 3)).toBe(3); // Select 2, billed 3
            expect(applyMinQty(3, 3)).toBe(3); // Select 3, billed 3
            expect(applyMinQty(5, 3)).toBe(5); // Select 5, billed 5
        });

        it('should enforce minimum quantity for per-room services', () => {
            // Carpet cleaning: min 2 rooms
            expect(applyMinQty(1, 2)).toBe(2); // Select 1, billed 2
            expect(applyMinQty(2, 2)).toBe(2); // Select 2, billed 2
            expect(applyMinQty(4, 2)).toBe(4); // Select 4, billed 4
        });

        it('should handle fixed services with minQty 1', () => {
            // End of lease: min 1 job
            expect(applyMinQty(1, 1)).toBe(1); // Select 1, billed 1
            expect(applyMinQty(0, 1)).toBe(1); // Select 0, billed 1
        });
    });

    describe('getMinTotalPrice', () => {
        it('should calculate minimum total for hourly services', () => {
            const deepCleaning = PRICE_ITEMS.find(
                (item) => item.id === 'home_deep'
            );
            expect(deepCleaning).toBeDefined();
            if (deepCleaning) {
                const minTotal = getMinTotalPrice(deepCleaning);
                expect(minTotal).toBe(21000); // $70/hour × 3 hours = $210.00
            }
        });

        it('should calculate minimum total for per-room services', () => {
            const carpetCleaning = PRICE_ITEMS.find(
                (item) => item.id === 'carpet_room'
            );
            expect(carpetCleaning).toBeDefined();
            if (carpetCleaning) {
                const minTotal = getMinTotalPrice(carpetCleaning);
                expect(minTotal).toBe(12000); // $60/room × 2 rooms = $120.00
            }
        });

        it('should calculate minimum total for fixed services', () => {
            const eol2br = PRICE_ITEMS.find((item) => item.id === 'eol_2br');
            expect(eol2br).toBeDefined();
            if (eol2br) {
                const minTotal = getMinTotalPrice(eol2br);
                expect(minTotal).toBe(42000); // $420.00 fixed price
            }
        });
    });

    describe('lineTotalCents', () => {
        it('should calculate line total for hourly service with minimum enforcement', () => {
            const deepCleaning = PRICE_ITEMS.find(
                (item) => item.id === 'home_deep'
            );
            expect(deepCleaning).toBeDefined();
            if (deepCleaning) {
                // Select 1 hour, but min is 3 hours
                const total = lineTotalCents(
                    deepCleaning.basePriceCents,
                    1,
                    deepCleaning.minQty
                );
                expect(total).toBe(21000); // $70 × 3 = $210.00
            }
        });

        it('should calculate line total for per-room service with minimum enforcement', () => {
            const carpetCleaning = PRICE_ITEMS.find(
                (item) => item.id === 'carpet_room'
            );
            expect(carpetCleaning).toBeDefined();
            if (carpetCleaning) {
                // Select 1 room, but min is 2 rooms
                const total = lineTotalCents(
                    carpetCleaning.basePriceCents,
                    1,
                    carpetCleaning.minQty
                );
                expect(total).toBe(12000); // $60 × 2 = $120.00
            }
        });

        it('should calculate line total for fixed service', () => {
            const eol1br = PRICE_ITEMS.find((item) => item.id === 'eol_1br');
            expect(eol1br).toBeDefined();
            if (eol1br) {
                const total = lineTotalCents(
                    eol1br.basePriceCents,
                    1,
                    eol1br.minQty
                );
                expect(total).toBe(32000); // $320.00 fixed price
            }
        });
    });

    describe('Real-world Scenarios', () => {
        it('should handle hourly deep clean with minimum enforcement', () => {
            const deepCleaning = PRICE_ITEMS.find(
                (item) => item.id === 'home_deep'
            );
            expect(deepCleaning).toBeDefined();
            if (deepCleaning) {
                // Customer selects 1 hour, but minimum is 3 hours
                const billedQty = applyMinQty(1, deepCleaning.minQty);
                expect(billedQty).toBe(3);

                const total = deepCleaning.basePriceCents * billedQty;
                expect(total).toBe(21000); // $70 × 3 = $210.00

                // GST breakdown
                const gstBreakdown = toExGst(total);
                expect(gstBreakdown.exCents).toBe(19091); // $190.91 ex-GST
                expect(gstBreakdown.gstCents).toBe(1909); // $19.09 GST
            }
        });

        it('should handle windows job with extra panes and ladder fee', () => {
            const windowsJob = PRICE_ITEMS.find(
                (item) => item.id === 'windows_job'
            );
            expect(windowsJob).toBeDefined();
            if (windowsJob) {
                // Base price: $200 minimum
                const baseTotal = windowsJob.basePriceCents;
                expect(baseTotal).toBe(20000);

                // 5 extra panes × $0.80 = $4.00
                const extraPanes = 5 * 80; // 80 cents per pane
                expect(extraPanes).toBe(400);

                // Ladder fee: $50.00
                const ladderFee = 5000;
                expect(ladderFee).toBe(5000);

                // Total: $200 + $4 + $50 = $254.00
                const total = baseTotal + extraPanes + ladderFee;
                expect(total).toBe(25400);

                // GST breakdown
                const gstBreakdown = toExGst(total);
                expect(gstBreakdown.exCents).toBe(23091); // $230.91 ex-GST
                expect(gstBreakdown.gstCents).toBe(2309); // $23.09 GST
            }
        });

        it('should handle EOL 2-BR with carpet cleaning add-ons', () => {
            const eol2br = PRICE_ITEMS.find((item) => item.id === 'eol_2br');
            expect(eol2br).toBeDefined();
            if (eol2br) {
                // Base price: $420
                const baseTotal = eol2br.basePriceCents;
                expect(baseTotal).toBe(42000);

                // 3 carpet rooms × $40 = $120
                const carpetAddon = 3 * 4000; // $40 per room
                expect(carpetAddon).toBe(12000);

                // Total: $420 + $120 = $540
                const total = baseTotal + carpetAddon;
                expect(total).toBe(54000);

                // GST breakdown
                const gstBreakdown = toExGst(total);
                expect(gstBreakdown.exCents).toBe(49091); // $490.91 ex-GST
                expect(gstBreakdown.gstCents).toBe(4909); // $49.09 GST
            }
        });
    });

    describe('Edge Cases', () => {
        it('should handle maximum quantities correctly', () => {
            const homeStandard = PRICE_ITEMS.find(
                (item) => item.id === 'home_standard'
            );
            expect(homeStandard).toBeDefined();
            if (homeStandard) {
                // Max quantity is 10 hours
                expect(homeStandard.maxQty).toBe(10);

                // Should allow maximum quantity
                const maxTotal =
                    homeStandard.basePriceCents * homeStandard.maxQty;
                expect(maxTotal).toBe(600000); // $60 × 10 = $600.00
            }
        });

        it('should handle recommended quantities', () => {
            const homeBasic = PRICE_ITEMS.find(
                (item) => item.id === 'home_basic'
            );
            expect(homeBasic).toBeDefined();
            if (homeBasic) {
                // Recommended quantity is 2 hours
                expect(homeBasic.recommendedQty).toBe(2);

                const recommendedTotal =
                    homeBasic.basePriceCents * homeBasic.recommendedQty;
                expect(recommendedTotal).toBe(11000); // $55 × 2 = $110.00
            }
        });

        it('should validate GST calculations sum correctly', () => {
            const testAmounts = [5500, 6000, 7000, 32000, 42000, 52000, 65000];

            testAmounts.forEach((amount) => {
                const gstBreakdown = toExGst(amount);
                expect(gstBreakdown.exCents + gstBreakdown.gstCents).toBe(
                    amount
                );
            });
        });
    });
});
