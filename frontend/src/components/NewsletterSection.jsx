import React, { useState } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      const res = await api.post('/newsletter/subscribe', { email });
      if (res.success) {
        showToast('Subscribed', res.message || 'You have been added to Dispatches from the Road.');
        setEmail('');
      }
    } catch (err) {
      showToast('Subscription Notice', err.message || 'Could not subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
      <div className="border border-sandDark bg-sand p-8 md:p-14">
        <span className="text-[11px] tracking-[0.3em] uppercase text-terracotta font-semibold block mb-3">
          Newsletter Invitation
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-ink font-normal mb-4">
          Dispatches from the Road
        </h2>
        <p className="text-taupe-dark text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed mb-8">
          Once every two weeks, we send an essay about a remote village, a restored mountain shelter, or a slow railway route worth taking. No marketing noise.
        </p>
        <form
          onSubmit={handleNewsletter}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          id="newsletter-form"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your quiet email address..."
            className="flex-1 bg-parchment border border-sandDark px-4 py-3 text-xs text-ink placeholder-taupe focus:ring-0 focus:outline-none focus:border-ink"
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-ink hover:bg-terracotta text-parchment text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 disabled:opacity-50"
          >
            {submitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        <div className="mt-4 text-[10px] text-taupe font-mono">
          Unsubscribe anytime with a single click.
        </div>
      </div>
    </section>
  );
};
