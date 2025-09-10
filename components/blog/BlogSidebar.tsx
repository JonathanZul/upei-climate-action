"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';

// Define the shape of a tag object
type Tag = {
  _id: string;
  title: string;
  slug: string;
};

// Define the props for the component
type BlogSidebarProps = {
  tags: Tag[];
};

export default function BlogSidebar({ tags }: BlogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    router.push(`/blog?${params.toString()}`);
  };

  const activeTagSlug = searchParams.get('tag');

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Blogs"
              className="w-full rounded-md border-gray-300 py-2 pl-10 pr-4 focus:border-primary focus:bg-primary focus:text-white-text focus:outline-none"
            />
            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </form>

        {/* Tag Filter */}
        <div className="relative">
          <button
            onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
            className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white py-2 px-4 text-left"
          >
            <span>{activeTagSlug ? tags.find(t => t.slug === activeTagSlug)?.title : 'Search By Tag'}</span>
            <FaChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isTagDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isTagDropdownOpen && (
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <Link href="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Posts</Link>
                </li>
                {tags.map((tag) => (
                  <li key={tag._id}>
                    <Link
                      href={`/blog?tag=${tag.slug}`}
                      className={`block px-4 py-2 text-sm ${activeTagSlug === tag.slug ? 'font-bold text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {tag.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}