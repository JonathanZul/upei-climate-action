import PageHero from '@/components/ui/PageHero';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
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
}

interface Tag {
  _id: string;
  title: string;
  slug: string;
}

// Create the data fetching function
async function getPosts({ tag, search }: { tag?: string; search?: string }): Promise<Post[]> {
  let filters = ['_type == "post"'];
  let params: Record<string, any> = {};

  if (tag) {
    filters.push('references(*[_type=="tag" && slug.current == $tag]._id)');
    params.tag = tag;
  }
  
  if (search) {
    filters.push('(title match $search || excerpt match $search || pt::text(body) match $search)');
    params.search = `*${search}*`; // Use wildcard matching
  }

  const query = groq`*[${filters.join(' && ')}] | order(publishedAt desc) {
    _id, title, author, publishedAt,
    "imageUrl": mainImage.asset->url,
    excerpt, "slug": slug.current
  }`;

  return client.fetch(query, params);
}

// Fetch all tags for the sidebar
async function getTags(): Promise<Tag[]> {
  const query = groq`*[_type == "tag"] | order(title asc) {
    _id, title, "slug": slug.current
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

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: { tag?: string; search?: string } 
}) {
  // Extract query parameters
  const { tag, search } = searchParams;

  // Fetch posts and tags in parallel
  const [posts, tags] = await Promise.all([
    getPosts({ tag, search }),
    getTags(),
  ]);

  // Transform posts to match BlogPostCardProps
  const formattedPosts = posts.map((post) => ({
    ...post,
    date: formatDate(post.publishedAt),
    tag: 'Environment', // This is now just a placeholder
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
          {formattedPosts.length > 0 ? (
              <div className="space-y-12">
                {formattedPosts.map((post) => (
                  <BlogPostCard key={post._id} {...post} />
                ))}
              </div>
            ) : (
              <p>No posts found. Try a different filter or search term.</p>
            )}
          </main>

          <BlogSidebar tags={tags} />
        </div>
      </div>
    </>
  );
}