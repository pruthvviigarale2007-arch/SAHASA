import React from 'react';

export const Footer = ({ openContactModal, onQuickFilter }) => {
  return (
    <footer className="bg-ink text-parchment/80 pt-20 pb-12 px-6 md:px-12 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Wordmark & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-serif tracking-[0.25em] text-2xl text-parchment uppercase">Sahasa</div>
            <p className="text-taupe text-xs leading-relaxed max-w-sm font-light">
              An independent travel editorial and journey curator. We design slow, respectful, unhurried expeditions across the Indian subcontinent, Southeast Asia, and Western Europe.
            </p>
            <div className="pt-2 text-[11px] font-mono text-amber-200/70">
              Delhi • Srinagar • Denpasar • Paris
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div>
            <h4 className="text-[11px] tracking-widest uppercase font-mono text-parchment mb-4">Curated Lands</h4>
            <ul className="space-y-2.5 font-light text-taupe">
              <li><a href="#destinations" onClick={() => onQuickFilter && onQuickFilter('Kashmir')} className="hover:text-parchment transition-colors">Kashmir Valleys & Lakes</a></li>
              <li><a href="#destinations" onClick={() => onQuickFilter && onQuickFilter('Goa')} className="hover:text-parchment transition-colors">Goa Latin Quarters</a></li>
              <li><a href="#destinations" onClick={() => onQuickFilter && onQuickFilter('Manali')} className="hover:text-parchment transition-colors">Manali Alpine Passes</a></li>
              <li><a href="#destinations" onClick={() => onQuickFilter && onQuickFilter('Bali')} className="hover:text-parchment transition-colors">Bali Bamboo Sanctuaries</a></li>
              <li><a href="#destinations" onClick={() => onQuickFilter && onQuickFilter('Paris')} className="hover:text-parchment transition-colors">Paris Cultural Salons</a></li>
              <li><a href="#destinations" onClick={() => onQuickFilter && onQuickFilter('Dubai')} className="hover:text-parchment transition-colors">Arabian Desert Reserves</a></li>
            </ul>
          </div>

          {/* Col 3: Editorial */}
          <div>
            <h4 className="text-[11px] tracking-widest uppercase font-mono text-parchment mb-4">Editorial</h4>
            <ul className="space-y-2.5 font-light text-taupe">
              <li><a href="#philosophy" className="hover:text-parchment transition-colors">The Sahasa Standard</a></li>
              <li><a href="#journal" className="hover:text-parchment transition-colors">Guest Memoirs</a></li>
              <li><a href="#hotspots" className="hover:text-parchment transition-colors">Sensory Field Notes</a></li>
              <li><a href="#packages" className="hover:text-parchment transition-colors">Bespoke Itineraries</a></li>
              <li><a href="#philosophy" className="hover:text-parchment transition-colors">Local Guides Charter</a></li>
            </ul>
          </div>

          {/* Col 4: Concierge & Inquiries */}
          <div>
            <h4 className="text-[11px] tracking-widest uppercase font-mono text-parchment mb-4">Concierge</h4>
            <ul className="space-y-2.5 font-light text-taupe">
              <li>
                <span className="block text-parchment">Editorial Desk:</span>
                <button onClick={openContactModal} className="text-amber-200 hover:underline text-left">inquiry@sahasa.travel</button>
              </li>
              <li>
                <span className="block text-parchment">Private Charters:</span>
                <button onClick={openContactModal} className="text-amber-200 hover:underline text-left">concierge@sahasa.travel</button>
              </li>
              <li className="pt-2 text-taupe-light">Every expedition accompanied by vetted local field leads.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-taupe gap-4">
          <div>© {new Date().getFullYear()} Sahasa Travel Publication. Handcrafted with reverence for the world.</div>
          <div className="flex items-center gap-6 font-mono text-[10px]">
            <a href="#" className="hover:text-parchment">Privacy & Terms</a>
            <a href="#" className="hover:text-parchment">Ethical Travel Charter</a>
            <button onClick={openContactModal} className="hover:text-parchment">Press Inquiries</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
