// app/blog/page.tsx
import PageHero from '@/components/ui/PageHero';
import BlogActions from '@/components/blog/BlogActions';
import BlogPostList from '@/components/blog/BlogPostList';
import { getPosts, getTags } from './page.server';
import { Post } from './shared';

const transformPost = (post: Post) => ({ ...post, date: formatDate(post.publishedAt), tag: 'Environment' });

// Helper function to format the date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage({ searchParams }: { searchParams: { tag?: string; search?: string } }) {
  const { tag, search } = searchParams;
  const [initialPostsData, tags] = await Promise.all([
    getPosts({ tag, search, page: 0 }),
    getTags(),
  ]);
  const formattedInitialPosts = initialPostsData.map(transformPost);

  // --- THE FIX IS HERE ---
  // Define the server action, capturing the current search/filter params
  async function fetchMorePosts(page: number) {
    "use server";
    const newPosts = await getPosts({ tag, search, page });
    return newPosts.map(transformPost);
  }

  return (
    <>
      <PageHero preTitle="Blog" title="Climate Conversations and More" imageUrl="/images/blog-hero.png" />
      <div className="bg-base-bg py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 lg:hidden"> <BlogActions tags={tags} /> </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <main className="lg:col-span-2">
              {formattedInitialPosts.length > 0 ? (
                // Pass the action down as a prop
                <BlogPostList 
                  initialItems={formattedInitialPosts}
                  fetchNextPage={fetchMorePosts}
                />
              ) : (
                <p>No posts found. Try a different filter or search term.</p>
              )}
            </main>
            <aside className="hidden lg:block"> <div className="sticky top-24"> <BlogActions tags={tags} /> </div> </aside>
          </div>
        </div>
      </div>
    </>
  );
}