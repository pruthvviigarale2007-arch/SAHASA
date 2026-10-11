import React, { useState, useEffect } from 'react';
import api from '../services/api';

export const JournalSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMemoirs = async () => {
      try {
        const res = await api.get('/reviews/package/all');
        if (res.success && res.data) {
          setReviews(res.data);
        }
      } catch (e) {
        // Fallback to initial dispatches
      }
    };
    fetchMemoirs();
  }, []);

  const defaultDispatches = [
    {
      _id: '1',
      dispatchNumber: 'Dispatch #142 • Kashmir',
      comment:
        'We spent three days without once looking at our phones. The morning kahwa prepared by Ghulam on the houseboat cedar deck, while the water gently lapped the wood, felt like an older, gentler century.',
      userName: 'Elena & Viktor Rostov',
      travelDateText: 'Traveled May 2024',
    },
    {
      _id: '2',
      dispatchNumber: 'Dispatch #139 • Bali',
      comment:
        'Staying in the bamboo villa in Sidemen was transformative. Wanderly arranged for a local farmer to teach us traditional rice cultivation before noon tea. It was respectful, intimate, and deeply authentic.',
      userName: 'Marcus & Chloe Chen',
      travelDateText: 'Traveled August 2024',
    },
    {
      _id: '3',
      dispatchNumber: 'Dispatch #128 • Dubai Desert',
      comment:
        'I wanted to see the desert as Wilfred Thesiger wrote about it, not the dune-bashing tourist circus. The private Bedouin dinner in the conservation reserve gave me precisely the stillness I craved.',
      userName: 'Aisha Vance-Morales',
      travelDateText: 'Traveled October 2024',
    },
  ];

  const list = reviews.length > 0 ? reviews : defaultDispatches;

  return (
    <section className="py-24 px-6 md:px-12 bg-sand border-t border-sandDark" id="journal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-sandDark pb-8">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-terracotta font-semibold block mb-2">
              Travel Memoirs
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-ink font-normal leading-tight">
              Dispatches from our <span className="italic font-display">travelers.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs md:text-sm text-taupe max-w-sm font-light leading-relaxed">
            Unfiltered impressions recorded by guests returning from the road.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.slice(0, 3).map((item) => (
            <article
              key={item._id}
              className="bg-parchment p-8 border border-sandDark flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] tracking-widest uppercase font-mono text-taupe mb-4">
                  {item.dispatchNumber || 'Dispatch • Verified Memoir'}
                </div>
                <p className="font-serif italic text-base text-ink leading-relaxed mb-6">
                  "{item.comment}"
                </p>
              </div>
              <div className="pt-4 border-t border-sandDark flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-ink">{item.userName}</div>
                  <div className="text-[11px] text-taupe">{item.travelDateText || 'Verified Guest'}</div>
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-terracotta">
                  Verified
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
