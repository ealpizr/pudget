import { MoonLoader } from "react-spinners";
import { trpc } from "../../utils/trpc";

const ExchangeRateWidget = () => {
  const exchangeRate = trpc.transaction.getExchangeRate.useQuery();

  return (
    <div className="flex h-full w-full flex-col rounded-md border border-gray-500 p-3">
      <p className="text-lg">Exchange Rate</p>
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        {!exchangeRate.data ? (
          <MoonLoader />
        ) : (
          <>
            <p className="text-2xl">USD</p>
            <p className="text-3xl font-bold">₡ {exchangeRate.data.rate}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ExchangeRateWidget;
