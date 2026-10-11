import React, { useState, useEffect } from 'react';
import { Bookmark, ArrowRight, Loader2 } from 'lucide-react';
import api from '../services/api';

export const DestinationsSection = ({
  currency,
  wishlistItems,
  toggleWishlist,
  openItineraryModal,
  searchResults,
}) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const res = await api.get('/destinations');
        if (res.success) {
          setDestinations(res.data);
        }
      } catch (err) {
        setError('Unable to load destinations. Showing featured portfolio.');
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const formatPrice = (inr) => {
    if (currency === 'INR') {
      return `₹${inr.toLocaleString('en-IN')}`;
    }
    const usd = Math.round(inr / 83.5);
    return `$${usd.toLocaleString('en-US')}`;
  };

  // Filter if active search query exists
  const displayedDestinations =
    searchResults && searchResults.destinations && searchResults.destinations.length > 0
      ? searchResults.destinations
      : destinations;

  const heroItem = displayedDestinations[0];
  const sideItems = displayedDestinations.slice(1, 3);
  const rowItems = displayedDestinations.slice(3, 6);

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="destinations">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-sandDark pb-8">
        <div>
          <span className="text-[11px] tracking-[0.3em] uppercase text-terracotta font-semibold block mb-2">
            Portfolio of Escapes
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-ink font-normal leading-tight">
            Places worth going <span className="italic font-display">out of your way for.</span>
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-xs md:text-sm text-taupe max-w-md font-light leading-relaxed">
          Bespoke corners of the world where quiet grandeur still exists. Researched, vetted, and hosted by locals who take pride in unhurried journeys.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-terracotta animate-spin" />
          <p className="text-xs uppercase tracking-widest text-taupe font-mono">Curating Lands from API...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-sand border border-sandDark text-xs text-taupe-dark text-center my-6">
          {error}
        </div>
      ) : displayedDestinations.length === 0 ? (
        <div className="p-12 text-center text-taupe font-serif text-xl border border-sandDark bg-sand">
          No destinations found matching your selection.
        </div>
      ) : (
        <>
          {/* Asymmetric Top Spread (60% / 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Big Hero Feature (60% / 7 cols) */}
            {heroItem && (
              <div className="lg:col-span-7 group bg-sand border border-sandDark flex flex-col justify-between overflow-hidden">
                <div className="relative aspect-[16/11] overflow-hidden bg-inkSoft">
                  <img
                    src={heroItem.images[0] || 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=1200&q=80'}
                    alt={heroItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-ink/80 backdrop-blur-sm text-parchment text-[10px] tracking-widest uppercase px-3 py-1 font-mono">
                      01 • Featured Edition
                    </span>
                  </div>
                  <button
                    onClick={(e) => toggleWishlist(heroItem.slug, e)}
                    className="absolute top-4 right-4 w-9 h-9 bg-parchment/90 text-ink hover:text-terracotta flex items-center justify-center transition-colors"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        wishlistItems.has(heroItem.slug) ? 'fill-terracotta text-terracotta' : ''
                      }`}
                    />
                  </button>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-taupe mb-2">
                      <span>{heroItem.country}</span>
                      <span>•</span>
                      <span className="text-terracotta">{heroItem.bestTimeToVisit || '5 Days'}</span>
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl text-ink font-normal mb-3 group-hover:text-terracotta transition-colors">
                      {heroItem.name}: {heroItem.shortDescription || heroItem.description.slice(0, 50)}
                    </h3>
                    <p className="text-taupe-dark text-sm leading-relaxed max-w-xl font-light mb-6">
                      {heroItem.description}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-sandDark flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-taupe block font-mono">Curated Rate</span>
                      <span className="font-serif text-2xl text-ink font-medium">
                        {formatPrice(heroItem.averageCost || 24999)}
                      </span>
                      <span className="text-xs text-taupe"> / traveler</span>
                    </div>
                    <button
                      onClick={() => openItineraryModal(heroItem.slug)}
                      className="text-xs uppercase tracking-widest font-semibold text-ink group-hover:text-terracotta flex items-center gap-2 transition-colors"
                    >
                      <span>Explore {heroItem.name} Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Asymmetric Right Stack (40% / 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {sideItems.map((item, idx) => (
                <div
                  key={item._id || item.slug}
                  className="group bg-sand border border-sandDark overflow-hidden flex flex-col justify-between flex-1"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-inkSoft">
                    <img
                      src={item.images[0] || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <span className="absolute top-3 left-3 bg-ink/80 text-parchment text-[10px] tracking-widest uppercase px-2.5 py-0.5 font-mono">
                      0{idx + 2} • {item.category || 'Retreat'}
                    </span>
                    <button
                      onClick={(e) => toggleWishlist(item.slug, e)}
                      className="absolute top-3 right-3 w-8 h-8 bg-parchment/90 text-ink hover:text-terracotta flex items-center justify-center transition-colors"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          wishlistItems.has(item.slug) ? 'fill-terracotta text-terracotta' : ''
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-taupe mb-1">
                      <span>{item.country}</span>
                      <span>•</span>
                      <span className="text-terracotta">{item.category}</span>
                    </div>
                    <h4 className="font-serif text-2xl text-ink font-normal mb-2 group-hover:text-terracotta transition-colors">
                      {item.name}: {item.shortDescription}
                    </h4>
                    <p className="text-xs text-taupe-dark leading-relaxed font-light mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="pt-3 border-t border-sandDark flex items-center justify-between">
                      <span className="font-serif text-xl text-ink font-medium">
                        {formatPrice(item.averageCost || 39999)}
                      </span>
                      <button
                        onClick={() => openItineraryModal(item.slug)}
                        className="text-xs uppercase tracking-widest font-semibold text-ink group-hover:text-terracotta flex items-center gap-1.5"
                      >
                        <span>View Guide</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Vignette Row (3 Cards) */}
          {rowItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rowItems.map((item, idx) => (
                <div
                  key={item._id || item.slug}
                  className="group bg-sand border border-sandDark p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] overflow-hidden mb-5 bg-inkSoft">
                      <img
                        src={item.images[0] || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="text-[10px] tracking-widest uppercase text-taupe font-mono mb-1">
                      0{idx + 4} • {item.category || 'Heritage'}
                    </div>
                    <h4 className="font-serif text-2xl text-ink mb-2">{item.name}: {item.shortDescription}</h4>
                    <p className="text-xs text-taupe-dark font-light leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-sandDark flex items-center justify-between">
                    <span className="font-serif text-lg text-ink font-medium">
                      {formatPrice(item.averageCost || 14999)}
                    </span>
                    <button
                      onClick={() => openItineraryModal(item.slug)}
                      className="text-xs uppercase tracking-widest text-ink hover:text-terracotta font-medium"
                    >
                      Explore →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};
