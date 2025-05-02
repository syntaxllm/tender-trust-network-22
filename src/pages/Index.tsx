import { useEffect } from "react";
import NavBar from "@/components/layout/NavBar";
import StatCard from "@/components/dashboard/StatCard";
import TenderStatusChart from "@/components/dashboard/TenderStatusChart";
import RecentTendersTable from "@/components/dashboard/RecentTendersTable";
import BlockchainVisualizer from "@/components/blockchain/BlockchainVisualizer";
import BiddingProcessIllustration from "@/components/illustrations/BiddingProcessIllustration";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, Users, AlertTriangle, Plus, Shield, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

const Index = () => {
  // Animation states
  const [showHero, setShowHero] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [showTenders, setShowTenders] = useState(false);
  const [showIllustration, setShowIllustration] = useState(false);

  // Mock data for demo purposes
  const chartData = [
    { name: 'Open', value: 12, color: '#4ADE80' },
    { name: 'Closed', value: 8, color: '#8E9196' },
    { name: 'Awarded', value: 6, color: '#8B5CF6' },
    { name: 'Disputed', value: 2, color: '#EF4444' },
  ];
  
  const recentTenders = [
    { 
      id: 'T-2025-001', 
      title: 'Hospital Management System', 
      department: 'Healthcare', 
      budget: '₹250,000', 
      deadline: '2025-05-15', 
      status: 'open' as const
    },
    { 
      id: 'T-2025-002', 
      title: 'Smart Traffic Control System', 
      department: 'Infrastructure', 
      budget: '₹500,000', 
      deadline: '2025-05-05', 
      status: 'open' as const
    },
    { 
      id: 'T-2025-003', 
      title: 'E-Learning Platform', 
      department: 'Education', 
      budget: '₹175,000', 
      deadline: '2025-04-28', 
      status: 'closed' as const
    },
    { 
      id: 'T-2025-004', 
      title: 'City Waste Management', 
      department: 'Municipal', 
      budget: '₹380,000', 
      deadline: '2025-04-20', 
      status: 'awarded' as const
    },
  ];
  
  const blockchainBlocks = [
    {
      id: 5,
      hash: '0x6a95f3e8770e2cc32f8df65f35dcacf2bd3d8b87c5c29ea8a3c39006b782a3fd',
      previousHash: '0x3a42e8d7f9e9c9b43d5e24a3136f5d6a9e1b2c3d4e5f6a7b8c9d0e1f2a3b4c5',
      timestamp: Date.now() - 1000 * 60 * 5,
      data: {
        type: 'bid',
        title: 'Bid for Hospital System',
        action: 'Vendor ABC submitted a bid'
      }
    },
    {
      id: 4,
      hash: '0x3a42e8d7f9e9c9b43d5e24a3136f5d6a9e1b2c3d4e5f6a7b8c9d0e1f2a3b4c5',
      previousHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
      timestamp: Date.now() - 1000 * 60 * 30,
      data: {
        type: 'tender',
        title: 'Hospital Management System',
        action: 'New tender created'
      }
    },
    {
      id: 3,
      hash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
      previousHash: '0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
      data: {
        type: 'award',
        title: 'City Park Renovation',
        action: 'Tender awarded to vendor XYZ'
      }
    },
    {
      id: 2,
      hash: '0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
      previousHash: '0x0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1',
      timestamp: Date.now() - 1000 * 60 * 60 * 5,
      data: {
        type: 'dispute',
        title: 'School Renovation Project',
        action: 'Dispute raised by vendor ABC'
      }
    },
    {
      id: 1,
      hash: '0x0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1',
      previousHash: '',
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
      data: {
        type: 'tender',
        title: 'School Renovation Project',
        action: 'New tender created'
      }
    }
  ];

  // Animation sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowHero(true), 100),
      setTimeout(() => setShowStats(true), 500),
      setTimeout(() => setShowCharts(true), 900),
      setTimeout(() => setShowIllustration(true), 1100),
      setTimeout(() => setShowTenders(true), 1300),
    ];

    // Simulate blockchain network status
    const interval = setInterval(() => {
      console.log("Blockchain network status: Connected");
    }, 5000);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearInterval(interval);
    };
  }, []);

  const fadeInClass = "transition-all duration-500 ease-out";

  return (
    <div className="min-h-screen bg-blockchain-darkBg text-white">
      <NavBar />
      
      {/* Hero Section */}
      <div className={`relative pt-20 pb-10 overflow-hidden ${fadeInClass} ${showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 z-0 opacity-10 bg-grid-pattern bg-repeat"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-green-500/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-500/10 via-transparent to-transparent"></div>
        
        <div className="container relative z-10 pt-14 pb-8 px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-400/10 text-green-400 mb-4">
              <Shield className="w-3.5 h-3.5 mr-1" />
              Blockchain Powered Tender Management
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
                Transform Government Tenders
              </span> 
              <br/>With Trustless Technology
            </h1>
            <p className="text-lg text-gray-300 md:text-xl max-w-3xl mb-8">
              Our blockchain-powered platform ensures complete transparency, eliminates corruption, 
              and streamlines the entire tender process from publication to award.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-black font-medium px-6 py-2.5 hover:shadow-lg hover:shadow-green-500/20 transition-all"
                asChild
              >
                <Link to="/tenders" className="group">
                  Explore Tenders
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-green-500/30 hover:border-green-500 text-white hover:text-green-400 bg-transparent"
                asChild
              >
                <Link to="/create-tender">
                  <Plus className="mr-2 h-4 w-4" /> Create New Tender
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container px-4 pb-16">
        {/* Network Status */}
        <div className={`flex items-center gap-2 mb-8 ${fadeInClass} ${showHero ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-green-400">Blockchain Network Connected</span>
          <span className="text-xs text-gray-500 ml-2">Last block: 2 minutes ago</span>
        </div>
            
        {/* Stats Section */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${fadeInClass} ${showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <StatCard 
            title="Active Tenders" 
            value="28" 
            icon={<FileText className="h-5 w-5 text-green-400" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Total Value" 
            value="₹3.8M" 
            icon={<TrendingUp className="h-5 w-5 text-blue-400" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard 
            title="Registered Vendors" 
            value="96" 
            icon={<Users className="h-5 w-5 text-purple-400" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard 
            title="Disputes" 
            value="2" 
            icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
            trend={{ value: 1, isPositive: false }}
          />
        </div>
        
        {/* Charts & Tables Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 ${fadeInClass} ${showCharts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="lg:col-span-1">
            <TenderStatusChart data={chartData} />
          </div>
          <div className="lg:col-span-2">
            <BlockchainVisualizer blocks={blockchainBlocks} />
          </div>
        </div>

        {/* BiddingProcessIllustration below TenderStatusChart */}
        <div className={`mb-8 bg-blockchain-panel p-6 rounded-lg border border-gray-800 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 ${fadeInClass} ${showIllustration ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white">Tender Bidding Process</h3>
            <p className="text-sm text-gray-400">Step-by-step visualization of the tender process flow</p>
          </div>
          <BiddingProcessIllustration />
        </div>
        
        {/* Recent Tenders Table */}
        <div className={`mb-8 ${fadeInClass} ${showTenders ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <RecentTendersTable tenders={recentTenders} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
