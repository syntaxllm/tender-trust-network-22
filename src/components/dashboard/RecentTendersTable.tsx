
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Tender {
  id: string;
  title: string;
  department: string;
  budget: string;
  deadline: string;
  status: 'open' | 'closed' | 'awarded' | 'disputed';
}

interface RecentTendersTableProps {
  tenders: Tender[];
}

const RecentTendersTable = ({ tenders }: RecentTendersTableProps) => {
  const { toast } = useToast();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const getStatusBadge = (status: Tender['status']) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-400/20 text-green-400 hover:bg-green-400/30 border-0">Open</Badge>;
      case 'closed':
        return <Badge className="bg-gray-400/20 text-gray-300 hover:bg-gray-400/30 border-0">Closed</Badge>;
      case 'awarded':
        return <Badge className="bg-purple-400/20 text-purple-400 hover:bg-purple-400/30 border-0">Awarded</Badge>;
      case 'disputed':
        return <Badge className="bg-red-400/20 text-red-400 hover:bg-red-400/30 border-0">Disputed</Badge>;
      default:
        return <Badge className="bg-gray-400/20 text-gray-300 hover:bg-gray-400/30 border-0">Unknown</Badge>;
    }
  };

  const verifyOnBlockchain = (id: string) => {
    toast({
      title: "Blockchain Verification",
      description: `Tender ${id} is verified on the blockchain.`,
    });
  };

  return (
    <div className="bg-blockchain-panel rounded-lg border border-gray-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Recent Tenders</h3>
          <Link to="/tenders" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            View all tenders
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-800/50 border-gray-800">
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Department</TableHead>
              <TableHead className="text-gray-400">Budget</TableHead>
              <TableHead className="text-gray-400">Deadline</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-right text-gray-400">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenders.map((tender) => (
              <TableRow 
                key={tender.id} 
                className={`border-gray-800 transition-colors duration-200 ${hoveredRow === tender.id ? 'bg-gray-800/70' : 'hover:bg-gray-800/30'}`}
                onMouseEnter={() => setHoveredRow(tender.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="font-medium text-white">
                  <div className="flex items-center">
                    {tender.title}
                    {hoveredRow === tender.id && (
                      <button 
                        onClick={() => verifyOnBlockchain(tender.id)}
                        className="ml-2 p-1 rounded-full bg-green-400/10 hover:bg-green-400/20 transition-colors"
                        title="Verify on blockchain"
                      >
                        <Shield className="h-3 w-3 text-green-400" />
                      </button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">{tender.department}</TableCell>
                <TableCell className="text-gray-300">{tender.budget}</TableCell>
                <TableCell className="text-gray-300">{tender.deadline}</TableCell>
                <TableCell>{getStatusBadge(tender.status)}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm" className={`hover:bg-gray-800 ${hoveredRow === tender.id ? 'text-green-400' : 'hover:text-green-400'}`}>
                    <Link to={`/tenders/${tender.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentTendersTable;
