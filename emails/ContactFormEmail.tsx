import { Html, Body, Head, Heading, Container, Text } from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export default function ContactFormEmail({ name, email, message }: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', color: '#333' }}>
        <Container style={{ padding: '20px', border: '1px solid #eee' }}>
          <Heading>New Contact Form Submission</Heading>
          <Text>You received a new message from the climate action website.</Text>
          <hr />
          <Text><strong>From:</strong> {name}</Text>
          <Text><strong>Email:</strong> {email}</Text>
          <Text><strong>Message:</strong></Text>
          <Text style={{ whiteSpace: 'pre-wrap' }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}