
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Bell, LogOut, Menu, User, Users, Wallet, Shield, Gavel, Briefcase, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useWeb3 } from "@/contexts/Web3Context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const { toast } = useToast();
  const { authState, logout } = useAuth();
  const { account, isConnected, connectWallet, disconnectWallet, isConnecting } = useWeb3();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if we've scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNotificationClick = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up!"
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatWalletAddress = () => {
    if (!account) return "";
    return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
  };

  const getInitials = () => {
    if (!authState.user) return "?";
    return authState.user.name.split(" ").map(part => part[0]).join("").toUpperCase().substring(0, 2);
  };

  const getMenuItems = () => {
    const commonItems = [{
      title: "Dashboard",
      path: "/",
      icon: <Star className="h-4 w-4" />,
      allowedRoles: ["admin", "officer", "bidder"]
    }, {
      title: "Tenders",
      path: "/tenders",
      icon: <Briefcase className="h-4 w-4" />,
      allowedRoles: ["admin", "officer", "bidder"]
    }];
    const roleSpecificItems = [{
      title: "Create Tender",
      path: "/create-tender",
      icon: <Gavel className="h-4 w-4" />,
      allowedRoles: ["admin", "officer"]
    }, {
      title: "My Bids",
      path: "/my-bids",
      icon: <Users className="h-4 w-4" />,
      allowedRoles: ["bidder"]
    }, {
      title: "Manage Officers",
      path: "/manage-officers",
      icon: <Shield className="h-4 w-4" />,
      allowedRoles: ["admin"]
    }, {
      title: "Reports",
      path: "/reports",
      icon: <Users className="h-4 w-4" />,
      allowedRoles: ["admin", "officer"]
    }];
    const allItems = [...commonItems, ...roleSpecificItems];

    if (!authState.user) return commonItems;
    return allItems.filter(item => item.allowedRoles.includes(authState.user!.role));
  };

  const navbarClasses = cn(
    "fixed w-full z-30 top-0 transition-all duration-300",
    scrolled ? "bg-blockchain-darkNav/95 backdrop-blur-md shadow-lg" : "bg-blockchain-darkNav"
  );

  if (!authState.user) {
    return (
      <nav className={navbarClasses}>
        <div className="px-3 py-3 lg:px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <div className="p-2 rounded-lg mr-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 animate-glow rounded-lg"></div>
                <Shield className="h-6 w-6 text-white relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold whitespace-nowrap text-white">TrustChain</span>
                <span className="text-xs text-green-400">Blockchain Tender Network</span>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-green-400/30 hover:border-green-400 hover:text-green-400 backdrop-blur-md bg-transparent" onClick={isConnected ? disconnectWallet : connectWallet} disabled={isConnecting}>
                <Wallet className="h-4 w-4" />
                {isConnecting ? "Connecting..." : isConnected ? formatWalletAddress() : "Connect Wallet"}
              </Button>

              <Link to="/login">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white hover:text-green-400">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={navbarClasses}>
      <div className="px-3 py-3 lg:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="p-2 rounded-lg mr-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 animate-glow rounded-lg"></div>
                <Shield className="h-6 w-6 text-white relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold whitespace-nowrap text-white">TrustChain</span>
                <div className={`
                  px-2 py-0.5 mt-1 rounded-full text-black text-xs font-medium bg-gradient-to-r max-w-fit
                  ${authState.user.role === "admin" 
                    ? "from-green-400 to-green-500" 
                    : authState.user.role === "officer" 
                    ? "from-blue-400 to-blue-500" 
                    : "from-purple-400 to-purple-500"}
                `}>
                  <span className="flex items-center gap-1">
                    {authState.user.role === "admin" ? (
                      <>
                        <Shield className="w-3 h-3" />
                        Admin
                      </>
                    ) : authState.user.role === "officer" ? (
                      <>
                        <Gavel className="w-3 h-3" />
                        Officer
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-3 h-3" />
                        Bidder
                      </>
                    )}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {getMenuItems().map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-item flex items-center gap-1.5 text-sm font-medium ${location.pathname === item.path ? "text-green-400 active" : "text-gray-400 hover:text-white"}`}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className={`hidden md:flex items-center gap-2 border-green-400/30 hover:border-green-400 hover:text-green-400 backdrop-blur-md bg-transparent ${isConnected ? 'border-green-400 text-green-400' : ''}`}
              onClick={isConnected ? disconnectWallet : connectWallet} 
              disabled={isConnecting}
            >
              <Wallet className="h-4 w-4" />
              {isConnecting ? "Connecting..." : isConnected ? formatWalletAddress() : "Connect Wallet"}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={handleNotificationClick} className="relative">
              <Bell className="h-5 w-5 text-gray-400 hover:text-white" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-green-400 rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer">
                    <div className="hidden md:block text-right">
                      <div className="text-sm font-medium text-white">{authState.user.name}</div>
                      <div className="text-xs text-gray-400">{authState.user.username}</div>
                    </div>
                    
                    <Avatar className="border-2 border-green-400/30 hover:border-green-400 transition-colors">
                      <AvatarImage src="" />
                      <AvatarFallback className={`
                        text-black
                        ${authState.user.role === "admin" ? "bg-green-400" : authState.user.role === "officer" ? "bg-blue-400" : "bg-purple-400"}
                      `}>
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-blockchain-panel border border-gray-700">
                  <DropdownMenuLabel className="text-gray-300">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-gray-300 hover:text-white focus:bg-gray-800 cursor-pointer">
                    <User className="mr-2 h-4 w-4 text-green-400" />
                    Profile
                  </DropdownMenuItem>
                  {authState.user.role === "bidder" && (
                    <DropdownMenuItem className="text-gray-300 hover:text-white focus:bg-gray-800 cursor-pointer" onClick={() => navigate("/my-bids")}>
                      <Wallet className="mr-2 h-4 w-4 text-green-400" />
                      My Bids
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-gray-300 hover:text-white focus:bg-gray-800 cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4 text-red-400" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden md:flex">
                <LogOut className="h-5 w-5 text-gray-400 hover:text-white" />
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blockchain-panel border-t border-gray-700 animate-slide-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {getMenuItems().map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-800" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start px-3 py-2 mt-2 border-green-400/30 bg-transparent text-gray-300" 
              onClick={e => {
                e.preventDefault();
                isConnected ? disconnectWallet() : connectWallet();
              }} 
              disabled={isConnecting}
            >
              <Wallet className="mr-2 h-4 w-4 text-green-400" />
              {isConnecting ? "Connecting..." : isConnected ? formatWalletAddress() : "Connect Wallet"}
            </Button>
            
            <button 
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-800" 
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
            >
              <LogOut className="mr-2 h-4 w-4 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
