import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = { name, email, phone };
      if (password) payload.password = password;

      await updateProfile(payload);
      showToast('Profile Updated', 'Your profile details have been saved.');
      setPassword('');
    } catch (err) {
      showToast('Update Failed', err.message || 'Could not update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-parchment min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-taupe hover:text-terracotta mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Return to Editorial Home
        </Link>

        <div className="bg-sand border border-sandDark p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-sandDark">
            <img
              src={
                user?.profileImage ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
              }
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover border border-sandDark"
            />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-terracotta font-semibold">
                {user?.role === 'admin' ? 'Concierge Admin' : 'Verified Traveler'}
              </span>
              <h2 className="font-serif text-3xl text-ink font-normal">{user?.name}</h2>
              <p className="text-xs text-taupe">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-serif text-xl text-ink border-b border-sandDark pb-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-taupe absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-parchment border border-sandDark pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

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
                    className="w-full bg-parchment border border-sandDark pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-taupe absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-parchment border border-sandDark pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                  New Password (Leave blank to keep current)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-taupe absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-parchment border border-sandDark pl-9 pr-4 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-terracotta hover:bg-terracotta-hover text-parchment text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
