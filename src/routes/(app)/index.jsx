import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import ProductSearchFilter from '@/components/SearchNFilter';
import { searchProducts } from '@/lib/utils.productsSearch';
import ShoeHeader from '@/assets/shoe-header.png';
import { ShoppingBagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components';
import { getProducts } from '@/lib/utils.products';
import { PaginationHome } from '@/components/ui/PaginationHome';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import FullPageLoader from '@/components/ui/FullPageLoader';

const ITEMS_PER_PAGE = 8;
export const Route = createFileRoute('/(app)/')({
  component: RouteComponent,
  loader: async () => {
    const data = await getProducts({
      page: 1,
      limit: ITEMS_PER_PAGE,
      sort: 'newest',
    });
    return {
      initialProducts: data.data.items,
      pagination: data.data.pagination,
    };
  },
  pendingComponent: FullPageLoader,
  pendingMs: 500,
  staleTime: 0,
});

function RouteComponent() {
  const { initialProducts, pagination: initialPagination } =
    Route.useLoaderData();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState(initialPagination);
  const [currentFilters, setCurrentFilters] = useState({});

  const handleScroll = (e) => {
    const element = document.getElementById('products');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchProducts = async (filters, page = 1) => {
    setLoading(true);
    try {
      const result = await searchProducts({
        ...filters,
        page: page,
        limit: ITEMS_PER_PAGE,
      });

      if (result.success) {
        setProducts(result.data.items);
        setPagination(result.data.pagination);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    const newFilters = {
      keyword: filters.keyword,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      sort: filters.sort,
    };
    setCurrentFilters(newFilters);
    fetchProducts(newFilters, 1);
  };

  const handlePageChange = (newPage) => {
    fetchProducts(currentFilters, newPage);
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <div className="container mx-auto flex h-160 items-stretch gap-16 px-4">
          <div className="flex max-w-[48ch] flex-1 flex-col justify-center gap-4">
            <h1 className="text-4xl leading-12 font-bold">
              Nâng tầm bước chân, khẳng định bản sắc.
            </h1>
            <img
              src={ShoeHeader}
              alt="shoe header"
              className="ml-auto w-160 object-contain object-center md:hidden"
            />
            <p className="text-muted-foreground">
              Tuyển tập những thiết kế dẫn đầu xu hướng, giúp bạn định hình
              phong cách cá nhân độc bản trong mọi sự kiện.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <Button className="dark" size="lg" asChild onClick={handleScroll}>
                <Link hash="products">
                  <ShoppingBagIcon className="mr-2 h-5 w-5" />
                  Mua ngay
                </Link>
              </Button>
            </div>
          </div>

          <img
            src={ShoeHeader}
            alt="shoe header"
            className="ml-auto hidden w-160 object-contain object-center md:flex"
          />
        </div>
      </section>

      <ProductSearchFilter onSearch={handleSearch} />

      <section
        className="container mx-auto flex flex-col gap-8 px-4 pb-32"
        id="products"
      >
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <PaginationHome
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="py-20 text-center text-gray-500">
            <p className="text-lg">Không tìm thấy sản phẩm nào</p>
            <button className="mt-4 cursor-pointer text-blue-600 hover:underline">
              Xem các sản phẩm khác
            </button>
          </div>
        )}
      </section>
    </>
  );
}
