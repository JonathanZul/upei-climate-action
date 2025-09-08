import { createClient } from 'next-sanity'

// --- 1. Read the environment variables ---
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2023-05-03' // Use a fixed API version for consistency

// --- 2. Create and export the Sanity client ---
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` if you want to ensure fresh data
})