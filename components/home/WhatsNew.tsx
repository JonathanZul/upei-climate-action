import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { type FormattedPost } from '@/app/blog/shared';

type WhatsNewProps = {
  posts: FormattedPost[];
};

export default function WhatsNew({ posts }: WhatsNewProps) {
 // Separate the first post as featured and the rest as smaller posts
  const [featuredPost, ...otherPosts] = posts;

  return (
    <section className="bg-base-bg py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-montserrat text-3xl font-medium tracking-wide text-tertiary sm:text-4xl">
          What&apos;s New
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Featured Post */}
          {featuredPost && (
            <div className="flex flex-col gap-3">
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className='aspect-[3/2] relative'>
                  <Image
                    src={
                      featuredPost.image
                        ? urlFor(featuredPost.image).width(1000).height(600).quality(80).url()
                        : '/placeholder-image.jpg'
                    }
                    alt={`Image for ${featuredPost.title}`}
                    fill
                    sizes='(max-width: 640px) 100vw, 33vw'
                    className="object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <p className="font-nunito text-sm font-semibold uppercase tracking-wider text-secondary">
                {featuredPost.date}
              </p>
              <h3 className="font-poppins text-xl font-bold text-tertiary">
                <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary">
                  {featuredPost.title}
                </Link>
              </h3>
            </div>
          )}

          {/* Right Column: Smaller Posts & Button */}
          <div className="flex flex-col justify-between gap-12">
            <div className="flex flex-col gap-10">
            {otherPosts.map((post) => (
                <div key={post._id} className="flex flex-col gap-3">
                  <p className="font-nunito text-sm font-semibold uppercase tracking-wider text-secondary">
                    {post.date}
                  </p>
                  <h3 className="font-poppins text-xl font-bold text-tertiary">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </h3>
                </div>
              ))}
            </div>
            <div className="text-center lg:text-left flex items-center justify-center">
              <Link
                href="/blog"
                className="inline-block rounded-full bg-primary px-6 py-3 font-nunito text-base text-white-text shadow-md transition-transform duration-200 hover:scale-105"
              >
                See more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

