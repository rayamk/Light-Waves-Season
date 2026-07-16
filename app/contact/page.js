'use client'

import { useState } from 'react'

export const metadata = {
  title: 'Contact - Light Waves Season',
  description: 'Light Waves Season ကို ဆက်သွယ်ရန်',
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    
    // Vercel API endpoint ကို ခေါ်မယ် (နောက်အဆင့်မှာ ထည့်မယ်)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('✅ Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('❌ Something went wrong. Please try again.')
      }
    } catch {
      setStatus('❌ Network error. Please try again.')
    }
  }

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', padding: '50px', background: '#0a0a2a', color: 'white', minHeight: '100vh' }}>
      <h1>📬 Contact Us</h1>
      <p style={{ marginTop: '10px', color: '#aac7ff' }}>အောက်ပါ Form ကိုဖြည့်ပြီး ဆက်သွယ်ပါ။</p>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#1a1a4e', color: 'white' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#1a1a4e', color: 'white' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#1a1a4e', color: 'white' }}
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#ffd700', color: '#0a0a2a', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
        >
          Send Message
        </button>
      </form>
      
      {status && <p style={{ marginTop: '15px' }}>{status}</p>}
      
      <a href="/" style={{ display: 'inline-block', marginTop: '20px', color: '#aac7ff', textDecoration: 'none' }}>← ပြန်သွား</a>
    </div>
  )
}
