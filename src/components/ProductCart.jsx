import { VNDformat } from '@/lib/utils';
import QuantityInput from './QuantityInput';
import { updateCart, deleteCartItem } from '@/lib/utils.cart';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Delete } from '@/components/';
let ProductCart = ({ item, setCart, selectedIds, toggleSelectItem }) => {
  const [showToaster, setShowToaster] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const handleQuantityChange = (newValue) => {
    setTotalQuantity(newValue);
  };

  let handleDeleteCartItem = (itemId) => {
    toast.promise(
      deleteCartItem(itemId),
      {
        loading: 'Đang xóa sản phẩm...',
        success: (response) => {
          if (response.success) {
            setCart((prevItems) =>
              prevItems.filter((item) => item.product.id !== itemId),
            );
            return 'Xóa sản phẩm thành công!';
          } else {
            throw new Error('Xóa sản phẩm thất bại');
          }
        },
        error: (err) => {
          return err.message || 'Có lỗi xảy ra, vui lòng thử lại';
        },
      },
      {
        duration: 4000,
        style: {
          minWidth: '250px',
        },
      },
    );
  };
  const handleUpdateCartItem = async (itemId, quantity) => {
    if (quantity === item.quantity) return;

    toast.promise(
      updateCart(itemId, quantity),
      {
        loading: 'Đang cập nhật số lượng...',
        success: (response) => {
          if (response.success) {
            setCart((prev) =>
              prev.map((i) =>
                i.product.id === itemId
                  ? { ...i, quantity, totalPrice: i.product.price * quantity }
                  : i,
              ),
            );
            return 'Cập nhật số lượng thành công!';
          } else {
            throw new Error('Cập nhật thất bại');
          }
        },
        error: (err) => err.message || 'Có lỗi xảy ra khi cập nhật',
      },
      {
        duration: 3000,
        style: {
          minWidth: '250px',
        },
      },
    );
  };

  useEffect(() => {
    if (totalQuantity !== 0) {
      handleUpdateCartItem(item.product.id, totalQuantity);
    }
  }, [totalQuantity]);

  // console.log(totalQuantity);
  return (
    <div className="grid grid-cols-[0.5fr_4fr_1.5fr_1.5fr_1.5fr_1fr] items-center py-6">
      <div className="pl-5">
        <input
          type="checkbox"
          checked={selectedIds.includes(item.product.id)}
          onChange={() => toggleSelectItem(item.product.id)}
        />
      </div>
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
          onClick={() => setShowToaster(true)}
        >
          Xóa
        </button>
      </div>
      {showToaster ? (
        <Delete
          product={item}
          onClose={() => {
            setShowToaster(false);
          }}
          onDelete={() => {
            handleDeleteCartItem(item.product.id);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default ProductCart;
