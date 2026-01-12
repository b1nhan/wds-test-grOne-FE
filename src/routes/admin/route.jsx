import AdminSidebar from '@/components/AdminSidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: () => {
    const { user } = Route.useRouteContext();

    if (!user || user.role.toUpperCase() !== 'ADMIN') {
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
