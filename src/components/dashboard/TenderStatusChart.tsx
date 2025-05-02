
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-blockchain-panel p-6 rounded-lg border border-gray-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Tender Status Overview</h3>
        <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">Last 30 days</div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 5,
            }}
            onMouseLeave={handleMouseLeave}
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
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
              onMouseEnter={handleMouseEnter}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={activeIndex === index ? entry.color.replace(')', ', 0.9)').replace('rgb', 'rgba') : entry.color} 
                  stroke={activeIndex === index ? "#4ADE80" : "none"}
                  strokeWidth={activeIndex === index ? 2 : 0}
                  style={{
                    filter: activeIndex === index ? 'drop-shadow(0px 0px 6px rgba(74, 222, 128, 0.5))' : 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.3))',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TenderStatusChart;
