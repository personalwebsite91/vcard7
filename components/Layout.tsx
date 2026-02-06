
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile } from '../App';
import { BRAND_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  user?: UserProfile | null;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const isIntro = location.pathname === '/intro';
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Don't show nav/footer on intro page
  if (isIntro) return <main className="flex-grow">{children}</main>;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center transition-all group-hover:rotate-6 group-hover:scale-105 shadow-lg shadow-slate-200">
              <i className="fa-solid fa-v text-white text-lg"></i>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">{BRAND_NAME}</span>
          </Link>
          
          <div className="flex gap-6 items-center">
            {user && !isLogin && (
              <>
                <Link to="/dashboard" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">History</Link>
                {!isHome && (
                  <Link 
                    to="/create" 
                    className="bg-slate-900 text-white text-sm px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
                  >
                    New Card
                  </Link>
                )}
                
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-10 h-10 bg-slate-100 border-2 border-white rounded-full flex items-center justify-center font-black text-slate-600 hover:bg-slate-200 transition-all shadow-sm"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </button>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                      <div className="pb-3 mb-3 border-b border-slate-50">
                        <p className="font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setShowProfileMenu(false);
                          onLogout?.();
                        }}
                        className="w-full text-left px-3 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <i className="fa-solid fa-power-off text-xs"></i>
                        Secure Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-12 px-6 text-center border-t border-slate-200/60 text-slate-400 text-xs">
        <div className="flex flex-col items-center gap-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-200 rounded-md flex items-center justify-center">
              <i className="fa-solid fa-v text-slate-400 text-[10px]"></i>
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-300">VCard</span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed">
            &copy; 2026 VCard Fintech by Shaktiind Technologies Pvt Ltd. <br />
            Prototype for educational purposes only. No actual financial transactions occur.
          </p>
          <div className="flex justify-center gap-8 font-bold uppercase tracking-widest text-[9px]">
            <span className="flex items-center gap-2"><i className="fa-solid fa-building-columns"></i> Shaktiind Enterprise</span>
            <span className="flex items-center gap-2"><i className="fa-solid fa-shield-check"></i> PCI DSS compliant</span>
            <span className="flex items-center gap-2"><i className="fa-solid fa-globe"></i> Global UPI Link</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
