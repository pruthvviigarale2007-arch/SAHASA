import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AuthModal = ({ initialMode = 'login', onClose }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        showToast('Welcome Back', `Signed in as ${res.data.name}`);
        onClose();
      } else {
        const res = await register({ name, email, password, phone });
        showToast('Account Created', `Welcome to Wanderly, ${res.data.name}`);
        onClose();
      }
    } catch (err) {
      showToast('Authentication Error', err.message || 'Please check your details');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-parchment border border-sandDark shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-ink text-parchment hover:bg-terracotta flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-mono font-semibold">
            Member Access
          </span>
          <h3 className="font-serif text-3xl text-ink font-normal mt-1">
            {mode === 'login' ? 'Welcome Back' : 'Join Wanderly'}
          </h3>
          <p className="text-xs text-taupe mt-1">
            {mode === 'login'
              ? 'Access your personal field notebook & booked journeys.'
              : 'Create an account to reserve bespoke expeditions.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-sandDark mb-6 text-xs uppercase tracking-widest font-mono">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-center transition-colors ${
              mode === 'login'
                ? 'border-b-2 border-terracotta text-terracotta font-bold'
                : 'text-taupe hover:text-ink'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-center transition-colors ${
              mode === 'register'
                ? 'border-b-2 border-terracotta text-terracotta font-bold'
                : 'text-taupe hover:text-ink'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-taupe absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostov"
                  className="w-full bg-sand border border-sandDark pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-taupe absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="traveler@wanderly.com"
                className="w-full bg-sand border border-sandDark pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-taupe absolute left-3 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full bg-sand border border-sandDark pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-taupe absolute left-3 top-3" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-sand border border-sandDark pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-ink hover:bg-terracotta text-parchment text-xs uppercase tracking-widest font-semibold transition-colors mt-2 disabled:opacity-50"
          >
            {isSubmitting
              ? 'Authenticating...'
              : mode === 'login'
              ? 'Sign In to Account'
              : 'Create Account'}
          </button>
        </form>

        {mode === 'login' && (
          <div className="mt-4 p-3 bg-sand border border-sandDark text-[11px] text-taupe font-mono">
            <span className="font-bold text-ink block mb-0.5">Demo Admin Login:</span>
            admin@wanderly.com / Admin@123456
          </div>
        )}
      </div>
    </div>
  );
};
