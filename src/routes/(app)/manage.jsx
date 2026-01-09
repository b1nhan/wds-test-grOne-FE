import { createFileRoute } from '@tanstack/react-router';
import ProductSearchFilter from '@/components/SearchNFilter';
import { useState } from 'react';
import { productAPI } from '@/api/product.api';
import { Card, Create } from '@/components';

export const Route = createFileRoute('/(app)/manage')({
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
  const [isShow, setShow] = useState(false);
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
    <div className="flex flex-col items-center justify-center">
      <div className="h-[68px] w-full bg-black"></div>
      {/* <h1 className="px-10 py-5 text-2xl font-semibold">Quản lý sản phẩm</h1> */}
      <ProductSearchFilter onSearch={handleSearch} />
      <button
        className="btn rounded-2 m-5 cursor-pointer border p-2"
        onClick={() => setShow(true)}
      >
        Thêm sản phẩm
      </button>
      {isShow ? <Create onClose={() => setShow(false)}></Create> : <></>}

      <section className="container mx-auto flex flex-col gap-8 px-10 pb-32">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-4 gap-8">
            {products.map((product) => (
              <Card product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-500">
            <p className="text-lg">Không tìm thấy sản phẩm nào</p>
            <button
              onClick={handleReset}
              className="mt-4 cursor-pointer text-blue-600 hover:underline"
            >
              Xem các sản phẩm khác
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
