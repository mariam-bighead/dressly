import React, { useState } from 'react';
import { Heart, Star, Sparkles, Eye, ShoppingBag, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { DressProduct } from '../types';
import { useShop } from '../context/ShopContext';
import { formatNaira } from '../utils/currency';

interface ProductCardProps {
  product: DressProduct;
  onOpenDetail: (product: DressProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const isWishlisted = wishlist.includes(product.id);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Quick add default size (S) and primary color
    addToCart(product, product.sizes[0] || 'S', product.colors[0], 1);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div 
      id={`dress-card-${product.id}`}
      onClick={() => onOpenDetail(product)}
      className="group relative bg-[#111836] rounded-[28px] border border-[#7C3AED]/40 p-3 sm:p-4 shadow-[0_0_20px_rgba(124,58,237,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:border-[#38BDF8]/60 hover:-translate-y-1 transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px] border border-[#7C3AED]/30 bg-[#0B1026]">
        <img
          src={product.images[activeImgIndex] || product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-300 ease-out"
          loading="lazy"
        />

        {/* Multi-image quick arrow controls (visible on group hover) */}
        {product.images.length > 1 && (
          <>
            <button
              id={`prev-img-${product.id}`}
              onClick={handlePrevImage}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#0B1026]/80 hover:bg-[#0B1026] text-[#F8FAFC] border border-[#7C3AED]/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10 shadow-sm"
              title="Previous photo"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              id={`next-img-${product.id}`}
              onClick={handleNextImage}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#0B1026]/80 hover:bg-[#0B1026] text-[#F8FAFC] border border-[#7C3AED]/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10 shadow-sm"
              title="Next photo"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Thumbnail dots selector */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 bg-[#0B1026]/85 backdrop-blur-xs rounded-full border border-[#7C3AED]/40 z-10">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setActiveImgIndex(i);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImgIndex === i ? 'bg-[#38BDF8] w-3.5' : 'bg-white/50 hover:bg-white w-1.5'
                  }`}
                  title={`View photo ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1026]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3 pointer-events-none">
          <div className="w-full pb-7 pointer-events-auto">
            <button
              id={`quick-view-btn-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(product);
              }}
              className="w-full py-2 px-3 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] text-xs font-black uppercase tracking-wider rounded-xl border border-[#A855F7]/60 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-transform active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Silhouette ({product.images.length} Photos)</span>
            </button>
          </div>
        </div>

        {/* Wishlist button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full border transition-all z-10 ${
            isWishlisted
              ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border-[#A855F7] shadow-[0_0_10px_rgba(124,58,237,0.5)]'
              : 'bg-[#0B1026]/80 text-[#E9D5FF] hover:text-[#38BDF8] border-[#7C3AED]/40 hover:border-[#38BDF8]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Silhouette & Photo count pills */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          <span className="px-2.5 py-1 rounded-full bg-[#0B1026]/90 text-[#38BDF8] border border-[#38BDF8]/50 shadow-[0_0_10px_rgba(56,189,248,0.25)] text-[10px] font-black tracking-wide uppercase">
            {product.silhouette}
          </span>
          {product.images.length > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-[#131C3F]/90 text-[#E9D5FF] border border-[#7C3AED]/40 text-[9px] font-black tracking-wider uppercase flex items-center gap-1 shadow-sm">
              <Camera className="w-2.5 h-2.5 text-[#38BDF8]" />
              <span>{product.images.length} Photos</span>
            </span>
          )}
          {product.featured && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border border-[#A855F7]/50 text-[9px] font-black tracking-wider uppercase flex items-center gap-1 shadow-[0_0_10px_rgba(124,58,237,0.3)]">
              <Sparkles className="w-2.5 h-2.5 text-[#38BDF8]" />
              <span>Featured</span>
            </span>
          )}
        </div>
      </div>

      {/* Dress details */}
      <div className="pt-3.5 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Seller / Atelier store name */}
          <div className="flex items-center justify-between text-[11px] text-[#E9D5FF]/70 font-bold mb-1">
            <span className="hover:text-[#38BDF8] hover:underline truncate max-w-[140px]">
              {product.sellerName}
            </span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1E1B4B] border border-[#7C3AED]/40 text-[#E9D5FF] font-black text-[10px]">
              <Star className="w-3 h-3 text-[#38BDF8] fill-[#38BDF8]" />
              <span>{product.sellerRating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-black text-[#F8FAFC] text-base leading-snug line-clamp-1 group-hover:text-[#38BDF8] transition-colors">
            {product.title}
          </h3>

          {/* Fabric info */}
          <p className="text-[11px] font-medium text-[#E9D5FF]/60 line-clamp-1 mt-0.5">
            {product.fabric}
          </p>

          {/* Sizes available */}
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[9px] font-black text-[#E9D5FF]/60 uppercase mr-0.5">Sizes:</span>
            {product.sizes.map((sz) => (
              <span 
                key={sz} 
                className="px-1.5 py-0.5 text-[10px] font-black bg-[#131C3F] text-[#E9D5FF] rounded-md border border-[#7C3AED]/30"
              >
                {sz}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & 70/30 commission breakdown */}
        <div className="pt-2 border-t border-[#7C3AED]/30 mt-1">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-[#1E1B4B] px-3 py-1 rounded-full border border-[#7C3AED]/50 shadow-[0_0_10px_rgba(124,58,237,0.2)] flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-[#38BDF8]">{formatNaira(product.price)}</span>
            </div>

            <button
              id={`card-add-btn-${product.id}`}
              onClick={handleQuickAdd}
              className="p-2 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl border border-[#A855F7]/50 shadow-[0_0_12px_rgba(124,58,237,0.3)] active:translate-y-0.5 transition-all"
              title="Add Size S to Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          {/* Explicit 70% Seller / 30% Platform Split Indicator with Progress Bar */}
          <div className="p-2 bg-[#0B1026] rounded-xl border border-[#7C3AED]/30 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-black">
              <span className="text-[#A855F7]">Artisan 70%: {formatNaira(product.sellerShare)}</span>
              <span className="text-[#38BDF8]">Fee 30%: {formatNaira(product.platformShare)}</span>
            </div>
            <div className="h-2 bg-[#131C3F] rounded-full overflow-hidden flex border border-[#7C3AED]/30">
              <div className="w-[70%] bg-gradient-to-r from-[#7C3AED] to-[#A855F7]" title="70% Seller Share" />
              <div className="w-[30%] bg-gradient-to-r from-[#2563EB] to-[#38BDF8]" title="30% Platform Escrow" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
