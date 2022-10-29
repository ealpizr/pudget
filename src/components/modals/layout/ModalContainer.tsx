interface Props {
  children: React.ReactNode;
  closeModal: () => void;
}

const ModalContainer = ({ children, closeModal }: Props) => {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div
        className="absolute h-full w-full"
        onClick={() => closeModal()}
      ></div>
      <div className="relative z-10 flex w-full max-w-[600px] flex-col items-center justify-center overflow-hidden rounded-lg bg-white">
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
