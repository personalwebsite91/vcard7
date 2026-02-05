
import React, { useState, useEffect } from 'react';
import { CardTransaction } from '../types';
import { UPI_ID } from '../constants';

interface PaymentProps {
  transaction: CardTransaction | null;
  onConfirm: () => void;
}

const Payment: React.FC<PaymentProps> = ({ transaction, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  if (!transaction) return null;

  const handleSimulatePayment = () => {
    setLoading(true);
    // Mock processing delay
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12 text-center">
      {loading ? (
        <div className="space-y-8 animate-pulse">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
            <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-400"></i>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Verifying Payment</h2>
            <p className="text-gray-500">Checking with your bank via UPI...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-center gap-2 items-center text-sm font-medium text-gray-400 mb-4">
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">1</span>
              <span>Details</span>
              <div className="w-8 h-[1px] bg-gray-200"></div>
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span className="text-blue-600">UPI Payment</span>
            </div>
            <h1 className="text-3xl font-extrabold">Scan to Pay</h1>
            <p className="text-gray-500">Pay exactly ₹{transaction.amountInr.toLocaleString()}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 inline-block relative overflow-hidden">
            <div className="p-4 bg-gray-50 rounded-2xl mb-4">
               {/* Mock QR Code UI */}
               <div className="w-48 h-48 mx-auto bg-white border-8 border-white shadow-inner flex flex-wrap p-1">
                 {Array.from({length: 64}).map((_, i) => (
                   <div key={i} className={`w-[12.5%] h-[12.5%] ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}></div>
                 ))}
               </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-bold bg-blue-50 text-blue-700 py-2 rounded-lg">
              <i className="fa-solid fa-mobile-screen-button"></i>
              {UPI_ID}
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleSimulatePayment}
              className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
            >
              Simulate Successful Payment
              <i className="fa-solid fa-circle-check"></i>
            </button>
            <p className="text-xs text-gray-400 px-8">
              Open your preferred UPI app (GPay, PhonePe, Paytm) and scan the QR above. Do not close this window.
            </p>
          </div>

          <div className="pt-8 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-1 opacity-40">
              <i className="fa-solid fa-lock text-xl"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-40">
              <i className="fa-solid fa-rotate text-xl"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">Refundable</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
