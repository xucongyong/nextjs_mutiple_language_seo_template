import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {routing} from '@/i18n/routing';


// pages/index.js
import fs from 'fs'
import path from 'path'
import { getSortedPostsData } from '@/lib/posts'
import ResourceList from '@/components/ResourceList'
import ArticleList from '@/components/ArticleList'
import { Metadata } from 'next'
import {setRequestLocale} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'GitBase - Open Source Dynamic Website CMS Without Database',
  description: 'A Next.js site with Tailwind & Shadcn/UI, using GitHub API for content management. No database needed for dynamic updates.',
}




export default function IndexPage({params}: {params: any}) {
  const t = useTranslations('HomePage');
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'resources.json')
  const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'))
  const allPostsData = getSortedPostsData().slice(0, 6)
  setRequestLocale(params.locale);
  // const allArticlesData =await getAllArticlesData(params.locale);
  
  // console.log(allArticlesData);
  return (
    
    <div className="flex flex-col items-center justify-center mx-auto">
        

        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        {t('title')}
        </h1>
        <Link href="/about">{t('about')}</Link>
      </section>

        {/* Advertisement */}
        <div className="flex flex-col items-center justify-center mx-auto"><p className="w-full text-xs text-center bg-orange-400">Advertisement</p><div id="container-a35f8e12de9740943fbb638f7641c67e" className="ad-container w-full"></div></div>
    <div className="flex items-center justify-center">

  <iframe 
    src="https://g.sprinkleincredibox.com/web-game/SprinkleIncredibox/index.html" 
    width="600"
    height="400"
    title="SprinkleIncredibox"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  ></iframe>
  </div>
      {/* Advertisement */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block"><div className="flex flex-col items-center justify-center w-full max-w-[160px] mx-auto"><p className="w-full text-xs text-center bg-orange-400">Advertisement</p><div id="atContainer-726161fd68625f21c341302b30942598" className="ad-container w-full"></div></div></div>
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block"><div className="flex flex-col items-center justify-center w-full max-w-[160px] mx-auto"><p className="w-full text-xs text-center bg-orange-400">Advertisement</p><div id="atContainer-70cc2565969ac70688958763bfeefd60" className="ad-container w-full"></div></div></div>
      <div className="flex flex-col items-center justify-center mx-auto"><p className="w-full text-xs text-center bg-orange-400">Advertisement</p><div id="container-a35f8e12de9740943fbb638f7641c67e" className="ad-container w-full"></div></div>
   
      <ArticleList articles={allPostsData} />
      <ResourceList resources={resources} />
    </div>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}