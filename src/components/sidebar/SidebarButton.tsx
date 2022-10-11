import Link from "next/link";
import type { SidebarItem } from "./types";

const SidebarButton = ({ href, title, icon }: SidebarItem) => {
  return (
    <li className="cursor-pointer px-6 py-3 text-xl">
      {icon}
      <Link href={href}>
        <a className="ml-3">{title}</a>
      </Link>
    </li>
  );
};

export default SidebarButton;
