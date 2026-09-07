import React, { useState } from 'react';
import { 
  Store, 
  Plus, 
  DollarSign, 
  Package, 
  Sparkles, 
  TrendingUp, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  AlertCircle,
  Truck,
  Image as ImageIcon,
  Tag,
  Scissors,
  Building2,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ArrowDownRight,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { DressProduct, DressCategory, DressSilhouette, DressLength } from '../types';
import { formatNaira } from '../utils/currency';
import { NIGERIAN_BANKS } from '../utils/banks';

export const SellerDashboard: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { dresses, orders, addDress, updateDress, deleteDress, setSelectedTrackingOrder } = useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Store Profile Edit States
  const [storeName, setStoreName] = useState(currentUser?.storeName || 'House of Deola Lagos');
  const [storeBio, setStoreBio] = useState(currentUser?.storeBio || 'Haute couture Nigerian gowns, Aso Ebi lace, and bespoke traditional wear handcrafted in Lagos.');
  const [storeBanner, setStoreBanner] = useState(currentUser?.storeBanner || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80');

  // Seller Direct Bank Payout Account States
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [payoutBankName, setPayoutBankName] = useState(currentUser?.payoutAccount?.bankName || 'First Bank of Nigeria');
  const [payoutAccountNumber, setPayoutAccountNumber] = useState(currentUser?.payoutAccount?.accountNumber || '3104928192');
  const [payoutAccountName, setPayoutAccountName] = useState(currentUser?.payoutAccount?.accountName || currentUser?.storeName || 'Atelier Laurent Couture Ltd');
  const [bankSaveSuccess, setBankSaveSuccess] = useState(false);

  const handleSavePayoutAccount = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const matchedBank = NIGERIAN_BANKS.find(b => b.name === payoutBankName);
    updateProfile({
      payoutAccount: {
        bankName: payoutBankName,
        accountNumber: payoutAccountNumber.replace(/\D/g, '').slice(0, 10),
        accountName: payoutAccountName,
        bankCode: matchedBank?.code || '011',
        bvnVerified: true,
        settlementSpeed: 'instant',
      }
    });
    setIsEditingBank(false);
    setBankSaveSuccess(true);
    setTimeout(() => setBankSaveSuccess(false), 3000);
  };

  // New Dress Form States
  const [dressTitle, setDressTitle] = useState('');
  const [category, setCategory] = useState<DressCategory>('Aso Ebi & Owambe');
  const [silhouette, setSilhouette] = useState<DressSilhouette>('Boubou & Kaftan');
  const [length, setLength] = useState<DressLength>('Floor-Length');
  const [fabric, setFabric] = useState('Hand-dyed Abeokuta Adire Silk & French Lace');
  const [priceInput, setPriceInput] = useState<string>('185000');
  const [description, setDescription] = useState('');
  const [detailsInput, setDetailsInput] = useState('Hand-rolled hem\nLined bodice\nConcealed zipper');
  const [careInstructions, setCareInstructions] = useState('Dry clean only.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['XS', 'S', 'M', 'L']);
  const [stockCount, setStockCount] = useState(10);

  // Edit Dress Price state
  const [editingPriceDressId, setEditingPriceDressId] = useState<string | null>(null);
  const [newPriceVal, setNewPriceVal] = useState<string>('');

  // Seller's specific dresses
  const sellerDresses = dresses.filter(d => 
    d.sellerId === currentUser?.id || d.sellerName.toLowerCase() === (currentUser?.storeName || '').toLowerCase() || d.sellerId === 'seller-1'
  );

  // Financial calculations
  const sellerOrders = orders.filter(ord => 
    ord.items.some(item => sellerDresses.some(sd => sd.id === item.product.id))
  );

  const totalGrossSales = sellerOrders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const sellerNetPayout70 = Number((totalGrossSales * 0.70).toFixed(2));
  const platformFee30 = Number((totalGrossSales * 0.30).toFixed(2));

  // Reactive 70/30 calculations for new dress input
  const numericPrice = parseFloat(priceInput) || 0;
  const computedSeller70 = Number((numericPrice * 0.70).toFixed(2));
  const computedPlatform30 = Number((numericPrice * 0.30).toFixed(2));

  const handleSaveProfile = () => {
    updateProfile({
      storeName,
      storeBio,
      storeBanner,
    });
    setIsEditingProfile(false);
  };

  const handleCreateDress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dressTitle || numericPrice <= 0) return;

    addDress({
      title: dressTitle,
      category,
      silhouette,
      length,
      fabric,
      price: numericPrice,
      sellerId: currentUser?.id || 'seller-1',
      sellerName: currentUser?.storeName || 'House of Deola Lagos',
      sellerRating: 5.0,
      sellerSalesCount: 1,
      description: description || `Handcrafted ${silhouette} cut in ${fabric}.`,
      details: detailsInput.split('\n').filter(Boolean),
      careInstructions: careInstructions || 'Dry clean only.',
      images: [imageUrl],
      sizes: selectedSizes.length > 0 ? selectedSizes : ['S', 'M'],
      colors: [
        { name: 'Onyx Noir', hex: '#18181b' },
        { name: 'Champagne Satin', hex: '#fef3c7' }
      ],
      stock: stockCount,
      featured: true,
    });

    setIsAddModalOpen(false);
    // Reset
    setDressTitle('');
    setPriceInput('280');
    setDescription('');
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#F8FAFC]">
      
      {/* Storefront Hero Banner */}
      <div className="relative rounded-[32px] overflow-hidden bg-[#111836] text-[#F8FAFC] shadow-[0_0_40px_rgba(124,58,237,0.25)] border border-[#7C3AED]/40">
        <div className="absolute inset-0 opacity-25">
          <img 
            src={currentUser?.storeBanner || storeBanner} 
            alt="Storefront Banner" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111836] via-[#111836]/70 to-transparent"></div>

        <div className="relative p-5 sm:p-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={currentUser?.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.5)] shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-[#A855F7]/50 shadow-sm">
                  <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                  <span>Verified Atelier Storefront</span>
                </span>
                <span className="text-xs text-[#E9D5FF]/80 font-bold capitalize">Connected via {currentUser?.provider || 'Facebook'}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black mt-1 text-[#F8FAFC] uppercase tracking-tight">
                {currentUser?.storeName || 'Atelier Laurent Paris'}
              </h1>
              
              <p className="text-xs sm:text-sm text-[#E9D5FF]/80 max-w-xl mt-1 leading-relaxed font-medium">
                {currentUser?.storeBio || 'Curating bespoke dresses, pure silks, and tailored silhouettes for modern elegance.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
            <button
              id="edit-storefront-profile-btn"
              onClick={() => setIsEditingProfile(true)}
              className="flex-1 md:flex-none justify-center px-4 py-2.5 rounded-2xl bg-[#131C3F] hover:bg-[#1E1B4B] text-[#F8FAFC] text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all border border-[#7C3AED]/40 shadow-sm hover:translate-y-0.5 text-center"
            >
              <Edit3 className="w-4 h-4 text-[#38BDF8]" />
              <span>Edit Storefront</span>
            </button>

            <button
              id="open-add-dress-modal-btn"
              onClick={() => setIsAddModalOpen(true)}
              className="flex-1 md:flex-none justify-center px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] text-xs font-black uppercase tracking-wider flex items-center gap-2 border border-[#A855F7]/50 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:translate-y-0.5 transition-all text-center"
            >
              <Plus className="w-4 h-4" />
              <span>List New Dress</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Edit Drawer / Form */}
      {isEditingProfile && (
        <div className="p-6 bg-[#111836] rounded-[32px] border border-[#7C3AED]/40 shadow-[0_0_30px_rgba(124,58,237,0.2)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#7C3AED]/30">
            <h3 className="text-lg font-black uppercase text-[#F8FAFC]">Edit Storefront Profile</h3>
            <button onClick={() => setIsEditingProfile(false)} className="text-[#E9D5FF]/70 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-black text-[#E9D5FF] uppercase text-[10px] mb-1">Storefront Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-black text-[#E9D5FF] uppercase text-[10px] mb-1">Banner Image URL</label>
              <input
                type="text"
                value={storeBanner}
                onChange={(e) => setStoreBanner(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-black text-[#E9D5FF] uppercase text-[10px] mb-1">Storefront Bio & Dress Specialty</label>
              <textarea
                rows={2}
                value={storeBio}
                onChange={(e) => setStoreBio(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 text-xs font-black uppercase text-[#E9D5FF]/60 hover:text-white"
            >
              Cancel
            </button>
            <button
              id="save-storefront-profile-btn"
              onClick={handleSaveProfile}
              className="px-5 py-2 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:translate-y-0.5"
            >
              Save Profile
            </button>
          </div>
        </div>
      )}

      {/* Revenue & Commission Analytics Cards (Mandatory 70/30 split) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Gross Dress Sales */}
        <div className="p-5 bg-[#111836] rounded-[24px] border border-[#7C3AED]/30 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#E9D5FF]/70 mb-2 font-black uppercase text-[10px]">
            <span>Gross Dress Volume</span>
            <TrendingUp className="w-4 h-4 text-[#A855F7]" />
          </div>
          <div className="text-3xl font-black text-[#F8FAFC]">{formatNaira(totalGrossSales)}</div>
          <span className="text-[11px] text-[#E9D5FF]/70 mt-1 block font-bold">From {sellerOrders.length} customer dress orders</span>
        </div>

        {/* 70% Seller Net Payout */}
        <div className="p-5 bg-[#131C3F] rounded-[24px] border border-[#2563EB]/40 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
          <div className="flex items-center justify-between text-xs text-[#38BDF8] mb-2 font-black">
            <span className="uppercase tracking-wider text-[10px]">Your Net Payout (70%)</span>
            <DollarSign className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="text-3xl font-black text-[#38BDF8]">{formatNaira(sellerNetPayout70)}</div>
          <span className="text-[11px] text-[#E9D5FF]/80 mt-1 block font-black">Guaranteed direct share to seller account</span>
        </div>

        {/* 30% Platform Fee Share */}
        <div className="p-5 bg-[#131C3F] rounded-[24px] border border-[#7C3AED]/40 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
          <div className="flex items-center justify-between text-xs text-[#A855F7] mb-2 font-black">
            <span className="uppercase tracking-wider text-[10px]">Platform Share (30%)</span>
            <DollarSign className="w-4 h-4 text-[#A855F7]" />
          </div>
          <div className="text-3xl font-black text-[#A855F7]">{formatNaira(platformFee30)}</div>
          <span className="text-[11px] text-[#E9D5FF]/80 mt-1 block font-bold">Escrow hold, fraud shield & DHL courier fleet</span>
        </div>

        {/* Active Dress Inventory */}
        <div className="p-5 bg-[#111836] rounded-[24px] border border-[#7C3AED]/30 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#E9D5FF]/70 mb-2 font-black uppercase text-[10px]">
            <span>Active Silhouettes</span>
            <Package className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="text-3xl font-black text-[#F8FAFC]">{sellerDresses.length} Listed</div>
          <span className="text-[11px] text-[#E9D5FF]/80 mt-1 block font-bold">Ready for immediate customer purchase</span>
        </div>

      </div>

      {/* Direct Bank Payout Account Management Card */}
      <div className="bg-[#111836] rounded-[32px] border border-[#7C3AED]/40 p-6 shadow-[0_0_30px_rgba(124,58,237,0.15)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#7C3AED]/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#1E1B4B] border border-[#7C3AED]/50">
              <Building2 className="w-6 h-6 text-[#38BDF8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black uppercase text-[#F8FAFC]">Direct Bank Payout Account</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1E1B4B] text-[#38BDF8] text-[10px] font-black uppercase border border-[#38BDF8]/40">
                  Direct Deposit Active
                </span>
              </div>
              <p className="text-xs text-[#E9D5FF]/70 font-bold mt-0.5">
                Buyer payments credit directly into this receiving bank account upon order authorization.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {bankSaveSuccess && (
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#38BDF8] bg-[#0C2340] px-3 py-1 rounded-full border border-[#38BDF8]/50">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Payout Account Saved!</span>
              </span>
            )}
            <button
              id="edit-seller-payout-bank-btn"
              onClick={() => setIsEditingBank(!isEditingBank)}
              className="px-4 py-2 bg-[#131C3F] hover:bg-[#1E1B4B] text-[#F8FAFC] rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-[#7C3AED]/40 shadow-sm transition-all hover:translate-y-0.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{isEditingBank ? 'Cancel' : 'Update Payout Account'}</span>
            </button>
          </div>
        </div>

        {isEditingBank ? (
          <form onSubmit={handleSavePayoutAccount} className="space-y-4 text-xs pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">Select Payout Bank</label>
                <select
                  value={payoutBankName}
                  onChange={(e) => setPayoutBankName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8]"
                >
                  {NIGERIAN_BANKS.map((bank) => (
                    <option key={bank.code} value={bank.name} className="bg-[#131C3F]">
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">10-Digit NUBAN Account Number</label>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="0123456789"
                  value={payoutAccountNumber}
                  onChange={(e) => setPayoutAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-mono font-black text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">Account Holder / Atelier Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Atelier Laurent Couture Ltd"
                  value={payoutAccountName}
                  onChange={(e) => setPayoutAccountName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-[11px] text-[#E9D5FF]/70 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                <span>CBN-licensed NIBSS instant settlement protocol • 100% Direct Deposited</span>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setIsEditingBank(false)}
                  className="px-4 py-2 text-xs font-black uppercase text-[#E9D5FF]/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="save-seller-bank-btn"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:translate-y-0.5 transition-all"
                >
                  Save & Activate Payout Account
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-4 bg-[#131C3F] border border-[#7C3AED]/30 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1E1B4B] border border-[#7C3AED]/50 flex items-center justify-center font-black text-[#38BDF8] shrink-0">
                <Landmark className="w-7 h-7 text-[#38BDF8]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-[#F8FAFC] text-base">{currentUser?.payoutAccount?.bankName || payoutBankName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#0C2340] text-[#38BDF8] text-[10px] font-black uppercase border border-[#38BDF8]/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>BVN & NUBAN Verified</span>
                  </span>
                </div>
                <div className="text-xs font-mono font-black text-[#E9D5FF]">
                  Account Number: {currentUser?.payoutAccount?.accountNumber ? `••••${currentUser.payoutAccount.accountNumber.slice(-4)} (${currentUser.payoutAccount.accountNumber})` : `••••${payoutAccountNumber.slice(-4)}`}
                </div>
                <div className="text-[11px] text-[#E9D5FF]/70 font-bold">
                  Beneficiary: {currentUser?.payoutAccount?.accountName || payoutAccountName}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2 md:pt-0 border-[#7C3AED]/20">
              <div className="text-left md:text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] text-xs font-black uppercase border border-[#A855F7]/50 shadow-sm">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Direct Credit Live</span>
                </span>
                <p className="text-[10px] text-[#E9D5FF]/60 font-bold mt-1">
                  100% of seller earnings land directly into this account
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Listings Section */}
      <div className="bg-[#111836] rounded-[32px] border border-[#7C3AED]/40 shadow-[0_0_30px_rgba(124,58,237,0.15)] overflow-hidden">
        <div className="p-6 border-b border-[#7C3AED]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#F8FAFC] uppercase">Your Storefront Dress Inventory</h2>
            <p className="text-xs text-[#E9D5FF]/70 font-bold mt-0.5">
              Each product automatically splits revenue: <strong className="text-[#38BDF8]">70% to you</strong>, <strong className="text-[#A855F7]">30% to platform account</strong>.
            </p>
          </div>

          <button
            id="table-list-new-dress-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-[#A855F7]/50 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Dress</span>
          </button>
        </div>

        {/* Inventory List */}
        <div className="divide-y divide-[#7C3AED]/20">
          {sellerDresses.length === 0 ? (
            <div className="p-10 text-center text-[#E9D5FF]/60 text-xs font-bold">
              No dresses listed yet. Click "List New Dress" to launch your first collection!
            </div>
          ) : (
            sellerDresses.map((dress) => (
              <div key={dress.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#131C3F] transition-colors">
                
                {/* Dress info */}
                <div className="flex items-center gap-4">
                  <img
                    src={dress.images[0]}
                    alt={dress.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover object-top rounded-xl border border-[#7C3AED]/40 shadow-sm shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1E1B4B] text-[#38BDF8] text-[10px] font-black uppercase border border-[#38BDF8]/40">
                        {dress.category}
                      </span>
                      <span className="text-[10px] text-[#E9D5FF]/70 font-black">
                        {dress.silhouette} • {dress.length}
                      </span>
                    </div>

                    <h3 className="font-black text-[#F8FAFC] text-base mt-1">
                      {dress.title}
                    </h3>
                    <p className="text-xs text-[#E9D5FF]/70 line-clamp-1 font-medium">{dress.fabric}</p>

                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] text-[#E9D5FF] font-black">Sizes:</span>
                      {dress.sizes.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-lg bg-[#131C3F] border border-[#7C3AED]/30 text-[10px] font-black text-[#F8FAFC]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & 70/30 split controls */}
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  
                  {/* Price Tag with 70% / 30% calculation */}
                  <div className="text-right">
                    {editingPriceDressId === dress.id ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#38BDF8]">₦</span>
                        <input
                          type="number"
                          value={newPriceVal}
                          onChange={(e) => setNewPriceVal(e.target.value)}
                          className="w-24 px-2 py-1 text-xs border border-[#7C3AED]/40 bg-[#131C3F] font-black rounded-lg text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8]"
                        />
                        <button
                          onClick={() => {
                            if (parseFloat(newPriceVal) > 0) {
                              updateDress(dress.id, { price: parseFloat(newPriceVal) });
                            }
                            setEditingPriceDressId(null);
                          }}
                          className="p-1.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white rounded-lg border border-[#A855F7]/50"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingPriceDressId(null)}
                          className="p-1.5 bg-[#131C3F] text-[#F8FAFC] border border-[#7C3AED]/40 rounded-lg"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="text-xl font-black text-[#F8FAFC]">{formatNaira(dress.price)}</span>
                          <button
                            onClick={() => {
                              setEditingPriceDressId(dress.id);
                              setNewPriceVal(dress.price.toString());
                            }}
                            title="Edit price tag"
                            className="text-[#E9D5FF]/60 hover:text-[#38BDF8] p-0.5 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Explicit split preview */}
                        <div className="text-[11px] space-x-2 font-black">
                          <span className="text-[#38BDF8]">
                            You get (70%): {formatNaira(dress.sellerShare)}
                          </span>
                          <span className="text-[#7C3AED]/40">|</span>
                          <span className="text-[#A855F7]">
                            Platform (30%): {formatNaira(dress.platformShare)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => deleteDress(dress.id)}
                      className="p-2 text-[#E9D5FF]/60 hover:text-[#38BDF8] hover:bg-[#131C3F] rounded-xl transition-colors"
                      title="Delete Dress Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>
      </div>

      {/* Customer Dress Orders Table */}
      <div className="bg-[#111836] rounded-[32px] border border-[#7C3AED]/40 shadow-[0_0_30px_rgba(124,58,237,0.15)] overflow-hidden">
        <div className="p-6 border-b border-[#7C3AED]/30">
          <h2 className="text-2xl font-black text-[#F8FAFC] uppercase">Recent Customer Dress Orders</h2>
          <p className="text-xs font-bold text-[#E9D5FF]/70 mt-0.5">
            Track fulfillment, tailoring progress, and real-time courier dispatch status.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#F8FAFC]">
            <thead className="bg-[#0E1430] text-[#E9D5FF] uppercase tracking-wider font-black border-b border-[#7C3AED]/30 text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Dress Item</th>
                <th className="py-3.5 px-4">Gross Total</th>
                <th className="py-3.5 px-4 text-[#38BDF8]">Seller Net (70%)</th>
                <th className="py-3.5 px-4 text-[#A855F7]">Platform (30%)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Real-Time Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7C3AED]/20 bg-[#111836]">
              {sellerOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#131C3F] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-black text-[#38BDF8]">{ord.id}</td>
                  <td className="py-3.5 px-4 font-bold text-[#F8FAFC]">{ord.buyerName}</td>
                  <td className="py-3.5 px-4">
                    <span className="line-clamp-1 font-bold text-[#F8FAFC]">{ord.items[0]?.product.title}</span>
                    <span className="text-[10px] text-[#E9D5FF]/60 font-bold">Size {ord.items[0]?.selectedSize}</span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#F8FAFC]">{formatNaira(ord.totalAmount)}</td>
                  <td className="py-3.5 px-4 font-black text-[#38BDF8]">{formatNaira(ord.sellerTotalShare)}</td>
                  <td className="py-3.5 px-4 font-black text-[#A855F7]">{formatNaira(ord.platformTotalShare)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                      ord.status === 'delivered' 
                        ? 'bg-[#1E1B4B] text-[#38BDF8] border-[#38BDF8]/40' 
                        : 'bg-[#131C3F] text-[#A855F7] border-[#7C3AED]/40'
                    }`}>
                      {ord.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedTrackingOrder(ord)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl font-black text-[11px] uppercase border border-[#A855F7]/50 shadow-sm transition-all inline-flex items-center gap-1.5 hover:translate-y-0.5"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>Live Tracker</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: List New Dress (with interactive 70% Seller / 30% Platform Split) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1026]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl bg-[#111836] rounded-[32px] shadow-[0_0_50px_rgba(124,58,237,0.35)] border-2 border-[#7C3AED]/40 overflow-hidden max-h-[92vh] flex flex-col text-[#F8FAFC]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0B1026] text-[#F8FAFC] p-5 px-6 flex items-center justify-between border-b border-[#7C3AED]/30">
              <div>
                <h2 className="text-xl font-black uppercase">List a New Designer Dress</h2>
                <span className="text-[11px] text-[#E9D5FF]/80 font-bold">Atelier Catalog Listing Form</span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-[#E9D5FF]/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateDress} className="overflow-y-auto p-6 space-y-5 text-xs">
              
              {/* Mandatory 70/30 Split Reactive Box */}
              <div className="p-4 bg-[#131C3F] rounded-2xl border border-[#7C3AED]/40 space-y-2 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                <div className="flex items-center gap-1.5 font-black text-[#38BDF8]">
                  <DollarSign className="w-4 h-4 text-[#38BDF8]" />
                  <span>Real-Time 70% / 30% Share Calculation</span>
                </div>
                <p className="text-[11px] text-[#E9D5FF]/80 font-medium">
                  As required by marketplace terms, when you set your price tag: <strong className="text-[#38BDF8]">70% goes directly to your seller payout</strong>, and <strong className="text-[#A855F7]">30% goes to the platform account</strong> for secure buyer escrow and live delivery fleet tracking.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                  <div className="bg-[#0E1430] p-2.5 rounded-xl border border-[#7C3AED]/30 shadow-sm">
                    <span className="text-[10px] text-[#E9D5FF]/70 block uppercase font-bold">Your Retail Price</span>
                    <strong className="text-base text-[#F8FAFC] font-black">{formatNaira(numericPrice)}</strong>
                  </div>
                  <div className="bg-[#0E1430] p-2.5 rounded-xl border border-[#2563EB]/40 shadow-sm">
                    <span className="text-[10px] text-[#38BDF8] block uppercase font-black">Seller Gets (70%)</span>
                    <strong className="text-base text-[#38BDF8] font-black">{formatNaira(computedSeller70)}</strong>
                  </div>
                  <div className="bg-[#0E1430] p-2.5 rounded-xl border border-[#7C3AED]/40 shadow-sm">
                    <span className="text-[10px] text-[#A855F7] block uppercase font-black">Platform Account (30%)</span>
                    <strong className="text-base text-[#A855F7] font-black">{formatNaira(computedPlatform30)}</strong>
                  </div>
                </div>
              </div>

              {/* Title & Price input */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-black uppercase text-[10px] text-[#E9D5FF] mb-1">Dress Title / Model Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Valerie Draped Mulberry Silk Slip"
                    value={dressTitle}
                    onChange={(e) => setDressTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-black uppercase text-[10px] text-[#E9D5FF] mb-1">Retail Price (₦ NGN)</label>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="1000"
                    placeholder="185000"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none font-black text-[#F8FAFC]"
                  />
                </div>
              </div>

              {/* Category, Silhouette, Length */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-black uppercase text-[10px] text-[#E9D5FF] mb-1">Dress Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DressCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC]"
                  >
                    <option className="bg-[#131C3F]">Aso Ebi & Owambe</option>
                    <option className="bg-[#131C3F]">Ankara & Wax Prints</option>
                    <option className="bg-[#131C3F]">Rich Boubou & Kaftans</option>
                    <option className="bg-[#131C3F]">Adire & Heritage Silk</option>
                    <option className="bg-[#131C3F]">Bridal & Traditional Wedding</option>
                    <option className="bg-[#131C3F]">Evening & Gala</option>
                    <option className="bg-[#131C3F]">Cocktail & Party</option>
                    <option className="bg-[#131C3F]">Silk & Slip</option>
                    <option className="bg-[#131C3F]">Summer & Linen</option>
                    <option className="bg-[#131C3F]">Daywear & Casual</option>
                    <option className="bg-[#131C3F]">Vintage & Retro</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black uppercase text-[10px] text-[#E9D5FF] mb-1">Silhouette Cut</label>
                  <select
                    value={silhouette}
                    onChange={(e) => setSilhouette(e.target.value as DressSilhouette)}
                    className="w-full px-3 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC]"
                  >
                    <option className="bg-[#131C3F]">Boubou & Kaftan</option>
                    <option className="bg-[#131C3F]">Corset & Peplum</option>
                    <option className="bg-[#131C3F]">Mermaid</option>
                    <option className="bg-[#131C3F]">A-Line</option>
                    <option className="bg-[#131C3F]">Slip Dress</option>
                    <option className="bg-[#131C3F]">Wrap Dress</option>
                    <option className="bg-[#131C3F]">Column</option>
                    <option className="bg-[#131C3F]">Fit & Flare</option>
                    <option className="bg-[#131C3F]">Shift</option>
                    <option className="bg-[#131C3F]">Empire</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black uppercase text-[10px] text-[#E9D5FF] mb-1">Dress Length</label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value as DressLength)}
                    className="w-full px-3 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC]"
                  >
                    <option className="bg-[#131C3F]">Mini</option>
                    <option className="bg-[#131C3F]">Midi</option>
                    <option className="bg-[#131C3F]">Maxi</option>
                    <option className="bg-[#131C3F]">Floor-Length</option>
                  </select>
                </div>
              </div>

              {/* Fabric & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-black uppercase text-[10px] text-[#E9D5FF] mb-1">Fabric Composition</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 100% 22-Momme Mulberry Silk, French Chiffon"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-black uppercase text-[10px] text-[#E9D5FF] mb-1">Inventory Quantity</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={stockCount}
                    onChange={(e) => setStockCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                  />
                </div>
              </div>

              {/* Available Sizes Checklist */}
              <div>
                <label className="block font-black uppercase text-[10px] text-[#E9D5FF] mb-1.5">Available Sizing</label>
                <div className="flex gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => toggleSize(sz)}
                      className={`px-3 py-1.5 rounded-xl border font-black text-xs transition-all ${
                        selectedSizes.includes(sz)
                          ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border-[#A855F7]/50 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                          : 'bg-[#131C3F] text-[#E9D5FF] border-[#7C3AED]/30 hover:bg-[#1E1B4B]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* High-res Image URL */}
              <div>
                <label className="block font-black uppercase text-[10px] text-[#E9D5FF] mb-1">Product Photograph (URL)</label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                />

                {/* Quick preset selector */}
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] font-black text-[#E9D5FF]">Quick Presets:</span>
                  <button
                    type="button"
                    onClick={() => setImageUrl('https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80')}
                    className="text-[10px] font-bold text-[#38BDF8] hover:underline"
                  >
                    Emerald Silk
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl('https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80')}
                    className="text-[10px] font-bold text-[#38BDF8] hover:underline"
                  >
                    Broderie Midi
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl('https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80')}
                    className="text-[10px] font-bold text-[#38BDF8] hover:underline"
                  >
                    Onyx Cocktail
                  </button>
                </div>
              </div>

              {/* Description & Care */}
              <div>
                <label className="block font-black uppercase text-[10px] text-[#E9D5FF] mb-1">Silhouette Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe the cut, draping, and styling advice..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                />
              </div>

              {/* Modal Submit Actions */}
              <div className="pt-4 border-t border-[#7C3AED]/30 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-black uppercase text-[#E9D5FF]/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  id="submit-create-dress-btn"
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-2xl text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:translate-y-0.5 transition-all"
                >
                  Publish Dress to Marketplace
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
