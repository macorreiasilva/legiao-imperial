import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: api.user.getMe,
  });
};

export const useLoyaltyBalance = () => {
  return useQuery({
    queryKey: ['loyalty', 'balance'],
    queryFn: api.loyalty.getBalance,
  });
};

export const useLoyaltyHistory = (params?: { period?: string; channel?: string }) => {
  return useQuery({
    queryKey: ['loyalty', 'history', params],
    queryFn: () => api.loyalty.getHistory(params),
  });
};

export const useRewards = () => {
  return useQuery({
    queryKey: ['rewards'],
    queryFn: api.rewards.getAll,
  });
};

export const useRedeemReward = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ rewardId, points, cash }: { rewardId: string; points?: number; cash?: number }) =>
      api.rewards.redeem(rewardId, points, cash),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loyalty'] });
    },
  });
};

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => api.products.getAll(category),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => api.products.getById(id),
    enabled: !!id,
  });
};

export const useReferrals = () => {
  return useQuery({
    queryKey: ['referrals'],
    queryFn: api.referrals.get,
  });
};

export const useSubscriptions = () => {
  return useQuery({
    queryKey: ['subscriptions'],
    queryFn: api.subscriptions.getAll,
  });
};

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.subscriptions.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });
};
