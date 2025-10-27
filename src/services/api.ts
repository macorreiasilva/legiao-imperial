import { UserProfile, LoyaltyBalance, Reward, Product, Referral, SubscriptionPlan, Transaction, Coupon } from '../types';

import meData from '../mocks/me.json';
import loyaltyData from '../mocks/loyalty.json';
import rewardsData from '../mocks/rewards.json';
import productsData from '../mocks/products.json';
import referralsData from '../mocks/referrals.json';
import subscriptionsData from '../mocks/subscriptions.json';
import historyData from '../mocks/history.json';

const USE_MOCKS = true;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    async login(email: string, password: string): Promise<{ token: string; user: UserProfile }> {
      await delay(800);
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: meData as UserProfile,
      };
    },

    async register(data: Partial<UserProfile> & { email: string; password: string }): Promise<{ token: string; user: UserProfile }> {
      await delay(1000);
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: { ...meData, ...data } as UserProfile,
      };
    },

    async socialAuth(provider: 'google' | 'apple'): Promise<{ token: string; user: UserProfile }> {
      await delay(1200);
      return {
        token: 'mock-jwt-token-social-' + provider + '-' + Date.now(),
        user: meData as UserProfile,
      };
    },
  },

  user: {
    async getMe(): Promise<UserProfile> {
      await delay(500);
      return meData as UserProfile;
    },

    async updateMe(data: Partial<UserProfile>): Promise<UserProfile> {
      await delay(600);
      return { ...meData, ...data } as UserProfile;
    },
  },

  loyalty: {
    async getBalance(): Promise<LoyaltyBalance> {
      await delay(400);
      return loyaltyData as LoyaltyBalance;
    },

    async getHistory(params?: { period?: string; channel?: string }): Promise<Transaction[]> {
      await delay(500);
      return historyData as Transaction[];
    },
  },

  rewards: {
    async getAll(): Promise<Reward[]> {
      await delay(600);
      return rewardsData as Reward[];
    },

    async redeem(rewardId: string, points?: number, cash?: number): Promise<Coupon> {
      await delay(1000);
      return {
        id: 'coupon-' + Date.now(),
        code: 'IMP' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        type: 'amount',
        value: 30,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        channel: 'both',
      };
    },
  },

  products: {
    async getAll(category?: string): Promise<Product[]> {
      await delay(600);
      const products = productsData as Product[];
      if (category) {
        return products.filter(p => p.category === category);
      }
      return products;
    },

    async getById(id: string): Promise<Product | undefined> {
      await delay(400);
      const products = productsData as Product[];
      return products.find(p => p.id === id);
    },
  },

  referrals: {
    async get(): Promise<Referral> {
      await delay(500);
      return referralsData as Referral;
    },

    async create(): Promise<Referral> {
      await delay(800);
      return referralsData as Referral;
    },
  },

  subscriptions: {
    async getAll(): Promise<SubscriptionPlan[]> {
      await delay(600);
      return subscriptionsData as SubscriptionPlan[];
    },

    async create(data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> {
      await delay(1000);
      return {
        id: 'sub-' + Date.now(),
        name: data.name || 'Nova Assinatura',
        items: data.items || [],
        cycleDays: data.cycleDays || 30,
        discountPct: data.discountPct || 10,
        pointsBonusPct: data.pointsBonusPct || 20,
        nextShipmentAt: new Date(Date.now() + (data.cycleDays || 30) * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
      };
    },

    async update(id: string, data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> {
      await delay(800);
      const subs = subscriptionsData as SubscriptionPlan[];
      const sub = subs.find(s => s.id === id);
      return { ...sub, ...data } as SubscriptionPlan;
    },
  },

  notifications: {
    async registerToken(token: string): Promise<{ success: boolean }> {
      await delay(300);
      return { success: true };
    },
  },
};

export default api;
