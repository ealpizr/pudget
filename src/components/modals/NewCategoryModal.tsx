import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { z } from "zod";
import ModalBody from "./layout/ModalBody";
import ModalContainer from "./layout/ModalContainer";
import ModalFooter from "./layout/ModalFooter";
import ModalHeader from "./layout/ModalHeader";

interface Props {
  onSubmit: SubmitHandler<NewCategoryModalInputs>;
  closeModal: () => void;
}

const CategoryType = z.enum(["INCOME", "EXPENSE", "ALL"]);
type CategoryType = z.infer<typeof CategoryType>;

const schema = z.object({
  name: z.string(),
  type: CategoryType,
});

export type NewCategoryModalInputs = z.infer<typeof schema>;

const NewCategoryModal = ({ closeModal, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewCategoryModalInputs>({ resolver: zodResolver(schema) });

  return (
    <ModalContainer closeModal={closeModal}>
      {isSubmitting && (
        <div className="absolute flex h-full w-full items-center justify-center bg-white">
          <MoonLoader />
        </div>
      )}
      <ModalHeader title={"New Category"} closeModal={closeModal} />
      <ModalBody>
        <div className="mb-6 w-full">
          <p className="mb-1 text-sm">Name</p>
          <input
            className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
            placeholder="Category name"
            {...register("name")}
          />
        </div>
        <div className="mb-6 w-full">
          <p className="mb-1 text-sm">Type</p>
          <select
            className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
            {...register("type")}
          >
            <option value={CategoryType.Values.ALL}>ALL</option>
            <option value={CategoryType.Values.INCOME}>INCOME</option>
            <option value={CategoryType.Values.EXPENSE}>EXPENSE</option>
          </select>
        </div>
        <div className="mb-6 w-full">
          <p className="mb-1 text-sm">Icon</p>
          <p>Icon picker coming soon...</p>
        </div>
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

export default NewCategoryModal;
