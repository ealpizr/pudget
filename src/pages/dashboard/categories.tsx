import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import NewCategoryModal, {
  NewCategoryModalInputs,
} from "../../components/modals/NewCategoryModal";
import CategoryTable from "../../components/tables/CategoryTable";
import EmptyTableIllustration from "../../components/tables/EmptyTableIllustration";
import HomeLayout from "../../layouts/HomeLayout";
import { trpc } from "../../utils/trpc";

const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = trpc.category.getCategories.useQuery();
  const createCategory = trpc.category.createCategory.useMutation();

  const closeModal = async (refetch?: boolean) => {
    if (refetch) {
      await categories.refetch();
    }
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<NewCategoryModalInputs> = async (data) => {
    await createCategory.mutateAsync({
      name: data.name,
      type: data.type,
      icon: data.icon,
    });
    await closeModal(true);
  };

  return (
    <HomeLayout>
      <div className="flex h-full w-full flex-col gap-3 p-2 md:relative md:p-6">
        <div className="flex items-center justify-between p-2">
          <h3 className="text-xl font-bold md:text-2xl">Categories</h3>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="rounded-md bg-pudgetYellow py-2 px-4 font-bold"
          >
            Create category
          </button>
        </div>
        <div className="flex h-full">
          {!categories.data || categories.isLoading ? (
            <p>Loading categories...</p>
          ) : (
            <>
              {categories.data.length > 0 ? (
                <CategoryTable categories={categories.data} />
              ) : (
                <EmptyTableIllustration />
              )}
            </>
          )}
        </div>
        {isModalOpen && (
          <NewCategoryModal
            onSubmit={onSubmit}
            closeModal={() => closeModal(false)}
          />
        )}
      </div>
    </HomeLayout>
  );
};

export default CategoriesPage;
