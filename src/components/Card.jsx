import { Edit, Delete } from '@/components';

import { useState } from 'react';
let Card = ({ product }) => {
  let [showEdit, setShowEdit] = useState(false);
  let [showDelete, setShowDelete] = useState(false);

  return (
    <div className="flex flex-col justify-center border border-black p-2">
      <figure className="relative h-[200px] w-full bg-black">
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
          <Edit product={product} onClose={() => setShowEdit(false)}></Edit>
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
