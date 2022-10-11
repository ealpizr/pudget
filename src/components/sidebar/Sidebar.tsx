import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Image from "next/image";
import AvatarPlaceholder from "./avatar-placeholder.jpg";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  return (
    <section className="flex h-full flex-col justify-between border border-r-gray-500 bg-pudgetDark text-white">
      <div className="flex flex-1 flex-col items-center justify-center p-3">
        <div className="flex w-full items-center justify-between">
          <p className="font-pudgetDisplay text-3xl text-yellow-400">Pudget</p>
          <button>
            <IndeterminateCheckBoxOutlinedIcon />
          </button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <div className="max-w-[100px]">
            <Image
              className="rounded-full"
              src={AvatarPlaceholder}
              alt="User Avatar"
            />
          </div>
          <p className="text-xl font-bold">Username</p>
        </div>
      </div>
      <div>
        <ul className="flex flex-col gap-1">
          <SidebarButton text="Dashboard" icon={<DashboardIcon />} />
          <SidebarButton text="Transactions" icon={<ReceiptLongIcon />} />
          <SidebarButton text="Incomes" icon={<TrendingUpIcon />} />
          <SidebarButton text="Expenses" icon={<TrendingDownIcon />} />
          <SidebarButton text="Settings" icon={<SettingsIcon />} />
          <SidebarButton text="Sign out" icon={<ExitToAppIcon />} />
        </ul>
      </div>
      <div className="flex flex-1 items-end justify-center">
        <span className="mb-4">Light / Dark</span>
      </div>
    </section>
  );
};

export default Sidebar;
