import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '@/styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getProfileDetail } from '@/lib/utils.auth';
import { Toaster } from 'react-hot-toast';
import { getCart } from '@/lib/utils.cart';

const RootLayout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <Outlet />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: async () => {
    return { user: await getProfileDetail(), cart: await getCart() };
  },
});
