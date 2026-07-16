import 'app/globals.css'

export default function Home() {
  return (
    <div className="container">
      <div className="nav">
        <a href="/" className="active">🏠 Home</a>
        <a href="/about">ℹ️ About</a>
      </div>
      <h1>🌊 Light Waves</h1>
      <div className="sub">✦ Season 1 ✦</div>
      <div className="divider"></div>
      <p>
        ပြန်စပြီ။<br />
        တစ်ဆင့်ချင်း အောင်မယ်။<br />
        နောက်တစ်ဆင့်တက်မယ်။
      </p>
      <div className="status">✅ LIVE · Deployed on Vercel</div>
      <div className="footer">
        <span>⚡</span> rayamk · <span>✦</span> 2026
      </div>
    </div>
  )
}
