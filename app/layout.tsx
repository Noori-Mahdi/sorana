import ContextProviders from '@/shared/context/ContextProvider/provider'
import './globals.css'
import Footer from '@/shared/ui/footer'
import Header from '@/shared/ui/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html dir="rtl" lang="fa" className="h-full">
      <body className="bg-bg-secondary text-gray-50">
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  )
}
