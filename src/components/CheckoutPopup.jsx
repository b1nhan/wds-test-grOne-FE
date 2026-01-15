import React from 'react';
import { VNDformat } from '@/lib/utils';
import { createOrder } from '@/lib/utils.order';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserIcon, PhoneIcon, PackageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPopup = ({ user, cartItems, onClose, onOrderSuccess }) => {
  const totalAmount =
    cartItems?.reduce((acc, item) => acc + item.totalPrice, 0) || 0;

  const handleConfirm = async () => {
    const loadingToast = toast.loading('Đang xử lý đơn hàng...');
    try {
      const res = await createOrder(user.phone.toString());

      if (res.success) {
        toast.success('Đặt hàng thành công!', { id: loadingToast });
        onOrderSuccess();
      } else {
        toast.error(res.message || 'Có lỗi xảy ra', { id: loadingToast });
      }
    } catch (error) {
      toast.error('Lỗi kết nối hệ thống', { id: loadingToast });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="relative flex max-h-[85vh] min-h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm bg-gray-200 drop-shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:cursor-pointer hover:bg-black/10"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center pt-10 pb-6">
          <div className="mb-3">
            <h2 className="text-3xl font-bold uppercase">Checkout</h2>
          </div>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-10 pb-10">
          <section>
            <div className="flex-col justify-around gap-4 rounded-lg bg-white p-4 shadow-sm md:flex md:flex-row">
              <div className="flex items-center gap-2">
                <div className="rounded-full border border-black p-1">
                  <UserIcon size={20} />
                </div>
                <div>
                  <p className="flex gap-1 font-bold">
                    Tên: <span className="font-medium">{user.name}</span>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 md:mt-0">
                <div className="rounded-full border border-black p-1">
                  <PhoneIcon size={20} />
                </div>{' '}
                <div>
                  <p className="flex gap-1 font-bold">
                    SĐT nhận hàng:{' '}
                    <span className="font-medium">{user.phone}</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-md flex items-center gap-1 font-bold uppercase">
              <PackageIcon size={16} /> Chi tiết đơn hàng
            </h3>
            <div className="max-h-[50vh] overflow-hidden">
              <div className="max-h-[50vh] overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="m-3 flex items-center justify-between rounded-lg bg-white p-4 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold uppercase">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-bold">
                      {VNDformat(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between border-t-1 border-gray-500 p-4">
            <span className="text-xl font-bold">Tổng đơn hàng:</span>
            <span className="text-xl font-black">{VNDformat(totalAmount)}</span>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleConfirm}
              className="cursor-pointer rounded-lg bg-black px-6 py-3 font-bold text-white uppercase hover:bg-white hover:text-black"
            >
              Xác nhận đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;
