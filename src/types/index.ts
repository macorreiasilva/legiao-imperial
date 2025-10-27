export type Tier = 'Bronze' | 'Prata' | 'Ouro' | 'Elite';

export type Goal = 'ganho_massa' | 'cutting' | 'saude' | 'disposicao';

export type ProductCategory = 'whey' | 'creatina' | 'pre_treino' | 'termogenico' | 'vitaminas';

export type Channel = 'store' | 'ecommerce';

export type RewardType = 'discount' | 'product' | 'experience';

export type CouponType = 'amount' | 'percentage' | 'custom';

export type ReferralStatus = 'pending' | 'converted';

export type SubscriptionStatus = 'active' | 'paused' | 'canceled';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthday?: string;
  goals: Goal[];
  gym?: string;
  flavorPrefs?: string[];
  consents: {
    whatsapp: boolean;
    email: boolean;
    push: boolean;
  };
  tier: Tier;
  tierPoints: number;
  nextTierAt: number;
}

export interface LoyaltyBalance {
  points: number;
  cashback: number;
  expiringLots: Array<{
    lotId: string;
    points: number;
    expiresAt: string;
  }>;
}

export interface Reward {
  id: string;
  name: string;
  type: RewardType;
  imageUrl?: string;
  imageKey?: string;
  costPoints?: number;
  costCash?: number;
  mixAllowed?: boolean;
  stock?: number;
  perUserLimit?: number;
  terms?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  expiresAt: string;
  channel: 'store' | 'ecommerce' | 'both';
  qrSvg?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  imageUrl?: string;
  imageKey?: string;
  pointsMultiplier?: number;
  description?: string;
  benefits?: string[];
}

export interface Transaction {
  id: string;
  channel: Channel;
  date: string;
  items: Array<{
    productId: string;
    qty: number;
    unitPrice: number;
  }>;
  pointsEarned: number;
  cashbackEarned: number;
  pointsRedeemed?: number;
  cashbackRedeemed?: number;
}

export interface Referral {
  code: string;
  url: string;
  invited: Array<{
    name?: string;
    status: ReferralStatus;
    createdAt: string;
  }>;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  items: Array<{
    productId: string;
    qty: number;
  }>;
  cycleDays: number;
  discountPct: number;
  pointsBonusPct: number;
  nextShipmentAt: string;
  status: SubscriptionStatus;
}

export interface ApiError {
  error: string;
  code?: string;
}
