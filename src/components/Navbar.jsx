import { CircleUser, ShoppingCart } from 'lucide-react';
import { Link } from '@tanstack/react-router';
let Navbar = () => {
  return (
    <header>
      <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between bg-white p-4 px-10 shadow">
        <Link className="text-3xl font-bold" to="/">
          LOGO
        </Link>
        <div className="Right flex gap-6">
          <Link to="/admin">
            <b>Quản lý</b>
          </Link>
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
