import { createFileRoute } from '@tanstack/react-router';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { QuantityInput } from '@/components';
import { VNDformat } from '@/lib/utils';
export const Route = createFileRoute('/(app)/cart/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Nike Dunk Low Retro Xám',
      price: 550000,
      quantity: 1,
      image: 'https://via.placeholder.com/80',
      stock: 2,
    },
    {
      id: 2,
      name: 'Nike Dunk Low Retro Xám',
      price: 550000,
      quantity: 1,
      image: 'https://via.placeholder.com/80',
      stock: 2,
    },
    {
      id: 3,
      name: 'Nike Dunk Low Retro Xám',
      price: 550000,
      quantity: 1,
      image: 'https://via.placeholder.com/80',
      stock: 2,
    },
    {
      id: 4,
      name: 'Nike Dunk Low Retro Xám',
      price: 550000,
      quantity: 1,
      image: 'https://via.placeholder.com/80',
      stock: 2,
    },
  ]);
  return (
    <div className="flex h-screen flex-col bg-white font-sans text-zinc-900">
      <div className="h-[65px] w-full bg-black"></div>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold tracking-tighter uppercase">
          Giỏ hàng của bạn
        </h1>

        <div className="flex-1 overflow-hidden border-t-2">
          <div className="h-full overflow-y-auto pr-2">
            <div className="sticky top-0 z-10 grid grid-cols-[4fr_1.5fr_1.5fr_1.5fr_1fr] bg-white px-5 py-4 text-xs font-bold tracking-wider uppercase shadow">
              <div>Sản phẩm</div>
              <div className="text-center">Đơn giá</div>
              <div className="text-center">Số lượng</div>
              <div className="text-center">Số tiền</div>
              <div className="text-right">Thao tác</div>
            </div>

            <div className="divide-y divide-zinc-100">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[4fr_1.5fr_1.5fr_1.5fr_1fr] items-center py-6"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 flex-shrink-0 bg-zinc-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover mix-blend-multiply"
                      />
                    </div>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </div>

                  <div className="text-center text-sm">
                    {VNDformat(item.price)}
                  </div>

                  <QuantityInput max={item.stock} align="center" />

                  <div className="text-center text-sm font-bold">
                    {VNDformat(item.price * item.quantity)}
                  </div>

                  <div className="text-center">
                    <button className="text-xs font-black uppercase hover:text-red-600 hover:underline">
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-end gap-4 border-t pt-6">
          <div className="flex gap-10 text-lg font-bold">
            <span className="text-zinc-500 uppercase">Tổng cộng:</span>
            <span>
              {VNDformat(
                cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                ),
              )}
            </span>
          </div>
          <button className="bg-zinc-900 px-12 py-4 font-bold text-white transition-transform hover:scale-105 active:scale-95">
            THANH TOÁN NGAY
          </button>
        </div>
      </main>
    </div>
  );
}
