import { ReactNode } from "react";

type SidebarItem = {
  collapsed?: boolean;
  href: string;
  title: string;
  icon: ReactNode;
};

export type { SidebarItem };
