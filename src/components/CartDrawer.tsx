import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatNaira } from '../utils/currency';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    setIsCheckoutOpen 
  } = useShop();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const sellerPool = (subtotal * 0.70);
  const platformPool = (subtotal * 0.30);
  const freeShipping = subtotal >= 200000;
  const shippingFee = freeShipping || subtotal === 0 ? 0 : 15000;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B1026]/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#111836] shadow-2xl flex flex-col justify-between border-l-2 border-[#7C3AED]/40 text-[#F8FAFC]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#7C3AED]/30 flex items-center justify-between bg-[#0B1026] text-[#F8FAFC]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#1E1B4B] border border-[#7C3AED]/50 flex items-center justify-center text-[#38BDF8]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black uppercase text-[#F8FAFC]">Your Dress Bag</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1E1B4B] text-[#38BDF8] font-black border border-[#7C3AED]/40">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              id="cart-drawer-close-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#E9D5FF]/80 hover:text-[#F8FAFC] hover:bg-[#131C3F] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#111836]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 bg-[#0B1026] rounded-2xl border border-[#7C3AED]/30">
                <div className="w-16 h-16 rounded-2xl bg-[#1E1B4B] border border-[#7C3AED]/50 flex items-center justify-center text-[#38BDF8] shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-black uppercase text-[#F8FAFC]">Your dress bag is empty</h3>
                <p className="text-xs text-[#E9D5FF]/70 max-w-xs font-medium">
                  Explore our curated evening gowns, silk slips, and cocktail silhouettes from independent ateliers.
                </p>
                <button
                  id="cart-empty-explore-btn"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl text-xs font-black uppercase tracking-wider border border-[#A855F7]/50 shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all hover:translate-y-0.5"
                >
                  Browse Dresses
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div 
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`}
                  className="flex gap-4 p-3 rounded-2xl border border-[#7C3AED]/30 bg-[#0B1026] shadow-sm"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-top rounded-xl border border-[#7C3AED]/30 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-black text-[#F8FAFC] line-clamp-1">
                          {item.product.title}
                        </span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-[#E9D5FF]/40 hover:text-[#EF4444] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <div className="text-[11px] text-[#E9D5FF]/60 font-bold mt-0.5">
                        {item.product.sellerName}
                      </div>

                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="px-2 py-0.5 rounded-lg bg-[#1E1B4B] text-[#38BDF8] text-[10px] font-black border border-[#7C3AED]/40">
                          Size {item.selectedSize}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-[#E9D5FF] font-bold">
                          <span 
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#7C3AED]/20 mt-2">
                      <div className="flex items-center border border-[#7C3AED]/40 rounded-xl bg-[#131C3F] text-xs font-black">
                        <button
                          onClick={() => updateCartQuantity(index, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-[#E9D5FF] hover:bg-[#1E1B4B] rounded-l-lg transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 font-black text-[#F8FAFC]">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(index, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-[#E9D5FF] hover:bg-[#1E1B4B] rounded-r-lg transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-black text-[#38BDF8] text-sm">
                          {formatNaira(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Payout Breakdown */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#7C3AED]/30 bg-[#0B1026] space-y-3">
              
              {/* 70/30 commission transparency note */}
              <div className="p-3 bg-[#131C3F] rounded-2xl border border-[#7C3AED]/40 text-[11px] space-y-1.5 shadow-[0_0_15px_rgba(124,58,237,0.15)]">
                <div className="flex items-center gap-1.5 font-black uppercase text-[10px] text-[#38BDF8]">
                  <DollarSign className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Marketplace Revenue Allocation</span>
                </div>
                <div className="flex justify-between text-[#E9D5FF] font-bold text-xs">
                  <span className="text-[#A855F7]">70% Seller Atelier Pool:</span>
                  <span className="font-black text-[#F8FAFC]">{formatNaira(sellerPool)}</span>
                </div>
                <div className="flex justify-between text-[#E9D5FF] font-bold text-xs">
                  <span className="text-[#38BDF8]">30% Platform Escrow & Tech:</span>
                  <span className="font-black text-[#F8FAFC]">{formatNaira(platformPool)}</span>
                </div>
              </div>

              {/* Cost summary */}
              <div className="space-y-1 text-xs text-[#E9D5FF] font-bold">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-black text-sm text-[#F8FAFC]">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>DHL Express Atelier Courier</span>
                  <span>{freeShipping ? <strong className="text-[#38BDF8] font-black uppercase">Free</strong> : formatNaira(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#F8FAFC] pt-2 border-t border-[#7C3AED]/30">
                  <span>Total Amount</span>
                  <span className="text-[#38BDF8]">{formatNaira(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border border-[#A855F7]/60 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:translate-y-0.5 active:translate-y-1"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#E9D5FF]/70 font-bold pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>256-bit Encrypted • Real-Time Order Tracking</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
