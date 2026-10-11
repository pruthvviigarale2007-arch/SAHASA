import React from 'react';

export const PhilosophySection = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="philosophy">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Large Photographic Print with Offset Quote */}
        <div className="lg:col-span-5 relative">
          <div className="bg-sand p-4 border border-sandDark shadow-sm">
            <div className="aspect-[4/5] overflow-hidden bg-inkSoft">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZpFM-0iGlGwFfwQ4SYzRjAi0c7IwNazk5r9M0jYsA6GWuGhobLRhYJ372KGbmWCdnldb4ySe5IIsdP6O0I2y4HbKfJ74YsErx9QEUc_ORsw_yF0-quFXhO3g09jj3NHSvknArsuwSElOOpFudbAmRjUJzAYBAePNfwAC8xqUlnaKZ0E3tXLvtOjyGfP0RjchvMHiDpOxdzOOLSPRjD-heuPEeANT1J_O20eo8KJMW"
                alt="Traveler looking over vast valley"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Offset Quote Box */}
          <div className="mt-6 md:mt-0 md:absolute md:-bottom-8 md:-right-8 bg-parchment p-6 md:p-8 border border-sandDark shadow-xl max-w-sm">
            <p className="font-serif italic text-lg text-ink leading-snug">
              "Travel isn't about checking boxes. It is about returning slightly changed."
            </p>
            <span className="block mt-3 text-[10px] tracking-widest uppercase text-terracotta font-mono font-semibold">
              — The Sahasa Field Notes
            </span>
          </div>
        </div>

        {/* Right: The 3 Human Principles */}
        <div className="lg:col-span-7 space-y-10 lg:pl-6">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-terracotta font-semibold block mb-2">
              Our Operating Ethos
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-ink font-normal leading-tight">
              The Sahasa Standard
            </h2>
            <p className="text-taupe-dark mt-3 text-sm md:text-base font-light leading-relaxed">
              In an era of mass algorithmic travel aggregators, we deliberately choose human curation, verified hosts, and quiet pacing over high-volume itineraries.
            </p>
          </div>
          <div className="space-y-8 border-t border-sandDark pt-8">
            {/* Principle 1 */}
            <div className="flex items-start gap-4">
              <span className="font-mono text-xs text-terracotta font-bold mt-1">01 /</span>
              <div>
                <h3 className="font-serif text-2xl text-ink font-normal mb-1">
                  Curated by people who actually lived there.
                </h3>
                <p className="text-xs text-taupe-dark font-light leading-relaxed">
                  Not web scrapers or sponsored tourist board promotions. Every trail, stay, and meal in our itineraries has been personally walked and vetted by our editors or long-standing local residents.
                </p>
              </div>
            </div>
            {/* Principle 2 */}
            <div className="flex items-start gap-4">
              <span className="font-mono text-xs text-terracotta font-bold mt-1">02 /</span>
              <div>
                <h3 className="font-serif text-2xl text-ink font-normal mb-1">
                  Transparent, respectful pricing.
                </h3>
                <p className="text-xs text-taupe-dark font-light leading-relaxed">
                  No artificially inflated rates designed for false discount banners. No hidden resort fees or checkout surprises. Fair rates that ensure local guides and family-run villas are honored equitably.
                </p>
              </div>
            </div>
            {/* Principle 3 */}
            <div className="flex items-start gap-4">
              <span className="font-mono text-xs text-terracotta font-bold mt-1">03 /</span>
              <div>
                <h3 className="font-serif text-2xl text-ink font-normal mb-1">
                  A slow, mindful pace.
                </h3>
                <p className="text-xs text-taupe-dark font-light leading-relaxed">
                  We believe you should see fewer places with greater depth. Our journeys allow ample unplanned hours for lingering over afternoon coffee, reading in a courtyard, or wandering down unmapped lanes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
