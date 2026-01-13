import { Skeleton } from '@/components/ui/skeleton';

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="mb-4 aspect-square w-full rounded-md" />

      <Skeleton className="mb-2 h-5 w-3/4" />

      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
