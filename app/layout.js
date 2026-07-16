import './globals.css'

export const metadata = {
  title: '🎬 MP3/MP4 → SRT Subtitle Generator',
  description: 'Upload your MP3 or MP4 file and get SRT subtitle file.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="my">
      <body>{children}</body>
    </html>
  )
}
