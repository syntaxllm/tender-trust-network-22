
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TenderStatusChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blockchain-darkNav p-3 shadow-lg border border-gray-800 rounded-md">
        <p className="font-medium text-white">{`${label}`}</p>
        <p className="text-sm text-gray-300">{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const TenderStatusChart = ({ data }: TenderStatusChartProps) => {
  return (
    <div className="bg-blockchain-panel p-6 rounded-lg border border-gray-800 h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Tender Status Overview</h3>
        <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">Last 30 days</div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            tickFormatter={(value) => value === 0 ? '0' : `${value}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255, 255, 255, 0.05)'}} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke="none"
                style={{
                  filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.3))'
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TenderStatusChart;
