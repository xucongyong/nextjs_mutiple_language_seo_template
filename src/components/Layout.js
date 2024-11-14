// components/Layout.js
import { Navigation } from './Navigation'
import { Footer } from '@/components/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9548635931783170" crossOrigin="anonymous"></script> */}
    </div>
  )
}