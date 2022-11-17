import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { inferProcedureOutput } from "@trpc/server";
import Image from "next/image";
import useCollapsibleSidebar from "../../hooks/useCollapsibleSidebar";
import { AppRouter } from "../../server/trpc/router";
import AvatarPlaceholder from "./avatar-placeholder.jpg";
import SidebarButton from "./SidebarButton";
import type { SidebarItem } from "./types";

interface Props {
  items: SidebarItem[];
  user: inferProcedureOutput<AppRouter["user"]["getUser"]>;
}

const Sidebar = ({ items, user }: Props) => {
  const [collapsed, toggleCollapsed] = useCollapsibleSidebar();

  return (
    <section
      className={`${
        collapsed ? "max-w-[60px] " : "absolute z-10 max-w-[250px] md:static "
      }flex h-full w-full flex-col justify-between border-r border-r-gray-500 bg-pudgetDark p-3 text-white`}
    >
      {/* PUDGET */}
      <div
        className={`${
          collapsed ? "justify-center " : "justify-between "
        }flex w-full items-center`}
      >
        <p
          className={`${
            collapsed ? "hidden " : ""
          }font-pudgetDisplay text-3xl text-yellow-400`}
        >
          Pudget
        </p>
        <p
          onClick={toggleCollapsed}
          className={`${
            collapsed ? "" : "hidden "
          }cursor-pointer font-pudgetDisplay text-3xl text-yellow-400`}
        >
          P
        </p>
        <button
          onClick={toggleCollapsed}
          className={`${collapsed ? "hidden " : ""}`}
        >
          <IndeterminateCheckBoxOutlinedIcon />
        </button>
      </div>

      {/* USER */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="max-w-[80px]">
          <Image
            className="rounded-full"
            src={AvatarPlaceholder}
            alt="User Avatar"
          />
        </div>
        <p
          className={`${collapsed ? "hidden " : ""}text-xl font-bold`}
        >{`${user.firstName} ${user.lastName}`}</p>
      </div>

      {/* MENU */}
      <div className="flex justify-center">
        <ul className="flex flex-col gap-4">
          {items.map((i) => (
            <SidebarButton
              collapsed={collapsed}
              key={i.title}
              title={i.title}
              icon={i.icon}
              href={i.href}
            />
          ))}
        </ul>
      </div>

      {/* THEME */}
      <div className="flex items-end justify-center">
        <span className={`${collapsed ? "hidden " : ""}`}>Light / Dark</span>
      </div>
    </section>
  );
};

export default Sidebar;
