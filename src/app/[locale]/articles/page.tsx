import { getAllArticlesData } from "@/lib/mdx";
import ArticleList from '@/components/ArticleList'

export const metadata = {
  title: 'blog',
  description: 'blog description.',
};


export default async function IndexPage(props:any) {
  console.log(props.params.locale)
  const allArticlesData = getAllArticlesData(props.params.locale);
  const sortedArticles = allArticlesData.sort((a, b) => {
      // 将日期字符串转换为日期对象
      const dateA = new Date(a.frontmatter.createdAt).getTime();
      const dateB = new Date(b.frontmatter.createdAt).getTime();

      // 比较日期，返回值决定排序
      return dateB - dateA; // 倒序排序
  });
  return (
      <div className="container mx-auto py-12">
      <ArticleList articles={allArticlesData} showMoreLink={false} />

      </div>

  );
}
