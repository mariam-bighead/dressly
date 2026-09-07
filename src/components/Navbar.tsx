import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Search, 
  Store, 
  Sparkles, 
  Package, 
  Layers, 
  LogOut, 
  SlidersHorizontal,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { DressCategory } from '../types';
import { formatNaira } from '../utils/currency';

interface NavbarProps {
  activeTab: 'explore' | 'seller_dashboard' | 'buyer_profile';
  setActiveTab: (tab: 'explore' | 'seller_dashboard' | 'buyer_profile') => void;
  selectedCategory: DressCategory;
  setSelectedCategory: (cat: DressCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CATEGORIES: DressCategory[] = [
  'All Dresses',
  'Aso Ebi & Owambe',
  'Ankara & Wax Prints',
  'Rich Boubou & Kaftans',
  'Adire & Heritage Silk',
  'Bridal & Traditional Wedding',
  'Evening & Gala',
  'Cocktail & Party',
  'Silk & Slip',
  'Summer & Linen',
  'Daywear & Casual',
  'Vintage & Retro'
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const { currentUser, role, switchRole, logout } = useAuth();
  const { 
    cart, 
    wishlist, 
    setIsCartOpen, 
    setIsAuthModalOpen, 
    setAuthModalInitialRole,
    orders, 
    setSelectedTrackingOrder,
    setIsPlatformLedgerOpen,
    platformStats
  } = useShop();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'delivered').length;

  return (
    <header className="sticky top-0 z-40 bg-[#0B1026] border-b border-[#7C3AED]/40 shadow-lg">
      {/* Top utility announcement banner with 70/30 commission highlight */}
      <div className="bg-[#070A1A] text-white text-xs px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between font-bold gap-2 border-b border-[#7C3AED]/20">
        <div className="flex items-center gap-2 mx-auto sm:mx-0 text-center sm:text-left">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping shrink-0" />
          <span className="px-2 py-0.5 rounded bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-[10px] font-black uppercase tracking-wider shrink-0 border border-[#A855F7]/50 shadow-[0_0_10px_rgba(124,58,237,0.3)]">70/30 Model</span>
          <span className="text-[11px] sm:text-xs text-[#E9D5FF]">Curated Nigerian Couture & Designer Dresses • <strong className="text-[#38BDF8]">70% direct to artisan ateliers</strong>, 30% platform escrow</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px] text-[#E9D5FF]/80 shrink-0">
          <button 
            id="platform-ledger-banner-btn"
            onClick={() => setIsPlatformLedgerOpen(true)}
            className="text-[#E9D5FF] hover:text-[#38BDF8] hover:underline flex items-center gap-1 font-bold transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5 text-[#38BDF8]" />
            Platform Account (30% Share): {formatNaira(platformStats.totalPlatformFee)}
          </button>
          <span className="opacity-40 text-[#7C3AED]">•</span>
          <span className="text-[#38BDF8] font-bold">Express Courier Across Nigeria</span>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="brand-logo-btn"
              onClick={() => setActiveTab('explore')}
              className="text-left group flex items-center gap-2 sm:gap-3"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#7C3AED] to-[#2563EB] rounded-xl flex items-center justify-center border border-[#A855F7]/60 shadow-[0_0_15px_rgba(124,58,237,0.4)] text-[#F8FAFC] font-black text-lg sm:text-xl group-hover:scale-105 transition-transform">
                D
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#F8FAFC] uppercase block leading-none">
                  Dress.ly
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-widest uppercase font-black text-[#38BDF8] block mt-0.5">
                  Atelier Marketplace
                </span>
              </div>
            </button>
          </div>

          {/* Search bar (desktop / large tablet) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E9D5FF]/60 font-bold" />
              <input
                id="search-dresses-input"
                type="text"
                placeholder="Search silhouettes, mulberry silk, gala gowns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#111836] hover:bg-[#131C3F] focus:bg-[#131C3F] text-sm text-[#F8FAFC] font-bold placeholder:text-[#94A3B8] rounded-2xl border border-[#7C3AED]/40 focus:border-[#38BDF8] focus:shadow-[0_0_15px_rgba(56,189,248,0.25)] focus:outline-none transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-[#38BDF8] hover:text-[#E9D5FF]"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Right action controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
            
            {/* Mobile / Tablet search toggle button */}
            <button
              id="mobile-search-toggle-btn"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              title="Search Dresses"
              className={`lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#7C3AED]/40 shadow-[0_0_10px_rgba(124,58,237,0.2)] flex items-center justify-center transition-all ${
                isMobileSearchOpen ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white' : 'bg-[#131C3F] text-[#E9D5FF] hover:text-[#38BDF8]'
              }`}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Quick Role Switcher Toggle (Desktop/Tablet) */}
            <div className="hidden sm:flex items-center bg-[#131C3F] p-1 rounded-full border border-[#7C3AED]/40 text-xs shadow-inner">
              <button
                id="toggle-buyer-mode-btn"
                onClick={() => {
                  if (role !== 'buyer') switchRole('buyer');
                  setActiveTab('explore');
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-black text-xs transition-all ${
                  role === 'buyer' && activeTab !== 'seller_dashboard'
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)] border border-[#A855F7]/40'
                    : 'text-[#E9D5FF] hover:text-[#F8FAFC]'
                }`}
              >
                Buyer Mode
              </button>
              <button
                id="toggle-seller-mode-btn"
                onClick={() => {
                  if (role !== 'seller') switchRole('seller');
                  setActiveTab('seller_dashboard');
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-black text-xs flex items-center gap-1.5 transition-all ${
                  role === 'seller' || activeTab === 'seller_dashboard'
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)] border border-[#A855F7]/40'
                    : 'text-[#E9D5FF] hover:text-[#F8FAFC]'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Seller Storefront</span>
              </button>
            </div>

            {/* Mobile Quick Role Toggle */}
            <button
              id="mobile-toggle-role-btn"
              onClick={() => {
                if (role === 'buyer' && activeTab !== 'seller_dashboard') {
                  switchRole('seller');
                  setActiveTab('seller_dashboard');
                } else {
                  switchRole('buyer');
                  setActiveTab('explore');
                }
              }}
              className="sm:hidden px-2 py-1 rounded-full border border-[#7C3AED]/40 bg-[#131C3F] text-[#E9D5FF] text-[10px] font-black flex items-center gap-1 shadow-[0_0_10px_rgba(124,58,237,0.2)]"
              title={role === 'buyer' && activeTab !== 'seller_dashboard' ? 'Switch to Seller Storefront' : 'Switch to Buyer Mode'}
            >
              <Store className="w-3 h-3 text-[#38BDF8]" />
              <span>{role === 'buyer' && activeTab !== 'seller_dashboard' ? 'Seller' : 'Buyer'}</span>
            </button>

            {/* Platform 30% Account Button (Desktop) */}
            <button
              id="open-platform-ledger-btn"
              onClick={() => setIsPlatformLedgerOpen(true)}
              title="View Platform 30% Share Ledger"
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black rounded-full bg-[#1E1B4B] text-[#E9D5FF] border border-[#7C3AED]/50 shadow-[0_0_12px_rgba(124,58,237,0.25)] hover:bg-[#2A2368] hover:text-white transition-transform active:translate-y-0.5"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Platform 30%: {formatNaira(platformStats.totalPlatformFee)}</span>
            </button>

            {/* Live Order Tracking quick button */}
            <button
              id="nav-track-order-btn"
              onClick={() => {
                if (orders.length > 0) {
                  setSelectedTrackingOrder(orders[0]);
                } else {
                  alert('No active orders yet. Place a dress order to track in real-time!');
                }
              }}
              title="Live Order Tracking"
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#7C3AED]/40 shadow-[0_0_10px_rgba(124,58,237,0.15)] bg-[#131C3F] flex items-center justify-center text-[#E9D5FF] hover:text-[#38BDF8] hover:border-[#38BDF8]/60 transition-all"
            >
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              {activeOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 sm:w-3.5 h-3 sm:h-3.5 bg-[#38BDF8] rounded-full border border-[#0B1026] animate-bounce" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={() => setActiveTab('buyer_profile')}
              title="Saved Wishlist"
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#7C3AED]/40 shadow-[0_0_10px_rgba(124,58,237,0.15)] bg-[#131C3F] flex items-center justify-center text-[#E9D5FF] hover:text-[#38BDF8] hover:border-[#38BDF8]/60 transition-all"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-[9px] sm:text-[10px] font-black rounded-full border border-[#0B1026] flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              id="nav-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] border border-[#A855F7]/50 shadow-[0_0_15px_rgba(124,58,237,0.35)] rounded-full text-xs font-black uppercase tracking-wider hover:translate-y-0.5 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#0B1026] text-[#38BDF8] border border-[#7C3AED]/60 rounded-full text-[9px] sm:text-[10px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* User Profile / Auth menu */}
            <div className="relative">
              {currentUser ? (
                <div className="relative">
                  <button
                    id="user-menu-avatar-btn"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1 p-0.5 sm:p-1 rounded-full border border-[#7C3AED]/50 bg-[#131C3F] shadow-[0_0_10px_rgba(124,58,237,0.2)] hover:border-[#38BDF8] transition-all"
                  >
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-[#7C3AED]/40"
                    />
                    <ChevronDown className="w-3 h-3 text-[#E9D5FF] mr-0.5" />
                  </button>

                  {isUserMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] bg-[#111836] rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] border-2 border-[#7C3AED]/50 py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-[#7C3AED]/30 bg-[#0B1026]/70">
                        <div className="font-black text-[#F8FAFC] truncate">{currentUser.name}</div>
                        <div className="text-[#E9D5FF]/70 text-[11px] font-bold truncate">{currentUser.email}</div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                            currentUser.role === 'seller' ? 'bg-[#1E1B4B] text-[#E9D5FF] border-[#7C3AED]/50' : 'bg-[#0C2454] text-[#38BDF8] border-[#38BDF8]/40'
                          }`}>
                            {currentUser.role} Account
                          </span>
                          <span className="text-[10px] font-bold text-[#E9D5FF]/60 capitalize">via {currentUser.provider}</span>
                        </div>
                      </div>

                      {currentUser.role === 'seller' ? (
                        <>
                          <button
                            id="menu-seller-dashboard-btn"
                            onClick={() => setActiveTab('seller_dashboard')}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1E1B4B] flex items-center gap-2.5 text-[#E9D5FF] hover:text-[#F8FAFC] font-bold"
                          >
                            <Store className="w-4 h-4 text-[#38BDF8]" />
                            <span>Manage Storefront & Inventory</span>
                          </button>
                          <button
                            id="menu-seller-switch-buyer-btn"
                            onClick={() => {
                              switchRole('buyer');
                              setActiveTab('explore');
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1E1B4B] flex items-center gap-2.5 text-[#E9D5FF] hover:text-[#F8FAFC] font-bold"
                          >
                            <UserIcon className="w-4 h-4 text-[#A855F7]" />
                            <span>Switch to Buyer Profile</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            id="menu-buyer-profile-btn"
                            onClick={() => setActiveTab('buyer_profile')}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1E1B4B] flex items-center gap-2.5 text-[#E9D5FF] hover:text-[#F8FAFC] font-bold"
                          >
                            <UserIcon className="w-4 h-4 text-[#38BDF8]" />
                            <span>Personal Profile & Measurements</span>
                          </button>
                          <button
                            id="menu-buyer-switch-seller-btn"
                            onClick={() => {
                              switchRole('seller');
                              setActiveTab('seller_dashboard');
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-[#1E1B4B] flex items-center gap-2.5 text-[#38BDF8] font-black"
                          >
                            <Store className="w-4 h-4 text-[#38BDF8]" />
                            <span>Switch to Seller Storefront</span>
                          </button>
                        </>
                      )}

                      <div className="border-t border-[#7C3AED]/30 my-1"></div>

                      <button
                        id="menu-platform-ledger-btn"
                        onClick={() => setIsPlatformLedgerOpen(true)}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#1E1B4B] flex items-center gap-2.5 text-[#E9D5FF] hover:text-[#F8FAFC] font-bold"
                      >
                        <DollarSign className="w-4 h-4 text-[#38BDF8]" />
                        <span>Platform Account (30% Share)</span>
                      </button>

                      <button
                        id="menu-logout-btn"
                        onClick={logout}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#7C3AED]/30 text-[#A855F7] hover:text-[#F8FAFC] flex items-center gap-2.5 font-black"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    id="nav-signin-buyer-btn"
                    onClick={() => {
                      setAuthModalInitialRole('buyer');
                      setIsAuthModalOpen(true);
                    }}
                    className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-black text-[#E9D5FF] hover:text-[#F8FAFC] rounded-full border border-[#7C3AED]/40 bg-[#131C3F] shadow-[0_0_10px_rgba(124,58,237,0.15)] hover:bg-[#1E1B4B] transition-all whitespace-nowrap"
                  >
                    Sign In
                  </button>
                  <button
                    id="nav-signup-seller-btn"
                    onClick={() => {
                      setAuthModalInitialRole('seller');
                      setIsAuthModalOpen(true);
                    }}
                    className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-black bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-full border border-[#A855F7]/50 shadow-[0_0_12px_rgba(124,58,237,0.35)] uppercase tracking-wider transition-all whitespace-nowrap"
                  >
                    Sell
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile / Tablet search input row */}
      {isMobileSearchOpen && (
        <div className="lg:hidden border-t border-[#7C3AED]/20 bg-[#0B1026] px-3 sm:px-6 py-2.5 animate-in slide-in-from-top-2 duration-150">
          <div className="relative w-full max-w-xl mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E9D5FF]/60 font-bold" />
            <input
              id="mobile-search-dresses-input"
              type="text"
              placeholder="Search silhouettes, fabrics, gala gowns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-16 py-2 bg-[#111836] text-xs text-[#F8FAFC] font-bold placeholder:text-[#94A3B8] rounded-xl border border-[#7C3AED]/40 focus:border-[#38BDF8] focus:outline-none"
            />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#38BDF8] hover:text-white"
              >
                CLEAR
              </button>
            ) : (
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#E9D5FF]/60 hover:text-white"
              >
                CLOSE
              </button>
            )}
          </div>
        </div>
      )}

      {/* Category Navigation Bar */}
      {activeTab === 'explore' && (
        <div className="border-t border-[#7C3AED]/30 bg-[#080D21] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 overflow-x-auto py-1 scrollbar-none no-scrollbar text-xs">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    id={`cat-btn-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full whitespace-nowrap font-black uppercase text-[11px] tracking-wide transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border border-[#A855F7] shadow-[0_0_15px_rgba(124,58,237,0.4)] -translate-y-0.5'
                        : 'bg-[#131C3F]/90 text-[#E9D5FF] border border-[#7C3AED]/30 hover:bg-[#1E1B4B] hover:text-[#F8FAFC] hover:border-[#38BDF8]/60'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
