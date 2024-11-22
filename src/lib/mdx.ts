
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from 'remark'
import html from 'remark-html'

const articlesDirectory = path.join(process.cwd(), "src/app/_articles");
const webContentDirectory = path.join(process.cwd(), "src/app/_contents");

// 获取 MDX/MD 原始数据
export function getMdxRawData(fileName: string, lang: string, hasSuffix: boolean) {
    let fullPath = path.join(articlesDirectory, lang, `${fileName}`);
    let suffix = hasSuffix // 判断是否有后缀，没有的话就加上后缀
        ? ""
        : fs.existsSync(`${fullPath}.mdx`)
            ? ".mdx"
            : ".md";
    const fileContents = fs.readFileSync(`${fullPath}${suffix}`, "utf8");
    return fileContents;
}

// 处理 MDX/MD 原始数据中的 frontmatter
export function getMdxFrontmatter(mdxRawData: string) {
    const { content, data } = matter(mdxRawData);
    const matterResult = matter(mdxRawData);

    return {
        content,
        frontmatter: data,
        readingTime: readingTime(content).text, // 计算阅读时间
        title: matterResult.data.title,
        description: matterResult.data.description,
        date: matterResult.data.date,
        // ... any other fields you want to include
      };
}

// 获取文章的所有信息
export function getArticlesData(fileName: string, lang: string, hasSuffix = false) {
    return {
        ...getMdxFrontmatter(getMdxRawData(fileName, lang, hasSuffix)),
        fileName: fileName.split(".").slice(0, -1).join("."), // 去除后缀
    };
}

// 获取 _articles 目录下的所有文章
export function getAllArticlesData(lang: string) {
    const fileNames = fs.readdirSync(articlesDirectory + "/" + lang);
    const allArticlesData = fileNames.map((fileName) => {
        return getArticlesData(fileName, lang,true);
    });
    return allArticlesData;
}



export async function getPostData(locale: string, slug: string) {
    let fullPath = path.join(articlesDirectory, locale, `${slug}`);
    let suffix = false // 判断是否有后缀，没有的话就加上后缀
        ? ""
        : fs.existsSync(`${fullPath}.mdx`)
            ? ".mdx"
            : ".md";
    const fileContents = fs.readFileSync(`${fullPath}${suffix}`, "utf8");
    // const fullPath = path.join(articlesDirectory,locale, `${slug}.mdx`);
    // const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
  
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
  
    // Combine the data with the id and contentHtml
    return {
      slug,
      contentHtml,
      title: matterResult.data.title,
      description: matterResult.data.description,
      date: matterResult.data.date,
      // ... any other fields you want to include
    };
  }
  