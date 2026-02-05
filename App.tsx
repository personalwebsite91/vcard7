
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateCard from './pages/CreateCard';
import Payment from './pages/Payment';
import ActiveCard from './pages/ActiveCard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Intro from './pages/Intro';
import { CardTransaction, TransactionStatus } from './types';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

const App: React.FC = () => {
  const [history, setHistory] = useState<CardTransaction[]>([]);
  const [activeCard, setActiveCard] = useState<CardTransaction | null>(null);
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    return localStorage.getItem('tempo_intro_seen') === 'true';
  });
  
  // Persistent user state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('tempo_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  // Load user-specific data whenever the user state changes
  useEffect(() => {
    if (user) {
      // Load history for this specific email
      const savedHistory = localStorage.getItem(`vcard_history_${user.email}`);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      } else {
        setHistory([]);
      }

      // Load active card for this specific email
      const savedActive = localStorage.getItem(`vcard_active_${user.email}`);
      if (savedActive) {
        setActiveCard(JSON.parse(savedActive));
      } else {
        setActiveCard(null);
      }
    } else {
      setHistory([]);
      setActiveCard(null);
    }
  }, [user]);

  // Persist history whenever it changes
  useEffect(() => {
    if (user && history.length > 0) {
      localStorage.setItem(`vcard_history_${user.email}`, JSON.stringify(history));
    } else if (user && history.length === 0) {
      localStorage.removeItem(`vcard_history_${user.email}`);
    }
  }, [history, user]);

  // Persist active card whenever it changes
  useEffect(() => {
    if (user) {
      if (activeCard) {
        localStorage.setItem(`vcard_active_${user.email}`, JSON.stringify(activeCard));
      } else {
        localStorage.removeItem(`vcard_active_${user.email}`);
      }
    }
  }, [activeCard, user]);

  const handleFinishIntro = () => {
    setHasSeenIntro(true);
    localStorage.setItem('tempo_intro_seen', 'true');
    navigate('/login');
  };

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('tempo_user', JSON.stringify(profile));
    
    // Check if there's existing data in the "folder" (localStorage) for this email
    const existingHistory = localStorage.getItem(`vcard_history_${profile.email}`);
    if (existingHistory) {
      setHistory(JSON.parse(existingHistory));
    }

    const existingActive = localStorage.getItem(`vcard_active_${profile.email}`);
    if (existingActive) {
      setActiveCard(JSON.parse(existingActive));
    }

    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tempo_user');
    navigate('/login');
  };

  const handleCreateTransaction = (tx: CardTransaction) => {
    setActiveCard(tx);
    navigate('/payment');
  };

  const handlePaymentSuccess = () => {
    if (activeCard) {
      setHistory(prev => {
        const newHistory = [activeCard, ...prev];
        return newHistory;
      });
      navigate('/active');
    }
  };

  const handleExpiry = (id: string) => {
    setHistory(prev => {
      const updated = prev.map(tx => tx.id === id ? { ...tx, status: TransactionStatus.EXPIRED } : tx);
      return updated;
    });
    
    if (activeCard?.id === id) {
      setActiveCard(null);
    }
  };

  // Intro logic: Always show intro first if not seen
  if (!hasSeenIntro && location.pathname !== '/intro') {
    return <Navigate to="/intro" replace />;
  }

  // Auth Guard: Only allow access to routes if logged in, except for /login and /intro
  if (!user && location.pathname !== '/login' && location.pathname !== '/intro') {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/intro" element={<Intro onFinish={handleFinishIntro} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCard onCreate={handleCreateTransaction} />} />
        <Route path="/payment" element={<Payment onConfirm={handlePaymentSuccess} transaction={activeCard} />} />
        <Route path="/active" element={<ActiveCard transaction={activeCard} onExpire={handleExpiry} user={user} />} />
        <Route path="/dashboard" element={<Dashboard history={history} />} />
      </Routes>
    </Layout>
  );
};

export default App;
