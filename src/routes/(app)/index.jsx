import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { productAPI } from '@/api/product.api';
import ProductSearchFilter from '@/components/SearchNFilter';
import { searchProducts } from '@/lib/utils.productsSearch';
import ShoeHeader from '@/assets/shoe-header.png';
import { ShoppingBagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components';

export const Route = createFileRoute('/(app)/')({
  component: RouteComponent,
  loader: async () => {
    const data = await productAPI.getProducts({
      page: 1,
      limit: 10,
      sort: 'newest',
    });
    return {
      initialProducts: data.data.items,
      pagination: data.data.pagination,
    };
  },
});

function RouteComponent() {
  const { initialProducts } = Route.useLoaderData();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      const result = await searchProducts({
        ...filters,
        page: 1,
        limit: 10,
      });

      if (result.success) {
        setProducts(result.data.items);
      } else {
        console.error('Search error:', result.error);
        // error display
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <div className="container mx-auto flex h-160 items-stretch gap-16 px-4">
          <div className="flex max-w-[48ch] flex-1 flex-col justify-center gap-4">
            <h1 className="text-4xl leading-12 font-bold">
              Nâng tầm bước chân, khẳng định bản sắc.
            </h1>

            <p className="text-muted-foreground">
              Tuyển tập những thiết kế dẫn đầu xu hướng, giúp bạn định hình
              phong cách cá nhân độc bản trong mọi sự kiện.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <Button className="dark" size="lg">
                <ShoppingBagIcon />
                Mua ngay
              </Button>
            </div>
          </div>

          <img
            src={ShoeHeader}
            alt="shoe header"
            className="ml-auto w-160 object-contain object-center"
          />
        </div>
      </section>

      <ProductSearchFilter onSearch={handleSearch} />

      <section className="container mx-auto flex flex-col gap-8 px-4 pb-32">
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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

