import crypto from 'crypto';

const TIMESTAMP_TOLERANCE_SECONDS = 5 * 60;

export function createSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export function verifySyncSignature(params: {
    timestamp: string | null;
    signature: string | null;
    rawBody: string;
    secret: string;
}): { ok: true } | { ok: false; error: string } {
    const { timestamp, signature, rawBody, secret } = params;

    if (!timestamp || !signature) {
        return { ok: false, error: 'Missing signature headers' };
    }

    const timestampSeconds = Number(timestamp);
    if (!Number.isFinite(timestampSeconds)) {
        return { ok: false, error: 'Invalid timestamp' };
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (Math.abs(nowSeconds - timestampSeconds) > TIMESTAMP_TOLERANCE_SECONDS) {
        return { ok: false, error: 'Timestamp is outside accepted window' };
    }

    const payload = `${timestamp}.${rawBody}`;
    const expectedDigest = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
    const normalizedSignature = signature.replace(/^sha256=/, '');

    const expectedBuffer = Buffer.from(expectedDigest, 'hex');
    const providedBuffer = Buffer.from(normalizedSignature, 'hex');

    if (expectedBuffer.length !== providedBuffer.length) {
        return { ok: false, error: 'Invalid signature length' };
    }

    if (!crypto.timingSafeEqual(expectedBuffer, providedBuffer)) {
        return { ok: false, error: 'Signature verification failed' };
    }

    return { ok: true };
}
