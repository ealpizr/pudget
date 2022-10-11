import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";

const RecentTransactionItem = () => {
  return (
    <div className="flex items-center">
      <DirectionsBusFilledIcon />
      <div className="ml-3 flex flex-1 flex-col">
        <p>Public transportation</p>
        <p>Oct 28 @ 4:02 PM</p>
      </div>
      <p>-$7.80</p>
    </div>
  );
};

export default RecentTransactionItem;
