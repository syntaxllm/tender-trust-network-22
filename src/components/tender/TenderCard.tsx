
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Coins, Clock } from "lucide-react";

interface TenderCardProps {
  id: string;
  title: string;
  department: string;
  budget: string;
  deadline: string;
  status: 'open' | 'closed' | 'awarded' | 'disputed';
  bidCount: number;
}

const TenderCard = ({ id, title, department, budget, deadline, status, bidCount }: TenderCardProps) => {
  const getStatusBadge = (status: 'open' | 'closed' | 'awarded' | 'disputed') => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blockchain-green text-white">Open</Badge>;
      case 'closed':
        return <Badge className="bg-blockchain-gray text-white">Closed</Badge>;
      case 'awarded':
        return <Badge className="bg-blockchain-purple text-white">Awarded</Badge>;
      case 'disputed':
        return <Badge className="bg-blockchain-red text-white">Disputed</Badge>;
    }
  };
  
  const isDeadlineSoon = () => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 3 && status === 'open';
  };

  // Format budget to display ₹ symbol
  const formatBudget = (budgetString: string) => {
    // Extract numeric value and convert to INR format
    const numericValue = budgetString.replace(/[^0-9]/g, '');
    if (numericValue) {
      return `₹${parseInt(numericValue).toLocaleString('en-IN')}`;
    }
    return budgetString;
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200 border-t-4 border-t-blockchain-blue">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {getStatusBadge(status)}
        </div>
        <p className="text-sm text-gray-500">{department}</p>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="bg-blue-50 p-1.5 rounded-md mr-3">
              <Coins className="h-4 w-4 text-blockchain-blue" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Budget</div>
              <div className="font-medium">{formatBudget(budget)}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-purple-50 p-1.5 rounded-md mr-3">
              <Calendar className="h-4 w-4 text-blockchain-purple" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Deadline</div>
              <div className="font-medium">{deadline}</div>
            </div>
          </div>
          
          {isDeadlineSoon() && (
            <div className="flex items-center mt-2 bg-red-50 p-2 rounded-md">
              <Clock className="h-4 w-4 mr-2 text-blockchain-red" />
              <span className="text-sm font-medium text-blockchain-red">Closing soon!</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {bidCount} bid{bidCount !== 1 ? 's' : ''} submitted
          </span>
          
          <div className={`h-2 ${bidCount > 0 ? 'bg-green-100' : 'bg-gray-100'} rounded-full w-16`}>
            <div 
              className={`h-full rounded-full ${
                bidCount > 5 ? 'bg-green-500' : 
                bidCount > 2 ? 'bg-green-400' : 
                bidCount > 0 ? 'bg-green-300' : 'bg-gray-200'
              }`} 
              style={{ width: `${Math.min(100, bidCount * 10)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-gray-100">
        <div className="flex justify-between w-full">
          <Button variant="outline" asChild>
            <Link to={`/tenders/${id}`}>View Details</Link>
          </Button>
          {status === 'open' && (
            <Button className="ml-2 bg-blockchain-blue hover:bg-blockchain-purple" asChild>
              <Link to={`/tenders/${id}/bid`}>Submit Bid</Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TenderCard;
