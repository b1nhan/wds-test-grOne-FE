import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* design lại navbar */}
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
}
