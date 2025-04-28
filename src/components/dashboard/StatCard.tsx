
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn(
      "bg-blockchain-panel rounded-lg p-6 border border-gray-800 relative overflow-hidden group transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-green-500/10",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-semibold text-white">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`flex items-center text-xs ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {trend.isPositive ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs. last month</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors">
          {icon}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 w-0 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
};

export default StatCard;
