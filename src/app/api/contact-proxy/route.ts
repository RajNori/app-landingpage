import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Contact form payload schema
const ContactSchema = z.object({
    firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
    lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
    email: z.string().email('Invalid email format'),
    subject: z.string().min(1, 'Subject is required').max(120, 'Subject must be less than 120 characters'),
    message: z.string().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters'),
});

export type ContactPayload = z.infer<typeof ContactSchema>;

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // 5 requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    
    if (!record || now > record.resetTime) {
        // Reset or create new record
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }
    
    if (record.count >= RATE_LIMIT_MAX) {
        return false;
    }
    
    record.count++;
    return true;
}

/**
 * Contact form proxy endpoint
 * Forwards form submissions to Google Apps Script to avoid CORS and redirect issues
 * 
 * Test locally:
 * curl -i -X POST http://localhost:3000/api/contact-proxy \
 *   -H "Content-Type: application/json" \
 *   -d '{"firstName":"Raj","lastName":"Nori","email":"raj@example.com","subject":"Test","message":"Hello"}'
 */
export async function POST(request: NextRequest) {
    try {
        // Check rate limit
        const ip = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { success: false, error: 'Rate limit exceeded. Please try again in a minute.' },
                { status: 429 }
            );
        }

        // Validate environment variable
        const gasUrl = process.env.GAS_URL;
        if (!gasUrl) {
            console.error('GAS_URL environment variable not configured');
            return NextResponse.json(
                { success: false, error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Parse and validate request body
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, error: 'Invalid JSON in request body' },
                { status: 400 }
            );
        }

        const validationResult = ContactSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Validation failed',
                    errors: validationResult.error.issues.map(e => e.message)
                },
                { status: 400 }
            );
        }

        const formData = validationResult.data;

        // Log submission (no PII)
        console.log('Contact form submission:', {
            hasFirstName: !!formData.firstName,
            hasLastName: !!formData.lastName,
            hasEmail: !!formData.email,
            hasSubject: !!formData.subject,
            hasMessage: !!formData.message,
            firstNameLength: formData.firstName.length,
            lastNameLength: formData.lastName.length,
            subjectLength: formData.subject.length,
            messageLength: formData.message.length,
            ip: ip.substring(0, 8) + '...' // Partial IP for logging
        });

        // Convert to form-encoded data for Google Apps Script
        const formDataParams = new URLSearchParams();
        Object.entries(formData).forEach(([key, value]) => {
            formDataParams.append(key, value);
        });

        // Forward to Google Apps Script
        const upstreamResponse = await fetch(gasUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formDataParams,
            redirect: 'follow',
        });

        // Read response as text first
        const responseText = await upstreamResponse.text();
        
        // Try to parse as JSON, fallback to text
        let responseData: unknown;
        try {
            responseData = JSON.parse(responseText);
        } catch {
            responseData = responseText;
        }

        // Return response with upstream status code
        return NextResponse.json(responseData, { status: upstreamResponse.status });

    } catch (error) {
        console.error('Contact proxy error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Handle non-POST requests
export async function GET() {
    return NextResponse.json(
        { success: false, error: 'Method not allowed' },
        { status: 405 }
    );
}

export async function PUT() {
    return NextResponse.json(
        { success: false, error: 'Method not allowed' },
        { status: 405 }
    );
}

export async function DELETE() {
    return NextResponse.json(
        { success: false, error: 'Method not allowed' },
        { status: 405 }
    );
}
