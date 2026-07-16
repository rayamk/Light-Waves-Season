import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const models = [
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.1-pro',
  'gemini-3-flash',
  'gemini-2.0-flash-exp',
  'gemini-1.5-pro',
  'gemini-pro'
]

const languageNames = {
  'my': 'Burmese (မြန်မာ)',
  'en': 'English',
  'th': 'Thai (ไทย)',
  'zh': 'Chinese (中文)',
  'ja': 'Japanese (日本語)',
  'ko': 'Korean (한국어)',
  'hi': 'Hindi (हिन्दी)',
  'fr': 'French',
  'de': 'German',
  'es': 'Spanish'
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const language = formData.get('language') || 'my'

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (file.size > 4.5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Max 4.5MB.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const prompt = `Please transcribe this audio accurately and generate SRT subtitle file.

Instructions:
1. Listen carefully and transcribe exactly what is spoken
2. Break into segments of 2-5 seconds each
3. Use proper punctuation and capitalization
4. If unsure about a word, make your best guess
5. Output in standard SRT format:

1
00:00:01,000 --> 00:00:04,000
Transcription text here

Language: ${languageNames[language] || 'Burmese'}
Audio file attached below.`

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
                  text: prompt
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
