export async function POST(request) {
  try {
    const { name, email, message } = await request.json()
    
    // ဒီနေရာမှာ မင်းရဲ့ Email Service (ဥပမာ - Resend, SendGrid) ကို ခေါ်မယ်
    // အခုချိန်မှာ Log ထုတ်ထားမယ်
    console.log('Contact Form:', { name, email, message })
    
    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ message: 'Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
