export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    // Log ထုတ်ထားတယ်
    console.log('📩 Contact Form:')
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Message:', message)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your message has been received! ✅' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Something went wrong. ❌' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
