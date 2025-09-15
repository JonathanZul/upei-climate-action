import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactFormEmail from '@/emails/ContactFormEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const emailTo = process.env.CONTACT_FORM_EMAIL_TO;

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!emailTo) {
    return NextResponse.json({ error: 'Email configuration missing' }, { status: 500 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [emailTo],
      subject: `New Message from ${name}`,
      reply_to: email,
      react: ContactFormEmail({ name, email, message }),
    });

    if (error) {
      // --- Log the specific error from Resend ---
      console.error("Resend API Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    // --- Log any other unexpected errors ---
    console.error("Catch Block Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}