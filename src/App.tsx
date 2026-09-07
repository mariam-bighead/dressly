/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AuthModal } from './components/AuthModal';
import { PlatformLedgerModal } from './components/PlatformLedgerModal';
import { SellerDashboard } from './components/SellerDashboard';
import { BuyerProfile } from './components/BuyerProfile';
import { Footer } from './components/Footer';
import { DressCategory, DressProduct } from './types';
import { formatNaira } from './utils/currency';
import asoEbiGownImg from './assets/images/aso_ebi_gown_1788541011532.jpg';
import owambeLaceImg from './assets/images/owambe_lace_dress_1788541024669.jpg';
import asoEbiPartyImg from './assets/images/aso_ebi_party_1788541040020.jpg';
import owambePurpleImg from './assets/images/owambe_purple_lace_1788541065705.jpg';
import asoEbiCobaltBlueImg from './assets/images/aso_ebi_cobalt_blue.jpg';
import asoEbiLilacCoutureImg from './assets/images/aso_ebi_lilac_couture.jpg';
import asoEbiRoyalPurpleGeleImg from './assets/images/aso_ebi_royal_purple_gele.jpg';
import asoEbiLatestLaceImg from './assets/images/aso_ebi_latest_lace.jpg';
import asoEbiBellaStylesImg from './assets/images/aso_ebi_bella_styles.jpg';
import asoEbiOwambeGuestImg from './assets/images/aso_ebi_owambe_guest.jpg';
import ankaraCoutureImg from './assets/images/ankara_couture_gown_1788605243176.jpg';
import ankaraMermaidImg from './assets/images/ankara_mermaid_dress_1788605256295.jpg';
import ankaraBallGownImg from './assets/images/ankara_ball_gown_1788605293662.jpg';
import nigerianBridalImg from './assets/images/nigerian_bridal_gown_1788605268871.jpg';
import asoOkeWeddingImg from './assets/images/aso_oke_wedding_1788605280891.jpg';
import owambeGoldImg from './assets/images/owambe_gold_dress_1788541050886.jpg';
import { 
  Sparkles, 
  SlidersHorizontal, 
  Search, 
  Store, 
  DollarSign, 
  Truck, 
  Check, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

function MainMarketplace() {
  const { 
    dresses, 
    activeDressModal, 
    setActiveDressModal, 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalInitialRole,
    isCheckoutOpen, 
    setIsCheckoutOpen,
    selectedTrackingOrder,
    setSelectedTrackingOrder,
    isPlatformLedgerOpen,
    setIsPlatformLedgerOpen,
    platformStats
  } = useShop();

  const { role, switchRole } = useAuth();

  const [activeTab, setActiveTab] = useState<'explore' | 'seller_dashboard' | 'buyer_profile'>('explore');
  const [selectedCategory, setSelectedCategory] = useState<DressCategory>('All Dresses');
  const [spotlightTab, setSpotlightTab] = useState<'ankara' | 'bridal' | 'owambe'>('ankara');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>('All');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high'>('featured');

  // Sync spotlight tab with selected category
  const activeSpotlight = useMemo(() => {
    if (selectedCategory === 'Ankara & Wax Prints' || (spotlightTab === 'ankara' && selectedCategory === 'All Dresses')) {
      return {
        key: 'ankara' as const,
        title: 'Vibrant Dutch Wax & Ankara Couture',
        badge: '🇳🇬 Ankara & Wax Prints Lookbook',
        description: 'Immerse in authentic Dutch wax block-prints, kaleidoscopic geometric motifs, architectural peplums, and cascading fluted hems crafted by top African fashion houses.',
        categoryTarget: 'Ankara & Wax Prints' as DressCategory,
        count: '6 Exclusive Designs • 26+ Photos',
        images: [
          { img: ankaraCoutureImg, label: 'Dutch Wax Couture', dressId: 'ankara-1' },
          { img: ankaraMermaidImg, label: 'Emerald Mermaid', dressId: 'ankara-2' },
          { img: ankaraBallGownImg, label: 'Indigo Ball Gown', dressId: 'ankara-3' },
          { img: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80', label: 'Kaleidoscope Wax', dressId: 'ankara-4' },
          { img: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80', label: 'Afro-Couture Gala', dressId: 'ankara-5' },
        ]
      };
    }
    if (selectedCategory === 'Bridal & Traditional Wedding' || (spotlightTab === 'bridal' && selectedCategory === 'All Dresses')) {
      return {
        key: 'bridal' as const,
        title: 'Royal Nigerian Bridal & Traditional Wedding Regalia',
        badge: '👑 Traditional Bridal & Wedding Lookbook',
        description: 'Experience regal Nigerian weddings: authentic handwoven metallic Aso-Oke, Edo Kingdom Coral Okuku beaded crowns, Igbo Igba Nkwu George silk, and cathedral train bridal gowns.',
        categoryTarget: 'Bridal & Traditional Wedding' as DressCategory,
        count: '6 Royal Bridal Sets • 28+ Photos',
        images: [
          { img: nigerianBridalImg, label: 'Burgundy Aso-Oke', dressId: 'bridal-trad-1' },
          { img: asoOkeWeddingImg, label: 'Edo Coral Regalia', dressId: 'bridal-trad-2' },
          { img: owambeGoldImg, label: 'Rose Gold Reception', dressId: 'bridal-trad-3' },
          { img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', label: 'Igbo George Silk', dressId: 'bridal-trad-4' },
          { img: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80', label: 'Cathedral Lace Gown', dressId: 'bridal-trad-5' },
        ]
      };
    }
    return {
      key: 'owambe' as const,
      title: 'Turn Heads at Every Nigerian Owambe',
      badge: '✨ Aso Ebi & Owambe Lookbook',
      description: 'From opulent emerald French cord lace with matching hand-tied Geles to royal blue mermaid silhouettes and hand-beaded coral accents.',
      categoryTarget: 'Aso Ebi & Owambe' as DressCategory,
      count: '6 Owambe Designs • 20+ Photos',
      images: [
        { img: asoEbiOwambeGuestImg, label: 'Owambe Wedding Guest', dressId: 'aso-ebi-1' },
        { img: asoEbiCobaltBlueImg, label: 'Royal Cobalt Blue', dressId: 'aso-ebi-2' },
        { img: asoEbiLilacCoutureImg, label: 'Lilac & Plum Couture', dressId: 'aso-ebi-3' },
        { img: asoEbiLatestLaceImg, label: 'Champagne Gilded Lace', dressId: 'aso-ebi-4' },
        { img: asoEbiRoyalPurpleGeleImg, label: 'Royal Purple & Gele', dressId: 'aso-ebi-5' },
      ]
    };
  }, [selectedCategory, spotlightTab]);

  // Filtered dresses
  const filteredDresses = useMemo(() => {
    return dresses.filter((dress) => {
      // Category filter
      if (selectedCategory !== 'All Dresses' && dress.category !== selectedCategory) {
        return false;
      }
      // Silhouette filter
      if (selectedSilhouette !== 'All' && dress.silhouette !== selectedSilhouette) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== 'All' && !dress.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = dress.title.toLowerCase().includes(query);
        const matchesFabric = dress.fabric.toLowerCase().includes(query);
        const matchesCat = dress.category.toLowerCase().includes(query);
        const matchesSeller = dress.sellerName.toLowerCase().includes(query);
        const matchesSilhouette = dress.silhouette.toLowerCase().includes(query);
        if (!matchesTitle && !matchesFabric && !matchesCat && !matchesSeller && !matchesSilhouette) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [dresses, selectedCategory, selectedSilhouette, selectedFabric, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1026] text-[#F8FAFC]">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'seller_dashboard' ? (
          <SellerDashboard />
        ) : activeTab === 'buyer_profile' ? (
          <BuyerProfile />
        ) : (
          /* Buyer Explore & Dress Catalog */
          <div>
            
            {/* Curated Dresses Hero Section */}
            <div className="relative bg-[#0B1026] text-[#F8FAFC] overflow-hidden py-12 sm:py-16 border-b border-[#7C3AED]/30">
              <div className="absolute inset-0 opacity-15">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
                  alt="Dresses Collection"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1026] via-[#0B1026]/95 to-[#1E1B4B]/30"></div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E1B4B] text-[#E9D5FF] text-xs font-black uppercase tracking-wider border border-[#7C3AED]/60 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                      <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>70% Atelier Share • 30% Platform Escrow • Nigeria Nationwide Delivery</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F8FAFC] uppercase leading-tight">
                      Nigerian Couture.<br />
                      <span className="italic font-bold text-[#E9D5FF]">Handcrafted to drape.</span>
                    </h1>

                    <p className="text-xs sm:text-sm text-[#E9D5FF]/80 leading-relaxed max-w-xl font-medium">
                      Connect directly with premier Nigerian dressmakers and fashion ateliers across Lagos, Abuja, Abeokuta, and Port Harcourt. Explore regal Aso Ebi lace, Ankara wax prints, rich silk Boubous, and Adire batik with real-time nationwide courier tracking and secure escrow.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
                      <button
                        id="hero-explore-dresses-btn"
                        onClick={() => {
                          const elem = document.getElementById('dress-catalog-grid');
                          elem?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full sm:w-auto justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:translate-y-0.5 transition-all text-center"
                      >
                        Explore All Dresses
                      </button>

                      <button
                        id="hero-sell-dresses-btn"
                        onClick={() => {
                          switchRole('seller');
                          setActiveTab('seller_dashboard');
                        }}
                        className="w-full sm:w-auto justify-center px-6 py-3 rounded-2xl bg-[#131C3F] hover:bg-[#1E2A54] text-[#E9D5FF] hover:text-[#F8FAFC] text-xs font-black uppercase tracking-wider border border-[#2563EB]/50 shadow-[0_0_15px_rgba(37,99,235,0.25)] flex items-center gap-2 hover:translate-y-0.5 transition-all text-center"
                      >
                        <Store className="w-4 h-4 text-[#38BDF8]" />
                        <span>Open Storefront (Earn 70%)</span>
                      </button>

                      <button
                        id="hero-view-platform-share-btn"
                        onClick={() => setIsPlatformLedgerOpen(true)}
                        className="w-full sm:w-auto justify-center px-5 py-3 rounded-2xl bg-[#1E1B4B] hover:bg-[#2E2868] text-[#E9D5FF] hover:text-[#F8FAFC] text-xs font-black uppercase tracking-wider border border-[#7C3AED]/50 shadow-[0_0_15px_rgba(124,58,237,0.25)] flex items-center gap-1.5 hover:translate-y-0.5 transition-all text-center"
                      >
                        <DollarSign className="w-4 h-4 text-[#38BDF8]" />
                        <span>Platform (30%): {formatNaira(platformStats.totalPlatformFee)}</span>
                      </button>
                    </div>
                  </div>

                  {/* Vibrant Bento Feature Cards in Hero */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Revenue Split Card - Soft Purple */}
                    <div className="bg-[#1E1B4B]/90 rounded-[24px] border-2 border-[#A855F7]/50 p-4 text-[#F8FAFC] shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:border-[#A855F7] transition-all">
                      <div className="text-[10px] font-black uppercase tracking-wider text-[#E9D5FF]/80">Revenue Split</div>
                      <div className="text-2xl font-black mt-1 text-[#F8FAFC]">70% / 30%</div>
                      <p className="text-[11px] font-bold mt-1 text-[#E9D5FF]/80">Automatic escrow payout to dressmakers</p>
                    </div>

                    {/* GPS Pulse Card - Soft Blue */}
                    <div className="bg-[#0C2454]/90 rounded-[24px] border-2 border-[#38BDF8]/50 p-4 text-[#F8FAFC] shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:border-[#38BDF8] transition-all">
                      <div className="text-[10px] font-black uppercase tracking-wider text-[#38BDF8]">Live Courier</div>
                      <div className="text-2xl font-black mt-1 text-[#F8FAFC]">GPS Pulse</div>
                      <p className="text-[11px] font-bold mt-1 text-[#E9D5FF]/80">Real-time driver location and milestone steps</p>
                    </div>

                    {/* Social Single Sign-On Card - Dark Navy / Lavender */}
                    <div className="col-span-2 bg-[#111836] rounded-[24px] border-2 border-[#7C3AED]/40 p-4 text-[#E9D5FF] shadow-[0_0_20px_rgba(124,58,237,0.15)] hover:border-[#7C3AED]/70 transition-all flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-[#38BDF8]">Social Single Sign-On</div>
                        <div className="text-sm font-black mt-0.5 text-[#F8FAFC]">Instant Buyer & Seller Accounts</div>
                      </div>
                      <div className="flex -space-x-1">
                        <span className="w-7 h-7 rounded-full bg-[#1877F2] text-white text-[10px] font-black flex items-center justify-center border border-[#7C3AED]/60">f</span>
                        <span className="w-7 h-7 rounded-full bg-[#131C3F] text-[#38BDF8] text-[10px] font-black flex items-center justify-center border border-[#7C3AED]/60">G</span>
                        <span className="w-7 h-7 rounded-full bg-[#000] text-white text-[10px] font-black flex items-center justify-center border border-[#7C3AED]/60">𝕏</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Dynamic Interactive Lookbook & Category Spotlight Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <div className="bg-[#111836] rounded-[32px] border-2 border-[#7C3AED]/40 p-6 sm:p-8 text-[#F8FAFC] shadow-[0_0_30px_rgba(124,58,237,0.2)] relative overflow-hidden">
                {/* Category Switcher Tabs */}
                <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-[#7C3AED]/30 pb-4">
                  <span className="text-[11px] font-black uppercase text-[#E9D5FF]/70 tracking-wider mr-2">Featured Galleries:</span>
                  <button
                    id="tab-ankara-lookbook"
                    onClick={() => {
                      setSpotlightTab('ankara');
                      setSelectedCategory('Ankara & Wax Prints');
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      activeSpotlight.key === 'ankara'
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border border-[#A855F7] shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'bg-[#131C3F] text-[#E9D5FF] border border-[#7C3AED]/30 hover:bg-[#1E1B4B] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span>🇳🇬</span>
                    <span>Ankara & Wax Prints</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#0B1026] text-[#38BDF8] rounded-full">6 Styles</span>
                  </button>
                  <button
                    id="tab-bridal-lookbook"
                    onClick={() => {
                      setSpotlightTab('bridal');
                      setSelectedCategory('Bridal & Traditional Wedding');
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      activeSpotlight.key === 'bridal'
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border border-[#A855F7] shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'bg-[#131C3F] text-[#E9D5FF] border border-[#7C3AED]/30 hover:bg-[#1E1B4B] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span>👑</span>
                    <span>Bridal & Traditional Wedding</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#0B1026] text-[#38BDF8] rounded-full">6 Styles</span>
                  </button>
                  <button
                    id="tab-owambe-lookbook"
                    onClick={() => {
                      setSpotlightTab('owambe');
                      setSelectedCategory('Aso Ebi & Owambe');
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      activeSpotlight.key === 'owambe'
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border border-[#A855F7] shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'bg-[#131C3F] text-[#E9D5FF] border border-[#7C3AED]/30 hover:bg-[#1E1B4B] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span>✨</span>
                    <span>Aso Ebi & Owambe</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#0B1026] text-[#38BDF8] rounded-full">6 Styles</span>
                  </button>
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-[11px] font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_12px_rgba(124,58,237,0.3)]">
                      <span>{activeSpotlight.badge}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F8FAFC] leading-tight">
                      {activeSpotlight.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E9D5FF]/85 max-w-xl font-medium leading-relaxed">
                      {activeSpotlight.description}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-3 items-center">
                      <button
                        id="browse-spotlight-btn"
                        onClick={() => {
                          setSelectedCategory(activeSpotlight.categoryTarget);
                          const elem = document.getElementById('dress-catalog-grid');
                          elem?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:translate-y-0.5 transition-all ${
                          selectedCategory === activeSpotlight.categoryTarget
                            ? 'bg-[#1E1B4B] text-[#38BDF8] border-[#38BDF8]'
                            : 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC]'
                        }`}
                      >
                        {selectedCategory === activeSpotlight.categoryTarget 
                          ? `✓ Showing ${activeSpotlight.categoryTarget}` 
                          : `Filter Catalog to ${activeSpotlight.categoryTarget}`}
                      </button>
                      {selectedCategory !== 'All Dresses' && (
                        <button
                          onClick={() => setSelectedCategory('All Dresses')}
                          className="px-4 py-2.5 rounded-2xl bg-[#131C3F] hover:bg-[#1E1B4B] text-[#E9D5FF] text-xs font-black uppercase tracking-wider border border-[#7C3AED]/40 transition-all"
                        >
                          Show All Categories
                        </button>
                      )}
                      <span className="text-[11px] font-bold text-[#E9D5FF]/60">
                        {activeSpotlight.count}
                      </span>
                    </div>
                  </div>

                  {/* Multi-image visual lookbook gallery */}
                  <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {activeSpotlight.images.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          const dress = dresses.find(d => d.id === item.dressId);
                          if (dress) {
                            setActiveDressModal(dress);
                          } else {
                            setSelectedCategory(activeSpotlight.categoryTarget);
                          }
                        }}
                        className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#7C3AED]/40 shadow-[0_0_12px_rgba(124,58,237,0.2)] cursor-pointer hover:-translate-y-1 hover:border-[#38BDF8] transition-all bg-[#0B1026] ${
                          idx === 4 ? 'col-span-2 sm:col-span-1 md:col-span-1' : ''
                        }`}
                        title={`Click to view ${item.label}`}
                      >
                        <img
                          src={item.img}
                          alt={item.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1026] via-transparent to-transparent flex items-end p-2">
                          <span className="text-[9px] font-black uppercase text-[#F8FAFC] tracking-tight leading-tight line-clamp-2">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Bar & Search Controls */}
            <div id="dress-catalog-grid" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 sm:pt-10">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#7C3AED]/30">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F8FAFC] uppercase italic">
                    {selectedCategory}
                  </h2>
                  <p className="text-xs font-bold text-[#E9D5FF]/70 mt-0.5">
                    Showing {filteredDresses.length} handcrafted dress design{filteredDresses.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Filter selects */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs">
                  
                  {/* Silhouette filter */}
                  <div className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-start gap-1.5 bg-[#131C3F] border border-[#7C3AED]/40 rounded-full px-3.5 sm:px-4 py-2 shadow-[0_0_10px_rgba(124,58,237,0.15)]">
                    <span className="text-[10px] text-[#E9D5FF] uppercase font-black">Silhouette:</span>
                    <select
                      id="filter-silhouette-select"
                      value={selectedSilhouette}
                      onChange={(e) => setSelectedSilhouette(e.target.value)}
                      className="bg-transparent font-black text-[#38BDF8] focus:outline-none cursor-pointer text-xs"
                    >
                      <option value="All" className="bg-[#111836] text-[#F8FAFC]">All Silhouettes</option>
                      <option value="Mermaid" className="bg-[#111836] text-[#F8FAFC]">Mermaid</option>
                      <option value="Boubou & Kaftan" className="bg-[#111836] text-[#F8FAFC]">Boubou & Kaftan</option>
                      <option value="Corset & Peplum" className="bg-[#111836] text-[#F8FAFC]">Corset & Peplum</option>
                      <option value="A-Line" className="bg-[#111836] text-[#F8FAFC]">A-Line</option>
                      <option value="Slip Dress" className="bg-[#111836] text-[#F8FAFC]">Slip Dress</option>
                      <option value="Wrap Dress" className="bg-[#111836] text-[#F8FAFC]">Wrap Dress</option>
                      <option value="Column" className="bg-[#111836] text-[#F8FAFC]">Column</option>
                      <option value="Fit & Flare" className="bg-[#111836] text-[#F8FAFC]">Fit & Flare</option>
                      <option value="Shift" className="bg-[#111836] text-[#F8FAFC]">Shift</option>
                    </select>
                  </div>

                  {/* Fabric filter */}
                  <div className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-start gap-1.5 bg-[#131C3F] border border-[#7C3AED]/40 rounded-full px-3.5 sm:px-4 py-2 shadow-[0_0_10px_rgba(124,58,237,0.15)]">
                    <span className="text-[10px] text-[#E9D5FF] uppercase font-black">Fabric:</span>
                    <select
                      id="filter-fabric-select"
                      value={selectedFabric}
                      onChange={(e) => setSelectedFabric(e.target.value)}
                      className="bg-transparent font-black text-[#38BDF8] focus:outline-none cursor-pointer text-xs"
                    >
                      <option value="All" className="bg-[#111836] text-[#F8FAFC]">All Fabrics</option>
                      <option value="Lace" className="bg-[#111836] text-[#F8FAFC]">Cord & French Lace</option>
                      <option value="Ankara" className="bg-[#111836] text-[#F8FAFC]">Dutch Wax Ankara</option>
                      <option value="Adire" className="bg-[#111836] text-[#F8FAFC]">Abeokuta Adire Silk</option>
                      <option value="Aso-Oke" className="bg-[#111836] text-[#F8FAFC]">Woven Aso-Oke</option>
                      <option value="Brocade" className="bg-[#111836] text-[#F8FAFC]">Damask & Brocade</option>
                      <option value="Silk" className="bg-[#111836] text-[#F8FAFC]">Mulberry Silk & Mikado</option>
                      <option value="Velvet" className="bg-[#111836] text-[#F8FAFC]">Plissé Velvet</option>
                      <option value="Chiffon" className="bg-[#111836] text-[#F8FAFC]">Georgette Chiffon</option>
                      <option value="Linen" className="bg-[#111836] text-[#F8FAFC]">European Linen</option>
                    </select>
                  </div>

                  {/* Sort by */}
                  <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-1.5 bg-[#131C3F] border border-[#7C3AED]/40 rounded-full px-3.5 sm:px-4 py-2 shadow-[0_0_10px_rgba(124,58,237,0.15)]">
                    <span className="text-[10px] text-[#E9D5FF] uppercase font-black">Sort:</span>
                    <select
                      id="sort-dresses-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent font-black text-[#F8FAFC] focus:outline-none cursor-pointer text-xs"
                    >
                      <option value="featured" className="bg-[#111836] text-[#F8FAFC]">Featured Picks</option>
                      <option value="price_low" className="bg-[#111836] text-[#F8FAFC]">Price: Low to High</option>
                      <option value="price_high" className="bg-[#111836] text-[#F8FAFC]">Price: High to Low</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Product Grid */}
              {filteredDresses.length === 0 ? (
                <div className="py-16 sm:py-20 text-center space-y-4 bg-[#111836] rounded-[32px] border-2 border-[#7C3AED]/40 shadow-[0_0_25px_rgba(124,58,237,0.2)] my-8 p-6 sm:p-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#1E1B4B] border border-[#7C3AED]/50 flex items-center justify-center mx-auto text-[#38BDF8] shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-[#F8FAFC] uppercase">
                    No dresses match your filters
                  </h3>
                  <p className="text-xs font-bold text-[#E9D5FF]/70 max-w-sm mx-auto">
                    Try adjusting your silhouette, fabric filter, or search query to explore more handcrafted dresses.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All Dresses');
                      setSelectedSilhouette('All');
                      setSelectedFabric('All');
                      setSearchQuery('');
                    }}
                    className="mt-2 px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] rounded-full text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:translate-y-0.5 transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div id="catalog-product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 py-6 sm:py-8">
                  {filteredDresses.map((dress) => (
                    <ProductCard
                      key={dress.id}
                      product={dress}
                      onOpenDetail={(product) => setActiveDressModal(product)}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}
      </main>

      {/* Dress Detail Modal */}
      <ProductDetailModal
        product={activeDressModal}
        onClose={() => setActiveDressModal(null)}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer />

      {/* Checkout Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Live Order Tracking Modal */}
      <OrderTrackingModal
        order={selectedTrackingOrder}
        onClose={() => setSelectedTrackingOrder(null)}
      />

      {/* Social / Email Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialRole={authModalInitialRole}
      />

      {/* Platform Owner 30% Account Ledger Modal */}
      <PlatformLedgerModal
        isOpen={isPlatformLedgerOpen}
        onClose={() => setIsPlatformLedgerOpen(false)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <MainMarketplace />
      </ShopProvider>
    </AuthProvider>
  );
}
