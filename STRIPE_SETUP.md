# Stripe Setup for Demo Checkout

This document explains how to set up Stripe for the demo checkout functionality in the Helpi cleaning services app.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Stripe Test Keys (DO NOT use production keys for demo)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Getting Test Keys

1. **Sign up for Stripe**: Go to [stripe.com](https://stripe.com) and create an account
2. **Access Dashboard**: Log into your Stripe dashboard
3. **Get Test Keys**:
    - Go to Developers → API keys
    - Copy the "Secret key" (starts with `sk_test_`)
    - Copy the "Publishable key" (starts with `pk_test_`)

## Important Notes

-   **Test Mode Only**: These keys are for testing only and won't process real payments
-   **Never Commit**: The `.env.local` file should never be committed to version control
-   **Client vs Server**: Only the publishable key is exposed to the client, the secret key stays server-side

## Testing the Checkout

1. **Test Cards**: Use Stripe's test card numbers:

    - Success: `4242 4242 4242 4242`
    - Decline: `4000 0000 0000 0002`
    - Any future expiry date and any 3-digit CVC

2. **Test Flow**:
    - Add services to cart
    - Click "Proceed to Checkout"
    - Complete Stripe checkout form
    - Redirect to success/cancel page

## Security Features

-   **Server-side Session Creation**: Checkout sessions are created server-side
-   **No Client Secrets**: Secret keys never leave the server
-   **Input Validation**: All cart data is validated before processing
-   **Error Handling**: Comprehensive error handling for failed requests

## Production Considerations

When moving to production:

1. **Switch to Live Keys**: Replace test keys with live keys
2. **Webhooks**: Implement webhook handling for payment confirmations
3. **Order Persistence**: Store order details in database
4. **Customer Management**: Implement customer profiles and order history
5. **Fraud Protection**: Enable Stripe's fraud detection features

## Troubleshooting

-   **"Stripe configuration missing"**: Check that `STRIPE_SECRET_KEY` is set in `.env.local`
-   **"Invalid package ID"**: Ensure cart items reference valid package IDs from the pricing config
-   **Checkout fails**: Verify Stripe account is active and test keys are correct
