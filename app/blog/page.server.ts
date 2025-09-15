"use server";

import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';
import { POSTS_PER_PAGE, type Post, type Tag, type FormattedPost } from './shared'

// Create the data fetching function
export async function getPosts({ tag, search, page }: { tag?: string; search?: string, page: number }): 
Promise<Post[]> {
  const start = page * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  let filters = ['_type == "post"'];
  let params: Record<string, any> = {};

  if (tag) {
    filters.push('references(*[_type=="tag" && slug.current == $tag]._id)');
    params.tag = tag;
  }
  
  if (search) {
    filters.push('(title match $search || excerpt match $search || pt::text(body) match $search)');
    // Escape GROQ special characters in the search string
    const escapeGROQ = (str: string) => str.replace(/([*?^$[\]\\(){}|.])/g, '\\$1');
    params.search = `*${escapeGROQ(search)}*`; // Use wildcard matching with escaped input
  }

  const query = groq`*[${filters.join(' && ')}] | order(publishedAt desc) [${start}...${end}] {
    _id, 
    title, 
    author, 
    publishedAt,
    "image": mainImage,
    excerpt, 
    "slug": slug.current
  }`;

  return client.fetch(query, params);
}

// Fetch all tags for the sidebar
export async function getTags(): Promise<Tag[]> {
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