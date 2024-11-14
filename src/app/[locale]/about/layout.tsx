import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'GitBase',
    template: '%s | GitBase'
  },
  description: 'Open source dynamic website without database, built with Next.js and GitHub API',
}



export default async function LocaleLayout({children, params: {locale}}: {
    children: React.ReactNode;
    params: {locale: string};
  }) {
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
      notFound();
    }
   
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();
   
    return (
      <html lang={locale}>
          <body className={inter.className}>
          <NextIntlClientProvider messages={messages}>
           <Layout>{children}</Layout>
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }