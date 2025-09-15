import { NextResponse } from 'next/server';

const apiKey = process.env.MAILCHIMP_API_KEY;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

if (!apiKey || !audienceId || !serverPrefix) {
  throw new Error("Mailchimp environment variables are not set. Please configure MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID, and MAILCHIMP_SERVER_PREFIX.");
}

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  if (!apiKey || !audienceId || !serverPrefix) {
    return NextResponse.json({ error: 'Mailchimp configuration is missing.' }, { status: 500 });
  }

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  try {
    const response = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${apiKey}`,
        },
        body: JSON.stringify(data),
      }
    );
    
    if (!response.ok) {
      const result = await response.json();
      
      // Check if the error title is "Member Exists"
      if (result.title === "Member Exists") {
        return NextResponse.json({ error: 'This email is already subscribed!' }, { status: 400 });
      }
      
      // For any other error, return a generic message
      return NextResponse.json({ error: 'An error occurred. Please try again later.' }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json({ success: true, ...result });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An internal error occurred.' }, { status: 500 });
  }
}