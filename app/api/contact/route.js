export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    // Log ထုတ်ထားတယ် (အခုချိန်မှာ)
    console.log('📩 Contact Form Submission:')
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Message:', message)

    // အောင်မြင်ကြောင်း Response ပြန်ပေးတယ်
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
    console.error('Error:', error)

    // အမှားဖြစ်ရင် Response
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Something went wrong. Please try again. ❌' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
