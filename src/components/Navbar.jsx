import { CircleUser, ShoppingCart } from 'lucide-react';

let Navbar = () => {
  return (
    <header>
      <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between bg-white p-4 px-10 shadow">
        <div className="text-3xl font-bold">LOGO</div>
        <div className="Right flex gap-6">
          <ShoppingCart />
          <div className="flex items-center gap-2">
            <b>Username</b>
            <CircleUser className="size-8" />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
