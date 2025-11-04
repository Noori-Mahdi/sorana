import ContextProviders from '@/shared/context/ContextProvider/provider'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html dir="rtl" lang="fa">
      <body className="bg-bg-secondary h-screen overflow-hidden text-gray-50">
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  )
}
