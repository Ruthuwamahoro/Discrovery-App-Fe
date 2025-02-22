import React from 'react';

const BookCardSkeleton = () => {
  return (
    <div className="group relative bg-white rounded-xl shadow-lg">
      {/* Image skeleton */}
      <div className="aspect-[3/4] relative overflow-hidden rounded-t-xl bg-gray-200 animate-pulse">
        {/* Rating skeleton */}
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-6 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>

      <div className="p-4">
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
        
        <div className="flex items-center gap-2 mt-2">
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="mt-3 space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;