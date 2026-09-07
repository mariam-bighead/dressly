import React, { useState, useMemo } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  DollarSign,
  Fingerprint,
  Building2,
  Landmark,
  ArrowDownRight,
  Banknote,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { Order, BankAccountDetails } from '../types';
import { formatNaira } from '../utils/currency';
import { NIGERIAN_BANKS, maskNuban } from '../utils/banks';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return <CheckoutModalContent onClose={onClose} />;
};

const CheckoutModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cart, placeOrder, setSelectedTrackingOrder, allSellers } = useShop();
  const { currentUser } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<'bank_account' | 'card' | 'apple_pay' | 'google_pay' | 'paypal' | 'klarna'>('bank_account');
  const [shippingSpeed, setShippingSpeed] = useState<'express' | 'standard'>('express');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<Order | null>(null);

  // Form states
  const [fullName, setFullName] = useState(currentUser?.name || 'Chioma Adeleke');
  const [street, setStreet] = useState(currentUser?.shippingAddress?.street || '14 Alexander Avenue, Ikoyi');
  const [city, setCity] = useState(currentUser?.shippingAddress?.city || 'Lagos');
  const [state, setState] = useState(currentUser?.shippingAddress?.state || 'Lagos State');
  const [zip, setZip] = useState(currentUser?.shippingAddress?.zip || '101233');
  const [country, setCountry] = useState(currentUser?.shippingAddress?.country || 'Nigeria');

  // Buyer Direct Bank Details
  const [buyerBank, setBuyerBank] = useState(currentUser?.buyerAccount?.bankName || 'Guaranty Trust Bank (GTBank)');
  const [buyerAccountNumber, setBuyerAccountNumber] = useState(currentUser?.buyerAccount?.accountNumber || '0129481920');
  const [buyerAccountName, setBuyerAccountName] = useState(currentUser?.buyerAccount?.accountName || currentUser?.name || 'Sophia Sterling');
  const [transferPin, setTransferPin] = useState('8491');

  // Card fields
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('892');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const sellerPool = Number((subtotal * 0.70).toFixed(2));
  const platformPool = Number((subtotal * 0.30).toFixed(2));
  const shippingCost = shippingSpeed === 'express' ? (subtotal >= 200000 ? 0 : 20000) : (subtotal >= 200000 ? 0 : 12000);
  const total = subtotal + shippingCost;

  // Calculate cart seller breakdown for direct payment routing
  const sellerBreakdowns = useMemo(() => {
    const map = new Map<string, { sellerName: string; total: number; payoutAccount?: BankAccountDetails }>();
    cart.forEach(item => {
      const sellerId = item.product.sellerId;
      const current = map.get(sellerId) || {
        sellerName: item.product.sellerName,
        total: 0,
        payoutAccount: allSellers.find(s => s.id === sellerId)?.payoutAccount
      };
      current.total += item.product.price * item.quantity;
      map.set(sellerId, current);
    });
    return Array.from(map.entries()).map(([sellerId, data]) => ({
      sellerId,
      sellerName: data.sellerName,
      itemsTotal: data.total,
      sellerDirectShare: Number((data.total * 0.70).toFixed(2)),
      payoutAccount: data.payoutAccount
    }));
  }, [cart, allSellers]);

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1026]/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="relative w-full max-w-md bg-[#111836] rounded-[32px] shadow-[0_0_50px_rgba(124,58,237,0.35)] border-2 border-[#7C3AED]/40 p-8 text-center space-y-4 text-[#F8FAFC]">
          <p className="text-sm font-bold text-[#E9D5FF]">Your shopping bag is empty.</p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] rounded-full text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const buyerDetails: BankAccountDetails = {
      bankName: buyerBank,
      accountNumber: buyerAccountNumber.replace(/\D/g, '').slice(0, 10),
      accountName: buyerAccountName,
      bankCode: NIGERIAN_BANKS.find(b => b.name === buyerBank)?.code || '058',
      bvnVerified: true,
      settlementSpeed: 'instant',
    };

    // Simulate bank gateway NIBSS instant settlement & escrow routing
    setTimeout(() => {
      const paymentLast4Digits = paymentMethod === 'bank_account' 
        ? buyerAccountNumber.slice(-4) 
        : paymentMethod === 'card' 
        ? cardNumber.slice(-4) 
        : 'DIRECT_PAY';

      const createdOrder = placeOrder(
        cart,
        { fullName, street, city, state, zip, country },
        paymentMethod,
        paymentLast4Digits,
        buyerDetails
      );

      setIsProcessing(false);
      setOrderComplete(createdOrder);
    }, 1200);
  };

  const handleFinishAndTrack = () => {
    if (orderComplete) {
      setSelectedTrackingOrder(orderComplete);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1026]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#111836] rounded-[32px] shadow-[0_0_50px_rgba(124,58,237,0.35)] border-2 border-[#7C3AED]/40 overflow-hidden max-h-[92vh] flex flex-col text-[#F8FAFC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B1026] text-[#F8FAFC] p-4 sm:p-5 sm:px-6 flex items-center justify-between border-b border-[#7C3AED]/30">
          <div className="flex items-center gap-2.5 min-w-0">
            <Lock className="w-5 h-5 text-[#38BDF8] shrink-0" />
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-black uppercase truncate">Encrypted Checkout & Direct Settlement</h2>
              <span className="text-[10px] sm:text-[11px] text-[#E9D5FF]/80 font-bold block sm:inline">256-bit TLS • Direct Bank Transfer • Escrow</span>
            </div>
          </div>
          <button
            id="checkout-close-btn"
            onClick={onClose}
            className="p-1.5 text-[#E9D5FF]/80 hover:text-white rounded-full hover:bg-white/10 transition-colors shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-8 bg-[#111836]">
          {orderComplete ? (
            /* Order Success View with Direct Settlement Breakdown */
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#1E1B4B] text-[#38BDF8] rounded-full flex items-center justify-center mx-auto border border-[#7C3AED]/50 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <CheckCircle2 className="w-10 h-10 text-[#38BDF8]" />
              </div>

              <h3 className="text-2xl font-black uppercase text-[#F8FAFC]">
                Payment Authorized & Funds Deposited to Seller!
              </h3>
              
              <p className="text-xs text-[#E9D5FF]/80 max-w-md mx-auto leading-relaxed font-bold">
                Thank you, <strong>{fullName}</strong>. Your payment was debited from your account and credited directly into the seller's verified payout account.
              </p>

              {/* Direct Bank-to-Bank Settlement Receipt */}
              <div className="max-w-lg mx-auto bg-[#0B1026] rounded-3xl p-5 border border-[#7C3AED]/40 shadow-[0_0_25px_rgba(124,58,237,0.15)] text-xs text-left space-y-3">
                <div className="flex justify-between items-center font-black text-[#F8FAFC] border-b border-[#7C3AED]/30 pb-2.5">
                  <span className="font-mono text-sm">ORDER #{orderComplete.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1E1B4B] text-[#38BDF8] text-[10px] font-black uppercase border border-[#38BDF8]/50">
                    Direct Settlement Cleared
                  </span>
                </div>

                {/* Debited Buyer Account */}
                <div className="p-3 bg-[#131C3F] rounded-xl border border-[#7C3AED]/30 space-y-1">
                  <span className="text-[10px] font-black uppercase text-[#E9D5FF]/60 block">Debited From Buyer Account:</span>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-[#38BDF8]" />
                      <span className="font-black text-[#F8FAFC]">{orderComplete.buyerAccountDetails?.bankName || buyerBank}</span>
                    </div>
                    <span className="font-mono font-black text-[#38BDF8]">••••{orderComplete.buyerAccountDetails?.accountNumber?.slice(-4) || orderComplete.paymentLast4}</span>
                  </div>
                  <div className="text-[11px] text-[#E9D5FF]/70 font-bold">
                    Holder: {orderComplete.buyerAccountDetails?.accountName || buyerAccountName}
                  </div>
                </div>

                {/* Direct Settlements to Sellers */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-[#E9D5FF]/70 block">
                    Direct Payout Deposited to Seller Account(s):
                  </span>
                  {orderComplete.sellerSettlements?.map((settlement, idx) => (
                    <div key={idx} className="p-3 bg-[#131C3F] rounded-xl border border-[#7C3AED]/30 space-y-1">
                      <div className="flex items-center justify-between font-black text-[#F8FAFC]">
                        <span className="text-sm">{settlement.sellerName}</span>
                        <span className="text-base text-[#38BDF8] font-black">{formatNaira(settlement.amount)}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#E9D5FF]/80">
                        <span>Receiving Bank:</span>
                        <span className="font-mono font-black text-[#F8FAFC]">
                          {settlement.destinationAccount.bankName} (••••{settlement.destinationAccount.accountNumber.slice(-4)})
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#E9D5FF]/70 pt-0.5">
                        <span>Transfer Ref:</span>
                        <span className="font-bold text-[#38BDF8]">{settlement.directTransferReference}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Platform Escrow Share & Logistics */}
                <div className="p-3 bg-[#131C3F] rounded-xl border border-[#7C3AED]/30 space-y-1 text-[#E9D5FF]">
                  <div className="flex items-center justify-between font-bold">
                    <span>Platform Escrow Share (30%):</span>
                    <span className="font-black text-[#38BDF8]">{formatNaira(orderComplete.platformTotalShare)}</span>
                  </div>
                  <div className="flex items-center justify-between font-bold">
                    <span>Total Amount Authorized:</span>
                    <span className="font-black text-sm text-[#F8FAFC]">{formatNaira(orderComplete.totalAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#E9D5FF]/70 pt-1 border-t border-[#7C3AED]/30">
                    <span>Courier Tracking Number:</span>
                    <span className="font-mono font-black text-[#38BDF8]">{orderComplete.trackingNumber}</span>
                  </div>
                </div>

              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  id="checkout-live-track-btn"
                  onClick={handleFinishAndTrack}
                  className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border border-[#A855F7]/60 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:translate-y-0.5 transition-all"
                >
                  <Truck className="w-4 h-4 text-[#38BDF8]" />
                  <span>Track Live Package Progress</span>
                </button>
                <button
                  id="checkout-done-close-btn"
                  onClick={onClose}
                  className="px-6 py-3 bg-[#131C3F] hover:bg-[#1E2A54] text-[#E9D5FF] rounded-2xl text-xs font-black uppercase tracking-wider border border-[#7C3AED]/40 shadow-sm transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Direct Seller Payment & 70/30 Split Explanation Banner */}
              <div className="p-4 bg-[#131C3F] border border-[#7C3AED]/40 rounded-2xl flex items-start gap-3 text-xs text-[#E9D5FF] shadow-[0_0_15px_rgba(124,58,237,0.15)]">
                <DollarSign className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-black uppercase tracking-wider text-[11px] text-[#F8FAFC]">Direct Payment to Seller's Account</span>
                  <p className="text-[11px] text-[#E9D5FF]/80 font-medium leading-relaxed">
                    Once you pay, the 70% designer share (<strong className="text-[#A855F7]">{formatNaira(sellerPool)}</strong>) is deposited directly into the seller's verified bank account. 30% (<strong className="text-[#38BDF8]">{formatNaira(platformPool)}</strong>) goes to platform escrow for buyer protection, inspection, and DHL tracking.
                  </p>
                </div>
              </div>

              {/* Payment Gateway Options */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#F8FAFC] mb-3">
                  Select Secure Payment Gateway
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {/* Direct Bank Account (Featured Option) */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_account')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all col-span-2 sm:col-span-1 ${
                      paymentMethod === 'bank_account'
                        ? 'border-[#A855F7] bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'border-[#7C3AED]/30 hover:bg-[#1E1B4B] bg-[#0B1026] text-[#E9D5FF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Landmark className="w-5 h-5" />
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                        paymentMethod === 'bank_account' ? 'bg-[#1E1B4B] text-[#38BDF8] border-[#38BDF8]/40' : 'bg-[#1E1B4B] text-[#38BDF8] border-[#38BDF8]/40'
                      }`}>
                        Direct to Seller
                      </span>
                    </div>
                    <div>
                      <div className="font-black text-xs uppercase">Direct Bank Pay</div>
                      <div className={`text-[10px] font-bold ${paymentMethod === 'bank_account' ? 'text-white/80' : 'text-[#E9D5FF]/60'}`}>
                        NUBAN Direct Transfer
                      </div>
                    </div>
                  </button>

                  {/* Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#A855F7] bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'border-[#7C3AED]/30 hover:bg-[#1E1B4B] bg-[#0B1026] text-[#E9D5FF]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <div>
                      <div className="font-black text-xs uppercase">Credit / Debit</div>
                      <div className={`text-[10px] font-bold ${paymentMethod === 'card' ? 'text-white/80' : 'text-[#E9D5FF]/60'}`}>
                        Visa, MC, Verve
                      </div>
                    </div>
                  </button>

                  {/* Apple Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'border-[#A855F7] bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'border-[#7C3AED]/30 hover:bg-[#1E1B4B] bg-[#0B1026] text-[#E9D5FF]'
                    }`}
                  >
                    <div className="flex items-center gap-1 font-bold">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-xs uppercase">Apple Pay</div>
                      <div className={`text-[10px] font-bold ${paymentMethod === 'apple_pay' ? 'text-white/80' : 'text-[#E9D5FF]/60'}`}>
                        Touch / Face ID
                      </div>
                    </div>
                  </button>

                  {/* Google Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      paymentMethod === 'google_pay'
                        ? 'border-[#A855F7] bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'border-[#7C3AED]/30 hover:bg-[#1E1B4B] bg-[#0B1026] text-[#E9D5FF]'
                    }`}
                  >
                    <div className="font-black text-xs">GPay</div>
                    <div>
                      <div className="font-black text-xs uppercase">Google Pay</div>
                      <div className={`text-[10px] font-bold ${paymentMethod === 'google_pay' ? 'text-white/80' : 'text-[#E9D5FF]/60'}`}>
                        One-click pay
                      </div>
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-[#A855F7] bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'border-[#7C3AED]/30 hover:bg-[#1E1B4B] bg-[#0B1026] text-[#E9D5FF]'
                    }`}
                  >
                    <span className="font-black text-sm">PayPal</span>
                    <div>
                      <div className="font-black text-xs uppercase">PayPal</div>
                      <div className={`text-[10px] font-bold ${paymentMethod === 'paypal' ? 'text-white/80' : 'text-[#E9D5FF]/60'}`}>
                        Buyer Escrow
                      </div>
                    </div>
                  </button>

                  {/* Klarna */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      paymentMethod === 'klarna'
                        ? 'border-[#A855F7] bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'border-[#7C3AED]/30 hover:bg-[#1E1B4B] bg-[#0B1026] text-[#E9D5FF]'
                    }`}
                  >
                    <span className="font-black text-xs">Klarna.</span>
                    <div>
                      <div className="font-black text-xs uppercase">4 Installments</div>
                      <div className={`text-[10px] font-bold ${paymentMethod === 'klarna' ? 'text-white/80' : 'text-[#E9D5FF]/60'}`}>
                        {formatNaira(total / 4)}/mo
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Bank Account Inputs if Direct Bank chosen */}
              {paymentMethod === 'bank_account' && (
                <div className="p-5 bg-[#0B1026] rounded-3xl border border-[#7C3AED]/40 space-y-4 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                  <div className="flex items-center justify-between pb-1 border-b border-[#7C3AED]/30">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-[#38BDF8]" />
                      <span className="text-xs text-[#F8FAFC] font-black uppercase text-[11px]">
                        Buyer Bank Account Information
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[#38BDF8] text-[10px] font-black uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Direct Transfer Secured</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">
                        Your Bank Name
                      </label>
                      <select
                        value={buyerBank}
                        onChange={(e) => setBuyerBank(e.target.value)}
                        className="w-full px-3 py-2 bg-[#131C3F] text-[#F8FAFC] text-xs font-bold rounded-xl border border-[#7C3AED]/40 focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                      >
                        {NIGERIAN_BANKS.map((b) => (
                          <option key={b.code} value={b.name} className="bg-[#131C3F] text-[#F8FAFC]">
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">
                        10-Digit NUBAN Account Number
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        placeholder="0123456789"
                        value={buyerAccountNumber}
                        onChange={(e) => setBuyerAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full px-3 py-2 bg-[#131C3F] text-[#F8FAFC] text-xs font-mono font-black rounded-xl border border-[#7C3AED]/40 focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">
                        Account Holder Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Sophia Sterling"
                        value={buyerAccountName}
                        onChange={(e) => setBuyerAccountName(e.target.value)}
                        className="w-full px-3 py-2 bg-[#131C3F] text-[#F8FAFC] text-xs font-bold rounded-xl border border-[#7C3AED]/40 focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#E9D5FF] font-black uppercase text-[10px] mb-1">
                        4-Digit Transfer PIN / OTP Authorization
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="••••"
                        value={transferPin}
                        onChange={(e) => setTransferPin(e.target.value)}
                        className="w-full px-3 py-2 bg-[#131C3F] text-[#F8FAFC] text-xs font-mono font-black rounded-xl border border-[#7C3AED]/40 focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Real-time Direct Settlement Route Visualizer */}
                  <div className="p-3.5 bg-[#131C3F] rounded-2xl border border-[#7C3AED]/30 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 font-black text-[#F8FAFC] text-[11px] uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>Instant Direct Bank Transfer Route:</span>
                    </div>

                    <div className="space-y-2 pt-1">
                      {sellerBreakdowns.map((sb, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2.5 bg-[#0B1026] rounded-xl border border-[#7C3AED]/30 gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#1E1B4B] text-[#38BDF8] flex items-center justify-center font-black text-[10px] border border-[#7C3AED]/50">
                              {i + 1}
                            </span>
                            <div>
                              <span className="font-black text-[#F8FAFC] block">{sb.sellerName}</span>
                              <span className="text-[10px] text-[#E9D5FF]/70 font-bold">
                                Receiving Bank: {sb.payoutAccount?.bankName || 'First Bank of Nigeria'} (••••{sb.payoutAccount?.accountNumber?.slice(-4) || '8192'})
                              </span>
                            </div>
                          </div>

                          <div className="sm:text-right">
                            <span className="text-[10px] text-[#E9D5FF]/60 uppercase font-black block">Direct Deposit to Seller:</span>
                            <span className="font-black text-sm text-[#38BDF8]">{formatNaira(sb.sellerDirectShare)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-[#E9D5FF]/70 font-bold italic pt-1">
                      * Upon clicking Authorize, funds move directly from your bank account to the sellers' verified bank accounts.
                    </p>
                  </div>
                </div>
              )}

              {/* Credit Card Inputs if Card chosen */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#0B1026] rounded-2xl border border-[#7C3AED]/40 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-[#F8FAFC] font-black uppercase text-[10px] pb-1">
                    <span>Card Information</span>
                    <span className="flex items-center gap-1 text-[#38BDF8]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Encrypted</span>
                    </span>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#131C3F] text-[#F8FAFC] text-xs font-bold rounded-xl border border-[#7C3AED]/40 focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#131C3F] text-[#F8FAFC] text-xs font-bold rounded-xl border border-[#7C3AED]/40 focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="CVC"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#131C3F] text-[#F8FAFC] text-xs font-bold rounded-xl border border-[#7C3AED]/40 focus:ring-2 focus:ring-[#38BDF8] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Shipping Address */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#F8FAFC]">
                    Delivery Destination (Nigeria)
                  </label>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1E1B4B] border border-[#7C3AED]/50 text-[10px] font-black text-[#38BDF8] uppercase">
                    <span>🇳🇬</span>
                    <span>Nigeria Nationwide</span>
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Recipient Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none placeholder-[#E9D5FF]/40"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Street Address, Area / Estate (e.g. 14 Alexander Ave, Ikoyi)"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none placeholder-[#E9D5FF]/40"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="City (e.g. Lagos, Abuja, Port Harcourt)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none placeholder-[#E9D5FF]/40"
                    />
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none cursor-pointer"
                    >
                      <option value="Lagos State" className="bg-[#131C3F]">Lagos State</option>
                      <option value="Abuja FCT" className="bg-[#131C3F]">Abuja FCT</option>
                      <option value="Rivers State" className="bg-[#131C3F]">Rivers State (Port Harcourt)</option>
                      <option value="Oyo State" className="bg-[#131C3F]">Oyo State (Ibadan)</option>
                      <option value="Ogun State" className="bg-[#131C3F]">Ogun State (Abeokuta)</option>
                      <option value="Enugu State" className="bg-[#131C3F]">Enugu State</option>
                      <option value="Delta State" className="bg-[#131C3F]">Delta State (Asaba/Warri)</option>
                      <option value="Kano State" className="bg-[#131C3F]">Kano State</option>
                      <option value="Anambra State" className="bg-[#131C3F]">Anambra State (Awka/Onitsha)</option>
                      <option value="Edo State" className="bg-[#131C3F]">Edo State (Benin City)</option>
                      <option value="Akwa Ibom State" className="bg-[#131C3F]">Akwa Ibom State (Uyo)</option>
                      <option value="Kaduna State" className="bg-[#131C3F]">Kaduna State</option>
                      <option value="Cross River State" className="bg-[#131C3F]">Cross River State (Calabar)</option>
                      <option value="Other Nigerian State" className="bg-[#131C3F]">Other Nigerian State</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="Postal Code (e.g. 101233)"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:ring-2 focus:ring-[#38BDF8] focus:outline-none placeholder-[#E9D5FF]/40"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="pt-2 border-t border-[#7C3AED]/30">
                <div className="text-xs font-black uppercase text-[#F8FAFC] mb-2">Order Dresses:</div>
                <div className="space-y-2">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-[#E9D5FF] font-medium">
                      <span className="line-clamp-1">{item.quantity}x {item.product.title} (Size {item.selectedSize})</span>
                      <span className="font-black text-[#F8FAFC]">{formatNaira(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing breakdown summary */}
              <div className="p-4 bg-[#0B1026] rounded-2xl border border-[#7C3AED]/40 space-y-2 text-xs shadow-sm">
                <div className="flex justify-between text-[#E9D5FF]/80 font-bold">
                  <span>Dresses Subtotal:</span>
                  <span className="font-black text-[#F8FAFC]">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#A855F7] font-black">
                  <span>Direct to Sellers (70%):</span>
                  <span>{formatNaira(sellerPool)}</span>
                </div>
                <div className="flex justify-between text-[#38BDF8] font-bold">
                  <span>Platform Operations & Escrow (30%):</span>
                  <span className="font-black">{formatNaira(platformPool)}</span>
                </div>
                <div className="flex justify-between text-[#E9D5FF]/80 font-bold">
                  <span>Express Garment Delivery:</span>
                  <span>{shippingCost === 0 ? <strong className="text-[#38BDF8]">Free</strong> : formatNaira(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#F8FAFC] pt-2 border-t border-[#7C3AED]/30">
                  <span>Total To Pay:</span>
                  <span className="text-[#38BDF8]">{formatNaira(total)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="checkout-submit-payment-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] disabled:opacity-50 text-[#F8FAFC] rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border border-[#A855F7]/60 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:translate-y-0.5 transition-all"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Direct Bank Settlement to Seller...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#38BDF8]" />
                    <span>Pay Directly to Seller Account • {formatNaira(total)}</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
