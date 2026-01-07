import { productAPI } from '@/api/product.api';
import { Button } from '@/components/ui/button';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { DeleteIcon, EditIcon, PlusIcon, TrashIcon, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import DataTable from '@/components/DataTable';
import { VNDformat } from '@/lib/utils';
import { Input } from '@/components/ui/input';

/**
 * @param {{ keyword: string; pageData: import('@tanstack/react-table').PaginationState }} params
 */
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

/** @type {import('@tanstack/react-table').PaginationState} */
const initialPageData = { pageIndex: 0, pageSize: 5 };

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [keyword, setKeyword] = useState('');
  const [pageData, setPageData] = useState(initialPageData);
  const query = useQuery({
    queryKey: ['products', keyword, pageData],
    queryFn: () => fetchProducts({ keyword, pageData }),
    placeholderData: keepPreviousData,
  });

  const defaultData = useMemo(() => [], []);

  /** @type {import('@tanstack/react-table').ColumnDef<any>[]} */
  const columns = [
    {
      accessorKey: 'imageUrl',
      header: null,
      size: 16,
      cell: ({ getValue, column }) => (
        <img
          src={getValue()}
          style={{ minWidth: `${column.getSize()}px` }}
          className="aspect-square w-full rounded-sm object-cover"
        />
      ),
    },
    {
      accessorKey: 'name',
      header: 'Sản phẩm',
    },
    {
      accessorKey: 'price',
      header: 'Giá',
      cell: ({ getValue }) => VNDformat(getValue()),
    },
    {
      accessorKey: 'stock',
      header: 'Số lượng',
    },
    {
      accessorKey: 'id',
      header: 'Hành động',
      cell: () => (
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <EditIcon />
          </Button>
          <Button variant="outline" size="icon">
            <TrashIcon />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold sm:flex-1">Quản lý sản phẩm</h1>

        <Input
          placeholder="Tìm kiếm"
          value={keyword}
          className="max-w-56"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Button variant="secondary">
          <PlusIcon />
          Thêm sản phẩm
        </Button>
      </div>

      <DataTable
        data={query.data?.items ?? defaultData}
        columns={columns}
        pagination={pageData}
        onPaginationChange={setPageData}
        pageCount={query.data?.pagination?.totalPages ?? 0}
      />
    </section>
  );
}
