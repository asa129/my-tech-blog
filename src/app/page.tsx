import { Button } from "@/components/ui/button";
import Image from "next/image";
import { posts } from "../../.velite";
import Link from "next/link";

type all_data = {
  title: string;
  key: string;
  url: string;
  image_url: string;
  description: string | undefined;
  updated_at: string;
};

export default async function Home() {
  // QiitaApi 取得
  const res = await fetch("http://localhost:3000/api/qiita");
  const qiita_data = await res.json();
  console.log(qiita_data);

  // Qiitaデータを表示用に変換
  const all_data: all_data[] = [];
  qiita_data.map((qiita: any) => {
    all_data.push({
      title: qiita.title,
      key: qiita.id,
      url: qiita.url,
      image_url: "",
      description: qiita.body.substring(0, 100).concat("．．．"),
      updated_at: qiita.updated_at,
    });
  });

  // postsデータを表示用に変換
  posts.map((post) => {
    all_data.push({
      title: post.title,
      key: post.slug,
      url: `/blog/${post.slug}`,
      image_url: post.cover?.src || "",
      description: post.description,
      updated_at: post.updated,
    });
  });

  // 日付順に並び替え
  all_data.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Button>Button</Button>
        <h1>Blog🫠</h1>
        <p>日々の出来事をつらつらと書く</p>
        <hr />
        {all_data != null &&
          all_data.map((data) => {
            return (
              <article key={data.key} className="border-2 rounded p-4">
                <h1>{data.title}</h1>
                <Link href={data.url} target="_blank">
                  <Image
                    src={data.image_url}
                    alt={data.title}
                    width={800}
                    height={600}
                  />
                </Link>
                <p>{data.description}</p>
                <p>{data.updated_at}</p>
              </article>
            );
          })}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
