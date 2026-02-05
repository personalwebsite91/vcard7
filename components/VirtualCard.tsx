
import React, { useState } from 'react';

interface VirtualCardProps {
  number: string;
  expiry: string;
  cvv: string;
  status?: string;
  isExpired?: boolean;
  color?: string;
  network?: string;
  bank?: string;
}

const VirtualCard: React.FC<VirtualCardProps> = ({ number, expiry, cvv, status, isExpired, color, network = 'visa', bank = 'Shaktiind Global' }) => {
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const getMaskedNumber = (num: string) => {
    const clean = num.replace(/\s/g, '');
    if (showFullNumber) return num.match(/.{1,4}/g)?.join(' ') || num;
    return `${clean.substring(0, 4)} •••• •••• ${clean.substring(clean.length - 4)}`;
  };

  const cardBackground = color || 'linear-gradient(135deg, #0f172a 0%, #334155 100%)';

  return (
    <div className={`group relative w-[340px] h-[210px] perspective-1000 transition-all duration-500 ${isExpired ? 'grayscale opacity-60' : 'hover:scale-105 hover:rotate-1'}`}>
      
      {/* Visual Halves Container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Upper/Left Half */}
        <div 
          className="absolute inset-0 rounded-[24px] shadow-2xl transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:-translate-x-1 group-hover:-rotate-3"
          style={{ 
            background: cardBackground,
            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 55%)'
          }}
        >
           {/* Decorative Elements for Half 1 */}
           <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Lower/Right Half */}
        <div 
          className="absolute inset-0 rounded-[24px] shadow-2xl transition-all duration-700 ease-out group-hover:translate-y-3 group-hover:translate-x-1 group-hover:rotate-3"
          style={{ 
            background: cardBackground,
            clipPath: 'polygon(0 55%, 100% 45%, 100% 100%, 0 100%)'
          }}
        >
           {/* Decorative Elements for Half 2 */}
           <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/20 rounded-full blur-2xl"></div>
        </div>

        {/* Glow Line / Crack effect */}
        <div 
          className="absolute inset-x-0 h-[1px] bg-white/20 top-[50%] -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ 
            transform: 'rotate(-3deg)',
            boxShadow: '0 0 15px white'
          }}
        ></div>
      </div>
      
      {/* Content Layer (Unified interactive surface) */}
      <div className="relative h-full flex flex-col justify-between p-6 z-10 text-white">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">{bank}</span>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bolt-lightning text-emerald-400 text-xs"></i>
              <span className="text-xs font-bold tracking-tight">VCard Premium</span>
            </div>
          </div>
          <div className="w-10 h-8 bg-white/20 rounded-md backdrop-blur-md flex items-center justify-center border border-white/10">
            <i className={`fa-brands ${network === 'visa' ? 'fa-cc-visa' : 'fa-cc-mastercard'} text-xl`}></i>
          </div>
        </div>

        <div className="space-y-4">
          <div className="group/num relative">
            <div 
              onClick={() => showFullNumber ? copyToClipboard(number.replace(/\s/g, ''), 'Number') : setShowFullNumber(true)}
              className="text-xl font-mono font-bold tracking-[0.2em] cursor-pointer hover:text-white/80 transition-colors drop-shadow-lg"
            >
              {getMaskedNumber(number)}
            </div>
            <div className="absolute -top-8 left-0 flex gap-2">
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowFullNumber(!showFullNumber); }}
                className="bg-white/10 hover:bg-white/20 p-1.5 rounded-md backdrop-blur-sm border border-white/10 transition-colors"
              >
                <i className={`fa-solid ${showFullNumber ? 'fa-eye-slash' : 'fa-eye'} text-[10px]`}></i>
              </button>
              {copied === 'Number' && <span className="text-[10px] bg-emerald-500 px-2 py-1 rounded-md animate-in fade-in slide-in-from-bottom-1 shadow-lg">Copied!</span>}
            </div>
          </div>

          <div className="flex gap-8">
            <div className="space-y-1">
              <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Expiry</span>
              <p className="text-xs font-bold font-mono tracking-widest drop-shadow-sm">{expiry}</p>
            </div>
            <div className="space-y-1 group/cvv relative">
              <span className="text-[8px] font-black uppercase tracking-widest opacity-50">CVV</span>
              <div className="flex items-center gap-2">
                <p 
                  onClick={() => showCvv ? copyToClipboard(cvv, 'CVV') : setShowCvv(true)}
                  className="text-xs font-bold font-mono tracking-widest cursor-pointer drop-shadow-sm"
                >
                  {showCvv ? cvv : '•••'}
                </p>
                <button 
                  type="button"
                  onClick={() => setShowCvv(!showCvv)}
                  className="opacity-0 group-hover/cvv:opacity-100 transition-opacity"
                >
                  <i className={`fa-solid ${showCvv ? 'fa-eye-slash' : 'fa-eye'} text-[10px]`}></i>
                </button>
                {copied === 'CVV' && <span className="absolute -top-6 left-0 text-[10px] bg-emerald-500 px-2 py-1 rounded-md shadow-lg">Copied!</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Overlay */}
      {status && (
        <div className="absolute top-4 right-4 z-20">
          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full backdrop-blur-md border ${status === 'ACTIVE' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-rose-500/20 border-rose-500/40 text-rose-400'}`}>
            {status}
          </span>
        </div>
      )}

      {isExpired && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px] z-30 rounded-[24px]">
          <span className="font-black text-2xl uppercase tracking-[0.3em] rotate-12 border-4 border-white/30 px-6 py-2 rounded-xl text-white/50">Expired</span>
        </div>
      )}
    </div>
  );
};

export default VirtualCard;
