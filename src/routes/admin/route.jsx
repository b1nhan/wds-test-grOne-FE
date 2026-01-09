// import AdminSidebar from '@/components/AdminSidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '@/components';
export const Route = createFileRoute('/admin')({
  component: () => {
    // kiểm tra quyền admin ở đây
    // eslint-disable-next-line no-constant-condition
    if (false) {
      return <NotAdminComponent />;
    }

    return <RouteComponent />;
  },
});

function NotAdminComponent() {
  return <p>Bạn không có quyền truy cập trang này</p>;
}
const queryClient = new QueryClient();

function RouteComponent() {
  return (
    // <AdminSidebar>
    // </AdminSidebar>
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
    </QueryClientProvider>
  );
}
