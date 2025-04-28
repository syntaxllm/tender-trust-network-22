
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@/hooks/use-toast';

interface Web3ContextType {
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  // Check if wallet was previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && localStorage.getItem('walletConnected') === 'true') {
        try {
          await connectWallet();
        } catch (error) {
          console.error('Failed to reconnect wallet:', error);
          localStorage.removeItem('walletConnected');
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // Handle account changes
  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      disconnectWallet();
      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected",
      });
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      toast({
        title: "Account changed",
        description: `Connected to ${formatAccount(accounts[0])}`,
      });
    }
  };

  // Handle chain changes
  const handleChainChanged = (chainIdHex: string) => {
    const newChainId = parseInt(chainIdHex, 16);
    setChainId(newChainId);
    window.location.reload();
  };

  // Format account address for display
  const formatAccount = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Connect wallet function
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask browser extension",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);

    try {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethersProvider);

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const currentAccount = accounts[0];
      setAccount(currentAccount);

      // Get network
      const network = await ethersProvider.getNetwork();
      setChainId(network.chainId);

      // Get signer
      const ethersSigner = ethersProvider.getSigner();
      setSigner(ethersSigner);

      // Initialize contract (sample - replace with actual contract address and ABI)
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '';
      try {
        const tenderContractABI = []; // Import your ABI here
        const tenderContract = new ethers.Contract(
          contractAddress, 
          tenderContractABI, 
          ethersSigner
        );
        setContract(tenderContract);
      } catch (error) {
        console.error("Contract initialization error:", error);
      }

      localStorage.setItem('walletConnected', 'true');
      
      toast({
        title: "Wallet connected",
        description: `Connected to ${formatAccount(currentAccount)}`,
      });
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setProvider(null);
    setSigner(null);
    setContract(null);
    localStorage.removeItem('walletConnected');
    
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const isConnected = !!account;

  return (
    <Web3Context.Provider
      value={{
        account,
        chainId,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        provider,
        signer,
        contract,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
