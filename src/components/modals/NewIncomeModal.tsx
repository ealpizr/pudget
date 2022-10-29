import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import PaymentsIcon from "@mui/icons-material/Payments";
import RedeemIcon from "@mui/icons-material/Redeem";
import WorkIcon from "@mui/icons-material/Work";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { z } from "zod";
import { trpc } from "../../utils/trpc";

interface Props {
  closeModal: (refetch?: boolean) => Promise<void>;
}

const schema = z.object({
  description: z.string().nullable(),
  amount: z.number(),
  date: z.date(),
});

type Inputs = z.infer<typeof schema>;

const NewIncomeModal = ({ closeModal }: Props) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  useEffect(() => {
    // @ts-expect-error: RHF need a string to set default date
    setValue("date", new Date().toISOString().substring(0, 10));
  }, [setValue]);

  const createTransaction = trpc.transaction.createTransaction.useMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createTransaction.mutateAsync({
      description: data.description,
      type: "INCOME",
      categoryId: 1,
      amount: data.amount,
      date: data.date,
    });
    await closeModal(true);
  };

  return (
    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div
        className="absolute h-full w-full"
        onClick={() => closeModal()}
      ></div>
      <div className="relative z-10 flex w-full max-w-[600px] flex-col items-center justify-center overflow-hidden rounded-lg bg-white">
        {isSubmitting && (
          <div className="absolute flex h-full w-full items-center justify-center bg-white">
            <MoonLoader />
          </div>
        )}
        <div className="flex w-full items-center justify-between border-b p-4">
          <h3 className="text-xl font-bold">New Income</h3>
          <button
            onClick={() => {
              closeModal();
            }}
            className="rounded-lg p-1 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          >
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
          <div className="w-full flex-1 p-5">
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
          </div>
          <div className="flex w-full items-center justify-end border-t p-6">
            <button
              type="submit"
              className="rounded-lg bg-pudgetYellow p-2 px-4"
            >
              Save
            </button>
          </div>
        </form>
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
