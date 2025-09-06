import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';

type BlogPostCardProps = {
  tag: string;
  author: string;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  postUrl: string;
};

export default function BlogPostCard({
  tag,
  author,
  date,
  title,
  excerpt,
  imageUrl,
  postUrl,
}: BlogPostCardProps) {
  return (
    <article className="flex flex-col gap-6 border-b-2 border-accent-bg pb-8 sm:flex-row">
      <div className="w-full sm:w-1/3">
        <Image
          src={imageUrl}
          alt={`Image for ${title}`}
          width={300}
          height={200}
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div className="flex w-full flex-col sm:w-2/3">
        <div className="mb-2">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase text-white-text">
            {tag}
          </span>
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