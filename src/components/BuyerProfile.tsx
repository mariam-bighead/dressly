import React, { useState } from 'react';
import { 
  User as UserIcon, 
  MapPin, 
  Package, 
  Heart, 
  Ruler, 
  Truck, 
  Edit3, 
  Sparkles, 
  Check, 
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Building2,
  Landmark,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { formatNaira } from '../utils/currency';
import { NIGERIAN_BANKS } from '../utils/banks';

export const BuyerProfile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { orders, wishlist, dresses, setSelectedTrackingOrder, addToCart } = useShop();

  const [isEditingMeasurements, setIsEditingMeasurements] = useState(false);
  const [bust, setBust] = useState(currentUser?.measurements?.bust || '34B');
  const [waist, setWaist] = useState(currentUser?.measurements?.waist || '27 in');
  const [hips, setHips] = useState(currentUser?.measurements?.hips || '38 in');
  const [height, setHeight] = useState(currentUser?.measurements?.height || "5'7\"");
  const [preferredSize, setPreferredSize] = useState(currentUser?.measurements?.preferredSize || 'S');

  // Address edit state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [street, setStreet] = useState(currentUser?.shippingAddress?.street || '14 Alexander Avenue, Ikoyi');
  const [city, setCity] = useState(currentUser?.shippingAddress?.city || 'Lagos');
  const [state, setState] = useState(currentUser?.shippingAddress?.state || 'Lagos State');
  const [zip, setZip] = useState(currentUser?.shippingAddress?.zip || '101233');

  // Bank Account edit state (Buyer direct payment account)
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [buyerBankName, setBuyerBankName] = useState(currentUser?.buyerAccount?.bankName || 'Guaranty Trust Bank (GTBank)');
  const [buyerAccountNumber, setBuyerAccountNumber] = useState(currentUser?.buyerAccount?.accountNumber || '0129481920');
  const [buyerAccountName, setBuyerAccountName] = useState(currentUser?.buyerAccount?.accountName || currentUser?.name || 'Sophia Sterling');
  const [bankSaveSuccess, setBankSaveSuccess] = useState(false);

  const buyerOrders = orders.filter(
    ord => ord.buyerId === currentUser?.id || ord.buyerEmail === currentUser?.email || ord.buyerName === currentUser?.name
  );

  const wishlistedDresses = dresses.filter(d => wishlist.includes(d.id));

  const handleSaveMeasurements = () => {
    updateProfile({
      measurements: { bust, waist, hips, height, preferredSize }
    });
    setIsEditingMeasurements(false);
  };

  const handleSaveAddress = () => {
    updateProfile({
      shippingAddress: {
        street,
        city,
        state,
        zip,
        country: 'Nigeria'
      }
    });
    setIsEditingAddress(false);
  };

  const handleSaveBankAccount = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const matchedBank = NIGERIAN_BANKS.find(b => b.name === buyerBankName);
    updateProfile({
      buyerAccount: {
        bankName: buyerBankName,
        accountNumber: buyerAccountNumber.replace(/\D/g, '').slice(0, 10),
        accountName: buyerAccountName,
        bankCode: matchedBank?.code || '058',
        bvnVerified: true,
        settlementSpeed: 'instant',
      }
    });
    setIsEditingBank(false);
    setBankSaveSuccess(true);
    setTimeout(() => setBankSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#F8FAFC]">
      
      {/* Profile Header */}
      <div className="bg-[#111836] rounded-[32px] border border-[#7C3AED]/40 p-5 sm:p-8 shadow-[0_0_40px_rgba(124,58,237,0.2)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'}
            alt={currentUser?.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.4)] shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#F8FAFC]">
                {currentUser?.name || 'Sophia Sterling'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] text-[10px] font-black uppercase border border-[#A855F7]/50">
                Buyer Member
              </span>
            </div>
            <p className="text-xs text-[#E9D5FF]/70 font-bold mt-0.5">{currentUser?.email}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-[#E9D5FF]/80 font-bold">
              <span className="capitalize">Signed in via {currentUser?.provider || 'Facebook'}</span>
              <span>•</span>
              <span>Member since {currentUser?.joinedDate || '2024'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none p-3 bg-[#131C3F] rounded-2xl border border-[#7C3AED]/40 shadow-sm text-center min-w-[90px]">
            <span className="text-[#E9D5FF]/70 block uppercase tracking-wider text-[10px] font-black">Dress Orders</span>
            <span className="text-xl font-black text-[#38BDF8]">{buyerOrders.length}</span>
          </div>
          <div className="flex-1 sm:flex-none p-3 bg-[#131C3F] rounded-2xl border border-[#7C3AED]/40 shadow-sm text-center min-w-[90px]">
            <span className="text-[#E9D5FF]/70 block uppercase tracking-wider text-[10px] font-black">Saved Dresses</span>
            <span className="text-xl font-black text-[#A855F7]">{wishlist.length}</span>
          </div>
        </div>
      </div>

      {/* Dress Sizing Profile & Shipping Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Dress Sizing & Fit Passport */}
        <div className="bg-[#111836] rounded-[32px] border border-[#7C3AED]/40 p-6 shadow-[0_0_30px_rgba(124,58,237,0.15)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#7C3AED]/30">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#38BDF8]" />
              <div>
                <h3 className="text-lg font-black uppercase text-[#F8FAFC]">Dress Sizing Passport</h3>
                <span className="text-[11px] text-[#E9D5FF]/70 font-bold">Tailoring & silhouette fit preference</span>
              </div>
            </div>

            <button
              id="edit-measurements-btn"
              onClick={() => setIsEditingMeasurements(!isEditingMeasurements)}
              className="text-xs font-black uppercase text-[#38BDF8] hover:text-[#A855F7] flex items-center gap-1 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingMeasurements ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {isEditingMeasurements ? (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">Bust Measurement</label>
                  <input
                    type="text"
                    value={bust}
                    onChange={(e) => setBust(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">Waist Measurement</label>
                  <input
                    type="text"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">Hips Measurement</label>
                  <input
                    type="text"
                    value={hips}
                    onChange={(e) => setHips(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">Preferred Size</label>
                  <select
                    value={preferredSize}
                    onChange={(e) => setPreferredSize(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC]"
                  >
                    <option className="bg-[#131C3F]">XS</option>
                    <option className="bg-[#131C3F]">S</option>
                    <option className="bg-[#131C3F]">M</option>
                    <option className="bg-[#131C3F]">L</option>
                    <option className="bg-[#131C3F]">XL</option>
                  </select>
                </div>
              </div>
              <button
                id="save-measurements-btn"
                onClick={handleSaveMeasurements}
                className="w-full py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_20px_rgba(124,58,237,0.3)] mt-2 transition-all hover:translate-y-0.5"
              >
                Save Measurements
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#131C3F] border border-[#7C3AED]/30 rounded-2xl">
                <span className="text-[10px] text-[#E9D5FF]/60 uppercase font-black block">Preferred Size</span>
                <span className="font-black text-[#38BDF8] text-lg">{currentUser?.measurements?.preferredSize || 'S'}</span>
              </div>
              <div className="p-3 bg-[#131C3F] border border-[#7C3AED]/30 rounded-2xl">
                <span className="text-[10px] text-[#E9D5FF]/60 uppercase font-black block">Bust</span>
                <span className="font-black text-[#F8FAFC] text-sm">{currentUser?.measurements?.bust || '34B'}</span>
              </div>
              <div className="p-3 bg-[#131C3F] border border-[#7C3AED]/30 rounded-2xl">
                <span className="text-[10px] text-[#E9D5FF]/60 uppercase font-black block">Waist</span>
                <span className="font-black text-[#F8FAFC] text-sm">{currentUser?.measurements?.waist || '26 in'}</span>
              </div>
              <div className="p-3 bg-[#131C3F] border border-[#7C3AED]/30 rounded-2xl">
                <span className="text-[10px] text-[#E9D5FF]/60 uppercase font-black block">Hips</span>
                <span className="font-black text-[#F8FAFC] text-sm">{currentUser?.measurements?.hips || '37 in'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Address Book */}
        <div className="bg-[#111836] rounded-[32px] border border-[#7C3AED]/40 p-6 shadow-[0_0_30px_rgba(124,58,237,0.15)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#7C3AED]/30">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#38BDF8]" />
              <div>
                <h3 className="text-lg font-black uppercase text-[#F8FAFC]">Delivery Address</h3>
                <span className="text-[11px] text-[#E9D5FF]/70 font-bold">Destination for GIGL & DHL Express Nigeria Courier</span>
              </div>
            </div>

            <button
              id="edit-address-btn"
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="text-xs font-black uppercase text-[#38BDF8] hover:text-[#A855F7] flex items-center gap-1 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingAddress ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {isEditingAddress ? (
            <div className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Street Address, Area / Estate"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC]"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="City (e.g. Lagos)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC]"
                />
                <input
                  type="text"
                  placeholder="State (e.g. Lagos State)"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC]"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC]"
                />
              </div>
              <button
                id="save-address-btn"
                onClick={handleSaveAddress}
                className="w-full py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_20px_rgba(124,58,237,0.3)] mt-2 transition-all hover:translate-y-0.5"
              >
                Save Shipping Address
              </button>
            </div>
          ) : (
            <div className="p-4 bg-[#131C3F] border border-[#7C3AED]/30 rounded-2xl text-xs text-[#F8FAFC] space-y-1 shadow-sm">
              <span className="font-black text-[#F8FAFC] block text-sm">{currentUser?.name || 'Chioma Adeleke'}</span>
              <p className="font-bold text-[#E9D5FF]/80">{currentUser?.shippingAddress?.street || '14 Alexander Avenue, Ikoyi'}</p>
              <p className="font-bold text-[#E9D5FF]/80">
                {currentUser?.shippingAddress?.city || 'Lagos'}, {currentUser?.shippingAddress?.state || 'Lagos State'} {currentUser?.shippingAddress?.zip || '101233'}, Nigeria
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#38BDF8] font-black pt-1">
                <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Verified Direct Courier Route (Nigeria)</span>
              </span>
            </div>
          )}
        </div>

        {/* Buyer Direct Bank Payment Account Card */}
        <div className="bg-[#111836] rounded-[32px] border border-[#7C3AED]/40 p-6 shadow-[0_0_30px_rgba(124,58,237,0.15)] space-y-4 md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#7C3AED]/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#1E1B4B] border border-[#7C3AED]/50">
                <Building2 className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black uppercase text-[#F8FAFC]">Direct Payment Bank Account (NUBAN)</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#1E1B4B] text-[#38BDF8] text-[10px] font-black uppercase border border-[#38BDF8]/40">
                    Instant Direct Pay
                  </span>
                </div>
                <span className="text-[11px] text-[#E9D5FF]/70 font-bold">
                  Funds debit directly from this account to pay into the seller's verified bank account
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {bankSaveSuccess && (
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#38BDF8] bg-[#0C2340] px-3 py-1 rounded-full border border-[#38BDF8]/50">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Account Saved!</span>
                </span>
              )}
              <button
                id="edit-buyer-bank-btn"
                onClick={() => setIsEditingBank(!isEditingBank)}
                className="text-xs font-black uppercase text-[#38BDF8] hover:text-[#A855F7] flex items-center gap-1 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingBank ? 'Cancel' : 'Update Account'}</span>
              </button>
            </div>
          </div>

          {isEditingBank ? (
            <form onSubmit={handleSaveBankAccount} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">Your Bank Name</label>
                  <select
                    value={buyerBankName}
                    onChange={(e) => setBuyerBankName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8]"
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
                    value={buyerAccountNumber}
                    onChange={(e) => setBuyerAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full px-3 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-mono font-black text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">Account Holder Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sophia Sterling"
                    value={buyerAccountName}
                    onChange={(e) => setBuyerAccountName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[11px] text-[#E9D5FF]/70 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                  <span>Verified with Central Bank of Nigeria / NIBSS direct settlement</span>
                </div>
                <button
                  type="submit"
                  id="save-buyer-bank-btn"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:translate-y-0.5 transition-all"
                >
                  Save Payment Account
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-[#131C3F] border border-[#7C3AED]/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1E1B4B] border border-[#7C3AED]/50 flex items-center justify-center font-black text-sm text-[#38BDF8]">
                  <Landmark className="w-6 h-6 text-[#38BDF8]" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#F8FAFC] text-base">{currentUser?.buyerAccount?.bankName || buyerBankName}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#0C2340] text-[#38BDF8] text-[10px] font-black uppercase border border-[#38BDF8]/40">
                      BVN Verified
                    </span>
                  </div>
                  <div className="text-xs font-mono font-black text-[#E9D5FF]">
                    Account: {currentUser?.buyerAccount?.accountNumber ? `••••${currentUser.buyerAccount.accountNumber.slice(-4)} (${currentUser.buyerAccount.accountNumber})` : `••••${buyerAccountNumber.slice(-4)}`}
                  </div>
                  <div className="text-[11px] text-[#E9D5FF]/70 font-bold">
                    Account Name: {currentUser?.buyerAccount?.accountName || buyerAccountName}
                  </div>
                </div>
              </div>

              <div className="text-right sm:text-right w-full sm:w-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] text-xs font-black uppercase border border-[#A855F7]/50">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Ready for Direct Checkout</span>
                </span>
                <p className="text-[10px] text-[#E9D5FF]/60 font-bold mt-1">
                  Settles directly into sellers' bank accounts
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Buyer Orders & Real-time Live Tracking Link */}
      <div className="bg-[#111836] rounded-[32px] border border-[#7C3AED]/40 p-6 sm:p-8 shadow-[0_0_30px_rgba(124,58,237,0.15)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#7C3AED]/30">
          <div>
            <h2 className="text-2xl font-black uppercase text-[#F8FAFC]">Your Dress Orders & Live Tracking</h2>
            <p className="text-xs font-bold text-[#E9D5FF]/70 mt-0.5">
              Click "Track Order Live" to view real-time GPS courier checkpoints.
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#7C3AED]/20">
          {buyerOrders.length === 0 ? (
            <div className="py-8 text-center text-xs font-bold text-[#E9D5FF]/60">
              You haven't placed any dress orders yet. Explore our designer atelier collection!
            </div>
          ) : (
            buyerOrders.map((ord) => (
              <div key={ord.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={ord.items[0]?.product.images[0]}
                    alt="Dress item"
                    referrerPolicy="no-referrer"
                    className="w-14 h-18 object-cover object-top rounded-xl border border-[#7C3AED]/40 shadow-sm shrink-0"
                  />
                  <div className="text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-[#38BDF8]">{ord.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                        ord.status === 'delivered' 
                          ? 'bg-[#1E1B4B] text-[#38BDF8] border-[#38BDF8]/40' 
                          : 'bg-[#131C3F] text-[#A855F7] border-[#7C3AED]/40'
                      }`}>
                        {ord.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-black text-[#F8FAFC] text-sm mt-1 line-clamp-1">
                      {ord.items[0]?.product.title}
                    </h4>
                    <p className="text-[#E9D5FF]/70 text-[11px] font-bold">
                      Size: {ord.items[0]?.selectedSize} • {ord.items[0]?.selectedColor.name} • Total: {formatNaira(ord.totalAmount)}
                    </p>
                    <span className="text-[10px] text-[#E9D5FF]/60 font-mono font-bold">
                      {ord.carrier} • {ord.trackingNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    id={`track-order-btn-${ord.id}`}
                    onClick={() => setSelectedTrackingOrder(ord)}
                    className="px-4 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border border-[#A855F7]/50 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:translate-y-0.5 transition-all"
                  >
                    <Truck className="w-4 h-4 text-[#38BDF8]" />
                    <span>Track Live Delivery</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Saved Wishlist Dresses */}
      <div className="bg-[#111836] rounded-[32px] border border-[#7C3AED]/40 p-6 sm:p-8 shadow-[0_0_30px_rgba(124,58,237,0.15)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#7C3AED]/30">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#A855F7] fill-[#A855F7]" />
            <h2 className="text-2xl font-black uppercase text-[#F8FAFC]">Your Saved Dresses</h2>
          </div>
          <span className="text-xs text-[#E9D5FF] font-black">{wishlistedDresses.length} saved</span>
        </div>

        {wishlistedDresses.length === 0 ? (
          <div className="py-6 text-center text-xs font-bold text-[#E9D5FF]/60">
            No saved dresses yet. Tap the heart icon on any silhouette to add it to your wishlist.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistedDresses.map((dress) => (
              <div key={dress.id} className="p-3 bg-[#131C3F] rounded-2xl border border-[#7C3AED]/30 shadow-sm flex gap-3 text-xs">
                <img
                  src={dress.images[0]}
                  alt={dress.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-20 object-cover object-top rounded-xl border border-[#7C3AED]/30 shrink-0"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-black text-[#F8FAFC] line-clamp-1">{dress.title}</span>
                    <span className="text-[11px] text-[#E9D5FF]/70 block font-bold">{dress.sellerName}</span>
                    <strong className="text-[#38BDF8] font-black text-base">{formatNaira(dress.price)}</strong>
                  </div>
                  <button
                    onClick={() => addToCart(dress, dress.sizes[0] || 'S', dress.colors[0], 1)}
                    className="self-start mt-2 px-3 py-1.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-[#A855F7]/40 shadow-sm transition-all"
                  >
                    <ShoppingBag className="w-3 h-3 text-[#38BDF8]" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
