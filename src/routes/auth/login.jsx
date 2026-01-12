import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/utils.auth';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      await login({ email, password });
      router.navigate({ to: '/' });
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex w-full max-w-92 flex-col gap-8">
      <div>
        <h1 className="font-semibold">Đăng nhập</h1>
        <p className="text-muted-foreground text-sm">
          Đăng nhập vào tài khoản của bạn
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
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
        {error && <p className="text-destructive">{error}</p>}
        <Button disabled={loading} type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}
