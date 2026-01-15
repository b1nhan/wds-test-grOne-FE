import { Link, useRouteContext, useRouter } from '@tanstack/react-router';
import { Button, buttonVariants } from './ui/button';
import {
  LayoutDashboardIcon,
  LogOutIcon,
  ShoppingCartIcon,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { logout } from '@/lib/utils.auth';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

const LoggedIn = ({ user, cart }) => {
  const router = useRouter();

  return (
    <>
      <Link
        to="/cart"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'relative',
        )}
      >
        {cart.data.length > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-0 right-0 size-4 rounded-full p-0 text-[10px]"
          >
            {cart.data.length}
          </Badge>
        )}
        <ShoppingCartIcon />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <User />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="min-w-48" align="end">
          <div className="p-2 text-sm">
            <h1 className="font-semibold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to="/profile/">
              <DropdownMenuItem>
                <User /> Profile
              </DropdownMenuItem>
            </Link>

            {user.role.toUpperCase() === 'ADMIN' && (
              <Link to="/admin">
                <DropdownMenuItem>
                  <LayoutDashboardIcon /> Admin
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuItem
              onClick={() => {
                logout();
                router.invalidate();
                router.navigate({ to: '/' });
              }}
            >
              <LogOutIcon /> Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const NotLoggedIn = () => {
  return (
    <>
      <Link to="/auth/login" className={buttonVariants({ variant: 'ghost' })}>
        Đăng nhập
      </Link>
      <Link to="/auth/register" className={buttonVariants()}>
        Đăng ký
      </Link>
    </>
  );
};
const Navbar = ({ children, className }) => {
  const { user, cart } = useRouteContext({ from: '__root__' });

  return (
    <header>
      <nav
        className={cn(
          'bg-background sticky inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-2',
          className,
        )}
      >
        <div className="flex items-center gap-2">
          {children}
          <Link to="/">
            <h1 className="font-bold">Cửa hàng</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? <LoggedIn user={user} cart={cart} /> : <NotLoggedIn />}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
