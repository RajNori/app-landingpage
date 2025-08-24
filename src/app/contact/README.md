# Contact Form Implementation

This contact form is fully integrated with the `/api/contact-proxy` endpoint and provides two implementation options.

## Option A: JSON Fetch (Default, Recommended)

**Current Implementation**: The form uses client-side JavaScript to:
- Prevent default form submission
- Serialize form data to JSON
- POST to `/api/contact-proxy` with `Content-Type: application/json`
- Handle responses and show user feedback

**Benefits**:
- Better error handling and validation
- Rich user feedback (success/error states)
- Rate limiting awareness
- Form reset on success

## Option B: Pure HTML Form (Fallback)

**Alternative Implementation**: Pure HTML form that posts directly to the API:
- Add `action="/api/contact-proxy" method="post"` to the form
- Set `USE_FORMDATA = true` in `/api/contact-proxy/route.ts`
- Form submits without JavaScript

**Use Case**: When you need a no-JavaScript fallback or want to simplify the implementation.

## How to Switch to Option B

1. **Update the form** in `page.tsx`:
   ```tsx
   <form
       id="contactForm"
       action="/api/contact-proxy"
       method="post"
       className='space-y-6'>
   ```

2. **Remove the onSubmit handler** and JavaScript form handling

3. **Set the flag** in `/api/contact-proxy/route.ts`:
   ```ts
   const USE_FORMDATA = true;
   ```

## Current Features

- ✅ **Form ID**: `id="contactForm"` for easy targeting
- ✅ **Accessibility**: `aria-live` region for status updates
- ✅ **Error Handling**: Validation errors, rate limits, server errors
- ✅ **User Feedback**: Success/error messages with proper styling
- ✅ **Form Reset**: Automatic form clearing on successful submission
- ✅ **Loading States**: Disabled submit button during submission
- ✅ **Rate Limiting**: 5 requests per minute per IP
- ✅ **Validation**: Zod schema validation on both client and server

## Testing

### Local Testing
```bash
# Test JSON endpoint
curl -i -X POST http://localhost:3000/api/contact-proxy \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","subject":"general","message":"Hello"}'

# Test form data endpoint (if USE_FORMDATA = true)
curl -i -X POST http://localhost:3000/api/contact-proxy \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "firstName=Test&lastName=User&email=test@example.com&subject=general&message=Hello"
```

### Production Testing
```bash
# Test live endpoint
curl -i -X POST https://www.gethelpi.com/api/contact-proxy \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","subject":"general","message":"Hello"}'
```

## Environment Variables

Ensure `GAS_URL` is set in your deployment environment (Vercel project settings) pointing to your Google Apps Script endpoint.
