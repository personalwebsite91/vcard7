
import React, { useState } from 'react';
import { UserProfile } from '../App';
import { BRAND_NAME } from '../constants';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate minor delay for premium feel
    setTimeout(() => {
      onLogin(formData);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100 p-10 animate-content-delayed" style={{ opacity: 1, animationDelay: '0s' }}>
        <div className="text-center mb-10 space-y-2">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform hover:rotate-12 shadow-xl shadow-slate-900/20">
            <i className="fa-solid fa-v text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Get your {BRAND_NAME}</h1>
          <p className="text-slate-400 font-medium">Complete your secure profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Legal Name</label>
            <div className="relative">
              <i className="fa-solid fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input
                required
                type="text"
                placeholder="Ex. Rahul Sharma"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white outline-none rounded-2xl transition-all font-bold text-slate-800"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email for Statements</label>
            <div className="relative">
              <i className="fa-solid fa-at absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input
                required
                type="email"
                placeholder="rahul@example.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white outline-none rounded-2xl transition-all font-bold text-slate-800"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">UPI Linked Mobile</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black">+91</span>
              <input
                required
                type="tel"
                pattern="[0-9]{10}"
                placeholder="9876543210"
                className="w-full pl-16 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white outline-none rounded-2xl transition-all font-bold text-slate-800"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <>
                Create VCard Profile
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center gap-8 grayscale opacity-20">
          <i className="fa-solid fa-shield-check text-2xl"></i>
          <i className="fa-solid fa-building-columns text-2xl"></i>
          <i className="fa-solid fa-fingerprint text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Login;
