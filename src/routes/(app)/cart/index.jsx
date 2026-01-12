import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { QuantityInput } from '@/components';
import { VNDformat } from '@/lib/utils';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import DeleteCartItemDialog from '@/components/DeleteCartItemDialog';
import { useCart } from '@/contexts/CartContext';

export const Route = createFileRoute('/(app)/cart/')({
  component: RouteComponent,

  beforeLoad: (e) => {
    if (!e.context.cart) {
      throw redirect({ to: '/auth/login' });
    }
  },
});

function RouteComponent() {
  const { cart, updateItem } = useCart();

  /** @type {import('@tanstack/react-table').ColumnDef<object>[]} */
  const columns = [
    {
      id: 'image',
      header: null,
      size: 96,
      accessorFn: (obj) => obj.product.imageUrl,
      cell: (cell) => (
        <img
          src={cell.getValue()}
          className="aspect-square w-full rounded-sm object-cover"
        />
      ),
    },

    {
      id: 'name',
      header: 'Tên sản phẩm',
      accessorFn: (obj) => obj.product.name,
      cell: (cell) => <span className="font-semibold">{cell.getValue()}</span>,
    },

    {
      header: 'Số lượng',
      accessorFn: (obj) => obj,
      cell: ({ getValue }) => {
        const product = getValue();

        return (
          <QuantityInput
            value={product.quantity}
            onChange={(value) => updateItem(product.product.id, value)}
          />
        );
      },
    },

    {
      id: 'price',
      header: 'Đơn giá',
      accessorFn: (obj) => obj.product.price,
      cell: ({ getValue }) => VNDformat(getValue()),
    },

    {
      id: 'actions',
      header: null,
      accessorFn: (obj) => obj.product,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-4">
          <DeleteCartItemDialog product={getValue()} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container mx-auto mt-16 flex flex-col gap-4 px-4">
        <h1 className="text-2xl font-bold">Giỏ hàng của bạn</h1>

        <DataTable
          columns={columns}
          data={cart.data}
          manualPagination={false}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 p-4">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-muted-foreground">Tổng cộng</h1>
            <p className="text-xl font-bold">
              {VNDformat(
                cart.data.reduce(
                  (current, product) => product.totalPrice + current,
                  0,
                ),
              )}
            </p>
          </div>

          <Button size="lg">
            <ShoppingCartIcon /> Thanh toán
          </Button>
        </div>
      </div>
    </>
  );
}
