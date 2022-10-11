import { ReactNode } from "react";

interface Props {
  text: string;
  // SvgIconComponent does not work for some reason
  icon: ReactNode;
}

const SidebarButton = ({ text, icon }: Props) => {
  return (
    <li className="cursor-pointer px-6 py-3 text-xl">
      {icon}
      <span className="ml-3">{text}</span>
    </li>
  );
};

export default SidebarButton;
