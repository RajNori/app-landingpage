# Contact Form Proxy API

## Overview

The contact form proxy (`/api/contact-proxy`) is a Next.js API route that forwards contact form submissions to Google Apps Script, avoiding CORS and redirect issues that commonly occur when posting directly to Google Apps Script from browsers.

## How It Works

1. **Frontend** submits form data to `/api/contact-proxy` (same origin)
2. **API Route** validates the data using Zod schema
3. **API Route** converts JSON to form-encoded data
4. **API Route** forwards to Google Apps Script using `process.env.GAS_URL`
5. **Response** is proxied back to the frontend

## Configuration

### Environment Variables

Add this to your `.env.local` file:

```bash
GAS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

**Important**:

-   Use the **exact** `/exec` URL (no trailing slash)
-   Must be HTTPS
-   Must be a deployed web app (not `/dev`)

### Google Apps Script Setup

1. Deploy your script as a **Web App**
2. Set **Execute as**: `Me` (your account)
3. Set **Who has access**: `Anyone` (for public forms)
4. Copy the deployment URL (ends with `/exec`)

## Testing

### Local Development

```bash
curl -i -X POST http://localhost:3000/api/contact-proxy \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Raj","lastName":"Nori","email":"raj@example.com","subject":"Test","message":"Hello"}'
```

### Production

```bash
curl -i -X POST https://yourdomain.com/api/contact-proxy \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Raj","lastName":"Nori","email":"raj@example.com","subject":"Test","message":"Hello"}'
```

## Features

-   **Rate Limiting**: 5 requests per minute per IP
-   **Validation**: Zod schema validation for all fields
-   **Error Handling**: Proper HTTP status codes and error messages
-   **Logging**: Non-PII logging for debugging
-   **CSP Compliant**: No external `connect-src` needed

## Common Issues

### Missing Environment Variable

**Error**: `Server configuration error`
**Solution**: Add `GAS_URL` to your `.env.local` file

### Google Apps Script Not Public

**Error**: `Upstream failed` with 403/401
**Solution**: Ensure your Google Apps Script web app is deployed with "Anyone" access

### Wrong URL Format

**Error**: `Upstream failed` with 404
**Solution**: Use the exact `/exec` URL from your deployment, not `/dev`

### Rate Limited

**Error**: `Rate limit exceeded. Please try again in a minute.`
**Solution**: Wait 1 minute before submitting again

## Field Validation

-   **firstName**: Required, max 50 characters
-   **lastName**: Required, max 50 characters
-   **email**: Required, valid email format
-   **subject**: Required, max 120 characters
-   **message**: Required, max 1000 characters

## Security

-   **CSP**: No changes needed - remains `connect-src 'self'`
-   **Rate Limiting**: Prevents abuse
-   **Validation**: Server-side input validation
-   **No PII Logging**: Only logs field presence and lengths
