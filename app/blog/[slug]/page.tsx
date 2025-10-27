import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';
import { PortableText, PortableTextBlock, type PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { urlFor } from '@/lib/sanity';
import SanityImage from '@/components/ui/SanityImage';

// Define the shape of a single post
interface Post {
  title: string;
  author: string;
  publishedAt: string;
  image: object; // Sanity image object
  excerpt: string;
  body: PortableTextBlock[]; 
}

// Create the data fetching function for a single post
async function getPost(slug: string): Promise<Post | null> {
  const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    author,
    publishedAt,
    "image": mainImage,
    excerpt,
    body[]{
      ..., // Keep all existing properties of the block
      _type == "customImage" => {
        "asset": asset-> // Expand the asset reference to get full image data
      }
    }
  }`;
  return client.fetch(query, { slug }, { next: { tags: ['post', slug] } });
}

// Create the component to style the rich text
const ptComponents: PortableTextComponents = {
  types: {
    // This is the renderer for our 'customImage' object
    // This is the renderer for our 'customImage' object
    customImage: ({ value }) => {
      const asset = value.asset;
      if (!asset) return null;

      const dimensions = asset.metadata?.dimensions;
      const [width, height] = dimensions ? [dimensions.width, dimensions.height] : [800, 600];

      const src = urlFor(value).quality(80).auto('format')?.url();
      const alt = value.alt || 'Blog post image';
      return (
        <figure className="my-6">
          {src && (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-auto rounded-lg"
            />
          )}
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      // Basic styling for a code block. For syntax highlighting, a library like 'react-syntax-highlighter' would be needed.
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-gray-800 p-4">
          <code className="text-sm text-white">{value.code}</code>
        </pre>
      );
    },
  },
  block: {
    normal: ({ children }) => {
      // If the block has no children, it's an empty line.
      // Render a paragraph with a non-breaking space to give it height.
      if (children && (children as any[]).length === 1 && (children as any[])[0] === '') {
        return <p>&nbsp;</p>;
      }
      // Otherwise, render a normal paragraph with its content.
      return <p className="mb-4">{children}</p>;
    },
    h2: ({ children }) => <h2 className="mb-4 mt-8 font-montserrat text-3xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4 mt-6 font-montserrat text-2xl font-bold">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} target="_blank" rel={rel} className="text-blue-500 hover:underline">
          {children}
        </a>
      );
    },
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
  },
  listItem: {
    // Ex. 1: customizing common list item types
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
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
        <header className="mb-12 border-b-2 border-accent-bg pb-8">
          <h1 className="font-montserrat text-4xl font-bold text-tertiary sm:text-5xl">{post.title}</h1>
          <div className="mt-4 flex items-center space-x-2 text-sm text-tertiary">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </header>

        {post.image && (
          <SanityImage
            image={post.image}
            alt={`Main image for ${post.title}`}
            width={900}
            height={600}
            className="mb-12 h-auto w-full rounded-lg object-cover"
            priority
          />
        )}
        
        {/* --- 2. RENDER THE BODY WITH THE CUSTOM COMPONENTS --- */}
        <div className="prose prose-lg max-w-none font-nunito text-tertiary">
          <PortableText value={post.body} components={ptComponents} />
        </div>
      </div>
    </article>
  );
}
