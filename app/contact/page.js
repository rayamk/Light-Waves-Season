export const metadata = {
  title: 'Contact - Light Waves Season',
  description: 'Light Waves Season ကို ဆက်သွယ်ရန်',
}

export default function Contact() {
  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', padding: '50px', background: '#0a0a2a', color: 'white', minHeight: '100vh' }}>
      <h1>📬 Contact Us</h1>
      <p style={{ marginTop: '20px' }}>ဆက်သွယ်လိုပါက အောက်ပါလိပ်စာများသို့ ဆက်သွယ်ပါ။</p>
      <div style={{ marginTop: '30px', lineHeight: '2' }}>
        <p>📧 Email: <a href="mailto:rayamk@example.com" style={{ color: '#ffd700' }}>rayamk@example.com</a></p>
        <p>🐦 Twitter: <a href="#" style={{ color: '#ffd700' }}>@rayamk</a></p>
        <p>💬 Telegram: <a href="#" style={{ color: '#ffd700' }}>@rayamk</a></p>
      </div>
      <a href="/" style={{ display: 'inline-block', marginTop: '40px', color: '#aac7ff', textDecoration: 'none' }}>← ပြန်သွား</a>
    </div>
  )
}
