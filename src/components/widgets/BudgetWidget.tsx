import { MoonLoader } from "react-spinners";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { trpc } from "../../utils/trpc";

// THIS PROBABLY DOES NOT WORK AS EXPECTED

const BudgetWidget = () => {
  const getTransactionsBudgets =
    trpc.transaction.getTransactionsBudgets.useQuery();
  const user = trpc.user.getUser.useQuery();

  let data: { name: string; pv: number }[] = [
    { name: "A", pv: 1 },
    { name: "B", pv: 1 },
  ];

  if (getTransactionsBudgets.data && getTransactionsBudgets.data.length !== 0) {
    data = [];
    getTransactionsBudgets.data.map((transaction, idx) => {
      data.push({
        name: idx.toString(),
        pv: transaction.newBudget,
      });
    });
  }

  return (
    <div className="flex h-full w-full flex-row-reverse rounded-md border border-gray-500 p-3 md:flex-row">
      <div className="h-full w-2 rounded-full bg-gradient-to-b from-[#007EFF] to-[#00C657]"></div>
      <div className="flex flex-1 flex-col justify-center gap-3 p-2">
        <p className="justify-self-start text-lg">Balance</p>
        {!user.data || !getTransactionsBudgets.data ? (
          <div className="flex flex-1 items-center justify-center">
            <MoonLoader />
          </div>
        ) : (
          <>
            <p className="mb-2 text-2xl font-bold md:text-3xl">
              ₡{" "}
              {user.data.budget?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            {/*
            width="99%" aspect={3} came from
            https://stackoverflow.com/questions/50891591/recharts-responsive-container-does-not-resize-correctly-in-flexbox
            */}
            <ResponsiveContainer className="flex-1" width="99%" aspect={3}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#00B481"
                  strokeWidth={2}
                  dot={false}
                  fill="url(#areaColor)"
                  fillOpacity={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  );
};

export default BudgetWidget;
