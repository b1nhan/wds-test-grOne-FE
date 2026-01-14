import { Edit, Delete } from '@/components';
import { deleteProducts } from '@/lib/utils.products';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

let Card = ({ product, onSuccessC }) => {
  let [showEdit, setShowEdit] = useState(false);
  let [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    toast.promise(
      deleteProducts(product.id),
      {
        loading: 'Đang xóa sản phẩm...',
        success: (res) => {
          if (res.success) {
            onSuccessC();
            return 'Xóa sản phẩm thành công!';
          }
          throw new Error(res.message || 'Xóa sản phẩm thất bại');
        },
        error: (err) => {
          return err.message || 'Có lỗi xảy ra khi xóa sản phẩm';
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
  return (
    <div className="group rounded-lg border p-2 shadow-md transition-shadow duration-300 hover:shadow-xl">
      <figure className="relative h-[160px] w-full overflow-hidden rounded-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
        ></img>
      </figure>
      <div className="flex w-full items-center justify-center gap-2 pt-3">
        <button
          className="flex h-9 w-[50%] cursor-pointer items-center justify-center rounded-lg border-2 border-green-400 bg-green-300 py-3 hover:bg-green-400"
          onClick={() => setShowEdit(!showEdit)}
        >
          Sửa
        </button>
        {showEdit ? (
          <Edit
            onSuccess={onSuccessC}
            product={product}
            onClose={() => setShowEdit(false)}
          ></Edit>
        ) : (
          <></>
        )}

        <button
          className="h-9 w-[50%] cursor-pointer rounded-lg border-2 border-red-400 bg-red-300 hover:bg-red-400"
          onClick={() => setShowDelete(!showDelete)}
        >
          Xóa
        </button>
        {showDelete ? (
          <Delete
            onDelete={handleDelete}
            onSuccess={onSuccessC}
            product={product}
            onClose={() => setShowDelete(false)}
          ></Delete>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-2 w-full overflow-hidden text-center font-bold text-ellipsis whitespace-nowrap">
        {product.name}
      </div>
    </div>
  );
};

export default Card;
