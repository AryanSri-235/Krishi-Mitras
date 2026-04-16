import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMandiPrices } from "../redux/slices/mandiSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MandiPricesPage = () => {
  const dispatch = useDispatch();
  const { prices, status, error } = useSelector((state) => state.mandi);
  const city = useSelector((state) => state.user.location.city);

  useEffect(() => {
    if (city && status === "idle") {
      dispatch(fetchMandiPrices(city));
    }
  }, [city, status, dispatch]);

  const TrendArrow = ({ trend }) => {
    if (trend === "up") return <span className="text-green-600 font-bold">▲</span>;
    if (trend === "down") return <span className="text-red-600 font-bold">▼</span>;
    return <span className="text-yellow-600 font-bold">▬</span>;
  };

  // 🧩 Combine all crop histories into one array for the chart
  const chartData = useMemo(() => {
    if (!prices?.length) return [];

    const allDates = new Set();
    prices.forEach((crop) =>
      crop.history?.forEach((entry) => allDates.add(entry.date))
    );

    const sortedDates = Array.from(allDates).sort();

    return sortedDates.map((date) => {
      const dataPoint = { date };
      prices.forEach((crop) => {
        const found = crop.history?.find((h) => h.date === date);
        dataPoint[crop.crop] = found ? found.price : null;
      });
      return dataPoint;
    });
  }, [prices]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-yellow-50 to-amber-50 p-8">
      <h1 className="text-4xl font-extrabold text-green-900 mb-8 text-center">
        Real-Time Mandi Prices for <span className="text-green-700">{city}</span>
      </h1>

      {status === "loading" && (
        <p className="text-green-700 text-center text-lg">Loading prices...</p>
      )}
      {status === "failed" && (
        <p className="text-red-600 text-center text-lg font-semibold">{error}</p>
      )}

      {status === "succeeded" && (
        <>
          {/* Table Section */}
          <div className="overflow-x-auto rounded-xl shadow-lg border border-green-200 bg-white mb-10">
            <table className="min-w-full divide-y divide-green-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Crop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Current Price (₹/quintal)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-100">
                {prices.map((item) => (
                  <tr
                    key={item.crop}
                    className="hover:bg-green-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900">
                      {item.crop}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700">
                      {item.history?.at(-1)?.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <TrendArrow trend={item.trend} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
              Historical Price Fluctuations
            </h2>

            <ResponsiveContainer width="100%" height={450}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#065f46", fontWeight: 600 }}
                />
                <YAxis
                  tickFormatter={(value) => `₹${value}`}
                  tick={{ fill: "#064e3b", fontWeight: 600 }}
                />
                <Tooltip
                  formatter={(value, name) => [`₹${value}`, name]}
                  labelStyle={{ color: "#065f46", fontWeight: "bold" }}
                />
                <Legend />

                {/* Dynamically create a line for each crop */}
                {prices.map((crop, index) => (
                  <Line
                    key={crop.crop}
                    type="monotone"
                    dataKey={crop.crop}
                    strokeWidth={2.5}
                    stroke={`hsl(${(index * 60) % 360}, 70%, 40%)`}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default MandiPricesPage;
