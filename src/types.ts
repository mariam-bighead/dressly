export type UserRole = 'buyer' | 'seller';

export interface BankAccountDetails {
  bankName: string;
  accountNumber: string; // 10-digit NUBAN
  accountName: string;
  bankCode?: string;
  bvnVerified?: boolean;
  settlementSpeed?: 'instant' | 'next_day';
}

export interface SellerSettlementRecord {
  sellerId: string;
  sellerName: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  transferReference: string;
  settledAt: string;
  status: 'instant_settled' | 'processing';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  provider: 'email' | 'facebook' | 'google' | 'apple';
  storeName?: string;
  storeBio?: string;
  storeBanner?: string;
  joinedDate: string;
  payoutAccount?: BankAccountDetails; // Configured bank account where buyer payments settle directly
  buyerAccount?: BankAccountDetails; // Buyer payment account information for direct payments
  measurements?: {
    bust?: string;
    waist?: string;
    hips?: string;
    height?: string;
    preferredSize?: string;
  };
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export type DressCategory = 
  | 'All Dresses'
  | 'Aso Ebi & Owambe'
  | 'Ankara & Wax Prints'
  | 'Rich Boubou & Kaftans'
  | 'Adire & Heritage Silk'
  | 'Bridal & Traditional Wedding'
  | 'Bridal & Wedding Guest'
  | 'Evening & Gala'
  | 'Cocktail & Party'
  | 'Silk & Slip'
  | 'Summer & Linen'
  | 'Daywear & Casual'
  | 'Vintage & Retro';

export type DressSilhouette = 
  | 'Mermaid'
  | 'Boubou & Kaftan'
  | 'Corset & Peplum'
  | 'A-Line'
  | 'Slip Dress'
  | 'Wrap Dress'
  | 'Column'
  | 'Fit & Flare'
  | 'Empire'
  | 'Shift';

export type DressLength = 'Mini' | 'Midi' | 'Maxi' | 'Floor-Length';

export interface DressProduct {
  id: string;
  title: string;
  category: DressCategory;
  silhouette: DressSilhouette;
  length: DressLength;
  fabric: string; // e.g., 100% Mulberry Silk, French Chiffon, Organic Linen
  price: number; // Retail price set by seller
  sellerShare: number; // 70% of price
  platformShare: number; // 30% of price
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerSalesCount: number;
  description: string;
  details: string[];
  careInstructions: string;
  images: string[];
  sizes: string[]; // ['XS', 'S', 'M', 'L', 'XL']
  colors: { name: string; hex: string }[];
  stock: number;
  createdAt: string;
  featured?: boolean;
}

export interface CartItem {
  product: DressProduct;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export type OrderStatus = 
  | 'placed'
  | 'confirmed'
  | 'tailoring'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered';

export interface TrackingCheckpoint {
  id: string;
  status: OrderStatus;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  items: CartItem[];
  totalAmount: number;
  sellerTotalShare: number; // 70% aggregate
  platformTotalShare: number; // 30% aggregate
  status: OrderStatus;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: 'card' | 'bank_account' | 'apple_pay' | 'google_pay' | 'paypal' | 'klarna';
  paymentLast4?: string;
  buyerAccountDetails?: BankAccountDetails; // Buyer bank account information used to pay
  sellerSettlements?: SellerSettlementRecord[]; // Direct bank settlements to sellers
  directTransferReference?: string; // NIBSS / direct bank settlement transaction ref
  createdAt: string;
  checkpoints: TrackingCheckpoint[];
}
