
import React, { useState, useEffect } from 'react';
import VirtualCard from './VirtualCard';

const ProcessVisualization: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "Deposit Capital",
      desc: "Enter your desired USD amount. We calculate the exact INR conversion instantly.",
      icon: "fa-wallet"
    },
    {
      title: "UPI Settlement",
      desc: "Scan the dynamic QR code with any UPI app to authorize the transaction.",
      icon: "fa-qrcode"
    },
    {
      title: "Card Deployment",
      desc: "Your virtual international card is issued instantly with a 10-minute validity.",
      icon: "fa-bolt"
    },
    {
      title: "Global Checkout",
      desc: "Use your card on any international SaaS platform. Residual funds are auto-refunded.",
      icon: "fa-globe"
    }
  ];

  return (
    <section className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Text Content */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400">Operational Flow</h2>
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
              From UPI to <br /> Global SaaS.
            </h3>
          </div>

          <div className="space-y-4">
            {steps.map((s, i) => (
              <div 
                key={i} 
                className={`flex gap-6 p-6 rounded-[24px] transition-all duration-500 border-2 ${step === i ? 'bg-white/5 border-white/10 translate-x-4' : 'border-transparent opacity-40'}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${step === i ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/10 text-white'}`}>
                  <i className={`fa-solid ${s.icon}`}></i>
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-lg tracking-tight">{s.title}</h4>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Phone Mockup */}
        <div className="relative flex justify-center items-center">
          {/* Glowing Aura behind phone */}
          <div className="absolute w-[400px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"></div>
          
          <div className="relative w-[320px] h-[640px] bg-slate-800 rounded-[50px] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-slate-700 overflow-hidden transform hover:rotate-2 transition-transform duration-700">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-700 rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
            </div>

            {/* Screen Content */}
            <div className="w-full h-full bg-slate-50 rounded-[38px] overflow-hidden relative font-sans">
              
              {/* Step 0: Deposit */}
              <div className={`absolute inset-0 p-6 flex flex-col gap-6 transition-all duration-700 ${step === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="h-12 flex justify-between items-center">
                   <i className="fa-solid fa-chevron-left text-slate-900"></i>
                   <span className="font-black text-xs uppercase tracking-widest text-slate-400">Card Setup</span>
                   <i className="fa-solid fa-ellipsis text-slate-900"></i>
                </div>
                <div className="mt-8 space-y-2 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Enter Deposit</p>
                  <div className="text-5xl font-black text-slate-900 tracking-tighter animate-pulse">$20</div>
                  <div className="text-xs font-bold text-slate-400">≈ ₹1,670.00</div>
                </div>
                <div className="mt-auto pb-10">
                  <div className="w-full h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-sm">Initialize Payment</div>
                </div>
              </div>

              {/* Step 1: UPI QR */}
              <div className={`absolute inset-0 p-6 flex flex-col items-center justify-center gap-8 transition-all duration-700 ${step === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                 <div className="w-48 h-48 bg-white rounded-3xl p-4 shadow-xl border border-slate-100 flex flex-wrap gap-1">
                   {Array.from({length: 36}).map((_, i) => (
                     <div key={i} className={`w-[14%] h-[14%] ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-white'}`}></div>
                   ))}
                 </div>
                 <div className="text-center space-y-2">
                    <p className="font-black text-slate-900">Waiting for UPI...</p>
                    <div className="flex gap-2 justify-center">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></div>
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100"></div>
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-200"></div>
                    </div>
                 </div>
              </div>

              {/* Step 2: VCard Display */}
              <div className={`absolute inset-0 p-4 flex flex-col items-center justify-center transition-all duration-700 ${step === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                 <div className="scale-75 origin-center">
                    <VirtualCard 
                      number="4532 8812 3441 9022"
                      expiry="05/28"
                      cvv="918"
                      status="ACTIVE"
                      color="linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)"
                    />
                 </div>
                 <div className="mt-8 bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest text-center">
                    VCard Issued Successfully
                 </div>
              </div>

              {/* Step 3: Success SaaS */}
              <div className={`absolute inset-0 p-6 flex flex-col items-center justify-center gap-10 transition-all duration-700 ${step === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
                 <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
                    <i className="fa-solid fa-bolt text-4xl text-white"></i>
                 </div>
                 <div className="text-center space-y-4">
                    <h5 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">ChatGPT Plus <br /> Activated!</h5>
                    <p className="text-xs text-slate-500 font-medium">Payment verified by Shaktiind</p>
                 </div>
                 <div className="w-full flex justify-around">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center"><i className="fa-solid fa-share text-slate-400"></i></div>
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center"><i className="fa-solid fa-download text-slate-400"></i></div>
                 </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessVisualization;
