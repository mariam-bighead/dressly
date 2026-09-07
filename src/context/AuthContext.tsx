import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_BUYER, INITIAL_SELLERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  role: UserRole;
  allSellers: User[];
  login: (provider: 'email' | 'facebook' | 'google' | 'apple', role: UserRole, details?: { name?: string; email?: string; storeName?: string }) => void;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  updateProfile: (updatedData: Partial<User>) => void;
  selectMockSeller: (sellerId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'dress_marketplace_user_v1';
const STORAGE_KEY_SELLERS = 'dress_marketplace_sellers_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'buyer' && !parsed.buyerAccount) {
          parsed.buyerAccount = INITIAL_BUYER.buyerAccount;
        }
        if (parsed.role === 'seller' && !parsed.payoutAccount) {
          parsed.payoutAccount = INITIAL_SELLERS[0].payoutAccount;
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    // Default to initial buyer so user sees a ready-to-shop experience immediately
    return INITIAL_BUYER;
  });

  const [allSellers, setAllSellers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SELLERS);
    if (saved) {
      try {
        const parsedSellers: User[] = JSON.parse(saved);
        // Ensure every seller has a payoutAccount
        return parsedSellers.map(s => {
          if (!s.payoutAccount) {
            const match = INITIAL_SELLERS.find(init => init.id === s.id);
            return {
              ...s,
              payoutAccount: match?.payoutAccount || INITIAL_SELLERS[0].payoutAccount
            };
          }
          return s;
        });
      } catch (e) {
        console.error('Failed to parse sellers', e);
      }
    }
    return INITIAL_SELLERS;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SELLERS, JSON.stringify(allSellers));
  }, [allSellers]);

  const login = (
    provider: 'email' | 'facebook' | 'google' | 'apple',
    role: UserRole,
    details?: { name?: string; email?: string; storeName?: string }
  ) => {
    let newUser: User;

    if (role === 'seller') {
      const storeName = details?.storeName || (provider === 'facebook' ? 'Atelier Facebook Boutique' : 'My Dress Atelier');
      const sellerName = details?.name || (provider === 'facebook' ? 'Facebook Fashion Merchant' : 'Couture Merchant');
      const email = details?.email || `${provider}_seller_${Date.now().toString().slice(-4)}@fashionmarket.com`;
      
      newUser = {
        id: `seller-${Date.now()}`,
        name: sellerName,
        email: email,
        role: 'seller',
        avatar: provider === 'facebook' 
          ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        provider: provider,
        storeName: storeName,
        storeBio: 'Curating handmade and tailored dresses with artisanal fabrics and modern cuts.',
        storeBanner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
        payoutAccount: {
          bankName: 'Access Bank',
          accountNumber: '0812948291',
          accountName: `${storeName} Settlement`,
          bankCode: '044',
          bvnVerified: true,
          settlementSpeed: 'instant',
        }
      };

      setAllSellers(prev => [newUser, ...prev]);
    } else {
      newUser = {
        id: `buyer-${Date.now()}`,
        name: details?.name || (provider === 'facebook' ? 'Chioma Adeleke' : 'Chioma Adeleke'),
        email: details?.email || `${provider}_buyer_${Date.now().toString().slice(-4)}@example.com`,
        role: 'buyer',
        avatar: provider === 'facebook'
          ? 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        provider: provider,
        joinedDate: new Date().toISOString().split('T')[0],
        buyerAccount: {
          bankName: 'Guaranty Trust Bank (GTBank)',
          accountNumber: '0129481920',
          accountName: details?.name || 'Chioma Adeleke',
          bankCode: '058',
          bvnVerified: true,
          settlementSpeed: 'instant',
        },
        measurements: {
          bust: '34B',
          waist: '27 in',
          hips: '38 in',
          height: "5'7\"",
          preferredSize: 'M',
        },
        shippingAddress: {
          street: '14 Alexander Avenue, Ikoyi',
          city: 'Lagos',
          state: 'Lagos State',
          zip: '101233',
          country: 'Nigeria',
        }
      };
    }

    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (!currentUser) return;
    if (newRole === 'seller') {
      // Find or convert to seller
      const existingSeller = allSellers[0] || INITIAL_SELLERS[0];
      setCurrentUser(existingSeller);
    } else {
      setCurrentUser(INITIAL_BUYER);
    }
  };

  const selectMockSeller = (sellerId: string) => {
    const found = allSellers.find(s => s.id === sellerId);
    if (found) {
      setCurrentUser(found);
    }
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);

    if (updated.role === 'seller') {
      setAllSellers(prev => prev.map(s => s.id === updated.id ? updated : s));
    }
  };

  const role: UserRole = currentUser?.role || 'buyer';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        allSellers,
        login,
        logout,
        switchRole,
        updateProfile,
        selectMockSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
