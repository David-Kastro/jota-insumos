"use client";

import * as React from "react";

import { usePathname } from "next/navigation";
import JotaLogo from "@/public/jota-logo.webp";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { ClipboardPlus, Syringe, Users } from "lucide-react";

export type UserType = {
  name: string;
  email: string;
  avatar: string;
};

// This is sample data.
const data = {
  user: {
    name: "Anonimo",
    email: "default@mail.com",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Brian",
  },
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Gerenciamento de insumos",
      url: "#",
      items: [
        {
          title: "Procedimentos",
          url: "/procedimentos",
          icon: <ClipboardPlus />,
        },
        {
          title: "Insumos",
          url: "/insumos",
          icon: <Syringe />,
        },
        {
          title: "Usuários",
          url: "/usuarios",
          icon: <Users />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isActive = (url: string) => {
    return pathname.includes(url);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Image
          width={180}
          src={JotaLogo}
          alt="Jota logo"
          className="dark:grayscale"
        />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <div>
                        {item.icon}
                        <a href={item.url}>{item.title}</a>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
