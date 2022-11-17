import Link from "next/link";
import type { SidebarItem } from "./types";

const SidebarButton = ({ href, title, icon, collapsed }: SidebarItem) => {
  return (
    <Link href={href}>
      <li className="cursor-pointer text-lg">
        {icon}
        <a className={`${collapsed ? "hidden " : ""}ml-3`}>{title}</a>
      </li>
    </Link>
  );
};

export default SidebarButton;
