import CloseIcon from "@mui/icons-material/Close";

interface Props {
  title: string;
  closeModal: () => void;
}

const ModalHeader = ({ title, closeModal }: Props) => {
  return (
    <div className="flex w-full items-center justify-between border-b p-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <button
        onClick={() => closeModal()}
        className="rounded-lg p-1 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default ModalHeader;
