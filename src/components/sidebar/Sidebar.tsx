import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import Image from "next/image";
import AvatarPlaceholder from "./avatar-placeholder.jpg";
import SidebarButton from "./SidebarButton";
import type { SidebarItem } from "./types";

interface Props {
  items: SidebarItem[];
}

const Sidebar = ({ items }: Props) => {
  return (
    <section className="flex h-full w-full max-w-[300px] flex-col justify-between border-r border-r-gray-500 bg-pudgetDark text-white ">
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
          {items.map((i) => (
            <SidebarButton
              key={i.title}
              title={i.title}
              icon={i.icon}
              href={i.href}
            />
          ))}
        </ul>
      </div>
      <div className="flex flex-1 items-end justify-center">
        <span className="mb-4">Light / Dark</span>
      </div>
    </section>
  );
};

export default Sidebar;
