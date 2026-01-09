import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '@/components/';
export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* design lại navbar */}
      {/* Bỏ vào để điều hướng */}
      <Navbar />
      <Outlet />
    </>
  );
}
