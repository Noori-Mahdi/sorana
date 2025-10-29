import Container from '@/shared/components/container'
import Image from 'next/image'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Container className="diagonal-gradient-soft flex min-h-screen w-full items-center justify-center p-3">
      <Container className="bg-bg-primary/80 border-primary-900 h-full w-full rounded-xl border-2 p-8 backdrop-blur-md md:w-1/2 md:p-10">
        {children}
      </Container>
    </Container>
  )
}
