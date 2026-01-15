import { VNDformat } from '@/lib/utils';
import QuantityInput from './QuantityInput';
import { updateCart, deleteCartItem } from '@/lib/utils.cart';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Delete } from '@/components/';
import { useRouter } from '@tanstack/react-router';
let ProductCart = ({ item, setCart }) => {
  const router = useRouter();
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
            router.invalidate();
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
          borderRadius: '0px',
          background: '#333',
          color: '#fff',
        },
      },
    );
  };
  const handleUpdateCartItem = async (itemId, quantity) => {
    if (quantity === item.quantity) return;

    updateCart(itemId, quantity)
      .then((response) => {
        if (response.success) {
          setCart((prev) =>
            prev.map((i) =>
              i.product.id === itemId
                ? { ...i, quantity, totalPrice: i.product.price * quantity }
                : i,
            ),
          );

          toast.success('Cập nhật số lượng thành công!');
        } else {
          throw new Error('Cập nhật thất bại');
        }
      })
      .catch((err) => toast.error(err.message || 'Có lỗi xảy ra'));
  };

  useEffect(() => {
    if (totalQuantity !== 0) {
      handleUpdateCartItem(item.product.id, totalQuantity);
    }
  }, [totalQuantity]);

  // console.log(totalQuantity);
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

      <QuantityInput
        value={item.quantity}
        min={1}
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
