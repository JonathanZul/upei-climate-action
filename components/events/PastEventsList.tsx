// components/events/PastEventsList.tsx
"use client";

import LoadMore from '@/components/ui/LoadMore';
import EventCard from '@/components/ui/EventCard';
import { PAST_EVENTS_PER_PAGE, type FormattedEvent } from '@/app/events/shared';

// Update the props to accept the server action
type PastEventsListProps = {
  initialItems: FormattedEvent[];
  fetchNextPage: (page: number) => Promise<FormattedEvent[]>;
};

export default function PastEventsList({ initialItems, fetchNextPage }: PastEventsListProps) {
  return (
    <LoadMore
      initialItems={initialItems}
      // Pass the server action prop directly to LoadMore
      fetchNextPage={fetchNextPage}
      renderItem={(event) => <EventCard {...event} white_text={true} />}
      itemsPerPage={PAST_EVENTS_PER_PAGE}
    />
  );
}