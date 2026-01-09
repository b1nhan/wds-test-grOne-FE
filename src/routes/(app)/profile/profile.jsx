// src/routes/(app)/profile.jsx
import { createFileRoute } from '@tanstack/react-router';
import { MOCK_USER, MOCK_ORDERS } from '@/api/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { VNDformat } from '@/lib/utils';
import { UserIcon, PhoneIcon, MailIcon, WalletIcon, HistoryIcon } from 'lucide-react';
import { OrderHistoryItem } from '@/components/OrderHistoryItem';

export const Route = createFileRoute('/(app)/profile/profile')({
  component: ProfilePage,
  loader: async () => {
    // Giả lập gọi API
    return {
      user: MOCK_USER.data,
      orders: MOCK_ORDERS.data,
    };
  },
});

function ProfilePage() {
  const { user, orders } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="h-48 w-full bg-gray-500"></div>
      
      <div className="container mx-auto -mt-24 px-4">
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Cột trái: Thông tin User */}
          <aside className="lg:col-span-4">
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-white pb-2 flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                  <UserIcon size={40} className="text-black" />
                </div>
                <CardTitle className="mt-4 text-2xl font-bold">{user.fullName}</CardTitle>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">{user.role=="admin"?user.role:null}</p>
              </CardHeader>
              
              <CardContent className="mt-4 space-y-4 flex flex-col items-center">
                <Separator />
                <div className='flex flex-col items-center'>

                <div className="space-y-4 py-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                      <MailIcon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                      <p className="text-sm font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                      <PhoneIcon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Số điện thoại</p>
                      <p className="text-sm font-medium">{user.phone}</p>
                    </div>
                  </div>
                </div>

                  <Card className="p-3 shadow-xl border-0 overflow-hidden bg-gray-200">
                    <div className="flex items-center justify-between gap-3">
                      <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                        <WalletIcon size={18} />
                      </div>
                      <div className='text-right'>
                        <p className="text-xs text-gray-500 uppercase font-bold">Tổng số tiền đã chi tiêu</p>
                        <p className="text-lg font-bold">{VNDformat(user.totalSpending)}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Cột phải: Lịch sử đơn hàng */}
          <main className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-white text-2xl font-bold">Lịch sử mua hàng</h2>
              <HistoryIcon className="text-white" />
            </div>

            <Accordion type="single" collapsible className="w-full">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <OrderHistoryItem key={order.id} order={order} />
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed">
                  <p className="text-gray-400">Bạn chưa có đơn hàng nào.</p>
                </div>
              )}
            </Accordion>
          </main>

        </div>
      </div>
    </div>
  );
}