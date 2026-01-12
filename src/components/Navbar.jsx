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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { logout } from '@/lib/utils.auth';
import { cn } from '@/lib/utils';

const LoggedIn = ({ user }) => {
  const router = useRouter();
  return (
    <>
      <Link
        to="/cart"
        className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      >
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
            <Link to="/">
              <DropdownMenuItem>
                <User /> Profile
              </DropdownMenuItem>
            </Link>

            {user.role === 'ADMIN' && (
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
  const { user } = useRouteContext({ from: '__root__' });

  return (
    <header>
      <nav
        className={cn(
          'bg-background sticky inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-2',
          className,
        )}
      >
        <Link to={'/'} className="flex items-center gap-2">
          {children} <h1 className="font-bold">Cửa hàng</h1>
        </Link>

        <div className="flex items-center gap-2">
          {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
