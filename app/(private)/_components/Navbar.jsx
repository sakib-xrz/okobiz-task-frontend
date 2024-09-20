"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Avatar, Drawer, Menu as AntdMenu, Button } from "antd";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import useStore from "@/store";
import UserProfile from "./UserProfile";
import logo from "@/public/logo.png";
import { NAV_OPTIONS } from "@/lib/keyChain";

const { Item } = AntdMenu;

export default function Navbar() {
  const { user } = useStore();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const selectedKey =
    pathname === "/nid" ? "0" : pathname === "/users" ? "1" : "";

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="border-border sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-2">
        <Link href={"/nid"} className="h-12">
          <Image
            src={logo}
            alt="AppointEase Logo"
            quality={100}
            className="aspect-auto h-12 w-auto object-cover md:h-full"
            loading="eager"
          />
        </Link>
        <div className="hidden sm:block">
          <UserProfile />
        </div>
        <div className="sm:hidden">
          <Menu className="size-8 text-primary" onClick={showDrawer} />
        </div>
      </div>

      <Drawer
        title={
          <div className="flex w-fit cursor-pointer items-center gap-2 rounded-md border p-2">
            <Avatar icon={<UserRound />} size={"small"} />
            <div className="pr-2">
              <p className="text-start text-xs font-semibold text-gray-700">
                {user?.name}
              </p>
              <p className="text-start text-xs font-medium text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>
        }
        placement={"right"}
        closable={false}
        open={open}
        key={"right"}
        extra={<X className="size-8" onClick={onClose} />}
        bodyStyle={{ padding: 0 }}
      >
        <div>
          <AntdMenu
            mode="vertical"
            style={{ width: "100%" }}
            selectable
            selectedKeys={[selectedKey]}
          >
            {NAV_OPTIONS.slice(0, -1).map((item) => {
              if (item.type === "divider") {
                return;
              }

              if (item.role.includes(user?.role)) {
                return <Item key={item.key}>{item.label}</Item>;
              }
            })}
          </AntdMenu>

          <Link
            onClick={() => setOpen(false)}
            href="/logout"
            className="absolute bottom-6 right-6"
          >
            <Button danger type="primary" className="flex items-center gap-2">
              <LogOut className="size-5" /> Logout
            </Button>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
