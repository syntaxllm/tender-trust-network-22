
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Wallet } from "lucide-react";

interface BidFormProps {
  tenderId: string;
}

const BidForm = ({ tenderId }: BidFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected, connectWallet, account, isConnecting } = useWeb3();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [proposedTimeline, setProposedTimeline] = useState("");
  const [technicalProposal, setTechnicalProposal] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit a bid",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would interact with the smart contract using the Web3Context
      // Example: await contract.methods.placeBid(tenderId, bidAmount).send({ from: account });
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Bid Submitted!",
        description: "Your bid has been encrypted and added to the blockchain",
      });
      navigate(`/tenders/${tenderId}`);
    } catch (error) {
      console.error("Error submitting bid:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your bid. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isConnected && (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800 mb-4">
          <AlertDescription className="flex flex-col gap-4">
            <p>You need to connect your wallet to submit a bid.</p>
            <Button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="bg-amber-500 hover:bg-amber-600 text-white w-fit"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </>
              )}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="bidAmount">Bid Amount (₹)</Label>
          <Input 
            id="bidAmount" 
            type="number" 
            placeholder="Enter your bid amount in rupees" 
            required 
            className="mt-1.5"
            min="1000"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter amount in Indian Rupees (₹)
          </p>
        </div>
        
        <div>
          <Label htmlFor="proposedTimeline">Proposed Timeline (Days)</Label>
          <Input 
            id="proposedTimeline" 
            type="number" 
            placeholder="Number of days to complete" 
            required 
            className="mt-1.5"
            min="1"
            value={proposedTimeline}
            onChange={(e) => setProposedTimeline(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="technicalProposal">Technical Proposal</Label>
          <Textarea 
            id="technicalProposal" 
            placeholder="Describe your technical approach to fulfilling the tender requirements" 
            required 
            className="mt-1.5"
            rows={5}
            value={technicalProposal}
            onChange={(e) => setTechnicalProposal(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="qualifications">Company Qualifications</Label>
          <Textarea 
            id="qualifications" 
            placeholder="Describe your company's relevant experience and qualifications" 
            required 
            className="mt-1.5"
            rows={3}
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="documents">Supporting Documents (Optional)</Label>
          <Input 
            id="documents" 
            type="file" 
            className="mt-1.5" 
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload additional documents to support your bid. 
            All files will be encrypted and securely stored on IPFS.
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-6">
          <Checkbox 
            id="termsAndConditions" 
            required
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
          />
          <Label htmlFor="termsAndConditions" className="text-sm">
            I certify that all information provided is accurate and legally binding
          </Label>
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => navigate(`/tenders/${tenderId}`)}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-blockchain-blue hover:bg-blockchain-purple" 
          disabled={isSubmitting || !isConnected || !agreedToTerms}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Bid...
            </>
          ) : (
            "Submit Bid"
          )}
        </Button>
      </div>
    </form>
  );
};

export default BidForm;
