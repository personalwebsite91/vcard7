
import React, { useEffect, useState } from 'react';

interface IntroProps {
  onFinish: () => void;
}

const Intro: React.FC<IntroProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50"></div>

      <div className={`max-w-xl space-y-12 transition-all duration-1000 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="space-y-4">
          <p className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">A Special Initiative</p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl font-medium text-gray-500">From the founders of</span>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter">
              <span className="text-orange-500">SHAKTI</span>
              <span className="text-green-600">IND</span>
            </h1>
          </div>
        </div>

        <div className="relative py-8 px-12 inline-block">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-green-600/5 rounded-3xl -rotate-2"></div>
          <div className="relative flex flex-col items-center gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-[1px] bg-orange-200"></div>
              <p className="text-lg font-semibold text-gray-700">In Collaboration with</p>
              <div className="w-12 h-[1px] bg-green-200"></div>
            </div>
            <p className="text-2xl font-bold tracking-tight text-gray-800">
              <span className="text-orange-600">SHAKTIIND</span> TECHNOLOGIES <br /> 
              <span className="text-green-700">PVT LTD</span>
            </p>
          </div>
        </div>

        <div className="space-y-6 pt-8">
          <button
            onClick={onFinish}
            className="group relative bg-black text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Get Started
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          
          <div className="flex justify-center items-center gap-3 text-sm font-bold text-gray-400">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            <span>PROUDLY INDIAN</span>
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
          </div>
        </div>
      </div>

      {/* Visual Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square border-2 border-dashed border-gray-100 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none opacity-50"></div>
    </div>
  );
};

export default Intro;
