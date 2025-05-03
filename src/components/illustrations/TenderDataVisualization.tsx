
import React, { useEffect, useState } from 'react';
import { BarChartHorizontal, FileCheck, ShieldCheck, BadgeIndianRupee, Users } from 'lucide-react';

const TenderDataVisualization: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`relative w-full min-h-[200px] transition-all duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
      {/* Central hub */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-blockchain-darkNav border border-blockchain-accent/50 flex items-center justify-center shadow-lg shadow-green-500/20">
            <div className="text-blockchain-accent text-sm font-medium text-center">
              <BarChartHorizontal className="h-8 w-8 mx-auto mb-1 text-blockchain-accent" />
              <span>Tender Data</span>
            </div>
          </div>
          
          {/* Pulsing effect */}
          <div className="absolute inset-0 rounded-full border border-blockchain-accent/30 animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-[-8px] rounded-full border border-blockchain-accent/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      {/* Connected nodes */}
      <div className={`absolute top-1/4 left-1/4 transition-all duration-700 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-blockchain-panel p-3 rounded-lg border border-gray-800 shadow-md flex flex-col items-center">
          <div className="p-2 rounded-full bg-purple-500/20 mb-2">
            <FileCheck className="h-6 w-6 text-purple-400" />
          </div>
          <span className="text-xs text-white">Compliance</span>
          <div className="text-purple-400 text-xs mt-1">98%</div>
        </div>
        {/* Connecting line */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-purple-500/50 to-transparent"></div>
      </div>
      
      <div className={`absolute top-1/4 right-1/4 transition-all duration-700 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-blockchain-panel p-3 rounded-lg border border-gray-800 shadow-md flex flex-col items-center">
          <div className="p-2 rounded-full bg-green-500/20 mb-2">
            <BadgeIndianRupee className="h-6 w-6 text-green-400" />
          </div>
          <span className="text-xs text-white">Budget</span>
          <div className="text-green-400 text-xs mt-1">₹24.5M</div>
        </div>
        {/* Connecting line */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-green-500/50 to-transparent"></div>
      </div>
      
      <div className={`absolute bottom-1/4 left-1/4 transition-all duration-700 delay-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-blockchain-panel p-3 rounded-lg border border-gray-800 shadow-md flex flex-col items-center">
          <div className="p-2 rounded-full bg-blue-500/20 mb-2">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <span className="text-xs text-white">Vendors</span>
          <div className="text-blue-400 text-xs mt-1">96</div>
        </div>
        {/* Connecting line */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-transparent to-blue-500/50"></div>
      </div>
      
      <div className={`absolute bottom-1/4 right-1/4 transition-all duration-700 delay-900 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-blockchain-panel p-3 rounded-lg border border-gray-800 shadow-md flex flex-col items-center">
          <div className="p-2 rounded-full bg-red-500/20 mb-2">
            <ShieldCheck className="h-6 w-6 text-red-400" />
          </div>
          <span className="text-xs text-white">Security</span>
          <div className="text-red-400 text-xs mt-1">100%</div>
        </div>
        {/* Connecting line */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-transparent to-red-500/50"></div>
      </div>
      
      {/* Floating data packets */}
      {animate && (
        <>
          <div className="absolute h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a78bfa]"
               style={{
                 top: '25%',
                 left: '25%',
                 animation: 'moveToCenter 3s ease-in-out infinite',
               }}></div>
          <div className="absolute h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"
               style={{
                 top: '25%',
                 right: '25%',
                 animation: 'moveToCenter 4s ease-in-out 0.5s infinite',
               }}></div>
          <div className="absolute h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]"
               style={{
                 bottom: '25%',
                 left: '25%',
                 animation: 'moveToCenter 3.5s ease-in-out 1s infinite',
               }}></div>
          <div className="absolute h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_#f87171]"
               style={{
                 bottom: '25%',
                 right: '25%',
                 animation: 'moveToCenter 2.5s ease-in-out 1.5s infinite',
               }}></div>
        </>
      )}
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes moveToCenter {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(100%, 100%) translateX(-50%) translateY(-50%);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default TenderDataVisualization;
