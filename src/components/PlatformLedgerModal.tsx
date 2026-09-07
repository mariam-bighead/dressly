import React from 'react';
import { X, DollarSign, ShieldCheck, TrendingUp, PieChart, CheckCircle2, Lock, ArrowDownRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatNaira } from '../utils/currency';

interface PlatformLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlatformLedgerModal: React.FC<PlatformLedgerModalProps> = ({ isOpen, onClose }) => {
  const { orders, platformStats } = useShop();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1026]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#111836] rounded-[32px] shadow-[0_0_50px_rgba(124,58,237,0.35)] border-2 border-[#7C3AED]/40 overflow-hidden max-h-[92vh] flex flex-col text-[#F8FAFC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B1026] text-[#F8FAFC] p-4 sm:p-5 flex items-center justify-between border-b border-[#7C3AED]/30">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] flex items-center justify-center font-black shadow-[0_0_15px_rgba(124,58,237,0.4)] border border-[#A855F7]/50 shrink-0">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-black uppercase truncate">Platform Revenue Ledger</h2>
              <span className="text-[10px] sm:text-xs text-[#E9D5FF]/80 font-bold block">30% Platform Fee / 70% Seller Share</span>
            </div>
          </div>
          <button
            id="platform-ledger-close-btn"
            onClick={onClose}
            className="p-1.5 text-[#E9D5FF]/80 hover:text-white rounded-full hover:bg-white/10 transition-colors shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          
          {/* Revenue Allocation Explainer */}
          <div className="p-4 bg-[#131C3F] rounded-2xl border border-[#7C3AED]/40 text-xs text-[#F8FAFC] space-y-1.5 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
            <div className="font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-[#38BDF8]">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              <span>Commission Split Protocol (30% My Account / 70% Seller)</span>
            </div>
            <p className="text-[11px] text-[#E9D5FF]/80 font-medium leading-relaxed">
              In accordance with your platform rules, every time a dress seller sets a price tag and a buyer completes a transaction:
              <strong className="text-[#A855F7]"> 30% of the sale is automatically transferred into your platform account</strong>, and <strong className="text-[#38BDF8]">70% is routed to the seller's verified payout account</strong> upon delivery confirmation.
            </p>
          </div>

          {/* Aggregate Financial Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* My Account (30%) */}
            <div className="p-4 bg-[#131C3F] border border-[#7C3AED]/40 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-xs text-[#E9D5FF]/80 mb-1">
                <span className="font-black uppercase tracking-wider text-[10px]">My Account (30% Cut)</span>
                <DollarSign className="w-4 h-4 text-[#A855F7]" />
              </div>
              <div className="text-2xl font-black text-[#A855F7]">
                {formatNaira(platformStats.totalPlatformFee)}
              </div>
              <span className="text-[11px] text-[#E9D5FF]/70 font-bold block mt-1">Platform retained earnings</span>
            </div>

            {/* Seller Share (70%) */}
            <div className="p-4 bg-[#131C3F] border border-[#2563EB]/40 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-xs text-[#E9D5FF]/80 mb-1">
                <span className="font-black uppercase tracking-wider text-[10px]">Sellers Pool (70%)</span>
                <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <div className="text-2xl font-black text-[#38BDF8]">
                {formatNaira(platformStats.totalSellerPayout)}
              </div>
              <span className="text-[11px] text-[#E9D5FF]/70 font-bold block mt-1">Disbursed or in escrow hold</span>
            </div>

            {/* Total Gross Volume */}
            <div className="p-4 bg-[#0E1430] border border-[#7C3AED]/30 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-xs text-[#E9D5FF]/80 mb-1">
                <span className="font-black uppercase tracking-wider text-[10px]">Gross Volume</span>
                <PieChart className="w-4 h-4 text-[#E9D5FF]" />
              </div>
              <div className="text-2xl font-black text-[#F8FAFC]">
                {formatNaira(platformStats.totalGrossVolume)}
              </div>
              <span className="text-[11px] text-[#E9D5FF]/70 font-bold block mt-1">{platformStats.orderCount} total dress transactions</span>
            </div>

          </div>

          {/* Itemized Order Commission Ledger */}
          <div>
            <h3 className="text-base font-black uppercase text-[#F8FAFC] mb-3">
              Itemized Platform Share Ledger
            </h3>

            <div className="overflow-x-auto border border-[#7C3AED]/30 rounded-2xl shadow-sm">
              <table className="w-full text-left text-xs text-[#F8FAFC]">
                <thead className="bg-[#0E1430] text-[#E9D5FF] uppercase tracking-wider font-black border-b border-[#7C3AED]/30 text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Dress Silhouette</th>
                    <th className="py-3 px-4">Retail Price</th>
                    <th className="py-3 px-4 text-[#38BDF8]">Seller 70%</th>
                    <th className="py-3 px-4 text-[#A855F7]">My Share (30%)</th>
                    <th className="py-3 px-4">Escrow Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#7C3AED]/20 font-bold bg-[#111836]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#131C3F] transition-colors">
                      <td className="py-3 px-4 font-mono font-black text-[#38BDF8]">{ord.id}</td>
                      <td className="py-3 px-4">
                        <span className="font-black text-[#F8FAFC] line-clamp-1">{ord.items[0]?.product.title}</span>
                        <span className="text-[10px] text-[#E9D5FF]/60 font-bold">{ord.items[0]?.product.sellerName}</span>
                      </td>
                      <td className="py-3 px-4 font-black text-[#F8FAFC]">{formatNaira(ord.totalAmount)}</td>
                      <td className="py-3 px-4 font-black text-[#38BDF8]">{formatNaira(ord.sellerTotalShare)}</td>
                      <td className="py-3 px-4 font-black text-[#A855F7]">
                        +{formatNaira(ord.platformTotalShare)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#38BDF8] font-black px-2.5 py-0.5 rounded-full bg-[#1E1B4B] border border-[#38BDF8]/40">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>Cleared</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B1026] border-t border-[#7C3AED]/30 flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5 text-[#E9D5FF]/70 font-bold text-[11px]">
            <Lock className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Automated split execution on payment gateway authorization</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all hover:translate-y-0.5"
          >
            Close Ledger
          </button>
        </div>
      </div>
    </div>
  );
};
