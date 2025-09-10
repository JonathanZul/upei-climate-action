import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Define the shape of a single post
interface Post {
  title: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  excerpt: string;
  body: any[]; // Portable Text is a complex array
}

// Create the data fetching function for a single post
async function getPost(slug: string): Promise<Post | null> {
  const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    author,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    excerpt,
    body
  }`;
  return client.fetch(query, { slug });
}

// Create the component to style the rich text
const ptComponents = {
  types: {
    // You can add custom components here if you extend the schema
  },
  block: {
    h2: ({ children }: any) => <h2 className="mb-4 mt-8 font-montserrat text-3xl font-bold">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mb-4 mt-6 font-montserrat text-2xl font-bold">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>,
  },
  marks: {
    // Can add custom marks here
  },
};

// Generate dynamic metadata for SEO
type Props = { params: { slug: string } };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return { title: 'Not Found' };
  }
  return {
    title: `${post.title} | Climate Action Association`,
    description: post.excerpt,
  };
}

// The main page component
export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  // Handle case where post is not found
  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-base-bg py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <header className="mb-12 border-b-2 border-accent-bg pb-8">
          <h1 className="font-montserrat text-4xl font-bold text-tertiary sm:text-5xl">{post.title}</h1>
          <div className="mt-4 flex items-center space-x-2 text-sm text-tertiary">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </header>

        {/* Main Image */}
        <Image
          src={post.imageUrl}
          alt={`Main image for ${post.title}`}
          width={800}
          height={450}
          className="mb-12 h-auto w-full rounded-md object-cover"
          priority
        />

        {/* Body Content */}
        <div className="prose prose-lg max-w-none font-nunito text-tertiary">
          <PortableText value={post.body} components={ptComponents} />
        </div>
      </div>
    </article>
  );
}
