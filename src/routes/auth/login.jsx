import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();

    // logic đăng nhập ở đây

    router.navigate({ to: '/' });
  };

  return (
    <div className="flex w-full max-w-92 flex-col gap-8">
      <div>
        <h1 className="font-semibold">Đăng nhập</h1>
        <p className="text-muted-foreground text-sm">
          Đăng nhập vào tài khoản của bạn
        </p>
      </div>

      <form onSubmit={login} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Tên đăng nhập</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-muted-foreground text-sm">
          Chưa có tài khoản?{' '}
          <Link to="/auth/register" className="link">
            Đăng ký
          </Link>{' '}
          ngay!
        </p>
        <Button type="submit">Đăng nhập</Button>
      </form>
    </div>
  );
}
