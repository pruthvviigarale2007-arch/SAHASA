import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { DestinationsSection } from '../components/DestinationsSection';
import { PackagesSection } from '../components/PackagesSection';
import { HotspotsSection } from '../components/HotspotsSection';
import { PhilosophySection } from '../components/PhilosophySection';
import { JournalSection } from '../components/JournalSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { Footer } from '../components/Footer';
import { ItineraryModal } from '../modals/ItineraryModal';
import { AuthModal } from '../modals/AuthModal';
import { ContactModal } from '../modals/ContactModal';

export const Home = () => {
  const [currency, setCurrency] = useState('INR');
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [activeModalKey, setActiveModalKey] = useState(null);
  const [authModalMode, setAuthModalMode] = useState(null); // 'login' | 'register' | null
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const toggleWishlist = (id, e) => {
    if (e) e.stopPropagation();
    setWishlistItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const openItineraryModal = (key) => {
    setActiveModalKey(key);
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

      <Hero onSearchResults={(results) => setSearchResults(results)} />

      <DestinationsSection
        currency={currency}
        wishlistItems={wishlistItems}
        toggleWishlist={toggleWishlist}
        openItineraryModal={openItineraryModal}
        searchResults={searchResults}
      />

      <PackagesSection
        currency={currency}
        openItineraryModal={openItineraryModal}
        searchResults={searchResults}
      />

      <HotspotsSection />

      <PhilosophySection />

      <JournalSection />

      <NewsletterSection />

      <Footer
        openContactModal={() => setContactModalOpen(true)}
        onQuickFilter={(name) => {
          const el = document.getElementById('destinations');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      {activeModalKey && (
        <ItineraryModal
          itineraryKey={activeModalKey}
          onClose={() => setActiveModalKey(null)}
          currency={currency}
          openAuthModal={(mode) => setAuthModalMode(mode)}
        />
      )}

      {authModalMode && (
        <AuthModal
          initialMode={authModalMode}
          onClose={() => setAuthModalMode(null)}
        />
      )}

      {contactModalOpen && (
        <ContactModal onClose={() => setContactModalOpen(false)} />
      )}
    </div>
  );
};
