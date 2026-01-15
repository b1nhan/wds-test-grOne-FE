import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { VNDformat } from '@/lib/utils';
import { CalendarIcon, PackageIcon } from 'lucide-react';
import { getOrderById } from '@/lib/utils.order';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const OrderHistoryItem = ({ order }) => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDetail = async () => {
    if (orderDetail || isLoading) return;

    setIsLoading(true);
    try {
      const res = await getOrderById(order.id);
      setOrderDetail(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AccordionItem
      value={`order-${order.id}`}
      className="mb-4 rounded-lg border bg-white px-4 shadow-sm"
    >
      <AccordionTrigger
        className="py-6 hover:cursor-pointer hover:no-underline"
        onClick={handleOpenDetail}
      >
        <div className="flex flex-1 items-center justify-between text-left">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <PackageIcon size={20} />
              <span className="text-lg font-bold">
                Mã đơn hàng: #{order.id}
              </span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <CalendarIcon size={14} />
              <p>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
              <p>{new Date(order.createdAt).toLocaleTimeString('vi-VN')}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-3 overflow-hidden hover:space-x-2">
              {order.items.map((item, idx) => (
                <img
                  key={idx}
                  className="inline-block h-10 w-10 rounded-lg object-cover ring-2 ring-white"
                  src={item.product.imageUrl}
                  alt={item.product.name}
                />
              ))}
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-xs font-semibold uppercase">
                Tổng thanh toán
              </p>
              <p className="text-lg font-bold">
                {VNDformat(order.totalAmount)}
              </p>
            </div>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="border-t pt-4">
        {isLoading ? (
          <div className="space-y-4 py-2">
            <Skeleton className="h-5 w-32" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        ) : orderDetail ? (
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-gray-700">Chi tiết sản phẩm</p>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b pb-3 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-16 w-16 rounded border object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      Số lượng: x{item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">{VNDformat(item.totalPrice)}</p>
              </div>
            ))}
            <div className="mt-2 rounded-md bg-gray-50 p-3">
              <p className="text-sm text-gray-600 italic">
                Số điện thoại nhận hàng: {order.phone}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground font-medium">
            Lỗi khi lấy dữ liệu đơn hàng...
          </p>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
