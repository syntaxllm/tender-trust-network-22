
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Lock, Unlock } from "lucide-react";

interface Block {
  id: number;
  hash: string;
  previousHash: string;
  timestamp: number;
  data: {
    type: string;
    title: string;
    action?: string;
  };
}

interface BlockchainVisualizerProps {
  blocks: Block[];
  className?: string;
}

const BlockchainVisualizer = ({ blocks, className }: BlockchainVisualizerProps) => {
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  
  useEffect(() => {
    // Auto-highlight each block in sequence for a demo effect
    const interval = setInterval(() => {
      setActiveBlock((prev) => {
        if (prev === null || prev >= blocks.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [blocks.length]);

  const getBlockTypeColor = (type: string) => {
    switch (type) {
      case 'tender':
        return 'bg-purple-400/20 text-purple-400';
      case 'bid':
        return 'bg-blue-400/20 text-blue-400';
      case 'award':
        return 'bg-green-400/20 text-green-400';
      case 'dispute':
        return 'bg-red-400/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  const formatHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`;
  };

  const verifyBlock = () => {
    setShowVerification(true);
    
    // Hide verification message after a few seconds
    setTimeout(() => {
      setShowVerification(false);
    }, 3000);
  };

  return (
    <div className={cn("bg-blockchain-panel rounded-lg border border-gray-800", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-white">Blockchain Ledger</h3>
            <p className="text-sm text-gray-400">
              Immutable record of tender activities secured by blockchain
            </p>
          </div>
          <button 
            onClick={verifyBlock}
            className="text-xs px-3 py-1.5 rounded-full bg-green-400/10 text-green-400 hover:bg-green-400/20 transition-colors flex items-center gap-1"
          >
            {showVerification ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            {showVerification ? "Verified" : "Verify Chain"}
          </button>
        </div>
        
        {showVerification && (
          <div className="mb-4 px-4 py-3 bg-green-400/10 rounded-md border border-green-400/20 text-green-400 text-sm">
            Chain integrity verified. All blocks are secure and unmodified.
          </div>
        )}
        
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div
              key={block.id}
              className={cn(
                "border rounded-lg p-4 transition-all bg-gray-900/50",
                activeBlock === index ? "border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]" : "border-gray-800"
              )}
              onClick={() => setActiveBlock(index)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className={cn("px-3 py-1 rounded-full text-xs", getBlockTypeColor(block.data.type))}>
                  {block.data.type.toUpperCase()}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(block.timestamp).toLocaleString()}
                </span>
              </div>
              
              <div className="mb-3">
                <h4 className="font-medium text-sm text-white">{block.data.title}</h4>
                {block.data.action && <p className="text-xs text-gray-400">{block.data.action}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Hash: </span>
                  <code className="bg-gray-800/70 px-1.5 py-0.5 rounded text-blue-300">{formatHash(block.hash)}</code>
                </div>
                <div>
                  <span className="text-gray-500">Previous: </span>
                  <code className="bg-gray-800/70 px-1.5 py-0.5 rounded text-blue-300">
                    {block.previousHash ? formatHash(block.previousHash) : "Genesis"}
                  </code>
                </div>
              </div>
              
              {activeBlock === index && (
                <div className="w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500 mt-3"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockchainVisualizer;
