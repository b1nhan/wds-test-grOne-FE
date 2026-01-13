import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, useCallback } from 'react';
import { VNDformat } from '@/lib/utils';
import { getCart, deleteCartItem, updateCart } from '@/lib/utils.cart';
import { getProfileDetail } from '@/lib/utils.auth';
import ProductCart from '@/components/ProductCart';
import toast, { Toaster } from 'react-hot-toast';
import CheckoutPopup from '@/components/CheckoutPopup';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/cart/')({
  component: RouteComponent,
  loader: async () => {
    const user = await getProfileDetail();
    return { user };
  },
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  const user = loaderData.user?.data || loaderData.user;
  //
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const cart = await getCart();
      if (cart.success) {
        setCartItems(cart.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleOrderSuccess = () => {
    setCheckoutOpen(false);
    setCartItems([]);
    navigate({ to: '/profile' });
  };

  if (isLoading)
    return <div className="p-10 text-center">Đang tải giỏ hàng...</div>;
  return (
    <div className="flex h-full flex-col bg-white font-sans text-zinc-900">
      <Toaster />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold tracking-tighter uppercase">
          Giỏ hàng của bạn
        </h1>

        {isCheckoutOpen && (
          <CheckoutPopup
            user={user}
            cartItems={cartItems}
            onClose={() => setCheckoutOpen(false)}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        <div className="flex-1 overflow-hidden border-t-2">
          <div className="h-full overflow-y-auto pr-2">
            <div className="sticky top-0 z-10 grid grid-cols-[4fr_1.5fr_1.5fr_1.5fr_1fr] bg-white px-5 py-4 text-xs font-bold tracking-wider uppercase shadow">
              <div>Sản phẩm</div>
              <div className="text-center">Đơn giá</div>
              <div className="text-center">Số lượng</div>
              <div className="text-center">Số tiền</div>
              <div className="text-right">Thao tác</div>
            </div>

            <div className="min-h-[300px] divide-y divide-zinc-100">
              {cartItems?.map((item) => (
                <ProductCart
                  key={item.product.id}
                  item={item}
                  setCart={setCartItems}
                  loading={setLoading}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="important fixed bottom-0 z-10 m-0 mt-6 flex w-full items-center justify-between gap-4 border-t bg-white px-4 py-6 md:static md:px-0">
          <div className="flex gap-10 text-lg font-bold">
            <span className="uppercase">Tổng cộng:</span>
            <span>
              {cartItems
                ? VNDformat(
                    cartItems?.reduce((acc, item) => acc + item.totalPrice, 0),
                  )
                : VNDformat(0)}
            </span>
          </div>
          <button
            className="cursor-pointer rounded-lg bg-zinc-900 px-12 py-4 font-bold text-white transition-transform disabled:cursor-default disabled:bg-gray-300"
            disabled={!cartItems || cartItems.length === 0}
            onClick={() => setCheckoutOpen(true)}
          >
            THANH TOÁN NGAY
          </button>
        </div>
      </main>
    </div>
  );
}
