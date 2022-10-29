import Image from "next/image";
import NoDataIllustration from "./no-data.svg";

const EmptyTableIllustration = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <div className="max-w-[300px]">
        <Image src={NoDataIllustration} alt="Illustration" />
      </div>
      <h3 className="text-center text-3xl font-bold">
        You don&apos;t have any incomes
      </h3>
    </div>
  );
};

export default EmptyTableIllustration;
