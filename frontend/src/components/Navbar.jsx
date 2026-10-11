import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, Menu, X, User, LogOut, ShieldAlert, ChevronDown, HelpCircle, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MegaMenuPackages } from './MegaMenuPackages';
import { MegaMenuDestinations } from './MegaMenuDestinations';
import { MegaMenuHotspots } from './MegaMenuHotspots';

export const Navbar = ({ currency, setCurrency, wishlistCount, openAuthModal, openContactModal, onFilterSelect }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');

  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  const hoverTimerRef = useRef(null);
  const navRef = useRef(null);

  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMegaMenu(null);
        setUserDropdownOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMegaMenu(null);
        setUserDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (menuKey) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setActiveMegaMenu(menuKey);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const q = navSearchQuery.trim().toLowerCase();
    if (!q) return;

    setActiveMegaMenu(null);
    const knownLocations = ['kashmir', 'bali', 'paris', 'goa', 'dubai', 'manali', 'kerala', 'switzerland', 'beaches', 'mountains'];

    if (knownLocations.includes(q)) {
      navigate(`/location/${q}`);
      setNavSearchQuery('');
      return;
    }

    const el = document.getElementById('filter-destination') || document.getElementById('destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else navigate('/');
  };

  return (
    <header
      id="navbar"
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 md:px-12 text-white ${
        scrolled || activeMegaMenu
          ? 'bg-black/35 backdrop-blur-xl py-4 border-b border-white/10 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <Link to="/" className="group flex flex-col items-start shrink-0" onClick={() => setActiveMegaMenu(null)}>
          <span className="font-serif tracking-[0.25em] text-2xl md:text-3xl font-normal uppercase text-white group-hover:text-amber-100 transition-colors">
            Sahasa
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-taupe-light -mt-0.5 font-light">
            Est. 2024 • Travel Editorial
          </span>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] md:text-[13px] tracking-[0.18em] uppercase font-medium text-white/90">
          <Link to="/" onClick={() => setActiveMegaMenu(null)} className="hover:text-amber-200 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-terracotta hover:after:w-full after:transition-all">
            Home
          </Link>

          <div className="relative" onMouseEnter={() => handleMouseEnter('packages')} onMouseLeave={handleMouseLeave}>
            <button onClick={() => setActiveMegaMenu(activeMegaMenu === 'packages' ? null : 'packages')} className={`flex items-center gap-1 py-1 transition-colors ${activeMegaMenu === 'packages' ? 'text-amber-200' : 'hover:text-amber-200'}`}>
              <span>Packages</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMegaMenu === 'packages' ? 'rotate-180 text-terracotta' : ''}`} />
            </button>
          </div>

          <div className="relative" onMouseEnter={() => handleMouseEnter('destinations')} onMouseLeave={handleMouseLeave}>
            <button onClick={() => setActiveMegaMenu(activeMegaMenu === 'destinations' ? null : 'destinations')} className={`flex items-center gap-1 py-1 transition-colors ${activeMegaMenu === 'destinations' ? 'text-amber-200' : 'hover:text-amber-200'}`}>
              <span>Destinations</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMegaMenu === 'destinations' ? 'rotate-180 text-terracotta' : ''}`} />
            </button>
          </div>

          <div className="relative" onMouseEnter={() => handleMouseEnter('hotspots')} onMouseLeave={handleMouseLeave}>
            <button onClick={() => setActiveMegaMenu(activeMegaMenu === 'hotspots' ? null : 'hotspots')} className={`flex items-center gap-1 py-1 transition-colors ${activeMegaMenu === 'hotspots' ? 'text-amber-200' : 'hover:text-amber-200'}`}>
              <span>Hotspots</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMegaMenu === 'hotspots' ? 'rotate-180 text-terracotta' : ''}`} />
            </button>
          </div>

          <button onClick={() => { setActiveMegaMenu(null); openContactModal(); }} className="hover:text-amber-200 transition-colors py-1 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-taupe-light" />
            <span>Help</span>
          </button>

          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <SearchIcon className="absolute left-3 w-3.5 h-3.5 text-white/50 pointer-events-none" />
            <input
              type="text"
              value={navSearchQuery}
              onChange={(e) => setNavSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white/10 hover:bg-white/15 focus:bg-ink/90 border border-white/20 focus:border-amber-200 text-white placeholder-white/50 rounded-full outline-none transition-all duration-300 w-32 focus:w-48 font-sans normal-case tracking-normal"
            />
          </form>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-5 xl:gap-6 text-[12px] tracking-[0.18em] uppercase font-medium shrink-0">
          <div className="flex items-center gap-1.5 text-white/70 font-mono text-[11px]">
            <button onClick={() => setCurrency('INR')} className={currency === 'INR' ? 'text-amber-200 font-bold' : 'hover:text-white text-white/60'}>INR</button>
            <span className="text-white/30 text-[10px]">•</span>
            <button onClick={() => setCurrency('USD')} className={currency === 'USD' ? 'text-amber-200 font-bold' : 'hover:text-white text-white/60'}>USD</button>
          </div>

          <span className="w-px h-3.5 bg-white/20"></span>

          <a href="#destinations" onClick={() => setActiveMegaMenu(null)} className="text-white/80 hover:text-amber-200 flex items-center gap-1.5 transition-colors">
            <Bookmark className="w-3.5 h-3.5" />
            <span className="font-serif text-sm">{wishlistCount}</span>
          </a>

          <span className="w-px h-3.5 bg-white/20"></span>

          {user ? (
            <div className="relative">
              <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-1.5 text-white/90 hover:text-amber-200 transition-colors">
                <User className="w-3.5 h-3.5 text-amber-200" />
                <span>{user.name.split(' ')[0]}</span>
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-black/60 backdrop-blur-2xl border border-white/15 shadow-2xl py-2 z-50">
                  <Link to="/profile" onClick={() => setUserDropdownOpen(false)} className="block px-4 py-2 text-xs uppercase tracking-wider text-parchment hover:bg-white/10">My Profile</Link>
                  <Link to="/my-bookings" onClick={() => setUserDropdownOpen(false)} className="block px-4 py-2 text-xs uppercase tracking-wider text-parchment hover:bg-white/10">My Bookings</Link>
                  {isAdmin && <Link to="/admin" onClick={() => setUserDropdownOpen(false)} className="block px-4 py-2 text-xs uppercase text-amber-200 hover:bg-white/10 flex items-center gap-1.5"><ShieldAlert className="w-3 h-3 text-terracotta" />Admin</Link>}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-xs uppercase text-terracotta hover:bg-white/10 border-t border-white/10 flex items-center gap-1.5"><LogOut className="w-3 h-3" />Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => openAuthModal('login')} className="text-white/90 hover:text-amber-200 transition-colors">Sign In</button>
          )}

          <span className="w-px h-3.5 bg-white/20"></span>

          <a href="#packages" onClick={() => setActiveMegaMenu(null)} className="text-terracotta hover:text-amber-200 transition-colors font-semibold flex items-center gap-1 group">
            <span>Make a Trip</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {activeMegaMenu && (
        <div onMouseEnter={() => handleMouseEnter(activeMegaMenu)} onMouseLeave={handleMouseLeave} className="hidden lg:block absolute left-0 right-0 top-full pt-2 transition-all duration-300">
          {activeMegaMenu === 'packages' && <MegaMenuPackages onItemClick={() => setActiveMegaMenu(null)} onFilterSelect={onFilterSelect} />}
          {activeMegaMenu === 'destinations' && <MegaMenuDestinations onItemClick={() => setActiveMegaMenu(null)} onFilterSelect={onFilterSelect} />}
          {activeMegaMenu === 'hotspots' && <MegaMenuHotspots onItemClick={() => setActiveMegaMenu(null)} />}
        </div>
      )}
    </header>
  );
};