import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Loader2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ItineraryModal } from '../modals/ItineraryModal';
import { AuthModal } from '../modals/AuthModal';
import { ContactModal } from '../modals/ContactModal';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export const LocationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const videoRef = useRef(null);

  const [currency, setCurrency] = useState('INR');
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [activeModalKey, setActiveModalKey] = useState(null);
  const [authModalMode, setAuthModalMode] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Complete Destination Database: All 28 States, 8 UTs & International
  const LOCATION_DATABASE = {
    // 28 STATES OF INDIA
    'andhra-pradesh': {
      name: 'Andhra Pradesh',
      region: 'Araku Valley & Visakhapatnam Coast, India',
      tagline: 'Eastern Ghats & Coromandel tides.',
      description: 'Coffee-scented cloud hills in Araku Valley, Borra Caves limestone stalactites, and pristine coastal promenades along the Bay of Bengal.',
      video: '/videos/goa.mp4',
      priceINR: 17999,
    },
    'arunachal-pradesh': {
      name: 'Arunachal Pradesh',
      region: 'Tawang & Ziro Valley, India',
      tagline: 'Land of the dawn-lit mountains.',
      description: 'High Himalayan monastic sanctuaries at 10,000 ft in Tawang, ancient pine-clad rice terraces of Ziro, and untouched subalpine biodiversity.',
      video: '/videos/kashmir.mp4',
      priceINR: 26999,
    },
    'assam': {
      name: 'Assam',
      region: 'Kaziranga & Majuli River Island, India',
      tagline: 'Brahmaputra mists & one-horned rhinos.',
      description: 'Dawn elephant safaris through tall grasslands of Kaziranga, neo-Vaishnavite Satras on Majuli, and aromatic heritage British tea bungalows in Jorhat.',
      video: '/videos/kerala.mp4',
      priceINR: 19999,
    },
    'bihar': {
      name: 'Bihar',
      region: 'Bodh Gaya & Nalanda Ruins, India',
      tagline: 'Sacred Bodhi whispers & ancient scholars.',
      description: 'Quiet meditative dawn circumambulations beneath the Mahabodhi Tree, crimson brick arches of the 5th-century Nalanda University, and Rajgir hot springs.',
      video: 'https://cdn.coverr.co/videos/coverr-flying-over-a-mountain-valley-5334/1080p.mp4',
      priceINR: 14999,
    },
    'chhattisgarh': {
      name: 'Chhattisgarh',
      region: 'Bastar & Chitrakote Waterfalls, India',
      tagline: 'Tribal metallurgy & roaring horseshoe falls.',
      description: 'The Niagara of India cascading across Indravati river canyon, centuries-old Dhokra lost-wax bronze crafts in Bastar, and sacred Sal forest trails.',
      video: '/videos/kerala.mp4',
      priceINR: 16999,
    },
    'goa': {
      name: 'Goa',
      region: 'Fontainhas & South Goa, India',
      tagline: 'Latin quarters & silent coves.',
      description: 'The yellow Portuguese villas of Fontainhas, spice estate feasts, and undiscovered southern beaches free of neon beach shacks.',
      video: '/videos/goa.mp4',
      priceINR: 14999,
    },
    'gujarat': {
      name: 'Gujarat',
      region: 'White Rann of Kutch & Gir Forest, India',
      tagline: 'Endless white salt flats & Asiatic lions.',
      description: 'Silver moonlight reflecting off the endless salt crust of the Great Rann, open-top safari tracks tracking Asiatic lions in Sasan Gir, and carved Stepwells of Patan.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      priceINR: 19999,
    },
    'haryana': {
      name: 'Haryana',
      region: 'Kurukshetra & Sultanpur Sanctuary, India',
      tagline: 'Epic Vedic soil & winter bird migratory wetlands.',
      description: 'Brahma Sarovar reflection ghats, heritage Haveli farms in Pinjore, and tranquil bird-watching hides hosting Siberian water birds at Sultanpur.',
      video: 'https://cdn.coverr.co/videos/coverr-flying-over-a-mountain-valley-5334/1080p.mp4',
      priceINR: 11999,
    },
    'himachal-pradesh': {
      name: 'Himachal Pradesh',
      region: 'Rohtang Pass & Spiti Valley, India',
      tagline: 'Wind-carved passes & starry skies.',
      description: 'Ascend snow-covered mountain passes, stay in wood-fired cedar stone cottages, and stargaze across unpolluted trans-Himalayan skies.',
      video: '/videos/manali.mp4',
      priceINR: 22999,
    },
    'manali': {
      name: 'Manali',
      region: 'Kullu Valley & Rohtang Pass, India',
      tagline: 'Wind-carved passes & stars.',
      description: 'Drive the 13,000-ft Rohtang alpine pass, stay in stone cottages near apple orchards, and stargaze across unpolluted trans-Himalayan skies.',
      video: '/videos/manali.mp4',
      priceINR: 22999,
    },
    'jharkhand': {
      name: 'Jharkhand',
      region: 'Netarhat Plateau & Betla Tiger Forest, India',
      tagline: 'Queen of Chotanagpur & Sal valleys.',
      description: 'Sunset lookouts over the Netarhat pine hills, dense Sal tree wildlife corridors of Betla National Park, and hidden cascades of Hundru and Jonha.',
      video: '/videos/kerala.mp4',
      priceINR: 15999,
    },
    'karnataka': {
      name: 'Karnataka',
      region: 'Hampi Ruins & Coorg Coffee Mist, India',
      tagline: 'Vijayanagara boulders & cardamom estates.',
      description: 'Golden hour cycling among boulder-strewn monolithic temples in Hampi, luxury plantation bungalows hidden inside Coorg rainforests, and regal Mysore palaces.',
      video: '/videos/kerala.mp4',
      priceINR: 18999,
    },
    'kerala': {
      name: 'Kerala',
      region: 'Alleppey & Munnar, India',
      tagline: 'God’s own slow backwaters.',
      description: 'Quiet backwater wooden Kettuvallam cruises, spice garden homestays in Munnar, and traditional Ayurvedic wellness therapies.',
      video: '/videos/kerala.mp4',
      priceINR: 21999,
    },
    'madhya-pradesh': {
      name: 'Madhya Pradesh',
      region: 'Khajuraho Temples & Bandhavgarh, India',
      tagline: 'Erotic stone poetry & tiger heartlands.',
      description: 'UNESCO World Heritage sandstone temple friezes of Khajuraho, dense bamboo forest safaris in Bandhavgarh, and royal marble rocks along the Narmada.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      priceINR: 20999,
    },
    'maharashtra': {
      name: 'Maharashtra',
      region: 'Western Ghats & Ajanta Ellora Caves, India',
      tagline: 'Basalt forts & rock-hewn monasteries.',
      description: 'Monsoon cloud valleys of Mahabaleshwar and Matheran, rock-cut 2nd-century Buddhist frescoes in Ajanta caves, and sunset coastal forts in Alibaug.',
      video: '/videos/goa.mp4',
      priceINR: 16999,
    },
    'manipur': {
      name: 'Manipur',
      region: 'Loktak Floating Lake & Imphal Valley, India',
      tagline: 'Jeweled emerald valley & circular floating Phumdis.',
      description: 'The world’s only floating national park on Loktak Lake, endangered Sangai deer sightings, and vibrant traditional handloom weaves in Imphal.',
      video: '/videos/kerala.mp4',
      priceINR: 21999,
    },
    'meghalaya': {
      name: 'Meghalaya',
      region: 'Cherrapunji & Dawki Crystal River, India',
      tagline: 'Abode of clouds & living root bridges.',
      description: 'Trek ancient bio-engineered rubber tree living root bridges in Nongriat, glide along glass-transparent emerald waters in Dawki, and explore cavernous limestone gorges.',
      video: '/videos/kashmir.mp4',
      priceINR: 23999,
    },
    'mizoram': {
      name: 'Mizoram',
      region: 'Blue Mountain & Aizawl Peaks, India',
      tagline: 'Rolling bamboo hills & mist-swathed peaks.',
      description: 'Panoramic mountain vistas from Phawngpui Blue Mountain, bamboo-woven village architecture, and serene quietude along the Indo-Myanmar frontier.',
      video: 'https://cdn.coverr.co/videos/coverr-flying-over-a-mountain-valley-5334/1080p.mp4',
      priceINR: 24999,
    },
    'nagaland': {
      name: 'Nagaland',
      region: 'Dzukou Valley & Kohima Ridges, India',
      tagline: 'Valley of flowers & legendary tribal chronicles.',
      description: 'Trek the otherworldly undulating green rolling mounds of Dzukou Valley, experience rich Angami heritage in Khonoma, and witness winter Hornbill celebrations.',
      video: '/videos/kashmir.mp4',
      priceINR: 25999,
    },
    'odisha': {
      name: 'Odisha',
      region: 'Puri Golden Beach & Konark Sun Temple, India',
      tagline: 'Black pagoda chariots & Chilika dolphin lagoons.',
      description: 'Sun salutations on golden sands in Puri, the monumental 13th-century stone chariot wheels of Konark, and Irrawaddy dolphin boat excursions on Chilika Lake.',
      video: '/videos/goa.mp4',
      priceINR: 15999,
    },
    'punjab': {
      name: 'Punjab',
      region: 'Amritsar & Golden Temple Sanctum, India',
      tagline: 'Golden nectar & warm mustard hospitality.',
      description: 'Night hymns reflecting over the Amrit Sarovar at Harmandir Sahib, brass-pot Punjabi culinary feasts in rural farmsteads, and patriotic retreat ceremonies at Wagah.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      priceINR: 13999,
    },
    'rajasthan': {
      name: 'Rajasthan',
      region: 'Udaipur Lake Palaces & Jaisalmer Fort, India',
      tagline: 'Gilded Havelis & Thar desert dusk.',
      description: 'Private candlelit boat charters on Lake Pichola, living yellow sandstone citadels in Jaisalmer, and luxury royal tent camps under starry desert skies.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      priceINR: 23999,
    },
    'sikkim': {
      name: 'Sikkim',
      region: 'Kanchenjunga Vistas & Gurudongmar Lake, India',
      tagline: 'Glacial mirrors & sacred Himalayan prayer flags.',
      description: 'Behold Kangchenjunga’s 28,000-ft summit from Pelling, sacred azure high-altitude waters at Gurudongmar, and peaceful monastery retreats in Rumtek.',
      video: '/videos/kashmir.mp4',
      priceINR: 25999,
    },
    'tamil-nadu': {
      name: 'Tamil Nadu',
      region: 'Meenakshi Amman & Nilgiri Toy Train, India',
      tagline: 'Dravidian gopuram poetry & cool tea ridges.',
      description: 'Towering multi-hued gopurams in Madurai and Thanjavur, steam toy train ascents into misty Ooty, and spiritual shoreline monuments in Mahabalipuram.',
      video: '/videos/kerala.mp4',
      priceINR: 18999,
    },
    'telangana': {
      name: 'Telangana',
      region: 'Golconda Fort & Charminar Salons, India',
      tagline: 'Deccani Nizam splendor & diamond bastions.',
      description: 'Acoustic marvels of Golconda Fort, pearl shopping along the heritage lanes of Charminar, and royal dining at Taj Falaknuma Palace.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      priceINR: 16999,
    },
    'tripura': {
      name: 'Tripura',
      region: 'Ujjayanta Water Palace & Unakoti Sculptures, India',
      tagline: 'Floating royal castles & rock-carved deities.',
      description: 'White classical domes of Ujjayanta Palace, the water-floating Neermahal citadel in Rudrasagar Lake, and colossal 7th-century rock carvings in Unakoti.',
      video: '/videos/kerala.mp4',
      priceINR: 19999,
    },
    'uttar-pradesh': {
      name: 'Uttar Pradesh',
      region: 'Varanasi Ganga Ghats & Taj Mahal, India',
      tagline: 'Eternal river aarti & white marble romance.',
      description: 'Dawn rowing past morning chants and burning incense along Varanasi ghats, sunrise reflections over the Taj Mahal in Agra, and spiritual Lucknow court culture.',
      video: 'https://cdn.coverr.co/videos/coverr-flying-over-a-mountain-valley-5334/1080p.mp4',
      priceINR: 15999,
    },
    'uttarakhand': {
      name: 'Uttarakhand',
      region: 'Rishikesh Holy Ganges & Valley of Flowers, India',
      tagline: 'Sacred riverbanks & alpine floral meadows.',
      description: 'Evening Ganga Aarti bells in Rishikesh, high Himalayan trekking through UNESCO Valley of Flowers, and quiet colonial pine trails in Landour and Nainital.',
      video: '/videos/manali.mp4',
      priceINR: 19999,
    },
    'west-bengal': {
      name: 'West Bengal',
      region: 'Darjeeling Tea Estates & Sundarbans Mangroves, India',
      tagline: 'Queen of the hills & Royal Bengal tidal creeks.',
      description: 'Sunrise over Kanchenjunga from Tiger Hill, riding the century-old Darjeeling Himalayan Toy Train, and boat safaris deep into the Sundarbans mangrove jungle.',
      video: '/videos/kerala.mp4',
      priceINR: 18999,
    },

    // 8 UNION TERRITORIES OF INDIA
    'andaman-nicobar': {
      name: 'Andaman & Nicobar Islands',
      region: 'Radhanagar Azure Beach & Coral Atolls, India',
      tagline: 'Untouched white sands & turquoise waters.',
      description: 'Walk powdery white sands at sunset on Havelock Island, scuba dive vibrant coral reefs at Neil Island, and explore historic cellular bastions in Port Blair.',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-turquoise-water-4432-large.mp4',
      priceINR: 29999,
    },
    'chandigarh': {
      name: 'Chandigarh',
      region: 'Le Corbusier Garden City, India',
      tagline: 'Modernist concrete poetry & flowering boulevards.',
      description: 'Masterpieces of modernist architecture by Le Corbusier, whimsical recycled stone sculptures at the Rock Garden, and quiet sunset walks around Sukhna Lake.',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-41551-large.mp4',
      priceINR: 12999,
    },
    'daman-diu': {
      name: 'Daman & Diu',
      region: 'Diu Portuguese Fortress & Coastal Cliffs, India',
      tagline: 'Portuguese ramparts & Arabian sea breezes.',
      description: 'Explore the 16th-century sea-facing Diu Fort, admire baroque stained glass in St. Paul’s Church, and relax on peaceful golden beaches free of crowds.',
      video: '/videos/goa.mp4',
      priceINR: 14999,
    },
    'delhi': {
      name: 'Delhi',
      region: 'Lutyens Citadels & Mughal Salons, India',
      tagline: 'Seven historical empires in one living metropolis.',
      description: 'Sunrise architecture walks through Humayun’s Tomb, fragrant spice alleys in Chandni Chowk, and tree-lined imperial avenues of Lutyens’ New Delhi.',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-41551-large.mp4',
      priceINR: 11999,
    },
    'kashmir': {
      name: 'Jammu & Kashmir',
      region: 'Pir Panjal & Dal Lake, India',
      tagline: 'Where mountains meet silence.',
      description: 'Snow-covered Pir Panjal peaks, hand-carved cedar houseboats on Dal Lake, saffron gardens of Pampore, and pine forests in Betaab Valley.',
      video: '/videos/kashmir.mp4',
      priceINR: 24999,
    },
    'ladakh': {
      name: 'Ladakh',
      region: 'Pangong Tso & Nubra Valley Dunes, India',
      tagline: 'High-altitude desert passes & celestial skies.',
      description: 'Drive the world’s highest motorable passes, behold the color-shifting azure waters of Pangong Tso, and ride double-humped Bactrian camels across Nubra sand dunes.',
      video: '/videos/manali.mp4',
      priceINR: 27999,
    },
    'lakshadweep': {
      name: 'Lakshadweep',
      region: 'Bangaram & Agatti Coral Lagoons, India',
      tagline: 'Private turquoise atolls & living coral gardens.',
      description: 'Secluded tropical island sanctuaries surrounded by crystal-clear coral lagoons, sea turtle encounters, and coconut palm beaches untouched by commercial tourism.',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
      priceINR: 34999,
    },
    'puducherry': {
      name: 'Puducherry',
      region: 'French Quarters & Auroville Seaside, India',
      tagline: 'Mustard colonial facades & seaside French bistros.',
      description: 'Stroll cobblestone streets of White Town with Bougainvillea-draped French villas, visit the peaceful spiritual sphere of Auroville, and cycle along the ocean promenade.',
      video: '/videos/goa.mp4',
      priceINR: 16999,
    },

    // INTERNATIONAL DESTINATIONS
    'bali': {
      name: 'Bali',
      region: 'Sidemen & Ubud, Indonesia',
      tagline: 'Emerald terraces & temple dusk.',
      description: 'Private open-air bamboo suites in Sidemen, ancient water blessings in Tirta Empul, and coastal sunsets at Uluwatu.',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-turquoise-water-4432-large.mp4',
      priceINR: 39999,
    },
    'paris': {
      name: 'Paris',
      region: 'Le Marais & Saint-Germain, France',
      tagline: 'Haute gastronomy & cobbled quietude.',
      description: 'Private salon tours through the Marais, vintage bookshops along the Seine at twilight, and morning pain au chocolat in Saint-Germain.',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-41551-large.mp4',
      priceINR: 65000,
    },
    'dubai': {
      name: 'Dubai',
      region: 'Rub al Khali & Creek, UAE',
      tagline: 'Arabian dunes after dark.',
      description: 'Private Bedouin dining deep in conservation reserves, classic Land Rover desert traverses, and quiet modern design along the Creek.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      priceINR: 49999,
    },
    'switzerland': {
      name: 'Switzerland',
      region: 'Interlaken & Zermatt, Swiss Alps',
      tagline: 'Glacier peaks & alpine railway journeys.',
      description: 'Panoramic mountain railways, historic chalets overlooking the Matterhorn, and fondue tastings in high alpine villages.',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      priceINR: 85000,
    },
    'beaches': {
      name: 'Beaches & Secret Coves',
      region: 'Goa, Bali & Coastal Seas',
      tagline: 'Untouched sands & silent ocean dusk.',
      description: 'Secluded beaches free of commercial crowds, private sunset catamarans, and coastal dining listening to lapping waves.',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
      priceINR: 14999,
    },
    'mountains': {
      name: 'Mountains & Alpine Passes',
      region: 'Rohtang Pass, Kashmir & Swiss Alps',
      tagline: 'High altitude vistas & starry skies.',
      description: 'Ascend snow-covered mountain passes, stay in wood-fired cedar stone cottages, and stargaze across unpolluted skies.',
      video: 'https://cdn.coverr.co/videos/coverr-flying-over-a-mountain-valley-5334/1080p.mp4',
      priceINR: 22999,
    },
  };

  const key = (slug || 'kashmir').toLowerCase();
  const currentLoc = LOCATION_DATABASE[key] || LOCATION_DATABASE['kashmir'];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.load();
      videoRef.current.play().catch((err) => console.warn(err.message));
    }

    const fetchLocationPackages = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/packages?destination=${key}`);
        if (res.success && res.data.length > 0) setPackages(res.data);
        else {
          const fallbackRes = await api.get('/packages');
          if (fallbackRes.success) setPackages(fallbackRes.data);
        }
      } catch (err) {
        console.warn(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLocationPackages();
  }, [key]);

  const formatPrice = (inr) => {
    if (currency === 'INR') return `₹${inr.toLocaleString('en-IN')}`;
    return `$${Math.round(inr / 83.5).toLocaleString('en-US')}`;
  };

  return (
    <div className="bg-parchment text-ink min-h-screen">
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        wishlistCount={wishlistItems.size}
        openAuthModal={(mode) => setAuthModalMode(mode)}
        openContactModal={() => setContactModalOpen(true)}
      />

      {/* DEDICATED LOCATION HERO WITH VIDEO */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-28 pb-8 px-6 md:px-12 bg-ink overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-ink">
          <video
            key={currentLoc.video}
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center scale-105 opacity-90"
          >
            <source src={currentLoc.video} type="video/mp4" />
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Top-Left Navigation: RETURN */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-4 pb-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-amber-200 hover:text-white transition-colors font-mono font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return</span>
          </Link>
        </div>

        {/* Centered Editorial Title Content & Transparent Button */}
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center my-auto pt-4 pb-8">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-parchment font-light leading-tight">
            {currentLoc.name}: <span className="italic font-normal font-display text-amber-100">{currentLoc.tagline}</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-parchment/80 max-w-2xl mx-auto font-light leading-relaxed">
            {currentLoc.description}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setActiveModalKey(key)}
              className="px-8 py-3.5 bg-transparent border border-white/50 hover:border-amber-200 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-medium transition-all duration-300 backdrop-blur-sm"
            >
              Reserve {currentLoc.name} Expedition
            </button>
          </div>
        </div>

        {/* Location At Right Bottom */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-end pb-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/40 backdrop-blur-md border border-white/15 text-amber-200/90 text-[11px] md:text-xs uppercase font-mono tracking-wider rounded">
            <MapPin className="w-3.5 h-3.5 text-terracotta" />
            <span>{currentLoc.region}</span>
          </div>
        </div>
      </section>

      {/* PACKAGES FOR THIS LOCATION */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end border-b border-sandDark pb-6 mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-terracotta font-semibold block mb-1">Curated Itineraries</span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink font-normal">{currentLoc.name} Packages</h2>
          </div>
          <div className="text-xs text-taupe font-mono">
            Rate: <span className="font-bold text-ink">{formatPrice(currentLoc.priceINR)}</span> / traveler
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-terracotta animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg._id || pkg.slug} className="bg-sand border border-sandDark p-6 flex flex-col justify-between">
                <div>
                  <img src={(pkg.images && pkg.images[0]) || 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=800&q=80'} alt={pkg.title} className="w-full aspect-[4/3] object-cover mb-4" />
                  <span className="text-[10px] uppercase tracking-widest text-terracotta font-semibold">{pkg.category}</span>
                  <h3 className="font-serif text-2xl text-ink font-normal mb-2">{pkg.title}</h3>
                  <p className="text-xs text-taupe leading-relaxed line-clamp-3">{pkg.description}</p>
                </div>
                <div className="pt-4 border-t border-sandDark flex justify-between items-center mt-4">
                  <span className="font-serif text-xl font-medium">{formatPrice(pkg.price)}</span>
                  <button onClick={() => setActiveModalKey(pkg.destinationSlug || pkg.slug || key)} className="px-3 py-2 bg-ink text-parchment text-[11px] uppercase tracking-widest">
                    View Itinerary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer openContactModal={() => setContactModalOpen(true)} onQuickFilter={() => navigate('/')} />

      {activeModalKey && <ItineraryModal itineraryKey={activeModalKey} onClose={() => setActiveModalKey(null)} currency={currency} openAuthModal={(m) => setAuthModalMode(m)} />}
      {authModalMode && <AuthModal initialMode={authModalMode} onClose={() => setAuthModalMode(null)} />}
      {contactModalOpen && <ContactModal onClose={() => setContactModalOpen(false)} />}
    </div>
  );
};