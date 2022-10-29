interface Props {
  children: React.ReactNode;
}

const ModalFooter = ({ children }: Props) => {
  return (
    <div className="flex w-full items-center justify-end border-t p-6">
      {children}
    </div>
  );
};

export default ModalFooter;
