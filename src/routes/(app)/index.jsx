import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import bannerIMG from '@/assets/banner.jpg';
import { Search, Settings2 } from 'lucide-react';
import { Card } from '@/components';

export const Route = createFileRoute('/(app)/')({
  component: RouteComponent,
  loader: async () => {
    const products = await axios
      .get('https://dummyjson.com/products')
      .then((res) => res.data.products);

    return { products };
  },
});

function RouteComponent() {
  const { products } = Route.useLoaderData();

  return (
    <div className="flex flex-col items-center">
      <div className="banner-search relative">
        <div className="container-fluid mt-[100px] h-[500px] w-screen overflow-hidden bg-slate-300">
          <img
            src={bannerIMG}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="search absolute bottom-[-20px] left-[50%] h-12 w-[80%] translate-x-[-50%] border border-black">
          <input
            type="text"
            placeholder="Tìm kiếm tại đây..."
            className="h-full w-full p-2"
          ></input>
          <div className="absolute top-2 right-5 flex gap-3">
            <Settings2 className="pt-1" />
            <button className="color-black btn flex h-full w-14 justify-center rounded-[5px] bg-gray-400 py-1">
              <Search />
            </button>
          </div>
        </div>
      </div>
      <div className="products-container flex flex-col items-center">
        <div className="mt-10 h-[2px] w-[50%] bg-black underline"></div>
        <h1 className="pt-4 text-4xl font-bold">Sản phẩm</h1>
        <div className="product-list grid grid-cols-1 gap-2 pt-3 md:grid-cols-4">
          {products.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              image={item.image}
              price={item.price}
            ></Card>
          ))}
        </div>
        <button className="mt-5 w-24 rounded-[5px] border border-black bg-gray-200 p-2 hover:bg-green-200">
          Xem thêm
        </button>
      </div>
      <div className="products-container flex flex-col items-center">
        <div className="mt-10 h-[2px] w-[50%] bg-black underline"></div>
        <h1 className="pt-4 text-4xl font-bold">Đề xuất</h1>
        <div className="product-list grid grid-cols-1 gap-2 pt-3 md:grid-cols-4">
          {products.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              image={item.image}
              price={item.price}
            ></Card>
          ))}
        </div>
        <button className="mt-5 w-24 rounded-[5px] border border-black bg-gray-200 p-2 hover:bg-green-200">
          Xem thêm
        </button>
      </div>
      <div className="h-10"></div>
    </div>
  );
}
