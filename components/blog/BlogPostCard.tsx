import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';
import { urlFor } from '@/lib/sanity';
import {type Tag} from '@/app/blog/shared'

export type BlogPostCardProps = {
  _id: string;
  title: string;
  author: string;
  date: string;
  image: object; // Sanity image object
  excerpt: string;
  slug: string; // The URL slug
  tags: Tag[]; 
  primaryTag?: Tag; // The tag to highlight
};

export default function BlogPostCard({
  title,
  author,
  date,
  image,
  excerpt,
  slug,
  tags,
  primaryTag,
}: BlogPostCardProps) {
  const postUrl = `/blog/${slug}`;

  return (
    <article className="flex flex-col gap-6 border-b-2 border-accent-bg pb-8 sm:flex-row">
      <div className="w-full sm:w-1/3">
        <Image
          src={urlFor(image).width(600).height(400).quality(70).url()}
          alt={`Image for ${title}`}
          width={300}
          height={200}
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div className="flex w-full flex-col sm:w-2/3">
        {/* Tag Rendering Logic */}
        <div className="relative mb-2 flex h-6 flex-wrap items-center gap-2 overflow-hidden">
          {tags?.map((tag) => {
            const isPrimary = tag._id === primaryTag?._id;
            return (
              <Link
                key={tag._id}
                href={`/blog?tag=${tag.slug}`}
                className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase transition-colors
                  ${isPrimary
                    ? 'bg-primary text-white-text hover:bg-primary/80'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`
                }
              >
                {tag.title}
              </Link>
            );
          })}
        </div>

        <div className="mb-2 flex items-center space-x-2 text-sm text-tertiary">
          <span>By {author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>

        <h2 className="mb-4 font-poppins text-2xl font-bold text-tertiary">
          <Link href={postUrl} className="hover:text-primary">
            {title}
          </Link>
        </h2>
        <p className="mb-4 font-nunito text-base text-tertiary">{excerpt}</p>
        <Link
          href={postUrl}
          className="mt-auto inline-flex items-center font-poppins font-semibold text-primary hover:underline"
        >
          Continue Reading <HiArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}