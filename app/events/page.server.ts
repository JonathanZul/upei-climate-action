"use server";

import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';
import { PAST_EVENTS_PER_PAGE, type Event } from './shared';

export async function getUpcomingEvents(): Promise<Event[]> {
  const query = groq`*[_type == "event" && isUpcoming == true] | order(date asc) {
    _id,
    title,
    "date": date,
    location,
    description,
    "image": image,
    isUpcoming
  }`;
  return client.fetch(query, {}, { next: { tags: ['event'] } });
}

export async function getPastEvents(page: number): Promise<Event[]> {
  const start = page * PAST_EVENTS_PER_PAGE;
  const end = start + PAST_EVENTS_PER_PAGE;
  
  const query = groq`*[_type == "event" && isUpcoming != true] | order(date desc) [${start}...${end}] {
    _id,
    title,
    "date": date,
    location,
    description,
    "image": image,
    isUpcoming
  }`;
  return client.fetch(query, {}, { next: { tags: ['event'] } });
}