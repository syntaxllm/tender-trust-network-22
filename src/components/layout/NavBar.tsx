import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Bell, LogOut, Menu, User, Users, Wallet, Shield, Gavel, Briefcase } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useWeb3 } from "@/contexts/Web3Context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const {
    toast
  } = useToast();
  const {
    authState,
    logout
  } = useAuth();
  const {
    account,
    isConnected,
    connectWallet,
    disconnectWallet,
    isConnecting
  } = useWeb3();
  const navigate = useNavigate();
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
      allowedRoles: ["admin", "officer", "bidder"]
    }, {
      title: "Tenders",
      path: "/tenders",
      allowedRoles: ["admin", "officer", "bidder"]
    }];
    const roleSpecificItems = [{
      title: "Create Tender",
      path: "/create-tender",
      allowedRoles: ["admin", "officer"]
    }, {
      title: "My Bids",
      path: "/my-bids",
      allowedRoles: ["bidder"]
    }, {
      title: "Manage Officers",
      path: "/manage-officers",
      allowedRoles: ["admin"]
    }, {
      title: "Reports",
      path: "/reports",
      allowedRoles: ["admin", "officer"]
    }];
    const allItems = [...commonItems, ...roleSpecificItems];

    if (!authState.user) return commonItems;
    return allItems.filter(item => item.allowedRoles.includes(authState.user!.role));
  };

  if (!authState.user) {
    return <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0 left-0 shadow-sm">
      <div className="px-3 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="bg-gradient-to-r from-[#FF671F] to-[#046A38] p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold whitespace-nowrap text-[#000080]">TrustChain</span>
              <div className={`
                px-2 py-0.5 mt-1 rounded-full text-white text-xs font-medium
                ${authState.user.role === "admin" 
                  ? "bg-gradient-to-r from-[#FF671F] to-[#FF9933]" 
                  : authState.user.role === "officer" 
                  ? "bg-gradient-to-r from-[#000080] to-[#0000FF]" 
                  : "bg-gradient-to-r from-[#046A38] to-[#138808]"}
              `}>
                <span className="flex items-center gap-1">
                  {authState.user.role === "admin" ? (
                    <>
                      <Shield className="w-3 h-3" />
                      TrustChain Administrator
                    </>
                  ) : authState.user.role === "officer" ? (
                    <>
                      <Gavel className="w-3 h-3" />
                      TrustChain Officer
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-3 h-3" />
                      TrustChain Bidder
                    </>
                  )}
                </span>
              </div>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={isConnected ? disconnectWallet : connectWallet} disabled={isConnecting}>
              <Wallet className="h-4 w-4" />
              {isConnecting ? "Connecting..." : isConnected ? formatWalletAddress() : "Connect Wallet"}
            </Button>

            <Link to="/login">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>;
  }

  return <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0 left-0 shadow-sm">
    <div className="px-3 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-gradient-to-r from-[#FF671F] to-[#046A38] p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold whitespace-nowrap text-[#000080]">TrustChain</span>
              <div className={`
                px-2 py-0.5 mt-1 rounded-full text-white text-xs font-medium
                ${authState.user.role === "admin" 
                  ? "bg-gradient-to-r from-[#FF671F] to-[#FF9933]" 
                  : authState.user.role === "officer" 
                  ? "bg-gradient-to-r from-[#000080] to-[#0000FF]" 
                  : "bg-gradient-to-r from-[#046A38] to-[#138808]"}
              `}>
                <span className="flex items-center gap-1">
                  {authState.user.role === "admin" ? (
                    <>
                      <Shield className="w-3 h-3" />
                      TrustChain Administrator
                    </>
                  ) : authState.user.role === "officer" ? (
                    <>
                      <Gavel className="w-3 h-3" />
                      TrustChain Officer
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-3 h-3" />
                      TrustChain Bidder
                    </>
                  )}
                </span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {getMenuItems().map(item => <Link key={item.path} to={item.path} className="text-gray-600 hover:text-blockchain-purple transition-colors">
              {item.title}
            </Link>)}
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant={isConnected ? "secondary" : "default"} size="sm" className={`${isConnected ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' : 'bg-blockchain-blue hover:bg-blockchain-purple'} hidden md:flex items-center gap-2`} onClick={isConnected ? disconnectWallet : connectWallet} disabled={isConnecting}>
            <Wallet className="h-4 w-4" />
            {isConnecting ? "Connecting..." : isConnected ? formatWalletAddress() : "Connect Wallet"}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleNotificationClick} className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-blockchain-red rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="hidden md:block text-right">
                    <div className="text-sm font-medium">{authState.user.name}</div>
                    <div className="text-xs text-gray-500">{authState.user.username}</div>
                  </div>
                  
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className={`
                      text-white
                      ${authState.user.role === "admin" ? "bg-blockchain-purple" : authState.user.role === "officer" ? "bg-blockchain-blue" : "bg-blockchain-green"}
                    `}>
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                {authState.user.role === "bidder" && <DropdownMenuItem>
                    <Wallet className="mr-2 h-4 w-4" />
                    My Bids
                  </DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden md:flex">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
    
    {isMobileMenuOpen && (
      <div className="md:hidden bg-white border-t border-gray-100 animate-slide-in">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {getMenuItems().map(item => <Link key={item.path} to={item.path} className="block px-3 py-2 text-gray-600 hover:bg-blockchain-lightPurple hover:text-blockchain-purple rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              {item.title}
            </Link>)}
          
            <Button variant={isConnected ? "outline" : "default"} size="sm" className="w-full justify-start px-3 py-2 mt-2" onClick={e => {
              e.preventDefault();
              isConnected ? disconnectWallet() : connectWallet();
            }} disabled={isConnecting}>
              <Wallet className="mr-2 h-4 w-4" />
              {isConnecting ? "Connecting..." : isConnected ? formatWalletAddress() : "Connect Wallet"}
            </Button>
            
            <button className="w-full flex items-center px-3 py-2 text-gray-600 hover:bg-blockchain-lightPurple hover:text-blockchain-purple rounded-md" onClick={() => {
              setIsMobileMenuOpen(false);
              handleLogout();
            }}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    )}
  </nav>;
};

export default NavBar;
