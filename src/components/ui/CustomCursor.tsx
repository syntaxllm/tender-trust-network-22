
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <>
      <div 
        className="custom-cursor fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`
          relative rounded-full
          ${isPointer ? 'w-8 h-8' : 'w-6 h-6'}
          bg-blockchain-purple/20 backdrop-blur-sm
          transition-all duration-200 ease-out
          border border-blockchain-purple/40
        `}>
          <div className="absolute inset-0 rounded-full animate-pulse-opacity bg-blockchain-lightPurple/20" />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
