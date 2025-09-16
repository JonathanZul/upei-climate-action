"use server";

import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';
import { POSTS_PER_PAGE, type Post, type Tag } from './shared'

// Create the data fetching function
export async function getPosts({ tag, search, page }: { tag?: string; search?: string, page: number }): 
Promise<Post[]> {
  const start = page * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const filters = ['_type == "post"'];
  const params: Record<string, string> = {};

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
    "slug": slug.current,
    "tags": tags[]->{ _id, title, "slug": slug.current }
  }`;

  return client.fetch(query, params, { next: { tags: ['post'] } });
}

// Fetch all tags for the sidebar
export async function getTags(): Promise<Tag[]> {
  const query = groq`*[_type == "tag"] | order(title asc) {
    _id, title, "slug": slug.current
  }`;
  return client.fetch(query, {}, { next: { tags: ['tag', 'post'] } }); // Tags are part of the post page
}

// Get total count of posts for pagination
export async function getPostsCount({ tag, search }: { tag?: string; search?: string }): Promise<number> {
  const filters = ['_type == "post"'];
  const params: Record<string, string> = {};

  if (tag) {
    filters.push('references(*[_type=="tag" && slug.current == $tag]._id)');
    params.tag = tag;
  }
  if (search) {
    filters.push('(title match $search || excerpt match $search || pt::text(body) match $search)');
    params.search = `*${search}*`;
  }

  const query = groq`count(*[${filters.join(' && ')}])`;
  return client.fetch(query, params, { next: { tags: ['post'] } });
}