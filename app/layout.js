import './globals.css'

export const metadata = {
  title: 'Light Waves Season',
  description: 'တစ်ဆင့်ချင်း အောင်မယ်။ နောက်တစ်ဆင့်တက်မယ်။',
  keywords: 'Light Waves, Season, Next.js, Vercel',
  authors: [{ name: 'rayamk' }],
  openGraph: {
    title: 'Light Waves Season',
    description: 'တစ်ဆင့်ချင်း အောင်မယ်။ နောက်တစ်ဆင့်တက်မယ်။',
    url: 'https://light-waves-season.vercel.app',
    siteName: 'Light Waves Season',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'my_MM',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="my">
      <body>{children}</body>
    </html>
  )
}
