import CloseIcon from "@mui/icons-material/Close";
import PaymentsIcon from "@mui/icons-material/Payments";
import RedeemIcon from "@mui/icons-material/Redeem";
import WorkIcon from "@mui/icons-material/Work";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const NewIncomeModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.value = new Date().toISOString().split("T")[0] || "";
    }
  }, []);

  return (
    <div
      className={`absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 ${
        isModalOpen ? "" : "hidden"
      }`}
    >
      {/* <div
        className="absolute h-full w-full"
        onClick={() => setIsModalOpen(false)}
      ></div> */}
      <div className="z-10 flex w-full max-w-[600px] flex-col items-center justify-center rounded-lg bg-white">
        <div className="flex w-full items-center justify-between border-b p-4">
          <h3 className="text-xl font-bold">New Income</h3>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="rounded-lg p-1 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="w-full flex-1 p-5">
          <div className="mb-6 w-full self-center">
            <p className="mb-1 text-sm">Description</p>
            <textarea
              className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
              placeholder="Income description..."
              name="description"
            />
          </div>
          <div className="flex gap-3">
            <div className="mb-6 w-full self-center">
              <p className="mb-1 text-sm">Date</p>
              <input
                className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
                placeholder="Income description..."
                name="description"
                type="date"
                ref={dateInputRef}
              />
            </div>
            <div className="mb-6 w-full self-center">
              <p className="mb-1 text-sm">Amount</p>
              <input
                className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
                placeholder="50,000"
                name="description"
                type="number"
              />
            </div>
          </div>

          <ul className="flex items-center justify-center gap-3">
            <CategoryItem icon={<PaymentsIcon />} name="Other" selected />
            <CategoryItem icon={<WorkIcon />} name="Salary" />
            <CategoryItem icon={<RedeemIcon />} name="Allowance" />
          </ul>
        </div>
        <div className="flex w-full items-center justify-end border-t p-6">
          <button className="rounded-lg bg-pudgetYellow p-2 px-4">Save</button>
        </div>
      </div>
    </div>
  );
};

const CategoryItem = ({
  icon,
  name,
  selected,
}: {
  icon: JSX.Element;
  name: string;
  selected?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (selected && inputRef.current) {
      inputRef.current.checked = true;
    }
  }, [selected]);
  return (
    <li className="flex-1">
      <input
        type="radio"
        id={`category${name}`}
        className="peer hidden"
        name="category"
        ref={inputRef}
      />
      <label
        htmlFor={`category${name}`}
        className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-pudgetYellow peer-checked:text-pudgetYellow"
      >
        {icon}
        <p>{name}</p>
      </label>
    </li>
  );
};

export default NewIncomeModal;
