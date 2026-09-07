import React from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw, Heart, DollarSign } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setIsPlatformLedgerOpen } = useShop();

  return (
    <footer className="bg-[#0B1026] text-[#F8FAFC] border-t border-[#7C3AED]/30 mt-20">
      
      {/* Value pillars banner */}
      <div className="border-b border-[#7C3AED]/20 bg-[#0E1430]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#131C3F] text-[#F8FAFC] p-4 rounded-2xl border border-[#7C3AED]/40 shadow-[0_0_20px_rgba(124,58,237,0.15)] flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1E1B4B] border border-[#7C3AED]/50 flex items-center justify-center text-[#38BDF8] shrink-0 font-black">
                <DollarSign className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <div>
                <h4 className="font-black text-xs uppercase text-[#F8FAFC]">70% Direct to Artisan</h4>
                <p className="text-[11px] font-bold text-[#E9D5FF]/80 mt-0.5">
                  Fair dressmaker economics: sellers receive 70% of every sale; 30% goes to platform escrow.
                </p>
              </div>
            </div>

            <div className="bg-[#131C3F] text-[#F8FAFC] p-4 rounded-2xl border border-[#38BDF8]/40 shadow-[0_0_20px_rgba(56,189,248,0.15)] flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0C2340] border border-[#38BDF8]/50 flex items-center justify-center text-[#38BDF8] shrink-0 font-black">
                <Truck className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <div>
                <h4 className="font-black text-xs uppercase text-[#F8FAFC]">Real-Time GPS Tracking</h4>
                <p className="text-[11px] font-bold text-[#E9D5FF]/80 mt-0.5">
                  Live courier GPS coordinates, flight dispatch status, and atelier tailoring milestones.
                </p>
              </div>
            </div>

            <div className="bg-[#131C3F] text-[#F8FAFC] p-4 rounded-2xl border border-[#7C3AED]/40 shadow-[0_0_20px_rgba(124,58,237,0.15)] flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1E1B4B] border border-[#7C3AED]/50 flex items-center justify-center text-[#A855F7] shrink-0 font-black">
                <ShieldCheck className="w-5 h-5 text-[#A855F7]" />
              </div>
              <div>
                <h4 className="font-black text-xs uppercase text-[#F8FAFC]">Secure Payment Gateways</h4>
                <p className="text-[11px] font-bold text-[#E9D5FF]/80 mt-0.5">
                  Apple Pay, Google Pay, Visa, Mastercard, and Direct Bank Transfer protected with 256-bit SSL.
                </p>
              </div>
            </div>

            <div className="bg-[#131C3F] text-[#F8FAFC] p-4 rounded-2xl border border-[#38BDF8]/40 shadow-[0_0_20px_rgba(56,189,248,0.15)] flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0C2340] border border-[#38BDF8]/50 flex items-center justify-center text-[#38BDF8] shrink-0 font-black">
                <RotateCcw className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <div>
                <h4 className="font-black text-xs uppercase text-[#F8FAFC]">Custom Fit Guarantee</h4>
                <p className="text-[11px] font-bold text-[#E9D5FF]/80 mt-0.5">
                  Complimentary sizing adjustments and custom tailored alterations for every silhouette.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#2563EB] border border-[#A855F7]/50 text-white flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                D
              </div>
              <span className="text-2xl font-black text-white uppercase tracking-tight">
                Dress.ly
              </span>
            </div>

            <p className="text-xs text-[#E9D5FF]/80 font-medium leading-relaxed max-w-sm">
              Nigeria's premier atelier marketplace uniting independent Nigerian fashion designers, bespoke couture dressmakers, and global buyers with transparent 70/30 commission splits and live nationwide courier tracking.
            </p>

            <div className="pt-1">
              <button
                onClick={() => setIsPlatformLedgerOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] font-black text-xs uppercase tracking-wider rounded-xl border border-[#A855F7]/60 shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center gap-1.5 transition-all active:translate-y-0.5"
              >
                <DollarSign className="w-4 h-4 text-[#38BDF8]" />
                <span>View Platform 30% Account Ledger</span>
              </button>
            </div>
          </div>

          {/* Silhouettes */}
          <div className="space-y-3 text-xs">
            <h5 className="font-black text-[#A855F7] uppercase tracking-wider text-xs">Nigerian Silhouettes</h5>
            <ul className="space-y-2 text-[#E9D5FF]/75 font-bold">
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Rich Silk Boubou & Kaftan</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Aso Ebi Corset & Mermaid</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Ankara Peplum & Flute</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Adire Silk Wrap Dress</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Traditional Bridal Reception</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Contemporary Gala Gowns</li>
            </ul>
          </div>

          {/* Marketplace Roles */}
          <div className="space-y-3 text-xs">
            <h5 className="font-black text-[#38BDF8] uppercase tracking-wider text-xs">Storefront & Accounts</h5>
            <ul className="space-y-2 text-[#E9D5FF]/75 font-bold">
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Sign Up as Nigerian Fashion Atelier</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Sign in with Facebook</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Sign in with Google / Apple</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">70% Seller Payout Policy</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Buyer Fit & Measurement Passport</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Real-Time Nigeria Courier Tracking</li>
            </ul>
          </div>

          {/* Fabrics & Guarantee */}
          <div className="space-y-3 text-xs">
            <h5 className="font-black text-[#E9D5FF] uppercase tracking-wider text-xs">Artisanal Fabrics</h5>
            <ul className="space-y-2 text-[#E9D5FF]/75 font-bold">
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Abeokuta Indigo Adire Silk</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Dutch Wax Premium Ankara</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Hand-Woven Royal Aso-Oke</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Swiss & French Cord Lace</li>
              <li className="hover:text-[#38BDF8] cursor-pointer transition-colors">Embroidered Velvet & Brocade</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-[#7C3AED]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E9D5FF]/60 font-bold gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Dress.ly Atelier Marketplace. All rights reserved.</p>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-4 text-[#E9D5FF]/70 text-[11px] sm:text-xs">
            <span>Secure 256-bit SSL</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#38BDF8]">Real-time GPS Carrier Integration</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#A855F7]">70% Seller / 30% Platform Escrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
