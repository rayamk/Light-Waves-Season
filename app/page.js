'use client'

import { useState } from 'react'
import './globals.css'

export default function Home() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')
  const [srt, setSrt] = useState('')

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected) {
      setFile(selected)
      setStatus('')
      setSrt('')
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setStatus('❌ Please select a file first.')
      return
    }

    setStatus('⏳ Uploading and processing...')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        setSrt(data.srt)
        setStatus('✅ Subtitle generated successfully!')
      } else {
        setStatus('❌ ' + (data.error || 'Something went wrong.'))
      }
    } catch (error) {
      setStatus('❌ Network error. Please try again.')
    }
  }

  return (
    <div className="container">
      <h1>🎬 MP3/MP4 → SRT Subtitle</h1>
      <p style={{ color: '#aac7ff', marginBottom: '20px' }}>
        Upload your MP3 or MP4 file and get SRT subtitle file.
      </p>

      <div style={{
        border: '2px dashed #ffd700',
        borderRadius: '16px',
        padding: '40px 20px',
        marginBottom: '20px',
        background: 'rgba(255,215,0,0.05)'
      }}>
        <input
          type="file"
          accept=".mp3,.mp4,.wav,.m4a"
          onChange={handleFileChange}
          style={{ display: 'block', margin: '0 auto', color: 'white' }}
        />
        {file && (
          <p style={{ marginTop: '10px', color: '#ffd700' }}>
            📁 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      <button
        onClick={handleUpload}
        style={{
          padding: '14px 40px',
          borderRadius: '50px',
          border: 'none',
          background: '#ffd700',
          color: '#0a0a2a',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          cursor: 'pointer'
        }}
      >
        🚀 Generate Subtitle
      </button>

      {status && (
        <p style={{ marginTop: '20px', color: '#aac7ff' }}>{status}</p>
      )}

      {srt && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3 style={{ color: '#ffd700' }}>📝 SRT Subtitle</h3>
          <pre style={{
            background: '#1a1a4e',
            padding: '15px',
            borderRadius: '8px',
            color: '#cfdfff',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {srt}
          </pre>
          <button
            onClick={() => {
              const blob = new Blob([srt], { type: 'text/plain' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'subtitle.srt'
              a.click()
              URL.revokeObjectURL(url)
            }}
            style={{
              marginTop: '10px',
              padding: '10px 30px',
              borderRadius: '50px',
              border: 'none',
              background: '#ffd700',
              color: '#0a0a2a',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ⬇️ Download SRT
          </button>
        </div>
      )}

      <div style={{ marginTop: '40px', fontSize: '0.9rem', color: '#6688cc' }}>
        Supported: MP3, MP4, WAV, M4A
      </div>
    </div>
  )
          }
