import { createFileRoute } from '@tanstack/react-router';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import { productAPI } from '@/api/product.api';
import { Card, Create, AdminFooter } from '@/components';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
});

const fetchProducts = async ({ keyword, pageData }) => {
  const data = await productAPI.getProducts({
    page: pageData.pageIndex + 1,
    limit: pageData.pageSize,
    keyword,
  });

  if (!data.success) {
    throw new Error(data.messsage);
  }

  return data.data;
};

function RouteComponent() {
  const initialPageData = { pageIndex: 0, pageSize: 10 };
  const [isShow, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');

  const [pageData, setPageData] = useState(initialPageData);
  const query = useQuery({
    queryKey: ['products', keyword, pageData],
    queryFn: () => fetchProducts({ keyword, pageData }),
    placeholderData: keepPreviousData,
  });
  const products = query.data?.items ?? [];
  const handleReset = () => {
    setKeyword('');
    setPageData(initialPageData);
  };
  const queryClient = useQueryClient();
  const handleActionSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  const totalPages = query.data?.pagination?.totalPages ?? 0;
  const currentPage = pageData.pageIndex + 1;
  return (
    <div className="flex flex-col items-center justify-center px-10">
      <div className="mt-2 mb-5 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:flex-1">Quản lý sản phẩm</h1>
        <>
          <Input
            placeholder="Tìm kiếm"
            value={keyword}
            className="max-w-80 sm:max-w-56"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button variant="secondary" onClick={() => setShow(true)}>
            <PlusIcon />
            Thêm sản phẩm
          </Button>
        </>
      </div>
      {isShow ? (
        <Create
          onSuccess={handleActionSuccess}
          onClose={() => setShow(false)}
        ></Create>
      ) : (
        <></>
      )}

      <section className="container mx-auto flex flex-col gap-8 pb-32">
        {query.isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {products.map((product) => (
              <Card
                onSuccessC={handleActionSuccess}
                key={product.id}
                product={product}
              />
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
      <AdminFooter
        total={totalPages}
        curr={currentPage}
        data={pageData}
        onPageChange={setPageData}
      />
    </div>
  );
}
