import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Head from "next/head";
import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { trpc } from "../utils/trpc";

const sidebarItems = [
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    href: "/dashboard/transactions",
    title: "Transactions",
    icon: <ReceiptLongIcon />,
  },
  {
    href: "/dashboard/incomes",
    title: "Incomes",
    icon: <TrendingUpIcon />,
  },
  {
    href: "/dashboard/expenses",
    title: "Expenses",
    icon: <TrendingDownIcon />,
  },
  {
    href: "/dashboard/settings",
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
  const user = trpc.user.getUser.useQuery();

  if (!user.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Pudget</title>
      </Head>
      <div className="flex h-full w-full">
        <Sidebar user={user.data} items={sidebarItems} />
        <main>{children}</main>
      </div>
    </>
  );
};

export default HomeLayout;
