import * as Icons from "@mui/icons-material";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import { Paper } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { MoonLoader } from "react-spinners";
import { trpc } from "../utils/trpc";

interface Props {
  selectedIcon: string;
  setIcon: Dispatch<SetStateAction<string>>;
}

const IconPicker = ({ setIcon, selectedIcon }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("");
  const icons = trpc.icons.filter.useQuery(filter, { initialData: [] });

  const handleSetIcon = (icon: string) => {
    setIcon(icon);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const I = Icons[selectedIcon as keyof typeof Icons];

  return (
    <div className="relative w-full cursor-pointer  text-white">
      {!isOpen ? (
        <div className="flex h-10 w-10 items-center justify-center bg-gray-500">
          <I onClick={() => setIsOpen(true)} />
        </div>
      ) : (
        <>
          <Paper
            ref={containerRef}
            className="absolute top-0 left-0 flex max-h-[150px] w-full flex-wrap justify-center gap-1 overflow-auto p-2"
          >
            <input
              className="w-full rounded-md border-gray-100 p-1 outline-none"
              placeholder="Search"
              onChange={(e) => setFilter(e.target.value)}
            />
            {!icons || !icons.data ? (
              <MoonLoader />
            ) : (
              <>
                {icons.data.map((icon) => {
                  if (!Icons[icon as keyof typeof Icons]) {
                    return;
                  }
                  return (
                    <Icon
                      key={icon}
                      icon={icon}
                      handleSetIcon={handleSetIcon}
                    />
                  );
                })}
                {!filter ? (
                  <p className="py-1 text-xs md:text-sm">
                    Search to see more icons
                  </p>
                ) : (
                  <>
                    {icons.data.length == 0 && (
                      <div className="flex flex-col items-center justify-center gap-1">
                        <SentimentDissatisfiedTwoToneIcon />
                        <p>No icons found</p>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </Paper>
        </>
      )}
    </div>
  );
};

interface IconProps {
  icon: string;
  handleSetIcon: (arg0: string) => void;
}

const Icon = ({ icon, handleSetIcon }: IconProps) => {
  const I = Icons[icon as keyof typeof Icons];

  return (
    <div
      onClick={() => handleSetIcon(icon)}
      className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100"
    >
      <I />
    </div>
  );
};

export default IconPicker;
