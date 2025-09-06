import PageHero from '@/components/ui/PageHero';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

const mockPosts = [
  {
    tag: 'Environment', author: 'John Smith', date: 'Sep 11, 2024',
    title: 'Lorem ipsum dolor sit amet non nunc aliquet.',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa sit amet, consectetur adipiscing elit. Vivamus etia...',
    imageUrl: '/images/placeholder.svg',
    postUrl: '#',
  },
  {
    tag: 'Advocacy', author: 'Jane Doe', date: 'Sep 9, 2024',
    title: 'Vivamus etiam mattis non nunc aliquet.',
    excerpt: 'Consectetur adipiscing elit. Massa sit amet, consectetur adipiscing elit. Vivamus etia Lorem ipsum dolor sit amet...',
    imageUrl: '/images/placeholder.svg',
    postUrl: '#',
  },
  {
    tag: 'Policy', author: 'Alex Green', date: 'Sep 7, 2024',
    title: 'Policy changes and their impact on climate.',
    excerpt: 'Explore how recent policy changes are affecting climate action and what it means for the future.',
    imageUrl: '/images/placeholder.svg',
    postUrl: '#',
  },
  {
    tag: 'Science', author: 'Maria Lopez', date: 'Sep 5, 2024',
    title: 'The science behind global warming explained.',
    excerpt: 'A deep dive into the scientific principles driving global warming and what we can do to mitigate its effects.',
    imageUrl: '/images/placeholder.svg',
    postUrl: '#',
  },
];

export default function BlogPage() {
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
              {mockPosts.map((post) => (
                <BlogPostCard key={post.title} {...post} />
              ))}
            </div>
          </main>

          {/* Sidebar */}
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