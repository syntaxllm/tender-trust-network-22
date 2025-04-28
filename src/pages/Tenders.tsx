
import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import TenderCard from "@/components/tender/TenderCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const Tenders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  
  // Mock data for demo purposes - updated to INR
  const tenders = [
    { 
      id: 'T-2025-001', 
      title: 'Hospital Management System', 
      department: 'Healthcare', 
      budget: '₹18,75,000', 
      deadline: '2025-05-15', 
      status: 'open' as const,
      bidCount: 5
    },
    { 
      id: 'T-2025-002', 
      title: 'Smart Traffic Control System', 
      department: 'Infrastructure', 
      budget: '₹37,50,000', 
      deadline: '2025-05-05', 
      status: 'open' as const,
      bidCount: 3
    },
    { 
      id: 'T-2025-003', 
      title: 'E-Learning Platform', 
      department: 'Education', 
      budget: '₹13,12,500', 
      deadline: '2025-04-28', 
      status: 'closed' as const,
      bidCount: 10
    },
    { 
      id: 'T-2025-004', 
      title: 'City Waste Management', 
      department: 'Municipal', 
      budget: '₹28,50,000', 
      deadline: '2025-04-20', 
      status: 'awarded' as const,
      bidCount: 8
    },
    { 
      id: 'T-2025-005', 
      title: 'Public Library Renovation', 
      department: 'Education', 
      budget: '₹31,50,000', 
      deadline: '2025-05-22', 
      status: 'open' as const,
      bidCount: 0
    },
    { 
      id: 'T-2025-006', 
      title: 'Solar Power Installation', 
      department: 'Energy', 
      budget: '₹90,00,000', 
      deadline: '2025-06-10', 
      status: 'open' as const,
      bidCount: 1
    },
    { 
      id: 'T-2025-007', 
      title: 'City Park Renovation', 
      department: 'Parks & Recreation', 
      budget: '₹24,00,000', 
      deadline: '2025-04-15', 
      status: 'awarded' as const,
      bidCount: 6
    },
    { 
      id: 'T-2025-008', 
      title: 'Public Transport Ticketing System', 
      department: 'Transportation', 
      budget: '₹21,75,000', 
      deadline: '2025-04-10', 
      status: 'disputed' as const,
      bidCount: 4
    },
  ];
  
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };
  
  const filteredTenders = tenders.filter(tender => 
    tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container pt-20 pb-10">
        <div className="flex justify-between items-center my-8">
          <div>
            <h1 className="text-3xl font-bold">Tenders</h1>
            <p className="text-gray-600 mt-1">
              Browse and bid on available tenders
            </p>
          </div>
          
          <Button asChild className="bg-blockchain-blue hover:bg-blockchain-purple">
            <Link to="/create-tender" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              New Tender
            </Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-2/3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search tenders by title, department or ID..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={toggleFilter}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
                  <SelectItem value="budget-high">Budget (Highest)</SelectItem>
                  <SelectItem value="budget-low">Budget (Lowest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filterVisible && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="text-sm font-medium block mb-2">Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="municipal">Municipal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-2">Budget Range</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Budget</SelectItem>
                    <SelectItem value="0-100k">₹0 - ₹7,50,000</SelectItem>
                    <SelectItem value="100k-500k">₹7,50,000 - ₹37,50,000</SelectItem>
                    <SelectItem value="500k-1m">₹37,50,000 - ₹75,00,000</SelectItem>
                    <SelectItem value="1m+">Over ₹75,00,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-2">Deadline</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Deadline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Deadline</SelectItem>
                    <SelectItem value="7days">Next 7 Days</SelectItem>
                    <SelectItem value="30days">Next 30 Days</SelectItem>
                    <SelectItem value="90days">Next 90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Tenders</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
            <TabsTrigger value="awarded">Awarded</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {filteredTenders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTenders.map(tender => (
                  <TenderCard key={tender.id} {...tender} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No tenders found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="open" className="mt-6">
            {filteredTenders.filter(t => t.status === 'open').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTenders
                  .filter(tender => tender.status === 'open')
                  .map(tender => (
                    <TenderCard key={tender.id} {...tender} />
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No open tenders found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="closed" className="mt-6">
            {filteredTenders.filter(t => t.status === 'closed').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTenders
                  .filter(tender => tender.status === 'closed')
                  .map(tender => (
                    <TenderCard key={tender.id} {...tender} />
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No closed tenders found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="awarded" className="mt-6">
            {filteredTenders.filter(t => t.status === 'awarded').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTenders
                  .filter(tender => tender.status === 'awarded')
                  .map(tender => (
                    <TenderCard key={tender.id} {...tender} />
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No awarded tenders found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Tenders;
