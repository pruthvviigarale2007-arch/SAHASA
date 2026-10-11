import React, { useState } from 'react';
import { X, Calendar, Users, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export const ItineraryModal = ({ itineraryKey, onClose, currency, openAuthModal }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [bookingMode, setBookingMode] = useState(false);
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Editorial Itineraries Static Data fallback store matching exact original JS dataset
  const ITINERARIES = {
    kashmir: {
      id: 'kashmir-escape',
      title: 'Kashmir: Where mountains meet silence.',
      region: 'Pir Panjal & Dal Lake, Kashmir',
      pace: '6 Days / 5 Nights',
      style: 'Slow Alpine',
      priceINR: 24999,
      priceUSD: 299,
      image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=1200&q=80',
      desc: 'Glide along silent waters of Dal Lake at first light, breathe the dry pine air of Betaab Valley, and sleep aboard a hand-carved deodar cedar houseboat with evening Kashmiri samovar tea.',
      days: [
        { day: 'Day 01', title: 'Arrival in Srinagar & Evening Shikara Sunset', text: 'Private greeting at airport, transfer to historic wooden houseboat, welcome cup of saffron kahwa.' },
        { day: 'Day 02', title: 'Floating Market & Old City Craft Quarter', text: 'Dawn shikara through water alleyways followed by visits to Pashmina and walnut-wood artisan workshops.' },
        { day: 'Day 03', title: 'Pahalgam Valley & Betaab Pine Trails', text: 'Chauffeured drive through saffron gardens of Pampore toward cascading Lidder River.' },
        { day: 'Day 04', title: 'Aru Valley Meadows & Village Walk', text: 'A gentle walking day through Gujar alpine hamlets with picnic lunch beneath Himalayan peaks.' },
        { day: 'Day 05', title: 'Return to Srinagar & Sunset at Pari Mahal', text: 'Terraced Mughal garden vistas overlooking sunset over Kashmir valley.' },
      ],
    },
    bali: {
      id: 'bali-slow-travel',
      title: 'Bali: Emerald terraces & temple dusk.',
      region: 'Sidemen & Ubud, Indonesia',
      pace: '6 Days / 5 Nights',
      style: 'Slow Living',
      priceINR: 39999,
      priceUSD: 480,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      desc: 'A journey dedicated to quiet contemplation away from southern surf hubs: open-air bamboo suites facing Sidemen rice terraces, sacred water purification, and quiet temple evenings.',
      days: [
        { day: 'Day 01', title: 'Arrival & Retreat to Sidemen Valley', text: 'Check into bamboo hillside villa with infinity view of Mount Agung.' },
        { day: 'Day 02', title: 'Rice Terrace Walk & Herbal Workshop', text: 'Morning trail with local botanist learning traditional Jamu herbal preparations.' },
        { day: 'Day 03', title: 'Water Cleansing Ritual (Melukat)', text: 'An intimate temple blessing conducted in holy spring waters by a village priest.' },
        { day: 'Day 04', title: 'Kintamani Highlands & Volcanic Coffee', text: 'Drive along caldera rim with artisanal coffee tasting from single-estate roasters.' },
        { day: 'Day 05', title: 'Organic Feast & Twilight Gamelan', text: 'Seven-course Balinese feast made with ingredients picked the same morning.' },
      ],
    },
    paris: {
      id: 'paris-cultural-salons',
      title: 'Paris: Haute gastronomy & cobbled quietude.',
      region: 'Le Marais & Saint-Germain, Paris',
      pace: '5 Days / 4 Nights',
      style: 'Haute Cultural',
      priceINR: 65000,
      priceUSD: 780,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      desc: 'Discover the French capital through private salon discussions, quiet courtyard galleries in the Marais, evening river walks, and intimate bistros.',
      days: [
        { day: 'Day 01', title: 'Arrival in Place des Vosges & Welcome Aperitif', text: 'Boutique hotel check-in in 4th arrondissement, wine tasting with sommelier.' },
        { day: 'Day 02', title: 'After-Hours Museum Access & Private Gallery Trail', text: 'Quiet hours entry to private collections and stroll along bouquinistes of Seine.' },
        { day: 'Day 03', title: 'Artisan Fromagerie & Natural Wine Tasting', text: 'Cellar tastings in Latin Quarter followed by afternoon coffee in Palais-Royal gardens.' },
        { day: 'Day 04', title: 'Montmartre Hidden Vineyards & Jazz', text: 'Wander cobblestones beyond Sacré-Cœur, ending in historic underground jazz vault.' },
      ],
    },
    goa: {
      id: 'goa-unplugged',
      title: 'Goa: Latin quarters & silent coves.',
      region: 'Fontainhas & South Goa',
      pace: '4 Days / 3 Nights',
      style: 'Coastal Heritage',
      priceINR: 14999,
      priceUSD: 180,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      desc: 'Experience the historic soul of Portuguese Goa: ochre houses in Fontainhas, slow ferry crossings, secluded southern sands, and spice plantation luncheons.',
      days: [
        { day: 'Day 01', title: 'Check-in to Fontainhas Heritage Manor', text: 'Historic villa stay with oyster-shell windows, evening stroll through quiet heritage lanes.' },
        { day: 'Day 02', title: 'Old Goa Church Architecture & Spice Estate Feasting', text: 'Exploring UNESCO basilicas with an architect escort followed by home-cooked Goan curry.' },
        { day: 'Day 03', title: 'South Goa Secret Cove & Sunset Catamaran', text: 'Relax on untouched beaches of Cola, sailing into dusk on a catamaran.' },
      ],
    },
    manali: {
      id: 'manali-alpine-pass',
      title: 'Manali: Wind-carved passes & stars.',
      region: 'Kullu Valley & Rohtang Pass, India',
      pace: '5 Days / 4 Nights',
      style: 'High Altitude',
      priceINR: 22999,
      priceUSD: 275,
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      desc: 'High alpine meadows, stone architecture in Old Manali, river-valley orchards, and an ascent through Rohtang pass toward Lahaul.',
      days: [
        { day: 'Day 01', title: 'Old Manali Riverside Stone Cottage', text: 'Welcome herbal cedar tea with mountain views over Beas river.' },
        { day: 'Day 02', title: 'Jogini Waterfall Hike & Cedar Trails', text: 'Gentle trek through apple orchards and pine woods to sacred alpine falls.' },
        { day: 'Day 03', title: 'Rohtang Pass (13,058 ft) & Glacier Panorama', text: 'Traverse into snow-line with high altitude tea at pass summit.' },
        { day: 'Day 04', title: 'Stargazing at Solang Valley', text: 'Clear-sky astronomy session around an evening wood fire.' },
      ],
    },
    dubai: {
      id: 'dubai-after-dark',
      title: 'Dubai: Arabian dunes after dark.',
      region: 'Dubai Conservation Reserve, UAE',
      pace: '5 Days / 4 Nights',
      style: 'Desert Solitude',
      priceINR: 49999,
      priceUSD: 599,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      desc: 'A thoughtful contrast between futuristic architectural wonders and the ancient silence of the Rub’ al Khali desert under starry skies.',
      days: [
        { day: 'Day 01', title: 'Creek Heritage District & Dhow Arrival', text: 'Check into design suite overlooking Old Dubai Creek with fragrant spice souk walk.' },
        { day: 'Day 02', title: 'Dubai Design District & Contemporary Art', text: 'Private gallery walk through Alserkal Avenue followed by fine Emirati lunch.' },
        { day: 'Day 03', title: 'Conservation Reserve & Vintage Land Rover Trek', text: 'Venture deep into protected red sand dunes in vintage 1950s 4x4 vehicles.' },
        { day: 'Day 04', title: 'Bedouin Feast & Astronomer Stargazing', text: 'Dinner beneath wool canopy followed by telescope viewing of deep space.' },
      ],
    },
  };

  const key = (itineraryKey || 'kashmir').toLowerCase();
  const itinerary = ITINERARIES[key] || ITINERARIES['kashmir'];

  const displayPrice =
    currency === 'INR'
      ? `₹${itinerary.priceINR.toLocaleString('en-IN')}`
      : `$${itinerary.priceUSD.toLocaleString('en-US')}`;

  const calculatedTotalINR = itinerary.priceINR * Math.max(1, travelers);
  const calculatedTotal =
    currency === 'INR'
      ? `₹${calculatedTotalINR.toLocaleString('en-IN')}`
      : `$${Math.round(calculatedTotalINR / 83.5).toLocaleString('en-US')}`;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Authentication Required', 'Please sign in to complete your booking.');
      openAuthModal('login');
      return;
    }

    if (!travelDate) {
      showToast('Missing Field', 'Please select your preferred travel date.');
      return;
    }

    setIsSubmitting(true);
    try {
      // First find package ID from backend API
      const pkgsRes = await api.get('/packages');
      const foundPkg = pkgsRes.data.find(
        (p) => p.slug.includes(key) || p.title.toLowerCase().includes(key)
      );

      const packageId = foundPkg ? foundPkg._id : pkgsRes.data[0]._id;

      const payload = {
        packageId,
        travelDate,
        numberOfTravelers: Number(travelers),
        adults: Number(adults),
        children: Number(children),
        specialRequests,
        contactDetails: {
          name: user.name,
          email: user.email,
          phone: user.phone || '',
        },
      };

      const res = await api.post('/bookings', payload);
      if (res.success) {
        setBookingSuccess(res.data);
        showToast('Booking Request Received', `Confirmation generated for ${itinerary.title}`);
      }
    } catch (err) {
      showToast('Booking Failed', err.message || 'Could not process booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="itinerary-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-parchment border border-sandDark shadow-2xl my-8 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-ink text-parchment hover:bg-terracotta flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Hero Header */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-inkSoft">
          <img src={itinerary.image} alt={itinerary.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-parchment">
            <div className="text-[10px] tracking-widest uppercase font-mono text-amber-200 mb-1">
              {itinerary.region}
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
              {itinerary.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[55vh] overflow-y-auto">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 py-4 px-5 bg-sand border border-sandDark text-center">
            <div>
              <div className="text-[10px] uppercase tracking-wider font-mono text-taupe">Pace</div>
              <div className="font-serif text-lg text-ink font-medium">{itinerary.pace}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-mono text-taupe">Atmosphere</div>
              <div className="font-serif text-lg text-ink font-medium">{itinerary.style}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-mono text-taupe">Per Person</div>
              <div className="font-serif text-lg text-terracotta font-medium">{displayPrice}</div>
            </div>
          </div>

          {bookingSuccess ? (
            <div className="p-6 bg-sand border border-terracotta text-center space-y-4">
              <div className="w-12 h-12 bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-2xl text-ink">Expedition Confirmed</h4>
              <p className="text-xs text-taupe-dark max-w-md mx-auto">
                Your booking request for <span className="font-semibold text-ink">{itinerary.title}</span> has been logged with reference ID <span className="font-mono text-terracotta">#{bookingSuccess._id.slice(-6)}</span>.
              </p>
              <div className="p-4 bg-parchment border border-sandDark text-left text-xs font-mono space-y-1">
                <div>Total Server Amount: <span className="font-bold text-ink">₹{bookingSuccess.totalAmount.toLocaleString()}</span></div>
                <div>Travel Date: <span className="font-bold text-ink">{new Date(bookingSuccess.travelDate).toLocaleDateString()}</span></div>
                <div>Status: <span className="uppercase text-amber-600 font-bold">{bookingSuccess.status}</span></div>
              </div>
            </div>
          ) : bookingMode ? (
            /* Booking Form Step */
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-terracotta font-semibold pb-2 border-b border-sandDark">
                <ShieldCheck className="w-4 h-4" />
                <span>Reserve Expedition — Server Price Calculated</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-sand border border-sandDark px-3 py-2 text-xs text-ink focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={travelers}
                    onChange={(e) => {
                      const val = Math.max(1, parseInt(e.target.value) || 1);
                      setTravelers(val);
                      setAdults(val);
                    }}
                    className="w-full bg-sand border border-sandDark px-3 py-2 text-xs text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-taupe mb-1">
                  Special Requests / Dietary Notes
                </label>
                <textarea
                  rows="2"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Vegetarian meals, quiet room away from street, anniversary setup..."
                  className="w-full bg-sand border border-sandDark p-3 text-xs text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div className="p-4 bg-sand border border-sandDark flex items-center justify-between text-xs">
                <div>
                  <span className="text-taupe block font-mono text-[10px]">Server Total Rate:</span>
                  <span className="font-serif text-2xl font-bold text-ink">{calculatedTotal}</span>
                </div>
                <div className="text-right text-[10px] text-taupe">
                  Includes all taxes, private guide & boutique stay
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setBookingMode(false)}
                  className="px-4 py-2 border border-sandDark text-xs uppercase tracking-widest text-ink hover:bg-sand"
                >
                  Back to Itinerary
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-terracotta hover:bg-terracotta-hover text-white text-xs uppercase tracking-widest font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Narrative Description */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-mono text-taupe mb-2">
                  Editorial Overview
                </h4>
                <p className="text-sm text-taupe-dark font-light leading-relaxed">
                  {itinerary.desc}
                </p>
              </div>

              {/* Day by Day Itinerary */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-mono text-taupe mb-3">
                  Day-by-Day Flow
                </h4>
                <div className="space-y-4 border-l border-sandDark pl-4 ml-1">
                  {itinerary.days.map((d, idx) => (
                    <div key={idx} className="relative pl-3">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-terracotta font-semibold">
                        {d.day}
                      </div>
                      <div className="font-serif text-lg text-ink font-normal">{d.title}</div>
                      <p className="text-xs text-taupe-dark mt-0.5 leading-relaxed font-light">
                        {d.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's included note */}
              <div className="p-4 bg-sand border border-sandDark text-xs text-taupe-dark">
                <span className="font-semibold text-ink block mb-1">The Wanderly Assurance:</span>
                Includes boutique accommodation, verified resident guide, ground chauffeurs, daily artisanal breakfast, and entry permissions.
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-sand border-t border-sandDark flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-taupe">
            Flexible booking: Reserve with deposit; full refund up to 14 days prior.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-sandDark text-ink text-xs uppercase tracking-widest hover:bg-parchment transition-colors font-medium"
            >
              Close
            </button>
            {!bookingSuccess && !bookingMode && (
              <button
                onClick={() => setBookingMode(true)}
                className="px-6 py-2.5 bg-terracotta hover:bg-terracotta-hover text-parchment text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Request Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
