interface Props {
  children: React.ReactNode;
}

const ModalBody = ({ children }: Props) => {
  return <div className="w-full flex-1 p-5">{children}</div>;
};

export default ModalBody;
