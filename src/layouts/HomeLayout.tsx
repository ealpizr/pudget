import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Head from "next/head";
import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";

const sidebarItems = [
  {
    href: "/",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    href: "/transactions",
    title: "Transactions",
    icon: <ReceiptLongIcon />,
  },
  {
    href: "/incomes",
    title: "Incomes",
    icon: <TrendingUpIcon />,
  },
  {
    href: "/expenses",
    title: "Expenses",
    icon: <TrendingDownIcon />,
  },
  {
    href: "/settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
  {
    href: "/api/auth/signout",
    title: "Sign out",
    icon: <ExitToAppIcon />,
  },
];

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Pudget</title>
      </Head>
      <div className="flex h-full w-full">
        <Sidebar items={sidebarItems} />
        <main>{children}</main>
      </div>
    </>
  );
};

export default HomeLayout;
