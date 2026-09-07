import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Scissors, 
  Check, 
  Info,
  DollarSign
} from 'lucide-react';
import { DressProduct } from '../types';
import { useShop } from '../context/ShopContext';
import { formatNaira } from '../utils/currency';

interface ProductDetailModalProps {
  product: DressProduct | null;
  onClose: () => void;
  onProceedCheckout?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onProceedCheckout,
}) => {
  if (!product) return null;

  return (
    <ProductDetailModalContent
      key={product.id}
      product={product}
      onClose={onClose}
      onProceedCheckout={onProceedCheckout}
    />
  );
};

const ProductDetailModalContent: React.FC<{
  product: DressProduct;
  onClose: () => void;
  onProceedCheckout?: () => void;
}> = ({
  product,
  onClose,
  onProceedCheckout,
}) => {
  const { addToCart, wishlist, toggleWishlist, setIsCartOpen, setIsCheckoutOpen } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'S');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToBag = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    setIsCartOpen(true);
  };

  const handleInstantBuy = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1026]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#111836] rounded-[32px] shadow-[0_0_50px_rgba(124,58,237,0.35)] border-2 border-[#7C3AED]/40 overflow-hidden max-h-[90vh] flex flex-col text-[#F8FAFC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="detail-modal-close-btn"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 text-[#E9D5FF] hover:text-[#F8FAFC] hover:bg-[#1E1B4B] border border-[#7C3AED]/40 bg-[#0B1026] rounded-full transition-colors z-20 shadow-sm"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-8 bg-[#111836]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Dress Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#0B1026] border-2 border-[#7C3AED]/40 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />

                <button
                  id="detail-wishlist-toggle"
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full border transition-all shadow-[0_0_12px_rgba(124,58,237,0.3)] ${
                    isWishlisted
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border-[#A855F7]'
                      : 'bg-[#0B1026]/90 text-[#E9D5FF] border-[#7C3AED]/40 hover:border-[#38BDF8]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-[3/4] w-16 sm:w-20 shrink-0 rounded-xl overflow-hidden border transition-all ${
                        selectedImage === idx
                          ? 'border-[#38BDF8] ring-2 ring-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.4)] scale-105'
                          : 'border-[#7C3AED]/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 inset-x-0 bg-[#0B1026]/80 text-[9px] text-[#E9D5FF] text-center py-0.5 font-bold">
                        Photo {idx + 1}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees */}
              <div className="bg-[#0B1026] rounded-2xl p-4 border border-[#7C3AED]/30 shadow-[0_0_15px_rgba(124,58,237,0.15)] space-y-2.5 text-xs text-[#E9D5FF] font-bold">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Verified Designer Atelier Authenticity Guarantee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#A855F7] shrink-0" />
                  <span>Real-time DHL Express tracked delivery with insurance</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Scissors className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Tailored fit guarantee with complimentary size exchanges</span>
                </div>
              </div>
            </div>

            {/* Right: Dress Configuration & Purchase */}
            <div className="flex flex-col justify-between space-y-6">
              
              <div>
                {/* Category & Designer Info */}
                <div className="flex items-center justify-between gap-2 text-xs mb-2">
                  <span className="uppercase tracking-wider font-black text-[#38BDF8] bg-[#1E1B4B] px-3 py-1 rounded-full border border-[#7C3AED]/50 text-[10px]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 font-black text-[#E9D5FF]">
                    <span>{product.sellerName}</span>
                    <span>•</span>
                    <Star className="w-3.5 h-3.5 text-[#38BDF8] fill-[#38BDF8] inline" />
                    <span>{product.sellerRating} ({product.sellerSalesCount} orders)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#F8FAFC] leading-tight">
                  {product.title}
                </h1>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-[#38BDF8]">{formatNaira(product.price)}</span>
                  <span className="text-xs font-bold text-[#E9D5FF]/60 uppercase tracking-wider">NGN (All taxes included)</span>
                </div>

                {/* Explicit 70% Seller / 30% Platform Split Callout */}
                <div className="mt-4 p-3.5 rounded-2xl bg-[#0B1026] border border-[#7C3AED]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)] text-xs">
                  <div className="flex items-center gap-1.5 font-black uppercase tracking-wider text-[11px] text-[#F8FAFC] mb-1">
                    <DollarSign className="w-4 h-4 text-[#38BDF8]" />
                    <span>Transparent Pricing & Revenue Share</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#7C3AED]/30">
                    <div className="bg-[#131C3F] p-2.5 rounded-xl border border-[#7C3AED]/30">
                      <div className="text-[10px] uppercase tracking-wider text-[#A855F7] font-black">
                        Seller Net (70%)
                      </div>
                      <div className="text-base font-black text-[#F8FAFC]">
                        {formatNaira(product.sellerShare)}
                      </div>
                      <div className="text-[10px] text-[#E9D5FF]/60 font-bold">Paid to {product.sellerName}</div>
                    </div>
                    <div className="bg-[#131C3F] p-2.5 rounded-xl border border-[#7C3AED]/30">
                      <div className="text-[10px] uppercase tracking-wider text-[#38BDF8] font-black">
                        Platform Fee (30%)
                      </div>
                      <div className="text-base font-black text-[#F8FAFC]">
                        {formatNaira(product.platformShare)}
                      </div>
                      <div className="text-[10px] text-[#E9D5FF]/60 font-bold">Escrow, tracking & tech</div>
                    </div>
                  </div>
                </div>

                {/* Dress Attributes */}
                <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-[#0B1026] border border-[#7C3AED]/30 rounded-xl shadow-sm">
                    <span className="text-[#E9D5FF]/60 block text-[10px] font-black uppercase">Silhouette</span>
                    <span className="font-black text-[#F8FAFC]">{product.silhouette}</span>
                  </div>
                  <div className="p-2.5 bg-[#0B1026] border border-[#7C3AED]/30 rounded-xl shadow-sm">
                    <span className="text-[#E9D5FF]/60 block text-[10px] font-black uppercase">Dress Length</span>
                    <span className="font-black text-[#F8FAFC]">{product.length}</span>
                  </div>
                </div>

                <div className="mt-3 p-2.5 bg-[#0B1026] border border-[#7C3AED]/30 rounded-xl text-xs shadow-sm">
                  <span className="text-[#E9D5FF]/60 block text-[10px] font-black uppercase">Fabric Composition</span>
                  <span className="font-black text-[#F8FAFC]">{product.fabric}</span>
                </div>

                {/* Color Selection */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-black uppercase tracking-wider text-[#F8FAFC]">Select Colorway</span>
                    <span className="text-[#E9D5FF]/70 font-bold">{selectedColor.name}</span>
                  </div>
                  <div className="flex gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedColor.name === color.name
                            ? 'border-[#38BDF8] scale-110 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                            : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                      >
                        <span 
                          className="w-6 h-6 rounded-full border border-black/20" 
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-black uppercase tracking-wider text-[#F8FAFC]">Dress Size</span>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-[#38BDF8] underline font-black hover:text-[#7dd3fc]"
                    >
                      {showSizeGuide ? 'Hide Size Chart' : 'Measurement Guide'}
                    </button>
                  </div>

                  {showSizeGuide && (
                    <div className="mb-3 p-3 bg-[#0B1026] rounded-xl border border-[#7C3AED]/40 shadow-sm text-xs text-[#E9D5FF]">
                      <div className="font-black uppercase text-[11px] mb-1 text-[#38BDF8]">Standard Atelier Measurements:</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-bold text-[#E9D5FF]/80">
                        <span>XS: 32" Bust, 25" Waist</span>
                        <span>S: 34" Bust, 27" Waist</span>
                        <span>M: 36" Bust, 29" Waist</span>
                        <span>L: 38" Bust, 31" Waist</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-4 rounded-xl text-xs font-black border transition-all ${
                          selectedSize === size
                            ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border-[#A855F7] shadow-[0_0_12px_rgba(124,58,237,0.4)]'
                            : 'bg-[#131C3F] text-[#E9D5FF] border-[#7C3AED]/30 hover:bg-[#1E1B4B]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-xs font-black uppercase text-[#F8FAFC]">Quantity:</span>
                  <div className="flex items-center border border-[#7C3AED]/40 rounded-xl bg-[#0B1026] shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-[#E9D5FF] hover:bg-[#1E1B4B] rounded-l-lg text-sm font-black"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-black text-[#F8FAFC] min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-[#E9D5FF] hover:bg-[#1E1B4B] rounded-r-lg text-sm font-black"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Description & Details */}
                <div className="mt-6 space-y-3 pt-6 border-t border-[#7C3AED]/30">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#38BDF8] mb-1">
                      The Silhouette
                    </h4>
                    <p className="text-xs text-[#E9D5FF]/80 leading-relaxed font-medium">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#38BDF8] mb-1">
                      Artisan Details
                    </h4>
                    <ul className="text-xs text-[#E9D5FF] space-y-1 font-bold">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#38BDF8] mt-0.5 shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#38BDF8] mb-1">
                      Garment Care
                    </h4>
                    <p className="text-xs text-[#E9D5FF]/70 italic font-medium">
                      {product.careInstructions}
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#7C3AED]/30 space-y-2 sticky bottom-0 bg-[#111836]/95 backdrop-blur-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    id="modal-add-to-bag-btn"
                    onClick={handleAddToBag}
                    className="w-full py-3 px-4 rounded-xl border border-[#2563EB]/60 bg-[#131C3F] hover:bg-[#1E2A54] text-[#E9D5FF] hover:text-[#F8FAFC] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.25)] transition-all hover:translate-y-0.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatNaira(product.price * quantity)}</span>
                  </button>

                  <button
                    id="modal-instant-buy-btn"
                    onClick={handleInstantBuy}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border border-[#A855F7]/60 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:translate-y-0.5"
                  >
                    <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                    <span>Instant Checkout</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
