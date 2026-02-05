
import React, { useState } from 'react';
import { PLATFORMS, EXCHANGE_RATE, CARD_COLORS, BRAND_NAME, CARD_NETWORKS, ISSUING_BANKS } from '../constants';
import { Platform, CardTransaction, TransactionStatus, CardNetwork, IssuingBank } from '../types';

interface CreateCardProps {
  onCreate: (tx: CardTransaction) => void;
}

const CreateCard: React.FC<CreateCardProps> = ({ onCreate }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(PLATFORMS[0]);
  const [selectedNetwork, setSelectedNetwork] = useState<CardNetwork>(CARD_NETWORKS[0]);
  const [selectedBank, setSelectedBank] = useState<IssuingBank>(ISSUING_BANKS[0]);
  const [amountUsd, setAmountUsd] = useState<number>(PLATFORMS[0].defaultPrice);
  const [selectedColor, setSelectedColor] = useState(CARD_COLORS[0].value);

  const amountInr = Math.ceil(amountUsd * EXCHANGE_RATE);
  const processingFee = Math.ceil(amountInr * 0.02); // 2% fee
  const totalInr = amountInr + processingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTx: CardTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      platform: selectedPlatform.name,
      amountUsd,
      amountInr: totalInr,
      timestamp: Date.now(),
      status: TransactionStatus.ACTIVE,
      cardNumber: (selectedNetwork.id === 'visa' ? '4532' : '5214') + Math.floor(100000000000 + Math.random() * 900000000000).toString(),
      expiry: '05/28',
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      color: selectedColor,
      network: selectedNetwork.id,
      bank: selectedBank.name
    };
    
    onCreate(newTx);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Issue your {BRAND_NAME}</h1>
        <p className="text-slate-500 font-medium font-mono text-xs uppercase tracking-[0.3em]">International Payments via UPI</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Step 1: Destination */}
        <div className="space-y-4">
          <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">1. Select Target Service</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedPlatform(p);
                  setAmountUsd(p.defaultPrice);
                }}
                className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 group ${selectedPlatform.id === p.id ? 'border-slate-900 bg-white shadow-lg' : 'border-slate-100 bg-white hover:border-slate-200'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${selectedPlatform.id === p.id ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-400'}`}>
                  <i className={`fa-solid ${p.icon} text-sm`}></i>
                </div>
                <span className={`font-black text-[10px] tracking-tight uppercase transition-colors ${selectedPlatform.id === p.id ? 'text-slate-900' : 'text-slate-400'}`}>{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Network & Bank Selection */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">2. Select Card Network</label>
            <div className="flex gap-4">
              {CARD_NETWORKS.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSelectedNetwork(n)}
                  className={`flex-1 p-5 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${selectedNetwork.id === n.id ? 'border-slate-900 bg-white shadow-lg' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <i className={`fa-brands ${n.icon} text-2xl ${selectedNetwork.id === n.id ? 'text-slate-900' : 'text-slate-300'}`}></i>
                  <span className={`font-bold text-sm ${selectedNetwork.id === n.id ? 'text-slate-900' : 'text-slate-400'}`}>{n.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">3. Partner Bank</label>
            <div className="grid grid-cols-2 gap-3">
              {ISSUING_BANKS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBank(b)}
                  className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-2 text-left ${selectedBank.id === b.id ? 'border-slate-900 bg-white shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedBank.id === b.id ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>
                    <i className={`fa-solid ${b.icon} text-[10px]`}></i>
                  </div>
                  <span className={`text-[10px] font-bold ${selectedBank.id === b.id ? 'text-slate-900' : 'text-slate-400'}`}>{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Deployment Amount */}
        <div className="space-y-4">
          <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">4. Deposit Amount (USD)</label>
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-200 group-focus-within:text-slate-900 transition-colors pointer-events-none">$</div>
            <input 
              type="number"
              value={amountUsd}
              onChange={(e) => setAmountUsd(Number(e.target.value))}
              className="w-full pl-12 pr-6 py-5 rounded-[24px] border border-slate-100 bg-white shadow-sm focus:border-slate-900 outline-none transition-all text-4xl font-black text-slate-900 tracking-tighter"
              min="1"
              max="2000"
            />
          </div>
        </div>

        {/* Step 4: Aesthetics */}
        <div className="space-y-4">
          <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">5. Personalize Card Color</label>
          <div className="p-6 bg-white border border-slate-100 rounded-[32px] shadow-sm flex flex-wrap gap-4">
            {CARD_COLORS.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                className={`w-12 h-12 rounded-xl border-4 transition-all hover:scale-110 active:scale-90 flex items-center justify-center overflow-hidden ${selectedColor === color.value ? 'border-slate-900 scale-110 shadow-lg' : 'border-white shadow-md'}`}
                style={{ background: color.value }}
                title={color.name}
              >
                {selectedColor === color.value && <i className="fa-solid fa-check text-white text-[10px]"></i>}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div 
          className="rounded-[32px] p-8 text-white space-y-6 shadow-2xl transition-all duration-700 overflow-hidden border border-white/5" 
          style={{ background: selectedColor }}
        >
          <div className="flex justify-between items-center text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2"><i className={`fa-brands ${selectedNetwork.icon}`}></i> {selectedNetwork.name} Virtual</span>
            <span>Rate: ₹{EXCHANGE_RATE}</span>
          </div>
          
          <div className="space-y-3 pt-4 border-t border-white/10">
             <div className="flex justify-between text-sm font-semibold">
               <span className="text-white/60">Base Amount</span>
               <span className="text-white font-black">₹{amountInr.toLocaleString()}</span>
             </div>
             <div className="flex justify-between text-sm font-semibold">
               <span className="text-white/60">Cross-Border Fee (2%)</span>
               <span className="text-white font-black">₹{processingFee.toLocaleString()}</span>
             </div>
          </div>

          <div className="pt-6 flex justify-between items-end">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Total Payable via UPI</p>
              <h2 className="text-4xl font-black tracking-tighter">₹{totalInr.toLocaleString()}</h2>
            </div>
            <div className="text-right flex flex-col items-end">
               <i className="fa-solid fa-shield-check text-white/20 text-2xl mb-1"></i>
               <span className="text-[8px] font-black uppercase tracking-widest text-white/40">{selectedBank.name} Partnered</span>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-slate-900 text-white py-6 rounded-[24px] font-black text-xl shadow-2xl shadow-slate-900/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-4 group"
        >
          Generate {selectedNetwork.name} VCard
          <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
        </button>
      </form>
    </div>
  );
};

export default CreateCard;
