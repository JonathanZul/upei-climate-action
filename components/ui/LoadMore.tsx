"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LoadMoreProps<T> = {
  initialItems: T[];
  totalItems: number;
  fetchNextPage: (page: number) => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  itemsPerPage: number;
};

export default function LoadMore<T extends { _id: string }>({
  initialItems,
  totalItems,
  fetchNextPage,
  renderItem,
  itemsPerPage,
}: LoadMoreProps<T>) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreItems = async () => {
    setIsLoading(true);
    const newItems = await fetchNextPage(page);
    if (newItems.length > 0) {
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
    }
    setIsLoading(false);
  };

  const hasMoreItems = items.length < totalItems;

  return (
    <>
      <div className="flex flex-col gap-12">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: (index % itemsPerPage) * 0.05 }}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMoreItems && (
        <div className="mt-12 text-center">
          <button
            onClick={loadMoreItems}
            disabled={isLoading}
            className="rounded-full bg-primary px-6 py-3 font-nunito text-base text-white-text shadow-md transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
}