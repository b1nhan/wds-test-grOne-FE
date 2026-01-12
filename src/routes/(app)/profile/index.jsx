import { createFileRoute, redirect } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { VNDformat } from '@/lib/utils';
import {
  UserIcon,
  PhoneIcon,
  MailIcon,
  WalletIcon,
  FileText,
  RectangleEllipsis,
} from 'lucide-react';
import { OrderHistoryItem } from '@/components/OrderHistoryItem';
import { useState } from 'react';
import { getProfileDetail } from '@/lib/utils.auth';
import { getMyOrder } from '@/lib/utils.order';

export const Route = createFileRoute('/(app)/profile/')({
  component: ProfilePage,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/auth/login' });
    }
  },
  loader: async ({}) => {
    const orders = await getMyOrder();
    const user = await getProfileDetail();
    return {
      orders: orders.data,
      user,
    };
  },
});

function ProfilePage() {
  const { user, orders } = Route.useLoaderData();

  // Mapping
  const userInfo = {
    name: user.name || 'N/A',
    email: user.email || 'N/A',
    phone: user.phone || 'Chưa cập nhật',
    role: user.role || 'USER',
    moneySpent: user.moneySpent || 0,
  };

  const [isEmailVisible, setIsEmailVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="h-48 w-full bg-gray-500"></div>

      <div className="container mx-auto -mt-24 px-4">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Card className="overflow-hidden border-0 shadow-xl">
              <CardHeader className="flex flex-col items-center bg-white pb-2">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-md">
                  <UserIcon size={40} className="text-black" />
                </div>
                <CardTitle className="mt-4 text-2xl font-bold uppercase">
                  {userInfo.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm font-semibold tracking-widest">
                  {userInfo.role}
                </p>
              </CardHeader>

              <CardContent className="mt-4 flex flex-col items-center space-y-6">
                <Separator className="w-full" />

                <div className="w-full max-w-[280px] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gray-100 p-2 text-gray-600">
                      <MailIcon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase">
                        Email
                      </p>
                      <p className="text-sm font-medium">{userInfo.email}</p>
                    </div>
                  </div>

                  {user.email.match(/hv|nt/) ? (
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-gray-100 p-2 text-gray-600">
                        <RectangleEllipsis size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">
                          Mật khẩu
                        </p>
                        {isEmailVisible ? (
                          <p
                            className="animate-in fade-in cursor-pointer text-sm font-medium duration-500"
                            onClick={() => setIsEmailVisible(false)}
                          >
                            ********
                          </p>
                        ) : (
                          <p
                            className="animate-in fade-in cursor-pointer text-sm font-normal opacity-[50%] duration-500 hover:font-medium hover:opacity-[100%]"
                            onClick={() => setIsEmailVisible(true)}
                          >
                            Click để hiển thị
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gray-100 p-2 text-gray-600">
                      <PhoneIcon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase">
                        Số điện thoại
                      </p>
                      <p className="text-sm font-medium">{userInfo.phone}</p>
                    </div>
                  </div>
                </div>

                <Card className="w-full max-w-[300px] border-0 bg-gray-100 p-4 shadow-inner">
                  <div className="flex items-center justify-between gap-4">
                    <div className="rounded-full bg-white p-2 text-black shadow-sm">
                      <WalletIcon size={20} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-500 uppercase">
                        Tổng số tiền đã chi tiêu
                      </p>
                      <p className="text-xl font-bold">
                        {VNDformat(userInfo.moneySpent)}
                      </p>
                    </div>
                  </div>
                </Card>
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-8">
            <div className="mb-6 flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white uppercase">
                Lịch sử mua hàng
              </h2>
              <FileText className="text-white" size={28} />
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <OrderHistoryItem key={order.id} order={order} />
                ))
              ) : (
                <div className="p-20 text-center">
                  <p className="text-muted-foreground font-medium">
                    Có vẻ như bạn chưa có đơn hàng nào... Mua hàng đi bạn !
                  </p>
                </div>
              )}
            </Accordion>
          </main>
        </div>
      </div>
    </div>
  );
}
