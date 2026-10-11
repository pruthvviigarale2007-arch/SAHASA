import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, MapPin, Loader2, XCircle } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/bookings/my-bookings');
      if (res.success) {
        setBookings(res.data);
      }
    } catch (err) {
      showToast('Error', 'Unable to fetch your booked expeditions.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this expedition reservation?')) return;

    try {
      const res = await api.put(`/bookings/${id}/cancel`);
      if (res.success) {
        showToast('Booking Cancelled', 'Your reservation status has been updated to cancelled.');
        fetchBookings();
      }
    } catch (err) {
      showToast('Cancellation Error', err.message || 'Could not cancel booking.');
    }
  };

  return (
    <div className="bg-parchment min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-taupe hover:text-terracotta mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Return to Editorial Home
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-sandDark pb-6 mb-8">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-terracotta font-semibold">
              Travel Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink font-normal">
              My Booked Expeditions
            </h2>
          </div>
          <div className="text-xs text-taupe font-mono mt-2 sm:mt-0">
            Total Reservations: {bookings.length}
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-terracotta animate-spin" />
            <p className="text-xs uppercase tracking-widest text-taupe font-mono">Fetching Your Bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center bg-sand border border-sandDark space-y-4">
            <p className="font-serif text-2xl text-ink">No expeditions booked yet.</p>
            <p className="text-xs text-taupe max-w-sm mx-auto font-light">
              Explore our curated portfolio of escapes and reserve your next unhurried journey.
            </p>
            <Link
              to="/#packages"
              className="inline-block px-6 py-2.5 bg-ink text-parchment text-xs uppercase tracking-widest font-semibold"
            >
              Browse Curated Packages
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-sand border border-sandDark p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 font-bold ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-900/20 text-emerald-800 border border-emerald-800/30'
                          : b.status === 'cancelled'
                          ? 'bg-rose-900/20 text-rose-800 border border-rose-800/30'
                          : 'bg-amber-900/20 text-amber-800 border border-amber-800/30'
                      }`}
                    >
                      {b.status}
                    </span>
                    <span className="text-[10px] font-mono text-taupe">
                      Ref: #{b._id.slice(-8)}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-ink font-medium">
                    {b.package ? b.package.title : 'Curated Expedition'}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-xs text-taupe-dark font-light">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-terracotta" />
                      <span>{new Date(b.travelDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-terracotta" />
                      <span>{b.numberOfTravelers} Traveler(s) ({b.adults} Adults, {b.children} Children)</span>
                    </div>
                  </div>

                  {b.specialRequests && (
                    <div className="text-xs text-taupe italic bg-parchment p-3 border border-sandDark">
                      "Special Requests: {b.specialRequests}"
                    </div>
                  )}
                </div>

                <div className="w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-sandDark flex md:flex-col items-center md:items-end justify-between gap-4">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-taupe block font-mono uppercase">Server Total Rate</span>
                    <span className="font-serif text-2xl font-bold text-ink">
                      ₹{b.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {b.status !== 'cancelled' && (
                    <button
                      onClick={() => handleCancelBooking(b._id)}
                      className="px-3.5 py-1.5 border border-rose-800/30 text-rose-800 hover:bg-rose-900/10 text-xs uppercase tracking-widest flex items-center gap-1 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
