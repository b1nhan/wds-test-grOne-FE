import { createFileRoute } from '@tanstack/react-router';
import { productAPI } from '@/api/product.api';
import ShoeHeader from '@/assets/shoe-header.png';
import { SearchIcon, Settings2Icon, ShoppingBagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

export const Route = createFileRoute('/(app)/')({
  component: RouteComponent,
  loader: async () => {
    const data = await productAPI.getProducts({
      page: 1,
      limit: 10,
      sort: 'newest'
    });
    return { 
      products: data.data.items,
      pagination: data.data.pagination 
    };
  },
});

function RouteComponent() {
  const { products } = Route.useLoaderData();

  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <div className="container mx-auto flex h-160 items-stretch gap-16 px-4">
          <div className="flex max-w-[48ch] flex-1 flex-col justify-center gap-4">
            <h1 className="text-4xl leading-12 font-bold">
              Nâng tầm bước chân, khẳng định bản sắc.
            </h1>

            <p className="text-muted-foreground">
              Tuyển tập những thiết kế dẫn đầu xu hướng, giúp bạn định hình
              phong cách cá nhân độc bản trong mọi sự kiện.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <Button className="dark" size="lg">
                <ShoppingBagIcon />
                Mua ngay
              </Button>
            </div>
          </div>

          <img
            src={ShoeHeader}
            alt="shoe header"
            className="ml-auto w-160 object-contain object-center"
          />
        </div>
      </section>

      <section className="container mx-auto flex flex-col items-center px-4 py-16">
        <InputGroup className="max-w-xl rounded-full px-2 py-6">
          <InputGroupInput type="text" placeholder="Tìm kiếm" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="end">
            <InputGroupButton
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Settings2Icon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </section>

      <section className="container mx-auto flex flex-col gap-8 px-4 pb-32">
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>
        <div className="grid grid-cols-4 gap-8">
          {
          products.map((product) => (
            <ProductCard product={product} />
           )
          )
          }
        </div>
      </section>
    </>
  );
}
