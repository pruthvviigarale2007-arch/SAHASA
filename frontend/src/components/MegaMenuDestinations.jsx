import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export const MegaMenuDestinations = ({ onItemClick }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'states' | 'ut' | 'international'

  // Complete List of All 28 States of India
  const indianStates = [
    { name: 'Andhra Pradesh', slug: 'andhra-pradesh', type: 'State', region: 'Araku Valley & Vizag Coast', price: '₹17,999', image: 'https://images.unsplash.com/photo-1600100397608-f010f443b749?auto=format&fit=crop&w=400&q=80' },
    { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh', type: 'State', region: 'Tawang & Ziro Valley', price: '₹26,999', image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Assam', slug: 'assam', type: 'State', region: 'Kaziranga & Majuli Island', price: '₹19,999', image: 'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?auto=format&fit=crop&w=400&q=80' },
    { name: 'Bihar', slug: 'bihar', type: 'State', region: 'Bodh Gaya & Ancient Nalanda', price: '₹14,999', image: 'https://images.unsplash.com/photo-1599827552599-eeddd598e97b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Chhattisgarh', slug: 'chhattisgarh', type: 'State', region: 'Bastar & Chitrakote Falls', price: '₹16,999', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80' },
    { name: 'Goa', slug: 'goa', type: 'State', region: 'Fontainhas & Silent Coves', price: '₹14,999', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Gujarat', slug: 'gujarat', type: 'State', region: 'White Rann & Gir Forest', price: '₹19,999', image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=400&q=80' },
    { name: 'Haryana', slug: 'haryana', type: 'State', region: 'Kurukshetra & Sultanpur', price: '₹11,999', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Himachal Pradesh', slug: 'manali', type: 'State', region: 'Rohtang Pass & Spiti Valley', price: '₹22,999', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80' },
    { name: 'Jharkhand', slug: 'jharkhand', type: 'State', region: 'Netarhat & Betla Tiger Reserve', price: '₹15,999', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Karnataka', slug: 'karnataka', type: 'State', region: 'Hampi Ruins & Coorg Mist', price: '₹18,999', image: 'https://images.unsplash.com/photo-1600100397608-f010f443b749?auto=format&fit=crop&w=400&q=80' },
    { name: 'Kerala', slug: 'kerala', type: 'State', region: 'Alleppey & Munnar Hills', price: '₹21,999', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80' },
    { name: 'Madhya Pradesh', slug: 'madhya-pradesh', type: 'State', region: 'Khajuraho & Bandhavgarh', price: '₹20,999', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80' },
    { name: 'Maharashtra', slug: 'maharashtra', type: 'State', region: 'Western Ghats & Ajanta Caves', price: '₹16,999', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80' },
    { name: 'Manipur', slug: 'manipur', type: 'State', region: 'Loktak Lake & Imphal Valley', price: '₹21,999', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80' },
    { name: 'Meghalaya', slug: 'meghalaya', type: 'State', region: 'Living Root Bridges & Dawki', price: '₹23,999', image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Mizoram', slug: 'mizoram', type: 'State', region: 'Blue Mountain & Aizawl Peaks', price: '₹24,999', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Nagaland', slug: 'nagaland', type: 'State', region: 'Dzukou Valley & Hornbill Hills', price: '₹25,999', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80' },
    { name: 'Odisha', slug: 'odisha', type: 'State', region: 'Puri Beach & Konark Temple', price: '₹15,999', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80' },
    { name: 'Punjab', slug: 'punjab', type: 'State', region: 'Amritsar & Golden Temple', price: '₹13,999', image: 'https://images.unsplash.com/photo-1588096344356-9b570cb3f1a0?auto=format&fit=crop&w=400&q=80' },
    { name: 'Rajasthan', slug: 'rajasthan', type: 'State', region: 'Udaipur Palaces & Jaisalmer Fort', price: '₹23,999', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80' },
    { name: 'Sikkim', slug: 'sikkim', type: 'State', region: 'Kanchenjunga & Gurudongmar', price: '₹25,999', image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=400&q=80' },
    { name: 'Tamil Nadu', slug: 'tamil-nadu', type: 'State', region: 'Meenakshi Temple & Nilgiris', price: '₹18,999', image: 'https://images.unsplash.com/photo-1600100397608-f010f443b749?auto=format&fit=crop&w=400&q=80' },
    { name: 'Telangana', slug: 'telangana', type: 'State', region: 'Golconda & Warangal Citadels', price: '₹16,999', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80' },
    { name: 'Tripura', slug: 'tripura', type: 'State', region: 'Ujjayanta Palace & Unakoti', price: '₹19,999', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80' },
    { name: 'Uttar Pradesh', slug: 'uttar-pradesh', type: 'State', region: 'Varanasi Ghats & Taj Mahal', price: '₹15,999', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80' },
    { name: 'Uttarakhand', slug: 'uttarakhand', type: 'State', region: 'Rishikesh & Valley of Flowers', price: '₹19,999', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80' },
    { name: 'West Bengal', slug: 'west-bengal', type: 'State', region: 'Darjeeling & Sundarbans', price: '₹18,999', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80' },
  ];

  // Complete List of All 8 Union Territories of India
  const unionTerritories = [
    { name: 'Andaman & Nicobar', slug: 'andaman-nicobar', type: 'UT', region: 'Radhanagar Azure Beach & Reefs', price: '₹29,999', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Chandigarh', slug: 'chandigarh', type: 'UT', region: 'Le Corbusier Garden City', price: '₹12,999', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Dadra & Nagar Haveli and Daman & Diu', slug: 'daman-diu', type: 'UT', region: 'Diu Fortress & Coastal Cliffs', price: '₹14,999', image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=400&q=80' },
    { name: 'Delhi', slug: 'delhi', type: 'UT', region: 'Lutyens Citadels & Mughal Salons', price: '₹11,999', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80' },
    { name: 'Jammu & Kashmir', slug: 'kashmir', type: 'UT', region: 'Pir Panjal & Dal Lake Houseboats', price: '₹24,999', image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=400&q=80' },
    { name: 'Ladakh', slug: 'ladakh', type: 'UT', region: 'Pangong Tso & Nubra Dunes', price: '₹27,999', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Lakshadweep', slug: 'lakshadweep', type: 'UT', region: 'Bangaram & Agatti Atolls', price: '₹34,999', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Puducherry', slug: 'puducherry', type: 'UT', region: 'French Quarters & Auroville', price: '₹16,999', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80' },
  ];

  // International Escapes
  const internationalDestinations = [
    { name: 'Bali', slug: 'bali', type: 'International', region: 'Sidemen Bamboo Suites, Indonesia', price: '₹39,999', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80' },
    { name: 'Dubai', slug: 'dubai', type: 'International', region: 'Rub al Khali Reserves, UAE', price: '₹49,999', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80' },
    { name: 'Paris', slug: 'paris', type: 'International', region: 'Le Marais Cultural Salons, France', price: '₹65,000', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80' },
    { name: 'Switzerland', slug: 'switzerland', type: 'International', region: 'Interlaken & Zermatt, Swiss Alps', price: '₹85,000', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80' },
  ];

  const handleSelect = (slug) => {
    if (onItemClick) onItemClick();
    navigate(`/location/${slug}`);
  };

  let displayItems = [];
  if (activeTab === 'all') {
    displayItems = [...indianStates, ...unionTerritories];
  } else if (activeTab === 'states') {
    displayItems = indianStates;
  } else if (activeTab === 'ut') {
    displayItems = unionTerritories;
  } else if (activeTab === 'international') {
    displayItems = internationalDestinations;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl text-parchment rounded-xl">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-white/15 gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-200 font-mono font-semibold flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-terracotta" />
            Bespoke Regional Portfolio • All 28 States & 8 Union Territories
          </span>
          <h3 className="font-serif text-2xl font-normal text-parchment mt-0.5">Destination Explorer</h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/10 text-[11px] font-mono uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded transition-all ${activeTab === 'all' ? 'bg-amber-200 text-ink font-bold shadow' : 'text-white/70 hover:text-white'}`}
          >
            All India (36)
          </button>
          <button
            onClick={() => setActiveTab('states')}
            className={`px-3 py-1.5 rounded transition-all ${activeTab === 'states' ? 'bg-amber-200 text-ink font-bold shadow' : 'text-white/70 hover:text-white'}`}
          >
            28 States
          </button>
          <button
            onClick={() => setActiveTab('ut')}
            className={`px-3 py-1.5 rounded transition-all ${activeTab === 'ut' ? 'bg-amber-200 text-ink font-bold shadow' : 'text-white/70 hover:text-white'}`}
          >
            8 UTs
          </button>
          <button
            onClick={() => setActiveTab('international')}
            className={`px-3 py-1.5 rounded transition-all ${activeTab === 'international' ? 'bg-amber-200 text-ink font-bold shadow' : 'text-white/70 hover:text-white'}`}
          >
            International (4)
          </button>
        </div>

        <a
          href="#destinations"
          onClick={onItemClick}
          className="text-xs uppercase tracking-widest text-terracotta hover:text-amber-200 transition-colors flex items-center gap-1 font-semibold shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid of All Destinations with Smooth Scrolling */}
      <div className="max-h-[480px] overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 custom-scrollbar">
        {displayItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleSelect(item.slug)}
            className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md p-2.5 border border-white/10 hover:border-amber-200/50 text-left transition-all duration-300 rounded-lg"
          >
            <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded bg-black/40">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className={`absolute top-0.5 left-0.5 text-[8px] font-mono px-1 py-0.2 rounded font-semibold uppercase ${
                item.type === 'UT' ? 'bg-amber-200 text-ink' : item.type === 'International' ? 'bg-terracotta text-white' : 'bg-black/70 text-white'
              }`}>
                {item.type}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-serif text-sm font-medium text-parchment group-hover:text-amber-200 transition-colors truncate">
                {item.name}
              </div>
              <div className="text-[10px] text-taupe-light font-mono truncate">{item.region}</div>
              <div className="text-[11px] font-mono font-semibold text-terracotta mt-0.5">{item.price}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};