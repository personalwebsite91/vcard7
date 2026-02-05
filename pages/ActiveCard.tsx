
import React, { useState, useEffect } from 'react';
import VirtualCard from '../components/VirtualCard';
import { CardTransaction, TransactionStatus } from '../types';
import { Link } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { UserProfile } from '../App';

interface ActiveCardProps {
  transaction: CardTransaction | null;
  onExpire: (id: string) => void;
  user?: UserProfile | null;
}

const ActiveCard: React.FC<ActiveCardProps> = ({ transaction, onExpire, user }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [refundStep, setRefundStep] = useState(0); // 0: None, 1: Processing, 2: Done
  const [showShareModal, setShowShareModal] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const themes = [
    { name: 'Midnight', bg: 'bg-slate-900', accent: 'text-emerald-400', glow: 'bg-emerald-500' },
    { name: 'Hyper', bg: 'bg-indigo-950', accent: 'text-pink-400', glow: 'bg-pink-500' },
    { name: 'Gold', bg: 'bg-stone-900', accent: 'text-amber-400', glow: 'bg-amber-500' },
    { name: 'Ocean', bg: 'bg-blue-950', accent: 'text-cyan-400', glow: 'bg-cyan-500' },
  ];

  useEffect(() => {
    if (!transaction || isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          onExpire(transaction.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [transaction, isExpired, onExpire]);

  // Handle the refund animation sequence
  useEffect(() => {
    if (isExpired) {
      setRefundStep(1);
      const timer = setTimeout(() => {
        setRefundStep(2);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isExpired]);

  const handleCapture = async () => {
    const el = document.getElementById('brag-graphic');
    if (!el || !transaction) return;

    setCapturing(true);
    try {
      // Small delay to ensure everything is rendered
      await new Promise(r => setTimeout(r, 200));
      
      const dataUrl = await toPng(el, {
        quality: 1.0,
        pixelRatio: 3, // High quality for sharing
        backgroundColor: '#000000',
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `VCard-PowerMove-${user?.name.split(' ')[0] || 'User'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to capture image', err);
      alert("Oops! Could not generate the image automatically. Please take a screenshot of the card manually to share!");
    } finally {
      setCapturing(false);
    }
  };

  if (!transaction) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
           <i className="fa-solid fa-credit-card text-3xl"></i>
        </div>
        <h2 className="text-2xl font-bold">No Active Card</h2>
        <p className="text-gray-500">You don't have an active virtual card at the moment.</p>
        <Link to="/create" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold">Create One</Link>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / 600) * 100;
  const currentTheme = themes[themeIndex];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Card Live & Ready
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Virtual Card Active</h1>
        <p className="text-gray-500">Copy details and use them on <span className="font-bold text-black">{transaction.platform}</span></p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="w-full flex justify-center perspective-1000">
          <VirtualCard 
            number={transaction.cardNumber}
            expiry={transaction.expiry}
            cvv={transaction.cvv}
            status={isExpired ? 'EXPIRED' : 'ACTIVE'}
            isExpired={isExpired}
            color={transaction.color}
            network={transaction.network}
            bank={transaction.bank}
          />
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-semibold text-gray-500">Time Remaining</span>
            <span className={`text-2xl font-mono font-bold ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-black'}`}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 rounded-full ${timeLeft < 60 ? 'bg-red-500' : 'bg-blue-600'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
             {!isExpired && (
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="flex-1 bg-white border border-slate-200 text-slate-900 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50"
                >
                  <i className="fa-solid fa-share-nodes text-emerald-500"></i>
                  Share My VCard Vibe
                </button>
             )}
          </div>
          
          <p className="text-center text-xs text-gray-400 italic pt-2">
            {isExpired ? 'This card is now invalid. Unused balance is being processed for refund.' : 'The card details will vanish when the timer hits 0:00.'}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-2">
          <h3 className="font-bold text-blue-900 flex items-center gap-2">
            <i className="fa-solid fa-circle-info"></i>
            How to use
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>1. Open {transaction.platform} payment page.</li>
            <li>2. Select "Credit/Debit Card" as payment method.</li>
            <li>3. Enter details exactly as shown above.</li>
            <li>4. Use the <span className="font-bold uppercase">{transaction.network}</span> option.</li>
          </ul>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 space-y-2">
          <h3 className="font-bold text-orange-900 flex items-center gap-2">
            <i className="fa-solid fa-shield-halved"></i>
            Safety First
          </h3>
          <p className="text-sm text-orange-800 leading-relaxed">
            This card is limited to ₹{transaction.amountInr.toLocaleString()}. It is issued by <span className="font-bold">{transaction.bank}</span>. 
            Unused balance is auto-refunded via UPI.
          </p>
        </div>
      </div>

      {/* Share/Brag Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300 overflow-y-auto">
          <button 
             onClick={() => setShowShareModal(false)}
             className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white text-xl hover:bg-white/20 transition-all z-[110]"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="max-w-md w-full relative pt-12">
            {/* Theme Selector */}
            <div className="flex gap-2 justify-center mb-6">
               {themes.map((t, idx) => (
                 <button 
                   key={t.name}
                   onClick={() => setThemeIndex(idx)}
                   className={`w-8 h-8 rounded-full border-2 transition-all ${themeIndex === idx ? 'border-white scale-125' : 'border-white/20'}`}
                   style={{ background: t.bg.replace('bg-', '') === 'slate-900' ? '#0f172a' : (t.bg.replace('bg-', '') === 'indigo-950' ? '#1e1b4b' : (t.bg.replace('bg-', '') === 'stone-900' ? '#1c1917' : '#172554')) }}
                 />
               ))}
            </div>

            {/* The Actual Graphic Container */}
            <div id="brag-graphic" className={`relative aspect-[9/16] w-full ${currentTheme.bg} rounded-[40px] overflow-hidden shadow-2xl border border-white/10 flex flex-col p-8 text-center items-center justify-between group`}>
              
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
                <div className={`absolute -top-24 -left-24 w-64 h-64 ${currentTheme.glow} rounded-full blur-[100px] animate-pulse`}></div>
                <div className={`absolute -bottom-24 -right-24 w-64 h-64 ${currentTheme.glow} rounded-full blur-[100px] animate-pulse`}></div>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
              </div>

              {/* Branding Header */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-xl border-4 border-white/20">
                  {/* <i className="fa-solid fa-bolt-lightning text-xl"></i> */}
                </div>
                <div className="mt-4">
                  <p className="text-white font-black tracking-widest uppercase text-[10px] opacity-60">Power Move By</p>
                  <p className="text-white font-black text-2xl tracking-tighter">{user?.name || 'VCard Elite'}</p>
                </div>
              </div>

              {/* Big Slogan */}
              <div className="relative z-10 space-y-4">
                <h2 className="text-5xl font-black text-white tracking-tighter leading-[0.9]">
                  Hooo! <br /> 
                  <span className={currentTheme.accent}>I am using</span> <br /> 
                  Virtual Card.
                </h2>
                <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">
                   {transaction.platform} Unlocked 🔓
                </div>
              </div>

              {/* Card Visual */}
              <div className="relative z-10 scale-[0.82] origin-center -my-12">
                 <VirtualCard 
                   number={transaction.cardNumber}
                   expiry={transaction.expiry}
                   cvv={transaction.cvv}
                   status="ACTIVE"
                   color={transaction.color}
                   network={transaction.network}
                   bank={transaction.bank}
                 />
              </div>

              {/* Official URL & Footer CTA */}
              <div className="relative z-10 space-y-6 w-full">
                <div className="space-y-2">
                  <p className="text-white font-black text-2xl tracking-tight">Grab Yours Now.</p>
                  <p className={`font-black  tracking-[0.3em] text-sm ${currentTheme.accent}`}>vcard.shaktiind.in</p>
                </div>
                
                <div className="flex gap-3 justify-center opacity-40">
                  {/* <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white"><i className="fa-brands fa-cc-visa text-xl"></i></div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white"><i className="fa-brands fa-cc-mastercard text-xl"></i></div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white"><i className="fa-solid fa-shield-halved text-xl"></i></div> */}
                </div>
              </div>

              {/* Bottom Decoration */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                 <div className={`w-1.5 h-1.5 rounded-full ${currentTheme.glow} shadow-[0_0_10px_white]`}></div>  
                 <span className="text-[9px] font-black uppercase text-white/30 tracking-[0.4em]">Powered by Shaktiind</span>
                 <div className={`w-1.5 h-1.5 rounded-full ${currentTheme.glow} shadow-[0_0_10px_white]`}></div>
              </div>
            </div>

            {/* Interaction Buttons */}
            <div className="mt-8 flex flex-col gap-4">
               <button 
                 disabled={capturing}
                 onClick={handleCapture}
                 className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
               >
                 {capturing ? (
                   <>
                     <i className="fa-solid fa-circle-notch fa-spin"></i>
                     Rendering Design...
                   </>
                 ) : (
                   <>
                     <i className="fa-solid fa-cloud-arrow-down"></i>
                     Save To Gallery
                   </>
                 )}
               </button>
               <button 
                 onClick={() => setShowShareModal(false)}
                 className="w-full bg-white/10 text-white py-4 rounded-2xl font-black text-sm hover:bg-white/20 transition-all"
               >
                 Maybe Later
               </button>
            </div>
          </div>
        </div>
      )}

      {isExpired && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] max-w-md w-full text-center space-y-8 border border-white/20 animate-in zoom-in duration-300">
            <div className="relative">
              {refundStep === 1 ? (
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-slate-50/50">
                  <i className="fa-solid fa-rotate fa-spin text-3xl text-slate-400"></i>
                </div>
              ) : (
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50 scale-110 transition-transform duration-500">
                  <i className="fa-solid fa-circle-check text-4xl text-emerald-500 animate-in bounce-in"></i>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                {refundStep === 1 ? 'Initiating Refund' : 'Refund Successful'}
              </h2>
              <p className="text-slate-500 font-medium">
                {refundStep === 1 
                  ? 'Calculating unused balance for secure return...' 
                  : 'Your unused capital has been safely returned to your UPI account.'}
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between px-2">
                 <div className="flex flex-col items-center gap-2">
                   <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs">
                     <i className="fa-solid fa-credit-card"></i>
                   </div>
                   <span className="text-[8px] font-black uppercase text-slate-400">VCard</span>
                 </div>
                 
                 <div className="flex-1 h-2 mx-4 bg-slate-200 rounded-full relative overflow-hidden">
                   {refundStep === 1 && (
                     <div className="absolute top-0 h-full w-4 bg-emerald-400 rounded-full animate-refund-flow"></div>
                   )}
                   {refundStep === 2 && (
                     <div className="absolute inset-0 bg-emerald-500 transition-all duration-1000"></div>
                   )}
                 </div>

                 <div className="flex flex-col items-center gap-2">
                   <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 text-xs">
                     <i className="fa-solid fa-building-columns"></i>
                   </div>
                   <span className="text-[8px] font-black uppercase text-slate-400">Bank</span>
                 </div>
              </div>
              
              <div className="pt-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Amount Reclaimed</div>
                <div className="text-2xl font-black text-slate-900">₹{transaction.amountInr.toLocaleString()}</div>
              </div>
            </div>

            <div className="pt-2">
              {refundStep === 2 ? (
                <Link to="/dashboard" className="block w-full bg-slate-900 text-white py-5 rounded-2xl font-black shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Return to Dashboard
                </Link>
              ) : (
                <div className="w-full bg-slate-100 text-slate-400 py-5 rounded-2xl font-black cursor-not-allowed">
                  Processing...
                </div>
              )}
            </div>
            
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Verified by Shaktiind Enterprise
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveCard;
