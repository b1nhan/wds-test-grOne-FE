// src/components/OrderHistoryItem.jsx
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { VNDformat } from '@/lib/utils';
import { CalendarIcon, PackageIcon } from 'lucide-react';

export const OrderHistoryItem = ({ order }) => {
  return (
    <AccordionItem value={`order-${order.id}`} className="border rounded-lg px-4 mb-4 bg-white shadow-sm">
      <AccordionTrigger className="hover:no-underline py-6">
        <div className="flex flex-1 items-center justify-between text-left">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-lg">Mã đơn hàng: #{order.id}</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon size={14} />
              {new Date(order.createdAt).toLocaleDateString('vi-VN')}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-3 overflow-hidden">
              {order.items.map((item, idx) => (
                <img
                  key={idx}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src={item.product.imageUrl}
                  alt={item.product.name}
                />
              ))}
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase font-semibold">Tổng thanh toán</p>
              <p className="text-blue-600 font-bold text-lg">{VNDformat(order.totalAmount)}</p>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      
      <AccordionContent className="border-t pt-4">
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-gray-700">Chi tiết sản phẩm</p>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0">
              <div className="flex items-center gap-4">
                <img 
                  src={item.product.imageUrl} 
                  alt={item.product.name} 
                  className="h-16 w-16 rounded object-cover border"
                />
                <div>
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Số lượng: x{item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold">{VNDformat(item.totalPrice)}</p>
            </div>
          ))}
          <div className="bg-gray-50 p-3 rounded-md mt-2">
            <p className="text-sm text-gray-600 italic">Số điện thoại nhận hàng: {order.phone}</p>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};