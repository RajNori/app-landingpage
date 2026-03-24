# Blog Sync API (Admin -> Helpi)

This endpoint lets your third-party admin dashboard create/update blog posts on Helpi.

## Endpoint

- **Method:** `POST`
- **URL:** `/api/admin/blog/sync`
- **Auth:** HMAC SHA256 signature headers

## Required Environment Variable (Helpi app)

- `BLOG_SYNC_SECRET` - shared secret used by both Helpi and the third-party dashboard.

## Required Headers

- `content-type: application/json`
- `x-helpi-timestamp: <unix-seconds>`
- `x-helpi-signature: sha256=<hex_digest>`

Helpi verifies signatures using:

`HMAC_SHA256(secret, "${timestamp}.${rawJsonBody}")`

Timestamp tolerance is 5 minutes.

## Payload

### Required fields

- `externalId` (string) - unique post identifier from dashboard
- `title` (string)

### Optional fields

- `source` (string)
- `slug` (string)
- `excerpt` (string)
- `contentHtml` (string)
- `contentMarkdown` (string)
- `coverImageUrl` (string)
- `authorName` (string)
- `tags` (string[])
- `status` (`draft` | `published` | `archived`)
- `publishedAt` (ISO date string)
- `checksum` (string)
- `syncVersion` (number)

## Node.js Example (copy-paste)

```js
const crypto = require('crypto');

async function syncBlogPost() {
  const endpoint = 'https://www.gethelpi.com/api/admin/blog/sync';
  const secret = process.env.BLOG_SYNC_SECRET;

  const payload = {
    externalId: 'cms-post-1001',
    source: 'partner-dashboard',
    title: 'How to Prepare Your Home for a Professional Clean',
    slug: 'prepare-home-for-professional-clean',
    excerpt: 'Quick prep steps to help your cleaner deliver great results.',
    contentHtml:
      '<p>Before your cleaner arrives, clear benchtops and secure valuables.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/your-cloud/image/upload/v123/blog/clean-home.jpg',
    authorName: 'Helpi Team',
    tags: ['Cleaning Tips', 'Home Care'],
    status: 'published',
    publishedAt: new Date().toISOString(),
    syncVersion: 1
  };

  const rawBody = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-helpi-timestamp': timestamp,
      'x-helpi-signature': `sha256=${signature}`
    },
    body: rawBody
  });

  const data = await response.json();
  console.log('status:', response.status);
  console.log('response:', data);
}

syncBlogPost().catch(console.error);
```

## Notes

- Requests are idempotent by `externalId` (`upsert` behavior).
- `slug` must be unique across posts; conflicts return `409`.
- For published posts, Helpi revalidates `/blog` and `/blog/[slug]` automatically.
