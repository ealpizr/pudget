import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Paper } from "@mui/material";

const ComingSoonWidget = () => {
  return (
    <Paper className="flex h-full w-full flex-col items-center justify-center gap-3 p-3 text-gray-500">
      <AccessTimeIcon className="text-8xl " />
      <p className="text-xl">Coming soon...</p>
    </Paper>
  );
};

export default ComingSoonWidget;
