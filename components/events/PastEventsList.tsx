"use client";

import { useState } from 'react';
import LoadMore from '@/components/ui/LoadMore';
import EventCard from '@/components/ui/EventCard';
import { PAST_EVENTS_PER_PAGE, type FormattedEvent } from '@/app/events/shared';

type PastEventsListProps = {
  initialItems: FormattedEvent[];
  fetchNextPage: (page: number) => Promise<FormattedEvent[]>;
  totalItems: number;
};

export default function PastEventsList({ initialItems, fetchNextPage, totalItems }: PastEventsListProps) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [syncedItems, setSyncedItems] = useState(initialItems);

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
      renderItem={(event) => <EventCard {...event} event={event} white_text={true} />}
      onLoadMore={loadMoreItems}
      isLoading={isLoading}
      hasMore={hasMoreItems}
      itemsPerPage={PAST_EVENTS_PER_PAGE}
    />
  );
}