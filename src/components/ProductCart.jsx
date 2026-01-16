import { VNDformat } from '@/lib/utils';
import QuantityInput from './QuantityInput';
import { updateCart, deleteCartItem } from '@/lib/utils.cart';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Delete } from '@/components/';
import { useRouter } from '@tanstack/react-router';
import { Button } from './ui/button';
import { TrashIcon } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

let ProductCart = ({ item, setCart, isSelected, onSelect }) => {
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
          minWidth: '250px',
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
    <div className="grid grid-cols-[3rem_8rem_1fr_8rem_8rem] grid-rows-2 items-center gap-x-6 py-6">
      <Checkbox
        checked={isSelected}
        onCheckedChange={onSelect}
        className="row-span-2"
      />

      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="row-span-2 aspect-square w-full rounded-lg mix-blend-multiply"
      />

      <h1 className="text-lg font-semibold">{item.product.name}</h1>

      <div className="col-start-3 flex items-center gap-2 self-start">
        <QuantityInput
          value={item.quantity}
          min={1}
          max={item.product.stock}
          onChange={handleQuantityChange}
        />

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowToaster(true)}
        >
          <TrashIcon />
        </Button>
      </div>

      <p className="text-muted-foreground row-span-2 ml-auto">
        {VNDformat(item.product.price)}
      </p>

      <div className="row-span-2 ml-auto font-semibold">
        {VNDformat(item.totalPrice)}
      </div>

      {showToaster && (
        <Delete
          product={item}
          onClose={() => {
            setShowToaster(false);
          }}
          onDelete={() => {
            handleDeleteCartItem(item.product.id);
          }}
        />
      )}
    </div>
  );
};
export default ProductCart;
