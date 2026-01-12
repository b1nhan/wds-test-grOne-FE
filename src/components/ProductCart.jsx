import { VNDformat } from '@/lib/utils';
import QuantityInput from './QuantityInput';
import { updateCart } from '@/lib/untils.cart';
import { useEffect, useState } from 'react';

let ProductCart = ({ item, onDelete, setCart, loading }) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const handleQuantityChange = (newValue) => {
    setTotalQuantity(newValue);
  };
  let handleUpdateCartItem = async (itemId, quantity) => {
    try {
      if (quantity === item.quantity) return;
      const response = await updateCart(itemId, quantity);
      if (response.success) {
        alert('Cập nhật số lượng thành công');
        setCart((prev) =>
          prev.map((item) =>
            item.product.id === itemId
              ? { ...item, quantity, totalPrice: item.product.price * quantity }
              : item,
          ),
        );
      } else {
        alert('Cập nhật số lượng thất bại');
      }
    } catch (error) {
      alert('Có lỗi xảy ra');
    } finally {
      loading(false);
    }
  };

  useEffect(() => {
    if (totalQuantity !== 0) {
      handleUpdateCartItem(item.product.id, totalQuantity);
    }
  }, [totalQuantity]);

  console.log(totalQuantity);
  return (
    <div className="grid grid-cols-[4fr_1.5fr_1.5fr_1.5fr_1fr] items-center py-6">
      <div className="flex items-center gap-6">
        <div className="h-20 w-20 flex-shrink-0 bg-zinc-100">
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="h-full w-full object-cover mix-blend-multiply"
          />
        </div>
        <span className="text-sm font-semibold">{item.product.name}</span>
      </div>

      <div className="text-center text-sm">{VNDformat(item.product.price)}</div>

      {/* Truyền onChange để gọi hàm update từ cha */}
      <QuantityInput
        value={item.quantity}
        max={item.product.stock}
        onChange={handleQuantityChange}
      />

      <div className="text-center text-sm font-bold">
        {VNDformat(item.totalPrice)}
      </div>

      <div className="text-center">
        <button
          className="cursor-pointer text-xs font-black uppercase hover:text-red-600 hover:underline"
          onClick={() => onDelete(item.product.id)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};
export default ProductCart;
