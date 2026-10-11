import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Heart, Mountain, Plane } from 'lucide-react';

export const MegaMenuPackages = ({ onItemClick }) => {
  const navigate = useNavigate();

  const packageCategories = [
    { id: 'domestic', title: 'Domestic Packages', description: 'Handcrafted alpine valleys of Kashmir, tea estates of Munnar & Latin streets of Goa.', image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=600&q=80', icon: Compass, tag: 'Indian Subcontinent', targetSlug: 'kashmir' },
    { id: 'international', title: 'International Packages', description: 'Haute cultural salons in Paris, Sidemen bamboo retreats in Bali & Arabian dunes in Dubai.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80', icon: Plane, tag: 'Global Journeys', targetSlug: 'bali' },
    { id: 'honeymoon', title: 'Honeymoon Packages', description: 'Secluded water villas, private sunset catamarans & candlelit dining under desert stars.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80', icon: Heart, tag: 'Intimate Escapes', targetSlug: 'goa' },
    { id: 'adventure', title: 'Adventure Packages', description: 'Rohtang alpine pass traverses at 13,000 ft, glacier hiking & desert 4x4 expeditions.', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80', icon: Mountain, tag: 'High Altitude & Trails', targetSlug: 'manali' },
  ];

  const handleClick = (cat) => {
    if (onItemClick) onItemClick();
    navigate(`/location/${cat.targetSlug}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8 bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl text-parchment rounded-xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/15">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-200 font-mono font-semibold">Turnkey Expedition Editions</span>
          <h3 className="font-serif text-2xl font-normal text-parchment">Curated Package Categories</h3>
        </div>
        <a href="#packages" onClick={onItemClick} className="text-xs uppercase tracking-widest text-terracotta hover:text-amber-200 transition-colors flex items-center gap-1 font-semibold">
          <span>View All Packages</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {packageCategories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <button key={cat.id} onClick={() => handleClick(cat)} className="group text-left bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-200/50 hover:bg-white/10 transition-all duration-300 overflow-hidden flex flex-col justify-between rounded-lg">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase text-amber-200 flex items-center gap-1 border border-white/10 rounded">
                    <IconComponent className="w-3 h-3 text-terracotta" />
                    <span>{cat.tag}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-serif text-lg text-parchment font-normal group-hover:text-amber-200 transition-colors mb-1.5">{cat.title}</h4>
                  <p className="text-xs text-taupe-light font-light leading-relaxed line-clamp-3">{cat.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};