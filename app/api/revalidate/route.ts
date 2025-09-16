import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Get the secret from environment variables
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

// Define the shape of the request body
interface RequestBody {
  _type: string;
  // Add other properties if needed, e.g., slug for more granular revalidation
}

export async function POST(req: NextRequest) {
  if (!SANITY_WEBHOOK_SECRET) {
    console.error("Sanity webhook secret is not set.");
    return NextResponse.json({ message: "Configuration error" }, { status: 500 });
  }

  try {
    // Use the next-sanity helper to securely parse the request body
    const { body, isValidSignature } = await parseBody<RequestBody>(req, SANITY_WEBHOOK_SECRET);

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad request: missing _type', { status: 400 });
    }

    // Revalidate the cache based on the document type
    // This uses the tags we added to our fetch calls
    revalidateTag(body._type);

    // Also revalidate related tags if needed
    if (body._type === 'tag') {
      revalidateTag('post'); // If a tag changes, revalidate posts too
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: unknown) {
    console.error(err);
    return new Response((err as Error).message, { status: 500 });
  }
}