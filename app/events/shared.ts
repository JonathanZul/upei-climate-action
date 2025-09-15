// app/events/shared.ts

// This file contains constants and types shared between server and client components for events.

export const PAST_EVENTS_PER_PAGE = 5;

// We can also move the shared interface here
export interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  image: object;
  isUpcoming: boolean;
}

export interface Tag {
  _id: string;
  title: string;
  slug: string;
}

export interface FormattedEvent {
  _id: string;
  month: string;
  day: string;
  title: string;
  description: string;
  location: string;
  time: string;
  image?: object | null;
  isUpcoming: boolean;
}