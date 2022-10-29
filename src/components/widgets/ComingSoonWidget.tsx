import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ComingSoonWidget = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-md border border-gray-500 p-3 text-gray-500">
      <AccessTimeIcon className="text-8xl " />
      <p className="text-xl">Coming soon...</p>
    </div>
  );
};

export default ComingSoonWidget;
