import { NextResponse } from 'next/server';

const apiKey = process.env.BEEHIIV_API_KEY;
const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

if (!apiKey || !publicationId) {
  throw new Error("Beehiiv environment variables are not set.");
}

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  if (!apiKey || !publicationId) {
    return NextResponse.json({ error: 'Newsletter service is not configured.' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`, // Beehiiv uses a Bearer token
        },
        body: JSON.stringify({
          email: email,
          send_welcome_email: true, // This tells Beehiiv to send your welcome email!
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // Beehiiv provides a clear error message for existing subscribers
      if (result.errors && result.errors[0]?.message === 'Subscription already exists.') {
        return NextResponse.json({ error: 'This email is already subscribed!' }, { status: 400 });
      }

      // For any other error, return a generic message
      return NextResponse.json({ error: 'An error occurred. Please try again later.' }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: result.data });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An internal error occurred.' }, { status: 500 });
  }
}