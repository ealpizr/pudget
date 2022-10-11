import { Area, AreaChart, ResponsiveContainer } from "recharts";

const BalanceWidget = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="flex h-full w-full rounded-md border border-gray-500 p-3">
      <div className="h-full w-3 rounded-full bg-gradient-to-b from-[#007EFF] to-[#00C657]"></div>
      <div className="flex flex-1 flex-col justify-center gap-3 p-2 pl-4">
        <p className="text-lg">Balance</p>
        <p className="mb-2 text-3xl font-bold">$ 4,675.00</p>
        <ResponsiveContainer className="flex-1">
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
      </div>
    </div>
  );
};

export default BalanceWidget;
