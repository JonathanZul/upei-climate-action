// components/events/PastEventsList.tsx
"use client";

import { useState, useEffect } from 'react';
import LoadMore from '@/components/ui/LoadMore';
import EventCard from '@/components/ui/EventCard';
import { PAST_EVENTS_PER_PAGE, type FormattedEvent } from '@/app/events/shared';

// Update the props to accept the server action
type PastEventsListProps = {
  initialItems: FormattedEvent[];
  fetchNextPage: (page: number) => Promise<FormattedEvent[]>;
  totalItems: number;
};

export default function PastEventsList({ initialItems, fetchNextPage, totalItems }: PastEventsListProps) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItems(initialItems);
    setPage(1);
  }, [initialItems]);

  const loadMoreItems = async () => {
    setIsLoading(true);
    // Call the server action to get the next page
    const newItems = await fetchNextPage(page);
    
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
      renderItem={(event) => <EventCard {...event} image={event.image ?? {}} white_text={true} />}
      onLoadMore={loadMoreItems}
      isLoading={isLoading}
      hasMore={hasMoreItems}
      itemsPerPage={PAST_EVENTS_PER_PAGE}
    />
  );
}