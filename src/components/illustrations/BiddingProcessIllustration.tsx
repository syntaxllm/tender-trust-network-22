
import React, { useState, useEffect } from 'react';
import { FileText, FileCheck, BadgeIndianRupee, CheckCircle2, Clock, BarChartHorizontal } from 'lucide-react';

const BiddingProcessIllustration: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Start the animation sequence after component mounts
    const visibilityTimer = setTimeout(() => setIsVisible(true), 500);
    
    // Set up the animation cycle
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => {
      clearTimeout(visibilityTimer);
      clearInterval(interval);
    };
  }, []);

  // Define the process steps
  const steps = [
    { icon: FileText, label: "Tender Published", color: "text-blockchain-accent" },
    { icon: BarChartHorizontal, label: "Bids Submitted", color: "text-blockchain-blue" },
    { icon: FileCheck, label: "Evaluation", color: "text-blockchain-purple" },
    { icon: CheckCircle2, label: "Contract Awarded", color: "text-blockchain-green" }
  ];

  return (
    <div 
      className={`w-full h-48 relative flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Flow line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent transform -translate-y-1/2"></div>
      
      {/* Time markers */}
      <div className="absolute top-1/2 left-[15%] w-1.5 h-1.5 rounded-full bg-gray-600 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-[38%] w-1.5 h-1.5 rounded-full bg-gray-600 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-[62%] w-1.5 h-1.5 rounded-full bg-gray-600 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-[85%] w-1.5 h-1.5 rounded-full bg-gray-600 transform -translate-y-1/2"></div>
      
      {/* Process nodes */}
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = activeStep === index;
        const position = 15 + index * 23.5; // Distribute positions along the timeline
        
        return (
          <div
            key={index}
            className={`absolute top-1/2 left-[${position}%] transition-all duration-700 transform -translate-x-1/2 ${isActive ? '-translate-y-[32px] scale-110' : '-translate-y-1/2'}`}
            style={{ left: `${position}%` }}
          >
            {/* Node */}
            <div className={`
              relative flex items-center justify-center rounded-full 
              ${isActive ? 'bg-blockchain-darkNav w-12 h-12 shadow-lg shadow-blockchain-accent/20' : 'bg-blockchain-panel w-10 h-10'} 
              border border-gray-700 transition-all duration-500
              ${isActive ? 'border-blockchain-accent' : ''}
            `}>
              <Icon className={`
                ${isActive ? 'h-5 w-5' : 'h-4 w-4'} 
                ${isActive ? step.color : 'text-gray-400'} 
                transition-all duration-500
              `} />
              
              {/* Pulsing rings for active node */}
              {isActive && (
                <>
                  <div className="absolute inset-0 rounded-full border border-blockchain-accent/50 animate-ping" style={{ animationDuration: '2s' }}></div>
                  <div className="absolute inset-[-4px] rounded-full border border-blockchain-accent/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
                </>
              )}
            </div>
            
            {/* Label */}
            <div className={`
              absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap
              text-xs font-medium transition-all duration-500
              ${isActive ? 'text-white' : 'text-gray-400'}
            `}>
              {step.label}
            </div>
            
            {/* Time indicator */}
            <div className={`
              absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
              flex items-center justify-center text-xs
              transition-all duration-500
              ${isActive ? 'opacity-100' : 'opacity-0'}
            `}>
              <Clock className="w-3 h-3 mr-1 text-gray-400" />
              <span className="text-gray-400">
                {index === 0 ? "Day 1" : index === 1 ? "Day 15" : index === 2 ? "Day 30" : "Day 45"}
              </span>
            </div>
          </div>
        );
      })}
      
      {/* Moving data packet */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 flex items-center"
        style={{
          left: `${15 + activeStep * 23.5}%`,
          transition: 'left 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="h-2 w-2 rounded-full bg-blockchain-accent shadow-[0_0_10px_#4ADE80]"></div>
      </div>
      
      {/* Bid/Value indicator at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className={`
          bg-blockchain-panel border border-gray-800 rounded-lg px-3 py-1.5 
          flex items-center space-x-2 transition-all duration-700
          ${activeStep >= 2 ? 'opacity-100' : 'opacity-0'}
        `}>
          <BadgeIndianRupee className={`h-4 w-4 ${activeStep === 3 ? 'text-blockchain-accent' : 'text-gray-400'}`} />
          <span className={`text-xs font-medium ${activeStep === 3 ? 'text-white' : 'text-gray-400'}`}>
            {activeStep === 3 ? "Best Value Selected" : "Evaluating Bids"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BiddingProcessIllustration;
