'use client'

import { useState } from 'react'
import './globals.css'

const MAX_FILE_SIZE = 4.5 * 1024 * 1024 // 4.5MB

export default function Home() {
  const [file, setFile] = useState(null)
  const [language, setLanguage] = useState('my')
  const [status, setStatus] = useState('')
  const [srt, setSrt] = useState('')

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected) {
      if (selected.size > MAX_FILE_SIZE) {
        setStatus('❌ File too large. Max 4.5MB.')
        setFile(null)
        return
      }
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
    formData.append('language', language)

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
      {/* Logo & App Name */}
      <div className="logo-container">
        <span className="logo-icon">🌊</span>
        <div>
          <div className="app-name">WaveSub</div>
          <div className="app-subtitle">✦ Audio to SRT ✦</div>
        </div>
      </div>

      <div className="divider"></div>

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

      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: '#aac7ff', marginRight: '10px' }}>🌐 Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #ffd700',
            background: '#1a1a4e',
            color: 'white',
            fontSize: '1rem'
          }}
        >
          <option value="my">🇲🇲 မြန်မာ</option>
          <option value="en">🇬🇧 English</option>
          <option value="th">🇹🇭 ไทย</option>
          <option value="zh">🇨🇳 中文</option>
          <option value="ja">🇯🇵 日本語</option>
          <option value="ko">🇰🇷 한국어</option>
          <option value="hi">🇮🇳 हिन्दी</option>
          <option value="fr">🇫🇷 French</option>
          <option value="de">🇩🇪 German</option>
          <option value="es">🇪🇸 Spanish</option>
        </select>
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
        Supported: MP3, MP4, WAV, M4A (Max 4.5MB)
      </div>

      <div className="footer">
        <span>⚡</span> WaveSub · <span>✦</span> 2026
      </div>
    </div>
  )
            }
