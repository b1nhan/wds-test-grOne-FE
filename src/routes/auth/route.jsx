import { createFileRoute, Outlet } from '@tanstack/react-router';
import AuthBanner from '@/assets/auth-banner.jpg';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex h-svh flex-row justify-stretch">
      <div className="flex flex-1 items-center justify-center p-4">
        <Outlet />
      </div>

      <img
        src={AuthBanner}
        alt="auth banner"
        className="hidden h-full w-1/2 object-cover xl:block"
      />
    </main>
  );
}
