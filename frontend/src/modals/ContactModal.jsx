import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export const ContactModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.post('/contact', {
        name,
        email,
        phone,
        subject,
        message,
      });

      if (res.success) {
        setSubmitted(true);
        showToast('Inquiry Sent', 'Our Concierge desk has been notified.');
      }
    } catch (err) {
      showToast('Error', err.message || 'Could not send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-parchment border border-sandDark shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-ink text-parchment hover:bg-terracotta flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-terracotta font-mono font-semibold">
            Concierge Desk
          </span>
          <h3 className="font-serif text-3xl text-ink font-normal mt-1">
            Private Inquiries & Custom Expeditions
          </h3>
          <p className="text-xs text-taupe mt-1">
            Speak directly with our editorial lead regarding bespoke private charters.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3 bg-sand border border-sandDark p-6">
            <CheckCircle2 className="w-10 h-10 text-terracotta mx-auto" />
            <h4 className="font-serif text-2xl text-ink">Inquiry Logged</h4>
            <p className="text-xs text-taupe-dark">
              Thank you, {name}. A member of our concierge desk will respond to your dispatch within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-ink text-parchment text-xs uppercase tracking-widest"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostov"
                  className="w-full bg-sand border border-sandDark px-3 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@wanderly.com"
                  className="w-full bg-sand border border-sandDark px-3 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full bg-sand border border-sandDark px-3 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Private Charter Inquiry"
                  className="w-full bg-sand border border-sandDark px-3 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                Your Dispatch Message
              </label>
              <textarea
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Details regarding your preferred region, dates, number of guests..."
                className="w-full bg-sand border border-sandDark p-3 text-xs text-ink focus:outline-none focus:border-ink"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-terracotta hover:bg-terracotta-hover text-parchment text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Sending...' : 'Send Inquiry to Concierge'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
