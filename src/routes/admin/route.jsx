import AdminSidebar from '@/components/AdminSidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

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

function RouteComponent() {
  return (
    <AdminSidebar>
      <Outlet />
    </AdminSidebar>
  );
}
