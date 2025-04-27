
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Bell, Menu } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNotificationClick = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up!"
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0 left-0 shadow-sm">
      <div className="px-3 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-blockchain-blue to-blockchain-purple p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <span className="text-xl font-semibold whitespace-nowrap">SmartTender</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blockchain-purple transition-colors">Dashboard</Link>
            <Link to="/tenders" className="text-gray-600 hover:text-blockchain-purple transition-colors">Tenders</Link>
            <Link to="/create-tender" className="text-gray-600 hover:text-blockchain-purple transition-colors">Create Tender</Link>
            <Link to="/my-bids" className="text-gray-600 hover:text-blockchain-purple transition-colors">My Bids</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleNotificationClick} 
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-blockchain-red rounded-full"></span>
            </Button>
            
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-blockchain-purple text-white">JD</AvatarFallback>
            </Avatar>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 text-gray-600 hover:bg-blockchain-lightPurple hover:text-blockchain-purple rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/tenders" 
              className="block px-3 py-2 text-gray-600 hover:bg-blockchain-lightPurple hover:text-blockchain-purple rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tenders
            </Link>
            <Link 
              to="/create-tender" 
              className="block px-3 py-2 text-gray-600 hover:bg-blockchain-lightPurple hover:text-blockchain-purple rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Tender
            </Link>
            <Link 
              to="/my-bids" 
              className="block px-3 py-2 text-gray-600 hover:bg-blockchain-lightPurple hover:text-blockchain-purple rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Bids
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
