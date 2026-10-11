import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import api from '../services/api';

export const HotspotsSection = () => {
  const [hotspots, setHotspots] = useState([]);
  const reelRef = useRef(null);

  useEffect(() => {
    const fetchHotspots = async () => {
      try {
        const res = await api.get('/hotspots');
        if (res.success) {
          setHotspots(res.data);
        }
      } catch (err) {
        // Fallback to initial dataset if API unreachable
      }
    };
    fetchHotspots();
  }, []);

  const scrollReel = (direction) => {
    if (reelRef.current) {
      const offset = 400;
      reelRef.current.scrollBy({
        left: direction === 'left' ? -offset : offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-24 bg-ink text-parchment overflow-hidden" id="hotspots">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Reel Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-amber-200 font-semibold block mb-2">
              Sensory Moments
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight">
              Memories etched in <span className="italic font-display text-amber-100">golden hour.</span>
            </h2>
          </div>
          {/* Scroll controls */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => scrollReel('left')}
              className="w-10 h-10 border border-white/20 hover:border-white text-white flex items-center justify-center transition-colors"
              aria-label="Previous Moment"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollReel('right')}
              className="w-10 h-10 border border-white/20 hover:border-white text-white flex items-center justify-center transition-colors"
              aria-label="Next Moment"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Editorial Reel */}
        <div
          ref={reelRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 scroll-smooth"
          id="moments-reel"
        >
          {(hotspots.length > 0
            ? hotspots
            : [
                {
                  _id: '1',
                  name: 'Sunrise Shikara through floating vegetable markets',
                  location: '34.0837° N, 74.7973° E',
                  category: 'Dawn Routine • Dal Lake',
                  description:
                    'Before tourists awaken, the lake is like liquid mercury. Hawkers trade lotus stems and fresh mint directly boat-to-boat in whispered tones.',
                  image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBXkJqjnxgiHrbE67__s8D-E5fFiKa4gJ0uSwzViW8-lrsyp8kLPCVEU7tYkhlNqCeG8WCz1GlnxEFGOV2hQNkkBwcgAIuaZpDxb913lHTqaV2oLQwX2miOxx7MlOaOexfl9hh-0OA1AfwHfYZcskemxpoxrjD_ViaLnjuQRxXp3L4Bq717BuJxi-SLUICqbCKtOtWN3Etecse0vyRxeG98DXQXMdNnU2JKAb9pcEw1',
                  bestTime: '05:45 AM, April – October',
                },
                {
                  _id: '2',
                  name: 'Caldera breeze on the cliffside of Oia',
                  location: '36.4618° N, 25.3753° E',
                  category: 'Aegean Dusk • Oia Caldera',
                  description:
                    'The silence that falls over the caldera as the sun dips below the volcanic rim is heavier than any applause. Whitewashed stone still warm underfoot.',
                  image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBmaufjNHQmH-aWzs4ZSRA7DJ0YYeqlSkk09UhDoupOV-rjevkTN_v2YzsKXf7k7EucebOEBlCc-HTArEJlwkfw5OXcSa_4mG0QUILnpQYSRpwYExjMj5lriM8hq_zb0r6MhrOiMh3Pw5vvTDtKGS_bJp9igbQsherbBriMnVyWMruquTFTL8R29USuBNZSz59xBB2RQqjKIyN1v2PbO6ETUF_kUImDE30LR66FpebN',
                  bestTime: '19:30 PM, May or September',
                },
                {
                  _id: '3',
                  name: "Incense and jungle damp in Ubud's ravine",
                  location: '8.5069° S, 115.2625° E',
                  category: 'Morning Mist • Sacred Forest',
                  description:
                    'The scent of burning sandalwood mixing with wet moss. An encounter with a temple custodian setting out canang sari offerings at first light.',
                  image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuD0JuCAu9PHa3BDNNplA1LORUojwmtNLAuIUpS3pVciO-FOo1dh5D1aE8tH3FxVO6aYcQZ_RFHxB8K5yPTvUSsNtKdlP7a5iaWiPh1oMA1mNCtgZoqeydyw_BJPDVYBPhFfdSyc6IEvnvRz9z3gg6q6zoNqFBcEusWj72kwf81w6uQ4jXaR4FppP-Pa-OvCD04dGA4ctDLB5pvngC8IMXLTlM0k_y3EfEbwqokIZc61',
                  bestTime: '06:30 AM, Year-round',
                },
                {
                  _id: '4',
                  name: 'Stargazing in absolute red-dune quietude',
                  location: "22.8456° N, 55.4072° E",
                  category: "Desert Night • Rub' al Khali",
                  description:
                    'Sixty miles from any city lights, you hear only your own breath. The Milky Way hangs low enough that you can trace Orion’s belt without a glass.',
                  image:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDNbJ2SE9AxxQBf4KI11ikPrCjzZvA_cFUykKMRZvN2VywGnERJ0k1YBj034_AVDOjWSGokys4hi4DN3BdK9jBlKBl-zBjRt7Z-cy3txhstY5yQh092v-gE1l4VntNiRYKE6ZgGCkopIHerIQVJUJNHmOSIpUrPbkH99YEhmo54FMXdRB_3uYCR04h6K5XXuWHbLQdWmV5LL1svopE32iIBhn1yL--ca5du-uv2Oidd',
                  bestTime: '22:00 PM, November – February',
                },
              ]
          ).map((item) => (
            <div
              key={item._id}
              className="min-w-[300px] sm:min-w-[360px] md:min-w-[420px] snap-start border border-white/10 bg-inkSoft/60 p-6 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-5">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-black/70 text-amber-200 text-[10px] font-mono tracking-wider px-2 py-0.5">
                  {item.location}
                </span>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-taupe font-mono mb-1">
                  {item.category}
                </div>
                <h3 className="font-serif text-2xl text-parchment mb-2">{item.name}</h3>
                <p className="text-xs text-taupe-light font-light leading-relaxed mb-4">
                  "{item.description}"
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-[11px] text-amber-100/80 font-mono">
                Best time: {item.bestTime || 'Year-round'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
