import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// စမ်းသုံးမယ့် Model စာရင်း (Google AI Studio မှ ရနိုင်သော နာမည်များ)
const models = [
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.1-pro',
  'gemini-3-flash'
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
        continue
      }
    }

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
