
import React from 'react';
import { CardTransaction, TransactionStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { PLATFORMS, BRAND_NAME } from '../constants';

interface DashboardProps {
  history: CardTransaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ history }) => {
  // Prep chart data
  const chartData = history.slice(0, 5).reverse().map(tx => ({
    name: tx.platform,
    amount: tx.amountUsd
  }));

  const getStatusColor = (status: TransactionStatus) => {
    switch(status) {
      case TransactionStatus.ACTIVE: return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case TransactionStatus.EXPIRED: return 'bg-slate-50 text-slate-500 border border-slate-100';
      case TransactionStatus.REFUNDED: return 'bg-blue-50 text-blue-700 border border-blue-100';
      case TransactionStatus.USED: return 'bg-indigo-50 text-indigo-700 border border-indigo-100';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  const getPlatformIcon = (platformName: string) => {
    const platform = PLATFORMS.find(p => p.name === platformName);
    return platform ? platform.icon : 'fa-globe';
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">{BRAND_NAME} Analytics</h1>
          <p className="text-slate-500 font-medium">Total control over your virtual spending.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                <i className="fa-solid fa-receipt"></i>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Usage Volume</p>
                <p className="text-2xl font-black text-slate-900">₹{history.reduce((acc, curr) => acc + curr.amountInr, 0).toLocaleString()}</p>
              </div>
           </div>
        </div>
      </div>

      {history.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-black tracking-tight text-slate-900">Recent Cards</h2>
               <Link to="/create" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">New Session</Link>
            </div>
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/50 border-b border-slate-50">
                    <tr>
                      <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset & Network</th>
                      <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                      <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Issuer</th>
                      <th className="text-right px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {history.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-11 h-11 rounded-xl flex items-center justify-center text-sm text-white shadow-lg shadow-black/5"
                              style={{ background: tx.color || '#111' }}
                            >
                              <i className={`fa-solid ${getPlatformIcon(tx.platform)}`}></i>
                            </div>
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                  <span className="font-black text-slate-900 block leading-none">{tx.platform}</span>
                                  <i className={`fa-brands ${tx.network === 'visa' ? 'fa-cc-visa' : 'fa-cc-mastercard'} text-slate-400 text-xs`}></i>
                               </div>
                               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{tx.cardNumber.substring(0,4)} XXXX</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-black text-slate-900">${tx.amountUsd}</span>
                            <span className="text-[10px] text-slate-400 font-bold">₹{tx.amountInr.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-500 font-bold">
                          <div className="flex flex-col">
                            <span>{tx.bank}</span>
                            <span className="text-[10px] text-slate-300 font-normal">
                              {new Date(tx.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${getStatusColor(tx.status)}`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-xl font-black tracking-tight text-slate-900">Market Exposure</h2>
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/30 h-[320px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#94a3b8'}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0f172a' : '#1e293b'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-300 font-black uppercase tracking-widest text-xs">
                  Awaiting Data Points
                </div>
              )}
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-[32px] space-y-6 shadow-2xl shadow-slate-900/20">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                 <i className="fa-solid fa-crown"></i>
              </div>
              <div className="space-y-2">
                 <h3 className="font-black text-xl tracking-tight">Upgrade to Elite</h3>
                 <p className="text-sm text-slate-400 font-medium leading-relaxed">Enjoy zero markups, unlimited card creation, and 24/7 priority concierge.</p>
              </div>
              <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-sm hover:scale-[1.02] transition-transform shadow-lg">Become Elite Member</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden bg-white border border-slate-100 rounded-[40px] p-12 md:p-24 text-center shadow-2xl shadow-slate-200/50">
           {/* Sophisticated Illustration */}
           <div className="relative h-64 mb-12 flex items-center justify-center">
             {/* Background blobs */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-60"></div>
             
             {/* Floating card silhouettes */}
             <div className="absolute w-40 h-24 bg-slate-100 rounded-2xl border border-slate-200 rotate-[-12deg] -translate-x-12 translate-y-4 animate-float opacity-40" style={{ animationDelay: '0s' }}></div>
             <div className="absolute w-40 h-24 bg-slate-100 rounded-2xl border border-slate-200 rotate-[8deg] translate-x-12 -translate-y-6 animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
             
             {/* Central Icon */}
             <div className="relative z-10 w-32 h-32 bg-white rounded-[32px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center border border-slate-50 animate-bounce transition-all duration-1000">
               <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                 <i className="fa-solid fa-plus text-3xl"></i>
               </div>
             </div>
           </div>

           <div className="max-w-md mx-auto space-y-8 relative z-10">
             <div className="space-y-4">
               <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Your wallet is fresh.</h3>
               <p className="text-slate-500 font-medium leading-relaxed">
                 You haven't issued any virtual cards yet. Start your journey by creating a secure, time-bound card for your international subscriptions.
               </p>
             </div>
             
             <div className="flex flex-col gap-4">
               <Link 
                 to="/create" 
                 className="group bg-slate-900 text-white px-10 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-slate-900/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4"
               >
                 Generate First VCard
                 <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
               </Link>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Verified by Shaktiind Enterprise</p>
             </div>
           </div>

           {/* Decorative elements */}
           <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent opacity-50"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
