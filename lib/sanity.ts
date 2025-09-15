import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// --- 1. Read the environment variables ---
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = '2023-05-03' // Use a fixed API version for consistency

if (!projectId) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID');
}
if (!dataset) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SANITY_DATASET');
}
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` if you want to ensure fresh data
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}