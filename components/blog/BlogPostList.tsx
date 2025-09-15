// components/blog/BlogPostList.tsx
"use client";

import LoadMore from '@/components/ui/LoadMore';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { POSTS_PER_PAGE, type FormattedPost } from '@/app/blog/shared';

// Update the props to accept the server action
type BlogPostListProps = {
  initialItems: FormattedPost[];
  fetchNextPage: (page: number) => Promise<FormattedPost[]>;
};

export default function BlogPostList({ initialItems, fetchNextPage }: BlogPostListProps) {
  return (
    <LoadMore
      initialItems={initialItems}
      fetchNextPage={fetchNextPage}
      renderItem={(post) => <BlogPostCard {...post} image={post.image ?? {}} />}
      itemsPerPage={POSTS_PER_PAGE}
    />
  );
}