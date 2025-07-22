import React from 'react';

const Skeleton = () => (
  <div className="w-full h-full bg-gray-300 rounded-lg animate-pulse"></div>
);

export default function ImageSkeleton({ count = 1 }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-24 h-24 rounded-lg border border-white/20 shadow overflow-hidden">
          <Skeleton />
        </div>
      ))}
    </div>
  );
}
