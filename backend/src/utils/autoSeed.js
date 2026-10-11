import User from '../models/User.js';
import Destination from '../models/Destination.js';
import Package from '../models/Package.js';
import Hotspot from '../models/Hotspot.js';
import Review from '../models/Review.js';
import Newsletter from '../models/Newsletter.js';
import Contact from '../models/Contact.js';
import Booking from '../models/Booking.js';

export const autoSeedIfEmpty = async () => {
  try {
    const destCount = await Destination.countDocuments();
    if (destCount > 0) {
      console.log(`ℹ️ Database already populated (${destCount} destinations). Skipping auto-seed.`);
      return;
    }

    console.log('🌱 Empty database detected. Auto-seeding initial travel dataset...');

    const adminUser = await User.create({
      name: 'Wanderly Concierge Admin',
      email: 'admin@wanderly.com',
      password: 'Admin@123456',
      role: 'admin',
      phone: '+91 9876543210',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    });

    const normalUser = await User.create({
      name: 'Elena Rostov',
      email: 'traveler@wanderly.com',
      password: 'User@123456',
      role: 'user',
      phone: '+91 9812345678',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    });

    const destinationsData = [
      {
        name: 'Kashmir',
        slug: 'kashmir',
        country: 'India',
        state: 'Jammu & Kashmir',
        description: 'Pir Panjal snow peaks, hand-carved cedar houseboats on Dal Lake, saffron gardens of Pampore, and pine forests in Betaab Valley.',
        shortDescription: 'Where mountains meet silence.',
        images: ['https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=1200&q=80'],
        bestTimeToVisit: 'April – October',
        averageCost: 24999,
        activities: ['Shikara Rides', 'Houseboat Stay', 'Alpine Trekking', 'Saffron Harvesting'],
        category: 'Slow Alpine',
        featured: true,
        trending: true,
      },
      {
        name: 'Bali',
        slug: 'bali',
        country: 'Indonesia',
        state: 'Bali Province',
        description: 'Private open-air bamboo suites in Sidemen, sacred water blessings in Tirta Empul, and quiet coastal sunsets at Uluwatu.',
        shortDescription: 'Emerald terraces & temple dusk.',
        images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'],
        bestTimeToVisit: 'April – October',
        averageCost: 39999,
        activities: ['Water Temple Blessing', 'Rice Terrace Hikes', 'Coffee Roasting', 'Yoga Retreats'],
        category: 'Slow Living',
        featured: true,
        trending: true,
      },
      {
        name: 'Paris',
        slug: 'paris',
        country: 'France',
        state: 'Île-de-France',
        description: 'Private salon tours through the Marais, vintage bookshops along the Seine at twilight, and morning pastries in Saint-Germain.',
        shortDescription: 'Haute gastronomy & cobbled quietude.',
        images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'],
        bestTimeToVisit: 'May – October',
        averageCost: 65000,
        activities: ['Private Salon Tours', 'Sommelier Cellar Tastings', 'Artisan Fromagerie', 'Museum Night Walks'],
        category: 'Haute Cultural',
        featured: true,
        trending: false,
      },
      {
        name: 'Goa',
        slug: 'goa',
        country: 'India',
        state: 'Goa',
        description: 'Restored 18th-century Portuguese villas in Assagao, Fontainhas art studios, and private sunset boat rides down Chapora river.',
        shortDescription: 'Latin quarters & silent coves.',
        images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'],
        bestTimeToVisit: 'November – February',
        averageCost: 14999,
        activities: ['Heritage Manor Stays', 'Organic Spice Estate Feast', 'Catamaran Sailing'],
        category: 'Coastal Heritage',
        featured: true,
        trending: true,
      },
      {
        name: 'Manali',
        slug: 'manali',
        country: 'India',
        state: 'Himachal Pradesh',
        description: 'Drive the 13,000-ft Rohtang alpine pass, stay in stone cottages near apple orchards, and stargaze across unpolluted trans-Himalayan skies.',
        shortDescription: 'Wind-carved passes & stars.',
        images: ['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'],
        bestTimeToVisit: 'March – June, October – December',
        averageCost: 22999,
        activities: ['Alpine Pass Drive', 'Waterfall Treks', 'Astronomy Stargazing'],
        category: 'High Altitude',
        featured: true,
        trending: false,
      },
      {
        name: 'Dubai',
        slug: 'dubai',
        country: 'United Arab Emirates',
        state: 'Dubai',
        description: 'Private Bedouin dining deep in conservation reserves, classic Land Rover desert traverses, and quiet modern design along the Creek.',
        shortDescription: 'Arabian dunes after dark.',
        images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'],
        bestTimeToVisit: 'November – March',
        averageCost: 49999,
        activities: ['Desert Stargazing', '1950s Land Rover Excursion', 'Alserkal Avenue Art Walk'],
        category: 'Desert Solitude',
        featured: true,
        trending: true,
      },
      {
        name: 'Singapore',
        slug: 'singapore',
        country: 'Singapore',
        state: 'Central Region',
        description: 'Heritage Peranakan shophouse walking trails, serene botanical glasshouses, and Michelin Michelin-starred hawker gastronomy.',
        shortDescription: 'Garden city architecture & street feasts.',
        images: ['https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80'],
        bestTimeToVisit: 'Year-round',
        averageCost: 55000,
        activities: ['Botanic Gardens Walk', 'Hawker Street Food Trail', 'Skyline Evening Cruise'],
        category: 'Modern Oasis',
        featured: false,
        trending: false,
      },
      {
        name: 'Kerala',
        slug: 'kerala',
        country: 'India',
        state: 'Kerala',
        description: 'Quiet backwater wooden Kettuvallam cruises, spice garden homestays in Munnar, and traditional Ayurvedic wellness therapies.',
        shortDescription: 'God’s own slow backwaters.',
        images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80'],
        bestTimeToVisit: 'September – March',
        averageCost: 21999,
        activities: ['Kettuvallam Cruise', 'Ayurvedic Retreat', 'Tea Estate Walk'],
        category: 'Slow Water',
        featured: false,
        trending: true,
      },
      {
        name: 'Rajasthan',
        slug: 'rajasthan',
        country: 'India',
        state: 'Rajasthan',
        description: 'Intimate stays in restored Haveli courtyards of Udaipur and Jodhpur, desert stargazing in Jaisalmer, and fort sunset teas.',
        shortDescription: 'Golden fortresses & courtyard silence.',
        images: ['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'],
        bestTimeToVisit: 'October – March',
        averageCost: 32000,
        activities: ['Haveli Heritage Stays', 'Fort Sunset Tea', 'Dune Camping'],
        category: 'Royal Heritage',
        featured: false,
        trending: true,
      },
      {
        name: 'Thailand',
        slug: 'thailand',
        country: 'Thailand',
        state: 'Chiang Mai & Koh Samui',
        description: 'Misty mountain temple retreats in Chiang Mai combined with pristine secluded beach hideaways in the Gulf of Thailand.',
        shortDescription: 'Lanna sanctuaries & quiet seas.',
        images: ['https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80'],
        bestTimeToVisit: 'November – April',
        averageCost: 42000,
        activities: ['Lanna Temple Walks', 'Organic Cooking Class', 'Catamaran Island Hopping'],
        category: 'Tropical Sanctuary',
        featured: false,
        trending: false,
      },
    ];

    const createdDestinations = await Destination.insertMany(destinationsData);
    const destMap = {};
    createdDestinations.forEach((d) => {
      destMap[d.slug] = d._id;
    });

    const packagesData = [
      {
        title: 'Kashmir Escape',
        slug: 'kashmir-escape',
        destination: destMap['kashmir'],
        destinationSlug: 'kashmir',
        description: 'Wake to dawn prayer bells across Dal Lake in a century-old carved cedar houseboat. Includes private shikara rides, Pampore saffron gardens, and Betaab Valley trails.',
        duration: '5 Days / 4 Nights',
        nights: 4,
        price: 24999,
        priceUSD: 299,
        originalPrice: 29999,
        discount: 16,
        images: ['https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=1200&q=80'],
        itinerary: [
          { day: 'Day 01', title: 'Arrival in Srinagar & Evening Shikara Sunset', text: 'Private greeting at airport, transfer to historic wooden houseboat, welcome cup of saffron kahwa.' },
          { day: 'Day 02', title: 'Floating Market & Old City Craft Quarter', text: 'Dawn shikara through water alleyways followed by visits to Pashmina and walnut-wood workshops.' },
          { day: 'Day 03', title: 'Pahalgam Valley & Betaab Pine Trails', text: 'Chauffeured drive through saffron gardens of Pampore toward cascading Lidder River.' },
          { day: 'Day 04', title: 'Aru Valley Meadows & Village Walk', text: 'A gentle walking day through Gujar alpine hamlets with picnic lunch beneath Himalayan peaks.' },
          { day: 'Day 05', title: 'Return to Srinagar & Sunset at Pari Mahal', text: 'Terraced Mughal garden vistas overlooking sunset over Kashmir valley.' },
        ],
        inclusions: ['Heritage Houseboat & 5★ Stay', 'Private Shikara Sunrise Tea', 'All Ground Chauffeurs'],
        exclusions: ['Airfare', 'Personal Shopping', 'Insurance'],
        category: 'Slow Alpine',
        rating: 4.9,
        reviewCount: 28,
        featured: true,
        availability: true,
      },
      {
        title: 'Goa Unplugged',
        slug: 'goa-unplugged',
        destination: destMap['goa'],
        destinationSlug: 'goa',
        description: 'Step away from commercial beaches. Rest in a restored 18th-century Portuguese estate in Assagao, stroll Fontainhas art studios, and sail down Chapora river.',
        duration: '4 Days / 3 Nights',
        nights: 3,
        price: 14999,
        priceUSD: 180,
        originalPrice: 18999,
        discount: 21,
        images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'],
        itinerary: [
          { day: 'Day 01', title: 'Check-in to Fontainhas Heritage Manor', text: 'Historic villa stay with oyster-shell windows, evening stroll through quiet heritage lanes.' },
          { day: 'Day 02', title: 'Old Goa Church Architecture & Spice Feasting', text: 'Exploring UNESCO basilicas with an architect escort followed by home-cooked Goan curry.' },
          { day: 'Day 03', title: 'South Goa Secret Cove & Sunset Catamaran', text: 'Relax on untouched beaches of Cola, sailing into dusk on a catamaran.' },
          { day: 'Day 04', title: 'Artisan Cafe Morning & Departure', text: 'Farewell breakfast at Assagao courtyard cafe.' },
        ],
        inclusions: ['Restored Boutique Villa Stay', 'Organic Spice Estate Luncheon', 'Private Sunset Catamaran'],
        exclusions: ['Airfare', 'Alcoholic Beverages'],
        category: 'Coastal Heritage',
        rating: 4.8,
        reviewCount: 34,
        featured: true,
        availability: true,
      },
      {
        title: 'Dubai After Dark',
        slug: 'dubai-after-dark',
        destination: destMap['dubai'],
        destinationSlug: 'dubai',
        description: 'The stark beauty of the Arabian Desert juxtaposed with hyper-refined hospitality. Includes astronomer-guided stargazing in a private desert reserve and dhow cruise.',
        duration: '5 Days / 4 Nights',
        nights: 4,
        price: 49999,
        priceUSD: 599,
        originalPrice: 59999,
        discount: 16,
        images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'],
        itinerary: [
          { day: 'Day 01', title: 'Creek Heritage District & Dhow Arrival', text: 'Check into design suite overlooking Old Dubai Creek with fragrant spice souk walk.' },
          { day: 'Day 02', title: 'Dubai Design District & Contemporary Art', text: 'Private gallery walk through Alserkal Avenue followed by fine Emirati lunch.' },
          { day: 'Day 03', title: 'Conservation Reserve & Vintage Land Rover Trek', text: 'Venture deep into protected red sand dunes in vintage 1950s 4x4 vehicles.' },
          { day: 'Day 04', title: 'Bedouin Feast & Astronomer Stargazing', text: 'Dinner beneath wool canopy followed by telescope viewing of deep space.' },
          { day: 'Day 05', title: 'Morning Spa & Departure', text: 'Relaxing wellness treatment before airport transfer.' },
        ],
        inclusions: ['Conservation Reserve Access', '1950s Land Rover Excursion', 'Design District Gallery Pass'],
        exclusions: ['Flight Ticket', 'Personal Expenses'],
        category: 'Desert Solitude',
        rating: 4.95,
        reviewCount: 19,
        featured: true,
        availability: true,
      },
      {
        title: 'Bali Slow Travel',
        slug: 'bali-slow-travel',
        destination: destMap['bali'],
        destinationSlug: 'bali',
        description: 'Slow mornings looking out at Sidemen valley. Experience artisan coffee roasting in Kintamani, a secluded melukat purification ritual, and quiet cliffside yoga.',
        duration: '6 Days / 5 Nights',
        nights: 5,
        price: 39999,
        priceUSD: 480,
        originalPrice: 48999,
        discount: 18,
        images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'],
        itinerary: [
          { day: 'Day 01', title: 'Arrival & Retreat to Sidemen Valley', text: 'Check into bamboo hillside villa with infinity view of Mount Agung.' },
          { day: 'Day 02', title: 'Rice Terrace Walk & Herbal Workshop', text: 'Morning trail with local botanist learning traditional Jamu herbal preparations.' },
          { day: 'Day 03', title: 'Water Cleansing Ritual (Melukat)', text: 'An intimate temple blessing conducted in holy spring waters by a village priest.' },
          { day: 'Day 04', title: 'Kintamani Highlands & Volcanic Coffee', text: 'Drive along caldera rim with artisanal coffee tasting from single-estate roasters.' },
          { day: 'Day 05', title: 'Organic Feast & Twilight Gamelan', text: 'Seven-course Balinese feast made with ingredients picked the same morning.' },
          { day: 'Day 06', title: 'Morning Yoga & Departure', text: 'Gentle sunrise stretch and private transfer.' },
        ],
        inclusions: ['Handcrafted Eco-Lodge Suites', 'Private Water Temple Ritual', 'Daily Organic Farm Dining'],
        exclusions: ['Airfare', 'Visa Fees'],
        category: 'Slow Living',
        rating: 5.0,
        reviewCount: 42,
        featured: true,
        availability: true,
      },
    ];

    await Package.insertMany(packagesData);

    const hotspotsData = [
      {
        name: 'Sunrise Shikara through floating vegetable markets',
        destination: destMap['kashmir'],
        destinationName: 'Dal Lake, Kashmir',
        location: '34.0837° N, 74.7973° E',
        description: 'Before tourists awaken, the lake is like liquid mercury. Hawkers trade lotus stems and fresh mint directly boat-to-boat in whispered tones.',
        image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=800&q=80',
        category: 'Dawn Routine • Dal Lake',
        rating: 5.0,
        featured: true,
        bestTime: '05:45 AM, April – October',
      },
      {
        name: 'Caldera breeze on the cliffside of Oia',
        destination: destMap['paris'],
        destinationName: 'Aegean Sea',
        location: '36.4618° N, 25.3753° E',
        description: 'The silence that falls over the caldera as the sun dips below the volcanic rim is heavier than any applause. Whitewashed stone still warm underfoot.',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
        category: 'Aegean Dusk • Oia Caldera',
        rating: 4.9,
        featured: true,
        bestTime: '19:30 PM, May or September',
      },
      {
        name: 'Incense and jungle damp in Ubud ravine',
        destination: destMap['bali'],
        destinationName: 'Sidemen & Ubud',
        location: '8.5069° S, 115.2625° E',
        description: 'The scent of burning sandalwood mixing with wet moss. An encounter with a temple custodian setting out canang sari offerings at first light.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
        category: 'Morning Mist • Sacred Forest',
        rating: 5.0,
        featured: true,
        bestTime: '06:30 AM, Year-round',
      },
      {
        name: 'Stargazing in absolute red-dune quietude',
        destination: destMap['dubai'],
        destinationName: 'Rub’ al Khali Desert',
        location: '22.8456° N, 55.4072° E',
        description: 'Sixty miles from any city lights, you hear only your own breath. The Milky Way hangs low enough that you can trace Orion’s belt without a glass.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
        category: 'Desert Night • Conservation Reserve',
        rating: 4.95,
        featured: true,
        bestTime: '22:00 PM, November – February',
      },
    ];

    await Hotspot.insertMany(hotspotsData);

    const kashmirPkg = await Package.findOne({ slug: 'kashmir-escape' });
    const baliPkg = await Package.findOne({ slug: 'bali-slow-travel' });
    const dubaiPkg = await Package.findOne({ slug: 'dubai-after-dark' });

    const reviewsData = [
      {
        user: normalUser._id,
        userName: 'Elena & Viktor Rostov',
        package: kashmirPkg._id,
        destination: kashmirPkg.destination,
        rating: 5,
        comment: 'We spent three days without once looking at our phones. The morning kahwa prepared by Ghulam on the houseboat cedar deck, while the water gently lapped the wood, felt like an older, gentler century.',
        dispatchNumber: 'Dispatch #142 • Kashmir',
        travelDateText: 'Traveled May 2024',
        approved: true,
      },
      {
        user: normalUser._id,
        userName: 'Marcus & Chloe Chen',
        package: baliPkg._id,
        destination: baliPkg.destination,
        rating: 5,
        comment: 'Staying in the bamboo villa in Sidemen was transformative. Wanderly arranged for a local farmer to teach us traditional rice cultivation before noon tea. It was respectful, intimate, and deeply authentic.',
        dispatchNumber: 'Dispatch #139 • Bali',
        travelDateText: 'Traveled August 2024',
        approved: true,
      },
      {
        user: normalUser._id,
        userName: 'Aisha Vance-Morales',
        package: dubaiPkg._id,
        destination: dubaiPkg.destination,
        rating: 5,
        comment: 'I wanted to see the desert as Wilfred Thesiger wrote about it, not the dune-bashing tourist circus. The private Bedouin dinner in the conservation reserve gave me precisely the stillness I craved.',
        dispatchNumber: 'Dispatch #128 • Dubai Desert',
        travelDateText: 'Traveled October 2024',
        approved: true,
      },
    ];

    await Review.insertMany(reviewsData);

    console.log('✅ Auto-seeded initial dataset (10 destinations, packages, hotspots, reviews, admin & traveler accounts).');
  } catch (error) {
    console.warn(`⚠️ Auto-seed notice: ${error.message}`);
  }
};
