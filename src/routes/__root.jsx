import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '@/styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getProfile } from '@/lib/utils.auth';
import { getCart } from '@/lib/utils.cart';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/contexts/CartContext';

const RootLayout = () => {
  const { cart } = Route.useRouteContext();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider initialCart={cart}>
        <Outlet />
        <Toaster />
        <TanStackRouterDevtools />
      </CartProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: async () => {
    return { user: await getProfile(), cart: await getCart() };
  },
});
