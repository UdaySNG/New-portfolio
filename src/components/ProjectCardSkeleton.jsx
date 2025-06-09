const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-dark-lighter rounded-xl overflow-hidden shadow-xl h-[400px] animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>

        {/* Category Skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24 mb-3" />

        {/* Tags Skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-32" />
      </div>
    </div>
  );
};

export default ProjectCardSkeleton; 