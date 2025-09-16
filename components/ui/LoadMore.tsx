"use client";

import { motion, AnimatePresence } from 'framer-motion';

type LoadMoreProps<T> = {
  items: T[]; // Receives the full list of items to render
  renderItem: (item: T, index: number) => React.ReactNode;
  onLoadMore: () => void; // A simple callback function
  isLoading: boolean;
  hasMore: boolean; // Receives a boolean to show/hide the button
  itemsPerPage: number;
};

export default function LoadMore<T extends { _id: string }>({
  items,
  renderItem,
  onLoadMore,
  isLoading,
  hasMore,
  itemsPerPage
}: LoadMoreProps<T>) {
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
              {renderItem(item, index)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={onLoadMore}
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