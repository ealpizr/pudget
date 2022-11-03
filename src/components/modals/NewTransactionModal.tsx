import { zodResolver } from "@hookform/resolvers/zod";
import * as Icons from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm, UseFormSetValue } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { z } from "zod";
import { trpc } from "../../utils/trpc";
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
  categoryId: z.number(),
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

  const categories = trpc.category.getCategories.useQuery(
    type === TransactionTypes.INCOME ? "INCOME" : "EXPENSE"
  );

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

        <p className="mb-1 text-sm">Category</p>
        <input
          hidden
          type="number"
          {...register("categoryId", { valueAsNumber: true })}
        />
        <ul className="flex max-h-28 flex-wrap items-center justify-center gap-3 overflow-y-auto px-2">
          {categories.data?.map((c, i) => {
            return (
              <CategoryItem
                key={i}
                icon={c.icon}
                name={c.name}
                setValue={setValue}
                id={c.id}
                selected={i === 0}
              />
            );
          })}
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
  setValue,
  id,
}: {
  icon: string;
  name: string;
  selected?: boolean;
  setValue: UseFormSetValue<{
    description: string | null;
    amount: number;
    date: Date;
    categoryId: number;
  }>;
  id: number;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (selected && inputRef.current) {
      inputRef.current.checked = true;
    }
  }, [selected]);

  const I = Icons[icon as keyof typeof Icons];

  return (
    <li
      className="flex-1"
      onClick={() => {
        setValue("categoryId", id);
      }}
    >
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
        <I />
        <p className="text-center">{name}</p>
      </label>
    </li>
  );
};

export default NewTransactionModal;
