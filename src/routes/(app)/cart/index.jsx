import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { VNDformat } from '@/lib/utils';
import ProductCart from '@/components/ProductCart';
import CheckoutPopup from '@/components/CheckoutPopup';
import { useNavigate } from '@tanstack/react-router';
import { CreditCardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCart } from '@/lib/utils.cart';
import { Checkbox } from '@/components/ui/checkbox';

export const Route = createFileRoute('/(app)/cart/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    // thoát nếu user chưa có log in
    if (!context.user) {
      throw redirect({ to: '/auth/login' });
    }
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const cart = await getCart();
      if (cart.success) {
        setCartItems(cart.data.items);
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

  const toggleSelectItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === cartItems.length && cartItems.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartItems.map((item) => item.product.id));
    }
  };

  const selectedCartItems = useMemo(
    () => cartItems.filter((item) => selectedIds.includes(item.product.id)),
    [cartItems, selectedIds],
  );

  console.log('cartItems', selectedIds);
  console.log('selectCart', cartItems);
  console.log('selectCartItem', selectedCartItems);

  if (isLoading)
    return <div className="p-10 text-center">Đang tải giỏ hàng...</div>;
  return (
    <div className="flex h-full flex-col bg-white font-sans text-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Giỏ hàng của bạn</h1>

        {isCheckoutOpen && (
          <CheckoutPopup
            user={user}
            cartItems={selectedCartItems}
            onClose={() => setCheckoutOpen(false)}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        <div className="flex-1 overflow-hidden border-t-2">
          <div className="h-full overflow-y-auto pr-2">
            <div className="flex min-h-[300px] flex-col divide-y divide-zinc-100">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <ProductCart
                    key={item.product.id}
                    item={item}
                    setCart={setCartItems}
                    isSelected={selectedIds.includes(item.product.id)}
                    onSelect={() => toggleSelectItem(item.product.id)}
                  />
                ))
              ) : (
                <p className="text-muted-foreground m-auto">
                  Giỏ hàng của bạn đang trống.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="important fixed bottom-0 z-10 m-0 mt-6 flex w-full justify-between gap-4 border-t bg-white px-4 py-6 md:static md:px-0">
          <div className="flex flex-col gap-2">
            {cartItems.length > 0 && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="select-all"
                  checked={
                    selectedIds.length === cartItems.length &&
                    cartItems.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                />
                <label
                  htmlFor="select-all"
                  className="text-md cursor-pointer font-medium select-none"
                >
                  Chọn tất cả ({cartItems.length} sản phẩm)
                </label>
              </div>
            )}

            <span className="text-sm text-zinc-500">
              Đã chọn {selectedIds.length} sản phẩm
            </span>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-10 text-lg font-bold">
              <span>Tổng cộng:</span>
              <span>
                {cartItems
                  ? VNDformat(
                      cartItems?.reduce(
                        (acc, item) => acc + item.totalPrice,
                        0,
                      ),
                    )
                  : VNDformat(0)}
              </span>
            </div>
            <Button
              size="lg"
              disabled={selectedIds.length === 0}
              onClick={() => setCheckoutOpen(true)}
            >
              <CreditCardIcon />
              Thanh Toán
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
