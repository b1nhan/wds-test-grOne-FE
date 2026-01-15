import QuantityInput from '@/components/QuantityInput';
import { productAPI } from '@/api/product.api';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { VNDformat } from '@/lib/utils';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ShoppingCartIcon } from 'lucide-react';
import { addCartItem } from '@/lib/utils.cart';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/(app)/product/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await productAPI.getProductById(params.id);
    return { product: data.data };
  },
});

// cấu trúc response (data.data.items) -- chi tiết ở API Spec
// createdAt,
// description
// id,
// imageUrl,
// name,
// price,
// stock,
// updatedAt,
function RouteComponent() {
  const router = useRouter();
  const { product } = Route.useLoaderData();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const handleQuantityChange = (newValue) => {
    setTotalQuantity(newValue);
  };

  return (
    <>
      <header className="container mx-auto mt-16 grid gap-16 px-4 md:grid-cols-2">
        <figure className="bg-accent aspect-square w-full max-w-2xl rounded-md border object-cover p-32">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full"
          />
        </figure>

        <form className="flex max-w-[50ch] flex-1 flex-col gap-4">
          <h1 className="text-2xl">{product.name}</h1>

          <p className="inline-flex items-center gap-4 text-2xl font-bold">
            {VNDformat(product.price)}

            <span className="text-muted-foreground text-base font-normal">
              •
            </span>
            <span className="text-muted-foreground text-base font-normal">
              {product.stock} trong kho
            </span>
          </p>

          <p className="text-muted-foreground">{product.description}</p>

          <QuantityInput
            min={1}
            max={product.stock}
            onChange={handleQuantityChange}
          />

          <Button
            size="lg"
            type="submit"
            className="my-4"
            disabled={totalQuantity <= 0}
            onClick={(e) => {
              e.preventDefault();

              addCartItem(product.id, totalQuantity).then((res) => {
                if (res.success) {
                  toast.success(
                    `Đã thêm ${totalQuantity} sản phẩm vào giỏ hàng!`,
                    {
                      duration: 4000,
                    },
                  );

                  router.invalidate();
                }
              });
            }}
          >
            <ShoppingCartIcon />
            Thêm vào giỏ hàng
          </Button>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="store-policy">
              <AccordionTrigger>Chính sách cửa hàng</AccordionTrigger>
              <AccordionContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  non eleifend massa, vitae fermentum sapien. Aliquam et
                  consequat velit, sit amet euismod leo. Phasellus egestas
                  sollicitudin tortor, vitae sodales metus varius id. Praesent
                  mattis in enim a vulputate. Vivamus vulputate a dolor et
                  semper. Morbi non molestie lacus. Curabitur varius turpis ac
                  efficitur pharetra. Nullam accumsan nisl non euismod viverra.
                  Curabitur viverra cursus efficitur. Aenean facilisis convallis
                  tincidunt.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping-info">
              <AccordionTrigger>Thông tin giao hàng</AccordionTrigger>
              <AccordionContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  non eleifend massa, vitae fermentum sapien. Aliquam et
                  consequat velit, sit amet euismod leo. Phasellus egestas
                  sollicitudin tortor, vitae sodales metus varius id. Praesent
                  mattis in enim a vulputate. Vivamus vulputate a dolor et
                  semper. Morbi non molestie lacus. Curabitur varius turpis ac
                  efficitur pharetra. Nullam accumsan nisl non euismod viverra.
                  Curabitur viverra cursus efficitur. Aenean facilisis convallis
                  tincidunt.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="refund-info">
              <AccordionTrigger>Hoàn trả đơn hàng</AccordionTrigger>
              <AccordionContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  non eleifend massa, vitae fermentum sapien. Aliquam et
                  consequat velit, sit amet euismod leo. Phasellus egestas
                  sollicitudin tortor, vitae sodales metus varius id. Praesent
                  mattis in enim a vulputate. Vivamus vulputate a dolor et
                  semper. Morbi non molestie lacus. Curabitur varius turpis ac
                  efficitur pharetra. Nullam accumsan nisl non euismod viverra.
                  Curabitur viverra cursus efficitur. Aenean facilisis convallis
                  tincidunt.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="operation-info">
              <AccordionTrigger>Quy chế hoạt động</AccordionTrigger>
              <AccordionContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  non eleifend massa, vitae fermentum sapien. Aliquam et
                  consequat velit, sit amet euismod leo. Phasellus egestas
                  sollicitudin tortor, vitae sodales metus varius id. Praesent
                  mattis in enim a vulputate. Vivamus vulputate a dolor et
                  semper. Morbi non molestie lacus. Curabitur varius turpis ac
                  efficitur pharetra. Nullam accumsan nisl non euismod viverra.
                  Curabitur viverra cursus efficitur. Aenean facilisis convallis
                  tincidunt.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </header>
    </>
  );
}
