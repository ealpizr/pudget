import { zodResolver } from "@hookform/resolvers/zod";
import PaymentsIcon from "@mui/icons-material/Payments";
import RedeemIcon from "@mui/icons-material/Redeem";
import WorkIcon from "@mui/icons-material/Work";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { z } from "zod";
import ModalBody from "./layout/ModalBody";
import ModalContainer from "./layout/ModalContainer";
import ModalFooter from "./layout/ModalFooter";
import ModalHeader from "./layout/ModalHeader";

export enum TransactionTypes {
  "INCOME",
  "EXPENSE",
}

interface Props {
  type: TransactionTypes;
  onSubmit: SubmitHandler<NewTransactionModalInputs>;
  closeModal: () => void;
}

const schema = z.object({
  description: z.string().nullable(),
  amount: z.number(),
  date: z.date(),
});

export type NewTransactionModalInputs = z.infer<typeof schema>;

const NewTransactionModal = ({ type, closeModal, onSubmit }: Props) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionModalInputs>({ resolver: zodResolver(schema) });

  useEffect(() => {
    // @ts-expect-error: RHF need a string to set default date
    setValue("date", new Date().toISOString().substring(0, 10));
  }, [setValue]);

  return (
    <ModalContainer closeModal={closeModal}>
      {isSubmitting && (
        <div className="absolute flex h-full w-full items-center justify-center bg-white">
          <MoonLoader />
        </div>
      )}
      <ModalHeader
        title={`New ${type === TransactionTypes.INCOME ? "Income" : "Expense"}`}
        closeModal={closeModal}
      />
      <ModalBody>
        <div className="mb-6 w-full self-center">
          <p className="mb-1 text-sm">Description</p>
          <textarea
            className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
            placeholder="Income description..."
            {...register("description")}
          />
        </div>
        <div className="flex gap-3">
          <div className="mb-6 w-full self-center">
            <p className="mb-1 text-sm">Date</p>
            <input
              className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
              placeholder="Income description..."
              type="date"
              {...register("date", { valueAsDate: true })}
            />
          </div>
          <div className="mb-6 w-full self-center">
            <p className="mb-1 text-sm">Amount</p>
            <input
              className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
              placeholder="50,000"
              type="number"
              {...register("amount", { valueAsNumber: true })}
            />
          </div>
        </div>

        <ul className="flex items-center justify-center gap-3">
          <CategoryItem icon={<PaymentsIcon />} name="Other" selected />
          <CategoryItem icon={<WorkIcon />} name="Salary" />
          <CategoryItem icon={<RedeemIcon />} name="Allowance" />
        </ul>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={handleSubmit(onSubmit)}
          className="rounded-lg bg-pudgetYellow p-2 px-4"
        >
          Save
        </button>
      </ModalFooter>
    </ModalContainer>
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

export default NewTransactionModal;
