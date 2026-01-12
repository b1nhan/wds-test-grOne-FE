import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteCartItem } from '@/lib/utils.cart';
import { useState } from 'react';
import { Button } from './ui/button';
import { TrashIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const DeleteCartItemDialog = ({ product }) => {
  const { removeItem } = useCart();
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    removeItem(product.id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <TrashIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa sản phẩm khỏi giỏ hàng?</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa{' '}
            <strong className="text-foreground">{product.name}</strong> khỏi giỏ
            hàng không?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={onDelete}>
            <TrashIcon />
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCartItemDialog;
