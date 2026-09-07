import React, { createContext, useContext, useState, useEffect } from 'react';
import { DressProduct, Order, CartItem, OrderStatus, TrackingCheckpoint, BankAccountDetails, SellerSettlementRecord } from '../types';
import { INITIAL_DRESSES, INITIAL_ORDERS } from '../data/mockData';
import { useAuth } from './AuthContext';
import { formatNaira } from '../utils/currency';

interface ShopContextType {
  dresses: DressProduct[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedTrackingOrder: Order | null;
  setSelectedTrackingOrder: (order: Order | null) => void;
  activeDressModal: DressProduct | null;
  setActiveDressModal: (dress: DressProduct | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalInitialRole: 'buyer' | 'seller';
  setAuthModalInitialRole: (role: 'buyer' | 'seller') => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isPlatformLedgerOpen: boolean;
  setIsPlatformLedgerOpen: (open: boolean) => void;

  // Actions
  addToCart: (product: DressProduct, size: string, color: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (dressId: string) => void;

  // Seller dress actions
  addDress: (newDressData: Omit<DressProduct, 'id' | 'sellerShare' | 'platformShare' | 'createdAt'>) => DressProduct;
  updateDress: (dressId: string, updatedData: Partial<DressProduct>) => void;
  deleteDress: (dressId: string) => void;

  // Order actions & Real-time tracking
  placeOrder: (
    items: CartItem[],
    shippingAddress: Order['shippingAddress'],
    paymentMethod: Order['paymentMethod'],
    paymentLast4?: string,
    buyerAccountDetails?: BankAccountDetails
  ) => Order;
  advanceOrderStatus: (orderId: string) => void;

  // Analytics
  platformStats: {
    totalPlatformFee: number; // Sum of 30% on all orders
    totalSellerPayout: number; // Sum of 70% on all orders
    totalGrossVolume: number;
    orderCount: number;
  };
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEY_DRESSES = 'dress_marketplace_dresses_v2';
const STORAGE_KEY_ORDERS = 'dress_marketplace_orders_v2';
const STORAGE_KEY_CART = 'dress_marketplace_cart_v2';
const STORAGE_KEY_WISHLIST = 'dress_marketplace_wishlist_v2';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, allSellers } = useAuth();

  const [dresses, setDresses] = useState<DressProduct[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_DRESSES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse dresses', e);
      }
    }
    return INITIAL_DRESSES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse orders', e);
      }
    }
    return INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CART);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }
    return [INITIAL_DRESSES[0].id, INITIAL_DRESSES[2].id];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<Order | null>(null);
  const [activeDressModal, setActiveDressModal] = useState<DressProduct | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<'buyer' | 'seller'>('buyer');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPlatformLedgerOpen, setIsPlatformLedgerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DRESSES, JSON.stringify(dresses));
  }, [dresses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  // Keep selected tracking order in sync with updated orders
  useEffect(() => {
    if (selectedTrackingOrder) {
      const refreshed = orders.find(o => o.id === selectedTrackingOrder.id);
      if (refreshed) {
        setSelectedTrackingOrder(refreshed);
      }
    }
  }, [orders]);

  const addToCart = (product: DressProduct, size: string, color: { name: string; hex: string }, quantity = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor.name === color.name
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (dressId: string) => {
    setWishlist(prev => 
      prev.includes(dressId) ? prev.filter(id => id !== dressId) : [...prev, dressId]
    );
  };

  // Seller: Add Dress with mandatory 70% seller / 30% platform split calculation
  const addDress = (newDressData: Omit<DressProduct, 'id' | 'sellerShare' | 'platformShare' | 'createdAt'>) => {
    const price = Number(newDressData.price);
    // Explicit requirement: 30% of the share goes to platform account, 70% of the money goes to seller
    const sellerShare = Number((price * 0.70).toFixed(2));
    const platformShare = Number((price * 0.30).toFixed(2));

    const newDress: DressProduct = {
      ...newDressData,
      id: `dress-${Date.now()}`,
      price,
      sellerShare,
      platformShare,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setDresses(prev => [newDress, ...prev]);
    return newDress;
  };

  const updateDress = (dressId: string, updatedData: Partial<DressProduct>) => {
    setDresses(prev => prev.map(dress => {
      if (dress.id !== dressId) return dress;
      
      const newPrice = updatedData.price !== undefined ? Number(updatedData.price) : dress.price;
      const sellerShare = Number((newPrice * 0.70).toFixed(2));
      const platformShare = Number((newPrice * 0.30).toFixed(2));

      return {
        ...dress,
        ...updatedData,
        price: newPrice,
        sellerShare,
        platformShare,
      };
    }));
  };

  const deleteDress = (dressId: string) => {
    setDresses(prev => prev.filter(d => d.id !== dressId));
  };

  // Place order with checkout
  const placeOrder = (
    items: CartItem[],
    shippingAddress: Order['shippingAddress'],
    paymentMethod: Order['paymentMethod'],
    paymentLast4 = '4242',
    buyerAccountDetails?: BankAccountDetails
  ): Order => {
    const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    // 70% share for sellers, 30% share for platform
    const sellerTotalShare = Number((totalAmount * 0.70).toFixed(2));
    const platformTotalShare = Number((totalAmount * 0.30).toFixed(2));

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `DHL-EXP-${Math.floor(100000000 + Math.random() * 900000000)}`;
    const directTransferRef = `NIBSS-DIR-${Math.floor(10000000 + Math.random() * 90000000)}`;

    // Group items by seller to calculate and route direct settlements to each seller's bank account
    const sellerGroups = new Map<string, { sellerName: string; total: number }>();
    items.forEach(item => {
      const current = sellerGroups.get(item.product.sellerId) || { sellerName: item.product.sellerName, total: 0 };
      current.total += item.product.price * item.quantity;
      sellerGroups.set(item.product.sellerId, current);
    });

    const sellerSettlements: SellerSettlementRecord[] = Array.from(sellerGroups.entries()).map(([sellerId, data]) => {
      const sellerObj = allSellers.find(s => s.id === sellerId);
      const payoutAccount = sellerObj?.payoutAccount || {
        bankName: 'Access Bank',
        accountNumber: '0092841928',
        accountName: `${data.sellerName} Atelier`,
        bankCode: '044',
        bvnVerified: true,
        settlementSpeed: 'instant',
      };
      const sellerAmount = Number((data.total * 0.70).toFixed(2));
      return {
        sellerId,
        sellerName: data.sellerName,
        bankName: payoutAccount.bankName,
        accountNumber: payoutAccount.accountNumber,
        accountName: payoutAccount.accountName,
        amount: sellerAmount,
        transferReference: directTransferRef,
        settledAt: new Date().toISOString(),
        status: 'instant_settled',
      };
    });

    const sellerSummaryText = sellerSettlements.map(
      s => `${formatNaira(s.amount)} credited directly into ${s.sellerName}'s ${s.bankName} Account (••••${s.accountNumber.slice(-4)})`
    ).join('; ');

    const initialCheckpoints: TrackingCheckpoint[] = [
      {
        id: `cp-1-${Date.now()}`,
        status: 'placed',
        title: 'Order Placed & Direct Bank Settlement Cleared',
        description: paymentMethod === 'bank_account' && buyerAccountDetails
          ? `Direct debit authorized from buyer's ${buyerAccountDetails.bankName} Account (••••${buyerAccountDetails.accountNumber.slice(-4)}). ${sellerSummaryText}. 30% platform escrow (${formatNaira(platformTotalShare)}) processed. Ref: ${directTransferRef}.`
          : `Payment authorized. ${sellerSummaryText}. 30% platform escrow (${formatNaira(platformTotalShare)}) processed. Ref: ${directTransferRef}.`,
        location: `${shippingAddress.city}, ${shippingAddress.state}`,
        timestamp: 'Just now',
        completed: true,
      },
      {
        id: `cp-2-${Date.now()}`,
        status: 'confirmed',
        title: 'Atelier Sizing & Order Verification',
        description: 'Seller studio confirmed garment pattern, fit measurements, and fabric preparation.',
        location: 'Designer Atelier Studio',
        timestamp: 'Estimated +2 hrs',
        completed: false,
      },
      {
        id: `cp-3-${Date.now()}`,
        status: 'tailoring',
        title: 'Garment Finishing & Luxury Packaging',
        description: 'Dress hand-pressed, tagged, packed in breathable garment cover with silk ribbons.',
        location: 'Atelier Packaging Suite',
        timestamp: 'Pending',
        completed: false,
      },
      {
        id: `cp-4-${Date.now()}`,
        status: 'shipped',
        title: 'Dispatched with Courier',
        description: 'Carrier scanned package into line-haul network.',
        location: 'Regional Air Freight Hub',
        timestamp: 'Pending',
        completed: false,
      },
      {
        id: `cp-5-${Date.now()}`,
        status: 'out_for_delivery',
        title: 'Out for Local Delivery',
        description: 'Courier vehicle out for delivery with signature protocol.',
        location: `${shippingAddress.city} Metro Terminal`,
        timestamp: 'Pending',
        completed: false,
      },
      {
        id: `cp-6-${Date.now()}`,
        status: 'delivered',
        title: 'Delivered to Customer',
        description: 'Package delivered and signed. 7-day buyer fit guarantee initiated.',
        location: `${shippingAddress.street}, ${shippingAddress.city}`,
        timestamp: 'Pending',
        completed: false,
      }
    ];

    const newOrder: Order = {
      id: orderId,
      buyerId: currentUser?.id || 'guest-buyer',
      buyerName: shippingAddress.fullName,
      buyerEmail: currentUser?.email || 'buyer@example.com',
      items,
      totalAmount,
      sellerTotalShare,
      platformTotalShare,
      status: 'placed',
      trackingNumber,
      carrier: 'DHL Express Atelier Global',
      estimatedDelivery: '3 to 5 business days',
      shippingAddress,
      paymentMethod,
      paymentLast4: paymentMethod === 'bank_account' && buyerAccountDetails ? buyerAccountDetails.accountNumber.slice(-4) : paymentLast4,
      buyerAccountDetails,
      sellerSettlements,
      directTransferReference: directTransferRef,
      createdAt: new Date().toISOString(),
      checkpoints: initialCheckpoints,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setSelectedTrackingOrder(newOrder);

    return newOrder;
  };

  // Real-time tracking progression simulator
  const advanceOrderStatus = (orderId: string) => {
    const statusFlow: OrderStatus[] = ['placed', 'confirmed', 'tailoring', 'shipped', 'out_for_delivery', 'delivered'];
    
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const currentIdx = statusFlow.indexOf(order.status);
      if (currentIdx >= statusFlow.length - 1) {
        return order; // already delivered
      }

      const nextStatus = statusFlow[currentIdx + 1];
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const updatedCheckpoints = order.checkpoints.map(cp => {
        if (cp.status === nextStatus) {
          return {
            ...cp,
            completed: true,
            timestamp: `Today at ${timeStr}`,
          };
        }
        return cp;
      });

      return {
        ...order,
        status: nextStatus,
        checkpoints: updatedCheckpoints,
        estimatedDelivery: nextStatus === 'delivered' ? 'Delivered Today' : order.estimatedDelivery,
      };
    }));
  };

  // Calculate platform aggregate stats
  const platformStats = orders.reduce(
    (acc, ord) => {
      acc.totalGrossVolume += ord.totalAmount;
      acc.totalPlatformFee += ord.platformTotalShare;
      acc.totalSellerPayout += ord.sellerTotalShare;
      acc.orderCount += 1;
      return acc;
    },
    { totalPlatformFee: 0, totalSellerPayout: 0, totalGrossVolume: 0, orderCount: 0 }
  );

  return (
    <ShopContext.Provider
      value={{
        dresses,
        orders,
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        selectedTrackingOrder,
        setSelectedTrackingOrder,
        activeDressModal,
        setActiveDressModal,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalInitialRole,
        setAuthModalInitialRole,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isPlatformLedgerOpen,
        setIsPlatformLedgerOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        addDress,
        updateDress,
        deleteDress,
        placeOrder,
        advanceOrderStatus,
        platformStats,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
