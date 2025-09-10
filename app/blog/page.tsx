import PageHero from '@/components/ui/PageHero';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';

// Define the shape of the post data
interface Post {
  _id: string;
  title: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  excerpt: string;
  slug: string;
  // We'll add tags properly later. For now, we just need the fields.
}

// Create the data fetching function
async function getPosts(): Promise<Post[]> {
  // Query for all posts, ordered by publish date
  const query = groq`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    author,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    excerpt,
    "slug": slug.current
  }`;
  return client.fetch(query);
}

// Helper function to format the date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  // Transform posts to match BlogPostCardProps
  const formattedPosts = posts.map((post) => ({
    ...post,
    date: formatDate(post.publishedAt),
    tag: 'Environment', // Hardcode a tag for now
  }));


  return (
    <>
      <PageHero
        preTitle="Blog"
        title="Climate Conversations and More"
        imageUrl="/images/blog-hero.png"
      />

      <div className="bg-base-bg py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-3">
          {/* Main Content: Blog Posts */}
          <main className="lg:col-span-2">
            <div className="space-y-12">
              {formattedPosts.map((post) => (
                <BlogPostCard
                  key={post._id}
                  {...post}
                />
              ))}
            </div>
          </main>

          {/* Sidebar (still static) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Blogs"
                  className="w-full rounded-md border-gray-300 py-2 pl-10 pr-4 focus:border-primary focus:bg-primary focus:text-white-text focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Tag Filter */}
              <div className="relative">
                <button
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-left flex justify-between items-center"
                  aria-expanded="false"
                  aria-haspopup="listbox"
                  aria-controls="tag-dropdown-menu"
                >
                  <span>Search By Tag</span>
                  <FaChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}