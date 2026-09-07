import React from 'react';
import { 
  X, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Play,
  RotateCw,
  ExternalLink
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { useShop } from '../context/ShopContext';
import { formatNaira } from '../utils/currency';

interface OrderTrackingModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ order, onClose }) => {
  const { advanceOrderStatus } = useShop();

  if (!order) return null;

  const isDelivered = order.status === 'delivered';

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#131C3F] text-[#F8FAFC] border border-[#7C3AED]/40">Order Placed</span>;
      case 'confirmed':
        return <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#1E1B4B] text-[#38BDF8] border border-[#38BDF8]/40">Atelier Accepted</span>;
      case 'tailoring':
        return <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#1E1B4B] text-[#A855F7] border border-[#A855F7]/40">Finishing & Packing</span>;
      case 'shipped':
        return <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border border-[#38BDF8]/40">In Transit (Air Express)</span>;
      case 'out_for_delivery':
        return <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#0C2340] text-[#38BDF8] border-2 border-[#38BDF8] animate-pulse">Out for Delivery</span>;
      case 'delivered':
        return <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white border border-[#38BDF8]/50">Delivered & Signed</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1026]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#111836] rounded-[32px] shadow-[0_0_50px_rgba(124,58,237,0.35)] border-2 border-[#7C3AED]/40 overflow-hidden max-h-[90vh] flex flex-col text-[#F8FAFC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B1026] text-[#F8FAFC] p-4 sm:p-5 sm:px-6 flex items-center justify-between border-b border-[#7C3AED]/30">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#2563EB] border border-[#A855F7]/50 flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h2 className="text-base sm:text-xl font-black uppercase truncate">Real-Time Order Tracking</h2>
                <div className="shrink-0">{getStatusBadge(order.status)}</div>
              </div>
              <p className="text-[11px] sm:text-xs text-[#38BDF8] font-mono font-bold truncate">
                {order.carrier} • Tracking #{order.trackingNumber}
              </p>
            </div>
          </div>

          <button
            id="tracking-modal-close-btn"
            onClick={onClose}
            className="p-1.5 text-[#E9D5FF]/80 hover:text-white rounded-full hover:bg-white/10 transition-colors shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable tracker body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Live Simulator Banner for User */}
          <div className="p-4 bg-[#131C3F] rounded-2xl border border-[#7C3AED]/40 shadow-[0_0_20px_rgba(124,58,237,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5 text-xs text-[#F8FAFC]">
              <div className="flex items-center gap-1.5 font-black uppercase tracking-wider text-[11px] text-[#38BDF8]">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                <span>Real-Time Fleet Dispatch Simulation</span>
              </div>
              <p className="text-[11px] text-[#E9D5FF]/80 font-medium">
                Experience the live courier checkpoint progression by simulating the next delivery scan.
              </p>
            </div>

            <button
              id="advance-tracking-step-btn"
              onClick={() => advanceOrderStatus(order.id)}
              disabled={isDelivered}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-all ${
                isDelivered
                  ? 'bg-[#1E2A54]/60 text-[#E9D5FF]/40 border-[#7C3AED]/20 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] border-[#A855F7]/50 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:translate-y-0.5'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#38BDF8]" />
              <span>{isDelivered ? 'Package Delivered' : 'Simulate Next Scan'}</span>
            </button>
          </div>

          {/* Delivery ETA & Destination Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#0E1430] rounded-2xl border border-[#7C3AED]/30 text-xs shadow-sm">
            <div>
              <span className="text-[#E9D5FF]/60 uppercase tracking-wider text-[10px] font-black block">Estimated Delivery</span>
              <span className="text-base font-black text-[#F8FAFC] flex items-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-[#38BDF8]" />
                {order.estimatedDelivery}
              </span>
            </div>
            <div>
              <span className="text-[#E9D5FF]/60 uppercase tracking-wider text-[10px] font-black block">Destination Address</span>
              <span className="text-xs font-bold text-[#E9D5FF]/90 block mt-0.5">
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}, {order.shippingAddress.country || 'Nigeria'}
              </span>
            </div>
          </div>

          {/* Real-time Tracking Timeline */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#F8FAFC] mb-4">
              Real-Time Tracking Events
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-1 before:bg-[#7C3AED]/30">
              {order.checkpoints.map((cp, idx) => {
                const isCurrent = cp.completed && (idx === order.checkpoints.filter(c => c.completed).length - 1);
                
                return (
                  <div key={cp.id} className="relative group">
                    {/* Node indicator */}
                    <div 
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        cp.completed
                          ? isCurrent
                            ? 'bg-[#38BDF8] border-[#F8FAFC] text-[#0B1026] ring-4 ring-[#38BDF8]/30 shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                            : 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] border-[#A855F7] text-white'
                          : 'bg-[#131C3F] border-[#7C3AED]/40 text-transparent'
                      }`}
                    >
                      {cp.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>

                    <div className="bg-[#131C3F] p-4 rounded-2xl border border-[#7C3AED]/30 shadow-sm">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={`font-black uppercase ${cp.completed ? 'text-[#F8FAFC]' : 'text-[#E9D5FF]/40'}`}>
                          {cp.title}
                        </span>
                        <span className="text-[11px] text-[#38BDF8] font-bold">
                          {cp.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-[#E9D5FF]/80 leading-relaxed font-medium">
                        {cp.description}
                      </p>

                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#E9D5FF]/70 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{cp.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Garment Package Contents */}
          <div className="pt-4 border-t border-[#7C3AED]/30">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#F8FAFC] mb-3">
              Dress Package Contents ({order.items.length} item{order.items.length > 1 ? 's' : ''})
            </h3>
            
            <div className="space-y-2.5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#0E1430] rounded-2xl border border-[#7C3AED]/30 text-xs shadow-sm">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title} 
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover object-top rounded-xl border border-[#7C3AED]/40 shrink-0" 
                    />
                    <div>
                      <div className="font-black text-[#F8FAFC] line-clamp-1">{item.product.title}</div>
                      <div className="text-[11px] text-[#E9D5FF]/70 font-bold">
                        Size: {item.selectedSize} • Color: {item.selectedColor.name} • Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-black text-[#38BDF8] text-sm">
                    {formatNaira(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Escrow Distribution Notice */}
            <div className="mt-3 p-3 bg-[#131C3F] rounded-2xl border border-[#7C3AED]/40 text-[11px] text-[#F8FAFC] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 font-bold">
              <span>70% Seller Atelier: <strong className="text-[#38BDF8] font-black">{formatNaira(order.sellerTotalShare)}</strong></span>
              <span className="hidden sm:inline text-[#7C3AED]/40">•</span>
              <span>30% Platform Escrow: <strong className="text-[#A855F7] font-black">{formatNaira(order.platformTotalShare)}</strong></span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B1026] border-t border-[#7C3AED]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#131C3F] hover:bg-[#1E1B4B] text-[#F8FAFC] rounded-xl text-xs font-black uppercase tracking-wider border border-[#7C3AED]/40 shadow-sm transition-all"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
