import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// စမ်းသုံးမယ့် Model စာရင်း
const models = [
  'gemini-2.0-flash-exp',
  'gemini-1.5-pro',
  'gemini-pro'
]

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let lastError = null

    // Model တစ်ခုချင်းစီကို စမ်းသုံးမယ်
    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })

        const result = await model.generateContent({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: 'Please transcribe this audio and generate SRT format subtitle with timestamps.'
                },
                {
                  inlineData: {
                    mimeType: file.type,
                    data: buffer.toString('base64')
                  }
                }
              ]
            }
          ]
        })

        const text = result.response.text()

        // အောင်မြင်ရင် SRT ကို ပြန်ပေးမယ်
        return NextResponse.json({
          success: true,
          srt: text
        })

      } catch (error) {
        lastError = error
        continue // မအောင်ရင် နောက် Model ကို ဆက်စမ်းမယ်
      }
    }

    // အကုန်မအောင်ရင် Error ပြန်ပေးမယ်
    return NextResponse.json(
      { error: 'All models failed. Last error: ' + lastError?.message },
      { status: 500 }
    )

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to transcribe audio: ' + error.message },
      { status: 500 }
    )
  }
}
