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
    <div className="flex flex-col justify-center p-2 shadow">
      <Toaster />
      <figure className="relative h-[150px] w-full bg-black">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        ></img>
      </figure>
      <div className="w-full">
        <button
          className="h-10 w-[50%] cursor-pointer bg-green-400"
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
          className="h-10 w-[50%] cursor-pointer bg-red-400"
          onClick={() => setShowDelete(!showEdit)}
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
      <div className="mt-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">
        {product.name}
      </div>
    </div>
  );
};

export default Card;
