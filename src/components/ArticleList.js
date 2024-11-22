// components/ArticleList.js
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {useLocale, useTranslations} from 'next-intl';



export default function ArticleList({ articles, showMoreLink = true }) {
  const locale = useLocale();
  console.log('-----articles----')
  console.log(articles)
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tighter">Articles</h2>
        {showMoreLink && (
          <Link href={locale+"/articles"} className="text-blue-600 hover:text-blue-800 transition-colors">
            More articles →
          </Link>
        )}
      </div>
      <div className="space-y-6">
        {articles.map(({ id, title, description,fileName}) => (
          <Card key={id}>
            <CardHeader>
              <Link 
                href={`/${locale}/articles/${fileName}`}
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                <CardTitle>{title}</CardTitle>
                →
              </Link>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}