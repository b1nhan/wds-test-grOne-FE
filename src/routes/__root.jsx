import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '@/styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getProfile } from '@/lib/utils.auth';

const RootLayout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: async () => {
    return { user: await getProfile() };
  },
});
