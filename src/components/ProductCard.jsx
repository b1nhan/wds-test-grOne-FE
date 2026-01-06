import { VNDformat } from '@/lib/utils';

// cấu trúc response (data.data.items) -- chi tiết ở API Spec
// createdAt,
// description
// id,
// imageUrl,
// name,
// price,
// stock,
// updatedAt,
const ProductCard = ({ product }) => {
  return (
    <a
      href={`/product/${product.id}`}
      className="flex flex-col duration-150 hover:scale-105"
    >
      <figure className="bg-secondary mb-4 aspect-square w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </figure>

      <h1>{product.name}</h1>
      <p className="inline-flex items-center gap-2 font-medium">
        {VNDformat(product.price)}
        <span className="text-muted-foreground text-sm font-normal">•</span>
        <span className="text-muted-foreground text-sm font-normal">
          {product.stock} trong kho
        </span>
      </p>
    </a>
  );
};

export default ProductCard;
