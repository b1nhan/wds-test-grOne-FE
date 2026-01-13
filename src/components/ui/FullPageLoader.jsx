import { Skeleton } from '@/components/ui/skeleton';
import ProductSearchFilter from '@/components/SearchNFilter';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';

const ITEMS_PER_PAGE = 8;

export default function FullPageLoader() {
  const noop = () => {};

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative overflow-hidden bg-black text-white">
        <div className="container mx-auto flex h-160 items-stretch gap-16 px-4">
          <div className="flex max-w-[48ch] flex-1 flex-col justify-center gap-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-full bg-white/10" />
              <Skeleton className="h-10 w-2/3 bg-white/10" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-1/2 bg-white/5" />
            </div>

            <Skeleton className="mt-4 h-12 w-40 rounded-md bg-white/10" />
          </div>

          <div className="ml-auto hidden w-160 items-center justify-center md:flex">
            <Skeleton className="h-80 w-80 animate-pulse rounded-full bg-white/5 blur-3xl" />
          </div>
        </div>
      </section>

      <ProductSearchFilter onSearch={noop} />

      <section className="container mx-auto flex flex-col gap-8 px-4 pb-32">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32 bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
