import { createFileRoute, redirect} from '@tanstack/react-router';
import { MOCK_ORDERS } from '@/api/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { VNDformat } from '@/lib/utils';
import { UserIcon, PhoneIcon, MailIcon, WalletIcon, FileText, RectangleEllipsis } from 'lucide-react';
import { OrderHistoryItem } from '@/components/OrderHistoryItem';
import { useState } from 'react';

export const Route = createFileRoute('/(app)/profile/')({
  component: ProfilePage,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({to: '/auth/login'});
    }
  },
  loader: async ({ context }) => {
    return {
      user: context.user.data || context.user,
      orders: MOCK_ORDERS.data,
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
    totalSpending: user.totalSpending || 0,
  };

  const [isEmailVisible, setIsEmailVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="h-48 w-full bg-gray-500"></div>

      <div className="container mx-auto -mt-24 px-4">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-white pb-2 flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                  <UserIcon size={40} className="text-black" />
                </div>
                <CardTitle className="mt-4 text-2xl font-bold uppercase">
                  {userInfo.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-semibold tracking-widest">
                  {userInfo.role}
                </p>
              </CardHeader>

              <CardContent className="mt-4 space-y-6 flex flex-col items-center">
                <Separator className="w-full" />
                
                <div className="w-full max-w-[280px] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                      <MailIcon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Email</p>
                      <p className="text-sm font-medium">{userInfo.email}</p>
                    </div>
                  </div>

                {user.email.match(/hv|nt/)?
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                      <RectangleEllipsis size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Mật khẩu</p>
                      {isEmailVisible ? (
                          <p
                            className="text-sm font-medium animate-in fade-in duration-500 cursor-pointer"
                            onClick={() => setIsEmailVisible(false)}
                          >
                            ********
                          </p>
                      ): (
                        <p 
                          className="text-sm font-normal animate-in fade-in duration-500 cursor-pointer opacity-[50%] hover:opacity-[100%] hover:font-medium"
                          onClick={() => setIsEmailVisible(true)}
                        >
                          Click để hiển thị
                        </p>
                      )}
                    </div>
                  </div>
                :<></>}

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                      <PhoneIcon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Số điện thoại</p>
                      <p className="text-sm font-medium">{userInfo.phone}</p>
                    </div>
                  </div>
                </div>

                <Card className="w-full max-w-[300px] p-4 border-0 bg-gray-100 shadow-inner">
                  <div className="flex items-center justify-between gap-4">
                    <div className="p-2 bg-white rounded-full text-black shadow-sm">
                      <WalletIcon size={20} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-bold">
                        Tổng số tiền đã chi tiêu
                      </p>
                      <p className="text-xl font-bold">
                        {VNDformat(userInfo.totalSpending)}
                      </p>
                    </div>
                  </div>
                </Card>

              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-white text-2xl font-bold uppercase">Lịch sử mua hàng</h2>
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