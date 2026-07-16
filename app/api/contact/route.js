import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['khantaungmin304@gmail.com'],
      subject: `New Contact Form from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: '✅ Your message has been sent!' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: '❌ Failed to send. Please try again.' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
