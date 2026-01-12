import { Edit, Delete } from '@/components';
import { productAPI } from '@/api/product.api';
import { useState } from 'react';
let Card = ({ product, onSuccessC }) => {
  let [showEdit, setShowEdit] = useState(false);
  let [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await productAPI.deleteProducts(product.id);
      alert('Xóa sản phẩm thành công');
      if (res.success) {
        onSuccessC();
        onClose();
      }
    } catch (error) {
      alert(error?.message || 'Có lỗi xảy ra khi xóa sản phẩm');
    }
  };
  return (
    <div className="flex flex-col justify-center p-2 shadow">
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
