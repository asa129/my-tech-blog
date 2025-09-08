import { notFound } from "next/navigation";
import { posts } from "../../../../.velite";

interface PostProps {
  params: {
    slug: string;
  };
}

function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export default function PostPage({ params }: PostProps) {
  const post = getPostBySlug(params.slug);
  if (post == null) notFound();
  return (
    <article className="prose dark:prose-invert py-6">
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="mt-0 text-xl text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </article>
  );
}

export function generateMetadata({ params }: PostProps) {
  const post = getPostBySlug(params.slug);
  if (post == null) return {};
  return { title: post.title, description: post.description };
}

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}
