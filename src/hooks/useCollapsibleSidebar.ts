import { useEffect, useState } from "react";

const useCollapsibleSidebar = (): [boolean, () => void] => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed((p) => !p);
  };

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [collapsed, toggleCollapsed];
};

export default useCollapsibleSidebar;
