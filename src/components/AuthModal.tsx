import React, { useState } from 'react';
import { X, Mail, ShieldCheck, Sparkles, Store, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'buyer',
}) => {
  const { login, selectMockSeller } = useAuth();

  const [role, setRole] = useState<UserRole>(initialRole);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [dressSpecialty, setDressSpecialty] = useState('Evening & Gala Gowns');

  if (!isOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    login('email', role, {
      name: name || (role === 'seller' ? 'Atelier Designer' : 'Dress Connoisseur'),
      email: email,
      storeName: role === 'seller' ? (storeName || 'Atelier Maison') : undefined,
    });
    onClose();
  };

  const handleSocialLogin = (provider: 'facebook' | 'google' | 'apple') => {
    login(provider, role, {
      name: role === 'seller' 
        ? `${provider === 'facebook' ? 'Facebook' : provider === 'google' ? 'Google' : 'Apple'} Dress Merchant`
        : `${provider === 'facebook' ? 'Facebook' : provider === 'google' ? 'Google' : 'Apple'} Buyer Member`,
      storeName: role === 'seller' ? `${name || 'Maison'} on ${provider.toUpperCase()}` : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1026]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#111836] rounded-[32px] shadow-[0_0_50px_rgba(124,58,237,0.35)] border-2 border-[#7C3AED]/40 overflow-hidden text-[#F8FAFC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="auth-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#E9D5FF]/80 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header decoration */}
        <div className="bg-[#0B1026] text-[#F8FAFC] p-6 pb-5 relative overflow-hidden border-b border-[#7C3AED]/30">
          <div className="flex items-center gap-2 text-[#38BDF8] text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Dress Marketplace</span>
          </div>

          <h2 className="text-2xl font-black uppercase">
            {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-[#E9D5FF]/80 text-xs font-bold mt-1">
            {role === 'seller' 
              ? 'Manage your storefront, list dresses, and receive 70% direct payouts.' 
              : 'Discover bespoke dresses, track orders live, and checkout securely.'}
          </p>

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-[#131C3F] rounded-2xl border border-[#7C3AED]/40 text-xs">
            <button
              id="auth-tab-buyer"
              type="button"
              onClick={() => setRole('buyer')}
              className={`py-2 px-3 rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                role === 'buyer'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-[#F8FAFC] border border-[#A855F7]/60 shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                  : 'text-[#E9D5FF]/70 hover:text-[#F8FAFC]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>I am a Buyer</span>
            </button>
            <button
              id="auth-tab-seller"
              type="button"
              onClick={() => setRole('seller')}
              className={`py-2 px-3 rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                role === 'seller'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-[#F8FAFC] border border-[#38BDF8]/60 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'text-[#E9D5FF]/70 hover:text-[#F8FAFC]'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>I am a Seller</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Social Sign-In Buttons */}
          <div className="space-y-2.5">
            {/* Facebook Button (Prompted specifically by user) */}
            <button
              id="social-login-facebook-btn"
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              className="w-full py-2.5 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-3 border border-blue-400/40 shadow-sm transition-all hover:translate-y-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Continue with Facebook</span>
            </button>

            {/* Google Button */}
            <button
              id="social-login-google-btn"
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-full py-2.5 px-4 bg-[#131C3F] hover:bg-[#1E2A54] text-[#F8FAFC] border border-[#7C3AED]/40 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-3 shadow-sm transition-all hover:translate-y-0.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.28v3.15C3.32 21.36 7.36 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.28C.46 8.21 0 10.05 0 12s.46 3.79 1.28 5.42l4-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.32 2.64 1.28 6.58l4 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Apple Button */}
            <button
              id="social-login-apple-btn"
              type="button"
              onClick={() => handleSocialLogin('apple')}
              className="w-full py-2.5 px-4 bg-[#0B1026] hover:bg-[#1E1B4B] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-3 border border-[#7C3AED]/40 shadow-sm transition-all hover:translate-y-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.74 1.01.08 2.03-.49 2.63-1.24z"/>
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#7C3AED]/30 w-full"></div>
            <span className="bg-[#111836] px-3 text-[10px] font-black text-[#E9D5FF]/60 uppercase tracking-wider">
              Or with email
            </span>
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-black uppercase text-[#E9D5FF] mb-1">
                  Full Name
                </label>
                <input
                  id="auth-name-input"
                  type="text"
                  required
                  placeholder="e.g. Camille Laurent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] placeholder-[#E9D5FF]/40"
                />
              </div>
            )}

            {role === 'seller' && mode === 'signup' && (
              <>
                <div>
                  <label className="block text-[10px] font-black uppercase text-[#E9D5FF] mb-1">
                    Storefront / Brand Name
                  </label>
                  <input
                    id="auth-store-name-input"
                    type="text"
                    required
                    placeholder="e.g. Atelier Laurent Couture"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] placeholder-[#E9D5FF]/40"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-[#E9D5FF] mb-1">
                    Primary Dress Category Focus
                  </label>
                  <select
                    id="auth-dress-specialty-select"
                    value={dressSpecialty}
                    onChange={(e) => setDressSpecialty(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  >
                    <option className="bg-[#131C3F]">Evening & Gala Gowns</option>
                    <option className="bg-[#131C3F]">Cocktail & Party Silhouettes</option>
                    <option className="bg-[#131C3F]">Bridal & Wedding Guest</option>
                    <option className="bg-[#131C3F]">Mulberry Silk Slips</option>
                    <option className="bg-[#131C3F]">Linen & Summer Sun Dresses</option>
                    <option className="bg-[#131C3F]">Vintage & Haute Couture</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase text-[#E9D5FF] mb-1">
                Email Address
              </label>
              <input
                id="auth-email-input"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] placeholder-[#E9D5FF]/40"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-[#E9D5FF] mb-1">
                Password
              </label>
              <input
                id="auth-password-input"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#7C3AED]/40 bg-[#131C3F] font-bold text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] placeholder-[#E9D5FF]/40"
              />
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#8B5CF6] hover:to-[#38BDF8] text-[#F8FAFC] rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border border-[#A855F7]/60 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:translate-y-0.5"
            >
              <span>{mode === 'signin' ? 'Sign In to Marketplace' : 'Create Seller/Buyer Account'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Toggle sign in / sign up */}
          <div className="text-center pt-1 text-xs text-[#E9D5FF]">
            {mode === 'signin' ? (
              <p className="font-bold">
                New to the atelier?{' '}
                <button
                  id="auth-switch-to-signup-btn"
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#38BDF8] hover:text-[#A855F7] font-black uppercase hover:underline ml-1"
                >
                  Create account
                </button>
              </p>
            ) : (
              <p className="font-bold">
                Already have an account?{' '}
                <button
                  id="auth-switch-to-signin-btn"
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-[#38BDF8] hover:text-[#A855F7] font-black uppercase hover:underline ml-1"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

          {/* Quick 1-Click Demo Accounts for instant evaluation */}
          <div className="mt-4 pt-3 border-t border-[#7C3AED]/30 bg-[#0B1026] -mx-6 -mb-6 p-4 rounded-b-3xl">
            <span className="block text-[10px] font-black uppercase tracking-wider text-[#E9D5FF]/80 mb-2">
              Instant Demo Accounts (1-Click Switch)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                id="demo-seller-btn"
                type="button"
                onClick={() => {
                  selectMockSeller('seller-1');
                  onClose();
                }}
                className="p-2.5 bg-[#131C3F] hover:bg-[#1E1B4B] rounded-xl border border-[#7C3AED]/40 shadow-sm text-left transition-colors"
              >
                <div className="font-black text-[#F8FAFC] truncate">Atelier Laurent</div>
                <div className="text-[10px] font-bold text-[#38BDF8]">Seller (70% cut)</div>
              </button>
              <button
                id="demo-buyer-btn"
                type="button"
                onClick={() => {
                  login('google', 'buyer', { name: 'Sophia Sterling', email: 'sophia@example.com' });
                  onClose();
                }}
                className="p-2.5 bg-[#131C3F] hover:bg-[#1E1B4B] rounded-xl border border-[#7C3AED]/40 shadow-sm text-left transition-colors"
              >
                <div className="font-black text-[#F8FAFC] truncate">Sophia Sterling</div>
                <div className="text-[10px] font-bold text-[#E9D5FF]/80">Buyer Profile</div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
