import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Waves, Mountain, Landmark, Trees, Compass, Building2, ArrowRight } from 'lucide-react';

export const MegaMenuHotspots = ({ onItemClick }) => {
  const navigate = useNavigate();

  const hotspotCategories = [
    {
      title: 'Beaches & Secret Coves',
      targetSlug: 'beaches',
      description: 'Fontainhas coastal walks, South Goa hidden sands & Balinese reef sunsets.',
      icon: Waves,
      count: '12 Locations',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Mountains & Alpine Passes',
      targetSlug: 'mountains',
      description: 'Rohtang Pass summits at 13,000 ft, Pir Panjal ridges & Solang stargazing.',
      icon: Mountain,
      count: '8 High-Altitude Passes',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Historical Places & Haveli Forts',
      targetSlug: 'rajasthan',
      description: '18th century Portuguese manors, Rajput Haveli courtyards & Parisian archives.',
      icon: Landmark,
      count: '15 Heritage Estates',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Nature & Wildlife Reserves',
      targetSlug: 'kerala',
      description: 'Ubud sacred jungle ravines, Dubai desert reserves & Kerala tea estates.',
      icon: Trees,
      count: '10 Conservation Reserves',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Adventure Spots & Treks',
      targetSlug: 'manali',
      description: '1950s Land Rover desert traverses, water cleansing rituals & glacier trails.',
      icon: Compass,
      count: '14 Expeditions',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Popular Cities & Cultural Salons',
      targetSlug: 'paris',
      description: 'Paris Place des Vosges, Singapore biophilic skyline & Old Dubai souks.',
      icon: Building2,
      count: '6 Cultural Capitals',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const handleClick = (slug) => {
    if (onItemClick) onItemClick();
    navigate(`/location/${slug}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8 bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl text-parchment rounded-xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/15">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-200 font-mono font-semibold">
            Sensory Field Notes
          </span>
          <h3 className="font-serif text-2xl font-normal text-parchment">Travel Attraction Categories</h3>
        </div>
        <a
          href="#hotspots"
          onClick={onItemClick}
          className="text-xs uppercase tracking-widest text-terracotta hover:text-amber-200 transition-colors flex items-center gap-1 font-semibold"
        >
          <span>View All Moments</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {hotspotCategories.map((cat, idx) => {
          const IconComp = cat.icon;
          return (
            <button
              key={idx}
              onClick={() => handleClick(cat.targetSlug)}
              className="group bg-white/5 backdrop-blur-md p-4 border border-white/10 hover:border-amber-200/50 hover:bg-white/10 text-left transition-all duration-300 flex items-start gap-4 rounded-lg"
            >
              <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-black/40 rounded">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <IconComp className="w-5 h-5 text-amber-200" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] uppercase tracking-widest text-terracotta font-mono font-semibold block mb-0.5">
                  {cat.count}
                </span>
                <h4 className="font-serif text-base text-parchment font-normal group-hover:text-amber-200 transition-colors truncate">
                  {cat.title}
                </h4>
                <p className="text-xs text-taupe-light font-light leading-snug line-clamp-2 mt-1">
                  {cat.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};