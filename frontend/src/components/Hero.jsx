import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export const Hero = ({ onSearchResults }) => {
  const [destinationInput, setDestinationInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [travelStyle, setTravelStyle] = useState('All');
  const [isSearching, setIsSearching] = useState(false);

  const videoRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented by browser:', err.message);
      });
    }
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);

    try {
      const q = destinationInput.trim();
      const res = await api.get(`/search?q=${encodeURIComponent(q)}`);

      if (res.success) {
        if (onSearchResults) {
          onSearchResults(res, q, travelStyle);
        }
        showToast(
          'Search Completed',
          q
            ? `Found results matching "${q}".`
            : `Showing full portfolio for style "${travelStyle}".`
        );
        const el = document.getElementById('destinations');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      showToast('Search Notice', 'Displaying portfolio matches.');
      const el = document.getElementById('destinations');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative min-h-[94vh] lg:min-h-screen flex flex-col justify-between pt-36 pb-12 px-6 md:px-12 bg-ink overflow-hidden">
      {/* Cinematic Full-Bleed Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-ink">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 duration-1000 transition-transform opacity-90"
        >
          <source src="/videos/leh.mp3.mp4" type="video/mp4" />
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dual-Layer Dark Gradient Overlay for Crisp Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center my-auto pt-6 pb-10">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-terracotta"></span>
          <span className="text-[11px] md:text-xs tracking-[0.3em] text-amber-200 uppercase font-medium">
            Discover • Experience • Escape
          </span>
          <span className="w-8 h-[1px] bg-terracotta"></span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-parchment font-light tracking-tight leading-[1.05] max-w-4xl mx-auto">
          Go somewhere worth{' '}
          <span className="italic font-normal font-display text-amber-100">
            remembering.
          </span>
        </h1>
        <p className="mt-6 text-sm sm:text-base md:text-lg text-parchment/80 max-w-2xl mx-auto font-light leading-relaxed">
          Handpicked destinations, unforgettable experiences and journeys designed
          around the way you want to travel.
        </p>

        {/* Editorial Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#destinations"
            className="px-8 py-3.5 bg-terracotta hover:bg-terracotta-hover text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
          >
            Explore Destinations
          </a>
          <a
            href="#packages"
            className="px-7 py-3.5 border border-white/40 hover:border-white text-white text-xs uppercase tracking-widest font-medium transition-all hover:bg-white/10"
          >
            View Packages →
          </a>
        </div>
      </div>

      {/* Architectural Search Console (Resting at Base) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-4">
        <form
          onSubmit={handleSearch}
          className="bg-parchment text-ink p-4 md:p-6 shadow-2xl border border-sandDark grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
        >
          {/* Destination Input */}
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-sandDark pb-3 md:pb-0 md:pr-4">
            <label className="block text-[10px] tracking-widest uppercase text-taupe font-semibold mb-1">
              Where to
            </label>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-terracotta shrink-0" />
              <input
                id="filter-destination"
                type="text"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                placeholder="Kashmir, Bali, Paris, Goa..."
                className="w-full bg-transparent border-0 p-0 text-sm font-serif italic text-ink placeholder-taupe/60 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          {/* Dates Input */}
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-sandDark pb-3 md:pb-0 md:pr-4">
            <label className="block text-[10px] tracking-widest uppercase text-taupe font-semibold mb-1">
              Season / Dates
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-taupe shrink-0" />
              <input
                type="month"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs text-ink focus:ring-0 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Travel Style Select */}
          <div className="md:col-span-3 border-b md:border-b-0 pb-3 md:pb-0">
            <label className="block text-[10px] tracking-widest uppercase text-taupe font-semibold mb-1">
              Travel Style
            </label>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-taupe shrink-0" />
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs text-ink focus:ring-0 focus:outline-none cursor-pointer"
              >
                <option value="All">All Travel Styles</option>
                <option value="Slow Living">Slow Living & Retreats</option>
                <option value="High Altitude">High Altitude & Passes</option>
                <option value="Coastal">Coastal & Slow Water</option>
                <option value="Cultural">Art & Cultural Immersion</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-3 bg-ink hover:bg-terracotta text-parchment text-xs uppercase tracking-widest font-semibold transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isSearching ? 'Searching...' : 'Find Trips'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
