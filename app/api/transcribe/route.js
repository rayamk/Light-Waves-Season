import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// စမ်းသုံးမယ့် Model စာရင်း - အခုခေတ်သုံး model များ
const models = [
  'gemini-2.0-flash-exp',
  'gemini-1.5-flash',
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

    // File size check (Max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Max 10MB.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let lastError = null

    // Model တစ်ခုချင်းစီကို စမ်းသုံးမယ်
    for (const modelName of models) {
      try {
        console.log(`Trying model: ${modelName}`)
        
        const model = genAI.getGenerativeModel({ model: modelName })

        const result = await model.generateContent({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Please transcribe this audio and generate SRT format subtitle with timestamps. 
                         Break into segments of 2-5 seconds each.
                         Format: 
                         1
                         00:00:01,000 --> 00:00:04,000
                         Transcription text here`
                },
                {
                  inlineData: {
                    mimeType: file.type || 'audio/mpeg',
                    data: buffer.toString('base64')
                  }
                }
              ]
            }
          ]
        })

        const text = result.response.text()

        // Check if response contains valid SRT format
        if (text.includes('-->') && text.includes(':')) {
          return NextResponse.json({
            success: true,
            srt: text
          })
        } else {
          throw new Error('Invalid SRT format received')
        }

      } catch (error) {
        console.log(`Model ${modelName} failed:`, error.message)
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
