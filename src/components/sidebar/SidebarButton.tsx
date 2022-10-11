import Link from "next/link";
import type { SidebarItem } from "./types";

const SidebarButton = ({ href, title, icon }: SidebarItem) => {
  return (
    <Link href={href}>
      <li className="cursor-pointer px-6 py-3 text-xl">
        {icon}
        <a className="ml-3">{title}</a>
      </li>
    </Link>
  );
};

export default SidebarButton;
