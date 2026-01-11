import { ShoppingCartIcon } from 'lucide-react';
import Navbar from './Navbar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from './ui/sidebar';
import { Link } from '@tanstack/react-router';

const SidebarLink = ({ href, children }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link to={href} className="inline-flex items-center gap-2">
          {children}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const AdminSidebar = ({ children }) => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarLink href="/admin">
                  <ShoppingCartIcon />
                  Quản lý sản phẩm
                </SidebarLink>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main className="w-full flex-1">
        <Navbar>
          <SidebarTrigger />
        </Navbar>

        <div className="flex w-full flex-col">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AdminSidebar;
