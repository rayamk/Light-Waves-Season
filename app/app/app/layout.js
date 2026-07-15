export const metadata = {
    title: 'Light Waves Season',
    description: 'တစ်ဆင့်ချင်း အောင်မယ်။ နောက်တစ်ဆင့်တက်မယ်။',
}

export default function RootLayout({ children }) {
    return (
        <html lang="my">
            <body>{children}</body>
        </html>
    )
}
