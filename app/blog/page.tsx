import PageHero from '@/components/ui/PageHero';
import BlogActions from '@/components/blog/BlogActions';
import BlogPostList from '@/components/blog/BlogPostList';
import { getPosts, getTags, getPostsCount } from './page.server';
import { Post, FormattedPost, Tag } from './shared';

const transformPost = (post: Post, activeTagSlug?: string): FormattedPost => {
  const allTags = post.tags || [];
  let primaryTag: Tag | undefined = undefined;
  let sortedTags = allTags;

  if (activeTagSlug) {
    primaryTag = allTags.find(t => t.slug === activeTagSlug);
    // If a tag is active, make it the first in the list
    if (primaryTag) {
      sortedTags = [primaryTag, ...allTags.filter(t => t.slug !== activeTagSlug)];
    }
  } else if (allTags.length > 0) {
    // If no tag is active, the first one is the default primary
    primaryTag = allTags[0];
  }

  return {
    ...post,
    date: formatDate(post.publishedAt),
    tags: sortedTags, // Pass the sorted array of tags
    primaryTag: primaryTag,
  };
};

// Helper function to format the date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage({ searchParams }: { searchParams: { tag?: string; search?: string } }) {
  const [initialPostsData, tags, postsCount] = await Promise.all([
    getPosts({ tag: searchParams.tag, search: searchParams.search, page: 0 }),
    getTags(),
    getPostsCount({ tag: searchParams.tag, search: searchParams.search }),
  ]);

  const formattedInitialPosts = initialPostsData.map(p => transformPost(p, searchParams.tag));

  // Define the server action, capturing the current search/filter params
  async function fetchMorePosts(page: number, params: { tag?: string; search?: string }) {
    "use server";
    const newPosts = await getPosts({ ...params, page });
    // Pass the active tag from the client to ensure correct highlighting on "Load More"
    return newPosts.map(p => transformPost(p, params.tag));
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
                  totalItems={postsCount}
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