import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

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

    // File ကို Buffer ပြောင်းမယ်
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Gemini ကို ခေါ်မယ်
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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

    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      success: true,
      srt: text
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to transcribe audio: ' + error.message },
      { status: 500 }
    )
  }
}
