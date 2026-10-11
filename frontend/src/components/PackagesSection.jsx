import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import api from '../services/api';

export const PackagesSection = ({ currency, openItineraryModal, searchResults }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await api.get('/packages');
        if (res.success) {
          setPackages(res.data);
        }
      } catch (err) {
        setError('Unable to load packages. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const formatPrice = (inr) => {
    if (currency === 'INR') {
      return `₹${inr.toLocaleString('en-IN')}`;
    }
    const usd = Math.round(inr / 83.5);
    return `$${usd.toLocaleString('en-US')}`;
  };

  const displayedPackages =
    searchResults && searchResults.packages && searchResults.packages.length > 0
      ? searchResults.packages
      : packages;

  return (
    <section className="py-24 px-6 md:px-12 bg-sand border-y border-sandDark" id="packages">
      <div className="max-w-7xl mx-auto">
        {/* Section Title & Narrative */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-terracotta font-semibold block mb-2">
            Turnkey Itineraries
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-ink font-normal leading-tight">
            Trips designed around <span class="italic font-display">you.</span>
          </h2>
          <p className="text-taupe-dark mt-3 text-sm md:text-base font-light leading-relaxed">
            Every detail handled with intention: private guides who grew up on the terrain, boutique accommodations that respect their architecture, and zero unvetted middlemen.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-terracotta animate-spin" />
            <p className="text-xs uppercase tracking-widest text-taupe font-mono">Loading Curated Itineraries...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-parchment border border-sandDark text-xs text-taupe-dark text-center my-6">
            {error}
          </div>
        ) : displayedPackages.length === 0 ? (
          <div className="p-12 text-center text-taupe font-serif text-xl border border-sandDark bg-parchment">
            No curated packages found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="editorial-packages-list">
            {displayedPackages.slice(0, 8).map((pkg) => (
              <div
                key={pkg._id || pkg.slug}
                className="bg-parchment border border-sandDark flex flex-col justify-between group hover:border-taupe transition-colors duration-300"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-inkSoft">
                    <img
                      src={
                        (pkg.images && pkg.images[0]) ||
                        'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=1200&q=80'
                      }
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2.5 left-2.5 bg-ink/80 text-parchment px-2 py-0.5 text-[10px] font-mono tracking-wider">
                      {pkg.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] tracking-widest uppercase text-terracotta font-semibold mb-1">
                      {pkg.category}
                    </div>
                    <h3 className="font-serif text-2xl text-ink font-normal mb-3">{pkg.title}</h3>
                    <p className="text-xs text-taupe leading-relaxed font-light mb-4 line-clamp-3">
                      {pkg.description}
                    </p>
                    <div className="space-y-1.5 pt-3 border-t border-sandDark text-[11px] text-taupe-dark">
                      {(pkg.inclusions && pkg.inclusions.length > 0 ? pkg.inclusions : ['Private Guide Included', 'Boutique Accommodations', 'Ground Transportation']).map(
                        (inc, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-terracotta rounded-full"></span> {inc}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0 mt-4">
                  <div className="flex items-center justify-between pt-4 border-t border-sandDark">
                    <div>
                      <span className="text-[10px] text-taupe block font-mono">All-inclusive</span>
                      <span className="font-serif text-xl font-medium text-ink">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => openItineraryModal(pkg.destinationSlug || pkg.slug || 'kashmir')}
                      className="px-3.5 py-2 bg-ink group-hover:bg-terracotta text-parchment text-[11px] uppercase tracking-widest font-medium transition-colors"
                    >
                      View Itinerary
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
