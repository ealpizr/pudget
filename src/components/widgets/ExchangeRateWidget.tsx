import { Paper } from "@mui/material";
import { MoonLoader } from "react-spinners";
import { trpc } from "../../utils/trpc";

const ExchangeRateWidget = () => {
  const exchangeRate = trpc.transaction.getExchangeRate.useQuery();

  return (
    <Paper className="flex h-full w-full flex-col gap-3 border-gray-500 p-3">
      <p className="text-lg">Exchange Rate</p>
      <div className="flex flex-1 items-center justify-between gap-2 md:flex-col md:justify-center">
        {!exchangeRate.data ? (
          <MoonLoader />
        ) : (
          <>
            <p className="text-xl">USD</p>
            <p className="text-2xl font-bold md:text-3xl">
              ₡ {exchangeRate.data.rate}
            </p>
          </>
        )}
      </div>
    </Paper>
  );
};

export default ExchangeRateWidget;
