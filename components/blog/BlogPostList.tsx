// components/blog/BlogPostList.tsx
"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LoadMore from '@/components/ui/LoadMore';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { POSTS_PER_PAGE, type FormattedPost } from '@/app/blog/shared';

// Update the props to accept the server action
type BlogPostListProps = {
  initialItems: FormattedPost[];
  fetchNextPage: (page: number, params: { tag?: string; search?: string }) => Promise<FormattedPost[]>;
  totalItems: number;
};

export default function BlogPostList({ initialItems, fetchNextPage, totalItems }: BlogPostListProps) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [syncedItems, setSyncedItems] = useState(initialItems);
  const searchParams = useSearchParams();

  // Reset pagination when the server sends a new first page (the filter or search
  // changed). Done during render rather than in an effect: React applies it before
  // painting, so there is no frame showing the previous filter's results. This is the
  // pattern React documents for adjusting state when a prop changes, and it satisfies
  // react-hooks/set-state-in-effect, which eslint-config-next 16 enables.
  if (initialItems !== syncedItems) {
    setSyncedItems(initialItems);
    setItems(initialItems);
    setPage(1);
  }

  const loadMoreItems = async () => {
    setIsLoading(true);
    const tag = searchParams.get('tag') || undefined;
    const search = searchParams.get('search') || undefined;

    const newItems = await fetchNextPage(page, { tag, search });
    
    if (newItems.length > 0) {
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
    }
    setIsLoading(false);
  };

  const hasMoreItems = items.length < totalItems;
  
  return (
    <LoadMore
      items={items}
      renderItem={(post) => <BlogPostCard {...post} image={post.image ?? {}} />}
      onLoadMore={loadMoreItems}
      isLoading={isLoading}
      hasMore={hasMoreItems}
      itemsPerPage={POSTS_PER_PAGE}
    />
  );
}