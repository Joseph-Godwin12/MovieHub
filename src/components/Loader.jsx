export default function Loading() {
  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <div className="flex flex-col md:flex-row gap-6 animate-pulse">
        {/* Poster Skeleton */}
        <div className="w-full md:w-1/3 h-96 bg-gray-700 rounded-lg"></div>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-700 rounded w-3/4"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/3"></div>

          <div className="flex gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-700 rounded-full"></div>
            ))}
          </div>

          <div className="h-20 bg-gray-700 rounded w-full mt-4"></div>
          <div className="h-10 bg-gray-700 rounded w-40 mt-6"></div>
        </div>
      </div>

      {/* Trailer Skeleton */}
      <div className="mt-10">
        <div className="h-6 w-32 bg-gray-700 rounded mb-4"></div>
        <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
